import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { BriefcaseBusiness, CalendarCheck, LayoutDashboard, LogOut, Menu, UsersRound } from "lucide-react";
import type { User } from "firebase/auth";
import { logoutAdmin } from "../firebase";
import type { Employee, Role, Permission } from "./types";
import { ROLE_LABELS, ROLE_COLORS, ROLE_PERMISSIONS } from "./types";
import DashboardHome from "./DashboardHome";
import BookingsPage from "./BookingsPage";
import ApplicationsPage from "./ApplicationsPage";
import EmployeesPage from "./EmployeesPage";

// ─── Role Helper ──────────────────────────────────────────────────────

function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

// ─── Nav Items ────────────────────────────────────────────────────────

interface NavItem {
  id: Page;
  label: string;
  icon: LucideIcon;
  permission?: Permission;
  section: string;
}

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, permission: "dashboard.view", section: "Main" },
  { id: "bookings", label: "Bookings", icon: CalendarCheck, permission: "bookings.view", section: "Operations" },
  { id: "applications", label: "Applications", icon: BriefcaseBusiness, permission: "applications.view", section: "Operations" },
  { id: "employees", label: "Employees", icon: UsersRound, permission: "employees.view", section: "Admin" },
];

type Page = "dashboard" | "bookings" | "applications" | "employees";

// ─── Props ────────────────────────────────────────────────────────────

interface Props {
  user: User;
  employee: Employee;
}

export default function DashboardLayout({ user, employee }: Props) {
  const [page, setPage] = useState<Page>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const role = employee.role;
  const userName = employee.displayName || user.email?.split("@")[0] || "Admin";
  const userInitial = userName.charAt(0).toUpperCase();
  const roleColor = ROLE_COLORS[role];
  const filteredNav = navItems.filter(
    (item) => !item.permission || hasPermission(role, item.permission)
  );

  const renderPage = () => {
    switch (page) {
      case "bookings":
        return <BookingsPage />;
      case "applications":
        return <ApplicationsPage />;
      case "employees":
        return <EmployeesPage />;
      default:
        return <DashboardHome
          onNavigate={(p: Page) => setPage(p)}
          hasPermission={(perm: Permission) => hasPermission(role, perm)}
        />;
    }
  };

  const pageTitle = page === "dashboard" ? "Dashboard"
    : page === "bookings" ? "Bookings"
    : page === "applications" ? "Job Applications"
    : "Employees";

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

        <div className="sidebar-user">
          <div className="sidebar-user-avatar">{userInitial}</div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{userName}</div>
            <span className="sidebar-user-role-badge" style={{ background: `${roleColor}22`, color: roleColor }}>
              {ROLE_LABELS[role]}
            </span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {filteredNav.map((item, idx, arr) => {
            const showSectionLabel = idx === 0 || item.section !== arr[idx - 1].section;
            const Icon = item.icon;
            return (
              <div key={item.id}>
                {showSectionLabel && (
                  <div className="sidebar-section-label">{item.section}</div>
                )}
                <button
                  className={`sidebar-link ${page === item.id ? "is-active" : ""}`}
                  onClick={() => { setPage(item.id); setSidebarOpen(false); }}
                >
                  <Icon className="sidebar-icon" aria-hidden="true" size={18} strokeWidth={2} />
                  <span>{item.label}</span>
                </button>
              </div>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-logout" onClick={logoutAdmin}>
            <LogOut aria-hidden="true" size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Overlay (mobile) */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="admin-main">
        <header className="admin-topbar">
          <button className="topbar-hamburger" onClick={() => setSidebarOpen(true)} aria-label="Open admin navigation">
            <Menu aria-hidden="true" size={22} />
          </button>
          <h2 className="topbar-title">{pageTitle}</h2>
          <div className="topbar-spacer" />
          <div className="topbar-meta">
            <span className="topbar-meta-dot" />
            {ROLE_LABELS[role]}
          </div>
        </header>

        <div className="admin-content">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}
