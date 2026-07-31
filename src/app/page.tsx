'use client';

import { useMemo, useState, type FormEvent } from 'react';
import styles from './page.module.css';

type PlanId = 'starter' | 'agent' | 'concierge';
type ScenarioId = 'expired' | 'corporate' | 'complex';

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
    label: 'Low-risk test pilot',
    title: 'Market Test Pilot',
    description: 'Prove the system in your market with a focused monthly opportunity set before moving into a full program.',
    price: '$279',
    cadence: 'per month',
    detail: 'Month to month · built for a real-market test',
    features: [
      '10 new seller opportunities each month',
      'Homeowner and property contact information',
      'Why each property was identified',
      'Mobile map and basic pipeline tracking',
      'Upgrade to a full program at any time',
    ],
    guarantee: 'Entry plan · no protected territory or listing guarantee',
  },
  {
    id: 'agent',
    label: 'For agents who want control',
    title: 'Agent-Driven',
    description: 'We identify and organize the opportunities. You make the calls, build the relationship, and own every conversation.',
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
    label: 'The complete appointment system',
    title: 'Done-for-You',
    description: 'We do the groundwork—property-specific outreach, qualification, follow-up, and appointment scheduling.',
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

const scenarios: Record<ScenarioId, {
  label: string;
  title: string;
  signal: string;
  message: string;
  outcome: string;
}> = {
  expired: {
    label: 'Expired listing',
    title: 'Owner-occupied property',
    signal: 'Listing came off the market',
    message: 'Are you taking a break, or would you still consider selling if the right option came along?',
    outcome: 'Seller interest qualified',
  },
  corporate: {
    label: 'Corporate-owned',
    title: 'Portfolio property',
    signal: 'Recent listing did not close',
    message: 'Are you planning to hold the property, or are you open to an off-market alternative?',
    outcome: 'Disposition intent identified',
  },
  complex: {
    label: 'Complex timeline',
    title: 'Time-sensitive property',
    signal: 'Public records show potential roadblocks',
    message: 'Would you be open to looking at alternatives that could help get this resolved?',
    outcome: 'Agent visit requested',
  },
};

const faqs = [
  {
    question: 'What is included in the $279 plan?',
    answer: 'Market Test Pilot includes 10 new seller opportunities each month, contact and property data, seller-signal summaries, mobile map access, and basic tracking. It does not include protected territory or the one-listing guarantee.',
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
    answer: 'Protected territory applies only to the Agent-Driven and Done-for-You programs, subject to final market availability. Market Test Pilot does not include protected territory.',
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
  const [activeScenario, setActiveScenario] = useState<ScenarioId>('expired');
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
            <span className={styles.eyebrow}>Done-for-you off-market listing generation</span>
            <h1>We find the homeowners. You walk into the listing conversation.</h1>
            <p>
              We do the groundwork to identify high-potential off-market sellers, start property-specific conversations, qualify real interest, and put appointments in front of agents.
            </p>
            <div className={styles.heroActions}>
              <button className={styles.primaryButton} onClick={() => scrollToId('plans')}>Choose how you want to start <ArrowIcon /></button>
              <button className={styles.textButton} onClick={() => scrollToId('how')}>See the system at work</button>
            </div>
            <div className={styles.heroProof}>
              <div><strong>Specific</strong><span>Property-based outreach</span></div>
              <div><strong>Qualified</strong><span>Seller intent uncovered</span></div>
              <div><strong>Scheduled</strong><span>Agent appointments created</span></div>
            </div>
          </div>

          <div className={styles.previewCard} aria-label="Interactive illustration of the VelocityRE outreach process">
            <div className={styles.previewTop}>
              <div><span /><span /><span /></div>
              <small>VelocityRE outreach engine</small>
              <b>Interactive</b>
            </div>
            <div className={styles.previewBody}>
              <div className={styles.previewHeading}>
                <div><small>See how the conversation changes</small><strong>Property-specific outreach</strong></div>
                <span>Built to sound human</span>
              </div>
              <div className={styles.scenarioTabs} role="tablist" aria-label="Prospect scenarios">
                {(Object.keys(scenarios) as ScenarioId[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={activeScenario === id}
                    className={activeScenario === id ? styles.scenarioActive : ''}
                    onClick={() => setActiveScenario(id)}
                  >
                    {scenarios[id].label}
                  </button>
                ))}
              </div>
              <div className={styles.scenarioPanel} role="tabpanel">
                <div className={styles.scenarioContext}>
                  <div><small>Property profile</small><strong>{scenarios[activeScenario].title}</strong></div>
                  <div><small>Why now</small><strong>{scenarios[activeScenario].signal}</strong></div>
                </div>
                <div className={styles.conversationBubble}>
                  <span>Natural conversation pivot</span>
                  <p>“{scenarios[activeScenario].message}”</p>
                </div>
                <div className={styles.pipelineFlow}>
                  <span>Property identified</span><ArrowIcon />
                  <span>Conversation started</span><ArrowIcon />
                  <strong>{scenarios[activeScenario].outcome}</strong>
                </div>
              </div>
              <div className={styles.previewFooter}>
                <span><CheckIcon /> No generic lead pitch</span>
                <span><CheckIcon /> No shared aged-lead list</span>
                <span><CheckIcon /> Clear appointment objective</span>
              </div>
            </div>
            <p>Illustrative workflow. Prospect response and appointment results vary.</p>
          </div>
        </div>
      </section>

      <section id="how" className={`${styles.section} ${styles.screenSection}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionIntro}>
            <span className={styles.eyebrow}>The work agents should not have to do</span>
            <h2>From property signal to seller conversation.</h2>
            <p>This is not another spreadsheet of names. It is a focused system for finding the right properties, creating real conversations, and moving qualified homeowners toward an agent appointment.</p>
          </div>
          <div className={styles.steps}>
            {[
              ['01', 'We identify the right properties', 'Property, ownership, listing-history, and market signals narrow the field.'],
              ['02', 'We make the outreach relevant', 'The conversation starts with the actual property and the reason the timing may matter.'],
              ['03', 'You meet interested homeowners', 'Choose the opportunities yourself—or let us qualify and schedule the appointment.'],
            ].map(([number, title, body]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
          <div className={styles.clarityBar}>
            <span><CheckIcon /> Property-specific opening</span>
            <span><CheckIcon /> Seller intent qualification</span>
            <span><CheckIcon /> Clear appointment handoff</span>
          </div>
        </div>
      </section>

      <section id="plans" className={`${styles.plansSection} ${styles.screenSection}`}>
        <div className={styles.sectionInner}>
          <div className={styles.planHeading}>
            <div>
              <span className={styles.eyebrow}>Three ways to put the system to work</span>
              <h2>Test it. Work it. Or let us run it.</h2>
            </div>
            <p>Start with a $279 monthly test pilot, take control of 50 monthly opportunities, or have our team handle the outreach and appointment setting for you.</p>
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
            <h2>A real program with clear responsibilities.</h2>
            <p>The Agent-Driven and Done-for-You programs include one qualifying listing under the written agreement. The $279 Market Test Pilot is designed to prove the workflow first and does not include that guarantee.</p>
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

      <div className={styles.mobileCta}><button onClick={() => scrollToId('plans')}>Start with the $279 test pilot <ArrowIcon /></button></div>
    </main>
  );
}
