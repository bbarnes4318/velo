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
        <Link className={styles.brand} href="/"><strong>VelocityRE<span>.pro</span></strong><small>by Leads By Storm</small></Link>
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
              <a href="https://calendly.com/leadsbystorm-support/30min" target="_blank" rel="noreferrer">Schedule an Intro Call</a>
            </article>
            <article className={styles.contactCard}>
              <span className={styles.contactNumber}>02 / CUSTOMER SUPPORT</span>
              <h2>Get help with your account.</h2>
              <p>For billing, access, deliverables, appointments, technical questions, or changes to an active program.</p>
              <a href="mailto:support@leadsbystorm.com?subject=VelocityRE%20Support">Email Customer Support</a>
            </article>
            <article className={styles.contactCard}>
              <span className={styles.contactNumber}>03 / PRIVACY &amp; LEGAL</span>
              <h2>Submit a formal request.</h2>
              <p>Ask about our policies, exercise a privacy right, opt out, or send a legal notice to our team.</p>
              <a href="mailto:support@leadsbystorm.com?subject=VelocityRE%20Privacy%20or%20Legal%20Request">Email Privacy &amp; Legal</a>
            </article>
          </div>

          <div className={styles.businessPanel}>
            <div><span>COMPANY</span><strong>PVN LLC</strong><p>Operator of VelocityRE.pro under the Leads By Storm brand<br />Florida, United States</p></div>
            <div><span>GENERAL CONTACT</span><strong>support@leadsbystorm.com</strong><p>Use a clear subject line so your request reaches the right team. We respond during normal business hours.</p></div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div><strong>VelocityRE<span>.pro</span></strong><nav><Link href="/terms">Terms</Link><Link href="/privacy">Privacy</Link><Link href="/contact">Contact</Link></nav></div>
        <p>VelocityRE.pro is operated by PVN LLC under the Leads By Storm brand.</p>
        <small>© {new Date().getFullYear()} PVN LLC. All rights reserved.</small>
      </footer>
    </main>
  );
}
