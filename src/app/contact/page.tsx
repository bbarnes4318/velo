import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../legal.module.css';

export const metadata: Metadata = {
  title: 'Contact VelocityRE | Sales, Support, and Privacy',
  description: 'Contact the VelocityRE team about the Pilot Program, customer support, billing, privacy requests, or legal questions.',
};

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/"><strong>VelocityRE<span>.pro</span></strong></Link>
        <nav aria-label="Legal and contact navigation"><Link href="/terms">Terms</Link><Link href="/privacy">Privacy</Link><Link href="/contact">Contact</Link></nav>
        <Link className={styles.backLink} href="/">Return to VelocityRE</Link>
      </header>

      <section className={styles.contactPage}>
        <div className={styles.contactInner}>
          <div className={styles.contactIntro}>
            <span>CONTACT VELOCITYRE</span>
            <h1>Start a conversation.</h1>
            <p>Whether you are evaluating the Pilot Program, need help with an active account, or have a privacy or legal request, we will connect you with the right person.</p>
          </div>

          <div className={styles.contactGrid}>
            <article className={styles.contactCard}>
              <span className={styles.contactNumber}>01 / PILOT PROGRAM</span>
              <h2>See if your market is available.</h2>
              <p>Discuss your target market, the $279 monthly Pilot Package, and what VelocityRE can deliver for your business.</p>
              <a href="tel:+12012858699">Call 201-285-8699</a>
            </article>
            <article className={styles.contactCard}>
              <span className={styles.contactNumber}>02 / CUSTOMER SUPPORT</span>
              <h2>Get help with your account.</h2>
              <p>For billing, access, deliverables, appointments, technical questions, or changes to an active program.</p>
              <a href="mailto:support@velocityre.com?subject=VelocityRE%20Support">Email Customer Support</a>
            </article>
            <article className={styles.contactCard}>
              <span className={styles.contactNumber}>03 / PRIVACY &amp; LEGAL</span>
              <h2>Submit a formal request.</h2>
              <p>Ask about our policies, exercise a privacy right, opt out, or send a legal notice to our team.</p>
              <a href="mailto:support@velocityre.com?subject=VelocityRE%20Privacy%20or%20Legal%20Request">Email Privacy &amp; Legal</a>
            </article>
          </div>

          <div className={styles.businessPanel}>
            <div><span>COMPANY</span><strong>VelocityRE</strong><p>Property intelligence and appointment support for real estate professionals.</p></div>
            <div><span>GENERAL CONTACT</span><strong>support@velocityre.com</strong><p><a href="tel:+12012858699">201-285-8699</a><br />Use a clear subject line so your request reaches the right team.</p></div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div><strong>VelocityRE<span>.pro</span></strong><nav><Link href="/terms">Terms</Link><Link href="/privacy">Privacy</Link><Link href="/contact">Contact</Link></nav></div>
        <p>Property intelligence and appointment support for real estate professionals.</p>
        <small>© {new Date().getFullYear()} VelocityRE. All rights reserved.</small>
      </footer>
    </main>
  );
}
