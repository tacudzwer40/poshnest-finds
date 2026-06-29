import 'server-only';
import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';


const COOKIE_NAME = 'poshnest_session';
const SESSION_TTL_DAYS = 7;

function getSecret(): Uint8Array {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      'SESSION_SECRET is missing or too short. Generate one with `node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"` and put it in .env.local.',
    );
  }
  return new TextEncoder().encode(secret);
}

export type Session = { username: string };

export async function signSession(session: Session): Promise<string> {
  return await new SignJWT({ username: session.username })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_DAYS}d`)
    .sign(getSecret());
}

export async function verifySession(token: string): Promise<Session | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (typeof payload.username !== 'string') return null;
    return { username: payload.username };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<Session | null> {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;
  return await verifySession(token);
}

export async function setSessionCookie(token: string): Promise<void> {
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_TTL_DAYS * 24 * 60 * 60,
  });
}

export async function clearSessionCookie(): Promise<void> {
  cookies().set(COOKIE_NAME, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });
}

export const SESSION_COOKIE_NAME = COOKIE_NAME;

/**
 * Verify the provided passkey against the hardcoded admin passkey.
 * Returns a Session on success, null on failure.
 */
export async function verifyCredentials(
  passkey: string,
): Promise<Session | null> {
  if (passkey === 'zviko123dongonda') {
    return { username: 'admin' };
  }
  return null;
}

