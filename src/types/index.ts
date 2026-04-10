/**
 * Shared TypeScript types for SurgicalEd VR.
 *
 * These are placeholder shapes — update to match the backend API spec once defined.
 */

export type UserRole = "admin" | "trainer" | "trainee";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  institutionId?: string;
  createdAt: string;
}

export interface Institution {
  id: string;
  name: string;
  country: string;
  createdAt: string;
}

export interface Session {
  id: string;
  userId: string;
  institutionId: string;
  moduleId: string;
  startedAt: string;
  completedAt?: string;
  durationSeconds?: number;
}

export interface Result {
  id: string;
  sessionId: string;
  userId: string;
  score: number;
  metrics: Record<string, number>;
  createdAt: string;
}

/** JWT payload decoded from the auth token */
export interface TokenPayload {
  sub: string;
  email: string;
  name: string;
  role: UserRole;
  institutionId?: string;
  exp: number;
}
