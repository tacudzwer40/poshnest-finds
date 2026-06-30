import 'server-only';
import { ensureDb, sql } from './db';
import { AMAZON_ASSOCIATE_TAG } from './brand';

export type SettingsMap = Record<string, string>;

const DEFAULTS: SettingsMap = {
  site_title: 'PoshNest Finds',
  site_tagline: 'Aesthetic Home & Decor Ideas',
  amazon_tag: AMAZON_ASSOCIATE_TAG,
  newsletter_endpoint: '',
  email: 'info@poshnestfinds.com',
  disclosure_text: 'As an Amazon Associate, I earn from qualifying purchases.',
};


/**
 * Reads all settings from the DB and merges them with env-var fallbacks
 * (so the bootstrap is fine before settings are populated).
 */
export async function getSettings(): Promise<SettingsMap> {
  await ensureDb();
  const rows = (await sql`SELECT key, value FROM settings`) as unknown as Array<{
    key: string;
    value: string;
  }>;
  const fromDb: SettingsMap = {};
  for (const r of rows) fromDb[r.key] = r.value;

  return {
    site_title:
      fromDb.site_title ?? DEFAULTS.site_title,
    site_tagline:
      fromDb.site_tagline ?? DEFAULTS.site_tagline,
    amazon_tag:
      fromDb.amazon_tag ??
      process.env.NEXT_PUBLIC_AMAZON_TAG ??
      AMAZON_ASSOCIATE_TAG,
    newsletter_endpoint:
      fromDb.newsletter_endpoint ??
      process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT ??
      '',
    disclosure_text:
      fromDb.disclosure_text ?? DEFAULTS.disclosure_text,
  };
}

export async function getSetting(key: keyof typeof DEFAULTS): Promise<string> {
  const all = await getSettings();
  return all[key] ?? DEFAULTS[key] ?? '';
}

export async function setSettings(updates: SettingsMap): Promise<void> {
  await ensureDb();
  for (const [key, value] of Object.entries(updates)) {
    await sql`
      INSERT INTO settings (key, value, updated_at)
      VALUES (${key}, ${value}, NOW())
      ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()
    `;
  }
}
