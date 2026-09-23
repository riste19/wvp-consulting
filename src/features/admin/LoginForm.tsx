"use client";

import { useState, type FormEvent } from "react";

import { adminApi } from "./adminApi";
import { FIELD_CLASS, LABEL_CLASS } from "./styles";

export function LoginForm({ onSignedIn }: { onSignedIn: (username: string) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    const result = await adminApi.login(username.trim(), password);
    setBusy(false);

    if (!result.ok) {
      setError(result.error);
      setPassword("");
      return;
    }
    onSignedIn(result.data.username);
  };

  return (
    <form
      onSubmit={submit}
      className="mx-auto w-full max-w-sm rounded-xl border border-border bg-white p-8 shadow-sm"
    >
      <h1 className="text-2xl font-bold text-gray-900">Sign in</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Manage the WVP Plus Consulting blog
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor="admin-username" className={LABEL_CLASS}>
            Username
          </label>
          <input
            id="admin-username"
            name="username"
            autoComplete="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className={FIELD_CLASS}
          />
        </div>
        <div>
          <label htmlFor="admin-password" className={LABEL_CLASS}>
            Password
          </label>
          <input
            id="admin-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={FIELD_CLASS}
          />
        </div>
      </div>

      {error ? (
        <p role="alert" className="mt-4 text-sm text-primary">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={busy}
        className="mt-6 h-11 w-full rounded-md bg-primary text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
      >
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
