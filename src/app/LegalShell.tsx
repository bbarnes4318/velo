import Link from 'next/link';
import type { ReactNode } from 'react';
import styles from './legal.module.css';

type NavItem = { href: string; label: string };

export function LegalShell({
  eyebrow,
  title,
  summary,
  updated,
  navItems,
  children,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  updated: string;
  navItems: NavItem[];
  children: ReactNode;
}) {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/">
          <strong>VelocityRE<span>.pro</span></strong>
        </Link>
        <nav aria-label="Legal and contact navigation">
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <Link className={styles.backLink} href="/">Return to VelocityRE</Link>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span>{eyebrow}</span>
          <h1>{title}</h1>
          <p>{summary}</p>
          <div className={styles.updated}>Effective date: {updated}</div>
        </div>
      </section>

      <div className={styles.contentGrid}>
        <aside className={styles.sidebar}>
          <span>ON THIS PAGE</span>
          <nav>
            {navItems.map((item, index) => (
              <a href={item.href} key={item.href}><b>{String(index + 1).padStart(2, '0')}</b>{item.label}</a>
            ))}
          </nav>
          <div className={styles.helpBox}>
            <strong>Questions?</strong>
            <p>We are available to clarify our policies and how they apply to the VelocityRE service.</p>
            <Link href="/contact">Contact our team</Link>
          </div>
        </aside>
        <article className={styles.document}>{children}</article>
      </div>

      <footer className={styles.footer}>
        <div>
          <strong>VelocityRE<span>.pro</span></strong>
          <nav><Link href="/terms">Terms</Link><Link href="/privacy">Privacy</Link><Link href="/contact">Contact</Link></nav>
        </div>
        <p>Property intelligence and appointment support for real estate professionals.</p>
        <small>© {new Date().getFullYear()} VelocityRE. All rights reserved.</small>
      </footer>
    </main>
  );
}
