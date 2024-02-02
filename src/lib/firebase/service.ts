import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import bcrypt from "bcrypt";

import app from "./init";
import { userDataType } from "@/types/user.types";

const firestore = getFirestore(app);

/**
 * Retrieves data from a Firestore collection.
 * @param collectionName - The name of the collection to retrieve data from.
 * @returns A Promise that resolves to an array of objects representing the retrieved data.
 */
export async function retrieveData(collectionName: string) {
  const snapshot = await getDocs(collection(firestore, collectionName));
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return data;
}

/**
 * Retrieves data from a Firestore collection by its ID.
 * @param collectionName - The name of the collection.
 * @param id - The ID of the document to retrieve.
 * @returns The retrieved data.
 */
export async function retrieveDataById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data();

  return data;
}

/**
 * Sign in a user with the provided email.
 * @param userData - The user data containing the email.
 * @returns The user data if found, otherwise null.
 */
export async function signIn(userData: { email: string }) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email),
  );
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  if (data.length > 0) {
    return data[0];
  } else {
    return null;
  }
}

/**
 * Sign up a user with the provided user data.
 *
 * @param userData - The user data to sign up with.
 * @param callback - The callback function to handle the sign up result.
 * @returns {Promise<void>} - A promise that resolves when the sign up process is complete.
 */
export async function signUp(
  userData: userDataType,
  callback: Function,
): Promise<void> {
  // Check if email already exists
  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email),
  );
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  if (data.length > 0) {
    callback({ status: false, message: "Email already exists" });
  } else {
    // Create new user
    userData.password = await bcrypt.hash(userData.password, 10); // Hash password
    userData.role = "user";
    await addDoc(collection(firestore, "users"), userData)
      .then(() => {
        callback({ status: true, message: "User created successfully" });
      })
      .catch((error) => {
        callback({ status: false, message: error.message });
      });
  }
}

export async function signInWithGoogle(
  userData: userDataType,
  callback: Function,
) {
  // Check if email already exists
  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email),
  );
  const snapshot = await getDocs(q);
  const data: any = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  if (data.length > 0) {
    // Update user data
    userData.role = data[0].role;
    await updateDoc(doc(firestore, "users", data[0].id), userData)
      .then(() => {
        callback({
          status: true,
          message: "User signed in with google",
          data: userData,
        });
      })
      .catch(() => {
        callback({ status: false, message: "Sign in with google failed" });
      });
  } else {
    // Create new user
    userData.role = "user";
    await addDoc(collection(firestore, "users"), userData)
      .then(() => {
        callback({
          status: true,
          message: "User signed in with google",
          data: userData,
        });
      })
      .catch(() => {
        callback({ status: false, message: "Sign in with google failed" });
      });
  }
}
