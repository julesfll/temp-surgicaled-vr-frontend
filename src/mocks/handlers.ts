import type { TokenPayload } from "@/types";
import { http, HttpResponse } from "msw";

function makeToken(payload: TokenPayload): string {
  const header = btoa(JSON.stringify({ alg: "none", typ: "JWT" }));
  const body = btoa(JSON.stringify(payload));
  return `${header}.${body}.mock-signature`;
}

const MOCK_USERS: Array<{ email: string; password: string; payload: TokenPayload }> = [
  {
    email: "platform-admin@example.com",
    password: "password",
    payload: {
      sub: "usr_1",
      name: "Platform Admin",
      email: "platform-admin@example.com",
      role: "platform_admin",
      exp: 9_999_999_999,
    },
  },
  {
    email: "institution-admin@example.com",
    password: "password",
    payload: {
      sub: "usr_2",
      name: "Institution Admin",
      email: "institution-admin@example.com",
      role: "institution_admin",
      institutionId: "inst_1",
      exp: 9_999_999_999,
    },
  },
  {
    email: "trainer@example.com",
    password: "password",
    payload: {
      sub: "usr_3",
      name: "Trainer User",
      email: "trainer@example.com",
      role: "trainer",
      institutionId: "inst_1",
      exp: 9_999_999_999,
    },
  },
  {
    email: "trainee@example.com",
    password: "password",
    payload: {
      sub: "usr_4",
      name: "Trainee User",
      email: "trainee@example.com",
      role: "trainee",
      institutionId: "inst_1",
      exp: 9_999_999_999,
    },
  },
];

export const handlers = [
  http.post("/auth/login", async ({ request }) => {
    const { email, password } = (await request.json()) as { email: string; password: string };
    const user = MOCK_USERS.find((u) => u.email === email && u.password === password);

    if (!user) {
      return HttpResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    return HttpResponse.json({ token: makeToken(user.payload) });
  }),
];
