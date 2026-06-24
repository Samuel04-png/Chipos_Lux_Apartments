import { useEffect, useState } from "react";
import { subscribeEmployees, createEmployee, updateEmployee, toggleEmployeeActive, deleteEmployee } from "../firebase";
import type { Employee, Role } from "./types";
import { ROLE_LABELS, ROLE_COLORS } from "./types";
import { AdminLayout, RoleBadge, Modal, ConfirmDialog, useToast, SearchInput, EmptyState } from "./SharedComponents";

const defaultForm = {
  email: "",
  password: "",
  displayName: "",
  phone: "",
  role: "staff" as Role,
};

export default function EmployeesPage() {
  const { addToast, ToastContainer } = useToast();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Employee | null>(null);
  const [form, setForm] = useState(defaultForm);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Employee | null>(null);

  useEffect(() => {
    const unsub = subscribeEmployees((list) => setEmployees(list));
    return unsub;
  }, []);

  const filtered = search
    ? employees.filter((e) => {
        const q = search.toLowerCase();
        return (
          e.displayName.toLowerCase().includes(q) ||
          e.email.toLowerCase().includes(q) ||
          e.role.toLowerCase().includes(q)
        );
      })
    : employees;

  const activeCount = employees.filter((e) => e.isActive).length;

  const openAdd = () => {
    setEditing(null);
    setForm(defaultForm);
    setModalOpen(true);
  };

  const openEdit = (emp: Employee) => {
    setEditing(emp);
    setForm({
      email: emp.email,
      password: "",
      displayName: emp.displayName,
      phone: emp.phone,
      role: emp.role,
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.displayName.trim() || !form.email.trim()) {
      addToast("Display name and email are required.", "error");
      return;
    }

    if (!editing && !form.password.trim()) {
      addToast("Password is required for new employees.", "error");
      return;
    }

    setSaving(true);
    try {
      if (editing) {
        const updates: Partial<Employee> = {
          displayName: form.displayName.trim(),
          phone: form.phone.trim(),
          role: form.role,
        };
        if (form.password.trim()) {
          (updates as any).password = form.password.trim();
        }
        await updateEmployee(editing.id, updates);
        addToast(`${form.displayName.trim()} updated.`, "success");
      } else {
        await createEmployee({
          email: form.email.trim(),
          password: form.password.trim(),
          displayName: form.displayName.trim(),
          phone: form.phone.trim(),
          role: form.role,
        });
        addToast(`${form.displayName.trim()} added as ${ROLE_LABELS[form.role]}.`, "success");
      }
      setModalOpen(false);
    } catch (err: any) {
      addToast(err?.message || "Failed to save employee.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (emp: Employee) => {
    try {
      await toggleEmployeeActive(emp.id, !emp.isActive);
      addToast(`${emp.displayName} ${emp.isActive ? "deactivated" : "activated"}.`, "info");
    } catch {
      addToast("Failed to update status.", "error");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteEmployee(deleteTarget.id);
      addToast(`${deleteTarget.displayName} removed.`, "success");
    } catch {
      addToast("Failed to delete employee.", "error");
    }
    setDeleteTarget(null);
  };

  const roleOptions: Role[] = ["super_admin", "admin", "booking_manager", "receptionist", "staff", "housekeeping"];

  return (
    <AdminLayout
      title="Employees"
      subtitle={`${employees.length} employees · ${activeCount} active`}
      action={
        <button className="btn-primary" onClick={openAdd}>+ Add Employee</button>
      }
    >
      {employees.length === 0 ? (
        <EmptyState icon="✦" title="No employees yet" subtitle="Add your first employee to assign roles and permissions." />
      ) : (
        <>
          <SearchInput value={search} onChange={setSearch} placeholder="Search employees..." />
          <div className="employee-grid" style={{ marginTop: 16 }}>
            {filtered.map((emp) => (
              <div key={emp.id} className="employee-card">
                <div className="employee-card-header">
                  <div
                    className="employee-card-avatar"
                    style={{ background: ROLE_COLORS[emp.role] }}
                  >
                    {emp.displayName.charAt(0).toUpperCase()}
                  </div>
                  <RoleBadge role={emp.role} />
                </div>
                <div className="employee-card-name">{emp.displayName}</div>
                <div className="employee-card-email">{emp.email}</div>
                <div className="employee-card-meta">
                  <span>📞 {emp.phone || "—"}</span>
                  <span>🕐 {emp.lastLogin ? new Date(emp.lastLogin).toLocaleDateString() : "Never logged in"}</span>
                </div>
                <div className="employee-card-actions">
                  <button
                    className={`status-toggle ${emp.isActive ? "active" : "inactive"}`}
                    onClick={() => handleToggleActive(emp)}
                  >
                    {emp.isActive ? "● Active" : "○ Inactive"}
                  </button>
                  <button className="btn-secondary" style={{ height: 30, padding: "0 12px", fontSize: 12 }} onClick={() => openEdit(emp)}>
                    Edit
                  </button>
                  <button className="btn-danger" style={{ height: 30, padding: "0 12px", fontSize: 12 }} onClick={() => setDeleteTarget(emp)}>
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Add/Edit Modal */}
      <Modal
        title={editing ? "Edit Employee" : "Add Employee"}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        footer={
          <>
            <button className="btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
            <button className="btn-primary" onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : editing ? "Save Changes" : "Add Employee"}
            </button>
          </>
        }
      >
        <div className="form-group">
          <label>Display Name</label>
          <input className="form-input" value={form.displayName} onChange={(e) => setForm({ ...form, displayName: e.target.value })} placeholder="e.g. Jane Mwila" />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Email</label>
            <input className="form-input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@example.com" disabled={!!editing} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input className="form-input" type="text" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder={editing ? "Leave blank to keep" : "Set a password"} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Phone</label>
            <input className="form-input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+260..." />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select className="form-select" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as Role })}>
              {roleOptions.map((r) => (
                <option key={r} value={r}>{ROLE_LABELS[r]}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ marginTop: 8, padding: "10px 12px", background: "rgba(201,149,74,0.06)", borderRadius: 8, fontSize: 12, color: "#6b7280", lineHeight: 1.5 }}>
          <strong style={{ display: "block", marginBottom: 4, color: "#111827" }}>Role Permissions</strong>
          {form.role === "super_admin" && "Full access to all admin features, settings, and employee management."}
          {form.role === "admin" && "Can manage bookings and applications. Can view employee list."}
          {form.role === "booking_manager" && "Can view dashboard and manage bookings."}
          {form.role === "receptionist" && "Can view dashboard, manage booking inquiries, and view job applications. No administrator settings or employee management access."}
          {form.role === "staff" && "Read-only access to dashboard, bookings, and applications."}
          {form.role === "housekeeping" && "Read-only dashboard access."}
        </div>
      </Modal>

      {/* Delete Confirm */}
      <ConfirmDialog
        open={!!deleteTarget}
        title="Remove Employee"
        message={`Remove ${deleteTarget?.displayName || ""} from the system? They will lose access immediately.`}
        confirmText="Remove"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <ToastContainer />
    </AdminLayout>
  );
}
