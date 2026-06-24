// ─── Roles & Permissions ────────────────────────────────────────────────

export type Role = "super_admin" | "admin" | "booking_manager" | "receptionist" | "staff" | "housekeeping";

export type Permission =
  | "dashboard.view"
  | "bookings.view"
  | "bookings.edit"
  | "bookings.delete"
  | "applications.view"
  | "applications.edit"
  | "employees.view"
  | "employees.edit"
  | "employees.create"
  | "employees.delete"
  | "settings.view"
  | "settings.edit";

export const ROLE_LABELS: Record<Role, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  booking_manager: "Booking Manager",
  receptionist: "Receptionist",
  staff: "Staff",
  housekeeping: "Housekeeping",
};

export const ROLE_COLORS: Record<Role, string> = {
  super_admin: "#c084fc",
  admin: "#60a5fa",
  booking_manager: "#fbbf24",
  receptionist: "#34d399",
  staff: "#34d399",
  housekeeping: "#f472b6",
};

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  super_admin: [
    "dashboard.view",
    "bookings.view", "bookings.edit", "bookings.delete",
    "applications.view", "applications.edit",
    "employees.view", "employees.edit", "employees.create", "employees.delete",
    "settings.view", "settings.edit",
  ],
  admin: [
    "dashboard.view",
    "bookings.view", "bookings.edit", "bookings.delete",
    "applications.view", "applications.edit",
    "employees.view",
    "settings.view",
  ],
  booking_manager: [
    "dashboard.view",
    "bookings.view", "bookings.edit",
    "applications.view",
  ],
  receptionist: [
    "dashboard.view",
    "bookings.view", "bookings.edit",
    "applications.view",
  ],
  staff: [
    "dashboard.view",
    "bookings.view",
    "applications.view",
  ],
  housekeeping: [
    "dashboard.view",
  ],
};

// ─── Firestore Models ───────────────────────────────────────────────────

export interface Employee {
  id: string;
  email: string;
  password: string;
  displayName: string;
  phone: string;
  role: Role;
  isActive: boolean;
  createdAt: number;
  lastLogin: number | null;
}

export interface Booking {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  message: string;
  createdAt: any;
  status: "new" | "contacted" | "booked" | "closed";
  assignedTo?: string;
  notes?: string;
}

export interface JobApplication {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  position: string;
  message: string;
  createdAt: any;
  status: "new" | "reviewed" | "shortlisted" | "rejected";
}

export interface ActivityLog {
  id: string;
  action: string;
  detail: string;
  performedBy: string;
  createdAt: number;
}
