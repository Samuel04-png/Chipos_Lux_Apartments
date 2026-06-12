import { useState, useEffect } from "react";
import { onAuthChange, User } from "../firebase";
import AuthPage from "./AuthPage";
import DashboardLayout from "./DashboardLayout";

export default function AdminApp() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthChange((u) => {
      setUser(u);
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

  if (!user) return <AuthPage />;
  return <DashboardLayout />;
}
