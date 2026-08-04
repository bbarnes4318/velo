'use client';

import { useState, type FormEvent } from 'react';
import styles from './page.module.css';

const CALENDLY_URL = 'https://calendly.com/leadsbystorm-support/30min';
type FormState = { firstName: string; lastName: string; email: string; phone: string; brokerage: string; market: string };

function Arrow() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" /></svg>;
}

function Check() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" /></svg>;
}

function MapPin() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Home() {
  const [form, setForm] = useState<FormState>({ firstName: '', lastName: '', email: '', phone: '', brokerage: '', market: '' });
  const [error, setError] = useState('');

  const update = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (error) setError('');
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (Object.values(form).some((value) => !value.trim())) {
      setError('Please complete every field.');
      return;
    }
    const destination = new URL(CALENDLY_URL);
    const incoming = new URLSearchParams(window.location.search);
    incoming.forEach((value, key) => destination.searchParams.set(key, value));
    destination.searchParams.set('utm_source', incoming.get('utm_source') || 'realtor-sms');
    destination.searchParams.set('utm_medium', incoming.get('utm_medium') || 'sms');
    destination.searchParams.set('utm_campaign', incoming.get('utm_campaign') || 'velocity-pilot');
    destination.searchParams.set('name', `${form.firstName} ${form.lastName}`);
    destination.searchParams.set('email', form.email);
    destination.searchParams.set('a1', form.phone);
    destination.searchParams.set('a2', form.brokerage);
    destination.searchParams.set('a3', form.market);
    window.location.assign(destination.toString());
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <button className={styles.brand} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <strong>VelocityRE<span>.pro</span></strong>
        </button>
        <nav aria-label="Main navigation">
          <button onClick={() => scrollToId('how')}>How It Works</button>
          <button onClick={() => scrollToId('pilot')}>Pilot Package</button>
        </nav>
        <button className={styles.headerButton} onClick={() => scrollToId('apply')}>Apply for the Pilot Program</button>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <span className={styles.sectionLabel}>THE OFF-MARKET LISTING ENGINE</span>
            <h1>Turn Failed Listings Into Listing Appointments.</h1>
            <p>VelocityRE does the groundwork. We scrub failed listings, identify the owners worth pursuing, rescue DNC-restricted opportunities through email, and deliver a complete, market-specific package directly to you.</p>
            <div className={styles.heroMetrics}>
              <div><strong>10–15</strong><span>Scrubbed Properties</span></div>
              <div><strong>1–2</strong><span>Face-to-Face Appointments</span></div>
              <div><strong>5–10</strong><span>Premium Email Leads</span></div>
            </div>
            <button className={styles.primaryButton} onClick={() => scrollToId('apply')}>Check My Market & Pilot Price <Arrow /></button>
          </div>

          <div className={styles.productVisual} aria-label="VelocityRE mobile property map illustration">
            <div className={styles.visualHeader}>
              <div><strong>VelocityRE</strong><span>Fort Wayne, IN</span></div>
              <b>15 TARGETS</b>
            </div>
            <div className={styles.visualBody}>
              <div className={styles.mapArea}>
                <div className={styles.streetOne} /><div className={styles.streetTwo} /><div className={styles.streetThree} />
                <span className={`${styles.pin} ${styles.pinOne}`}><MapPin /></span>
                <span className={`${styles.pin} ${styles.pinTwo}`}><MapPin /></span>
                <span className={`${styles.pin} ${styles.pinThree}`}><MapPin /></span>
                <span className={`${styles.pin} ${styles.pinFour}`}><MapPin /></span>
                <small>COLOR-CODED PROPERTY MAP</small>
              </div>
              <div className={styles.propertyDetail}>
                <span className={styles.status}>PRE-FORECLOSURE</span>
                <h2>2035 Pauline Street</h2>
                <p>Fort Wayne, IN 46802</p>
                <dl>
                  <div><dt>Disposition</dt><dd>Maximum Velocity</dd></div>
                  <div><dt>Contact Path</dt><dd>Phone Script Ready</dd></div>
                  <div><dt>Property Status</dt><dd>Failed Listing</dd></div>
                </dl>
                <div className={styles.scriptPreview}><small>CUSTOM-TAILORED SCRIPT</small><p>“Are you open to looking at alternatives to get this resolved?”</p></div>
              </div>
            </div>
            <div className={styles.visualFooter}><span>Corporate Owned</span><span>Vacant</span><span>Pre-Foreclosure</span><span>Tired Landlords</span></div>
          </div>
        </div>
      </section>

      <section className={styles.problemSection}>
        <div className={styles.narrowInner}>
          <span className={styles.sectionLabel}>THE PROBLEM</span>
          <h2>The Old Way of Prospecting is Broken.</h2>
          <p>You are a real estate professional, not a data researcher. Most agents waste hours every week buying shared, aged leads, cold calling numbers on the DNC list, or accidentally reaching out to homeowners who already sold their home. You don&apos;t need raw spreadsheets. You need actionable intelligence and willing sellers delivered directly to you.</p>
        </div>
      </section>

      <section id="how" className={styles.solutionSection}>
        <div className={styles.sectionInner}>
          <div className={styles.solutionHeading}>
            <span className={styles.sectionLabel}>THE SOLUTION</span>
            <h2>Enter VelocityRE. The Ultimate Unfair Advantage.</h2>
            <p>VelocityRE&apos;s backend engine takes failed listing data and runs it through a gauntlet to hand you &quot;silver-platter&quot; opportunities right on your phone.</p>
          </div>
          <div className={styles.steps}>
            <article><span>01</span><div><h3>Step 1: The Velocity Scrub.</h3><p>We instantly check deed transfers to drop properties that recently sold, ensuring you never chase a dead lead.</p></div></article>
            <article><span>02</span><div><h3>Step 2: The DNC Waterfall &amp; Email Rescue.</h3><p>We run up to 5 phone numbers per property through strict DNC filters to find safe numbers. If a homeowner is legally restricted from being called, we don&apos;t waste the lead—we capture their email address instead so you can still reach them.</p></div></article>
            <article><span>03</span><div><h3>Step 3: Intelligent Disposition.</h3><p>We analyze public records to categorize every lead based on why they need to sell: Corporate Owned, Vacant, Pre-Foreclosure, or Tired Landlords.</p></div></article>
            <article><span>04</span><div><h3>Step 4: The Mobile App.</h3><p>You get a map on your phone with color-coded pins. Click a pin, and instantly get the property details along with a custom-tailored phone script OR email template designed specifically for that property&apos;s disposition.</p></div></article>
          </div>
        </div>
      </section>

      <section id="pilot" className={styles.pilotSection}>
        <div className={styles.sectionInner}>
          <div className={styles.pilotHeading}>
            <div>
              <span className={styles.sectionLabel}>THE PILOT PROGRAM PACKAGE</span>
              <h2>The VelocityRE Pilot Package: Minimal Risk. Guaranteed Results.</h2>
            </div>
            <div className={styles.price}><strong>$279–$479</strong><span>PER MONTH · BASED ON MARKET</span></div>
          </div>
          <p className={styles.pilotLead}>Every VelocityRE pilot is built around the actual opportunity available in your target market. Monthly pilot pricing ranges from $279 to $479, based on the market and the custom package we can support there.</p>
          <p className={styles.pilotLead}>Because we deliver a concentrated supply of highly prequalified properties—not shared lists—we can invite only a limited number of pilot agents in each market. If your market is available, we&apos;ll confirm your exact package and price before you enroll.</p>
          <h3 className={styles.includesTitle}>Your Pilot Package Includes:</h3>
          <div className={styles.packageGrid}>
            <article><strong>10 to 15</strong><h3>Highly-Targeted, Scrubbed Properties:</h3><p>Ready-to-close off-market targets pushed directly to your app.</p></article>
            <article><strong>1 to 2</strong><h3>Guaranteed Face-to-Face Appointments:</h3><p>Our internal team will work the system to book your first listing appointments for you. You just show up and close.</p></article>
            <article><strong>5 to 10</strong><h3>Premium Email Leads:</h3><p>High-value properties where the phone number was on the DNC list, complete with the exact email templates you need to engage them.</p></article>
          </div>
          <div className={styles.afterPilot}>After the pilot proves its value, you can customize your ongoing package—whether you want to work the leads yourself, or upgrade to have us continue booking your appointments for you.</div>
        </div>
      </section>

      <section id="apply" className={styles.applySection}>
        <div className={styles.applyInner}>
          <div className={styles.applyCopy}>
            <span className={styles.sectionLabel}>FINAL STEP</span>
            <h2>Claim Your Market Before Your Competitors Do.</h2>
            <p>The supply of highly prequalified properties is different in every market, so each pilot is customized and availability is limited. Enter your information to check your market, receive your exact package, and confirm your exact monthly pilot price within the $279–$479 range.</p>
          </div>
          <form className={styles.form} onSubmit={submit}>
            <div className={styles.formRow}>
              <label>First Name<input value={form.firstName} onChange={(e) => update('firstName', e.target.value)} autoComplete="given-name" /></label>
              <label>Last Name<input value={form.lastName} onChange={(e) => update('lastName', e.target.value)} autoComplete="family-name" /></label>
            </div>
            <label>Email Address<input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} autoComplete="email" /></label>
            <label>Mobile Phone<input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} autoComplete="tel" /></label>
            <label>Brokerage Name<input value={form.brokerage} onChange={(e) => update('brokerage', e.target.value)} autoComplete="organization" /></label>
            <label>Target Market / City<input value={form.market} onChange={(e) => update('market', e.target.value)} placeholder="Fort Wayne, IN" /></label>
            {error && <p className={styles.error}>{error}</p>}
            <button className={styles.primaryButton} type="submit">Check My Market & Pricing <Arrow /></button>
          </form>
        </div>
      </section>

      <footer className={styles.footer}>
        <div><strong>VelocityRE<span>.pro</span></strong><nav><a href="/terms">Program Terms</a><a href="/privacy">Privacy Policy</a><a href="/contact">Contact</a></nav></div>
        <p>Appointment delivery and program guarantees are subject to the written Pilot Program terms, market eligibility, and agent cooperation. No listing, closing, commission, earnings amount, or return is guaranteed. Users are responsible for compliance with applicable laws and brokerage policies.</p>
        <small>© {new Date().getFullYear()} VelocityRE. All rights reserved.</small>
      </footer>
      <div className={styles.mobileCta}><button onClick={() => scrollToId('apply')}>Apply for the Pilot Program <Arrow /></button></div>
    </main>
  );
}
