import { useState, useCallback, useEffect, useRef } from "react";

// ─── Toast ────────────────────────────────────────────────────────────

type ToastType = "success" | "error" | "info";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

let toastId = 0;

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType = "info") => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const ToastContainer = () =>
    toasts.length > 0 ? (
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast-${t.type}`}>
            {t.type === "success" ? "✓" : t.type === "error" ? "✕" : "ℹ"} {t.message}
          </div>
        ))}
      </div>
    ) : null;

  return { addToast, ToastContainer };
}

// ─── Modal ────────────────────────────────────────────────────────────

interface ModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function Modal({ title, open, onClose, children, footer }: ModalProps) {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}

// ─── Confirm Dialog ───────────────────────────────────────────────────

interface ConfirmProps {
  open: boolean;
  title: string;
  message: string;
  confirmText?: string;
  variant?: "danger" | "default";
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({ open, title, message, confirmText = "Confirm", variant = "default", onConfirm, onCancel }: ConfirmProps) {
  if (!open) return null;

  return (
    <div className="confirm-overlay" onClick={onCancel}>
      <div className="confirm-content" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="confirm-actions">
          <button className="btn-secondary" onClick={onCancel}>Cancel</button>
          <button className={variant === "danger" ? "btn-danger" : "btn-primary"} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── AdminLayout ──────────────────────────────────────────────────────

interface AdminLayoutProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

export function AdminLayout({ title, subtitle, action, children }: AdminLayoutProps) {
  return (
    <>
      <div className="admin-layout-header">
        <div className="admin-layout-header-text">
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {action && <div className="admin-layout-header-actions">{action}</div>}
      </div>
      {children}
    </>
  );
}

// ─── EmptyState ───────────────────────────────────────────────────────

interface EmptyStateProps {
  icon?: string;
  title: string;
  subtitle?: string;
}

export function EmptyState({ icon = "◇", title, subtitle }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>
      <p>{title}</p>
      {subtitle && <span className="empty-sub">{subtitle}</span>}
    </div>
  );
}

// ─── RoleBadge ────────────────────────────────────────────────────────

import { Role, ROLE_LABELS, ROLE_COLORS } from "./types";

export function RoleBadge({ role }: { role: Role }) {
  return (
    <span
      className="role-badge"
      style={{ background: `${ROLE_COLORS[role]}22`, color: ROLE_COLORS[role] }}
    >
      {ROLE_LABELS[role]}
    </span>
  );
}

// ─── StatusBadge ──────────────────────────────────────────────────────

export function StatusBadge({ status }: { status: string }) {
  return <span className={`dash-status status-${status}`}>{status}</span>;
}

// ─── Search Input ─────────────────────────────────────────────────────

export function SearchInput({ value, onChange, placeholder = "Search..." }: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="table-shell-search">
      <span className="table-shell-search-icon">🔍</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
