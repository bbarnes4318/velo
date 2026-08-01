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
  mode: string;
  outcome: string;
  featured?: boolean;
};

const CALENDLY_URL = 'https://calendly.com/leadsbystorm-support/30min';

const plans: Plan[] = [
  {
    id: 'starter',
    label: 'Low-risk test pilot',
    title: 'Market Test Pilot',
    description: 'A focused, month-to-month field test for agents who want to see the opportunity quality in their own market.',
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
    mode: 'Explore',
    outcome: 'Validate the model in your market',
  },
  {
    id: 'agent',
    label: 'Build your own pipeline',
    title: 'Agent-Driven',
    description: 'VelocityRE narrows the field. You control the outreach, the relationship, and every listing conversation.',
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
    mode: 'Operate',
    outcome: 'Own the prospecting and the relationship',
    featured: true,
  },
  {
    id: 'concierge',
    label: 'Execution without added payroll',
    title: 'Done-for-You',
    description: 'Our U.S.-based listing specialists work the outreach, qualify intent, manage follow-up, and schedule the appointment.',
    price: '$949',
    cadence: 'to start',
    detail: '+ $949 only when the first listing is secured',
    features: [
      'Everything in the Agent-Driven program',
      'U.S.-based listing outreach specialists',
      'Qualification and appointment scheduling',
      'Follow-up cadence managed for you',
      '50 new seller opportunities each month',
      'Protected local market',
    ],
    guarantee: 'One listing guaranteed under written terms',
    mode: 'Delegate',
    outcome: 'Step into qualified listing conversations',
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
    question: 'Do I have to use the appointment-setting service?',
    answer: 'No. Market Test Pilot and Agent-Driven give you the seller opportunities and property context so you can handle the outreach yourself. Appointment setting is available only when you choose Done-for-You.',
  },
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
            <span className={styles.eyebrow}>Private seller intelligence for growth-minded agents</span>
            <h1>Find the sellers before they become someone else’s listing.</h1>
            <p>
              VelocityRE surfaces the homeowners worth pursuing before they raise their hand publicly. Work the opportunities in-house—or add our U.S.-based appointment team to qualify interest and put meetings on your calendar.
            </p>
            <div className={styles.heroActions}>
              <button className={styles.primaryButton} onClick={() => scrollToId('plans')}>Choose how you want to start <ArrowIcon /></button>
              <button className={styles.textButton} onClick={() => scrollToId('how')}>See the system at work</button>
            </div>
            <div className={styles.heroProof}>
              <div><strong>Earlier signal</strong><span>Before broad-market competition</span></div>
              <div><strong>Focused pipeline</strong><span>Only the opportunities worth working</span></div>
              <div><strong>Flexible execution</strong><span>Your team—or our specialists</span></div>
            </div>
          </div>

          <div className={styles.previewCard} aria-label="Interactive illustration of the VelocityRE outreach process">
            <div className={styles.previewTop}>
              <div><span /><span /><span /></div>
              <small>Done-for-You conversation desk</small>
              <b>U.S.-based team</b>
            </div>
            <div className={styles.previewBody}>
              <div className={styles.previewHeading}>
                <div><small>Property-aware outreach</small><strong>One property. One relevant conversation.</strong></div>
                <span>Live specialists</span>
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
                  <span>Conversation strategy</span>
                  <p>“{scenarios[activeScenario].message}”</p>
                </div>
                <div className={styles.pipelineFlow}>
                  <span>Priority signal</span><ArrowIcon />
                  <span>Specialist outreach</span><ArrowIcon />
                  <strong>{scenarios[activeScenario].outcome}</strong>
                </div>
              </div>
              <div className={styles.previewFooter}>
                <span><CheckIcon /> U.S.-based specialists</span>
                <span><CheckIcon /> Listing-appointment focus</span>
                <span><CheckIcon /> Context before conversation</span>
              </div>
            </div>
            <p>Illustrative Done-for-You workflow. Representatives adapt each conversation naturally. Prospect responses and appointment results vary.</p>
          </div>
        </div>
      </section>

      <section id="how" className={`${styles.section} ${styles.screenSection}`}>
        <div className={styles.sectionInner}>
          <div className={styles.advantageHeader}>
            <div className={styles.sectionIntro}>
              <span className={styles.eyebrow}>The timing advantage</span>
              <h2>Stop arriving after the seller has already raised their hand.</h2>
              <p>VelocityRE is built to move prospecting upstream—toward the ownership, property, financial, and listing signals that can surface before a public listing.</p>
            </div>
            <aside className={styles.marketInsight}>
              <span>Why it matters</span>
              <strong>Public intent attracts competition.</strong>
              <p>Earlier intelligence gives you a chance to create the relationship before the seller becomes another name in everyone’s database.</p>
            </aside>
          </div>
          <div className={styles.timingPanel} aria-label="Comparison of conventional lead timing and VelocityRE timing">
            <div className={styles.timingLaneMuted}>
              <div><span>Conventional lead flow</span><strong>React after intent is public</strong></div>
              <ol><li>Seller raises hand</li><li>Lead circulates</li><li>Agents compete</li></ol>
            </div>
            <div className={styles.timingLaneActive}>
              <div><span>VelocityRE advantage</span><strong>Act while the signal is developing</strong></div>
              <ol><li>Signals change</li><li>Opportunity surfaces</li><li>Conversation begins</li></ol>
            </div>
          </div>
          <div className={styles.steps}>
            {[
              ['01', 'Spot the signal', 'Multiple data points narrow a broad market into a focused opportunity set.'],
              ['02', 'Choose your operating model', 'Work the pipeline internally or add our appointment-setting specialists.'],
              ['03', 'Own the conversation', 'Build the relationship early and move qualified interest toward the listing table.'],
            ].map(([number, title, body]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="plans" className={`${styles.plansSection} ${styles.screenSection}`}>
        <div className={styles.sectionInner}>
          <div className={styles.planHeading}>
            <div>
              <span className={styles.eyebrow}>One system. Three levels of leverage.</span>
              <h2>Choose the operating model that fits your business.</h2>
            </div>
            <p>Validate the opportunity quality, build the pipeline yourself, or add an experienced U.S.-based team to execute the outreach for you.</p>
          </div>

          <div className={styles.planGrid}>
            {plans.map((plan) => (
              <article className={plan.featured ? styles.featuredPlan : ''} key={plan.id}>
                {plan.featured && <span className={styles.popular}>Most popular</span>}
                <div className={styles.planTopline}>
                  <span>{String(plans.indexOf(plan) + 1).padStart(2, '0')}</span>
                  <b>{plan.mode}</b>
                </div>
                <span className={styles.planLabel}>{plan.label}</span>
                <h3>{plan.title}</h3>
                <p className={styles.planDescription}>{plan.description}</p>
                <div className={styles.priceLine}>
                  <strong>{plan.price}</strong>
                  <span>{plan.cadence}</span>
                </div>
                <p className={styles.priceDetail}>{plan.detail}</p>
                <div className={styles.planOutcome}><small>Designed to</small><strong>{plan.outcome}</strong></div>
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
            <div className={styles.guaranteeLead}>
              <div>
                <span className={styles.eyebrow}>Performance, clearly defined</span>
                <h2>A guarantee you can actually understand.</h2>
                <p>Agent-Driven and Done-for-You include one qualifying listing under the written agreement. The Test Pilot is intentionally smaller and is not covered by the guarantee.</p>
              </div>
              <div className={styles.guaranteeMetric}>
                <strong>1</strong>
                <span>Qualifying listing<small>Guaranteed on full programs*</small></span>
              </div>
            </div>
            <div className={styles.guaranteePoints}>
              {['The covered program period', 'The activity required', 'What qualifies as a listing', 'The remedy if none is secured'].map((item) => <span key={item}><CheckIcon />{item}</span>)}
            </div>
          </div>

          <form className={styles.territoryForm} onSubmit={submitTerritory}>
            <span className={styles.formStep}>Territory review</span>
            <h3>See if your market is open.</h3>
            <p>Selected plan: <strong>{selected.title}</strong> · {selected.price} {selected.cadence}</p>
            <label htmlFor="primary-zip">Primary market ZIP</label>
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
            {zipError ? <p id="zip-error" className={styles.zipError}>{zipError}</p> : <p id="zip-help" className={styles.zipHelp}>We review real territory availability before enrollment. No payment is collected here.</p>}
            <button type="submit" className={styles.primaryButton}>Continue with {selected.title} <ArrowIcon /></button>
            <button type="button" className={styles.changePlan} onClick={() => scrollToId('plans')}>Choose a different plan</button>
          </form>
        </div>
      </section>

      <section id="faq" className={styles.faqSection}>
        <div className={styles.faqInner}>
          <div>
            <span className={styles.eyebrow}>Before you choose a plan</span>
            <h2>The questions serious agents ask.</h2>
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
