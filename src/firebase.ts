import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  where,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  setDoc,
  getDoc,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import type { User } from "firebase/auth";
import type { Employee, Role } from "./admin/types";

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

// ─── Auth ──────────────────────────────────────────────────────────────

export const loginAdmin = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const logoutAdmin = () => signOut(auth);

export const onAuthChange = (cb: (user: User | null) => void) =>
  onAuthStateChanged(auth, cb);

// ─── Bookings ──────────────────────────────────────────────────────────

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

export const subscribeBookings = (cb: (bookings: Booking[]) => void, onError?: (err: Error) => void) => {
  const q = query(bookingsRef, orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snapshot) => {
      const list: Booking[] = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as Booking[];
      cb(list);
    },
    (err) => {
      console.error("subscribeBookings error:", err);
      cb([]);
      onError?.(err);
    },
  );
};

export const updateBookingStatus = async (id: string, status: Booking["status"]) => {
  await updateDoc(doc(bookingsRef, id), { status });
};

export const updateBooking = async (id: string, data: Partial<Booking>) => {
  await updateDoc(doc(bookingsRef, id), data);
};

export const deleteBooking = async (id: string) => {
  await deleteDoc(doc(bookingsRef, id));
};

// ─── Job Applications ──────────────────────────────────────────────────

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

export const subscribeApplications = (cb: (apps: JobApplication[]) => void, onError?: (err: Error) => void) => {
  const q = query(applicationsRef, orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snapshot) => {
      const list: JobApplication[] = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as JobApplication[];
      cb(list);
    },
    (err) => {
      console.error("subscribeApplications error:", err);
      cb([]);
      onError?.(err);
    },
  );
};

export const updateApplicationStatus = async (id: string, status: JobApplication["status"]) => {
  await updateDoc(doc(applicationsRef, id), { status });
};

export const deleteApplication = async (id: string) => {
  await deleteDoc(doc(applicationsRef, id));
};

// ─── Employees / Role Management ───────────────────────────────────────

const employeesRef = collection(db, "chippolux_employees");

const fallbackEmployees: Employee[] = [
  {
    id: "fFYjlUfDDUMifRZcynhwjeNxxQH2",
    email: "febiasc@yahoo.com",
    password: "",
    displayName: "Mr Febiasc Chibilika",
    phone: "",
    role: "super_admin",
    isActive: true,
    createdAt: 0,
    lastLogin: null,
  },
  {
    id: "Vkgk0e1v9cSrRme2YnX49OxYqIm1",
    email: "info@chiposluxapartments.com",
    password: "",
    displayName: "Receptionist",
    phone: "",
    role: "receptionist",
    isActive: true,
    createdAt: 0,
    lastLogin: null,
  },
];

const getFallbackEmployee = (uid: string, email?: string | null) =>
  fallbackEmployees.find(
    (employee) => employee.id === uid || (!!email && employee.email.toLowerCase() === email.toLowerCase()),
  ) ?? null;

const mergeFallbackEmployees = (employees: Employee[]) => {
  const byId = new Map(employees.map((employee) => [employee.id, employee]));
  fallbackEmployees.forEach((employee) => {
    if (!byId.has(employee.id)) {
      byId.set(employee.id, employee);
    }
  });
  return Array.from(byId.values());
};

// Fetch a single employee by Firebase auth UID
export const getEmployee = async (uid: string, email?: string | null): Promise<Employee | null> => {
  try {
    const snap = await getDoc(doc(employeesRef, uid));
    if (!snap.exists()) return getFallbackEmployee(uid, email);
    return { id: snap.id, ...snap.data() } as Employee;
  } catch {
    return getFallbackEmployee(uid, email);
  }
};

// Subscribe to all employees (for super admin)
export const subscribeEmployees = (cb: (employees: Employee[]) => void, onError?: (err: Error) => void) => {
  const q = query(employeesRef, orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snapshot) => {
      const list: Employee[] = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as Employee[];
      cb(mergeFallbackEmployees(list));
    },
    (err) => {
      console.error("subscribeEmployees error:", err);
      cb(mergeFallbackEmployees([]));
      onError?.(err);
    },
  );
};

// Create a new employee (Firebase Auth account + Firestore doc)
export const createEmployee = async (data: {
  email: string;
  password: string;
  displayName: string;
  phone: string;
  role: Role;
}) => {
  // Create Firebase Auth account
  const cred = await createUserWithEmailAndPassword(auth, data.email, data.password);
  const uid = cred.user.uid;

  // Store role & profile in Firestore
  await setDoc(doc(employeesRef, uid), {
    email: data.email,
    password: data.password, // stored for admin reference; in production use Firebase Auth only
    displayName: data.displayName,
    phone: data.phone,
    role: data.role,
    isActive: true,
    createdAt: Date.now(),
    lastLogin: null,
  });

  // Log the auth user out so the admin session stays as the current admin
  await signOut(auth);
  // Re-sign in as the original admin — caller must re-auth or manage state
  return uid;
};

// Update an employee's role or profile
export const updateEmployee = async (uid: string, data: Partial<Employee>) => {
  await updateDoc(doc(employeesRef, uid), data);
};

// Toggle employee active/inactive
export const toggleEmployeeActive = async (uid: string, isActive: boolean) => {
  await updateDoc(doc(employeesRef, uid), { isActive });
};

// Delete an employee
export const deleteEmployee = async (uid: string) => {
  await deleteDoc(doc(employeesRef, uid));
  // Note: Firebase Auth account deletion requires Admin SDK on backend
  // For now this removes the Firestore record only
};
