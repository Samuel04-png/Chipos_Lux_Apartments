import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, doc, deleteDoc, updateDoc, getDocs, Timestamp } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";

export type { User };

const firebaseConfig = {
  apiKey: "AIzaSyBYO2B7dhin6RFSnOD1TyeeycxiZpzsc4Y",
  authDomain: "tailored-manor.firebaseapp.com",
  projectId: "tailored-manor",
  storageBucket: "tailored-manor.firebasestorage.app",
  messagingSenderId: "1012625617073",
  appId: "1:1012625617073:web:a219d1830ff44bdaa57290",
  measurementId: "G-DYL0R9BJN3",
};

const app = initializeApp(firebaseConfig, "chippolux");
export const db = getFirestore(app);
export const auth = getAuth(app);

// --- Auth ---
export const loginAdmin = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const logoutAdmin = () => signOut(auth);

export const onAuthChange = (cb: (user: User | null) => void) =>
  onAuthStateChanged(auth, cb);

// --- Bookings ---
export interface Booking {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  message: string;
  createdAt: Timestamp;
  status: "new" | "contacted" | "booked" | "closed";
}

const bookingsRef = collection(db, "chippolux_bookings");

export const addBooking = async (data: Omit<Booking, "id" | "createdAt" | "status">) => {
  const docRef = await addDoc(bookingsRef, {
    ...data,
    status: "new",
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

export const subscribeBookings = (cb: (bookings: Booking[]) => void) => {
  const q = query(bookingsRef, orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const list: Booking[] = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as Booking[];
    cb(list);
  });
};

export const updateBookingStatus = async (id: string, status: Booking["status"]) => {
  await updateDoc(doc(bookingsRef, id), { status });
};

export const deleteBooking = async (id: string) => {
  await deleteDoc(doc(bookingsRef, id));
};

// --- Careers / Job Applications ---
export interface JobApplication {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  position: string;
  message: string;
  createdAt: Timestamp;
  status: "new" | "reviewed" | "shortlisted" | "rejected";
}

const applicationsRef = collection(db, "chippolux_applications");

export const subscribeApplications = (cb: (apps: JobApplication[]) => void) => {
  const q = query(applicationsRef, orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const list: JobApplication[] = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as JobApplication[];
    cb(list);
  });
};

export const updateApplicationStatus = async (id: string, status: JobApplication["status"]) => {
  await updateDoc(doc(applicationsRef, id), { status });
};
