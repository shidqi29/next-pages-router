import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import app from "./init";

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
