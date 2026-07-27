'use client';

import { FormEvent, useMemo, useState } from 'react';
import styles from './page.module.css';

type PlanId = 'agent' | 'concierge';

type Plan = {
  id: PlanId;
  eyebrow: string;
  title: string;
  description: string;
  price: string;
  priceDetail: string;
  estimatedNet: string;
  returnMultiple: string;
  features: string[];
  featured?: boolean;
};

const CALENDLY_URL = 'https://calendly.com/leadsbystorm-support/30min';

const plans: Plan[] = [
  {
    id: 'agent',
    eyebrow: 'You work the opportunities',
    title: 'Agent-Driven Program',
    description: 'You call the homeowners and set your own listing appointments.',
    price: '$949',
    priceDetail: '$949 monthly program investment',
    estimatedNet: '$7,051',
    returnMultiple: '8.4×',
    features: [
      '50 new seller opportunities every month',
      'Homeowner phone and property information',
      'Seller-signal context for every opportunity',
      'Mobile opportunity map with tap-to-call access',
      'Follow-up and pipeline tracking',
      'Protected local market',
      'One listing guaranteed under written terms',
    ],
  },
  {
    id: 'concierge',
    eyebrow: 'We do the calling',
    title: 'Done-for-You Appointment Program',
    description: 'Our team calls the opportunities, follows up, and schedules appointments for you.',
    price: '$1,898',
    priceDetail: '$949 now + $949 only on your first listing',
    estimatedNet: '$6,102',
    returnMultiple: '4.2×',
    featured: true,
    features: [
      'Everything in the Agent-Driven Program',
      'Outreach performed on your behalf',
      'Prospect follow-up and appointment scheduling',
      '50 new seller opportunities every month',
      'Protected local market',
      'One listing guaranteed under written terms',
      'Second $949 due only on the first listing',
    ],
  },
];

const faqs = [
  {
    question: 'Are these opportunities shared with other agents?',
    answer: 'Not within your approved protected market. Final territory boundaries and current availability are confirmed before enrollment.',
  },
  {
    question: 'Are you guaranteeing every homeowner will sell?',
    answer: 'No. VelocityRE identifies stronger seller signals, but no individual homeowner is guaranteed to list or choose a participating agent.',
  },
  {
    question: 'What exactly is guaranteed?',
    answer: 'One listing under the written eligibility, activity, timing, exclusion, and remedy provisions of the program agreement.',
  },
  {
    question: 'Is the $8,000 commission guaranteed?',
    answer: 'No. It is an estimated take-home commission used only to compare the program cost with one possible closed transaction.',
  },
  {
    question: 'What happens before I enroll?',
    answer: 'You choose a program, submit your primary market, receive final territory confirmation, and review the written guarantee terms.',
  },
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" />
    </svg>
  );
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState<PlanId>('agent');
  const [zip, setZip] = useState('');
  const [zipError, setZipError] = useState('');

  const selected = useMemo(
    () => plans.find((plan) => plan.id === selectedPlan) ?? plans[0],
    [selectedPlan],
  );

  const choosePlan = (planId: PlanId) => {
    setSelectedPlan(planId);
    window.setTimeout(() => scrollToId('territory'), 50);
  };

  const submitTerritory = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!/^\d{5}$/.test(zip)) {
      setZipError('Enter a valid 5-digit ZIP code.');
      return;
    }

    setZipError('');

    const destination = new URL(CALENDLY_URL);
    const incoming = new URLSearchParams(window.location.search);

    incoming.forEach((value, key) => destination.searchParams.set(key, value));
    destination.searchParams.set('utm_source', incoming.get('utm_source') || 'realtor-sms');
    destination.searchParams.set('utm_medium', incoming.get('utm_medium') || 'sms');
    destination.searchParams.set('utm_content', selectedPlan);
    destination.searchParams.set('a1', zip);

    window.location.assign(destination.toString());
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <button className={styles.brand} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span>VelocityRE<span>.pro</span></span>
          <small>A Leads By Storm company</small>
        </button>
        <button className={styles.headerCta} onClick={() => scrollToId('plans')}>Choose My Program</button>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <div className={styles.badge}><span />Built for listing agents who prospect</div>
            <h1>50 Seller Opportunities. <em>One Listing Guaranteed.</em></h1>
            <p className={styles.heroLead}>
              Reach homeowners showing stronger signals that they may sell, work a protected local market, and receive one listing guaranteed under the written program terms.
            </p>
            <div className={styles.heroActions}>
              <button className={styles.primaryButton} onClick={() => scrollToId('plans')}>See My Two Options <ArrowIcon /></button>
              <button className={styles.secondaryButton} onClick={() => scrollToId('how-it-works')}>How It Works</button>
            </div>
            <p className={styles.microcopy}>Plans begin at $949. Written guarantee terms are reviewed before enrollment.</p>
            <div className={styles.heroStats}>
              <div><strong>50</strong><span>new opportunities monthly</span></div>
              <div><strong>1</strong><span>listing guaranteed</span></div>
              <div><strong>Protected</strong><span>local market</span></div>
            </div>
          </div>

          <div className={styles.productVisual} aria-label="Illustrative VelocityRE opportunity dashboard">
            <div className={styles.windowBar}>
              <div><span /><span /><span /></div>
              <small>Seller opportunity map</small>
              <i />
            </div>
            <div className={styles.dashboard}>
              <aside>
                <small>Pipeline</small>
                {[
                  ['New', '50'],
                  ['Contacted', '18'],
                  ['Follow-up', '9'],
                  ['Appointment', '4'],
                ].map(([label, value], index) => (
                  <div className={index === 0 ? styles.activePipeline : ''} key={label}>
                    <span>{label}</span><strong>{value}</strong>
                  </div>
                ))}
              </aside>
              <div className={styles.mapPanel}>
                <div className={styles.mapHeader}>
                  <div><small>Protected market</small><strong>Knoxville West</strong></div>
                  <span>50 active</span>
                </div>
                <div className={styles.mapArea}>
                  <svg viewBox="0 0 420 230" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M-15 76C48 65 72 99 129 92c74-9 80-58 155-48 55 7 77 43 135 29" />
                    <path d="M-15 171c56-22 97-5 143-20 56-19 74-59 139-52 58 7 89 50 155 51" />
                    <path d="M68-15c12 66 2 102 30 151 24 42 60 53 75 108" />
                    <path d="M281-15c-27 42-26 78-12 119 13 38 1 73-21 140" />
                  </svg>
                  {[
                    ['22%', '22%', 'A'],
                    ['59%', '18%', 'B'],
                    ['72%', '59%', 'C'],
                    ['35%', '66%', 'D'],
                  ].map(([left, top, label]) => <span className={styles.pin} style={{ left, top }} key={label}>{label}</span>)}
                  <div className={styles.signalCard}><small>Highest seller signal</small><strong>Property A · 91 opportunity score</strong><button>CALL</button></div>
                </div>
                <div className={styles.productFacts}>
                  <div><small>Owner data</small><strong>Included</strong></div>
                  <div><small>Seller signals</small><strong>Explained</strong></div>
                  <div><small>Follow-up</small><strong>Tracked</strong></div>
                </div>
              </div>
            </div>
            <p className={styles.visualCaption}>Illustrative VelocityRE opportunity view</p>
          </div>
        </div>
      </section>

      <section className={styles.guaranteeStrip}>
        <div>
          <span className={styles.shield}>✓</span>
          <p><strong>The guarantee is for one listing—not an earnings promise.</strong><small>Eligibility, activity requirements, covered period, exclusions, and remedy are governed by the written program agreement.</small></p>
          <button onClick={() => scrollToId('guarantee')}>See what is guaranteed →</button>
        </div>
      </section>

      <section id="how-it-works" className={`${styles.section} ${styles.lightSection}`}>
        <div className={styles.sectionHeading}>
          <span>A focused path to a listing conversation</span>
          <h2>Not another giant lead list.</h2>
          <p>VelocityRE narrows the market to 50 homeowners worth contacting now and gives you the property context needed to begin a relevant conversation.</p>
        </div>
        <div className={styles.stepsGrid}>
          {[
            ['01', 'Identify stronger seller signals', 'Property, ownership, financial, listing-history, and local-market signals are evaluated for meaningful changes.'],
            ['02', 'Deliver contact-ready opportunities', 'Each opportunity includes homeowner contact information, property details, and the signals behind the opportunity.'],
            ['03', 'Work the opportunity to a listing', 'Call from the mobile map, track every conversation, schedule follow-up, and move prospects through your listing pipeline.'],
          ].map(([number, title, body]) => (
            <article key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>
          ))}
        </div>
      </section>

      <section id="plans" className={`${styles.section} ${styles.plansSection}`}>
        <div className={styles.sectionHeading}>
          <span>Choose how the work gets done</span>
          <h2>Two programs. One clear outcome.</h2>
          <p>Both programs include 50 new seller opportunities each month, protected-market availability, and the written one-listing guarantee.</p>
        </div>
        <div className={styles.planGrid}>
          {plans.map((plan) => (
            <article className={plan.featured ? styles.featuredPlan : ''} key={plan.id}>
              {plan.featured && <b className={styles.planBadge}>We do the calling</b>}
              <span className={styles.planEyebrow}>{plan.eyebrow}</span>
              <h3>{plan.title}</h3>
              <p>{plan.description}</p>
              <div className={styles.priceBox}><small>First-listing program cost</small><strong>{plan.price}</strong><span>{plan.priceDetail}</span></div>
              <ul>{plan.features.map((feature) => <li key={feature}><CheckIcon />{feature}</li>)}</ul>
              <div className={styles.roiGrid}>
                <div><small>Estimated net after cost*</small><strong>{plan.estimatedNet}</strong></div>
                <div><small>Estimated gross multiple*</small><strong>{plan.returnMultiple}</strong></div>
              </div>
              <button onClick={() => choosePlan(plan.id)}>Choose {plan.title.replace(' Program', '')} <ArrowIcon /></button>
            </article>
          ))}
        </div>
        <p className={styles.disclaimer}>*Examples use an estimated $8,000 take-home commission from one closed listing. Commission, earnings, return, and net-income figures are estimates only and are not guaranteed.</p>
      </section>

      <section id="guarantee" className={`${styles.section} ${styles.guaranteeSection}`}>
        <div className={styles.guaranteeGrid}>
          <div className={styles.guaranteeSeal}><span>✓</span><strong>1</strong><small>Listing guaranteed</small></div>
          <div>
            <span className={styles.kicker}>What is actually guaranteed</span>
            <h2>The listing is the guarantee.</h2>
            <p>The estimated $8,000 take-home commission is not guaranteed. It is simply a comparison amount that should be replaced with your own typical take-home commission.</p>
            <div className={styles.guaranteeItems}>
              {['Covered program period', 'Required outreach and follow-up', 'Definition of a qualifying listing', 'Exclusions and contractual remedy'].map((item) => <div key={item}><CheckIcon />{item}</div>)}
            </div>
          </div>
        </div>
      </section>

      <section id="territory" className={`${styles.section} ${styles.territorySection}`}>
        <div className={styles.territoryCard}>
          <div className={styles.territoryCopy}>
            <span className={styles.kicker}>Final territory verification</span>
            <h2>Start with your primary ZIP code.</h2>
            <p>We do not display fake instant availability. Your market is reviewed against current territory assignments before enrollment is finalized.</p>
            <div className={styles.selectedPlan}>
              <small>Selected program</small>
              <strong>{selected.title}</strong>
              <span>{selected.priceDetail}</span>
              <button onClick={() => scrollToId('plans')}>Change program</button>
            </div>
          </div>
          <form className={styles.territoryForm} onSubmit={submitTerritory}>
            <label htmlFor="primary-zip">Primary market ZIP code</label>
            <input
              id="primary-zip"
              name="zip"
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={5}
              value={zip}
              onChange={(event) => {
                setZip(event.target.value.replace(/\D/g, '').slice(0, 5));
                if (zipError) setZipError('');
              }}
              placeholder="37909"
              aria-describedby={zipError ? 'zip-error' : 'zip-help'}
            />
            {zipError ? <p id="zip-error" className={styles.zipError}>{zipError}</p> : <p id="zip-help" className={styles.zipHelp}>You will review the program and written guarantee before enrollment is completed.</p>}
            <button type="submit" className={styles.primaryButton}>Verify My Market & Continue <ArrowIcon /></button>
            <div className={styles.formTrust}>
              {['No fabricated instant availability', 'No payment before territory review', 'SMS campaign attribution preserved'].map((item) => <span key={item}><CheckIcon />{item}</span>)}
            </div>
          </form>
        </div>
      </section>

      <section className={`${styles.section} ${styles.faqSection}`}>
        <div className={styles.sectionHeading}>
          <span>Questions before enrolling</span>
          <h2>The important answers, upfront.</h2>
        </div>
        <div className={styles.faqList}>
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}<span>+</span></summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <div>
          <div>
            <strong>VelocityRE<span>.pro</span></strong>
            <p>Predictive seller opportunities and protected-market prospecting tools for licensed real estate professionals.</p>
          </div>
          <nav>
            <a href="/terms">Program Terms</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="mailto:support@leadsbystorm.com?subject=VelocityRE.pro%20Support">Contact</a>
          </nav>
        </div>
        <p>VelocityRE.pro provides data-driven prospecting opportunities. No individual homeowner, listing, closing, commission, earnings, or return is guaranteed except for the specific one-listing contractual remedy described in the written program agreement. Eligibility requirements, activity standards, covered period, exclusions, and remedies apply. Commission and return examples are estimates only.</p>
        <small>© {new Date().getFullYear()} Leads By Storm. All rights reserved.</small>
      </footer>

      <div className={styles.mobileCta}><button onClick={() => scrollToId('plans')}>Choose My Program <ArrowIcon /></button></div>
    </main>
  );
}
