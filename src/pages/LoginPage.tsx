import { useState } from "react";
import type { FormEvent } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firebaseReady } from "../lib/firebase";
import "../styles/login.css";

function friendlyError(code: string): string {
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
    case "auth/invalid-email":
      return "That email or password is not correct.";
    case "auth/too-many-requests":
      return "Too many attempts. Wait a few minutes, then try again.";
    case "auth/network-request-failed":
      return "No connection. Check your internet and try again.";
    default:
      return "Could not sign in. Try again.";
  }
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!auth) return;
    setBusy(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      // useAuth picks up the new user and App shows the admin page.
    } catch (err) {
      setError(friendlyError((err as { code?: string }).code ?? ""));
      setBusy(false);
    }
  };

  return (
    <div className="login">
      <form className="login-card" onSubmit={submit}>
        <h1>Admin sign in</h1>

        {!firebaseReady ? (
          <p className="login-error" role="alert">
            Firebase is not set up yet. Copy .env.example to .env.local, fill in your Firebase values, then
            restart the dev server.
          </p>
        ) : (
          <>
            <label>
              Email
              <input
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              Password
              <input
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            {error && (
              <p className="login-error" role="alert">
                {error}
              </p>
            )}
            <button type="submit" className="pri" disabled={busy}>
              {busy ? "Signing in…" : "Sign in"}
            </button>
          </>
        )}

        <a className="login-back" href="#">
          Back to the site
        </a>
      </form>
    </div>
  );
}
