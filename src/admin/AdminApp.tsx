import { useState, useEffect } from "react";
import { onAuthChange, getEmployee } from "../firebase";
import type { User } from "firebase/auth";
import AuthPage from "./AuthPage";
import DashboardLayout from "./DashboardLayout";
import type { Employee } from "./types";

export default function AdminApp() {
  const [user, setUser] = useState<User | null>(null);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthChange(async (u) => {
      setUser(u);
      if (u) {
        const emp = await getEmployee(u.uid, u.email);
        setEmployee(emp);
      } else {
        setEmployee(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-loading-spinner" />
        <p>Chipo's Lux · Admin</p>
      </div>
    );
  }

  if (!user || !employee) return <AuthPage />;
  return <DashboardLayout user={user} employee={employee} />;
}
