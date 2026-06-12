import { useEffect, useState } from "react";
import { subscribeBookings, updateBookingStatus, deleteBooking, Booking } from "../firebase";
import { AdminLayout, StatusBadge, SearchInput, EmptyState } from "./SharedComponents";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<Booking["status"] | "all">("all");
  const [search, setSearch] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeBookings((list) => setBookings(list));
    return unsub;
  }, []);

  const filtered = bookings.filter((b) => {
    if (filter !== "all" && b.status !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        b.fullName.toLowerCase().includes(q) ||
        b.phone.includes(q) ||
        b.email.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleStatus = async (id: string, status: Booking["status"]) => {
    setBusyId(id);
    try { await updateBookingStatus(id, status); }
    catch (e) { console.error("Status update failed", e); }
    finally { setBusyId(null); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this booking inquiry permanently?")) return;
    setBusyId(id);
    try { await deleteBooking(id); }
    catch (e) { console.error("Delete failed", e); }
    finally { setBusyId(null); }
  };

  const statusFilters: { label: string; value: Booking["status"] | "all" }[] = [
    { label: "All", value: "all" },
    { label: "New", value: "new" },
    { label: "Contacted", value: "contacted" },
    { label: "Booked", value: "booked" },
    { label: "Closed", value: "closed" },
  ];

  return (
    <AdminLayout
      title="Bookings"
      subtitle={`${bookings.length} total · ${bookings.filter(b => b.status === "new").length} new`}
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
              <span className="filter-count">{bookings.filter((b) => b.status === f.value).length}</span>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon="◇"
          title="No bookings found"
          subtitle={search ? "Try a different search term." : "Bookings will appear here when guests submit the inquiry form."}
        />
      ) : (
        <div className="table-shell">
          <SearchInput value={search} onChange={setSearch} placeholder="Search by name, phone, or email..." />
          <table className="data-table">
            <thead>
              <tr>
                <th>Guest</th>
                <th>Contact</th>
                <th>Dates</th>
                <th>Guests</th>
                <th>Message</th>
                <th>Received</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b.id}>
                  <td className="td-name">{b.fullName}</td>
                  <td>
                    <div className="td-contact">
                      <a href={`tel:${b.phone}`}>{b.phone}</a>
                      {b.email ? <a href={`mailto:${b.email}`}>{b.email}</a> : null}
                    </div>
                  </td>
                  <td className="td-dates">{b.checkIn || "—"} → {b.checkOut || "—"}</td>
                  <td>{b.guests || "—"}</td>
                  <td className="td-msg">{b.message || "—"}</td>
                  <td className="td-date">
                    {b.createdAt?.toMillis ? new Date(b.createdAt.toMillis()).toLocaleDateString() : "—"}
                  </td>
                  <td><StatusBadge status={b.status} /></td>
                  <td className="td-actions">
                    <div className="action-group">
                      {b.status === "new" && (
                        <button className="action-btn action-contact" onClick={() => handleStatus(b.id, "contacted")} disabled={busyId === b.id}>
                          Contact
                        </button>
                      )}
                      {b.status === "contacted" && (
                        <button className="action-btn action-book" onClick={() => handleStatus(b.id, "booked")} disabled={busyId === b.id}>
                          Book
                        </button>
                      )}
                      {(b.status === "booked" && (
                        <button className="action-btn action-close" onClick={() => handleStatus(b.id, "closed")} disabled={busyId === b.id}>
                          Close
                        </button>
                      ))}
                      <button className="action-btn action-del" onClick={() => handleDelete(b.id)} disabled={busyId === b.id}>
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
