'use client';

import { useMemo, useState, type FormEvent } from 'react';
import styles from './page.module.css';

type PlanId = 'starter' | 'agent' | 'concierge';

type Plan = {
  id: PlanId;
  label: string;
  title: string;
  description: string;
  price: string;
  cadence: string;
  detail: string;
  features: string[];
  guarantee: string;
  featured?: boolean;
};

const CALENDLY_URL = 'https://calendly.com/leadsbystorm-support/30min';

const plans: Plan[] = [
  {
    id: 'starter',
    label: 'Lowest-cost entry',
    title: 'Market Starter',
    description: 'A smaller monthly opportunity set for agents who want to test the system before moving into a guaranteed program.',
    price: '$189',
    cadence: 'per month',
    detail: 'Simple month-to-month entry plan',
    features: [
      '10 new seller opportunities each month',
      'Homeowner and property contact information',
      'Seller-signal summary for each opportunity',
      'Mobile map and basic pipeline tracking',
      'Upgrade to a larger program at any time',
    ],
    guarantee: 'No listing guarantee or protected territory',
  },
  {
    id: 'agent',
    label: 'Best for active prospectors',
    title: 'Agent-Driven',
    description: 'You receive the full monthly opportunity set, make the calls, and control every listing conversation.',
    price: '$949',
    cadence: 'per month',
    detail: 'You call and set your own appointments',
    features: [
      '50 new seller opportunities each month',
      'Homeowner, property, and seller-signal data',
      'Mobile map with tap-to-call access',
      'Follow-up and pipeline tracking',
      'Protected local market',
    ],
    guarantee: 'One listing guaranteed under written terms',
    featured: true,
  },
  {
    id: 'concierge',
    label: 'We do the outreach',
    title: 'Done-for-You',
    description: 'Our team handles the initial outreach, follows up, and schedules qualified listing conversations for you.',
    price: '$949',
    cadence: 'to start',
    detail: '+ $949 only when the first listing is secured',
    features: [
      'Everything in the Agent-Driven program',
      'Outreach performed on your behalf',
      'Prospect follow-up and appointment scheduling',
      '50 new seller opportunities each month',
      'Protected local market',
    ],
    guarantee: 'One listing guaranteed under written terms',
  },
];

const faqs = [
  {
    question: 'What is included in the $189 plan?',
    answer: 'Market Starter includes 10 new seller opportunities each month, contact and property data, seller-signal summaries, mobile map access, and basic tracking. It does not include protected territory or the one-listing guarantee.',
  },
  {
    question: 'What exactly is guaranteed?',
    answer: 'The Agent-Driven and Done-for-You programs include one listing under the eligibility, activity, timing, exclusions, and remedy provisions in the written program agreement.',
  },
  {
    question: 'Are commissions or closings guaranteed?',
    answer: 'No. No closing, commission, earnings amount, or return is guaranteed. The contractual guarantee applies only to the qualifying listing described in the written agreement.',
  },
  {
    question: 'Are opportunities shared with other agents?',
    answer: 'Protected territory applies only to the Agent-Driven and Done-for-You programs, subject to final market availability. Market Starter does not include protected territory.',
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
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
      <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" />
    </svg>
  );
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState<PlanId>('starter');
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
          <strong>VelocityRE<span>.pro</span></strong>
          <small>by Leads By Storm</small>
        </button>
        <nav className={styles.nav} aria-label="Main navigation">
          <button onClick={() => scrollToId('how')}>How it works</button>
          <button onClick={() => scrollToId('plans')}>Pricing</button>
          <button onClick={() => scrollToId('faq')}>FAQ</button>
        </nav>
        <button className={styles.headerCta} onClick={() => scrollToId('plans')}>View plans</button>
      </header>

      <section className={`${styles.hero} ${styles.screenSection}`}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>Seller opportunities for listing agents</span>
            <h1>A cleaner path to your next listing.</h1>
            <p>
              Start with 10 seller opportunities for $189 per month—or choose a full program with 50 monthly opportunities, protected territory, and one listing guaranteed under written terms.
            </p>
            <div className={styles.heroActions}>
              <button className={styles.primaryButton} onClick={() => scrollToId('plans')}>Compare all three plans <ArrowIcon /></button>
              <button className={styles.textButton} onClick={() => scrollToId('how')}>See how it works</button>
            </div>
            <div className={styles.heroProof}>
              <div><strong>$189</strong><span>lowest monthly plan</span></div>
              <div><strong>10–50</strong><span>new opportunities monthly</span></div>
              <div><strong>1 listing</strong><span>guaranteed on full plans*</span></div>
            </div>
          </div>

          <div className={styles.previewCard} aria-label="Illustrative VelocityRE seller opportunity dashboard">
            <div className={styles.previewTop}>
              <div><span /><span /><span /></div>
              <small>Opportunity dashboard</small>
              <b>Live</b>
            </div>
            <div className={styles.previewBody}>
              <div className={styles.previewHeading}>
                <div><small>Protected market</small><strong>Knoxville West</strong></div>
                <span>50 active</span>
              </div>
              <div className={styles.opportunityList}>
                {[
                  ['91', 'Strong equity change', 'Owner occupied · 14 years'],
                  ['87', 'Recent financial signal', 'Single family · 9 years'],
                  ['82', 'Listing-history change', 'Owner occupied · 11 years'],
                ].map(([score, signal, detail], index) => (
                  <article key={score}>
                    <b>{score}</b>
                    <div><strong>{signal}</strong><span>{detail}</span></div>
                    <button aria-label={`Open opportunity ${index + 1}`}>Open</button>
                  </article>
                ))}
              </div>
              <div className={styles.previewFooter}>
                <span><CheckIcon /> Contact data included</span>
                <span><CheckIcon /> Tap-to-call</span>
                <span><CheckIcon /> Follow-up tracking</span>
              </div>
            </div>
            <p>Illustrative product view. Opportunity scores and results vary.</p>
          </div>
        </div>
      </section>

      <section id="how" className={`${styles.section} ${styles.screenSection}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionIntro}>
            <span className={styles.eyebrow}>Simple by design</span>
            <h2>Three steps. No bloated workflow.</h2>
            <p>Choose the level of support you need, receive a focused opportunity set, and move each homeowner through a clear listing pipeline.</p>
          </div>
          <div className={styles.steps}>
            {[
              ['01', 'Choose your plan', 'Start at $189 monthly or select a full guaranteed program.'],
              ['02', 'Receive focused opportunities', 'Get contact-ready homeowners with property and seller-signal context.'],
              ['03', 'Create listing conversations', 'Call them yourself or let our team handle the initial outreach.'],
            ].map(([number, title, body]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
          <div className={styles.clarityBar}>
            <span><CheckIcon /> No giant unfiltered list</span>
            <span><CheckIcon /> No fake instant territory approval</span>
            <span><CheckIcon /> Written guarantee terms before enrollment</span>
          </div>
        </div>
      </section>

      <section id="plans" className={`${styles.plansSection} ${styles.screenSection}`}>
        <div className={styles.sectionInner}>
          <div className={styles.planHeading}>
            <div>
              <span className={styles.eyebrow}>Straightforward pricing</span>
              <h2>Choose the amount of help you need.</h2>
            </div>
            <p>Every plan is intentionally different. The $189 option is a smaller entry plan. The two full programs include 50 monthly opportunities and the written one-listing guarantee.</p>
          </div>

          <div className={styles.planGrid}>
            {plans.map((plan) => (
              <article className={plan.featured ? styles.featuredPlan : ''} key={plan.id}>
                {plan.featured && <span className={styles.popular}>Most popular</span>}
                <span className={styles.planLabel}>{plan.label}</span>
                <h3>{plan.title}</h3>
                <p className={styles.planDescription}>{plan.description}</p>
                <div className={styles.priceLine}>
                  <strong>{plan.price}</strong>
                  <span>{plan.cadence}</span>
                </div>
                <p className={styles.priceDetail}>{plan.detail}</p>
                <ul>
                  {plan.features.map((feature) => <li key={feature}><CheckIcon />{feature}</li>)}
                </ul>
                <div className={styles.guaranteeLabel}>{plan.guarantee}</div>
                <button onClick={() => choosePlan(plan.id)}>Choose {plan.title} <ArrowIcon /></button>
              </article>
            ))}
          </div>
          <p className={styles.planNote}>*The listing guarantee applies only to the Agent-Driven and Done-for-You programs and is governed by the written program agreement. No closing, commission, earnings, or return is guaranteed.</p>
        </div>
      </section>

      <section id="territory" className={`${styles.actionSection} ${styles.screenSection}`}>
        <div className={styles.actionInner}>
          <div className={styles.guaranteePanel}>
            <span className={styles.eyebrow}>Clear terms, before you enroll</span>
            <h2>A listing guarantee—not an earnings promise.</h2>
            <p>The full programs guarantee one qualifying listing under the written agreement. The $189 Market Starter plan does not include that guarantee.</p>
            <div className={styles.guaranteePoints}>
              {['Covered program period', 'Required activity standards', 'Definition of a qualifying listing', 'Exclusions and contractual remedy'].map((item) => <span key={item}><CheckIcon />{item}</span>)}
            </div>
          </div>

          <form className={styles.territoryForm} onSubmit={submitTerritory}>
            <span className={styles.formStep}>Next step</span>
            <h3>Check your primary market.</h3>
            <p>Selected plan: <strong>{selected.title}</strong> · {selected.price} {selected.cadence}</p>
            <label htmlFor="primary-zip">Primary ZIP code</label>
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
            {zipError ? <p id="zip-error" className={styles.zipError}>{zipError}</p> : <p id="zip-help" className={styles.zipHelp}>No payment is collected before the territory and program review.</p>}
            <button type="submit" className={styles.primaryButton}>Continue with {selected.title} <ArrowIcon /></button>
            <button type="button" className={styles.changePlan} onClick={() => scrollToId('plans')}>Choose a different plan</button>
          </form>
        </div>
      </section>

      <section id="faq" className={styles.faqSection}>
        <div className={styles.faqInner}>
          <div>
            <span className={styles.eyebrow}>Common questions</span>
            <h2>Important answers, without the fine-print maze.</h2>
          </div>
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
          <nav>
            <a href="/terms">Program Terms</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="mailto:support@leadsbystorm.com?subject=VelocityRE.pro%20Support">Contact</a>
          </nav>
        </div>
        <p>VelocityRE.pro provides data-driven prospecting opportunities. No homeowner, closing, commission, earnings amount, or return is guaranteed. The one-listing guarantee applies only to qualifying full programs and is subject to the written program agreement.</p>
        <small>© {new Date().getFullYear()} Leads By Storm. All rights reserved.</small>
      </footer>

      <div className={styles.mobileCta}><button onClick={() => scrollToId('plans')}>Plans from $189/month <ArrowIcon /></button></div>
    </main>
  );
}
