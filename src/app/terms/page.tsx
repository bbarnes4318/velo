import type { Metadata } from 'next';
import { LegalShell } from '../LegalShell';
import styles from '../legal.module.css';

export const metadata: Metadata = {
  title: 'Terms of Service | VelocityRE.pro',
  description: 'Terms governing access to and use of VelocityRE.pro services, data, software, pilot programs, and appointment support.',
};

const navItems = [
  ['#agreement', 'Agreement to These Terms'], ['#eligibility', 'Eligibility and Authority'], ['#services', 'The Services'],
  ['#fees', 'Pilot, Fees, and Renewal'], ['#markets', 'Markets and Availability'], ['#appointments', 'Appointments and Results'],
  ['#compliance', 'Outreach and Compliance'], ['#use', 'Acceptable Use'], ['#ownership', 'Ownership and License'],
  ['#third-parties', 'Third-Party Services'], ['#disclaimers', 'Disclaimers'], ['#liability', 'Limitation of Liability'],
  ['#indemnity', 'Indemnification'], ['#termination', 'Suspension and Termination'], ['#law', 'Governing Law'], ['#changes', 'Changes and Contact'],
].map(([href, label]) => ({ href, label }));

export default function TermsPage() {
  return (
    <LegalShell eyebrow="LEGAL" title="Terms of Service" summary="These Terms explain the rules that apply when you access VelocityRE, enroll in a Pilot Program, use property and contact data, or engage our outreach and appointment-support services." updated="August 3, 2026" navItems={navItems}>
      <section id="agreement">
        <h2>1. Agreement to These Terms</h2>
        <p>These Terms of Service (the <strong>“Terms”</strong>) are a binding agreement between you and VelocityRE (<strong>“VelocityRE,” “we,” “us,”</strong> or <strong>“our”</strong>). They govern your access to our websites, mobile or web applications, property intelligence, contact information, scripts, templates, appointment support, pilot programs, and related services (collectively, the <strong>“Services”</strong>).</p>
        <p>By accessing the Services, submitting an application, enrolling, paying an invoice, or otherwise using the Services, you accept these Terms and our <a href="/privacy">Privacy Policy</a>. If you are accepting on behalf of a brokerage, team, company, or other entity, you represent that you have authority to bind that entity.</p>
      </section>

      <section id="eligibility">
        <h2>2. Eligibility and Authority</h2>
        <p>The Services are intended for business use by licensed real estate professionals, brokerages, real estate teams, investors, and other approved industry participants who are at least 18 years old and legally capable of entering a contract.</p>
        <ul><li>You must provide complete and accurate enrollment information.</li><li>You must maintain all licenses, brokerage approvals, registrations, and permissions required for your activities.</li><li>You may not use the Services if you are prohibited from receiving them under applicable law or professional rules.</li><li>You are responsible for anyone who accesses the Services through your account or under your direction.</li></ul>
      </section>

      <section id="services">
        <h2>3. The Services</h2>
        <p>VelocityRE may provide property records, ownership information, listing-history signals, contact-path screening, disposition categories, call scripts, email templates, map-based interfaces, workflow tools, outreach support, appointment setting, and related market intelligence. The precise features, quantities, timing, market boundaries, and deliverables are described in your order form, pilot agreement, invoice, program description, or other written enrollment materials.</p>
        <p>We may improve, replace, limit, or discontinue individual features as technology, data availability, provider terms, or legal requirements change. We will not materially reduce a paid, active program without providing an appropriate substitute, credit, extension, or other remedy where required by the applicable written program terms.</p>
      </section>

      <section id="fees">
        <h2>4. Pilot Program, Fees, and Renewal</h2>
        <h3>Pilot enrollment</h3><p>The advertised VelocityRE Pilot is currently offered at $279 per month in approved markets. Your enrollment materials control if they state a different price, term, deliverable, or payment schedule.</p>
        <h3>Payment</h3><p>You authorize us and our payment processors to charge all disclosed fees, taxes, and approved add-ons. Fees are due when stated and are non-refundable once the applicable service period has begun, except where the written program terms, applicable law, or an express written guarantee provides otherwise.</p>
        <h3>Renewal and cancellation</h3><p>If your order is described as monthly or recurring, it renews for successive monthly periods until canceled. You may cancel future renewal by contacting us before the next billing date. Cancellation stops future charges but does not undo work already performed or charges already incurred.</p>
        <h3>Past-due accounts</h3><p>We may pause delivery, outreach, access, or market protection while an invoice remains unpaid. You remain responsible for authorized charges and reasonable collection costs permitted by law.</p>
      </section>

      <section id="markets">
        <h2>5. Markets, Availability, and Exclusivity</h2>
        <p>Market availability is confirmed by us in writing. A city name, ZIP code, county, service area, or informal conversation does not create exclusivity. Any exclusivity or market protection applies only to the boundaries, term, program level, performance requirements, and exceptions stated in your written enrollment materials.</p>
        <p>Property opportunities may overlap geographically with public records, third-party databases, existing relationships, or opportunities independently identified by others. Unless expressly stated in writing, we do not guarantee that a homeowner, property, record, email address, phone number, or listing opportunity is unavailable from another source.</p>
      </section>

      <section id="appointments">
        <h2>6. Appointments, Guarantees, and Results</h2>
        <p>When appointment support is included, we use commercially reasonable efforts to contact appropriate prospects, assess stated interest, and schedule appointments. Appointment quantities, qualification standards, replacement rules, agent obligations, and remedies are governed by the applicable written Pilot Program or order terms.</p>
        <p className={styles.notice}><strong>Important:</strong> an appointment is not a guaranteed listing, transaction, closing, commission, revenue amount, or return on investment. Homeowners may cancel, reschedule, decline to meet, change their plans, work with another professional, or provide inaccurate information.</p>
        <p>You are responsible for timely follow-up, attendance, preparation, professional conduct, accurate representation of your services, and documenting any issue within the period stated in your program terms. A guarantee is unavailable where its requirements are not satisfied.</p>
      </section>

      <section id="compliance">
        <h2>7. Outreach, Data, and Legal Compliance</h2>
        <p>VelocityRE may provide compliance-oriented tools, filters, scripts, suppression data, or contact-path indicators. These tools support—but do not replace—your independent legal obligations. Laws and professional rules vary by jurisdiction, communication method, technology, recipient, purpose, and relationship.</p>
        <ul><li>You must comply with the Telephone Consumer Protection Act, Telemarketing Sales Rule, federal and state Do Not Call requirements, CAN-SPAM Act, state mini-TCPA laws, privacy laws, real estate licensing rules, brokerage policies, and all other laws that apply to your activity.</li><li>You must honor opt-outs, consent revocations, internal do-not-call requests, and suppression requirements promptly.</li><li>You may not treat a “safe,” “callable,” “email available,” or similar indicator as legal advice or a guarantee that a communication is lawful.</li><li>You must use truthful caller identification, sender information, subject lines, disclosures, and business identity information.</li><li>You may not use artificial or prerecorded voice, automated dialing, automated texts, or similar technology unless you have independently confirmed every required consent and disclosure.</li></ul>
        <p>We may suppress contact information, block functionality, request proof of compliance, or suspend an account when we reasonably believe activity creates legal, consumer-protection, carrier, platform, or reputational risk.</p>
      </section>

      <section id="use">
        <h2>8. Acceptable Use</h2>
        <p>You may use the Services only for your approved business purpose and in the market associated with your account. You may not:</p>
        <ul><li>resell, sublicense, publish, scrape, bulk export, or redistribute the Services or data except as expressly authorized;</li><li>share login credentials or allow access by an unapproved competitor, vendor, or third party;</li><li>use data to harass, discriminate, deceive, threaten, or invade privacy;</li><li>misrepresent your identity, affiliation, authority, buyer relationships, offer terms, or the reason for contacting a person;</li><li>attempt to bypass usage limits, security controls, suppression lists, or market restrictions;</li><li>reverse engineer, copy, or use our outputs to build a competing database, scoring system, workflow, or service;</li><li>upload malware, interfere with the Services, or probe for vulnerabilities without written authorization; or</li><li>use the Services in violation of law, these Terms, provider restrictions, or professional obligations.</li></ul>
      </section>

      <section id="ownership">
        <h2>9. Ownership and Limited License</h2>
        <p>VelocityRE and its licensors own the Services, platform, software, interface, selection methods, workflows, scoring, compilation, scripts, templates, branding, documentation, and all related intellectual-property rights. Subject to these Terms and payment of all fees, we grant you a limited, revocable, non-exclusive, non-transferable license to use the Services for your approved internal business purpose during the applicable program term.</p>
        <p>You retain ownership of materials you submit. You grant us a limited license to host, process, reproduce, and use those materials as necessary to provide, secure, support, and improve the Services.</p>
      </section>

      <section id="third-parties">
        <h2>10. Accounts, Providers, and Third-Party Services</h2>
        <p>You are responsible for safeguarding credentials and promptly notifying us of suspected unauthorized access. The Services may rely on public records, licensed data providers, communications platforms, mapping tools, payment processors, scheduling services, hosting providers, and other third parties. Their availability and accuracy are outside our complete control, and their own terms may apply.</p>
      </section>

      <section id="disclaimers">
        <h2>11. Disclaimers</h2>
        <p>Property, ownership, contact, listing, financial, and public-record information can be incomplete, delayed, duplicated, outdated, or incorrect. You must verify material information before relying on it or communicating it to a third party.</p>
        <p className={styles.caps}>To the fullest extent permitted by law, the Services are provided “as is” and “as available.” VelocityRE disclaims all implied warranties, including merchantability, fitness for a particular purpose, title, non-infringement, accuracy, uninterrupted availability, and any warranty arising from course of dealing or usage of trade.</p>
      </section>

      <section id="liability">
        <h2>12. Limitation of Liability</h2>
        <p className={styles.caps}>To the fullest extent permitted by law, VelocityRE and its affiliates, owners, employees, contractors, licensors, and providers will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages; lost profits, commissions, revenue, data, goodwill, or business opportunities; or claims arising from third-party conduct, homeowner decisions, inaccurate records, regulatory action, carrier blocking, or service interruption.</p>
        <p className={styles.caps}>Our aggregate liability arising from the Services will not exceed the amount you paid to us for the specific Service giving rise to the claim during the three months immediately preceding the event. Some jurisdictions do not permit certain exclusions, so those exclusions apply only to the extent permitted.</p>
      </section>

      <section id="indemnity">
        <h2>13. Indemnification</h2>
        <p>You will defend, indemnify, and hold harmless VelocityRE and its affiliates, owners, employees, contractors, licensors, and providers from claims, penalties, losses, judgments, liabilities, and reasonable legal fees arising from your communications, advertising, representations, legal or regulatory violations, misuse of data, breach of these Terms, infringement of rights, or conduct of anyone using your account.</p>
      </section>

      <section id="termination">
        <h2>14. Suspension and Termination</h2>
        <p>We may suspend or terminate access where you fail to pay, violate these Terms, create compliance or security risk, misuse data, threaten the integrity of the Services, or where continued service is prohibited or commercially impracticable. Upon termination, your license ends and you must stop using and, where required, delete Service data and materials. Provisions that by their nature should survive will survive termination.</p>
      </section>

      <section id="law">
        <h2>15. Governing Law and Disputes</h2>
        <p>These Terms are governed by the laws of the State of Florida, without regard to conflict-of-law rules. Before filing a claim, each party agrees to provide written notice describing the dispute and to allow 30 days for a good-faith effort to resolve it. Any court proceeding must be brought in a court of competent jurisdiction located in Florida, except where applicable law requires otherwise.</p>
      </section>

      <section id="changes">
        <h2>16. Changes, Severability, and Contact</h2>
        <p>We may update these Terms to reflect changes in the Services, law, providers, or business practices. The “Effective date” identifies the latest version. Material changes may also be communicated through the Services or by email. Continued use after the effective date constitutes acceptance where permitted by law.</p>
        <p>If any provision is unenforceable, it will be modified to the minimum extent necessary and the remaining provisions will remain effective. These Terms, together with your written enrollment materials and incorporated policies, form the entire agreement regarding the Services and supersede prior statements on the same subject.</p>
        <div className={styles.contactPanel}><a href="mailto:support@velocityre.com?subject=VelocityRE%20Terms"><strong>Terms questions</strong><span>support@velocityre.com</span></a><a href="tel:+12012858699"><strong>Call VelocityRE</strong><span>201-285-8699</span></a></div>
      </section>
    </LegalShell>
  );
}
