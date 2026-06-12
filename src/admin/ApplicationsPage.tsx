import { useEffect, useState } from "react";
import { subscribeApplications, updateApplicationStatus, JobApplication } from "../firebase";

export default function ApplicationsPage() {
  const [apps, setApps] = useState<JobApplication[]>([]);
  const [filter, setFilter] = useState<JobApplication["status"] | "all">("all");
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeApplications((list) => setApps(list));
    return unsub;
  }, []);

  const filtered = filter === "all" ? apps : apps.filter((a) => a.status === filter);

  const handleStatus = async (id: string, status: JobApplication["status"]) => {
    setBusyId(id);
    try {
      await updateApplicationStatus(id, status);
    } catch (e) {
      console.error("Status update failed", e);
    } finally {
      setBusyId(null);
    }
  };

  const statusFilters: { label: string; value: JobApplication["status"] | "all" }[] = [
    { label: "All", value: "all" },
    { label: "New", value: "new" },
    { label: "Reviewed", value: "reviewed" },
    { label: "Shortlisted", value: "shortlisted" },
    { label: "Rejected", value: "rejected" },
  ];

  return (
    <div>
      <div className="filter-bar">
        {statusFilters.map((f) => (
          <button
            key={f.value}
            className={`filter-chip ${filter === f.value ? "is-active" : ""}`}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
            {f.value !== "all" ? (
              <span className="filter-count">{apps.filter((a) => a.status === f.value).length}</span>
            ) : null}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">○</div>
          <p>No applications yet.</p>
          <span className="empty-sub">Job applications will appear here when candidates apply.</span>
        </div>
      ) : (
        <div className="table-shell">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Position</th>
                <th>Message</th>
                <th>Received</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id} className={`table-row-${a.status}`}>
                  <td className="td-name">{a.fullName}</td>
                  <td>
                    <div className="td-contact">
                      <a href={`tel:${a.phone}`}>{a.phone}</a>
                      <a href={`mailto:${a.email}`}>{a.email}</a>
                    </div>
                  </td>
                  <td><span className="td-position">{a.position}</span></td>
                  <td className="td-msg">
                    {a.message ? (
                      <span title={a.message}>
                        {a.message.length > 50 ? a.message.slice(0, 50) + "…" : a.message}
                      </span>
                    ) : "—"}
                  </td>
                  <td className="td-date">
                    {a.createdAt ? new Date(a.createdAt.toMillis()).toLocaleDateString() : "—"}
                  </td>
                  <td>
                    <span className={`dash-status status-${a.status}`}>{a.status}</span>
                  </td>
                  <td className="td-actions">
                    <div className="action-group">
                      {a.status === "new" ? (
                        <button className="action-btn action-contact" onClick={() => handleStatus(a.id, "reviewed")} disabled={busyId === a.id}>
                          Review
                        </button>
                      ) : null}
                      {a.status === "reviewed" ? (
                        <>
                          <button className="action-btn action-book" onClick={() => handleStatus(a.id, "shortlisted")} disabled={busyId === a.id}>
                            Shortlist
                          </button>
                          <button className="action-btn action-del" onClick={() => handleStatus(a.id, "rejected")} disabled={busyId === a.id}>
                            Reject
                          </button>
                        </>
                      ) : null}
                      {a.status === "shortlisted" || a.status === "rejected" ? (
                        <span className="action-final">
                          {a.status === "shortlisted" ? "✓ Final" : "✕ Final"}
                        </span>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
