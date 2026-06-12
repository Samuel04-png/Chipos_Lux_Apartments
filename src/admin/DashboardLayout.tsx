import { useState } from "react";
import { logoutAdmin } from "../firebase";
import DashboardHome from "./DashboardHome";
import BookingsPage from "./BookingsPage";
import ApplicationsPage from "./ApplicationsPage";

type Page = "dashboard" | "bookings" | "applications";

const navItems: { id: Page; label: string; icon: string }[] = [
  { id: "dashboard", label: "Dashboard", icon: "◈" },
  { id: "bookings", label: "Bookings", icon: "◇" },
  { id: "applications", label: "Applications", icon: "○" },
];

export default function DashboardLayout() {
  const [page, setPage] = useState<Page>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (page) {
      case "bookings": return <BookingsPage />;
      case "applications": return <ApplicationsPage />;
      default: return <DashboardHome onNavigate={setPage} />;
    }
  };

  return (
    <div className="admin-shell">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? "is-open" : ""}`}>
        <div className="sidebar-brand">
          <img src="/images/chipos-logo.png" alt="Chipo's Lux" className="sidebar-logo" />
          <div className="sidebar-brand-text">
            <span className="sidebar-brand-name">Chipo's Lux</span>
            <span className="sidebar-brand-role">Admin Panel</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`sidebar-link ${page === item.id ? "is-active" : ""}`}
              onClick={() => { setPage(item.id); setSidebarOpen(false); }}
            >
              <span className="sidebar-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-logout" onClick={logoutAdmin}>
            ✕ Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen ? (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      ) : null}

      {/* Main */}
      <div className="admin-main">
        <header className="admin-topbar">
          <button className="topbar-hamburger" onClick={() => setSidebarOpen(true)}>
            <span /><span /><span />
          </button>
          <h2 className="topbar-title">
            {page === "dashboard" ? "Dashboard" : page === "bookings" ? "Bookings" : "Job Applications"}
          </h2>
          <div className="topbar-spacer" />
        </header>

        <div className="admin-content">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}
