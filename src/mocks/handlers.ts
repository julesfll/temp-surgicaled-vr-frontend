import { HttpResponse, http } from "msw";
import type { TokenPayload } from "@/types";

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
      email: "platform-admin@example.com",
      exp: 9_999_999_999,
      name: "Platform Admin",
      role: "platform_admin",
      sub: "usr_1",
    },
  },
  {
    email: "institution-admin@example.com",
    password: "password",
    payload: {
      email: "institution-admin@example.com",
      exp: 9_999_999_999,
      institutionId: "inst_1",
      name: "Institution Admin",
      role: "institution_admin",
      sub: "usr_2",
    },
  },
  {
    email: "trainer@example.com",
    password: "password",
    payload: {
      email: "trainer@example.com",
      exp: 9_999_999_999,
      institutionId: "inst_1",
      name: "Trainer User",
      role: "trainer",
      sub: "usr_3",
    },
  },
  {
    email: "trainee@example.com",
    password: "password",
    payload: {
      email: "trainee@example.com",
      exp: 9_999_999_999,
      institutionId: "inst_1",
      name: "Trainee User",
      role: "trainee",
      sub: "usr_4",
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
