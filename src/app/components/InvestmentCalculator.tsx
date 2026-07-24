'use client';

import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './InvestmentCalculator.module.css';

type PlanId = 'self' | 'concierge';

type Plan = {
  id: PlanId;
  name: string;
  selectorLabel: string;
  selectorCopy: string;
  investment: number;
  investmentDetail: string;
};

const PLANS: Record<PlanId, Plan> = {
  self: {
    id: 'self',
    name: 'Agent-Driven Program',
    selectorLabel: 'I call and book the appointments',
    selectorCopy: '50 new seller leads every month',
    investment: 949,
    investmentDetail: '$949 monthly program investment',
  },
  concierge: {
    id: 'concierge',
    name: 'Done-for-You Appointment Program',
    selectorLabel: 'Call the leads and book appointments for me',
    selectorCopy: '50 new seller leads plus appointment setting',
    investment: 1898,
    investmentDetail: '$949 program + $949 only after the first listing',
  },
};

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const clampCommission = (value: number) => {
  if (!Number.isFinite(value)) return 8000;
  return Math.min(50000, Math.max(1000, Math.round(value)));
};

export default function InvestmentCalculator() {
  const [host, setHost] = useState<HTMLElement | null>(null);
  const [planId, setPlanId] = useState<PlanId>('self');
  const [commission, setCommission] = useState(8000);

  useEffect(() => {
    const pricingSection = document.getElementById('pricing');
    if (!pricingSection) return;

    const originalContent = pricingSection.querySelector<HTMLElement>(':scope > .premium-container');
    const calculatorHost = document.createElement('div');
    const previousStyle = pricingSection.getAttribute('style');

    calculatorHost.setAttribute('data-investment-calculator-host', 'true');
    calculatorHost.style.width = '100%';
    calculatorHost.style.flex = '0 0 100%';

    if (originalContent) originalContent.hidden = true;
    pricingSection.style.setProperty('padding', '0', 'important');
    pricingSection.style.setProperty('background', 'transparent', 'important');
    pricingSection.style.setProperty('border', '0', 'important');
    pricingSection.style.setProperty('display', 'block', 'important');
    pricingSection.style.setProperty('height', 'auto', 'important');
    pricingSection.style.setProperty('min-height', '0', 'important');
    pricingSection.style.setProperty('overflow', 'visible', 'important');
    pricingSection.appendChild(calculatorHost);
    setHost(calculatorHost);

    return () => {
      calculatorHost.remove();
      if (originalContent) originalContent.hidden = false;
      if (previousStyle === null) pricingSection.removeAttribute('style');
      else pricingSection.setAttribute('style', previousStyle);
    };
  }, []);

  const plan = PLANS[planId];

  const calculations = useMemo(() => {
    const estimatedNet = commission - plan.investment;
    const returnMultiple = commission / plan.investment;

    return { estimatedNet, returnMultiple };
  }, [commission, plan.investment]);

  const scrollToAvailability = () => {
    document.getElementById('availability')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!host) return null;

  return createPortal(
    <section className={styles.section} id="listing-investment-calculator">
      <div className={styles.backdrop} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.heading}>
          <div className={styles.badge}>
            <span /> GUARANTEED-LISTING CALCULATOR
          </div>
          <h2>
            One Listing Guaranteed. <strong>See the Estimated Return.</strong>
          </h2>
          <p>
            Choose who handles the calls, then compare your total first-listing investment with your typical take-home commission.
          </p>
        </div>

        <div className={styles.calculator}>
          <div className={styles.planSelector} role="radiogroup" aria-label="Choose your listing program">
            {(Object.values(PLANS) as Plan[]).map((option) => {
              const active = option.id === planId;
              return (
                <button
                  key={option.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  className={`${styles.planOption} ${active ? styles.planOptionActive : ''}`}
                  onClick={() => setPlanId(option.id)}
                >
                  <span className={styles.radio} aria-hidden="true"><span /></span>
                  <span className={styles.planCopy}>
                    <strong>{option.selectorLabel}</strong>
                    <small>{option.selectorCopy}</small>
                  </span>
                  <span className={styles.planPrice}>{currency.format(option.investment)}</span>
                </button>
              );
            })}
          </div>

          <div className={styles.programLine}>
            <span>{plan.name}</span>
            <small>{plan.investmentDetail}</small>
          </div>

          <div className={styles.moneyFlow}>
            <div className={styles.flowCard}>
              <span>YOU INVEST</span>
              <strong>{currency.format(plan.investment)}</strong>
              <small>Total first-listing cost</small>
            </div>

            <div className={styles.flowArrow} aria-hidden="true">
              <span />
              <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </div>

            <div className={`${styles.flowCard} ${styles.guaranteeCard}`}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <span>PROGRAM GUARANTEE</span>
              <strong>1 LISTING</strong>
              <small>Under written program terms</small>
            </div>

            <div className={styles.flowArrow} aria-hidden="true">
              <span />
              <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </div>

            <div className={`${styles.flowCard} ${styles.commissionCard}`}>
              <span>ESTIMATED TAKE-HOME</span>
              <strong>{currency.format(commission)}</strong>
              <small>From one closed listing</small>
            </div>
          </div>

          <div className={styles.bottomGrid}>
            <div className={styles.netCard}>
              <span>ESTIMATED NET AFTER PROGRAM COST</span>
              <strong>{currency.format(calculations.estimatedNet)}</strong>
              <p>
                That is an estimated <b>{calculations.returnMultiple.toFixed(1)}×</b> gross return on your first-listing investment.
              </p>
            </div>

            <div className={styles.commissionControl}>
              <div className={styles.controlTop}>
                <div>
                  <span>YOUR AVERAGE TAKE-HOME COMMISSION</span>
                  <small>Adjust this to match your business.</small>
                </div>
                <label>
                  <span>$</span>
                  <input
                    type="number"
                    min="1000"
                    max="50000"
                    step="250"
                    value={commission}
                    aria-label="Average take-home commission"
                    onChange={(event) => setCommission(clampCommission(Number(event.target.value)))}
                  />
                </label>
              </div>
              <input
                className={styles.range}
                type="range"
                min="1000"
                max="20000"
                step="250"
                value={Math.min(20000, commission)}
                aria-label="Adjust average take-home commission"
                onChange={(event) => setCommission(Number(event.target.value))}
              />
              <div className={styles.rangeLabels}><span>$1,000</span><span>$20,000+</span></div>
            </div>
          </div>

          <div className={styles.actionRow}>
            <p>
              The listing guarantee is contractual and subject to written eligibility and activity requirements. Commission and earnings are estimates, not guarantees.
            </p>
            <button type="button" onClick={scrollToAvailability}>
              Check My Territory
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>,
    host,
  );
}
