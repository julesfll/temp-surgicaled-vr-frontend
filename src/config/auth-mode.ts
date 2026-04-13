/**
 * Controls local auth bypass mode.
 *
 * Set `VITE_AUTH_DISABLED=true` in your env file to disable sign-in checks and
 * allow all routes/actions for local development.
 */
export const AUTH_DISABLED = import.meta.env.VITE_AUTH_DISABLED === "true";

/**
 * Enables a development-only role switcher in the sidebar.
 */
export const DEV_ROLE_SWITCHER_ENABLED =
  import.meta.env.DEV && import.meta.env.VITE_DEV_ROLE_SWITCHER === "true";
