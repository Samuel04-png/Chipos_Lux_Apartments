import { useEffect, useState } from "react";
import { subscribeBookings, updateBookingStatus, deleteBooking, Booking } from "../firebase";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<Booking["status"] | "all">("all");
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeBookings((list) => setBookings(list));
    return unsub;
  }, []);

  const filtered = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  const handleStatus = async (id: string, status: Booking["status"]) => {
    setBusyId(id);
    try {
      await updateBookingStatus(id, status);
    } catch (e) {
      console.error("Status update failed", e);
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this booking inquiry permanently?")) return;
    setBusyId(id);
    try {
      await deleteBooking(id);
    } catch (e) {
      console.error("Delete failed", e);
    } finally {
      setBusyId(null);
    }
  };

  const statusFilters: { label: string; value: Booking["status"] | "all" }[] = [
    { label: "All", value: "all" },
    { label: "New", value: "new" },
    { label: "Contacted", value: "contacted" },
    { label: "Booked", value: "booked" },
    { label: "Closed", value: "closed" },
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
              <span className="filter-count">
                {bookings.filter((b) => b.status === f.value).length}
              </span>
            ) : null}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">◇</div>
          <p>No bookings found.</p>
          <span className="empty-sub">Bookings will appear here when guests submit the inquiry form.</span>
        </div>
      ) : (
        <div className="table-shell">
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
                <tr key={b.id} className={`table-row-${b.status}`}>
                  <td className="td-name">{b.fullName}</td>
                  <td>
                    <div className="td-contact">
                      <a href={`tel:${b.phone}`}>{b.phone}</a>
                      {b.email ? <a href={`mailto:${b.email}`}>{b.email}</a> : null}
                    </div>
                  </td>
                  <td className="td-dates">
                    {b.checkIn || "—"} → {b.checkOut || "—"}
                  </td>
                  <td>{b.guests || "—"}</td>
                  <td className="td-msg">
                    {b.message ? (
                      <span title={b.message}>
                        {b.message.length > 40 ? b.message.slice(0, 40) + "…" : b.message}
                      </span>
                    ) : "—"}
                  </td>
                  <td className="td-date">
                    {b.createdAt ? new Date(b.createdAt.toMillis()).toLocaleDateString() : "—"}
                  </td>
                  <td>
                    <span className={`dash-status status-${b.status}`}>{b.status}</span>
                  </td>
                  <td className="td-actions">
                    <div className="action-group">
                      {b.status === "new" ? (
                        <button className="action-btn action-contact" onClick={() => handleStatus(b.id, "contacted")} disabled={busyId === b.id}>
                          Contact
                        </button>
                      ) : null}
                      {b.status === "contacted" ? (
                        <button className="action-btn action-book" onClick={() => handleStatus(b.id, "booked")} disabled={busyId === b.id}>
                          Book
                        </button>
                      ) : null}
                      {b.status !== "closed" && b.status !== "booked" ? null : null}
                      {b.status === "booked" ? (
                        <button className="action-btn action-close" onClick={() => handleStatus(b.id, "closed")} disabled={busyId === b.id}>
                          Close
                        </button>
                      ) : null}
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
    </div>
  );
}
