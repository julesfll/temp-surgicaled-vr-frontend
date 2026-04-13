/**
 * Controls local auth bypass mode.
 *
 * Set `VITE_AUTH_DISABLED=true` in your env file to disable sign-in checks and
 * allow all routes/actions for local development.
 */
export const AUTH_DISABLED = import.meta.env.VITE_AUTH_DISABLED === "true";
