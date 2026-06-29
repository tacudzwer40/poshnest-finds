import { getSettings } from '@/lib/settings';
import { SettingsForm } from '@/components/admin/SettingsForm';
import type { SettingsInput } from '@/types/admin';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Admin · Settings',
  robots: { index: false, follow: false },
};

export default async function AdminSettingsPage() {
  const s = await getSettings();
  const initial: SettingsInput = {
    site_title: s.site_title,
    site_tagline: s.site_tagline,
    amazon_tag: s.amazon_tag,
    newsletter_endpoint: s.newsletter_endpoint,
    disclosure_text: s.disclosure_text,
  };

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-[0.25em] text-terracotta">Site</p>
        <h1 className="mt-2 font-serif text-3xl text-espresso">Settings</h1>
        <p className="mt-1 text-sm text-espresso-soft">
          Site-wide configuration. Changes are saved immediately to the database.
        </p>
      </header>
      <SettingsForm initial={initial} />
    </div>
  );
}