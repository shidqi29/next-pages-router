import { collection, getDocs, getFirestore } from "firebase/firestore";
import app from "./init";

export async function retrieveData(collectionName: string) {
  const firestore = getFirestore(app);

  const snapshot = await getDocs(collection(firestore, collectionName));
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return data;
}
