import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import app from "./init";
import { hash } from "hasha";
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
    userData.password = await hash(userData.password); // Hash password
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
