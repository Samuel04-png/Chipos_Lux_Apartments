import { useEffect, useState } from "react";
import {
  subscribeBookings,
  subscribeApplications,
  Booking,
  JobApplication,
} from "../firebase";

interface Props {
  onNavigate: (page: "bookings" | "applications") => void;
}

export default function DashboardHome({ onNavigate }: Props) {
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

  const newBookings = bookings.filter((b) => b.status === "new").length;
  const newApps = applications.filter((a) => a.status === "new").length;

  const recentBookings = bookings.slice(0, 5);

  if (loading) {
    return <div className="page-loading">Loading dashboard...</div>;
  }

  return (
    <div>
      <div className="stat-grid">
        <div className="stat-card stat-card-gold">
          <div className="stat-icon">◇</div>
          <div>
            <p className="stat-value">{bookings.length}</p>
            <p className="stat-label">Total Bookings</p>
          </div>
        </div>
        <div className="stat-card stat-card-wine">
          <div className="stat-icon">◈</div>
          <div>
            <p className="stat-value">{newBookings}</p>
            <p className="stat-label">New Inquiries</p>
          </div>
        </div>
        <div className="stat-card stat-card-ink">
          <div className="stat-icon">○</div>
          <div>
            <p className="stat-value">{applications.length}</p>
            <p className="stat-label">Job Applications</p>
          </div>
        </div>
        <div className="stat-card stat-card-leaf">
          <div className="stat-icon">●</div>
          <div>
            <p className="stat-value">{newApps}</p>
            <p className="stat-label">New Applicants</p>
          </div>
        </div>
      </div>

      <div className="dash-grid-2">
        <div className="dash-panel">
          <div className="dash-panel-header">
            <h3>Recent Bookings</h3>
            <button className="dash-link" onClick={() => onNavigate("bookings")}>
              View All →
            </button>
          </div>
          {recentBookings.length === 0 ? (
            <p className="dash-empty">No bookings yet.</p>
          ) : (
            <div className="dash-list">
              {recentBookings.map((b) => (
                <div key={b.id} className="dash-item">
                  <div className="dash-item-badge" data-status={b.status} />
                  <div className="dash-item-info">
                    <strong>{b.fullName}</strong>
                    <span>{b.phone} · {new Date(b.createdAt?.toMillis()).toLocaleDateString()}</span>
                  </div>
                  <span className={`dash-status status-${b.status}`}>{b.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="dash-panel">
          <div className="dash-panel-header">
            <h3>Quick Actions</h3>
          </div>
          <div className="quick-actions">
            <button className="quick-btn" onClick={() => onNavigate("bookings")}>
              <span className="quick-icon">◇</span>
              <span>Manage Bookings</span>
            </button>
            <button className="quick-btn" onClick={() => onNavigate("applications")}>
              <span className="quick-icon">○</span>
              <span>Review Applications</span>
            </button>
            <a className="quick-btn" href="/" target="_blank" rel="noreferrer">
              <span className="quick-icon">◈</span>
              <span>View Live Site</span>
            </a>
            <a className="quick-btn" href={`https://console.firebase.google.com/project/tailored-manor/firestore/data`} target="_blank" rel="noreferrer">
              <span className="quick-icon">✦</span>
              <span>Firebase Console</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
