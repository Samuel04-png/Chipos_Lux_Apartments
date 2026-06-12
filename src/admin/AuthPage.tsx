import { useState, FormEvent } from "react";
import { loginAdmin } from "../firebase";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }
    setBusy(true);
    try {
      await loginAdmin(email, password);
    } catch (err: any) {
      setError(err.message || "Login failed. Check credentials.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg" />
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-brand">
            <img src="/images/chipos-logo.png" alt="Chipo's Lux" className="auth-logo" />
            <h1 className="auth-heading">Admin Portal</h1>
            <p className="auth-sub">Chipo's Lux Apartments · Choma</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                placeholder="admin@chiposluxapartments.com"
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="••••••••"
                required
              />
            </div>

            {error ? <p className="auth-error">{error}</p> : null}

            <button type="submit" className="auth-btn" disabled={busy}>
              {busy ? (
                <span className="auth-btn-loading" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="auth-footer">
            <a href="/" target="_blank" rel="noreferrer">← Back to website</a>
          </p>
        </div>
      </div>
    </div>
  );
}
