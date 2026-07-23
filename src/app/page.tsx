'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import PhoneMockup from './components/PhoneMockup';
import ZipCodeChecker from './components/ZipCodeChecker';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ backgroundColor: '#07090D', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header className={styles.header}>
        <div className={`${styles.headerContainer} premium-container`}>
          <a
            href="#"
            className={styles.logo}
            onClick={(event) => {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            VelocityRE<span className={styles.logoDot}>.pro</span>
          </a>

          <nav className={styles.nav}>
            <a href="#how-it-works" className={styles.navLink} onClick={(event) => { event.preventDefault(); handleScrollTo('how-it-works'); }}>
              How It Works
            </a>
            <a href="#difference" className={styles.navLink} onClick={(event) => { event.preventDefault(); handleScrollTo('difference'); }}>
              Why It Wins
            </a>
            <a href="#results" className={styles.navLink} onClick={(event) => { event.preventDefault(); handleScrollTo('results'); }}>
              Results
            </a>
            <a href="#pricing" className={styles.navLink} onClick={(event) => { event.preventDefault(); handleScrollTo('pricing'); }}>
              Pricing
            </a>
            <button className={styles.headerCta} onClick={() => handleScrollTo('availability')}>
              Check My Territory
            </button>
          </nav>

          <button
            className={styles.mobileMenuBtn}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '72px',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#07090D',
            zIndex: 90,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            animation: 'fade-in-up 0.3s ease'
          }}
        >
          <a href="#how-it-works" style={{ fontSize: '18px', fontWeight: 600, color: '#A7AFBC' }} onClick={(event) => { event.preventDefault(); handleScrollTo('how-it-works'); }}>
            How It Works
          </a>
          <a href="#difference" style={{ fontSize: '18px', fontWeight: 600, color: '#A7AFBC' }} onClick={(event) => { event.preventDefault(); handleScrollTo('difference'); }}>
            Why It Wins
          </a>
          <a href="#results" style={{ fontSize: '18px', fontWeight: 600, color: '#A7AFBC' }} onClick={(event) => { event.preventDefault(); handleScrollTo('results'); }}>
            Results
          </a>
          <a href="#pricing" style={{ fontSize: '18px', fontWeight: 600, color: '#A7AFBC' }} onClick={(event) => { event.preventDefault(); handleScrollTo('pricing'); }}>
            Pricing
          </a>
          <button
            style={{
              backgroundColor: '#D8A63F',
              color: '#07090D',
              border: 'none',
              borderRadius: '8px',
              padding: '16px',
              fontSize: '15px',
              fontWeight: 700,
              cursor: 'pointer',
              textAlign: 'center',
              marginTop: 'auto'
            }}
            onClick={() => handleScrollTo('availability')}
          >
            Check My Territory
          </button>
        </div>
      )}

      <section className={styles.hero}>
        <div className={`${styles.heroGrid} premium-container`}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
              </svg>
              Predictive Seller Opportunities • Exclusive Territories
            </div>

            <h1 className={styles.heroTitle}>
              Reach Tomorrow&apos;s Home Sellers Before They Choose Another Agent.
            </h1>

            <p className={styles.heroSubtitle}>
              Most predictive seller platforms give you a score and leave the prospecting to you. VelocityRE.pro turns high-intent property signals into 50 or 100 contact-ready homeowner opportunities each month—delivered to your phone before the property reaches the open market.
            </p>

            <div className={styles.heroButtons}>
              <button className={styles.btnPrimary} onClick={() => handleScrollTo('availability')}>
                Check My Territory
              </button>
              <button className={styles.btnSecondary} onClick={() => handleScrollTo('difference')}>
                See Why This Is Different
              </button>
            </div>

            <div className={styles.statsBar}>
              <div className={styles.statItem}>
                <span className={styles.statVal}>80%</span>
                <span className={styles.statLbl}>Of Delivered Leads Later List*</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statVal}>1 Closing</span>
                <span className={styles.statLbl}>Guaranteed Under Program Terms</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statVal}>50–100</span>
                <span className={styles.statLbl}>Contact-Ready Opportunities Monthly</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statVal}>Exclusive</span>
                <span className={styles.statLbl}>Protected Zip Code Territory</span>
              </div>
            </div>

            <p style={{ marginTop: '14px', color: '#7F8998', fontSize: '11px', lineHeight: 1.5 }}>
              *Based on company-tracked lead outcomes. Results vary by market and agent execution. Closing guarantee eligibility and terms apply.
            </p>
          </div>

          <div className={styles.heroVisual}>
            <PhoneMockup />
          </div>
        </div>
      </section>

      <section id="availability" className={styles.zipSection}>
        <div className="premium-container">
          <ZipCodeChecker />
        </div>
      </section>

      <section id="how-it-works" className="bg-light-section" style={{ padding: '120px 0' }}>
        <div className="premium-container">
          <div className={styles.sectionHeader} style={{ color: 'var(--text-dark)' }}>
            <h2 className={styles.sectionTitle}>A Shorter Path From Data to Listing Appointment</h2>
            <p className={styles.sectionIntro} style={{ color: 'rgba(7, 9, 13, 0.7)' }}>
              You do not need another database. You need to know which homeowners deserve your attention now, why they may be preparing to sell, and how to contact them before competing agents do.
            </p>
          </div>

          <div className={styles.stepsGrid}>
            <div className={styles.stepCard} style={{ backgroundColor: 'rgba(7, 9, 13, 0.03)', borderColor: 'rgba(7, 9, 13, 0.08)' }}>
              <div className={styles.stepNum}>Step 01 — Detect</div>
              <h3 className={styles.stepTitle} style={{ color: 'var(--text-dark)' }}>Find Real Seller Movement</h3>
              <p className={styles.stepDesc} style={{ color: 'rgba(7, 9, 13, 0.65)' }}>
                Our system continuously evaluates property, ownership, financial, listing-history, and local market signals for meaningful changes.
              </p>
            </div>

            <div className={styles.stepCard} style={{ backgroundColor: 'rgba(7, 9, 13, 0.03)', borderColor: 'rgba(7, 9, 13, 0.08)' }}>
              <div className={styles.stepNum}>Step 02 — Prioritize</div>
              <h3 className={styles.stepTitle} style={{ color: 'var(--text-dark)' }}>Remove the Noise</h3>
              <p className={styles.stepDesc} style={{ color: 'rgba(7, 9, 13, 0.65)' }}>
                Instead of sending thousands of names, VelocityRE.pro selects the 50 or 100 homeowners with the strongest near-term listing signals.
              </p>
            </div>

            <div className={styles.stepCard} style={{ backgroundColor: 'rgba(7, 9, 13, 0.03)', borderColor: 'rgba(7, 9, 13, 0.08)' }}>
              <div className={styles.stepNum}>Step 03 — Deliver</div>
              <h3 className={styles.stepTitle} style={{ color: 'var(--text-dark)' }}>Put the Next Call on Your Phone</h3>
              <p className={styles.stepDesc} style={{ color: 'rgba(7, 9, 13, 0.65)' }}>
                Each Golden Pin includes the property, homeowner contact data, and a concise explanation of the signals behind the opportunity.
              </p>
            </div>

            <div className={styles.stepCard} style={{ backgroundColor: 'rgba(7, 9, 13, 0.03)', borderColor: 'rgba(7, 9, 13, 0.08)' }}>
              <div className={styles.stepNum}>Step 04 — Convert</div>
              <h3 className={styles.stepTitle} style={{ color: 'var(--text-dark)' }}>Contact First. Follow Up Intelligently.</h3>
              <p className={styles.stepDesc} style={{ color: 'rgba(7, 9, 13, 0.65)' }}>
                Tap to call, track every conversation, schedule follow-up, and work a protected territory backed by a closing guarantee.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="difference" className={styles.matrixSection}>
        <div className="premium-container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Most Predictive Tools Sell a Probability. We Built Around the Outcome.</h2>
            <p className={styles.sectionIntro} style={{ color: 'var(--text-muted)' }}>
              Seller scores are useful—but a score alone does not create a conversation, protect your territory, or hold the provider accountable for helping you win business.
            </p>
          </div>

          <div className={styles.matrixGrid}>
            <div className={styles.matrixCard}>
              <div className={styles.matrixIcon}>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 3v18h18M7 16l4-4 3 3 5-7" />
                </svg>
              </div>
              <span className={styles.matrixText}>Not just a generic seller score—a prioritized, contact-ready opportunity</span>
            </div>

            <div className={styles.matrixCard}>
              <div className={styles.matrixIcon}>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72" />
                </svg>
              </div>
              <span className={styles.matrixText}>Phone-ready homeowner data with one-tap outreach from the map</span>
            </div>

            <div className={styles.matrixCard}>
              <div className={styles.matrixIcon}>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 1 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <span className={styles.matrixText}>A protected zip code territory—not the same list resold to nearby agents</span>
            </div>

            <div className={styles.matrixCard}>
              <div className={styles.matrixIcon}>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              </div>
              <span className={styles.matrixText}>A written closing guarantee that puts accountability behind the data</span>
            </div>

            <div className={styles.matrixCard}>
              <div className={styles.matrixIcon}>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              </div>
              <span className={styles.matrixText}>AI-generated context that helps you open a relevant homeowner conversation</span>
            </div>

            <div className={styles.matrixCard}>
              <div className={styles.matrixIcon}>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 12h18M12 3v18" />
                </svg>
              </div>
              <span className={styles.matrixText}>A focused monthly workload your team can actually call, follow up, and convert</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.advantageSection}>
        <div className="premium-container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>The Exact Next Call—Not Another Spreadsheet</h2>
            <p className={styles.sectionIntro} style={{ color: 'var(--text-muted)' }}>
              VelocityRE.pro is designed for agents who prospect from the field. Every opportunity is organized on a mobile map with the information needed to take action immediately.
            </p>
          </div>

          <div className={styles.advantageGrid}>
            <div className={styles.heroVisual}>
              <PhoneMockup />
            </div>

            <div className={styles.bulletsContainer}>
              <div className={`${styles.bulletItem} ${styles.bulletItemActive}`}>
                <div className={styles.bulletIconContainer}>
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <polygon points="3 11 22 2 13 21 11 13 3 11" />
                  </svg>
                </div>
                <div className={styles.bulletText}>
                  <h3 className={styles.bulletTitle}>Curated Mobile Seller Map</h3>
                  <p className={styles.bulletDesc}>
                    See only the strongest opportunities in your protected market instead of sorting through thousands of low-intent records.
                  </p>
                </div>
              </div>

              <div className={styles.bulletItem}>
                <div className={styles.bulletIconContainer}>
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div className={styles.bulletText}>
                  <h3 className={styles.bulletTitle}>Conversation-Ready Context</h3>
                  <p className={styles.bulletDesc}>
                    Understand the property signals behind each opportunity so your outreach sounds informed—not random.
                  </p>
                </div>
              </div>

              <div className={styles.bulletItem}>
                <div className={styles.bulletIconContainer}>
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6" />
                  </svg>
                </div>
                <div className={styles.bulletText}>
                  <h3 className={styles.bulletTitle}>Tap-to-Call Contact Data</h3>
                  <p className={styles.bulletDesc}>
                    Move directly from insight to outreach with homeowner phone and email data inside the opportunity screen.
                  </p>
                </div>
              </div>

              <div className={styles.bulletItem}>
                <div className={styles.bulletIconContainer}>
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div className={styles.bulletText}>
                  <h3 className={styles.bulletTitle}>Built-In Pipeline Tracking</h3>
                  <p className={styles.bulletDesc}>
                    Track new, contacted, follow-up, appointment, and listed stages without losing momentum between calls.
                  </p>
                </div>
              </div>

              <div className={styles.bulletItem}>
                <div className={styles.bulletIconContainer}>
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  </svg>
                </div>
                <div className={styles.bulletText}>
                  <h3 className={styles.bulletTitle}>Fresh Opportunity Alerts</h3>
                  <p className={styles.bulletDesc}>
                    Know when a tracked property moves into a stronger action window so you can follow up at the right time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="results" className="bg-light-section" style={{ padding: '120px 0' }}>
        <div className="premium-container">
          <div className={styles.sectionHeader} style={{ color: 'var(--text-dark)' }}>
            <h2 className={styles.sectionTitle}>Built Around Listings—not Lead Volume</h2>
            <p className={styles.sectionIntro} style={{ color: 'rgba(7, 9, 13, 0.7)' }}>
              The value is not how many records a platform can export. The value is how many real listing opportunities your team can reach early, work consistently, and turn into clients.
            </p>
          </div>

          <div className={styles.resultsGrid}>
            <div className={styles.resultCard} style={{ backgroundColor: '#FFFFFF', borderColor: 'rgba(7, 9, 13, 0.08)' }}>
              <h3 className={styles.resultTitle} style={{ color: 'var(--text-dark)' }}>80% Later Reached the Market*</h3>
              <p className={styles.resultDesc} style={{ color: 'rgba(7, 9, 13, 0.65)' }}>
                Based on company-tracked outcomes, 80% of the homeowner opportunities delivered to agents later appeared as active property listings.
              </p>
              <div className={styles.accuracyHighlight}>
                <span className={styles.accuracyVal}>80%</span>
                <span className={styles.accuracyLbl} style={{ color: 'var(--text-dark)' }}>Tracked Lead-to-Listing Outcome</span>
              </div>
            </div>

            <div className={styles.resultCard} style={{ backgroundColor: '#FFFFFF', borderColor: 'rgba(7, 9, 13, 0.08)' }}>
              <h3 className={styles.resultTitle} style={{ color: 'var(--text-dark)' }}>One Closing. Guaranteed.*</h3>
              <p className={styles.resultDesc} style={{ color: 'rgba(7, 9, 13, 0.65)' }}>
                Your program includes a written closing guarantee, subject to eligibility requirements and the outreach and follow-up standards in the program terms.
              </p>
            </div>

            <div className={styles.resultCard} style={{ backgroundColor: '#FFFFFF', borderColor: 'rgba(7, 9, 13, 0.08)' }}>
              <h3 className={styles.resultTitle} style={{ color: 'var(--text-dark)' }}>50 or 100 Real Opportunities</h3>
              <p className={styles.resultDesc} style={{ color: 'rgba(7, 9, 13, 0.65)' }}>
                Choose a focused monthly allocation your team can contact thoroughly instead of paying for a bloated list that never gets worked.
              </p>
            </div>

            <div className={styles.resultCard} style={{ backgroundColor: '#FFFFFF', borderColor: 'rgba(7, 9, 13, 0.08)' }}>
              <h3 className={styles.resultTitle} style={{ color: 'var(--text-dark)' }}>Protected Local Territory</h3>
              <p className={styles.resultDesc} style={{ color: 'rgba(7, 9, 13, 0.65)' }}>
                Territory access is limited so nearby agents are not receiving the same seller opportunities from VelocityRE.pro.
              </p>
            </div>
          </div>

          <p className={styles.accuracyNote} style={{ marginTop: '24px', textAlign: 'center' }}>
            *The 80% figure is based on company-tracked lead outcomes and is not a promise that every lead will list. Closing guarantee eligibility, agent activity requirements, exclusions, and remedies are governed by the written program terms.
          </p>
        </div>
      </section>

      <section id="pricing" className={styles.pricingSection}>
        <div className="premium-container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Choose the Monthly Opportunity Volume You Will Actually Work</h2>
            <p className={styles.sectionIntro} style={{ color: 'var(--text-muted)' }}>
              Both plans include predictive seller opportunities, mobile contact access, territory protection, and the closing guarantee under program terms.
            </p>
          </div>

          <div className={styles.pricingGrid}>
            <div className={styles.pricingCard}>
              <span className={styles.planName}>50-Opportunity Market Plan</span>
              <div className={styles.price}>
                $79<span className={styles.pricePeriod}>/mo</span>
              </div>

              <div className={styles.planDivider} />

              <ul className={styles.planFeatures}>
                {[
                  '50 prioritized seller opportunities per month',
                  'Protected zip code market',
                  'Mobile interactive map',
                  'Homeowner phone and email data',
                  'AI-generated opportunity context',
                  'Pipeline tracking and follow-up stages',
                  'Closing guarantee under program terms'
                ].map((feature) => (
                  <li className={styles.featureItem} key={feature}>
                    <svg className={styles.featureItemIcon} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`${styles.planBtn} ${styles.planBtnSecondary}`} onClick={() => handleScrollTo('availability')}>
                Check 50-Lead Territory
              </button>
            </div>

            <div className={`${styles.pricingCard} ${styles.pricingCardRecommended}`}>
              <span className={styles.planName}>100-Opportunity Territory Plan</span>
              <div className={styles.price}>
                $129<span className={styles.pricePeriod}>/mo</span>
              </div>

              <div className={styles.planDivider} />

              <ul className={styles.planFeatures}>
                {[
                  '100 prioritized seller opportunities per month',
                  'Expanded protected zip code territory',
                  'Mobile interactive map',
                  'Homeowner phone and email data',
                  'AI-generated opportunity context',
                  'Pipeline tracking and follow-up stages',
                  'Closing guarantee under program terms'
                ].map((feature) => (
                  <li className={styles.featureItem} key={feature}>
                    <svg className={styles.featureItemIcon} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`${styles.planBtn} ${styles.planBtnPrimary}`} onClick={() => handleScrollTo('availability')}>
                Check 100-Lead Territory
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={`${styles.ctaContainer} premium-container`}>
          <h2 className={styles.ctaTitle}>The Next Listing in Your Market Is Already Giving Off Signals.</h2>
          <p className={styles.ctaDesc}>
            The question is whether you reach the homeowner before another agent does. Check your zip code to see whether a protected VelocityRE.pro territory is still open.
          </p>
          <button className={styles.btnPrimary} style={{ padding: '18px 36px' }} onClick={() => handleScrollTo('availability')}>
            Check My Territory
          </button>
          <p className={styles.ctaSubtext}>
            50 or 100 contact-ready opportunities. Exclusive territory. One closing guaranteed under program terms.
          </p>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={`${styles.footerGrid} premium-container`}>
          <div className={styles.footerBrand}>
            <span className={styles.logo} style={{ fontSize: '24px' }}>
              VelocityRE<span className={styles.logoDot}>.pro</span>
            </span>
            <p className={styles.footerText}>
              Predictive seller opportunities delivered to real estate professionals before the open market.
            </p>
          </div>

          <div className={styles.footerLinks}>
            <div className={styles.footerLinkCol}>
              <span className={styles.footerLinkHeader}>Platform</span>
              <a href="#how-it-works" className={styles.footerLink} onClick={(event) => { event.preventDefault(); handleScrollTo('how-it-works'); }}>
                How It Works
              </a>
              <a href="#difference" className={styles.footerLink} onClick={(event) => { event.preventDefault(); handleScrollTo('difference'); }}>
                Why It Wins
              </a>
              <a href="#pricing" className={styles.footerLink} onClick={(event) => { event.preventDefault(); handleScrollTo('pricing'); }}>
                Pricing
              </a>
            </div>

            <div className={styles.footerLinkCol}>
              <span className={styles.footerLinkHeader}>Legal & Contact</span>
              <a href="#" className={styles.footerLink} onClick={(event) => event.preventDefault()}>Privacy Policy</a>
              <a href="#" className={styles.footerLink} onClick={(event) => event.preventDefault()}>Program Terms</a>
              <a href="#" className={styles.footerLink} onClick={(event) => event.preventDefault()}>Contact Sales</a>
            </div>
          </div>
        </div>

        <div className={`${styles.footerBottom} premium-container`}>
          <p className={styles.disclaimer}>
            <strong>Disclaimer:</strong> VelocityRE.pro provides data-driven prospecting opportunities. The 80% figure reflects company-tracked historical lead outcomes and is not a guarantee of future listing results. Results vary by market, timing, data availability, and agent execution. The closing guarantee is subject to written eligibility requirements, agent activity standards, exclusions, and remedies in the program terms.
          </p>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} VelocityRE.pro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
