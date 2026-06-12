import { useEffect, useState } from "react";
import { subscribeApplications, updateApplicationStatus, deleteApplication, JobApplication } from "../firebase";
import { AdminLayout, StatusBadge, SearchInput, EmptyState } from "./SharedComponents";

export default function ApplicationsPage() {
  const [apps, setApps] = useState<JobApplication[]>([]);
  const [filter, setFilter] = useState<JobApplication["status"] | "all">("all");
  const [search, setSearch] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeApplications((list) => setApps(list));
    return unsub;
  }, []);

  const filtered = apps.filter((a) => {
    if (filter !== "all" && a.status !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        a.fullName.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q) ||
        a.phone.includes(q) ||
        a.position.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleStatus = async (id: string, status: JobApplication["status"]) => {
    setBusyId(id);
    try { await updateApplicationStatus(id, status); }
    catch (e) { console.error("Status update failed", e); }
    finally { setBusyId(null); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this application permanently?")) return;
    setBusyId(id);
    try { await deleteApplication(id); }
    catch (e) { console.error("Delete failed", e); }
    finally { setBusyId(null); }
  };

  const statusFilters: { label: string; value: JobApplication["status"] | "all" }[] = [
    { label: "All", value: "all" },
    { label: "New", value: "new" },
    { label: "Reviewed", value: "reviewed" },
    { label: "Shortlisted", value: "shortlisted" },
    { label: "Rejected", value: "rejected" },
  ];

  return (
    <AdminLayout
      title="Job Applications"
      subtitle={`${apps.length} total · ${apps.filter(a => a.status === "new").length} new`}
    >
      <div className="filter-bar">
        {statusFilters.map((f) => (
          <button
            key={f.value}
            className={`filter-chip ${filter === f.value ? "is-active" : ""}`}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
            {f.value !== "all" && (
              <span className="filter-count">{apps.filter((a) => a.status === f.value).length}</span>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon="○"
          title="No applications found"
          subtitle={search ? "Try a different search term." : "Applications will appear here when candidates apply."}
        />
      ) : (
        <div className="table-shell">
          <SearchInput value={search} onChange={setSearch} placeholder="Search by name, email, phone, or position..." />
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
                <tr key={a.id}>
                  <td className="td-name">{a.fullName}</td>
                  <td>
                    <div className="td-contact">
                      <a href={`tel:${a.phone}`}>{a.phone}</a>
                      <a href={`mailto:${a.email}`}>{a.email}</a>
                    </div>
                  </td>
                  <td><span className="td-position">{a.position}</span></td>
                  <td className="td-msg">{a.message || "—"}</td>
                  <td className="td-date">
                    {a.createdAt?.toMillis ? new Date(a.createdAt.toMillis()).toLocaleDateString() : "—"}
                  </td>
                  <td><StatusBadge status={a.status} /></td>
                  <td className="td-actions">
                    <div className="action-group">
                      {a.status === "new" && (
                        <button className="action-btn action-contact" onClick={() => handleStatus(a.id, "reviewed")} disabled={busyId === a.id}>
                          Review
                        </button>
                      )}
                      {a.status === "reviewed" && (
                        <>
                          <button className="action-btn action-book" onClick={() => handleStatus(a.id, "shortlisted")} disabled={busyId === a.id}>
                            Shortlist
                          </button>
                          <button className="action-btn action-del" onClick={() => handleStatus(a.id, "rejected")} disabled={busyId === a.id}>
                            Reject
                          </button>
                        </>
                      )}
                      {a.status === "shortlisted" && <span className="action-final">✓ Final</span>}
                      {a.status === "rejected" && <span className="action-final">✕ Final</span>}
                      <button className="action-btn action-del" onClick={() => handleDelete(a.id)} disabled={busyId === a.id}>
                        ✕
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
