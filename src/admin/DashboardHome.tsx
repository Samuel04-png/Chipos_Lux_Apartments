import { useEffect, useState } from "react";
import {
  subscribeBookings,
  subscribeApplications,
  Booking,
  JobApplication,
} from "../firebase";
import { Role, Permission } from "./types";

interface Props {
  onNavigate: (page: any) => void;
  role: Role;
  hasPermission: (perm: Permission) => boolean;
}

export default function DashboardHome({ onNavigate, hasPermission }: Props) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub1 = subscribeBookings((list) => {
      setBookings(list);
      setLoading(false);
    });
    const unsub2 = subscribeApplications((list) => {
      setApplications(list);
    });
    return () => { unsub1(); unsub2(); };
  }, []);

  if (loading) {
    return <div className="page-loading">Loading dashboard...</div>;
  }

  const newBookings = bookings.filter((b) => b.status === "new").length;
  const contactedBookings = bookings.filter((b) => b.status === "contacted").length;
  const newApps = applications.filter((a) => a.status === "new").length;
  const recentBookings = bookings.slice(0, 5);

  return (
    <div>
      {/* Stats Grid */}
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-icon stat-icon-gold">◇</div>
          <div>
            <p className="stat-value">{bookings.length}</p>
            <p className="stat-label">Total Bookings</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-icon-wine">◈</div>
          <div>
            <p className="stat-value">{newBookings}</p>
            <p className="stat-label">New Inquiries</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-icon-leaf">●</div>
          <div>
            <p className="stat-value">{contactedBookings}</p>
            <p className="stat-label">In Contact</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-icon-ink">○</div>
          <div>
            <p className="stat-value">{applications.length}</p>
            <p className="stat-label">Job Applications</p>
          </div>
        </div>
      </div>

      <div className="dash-grid-2">
        {/* Recent Bookings */}
        <div className="dash-panel">
          <div className="dash-panel-header">
            <h3>Recent Bookings</h3>
            {hasPermission("bookings.view") && (
              <button className="dash-link" onClick={() => onNavigate("bookings")}>
                View All →
              </button>
            )}
          </div>
          {recentBookings.length === 0 ? (
            <div className="dash-empty">No bookings yet.</div>
          ) : (
            <div className="dash-list">
              {recentBookings.map((b) => (
                <div key={b.id} className="dash-item">
                  <div className="dash-item-badge" data-status={b.status} />
                  <div className="dash-item-info">
                    <strong>{b.fullName}</strong>
                    <span>{b.phone} · {b.createdAt?.toMillis ? new Date(b.createdAt.toMillis()).toLocaleDateString() : "—"}</span>
                  </div>
                  <span className={`dash-status status-${b.status}`}>{b.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions + New Applications */}
        <div className="dash-panel">
          <div className="dash-panel-header">
            <h3>Quick Actions</h3>
          </div>
          <div className="quick-actions">
            {hasPermission("bookings.view") && (
              <button className="quick-btn" onClick={() => onNavigate("bookings")}>
                <span className="quick-icon">◇</span>
                <span>Manage Bookings</span>
              </button>
            )}
            {hasPermission("applications.view") && (
              <button className="quick-btn" onClick={() => onNavigate("applications")}>
                <span className="quick-icon">○</span>
                <span>Review Applications</span>
              </button>
            )}
            <a className="quick-btn" href="/" target="_blank" rel="noreferrer">
              <span className="quick-icon">◈</span>
              <span>View Live Site</span>
            </a>
            <a
              className="quick-btn"
              href="https://console.firebase.google.com/project/tailored-manor/firestore/data"
              target="_blank"
              rel="noreferrer"
            >
              <span className="quick-icon">✦</span>
              <span>Firebase Console</span>
            </a>
          </div>

          {/* New Applications Alert */}
          {newApps > 0 && (
            <div style={{ marginTop: 16, padding: "12px 14px", background: "rgba(201,149,74,0.08)", borderRadius: 8, border: "1px solid rgba(201,149,74,0.15)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 500 }}>
                <span style={{ fontSize: 16 }}>○</span>
                <span><strong>{newApps}</strong> new job application{newApps !== 1 ? "s" : ""} to review</span>
                {hasPermission("applications.view") && (
                  <button className="dash-link" onClick={() => onNavigate("applications")} style={{ marginLeft: "auto" }}>
                    View →
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
