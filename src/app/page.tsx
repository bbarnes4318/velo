'use client';

import { useState, type FormEvent } from 'react';
import styles from './page.module.css';

const CALENDLY_URL = 'https://calendly.com/leadsbystorm-support/30min';

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  brokerage: string;
  market: string;
};

const initialForm: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  brokerage: '',
  market: '',
};

const pilotContents = [
  {
    value: '10–15',
    title: 'Scrubbed target properties',
    body: 'Market-specific off-market opportunities selected for a real reason—not a recycled list.',
  },
  {
    value: '1–2',
    title: 'Face-to-face appointments',
    body: 'Our outreach team works the package and books your first listing conversations for you.',
  },
  {
    value: '5–10',
    title: 'Email-ready opportunities',
    body: 'DNC-restricted properties are rescued with verified email data and a property-specific template.',
  },
];

const process = [
  {
    number: '01',
    title: 'Remove the dead ends',
    body: 'We check recent deed transfers and listing history first, so properties that already sold never enter your package.',
  },
  {
    number: '02',
    title: 'Find a compliant path in',
    body: 'We screen up to five phone numbers per property. Callable numbers move to outreach; DNC-restricted records move to email rescue.',
  },
  {
    number: '03',
    title: 'Explain why this property matters',
    body: 'Every target is categorized by its strongest public signal—expired, corporate-owned, vacant, pre-foreclosure, or landlord-owned.',
  },
  {
    number: '04',
    title: 'Put the next move in your hand',
    body: 'Open the property in the mobile app and use the call strategy or email template written for that specific situation.',
  },
];

const faqs = [
  {
    question: 'Is this another lead list?',
    answer: 'No. A list gives you names and numbers. The pilot gives you a finished market package: scrubbed target properties, the reason each one was selected, compliant contact paths, property-specific outreach, and appointments worked by our team.',
  },
  {
    question: 'What happens when a homeowner is on the DNC list?',
    answer: 'That property is not discarded. We move it into the email-rescue track, provide the available email contact, and pair it with a property-specific email template. You are responsible for using all outreach tools in accordance with applicable law and your brokerage policies.',
  },
  {
    question: 'What is guaranteed in the pilot?',
    answer: 'The pilot includes 1–2 face-to-face appointments booked by our internal outreach team, subject to the written pilot terms, agent cooperation, and market eligibility. A listing, closing, commission, or return is not guaranteed.',
  },
  {
    question: 'What happens after the pilot?',
    answer: 'You choose the operating model that fits you: keep working a smaller market package, scale the number of opportunities, or have our team continue handling outreach and appointment setting.',
  },
  {
    question: 'Will another agent receive the same package?',
    answer: 'Pilot availability is limited by market so we can protect the usefulness of each package. Exact territory availability and boundaries are confirmed before enrollment.',
  },
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="m3 11 9-7 9 7v9H3v-9Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 20v-6h6v6" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m4 7 8 6 8-6" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path strokeLinecap="round" d="M8 3v4m8-4v4M3 10h18" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m8 15 2 2 5-5" />
    </svg>
  );
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Home() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [error, setError] = useState('');

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (error) setError('');
  };

  const submitApplication = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (Object.values(form).some((value) => !value.trim())) {
      setError('Please complete every field so we can review your market.');
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
          <small>by Leads By Storm</small>
        </button>
        <nav aria-label="Main navigation">
          <button onClick={() => scrollToId('package')}>What you get</button>
          <button onClick={() => scrollToId('how')}>How it works</button>
          <button onClick={() => scrollToId('faq')}>Questions</button>
        </nav>
        <button className={styles.headerCta} onClick={() => scrollToId('apply')}>Apply for the pilot</button>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>A done-with-you off-market listing pilot</span>
            <h1>Walk into listing conversations—not another pile of leads.</h1>
            <p>
              VelocityRE turns failed and overlooked listings into a ready-to-work market package: scrubbed properties, the right contact path, property-specific outreach, and your first face-to-face appointments.
            </p>
            <div className={styles.heroActions}>
              <button className={styles.primaryButton} onClick={() => scrollToId('apply')}>Apply for the $279 pilot <ArrowIcon /></button>
              <button className={styles.secondaryButton} onClick={() => scrollToId('package')}>See exactly what is included</button>
            </div>
            <div className={styles.heroTrust}>
              <span><CheckIcon /> Built for your market</span>
              <span><CheckIcon /> Our team books appointments</span>
              <span><CheckIcon /> Month-to-month pilot</span>
            </div>
          </div>

          <aside className={styles.productBox} aria-label="VelocityRE Pilot Package contents">
            <div className={styles.boxHeader}>
              <div><span>VelocityRE</span><strong>Pilot Package</strong></div>
              <b>$279<small>/ month</small></b>
            </div>
            <div className={styles.boxBody}>
              {pilotContents.map((item, index) => (
                <div className={styles.boxItem} key={item.title}>
                  <span>{index === 0 ? <HomeIcon /> : index === 1 ? <CalendarIcon /> : <MailIcon />}</span>
                  <div><strong>{item.value}</strong><p>{item.title}</p></div>
                  <CheckIcon />
                </div>
              ))}
            </div>
            <div className={styles.boxFooter}>
              <span>One market-specific package</span>
              <strong>You show up. We help create the opportunity.</strong>
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.problemSection}>
        <div className={styles.sectionInner}>
          <div className={styles.problemCopy}>
            <span className={styles.eyebrow}>Raw data is not a prospecting system</span>
            <h2>The old way makes you do all the work before you can even start selling.</h2>
          </div>
          <div className={styles.problemGrid}>
            <article><b>01</b><strong>Shared and aged leads</strong><p>You arrive after the best agents have already called.</p></article>
            <article><b>02</b><strong>Dead property records</strong><p>You waste time on homes that already sold or no longer fit.</p></article>
            <article><b>03</b><strong>DNC dead ends</strong><p>A strong property gets discarded because no one built a compliant fallback.</p></article>
            <article><b>04</b><strong>Generic scripts</strong><p>The homeowner hears a pitch that ignores why their property matters.</p></article>
          </div>
        </div>
      </section>

      <section id="package" className={styles.packageSection}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.eyebrow}>A product you can see, understand, and work</span>
              <h2>Your complete $279 pilot package.</h2>
            </div>
            <p>No enormous database. No software to figure out alone. We build a focused package in your target market and help turn it into real conversations.</p>
          </div>
          <div className={styles.deliverableGrid}>
            {pilotContents.map((item, index) => (
              <article key={item.title}>
                <div className={styles.deliverableTop}>
                  <span>{index === 0 ? <HomeIcon /> : index === 1 ? <CalendarIcon /> : <MailIcon />}</span>
                  <b>{item.value}</b>
                </div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
          <div className={styles.noLeadBar}>
            <span><MailIcon /></span>
            <div><small>No Lead Left Behind</small><strong>DNC does not have to mean dead opportunity.</strong></div>
            <p>When calling is restricted, the property moves into an email-ready track with the available contact and a template matched to its situation.</p>
          </div>
        </div>
      </section>

      <section id="how" className={styles.howSection}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.eyebrow}>The Velocity Scrub</span>
              <h2>Every property earns its place in your package.</h2>
            </div>
            <p>Our engine removes dead records, finds the right outreach route, and gives you a reason to call that sounds like it belongs to that property.</p>
          </div>
          <div className={styles.processGrid}>
            {process.map((step) => (
              <article key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.boardSection}>
        <div className={styles.boardInner}>
          <div className={styles.boardCopy}>
            <span className={styles.eyebrow}>Your market, turned into a working pipeline</span>
            <h2>Open the app and know exactly what to do next.</h2>
            <p>Every pin includes the property context, the strongest seller signal, and the correct next move—call, email, follow up, or walk into the appointment.</p>
            <ul>
              <li><CheckIcon /> Color-coded by seller situation</li>
              <li><CheckIcon /> Call strategy matched to the property</li>
              <li><CheckIcon /> Email fallback for restricted numbers</li>
              <li><CheckIcon /> Appointment status in one view</li>
            </ul>
          </div>
          <div className={styles.opportunityBoard} aria-label="Illustration of the VelocityRE opportunity pipeline">
            <div className={styles.boardTop}>
              <div><strong>Fort Wayne Pilot</strong><span>Opportunity Board</span></div>
              <b>15 active properties</b>
            </div>
            <div className={styles.boardStats}>
              <div><span>READY TO CALL</span><strong>8</strong><small>Safe contact path</small></div>
              <div><span>EMAIL RESCUE</span><strong>5</strong><small>DNC fallback ready</small></div>
              <div><span>APPOINTMENTS</span><strong>2</strong><small>Agent visit booked</small></div>
            </div>
            <div className={styles.propertyRows}>
              <article>
                <i className={styles.dotOrange} /><div><strong>3346 Treviso Cove</strong><span>Expired · Owner occupied</span></div><b>Call strategy ready</b>
              </article>
              <article>
                <i className={styles.dotBlue} /><div><strong>13065 Vista Verde Blvd</strong><span>Corporate owned · Failed listing</span></div><b>Email rescued</b>
              </article>
              <article>
                <i className={styles.dotGreen} /><div><strong>2035 Pauline Street</strong><span>Time-sensitive · Public record signal</span></div><b>Visit scheduled</b>
              </article>
            </div>
            <div className={styles.boardFooter}><span>Scrubbed</span><ArrowIcon /><span>Contact path</span><ArrowIcon /><span>Property message</span><ArrowIcon /><strong>Appointment</strong></div>
          </div>
        </div>
      </section>

      <section className={styles.offerSection}>
        <div className={styles.offerInner}>
          <div className={styles.priceBlock}>
            <span>VelocityRE Pilot</span>
            <strong>$279<small>/ month</small></strong>
            <p>Minimal risk. A real package. Real market feedback.</p>
          </div>
          <div className={styles.offerList}>
            {['10–15 scrubbed target properties', '1–2 face-to-face appointments', '5–10 email-ready opportunities', 'Mobile opportunity map', 'Property-specific call and email messaging', 'Month-to-month pilot'].map((item) => <span key={item}><CheckIcon />{item}</span>)}
          </div>
          <div className={styles.offerAction}>
            <p>After the pilot, keep it lean, scale the package, or let our team continue booking appointments.</p>
            <button className={styles.lightButton} onClick={() => scrollToId('apply')}>See if my market qualifies <ArrowIcon /></button>
          </div>
        </div>
      </section>

      <section id="apply" className={styles.applySection}>
        <div className={styles.applyInner}>
          <div className={styles.applyCopy}>
            <span className={styles.eyebrow}>Limited by market—not by fake countdowns</span>
            <h2>Claim your market before another agent does.</h2>
            <p>Tell us where you want to work. We will confirm availability, show you how the pilot fits your market, and walk through the next step.</p>
            <div className={styles.applySummary}>
              <strong>$279 pilot</strong>
              <span>Market-specific package</span>
              <span>No payment collected here</span>
            </div>
          </div>
          <form className={styles.applicationForm} onSubmit={submitApplication}>
            <div className={styles.formHeading}><span>01</span><div><strong>Pilot application</strong><small>Usually takes less than a minute</small></div></div>
            <div className={styles.twoFields}>
              <label>First name<input value={form.firstName} onChange={(event) => updateField('firstName', event.target.value)} autoComplete="given-name" /></label>
              <label>Last name<input value={form.lastName} onChange={(event) => updateField('lastName', event.target.value)} autoComplete="family-name" /></label>
            </div>
            <div className={styles.twoFields}>
              <label>Email address<input type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} autoComplete="email" /></label>
              <label>Mobile phone<input type="tel" value={form.phone} onChange={(event) => updateField('phone', event.target.value)} autoComplete="tel" /></label>
            </div>
            <div className={styles.twoFields}>
              <label>Brokerage name<input value={form.brokerage} onChange={(event) => updateField('brokerage', event.target.value)} autoComplete="organization" /></label>
              <label>Target market / city<input value={form.market} onChange={(event) => updateField('market', event.target.value)} placeholder="Fort Wayne, IN" /></label>
            </div>
            {error && <p className={styles.formError}>{error}</p>}
            <button className={styles.primaryButton} type="submit">See if I qualify <ArrowIcon /></button>
            <small className={styles.formNote}>By continuing, you agree to be contacted about the VelocityRE Pilot. No payment is collected on this form.</small>
          </form>
        </div>
      </section>

      <section id="faq" className={styles.faqSection}>
        <div className={styles.faqInner}>
          <div><span className={styles.eyebrow}>Straight answers</span><h2>Before you apply.</h2></div>
          <div className={styles.faqList}>
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}<span>+</span></summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <strong>VelocityRE<span>.pro</span></strong>
          <nav><a href="/terms">Program Terms</a><a href="/privacy">Privacy Policy</a><a href="mailto:support@leadsbystorm.com?subject=VelocityRE.pro%20Pilot">Contact</a></nav>
        </div>
        <p>VelocityRE.pro provides data-driven prospecting opportunities and outreach support. Appointment delivery is subject to written pilot terms, market eligibility, and agent cooperation. No homeowner response, listing, closing, commission, earnings amount, or return is guaranteed. Users are responsible for compliance with applicable laws and brokerage policies.</p>
        <small>© {new Date().getFullYear()} Leads By Storm. All rights reserved.</small>
      </footer>

      <div className={styles.mobileCta}><button onClick={() => scrollToId('apply')}>Apply for the $279 pilot <ArrowIcon /></button></div>
    </main>
  );
}
