import { NextResponse } from 'next/server';
import { z } from 'zod';
import { signSession, setSessionCookie, verifyCredentials } from '@/lib/auth';

const Body = z.object({
  passkey: z.string().min(1).max(200),
});

export async function POST(req: Request) {
  let parsed;
  try {
    const body = await req.json();
    parsed = Body.safeParse(body);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
  }
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input.' }, { status: 400 });
  }

  try {
    const session = await verifyCredentials(parsed.data.passkey);
    if (!session) {
      return NextResponse.json(
        { error: 'Invalid passkey.' },
        { status: 401 },
      );
    }
    const token = await signSession(session);
    await setSessionCookie(token);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Authentication error.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}