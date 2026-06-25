import { Permission } from "./types";

interface Props {
  onNavigate: (page: any) => void;
  hasPermission: (perm: Permission) => boolean;
}

export default function DashboardHome({ onNavigate, hasPermission }: Props) {
  return (
    <div className="dash-grid-2">
      <div className="dash-panel">
        <div className="dash-panel-header">
          <h3>Dashboard</h3>
        </div>
        <div className="dash-empty">
          Dashboard stats are disabled. Use the Bookings and Applications tabs to view live submitted records only.
        </div>
      </div>

      <div className="dash-panel">
        <div className="dash-panel-header">
          <h3>Admin shortcuts</h3>
        </div>
        <div className="quick-actions">
          {hasPermission("bookings.view") && (
            <button className="quick-btn" onClick={() => onNavigate("bookings")}>
              <span className="quick-icon">BK</span>
              <span>Open Bookings</span>
            </button>
          )}
          {hasPermission("applications.view") && (
            <button className="quick-btn" onClick={() => onNavigate("applications")}>
              <span className="quick-icon">HR</span>
              <span>Open Applications</span>
            </button>
          )}
          <a className="quick-btn" href="/" target="_blank" rel="noreferrer">
            <span className="quick-icon">WEB</span>
            <span>View Live Site</span>
          </a>
        </div>
      </div>
    </div>
  );
}
