'use client';

import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './InvestmentCalculator.module.css';

type PlanId = 'self' | 'concierge';

type Plan = {
  id: PlanId;
  eyebrow: string;
  name: string;
  shortName: string;
  investment: number;
  monthlyCost: number;
  successFee: number;
  description: string;
  bullets: string[];
};

const PLANS: Record<PlanId, Plan> = {
  self: {
    id: 'self',
    eyebrow: 'You handle the conversations',
    name: 'Agent-Driven Listing Program',
    shortName: 'I call the leads',
    investment: 949,
    monthlyCost: 949,
    successFee: 0,
    description:
      'Receive 50 new seller opportunities every month. You call the homeowners and set your own listing appointments.',
    bullets: [
      '50 new seller opportunities each month',
      'You call and schedule the appointments',
      'One listing guaranteed under program terms',
    ],
  },
  concierge: {
    id: 'concierge',
    eyebrow: 'We create the appointments',
    name: 'Appointment-Setting Listing Program',
    shortName: 'Book appointments for me',
    investment: 1898,
    monthlyCost: 949,
    successFee: 949,
    description:
      'Receive 50 new seller opportunities every month while our team calls the leads and schedules appointments for you.',
    bullets: [
      '50 new seller opportunities each month',
      'Our team calls and schedules appointments',
      '$949 success fee only on the first listing',
    ],
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
    calculatorHost.setAttribute('data-investment-calculator-host', 'true');

    const previousPadding = pricingSection.style.padding;
    const previousBackground = pricingSection.style.background;
    const previousBorder = pricingSection.style.border;

    if (originalContent) originalContent.hidden = true;
    pricingSection.style.padding = '0';
    pricingSection.style.background = 'transparent';
    pricingSection.style.border = '0';
    pricingSection.appendChild(calculatorHost);
    setHost(calculatorHost);

    return () => {
      calculatorHost.remove();
      if (originalContent) originalContent.hidden = false;
      pricingSection.style.padding = previousPadding;
      pricingSection.style.background = previousBackground;
      pricingSection.style.border = previousBorder;
    };
  }, []);

  const plan = PLANS[planId];

  const calculations = useMemo(() => {
    const estimatedNet = commission - plan.investment;
    const roiPercent = (estimatedNet / plan.investment) * 100;
    const returnMultiple = commission / plan.investment;
    const investmentShare = Math.min(100, (plan.investment / commission) * 100);

    return {
      estimatedNet,
      roiPercent,
      returnMultiple,
      investmentShare,
    };
  }, [commission, plan.investment]);

  const scrollToAvailability = () => {
    document.getElementById('availability')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!host) return null;

  return createPortal(
    <div className={styles.section} id="listing-investment-calculator">
      <div className={styles.gridTexture} aria-hidden="true" />
      <div className={styles.glowOne} aria-hidden="true" />
      <div className={styles.glowTwo} aria-hidden="true" />

      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.badgePulse} />
            LISTING INVESTMENT CALCULATOR
          </div>
          <h2 className={styles.title}>
            One Guaranteed Listing.
            <span> See What It Could Be Worth.</span>
          </h2>
          <p className={styles.intro}>
            Pick how much work you want us to handle, then adjust your average take-home commission. The listing is guaranteed under program terms; commission earnings are estimated.
          </p>
        </header>

        <div className={styles.calculatorShell}>
          <div className={styles.controlsPanel}>
            <div className={styles.panelLabel}>01 — CHOOSE YOUR PROGRAM</div>

            <div className={styles.planSelector} role="radiogroup" aria-label="Listing program">
              {(Object.values(PLANS) as Plan[]).map((option) => {
                const selected = option.id === planId;
                return (
                  <button
                    type="button"
                    key={option.id}
                    className={`${styles.planButton} ${selected ? styles.planButtonActive : ''}`}
                    onClick={() => setPlanId(option.id)}
                    role="radio"
                    aria-checked={selected}
                  >
                    <span className={styles.radioMark} aria-hidden="true">
                      <span />
                    </span>
                    <span className={styles.planButtonCopy}>
                      <strong>{option.shortName}</strong>
                      <small>
                        {option.id === 'self'
                          ? '$949 total first-listing investment'
                          : '$949 now + $949 on first listing'}
                      </small>
                    </span>
                    <span className={styles.planButtonPrice}>{currency.format(option.investment)}</span>
                  </button>
                );
              })}
            </div>

            <div className={styles.selectedPlanCard}>
              <div className={styles.selectedPlanTopline}>
                <span>{plan.eyebrow}</span>
                <strong>{currency.format(plan.monthlyCost)}/mo</strong>
              </div>
              <h3>{plan.name}</h3>
              <p>{plan.description}</p>
              <ul>
                {plan.bullets.map((bullet) => (
                  <li key={bullet}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.commissionControl}>
              <div className={styles.commissionHeader}>
                <div>
                  <div className={styles.panelLabel}>02 — YOUR AVERAGE TAKE-HOME COMMISSION</div>
                  <p>Adjust this to match your typical net commission from one closed listing.</p>
                </div>
                <label className={styles.currencyInput}>
                  <span>$</span>
                  <input
                    type="number"
                    min="1000"
                    max="50000"
                    step="250"
                    value={commission}
                    onChange={(event) => setCommission(clampCommission(Number(event.target.value)))}
                    aria-label="Average take-home commission"
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
                onChange={(event) => setCommission(Number(event.target.value))}
                aria-label="Adjust average take-home commission"
              />
              <div className={styles.rangeLabels}>
                <span>$1,000</span>
                <span>$20,000+</span>
              </div>
            </div>
          </div>

          <div className={styles.returnPanel}>
            <div className={styles.returnHeader}>
              <div>
                <div className={styles.panelLabel}>YOUR FIRST-LISTING ECONOMICS</div>
                <h3>{plan.shortName}</h3>
              </div>
              <div className={styles.liveBadge}>
                <span /> LIVE ESTIMATE
              </div>
            </div>

            <div className={styles.guaranteeBanner}>
              <div className={styles.shield} aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <div>
                <span>PROGRAM OUTCOME</span>
                <strong>1 LISTING GUARANTEED</strong>
                <small>Subject to written eligibility and activity requirements</small>
              </div>
            </div>

            <div className={styles.moneyPath}>
              <div className={styles.moneyNode}>
                <span>YOUR INVESTMENT</span>
                <strong>{currency.format(plan.investment)}</strong>
                <small>
                  {plan.successFee > 0
                    ? `$${plan.monthlyCost} program + $${plan.successFee} first-listing fee`
                    : 'Complete first-listing investment'}
                </small>
              </div>
              <div className={styles.arrow} aria-hidden="true">
                <span />
                <svg viewBox="0 0 24 24">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </div>
              <div className={`${styles.moneyNode} ${styles.moneyNodeGold}`}>
                <span>ESTIMATED TAKE-HOME</span>
                <strong>{currency.format(commission)}</strong>
                <small>From one closed listing</small>
              </div>
            </div>

            <div className={styles.netGainBlock}>
              <span>ESTIMATED NET AFTER PROGRAM COST</span>
              <strong className={calculations.estimatedNet >= 0 ? '' : styles.negative}>
                {currency.format(calculations.estimatedNet)}
              </strong>
              <p>
                {calculations.estimatedNet >= 0
                  ? `Your estimated commission is ${currency.format(calculations.estimatedNet)} more than your first-listing investment.`
                  : 'Increase the estimated commission to see a positive projected return.'}
              </p>
            </div>

            <div className={styles.metricsGrid}>
              <div className={styles.metric}>
                <span>RETURN MULTIPLE</span>
                <strong>{calculations.returnMultiple.toFixed(1)}×</strong>
                <small>Estimated commission ÷ investment</small>
              </div>
              <div className={styles.metric}>
                <span>ESTIMATED ROI</span>
                <strong>{Math.round(calculations.roiPercent)}%</strong>
                <small>Net return relative to cost</small>
              </div>
              <div className={styles.metric}>
                <span>COST OF EST. COMMISSION</span>
                <strong>{calculations.investmentShare.toFixed(1)}%</strong>
                <small>Program investment as a share</small>
              </div>
            </div>

            <div className={styles.comparisonBar}>
              <div className={styles.comparisonLabels}>
                <span>Program investment</span>
                <strong>{currency.format(plan.investment)} of {currency.format(commission)}</strong>
              </div>
              <div className={styles.track}>
                <span style={{ width: `${calculations.investmentShare}%` }} />
              </div>
            </div>

            <button type="button" className={styles.cta} onClick={scrollToAvailability}>
              <span>Check My Territory</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.bottomStrip}>
          <div>
            <span>50</span>
            <small>New seller opportunities monthly</small>
          </div>
          <div className={styles.bottomDivider} />
          <div>
            <span>1</span>
            <small>Listing guaranteed under program terms</small>
          </div>
          <div className={styles.bottomDivider} />
          <div>
            <span>{plan.successFee > 0 ? '$949 + $949' : '$949'}</span>
            <small>{plan.successFee > 0 ? 'First-listing investment' : 'Total program investment'}</small>
          </div>
          <p>
            The guarantee applies to securing one listing under the written program terms. Commission, closing, timing, and earnings are estimates and are not guaranteed.
          </p>
        </div>
      </div>
    </div>,
    host,
  );
}
