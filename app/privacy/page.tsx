import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'Privacy Policy and Affiliate Disclosure for PoshNest Finds.',
};

export default function PrivacyPolicyPage() {
    return (
        <article className="container-narrow py-12 sm:py-20">
            <p className="text-xs uppercase tracking-[0.25em] text-terracotta">The Fine Print</p>
            <h1 className="mt-2 font-serif text-5xl text-espresso">Privacy Policy</h1>
            <p className="mt-4 text-sm italic text-espresso-soft">
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <div className="prose-posh mt-10">
                <p>
                    At PoshNest Finds, accessible from poshnestfinds.com, your privacy is of utmost importance to us. This policy explains what data we collect and how we use it by visiting and using our website.
                </p>

                <h2>1. Information We Collect</h2>
                <ul>
                    <li>
                        <strong>Analytics data:</strong> We use Google Analytics + Pinterest Analytics to see which posts you like. This includes pages visited, time on site, and device type. No names or addresses.
                    </li>
                    <li>
                        <strong>Cookies:</strong> Our site uses cookies to improve your experience and track affiliate clicks. You can turn off cookies in your browser.
                    </li>
                    <li>
                        <strong>Email:</strong> If you sign up for our free mood board or contact us, we collect your email to reply. We never sell your email.
                    </li>
                </ul>

                <h2>2. How We Use Your Information</h2>
                <ul>
                    <li>To improve content based on what’s popular</li>
                    <li>To reply to your inquiries and requests</li>
                    <li>Track website performance and user engagement</li>
                    <li>To track affiliate commissions so we can keep finding you deals</li>
                </ul>

                <h2>3. Affiliate Disclosure</h2>
                <p>
                    PoshNest Finds is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
                </p>
                <p>
                    As an Amazon Associate, I earn from qualifying purchases. This doesn&apos;t change your price.
                </p>

                <h2>4. Third-Party Services</h2>
                <p>
                    Our website contains links to external websites that are not operated by us. We use Pinterest, Google Analytics and Amazon. They have their own privacy policies. We don&apos;t control their data.
                </p>

                <h2>5. Contact Us</h2>
                <p>
                    If you have any questions or concerns regarding our Privacy Policy or if you wish to exercise your rights regarding your personal data, get in touch with us at:
                </p>
                <p>
                    <strong>PoshNest Finds</strong><br />
                    Email: <a href="mailto:info@poshnestfinds.com" className="text-terracotta hover:underline">info@poshnestfinds.com</a>
                </p>
            </div>
        </article>
    );
}
