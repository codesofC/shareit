// Import the functions you need from the SDKs you need
import { AddProjectProperties } from "@/types/index";
import { initializeApp } from "firebase/app";
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MENSSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const addProject = async (obj: AddProjectProperties, id: string) => {
  try {
    await setDoc(doc(db, `projects`, `${id}`), obj);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const deleteProject = async (id: string) => {
  try {
    await deleteDoc(doc(db, "projects", id))
  } catch (error) {
    console.error(error); 
  }
}

export const storage = getStorage(app)

