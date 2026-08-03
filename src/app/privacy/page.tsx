import type { Metadata } from 'next';
import { LegalShell } from '../LegalShell';
import styles from '../legal.module.css';

export const metadata: Metadata = {
  title: 'Privacy Policy | VelocityRE.pro',
  description: 'How VelocityRE collects, uses, discloses, and protects personal information.',
};

const navItems = [
  ['#scope', 'Scope'], ['#collect', 'Information We Collect'], ['#sources', 'Sources of Information'],
  ['#use', 'How We Use Information'], ['#disclose', 'How We Disclose Information'], ['#sale-sharing', 'Sale, Sharing, and Opt-Outs'],
  ['#cookies', 'Cookies and Analytics'], ['#communications', 'Communications Choices'], ['#retention', 'Retention and Security'],
  ['#rights', 'Your Privacy Rights'], ['#children', 'Children'], ['#links', 'Third-Party Services'], ['#changes', 'Changes and Contact'],
].map(([href, label]) => ({ href, label }));

export default function PrivacyPage() {
  return (
    <LegalShell eyebrow="PRIVACY" title="Privacy Policy" summary="This Policy explains what information VelocityRE collects, where it comes from, how we use and disclose it, and the choices available to clients, property owners, prospects, and website visitors." updated="August 3, 2026" navItems={navItems}>
      <section id="scope">
        <h2>1. Scope</h2>
        <p>This Privacy Policy applies to VelocityRE (<strong>“VelocityRE,” “we,” “us,”</strong> or <strong>“our”</strong>). It covers our websites, applications, property intelligence, contact data, outreach and appointment-support services, pilot programs, and communications (collectively, the <strong>“Services”</strong>).</p>
        <p>It applies whether you are a real estate professional using the Services, a property owner or prospect whose information appears in our records, an applicant, or a website visitor. It does not govern a third party’s independent practices, including those of real estate professionals who receive information from us.</p>
      </section>

      <section id="collect">
        <h2>2. Information We Collect</h2>
        <h3>Client and business information</h3>
        <p>We may collect names, business email addresses, mobile numbers, brokerage or company names, license and professional details, target markets, account credentials, program selections, billing records, support requests, and communications with us.</p>
        <h3>Property, owner, and prospect information</h3>
        <p>We may process owner names, mailing and property addresses, phone numbers, email addresses, property and parcel details, ownership and deed records, listing history, occupancy and corporate-ownership indicators, foreclosure or public-record signals, contactability indicators, suppression data, and disposition categories or other inferences derived from those records.</p>
        <h3>Website, device, and campaign information</h3>
        <p>We may collect IP address, device and browser details, pages viewed, referring URLs, dates and times, approximate location, cookie or similar identifiers, form activity, scheduling activity, and campaign attribution such as UTM parameters, source numbers, campaign names, and lead identifiers.</p>
      </section>

      <section id="sources">
        <h2>3. Sources of Information</h2>
        <p>We obtain information from several sources, including:</p>
        <ul><li>you, when you visit, apply, enroll, communicate with us, or use the Services;</li><li>public records and government sources, including property, deed, tax, court, and other legally available records;</li><li>licensed data vendors, property and listing-information providers, identity or contact-data providers, and suppression or compliance vendors;</li><li>clients, business partners, service providers, and other industry participants; and</li><li>our own analysis, matching, validation, categorization, and service activity.</li></ul>
      </section>

      <section id="use">
        <h2>4. How We Use Information</h2>
        <p>We use information to:</p>
        <ul><li>operate, deliver, personalize, secure, and improve the Services;</li><li>identify and categorize property opportunities and provide relevant property and contact context;</li><li>screen contact paths, maintain suppression information, support outreach workflows, and prepare scripts or templates;</li><li>communicate with applicants, clients, prospects, property owners, and service providers;</li><li>schedule, confirm, support, and evaluate appointments;</li><li>process payments, administer accounts, provide support, and enforce agreements;</li><li>measure campaign performance, prevent fraud and misuse, and troubleshoot technical issues;</li><li>comply with law, respond to lawful requests, protect rights and safety, and establish or defend legal claims; and</li><li>perform other purposes disclosed when information is collected or with appropriate authorization.</li></ul>
      </section>

      <section id="disclose">
        <h2>5. How We Disclose Information</h2>
        <h3>Approved real estate professionals</h3>
        <p>A core purpose of the Services is to provide approved real estate professionals with property intelligence and contact information so they can evaluate potential opportunities and conduct their own lawful outreach. Those professionals are independently responsible for their use of the information.</p>
        <h3>Service providers</h3>
        <p>We may disclose information to vendors that support hosting, data services, communications, suppression screening, scheduling, payments, analytics, security, customer support, and professional services. They may process information only for authorized purposes and subject to contractual or legal obligations.</p>
        <h3>Legal, safety, and business events</h3>
        <p>We may disclose information when reasonably necessary to comply with law or legal process; investigate fraud, security, or misuse; protect people, property, rights, and the Services; or evaluate or complete a financing, merger, acquisition, reorganization, asset sale, or similar business transaction.</p>
      </section>

      <section id="sale-sharing">
        <h2>6. Sale, Sharing, and Opt-Out Choices</h2>
        <p>The Services include providing property and contact information to approved real estate professionals. Depending on the law that applies to you, that disclosure may be considered a <strong>“sale,” “sharing,”</strong> or use for targeted advertising even when no money is exchanged for an individual record.</p>
        <p>You may request to opt out of applicable sale or sharing by emailing <a href="mailto:support@velocityre.com?subject=Privacy%20Opt-Out%20Request">support@velocityre.com</a> with the subject <strong>“Privacy Opt-Out Request.”</strong> Include enough information for us to locate the relevant record, such as your name, property address, email address, and phone number. We will use that information only to verify, process, and maintain the request.</p>
        <p>You may also use a legally recognized browser-based opt-out preference signal, where applicable. We will process recognized signals as required by law, based on the browser or device that sends the signal.</p>
        <p className={styles.notice}><strong>Important:</strong> opting out through VelocityRE does not automatically remove information from public records, licensed databases, or the systems of independent third parties. You may need to contact those parties separately.</p>
      </section>

      <section id="cookies">
        <h2>7. Cookies and Analytics</h2>
        <p>We and our providers may use cookies, pixels, local storage, and similar technologies to keep the Services working, remember settings, protect accounts, measure traffic and campaign performance, and understand how visitors use our pages. Browser controls may allow you to block or delete cookies, but doing so can limit functionality.</p>
      </section>

      <section id="communications">
        <h2>8. Communications and Marketing Choices</h2>
        <p>You may unsubscribe from promotional email using the link in the message or by contacting us. You may reply <strong>STOP</strong> where that option is offered in a text message. Transactional, security, account, and service-related communications may continue when necessary to provide a requested service or administer an active relationship.</p>
        <p>We maintain internal suppression records to help honor opt-out requests. A request to stop communications does not prevent us from retaining the minimum information necessary to document and enforce that preference.</p>
      </section>

      <section id="retention">
        <h2>9. Retention and Security</h2>
        <p>We retain information for as long as reasonably necessary for the purposes described in this Policy, including providing the Services, maintaining suppression records, resolving disputes, enforcing agreements, and satisfying legal, accounting, security, and recordkeeping obligations. Retention periods vary by data type, source, relationship, and applicable law.</p>
        <p>We use administrative, technical, and organizational measures designed to protect information. No storage or transmission method is completely secure, however, and we cannot guarantee absolute security.</p>
      </section>

      <section id="rights">
        <h2>10. Your Privacy Rights</h2>
        <p>Depending on your location and the law that applies, you may have rights to request access to, correction of, deletion of, or portability of personal information; obtain information about collection and disclosures; opt out of sale, sharing, or targeted advertising; limit certain uses of sensitive personal information; appeal a denied request; and receive equal service without unlawful discrimination for exercising a privacy right.</p>
        <p>To submit a request, email <a href="mailto:support@velocityre.com?subject=Privacy%20Rights%20Request">support@velocityre.com</a> with the subject <strong>“Privacy Rights Request.”</strong> Describe the right you want to exercise and include enough information for us to locate and verify the relevant record. We may ask for additional information, and authorized agents may need to provide proof of authority. We will respond within the period required by applicable law.</p>
        <p>Rights are subject to jurisdiction, verification, legal exceptions, and limits. If we cannot fulfill a request, we will explain the reason where required.</p>
      </section>

      <section id="children">
        <h2>11. Children</h2>
        <p>The Services are intended for business users and are not directed to children under 18. We do not knowingly collect personal information directly from children through the Services. If you believe a child has provided information to us, please contact us.</p>
      </section>

      <section id="links">
        <h2>12. Third-Party Services and Links</h2>
        <p>The Services may link to or integrate with websites, scheduling tools, payment providers, communications platforms, mapping services, and other third parties. Their privacy practices are governed by their own policies, and we encourage you to review them before providing information.</p>
      </section>

      <section id="changes">
        <h2>13. Changes and Contact</h2>
        <p>We may update this Policy as our Services, data practices, providers, or legal obligations change. The “Effective date” identifies the latest version. We may provide additional notice of material changes where required.</p>
        <p>For privacy questions, requests, or concerns, contact VelocityRE through the options below:</p>
        <div className={styles.contactPanel}><a href="mailto:support@velocityre.com?subject=VelocityRE%20Privacy"><strong>Privacy requests</strong><span>support@velocityre.com</span></a><a href="tel:+12012858699"><strong>Call VelocityRE</strong><span>201-285-8699</span></a></div>
      </section>
    </LegalShell>
  );
}
