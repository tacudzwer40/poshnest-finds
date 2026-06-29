import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSettings, setSettings } from '@/lib/settings';

export async function GET() {
  try {
    const settings = await getSettings();
    return NextResponse.json(settings);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to load settings.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

const Body = z
  .object({
    site_title: z.string().max(200).optional(),
    site_tagline: z.string().max(300).optional(),
    amazon_tag: z.string().max(100).optional(),
    newsletter_endpoint: z.string().max(1000).optional(),
    disclosure_text: z.string().max(10_000).optional(),
  })
  .strict();

export async function PUT(req: Request) {
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
  if (Object.keys(parsed.data).length === 0) {
    return NextResponse.json({ error: 'No fields to update.' }, { status: 400 });
  }

  try {
    await setSettings(parsed.data);
    const settings = await getSettings();
    return NextResponse.json({ ok: true, settings });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to save settings.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
