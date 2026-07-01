'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import PhoneMockup from './components/PhoneMockup';
import ZipCodeChecker from './components/ZipCodeChecker';

type PipelineStatus = 'new' | 'contacted' | 'followup' | 'appointment' | 'listed';

interface PipelineItem {
  address: string;
  owner: string;
  status: string;
  color: string;
  date: string;
}

const pipelineData: Record<PipelineStatus, PipelineItem> = {
  new: {
    address: "612 W Maple Dr",
    owner: "D. Kincaid",
    status: "new",
    color: "#E2E8F0",
    date: "Triggered 2 hours ago"
  },
  contacted: {
    address: "612 W Maple Dr",
    owner: "D. Kincaid",
    status: "contacted",
    color: "#3B82F6",
    date: "Called yesterday at 2:15 PM"
  },
  followup: {
    address: "612 W Maple Dr",
    owner: "D. Kincaid",
    status: "follow-up",
    color: "#F59E0B",
    date: "Scheduled callback: July 5th"
  },
  appointment: {
    address: "612 W Maple Dr",
    owner: "D. Kincaid",
    status: "appointment",
    color: "#8B5CF6",
    date: "Listing presentation: July 8th"
  },
  listed: {
    address: "612 W Maple Dr",
    owner: "D. Kincaid",
    status: "listed",
    color: "#10B981",
    date: "Exclusive Agreement Signed"
  }
};

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pipelineStatus, setPipelineStatus] = useState<PipelineStatus>('new');
  const [activeAdvantageTab, setActiveAdvantageTab] = useState(0);

  const activePipeline = pipelineData[pipelineStatus];

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ backgroundColor: '#07090D', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* 1. Header */}
      <header className={styles.header}>
        <div className={`${styles.headerContainer} premium-container`}>
          <a href="#" className={styles.logo} onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            VelocityRE<span className={styles.logoDot}>.pro</span>
          </a>

          {/* Desktop Nav */}
          <nav className={styles.nav}>
            <a href="#how-it-works" className={styles.navLink} onClick={(e) => { e.preventDefault(); handleScrollTo('how-it-works'); }}>How It Works</a>
            <a href="#golden-pins" className={styles.navLink} onClick={(e) => { e.preventDefault(); handleScrollTo('golden-pins'); }}>Golden Pins</a>
            <a href="#pricing" className={styles.navLink} onClick={(e) => { e.preventDefault(); handleScrollTo('pricing'); }}>Pricing</a>
            <a href="#availability" className={styles.navLink} onClick={(e) => { e.preventDefault(); handleScrollTo('availability'); }}>Availability</a>
            <button className={styles.headerCta} onClick={() => handleScrollTo('availability')}>Check Zip Code</button>
          </nav>

          {/* Mobile Menu Icon */}
          <button className={styles.mobileMenuBtn} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
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

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div style={{
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
        }}>
          <a href="#how-it-works" style={{ fontSize: '18px', fontWeight: 600, color: '#A7AFBC' }} onClick={(e) => { e.preventDefault(); handleScrollTo('how-it-works'); }}>How It Works</a>
          <a href="#golden-pins" style={{ fontSize: '18px', fontWeight: 600, color: '#A7AFBC' }} onClick={(e) => { e.preventDefault(); handleScrollTo('golden-pins'); }}>Golden Pins</a>
          <a href="#pricing" style={{ fontSize: '18px', fontWeight: 600, color: '#A7AFBC' }} onClick={(e) => { e.preventDefault(); handleScrollTo('pricing'); }}>Pricing</a>
          <a href="#availability" style={{ fontSize: '18px', fontWeight: 600, color: '#A7AFBC' }} onClick={(e) => { e.preventDefault(); handleScrollTo('availability'); }}>Availability</a>
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
            Check Zip Code Availability
          </button>
        </div>
      )}

      {/* 2. Hero Section */}
      <section className={styles.hero}>
        <div className={`${styles.heroGrid} premium-container`}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
              </svg>
              Predictive Map Intelligence
            </div>
            
            <h1 className={styles.heroTitle}>
              Each Month, Our System Identifies 1000s of High-Conversion Property Listing Targets Across the US — Before They Hit the Open MLS.
            </h1>
            
            <p className={styles.heroSubtitle}>
              Stop guessing which doors to knock or wasting budget on static spreadsheets. VelocityRE.pro tracks thousands of properties each month using 250+ property data points, calculates active market timing, and drops immediate listing opportunities directly onto your phone’s map.
            </p>
            
            <div className={styles.heroButtons}>
              <button className={styles.btnPrimary} onClick={() => handleScrollTo('availability')}>
                Check Your Zip Code Availability
              </button>
              <button className={styles.btnSecondary} onClick={() => handleScrollTo('how-it-works')}>
                See How Golden Pins Work
              </button>
            </div>

            {/* Hero Stat Bar */}
            <div className={styles.statsBar}>
              <div className={styles.statItem}>
                <span className={styles.statVal}>250+</span>
                <span className={styles.statLbl}>Property Data Points</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statVal}>0–60 Day</span>
                <span className={styles.statLbl}>Action Window</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statVal}>50–100</span>
                <span className={styles.statLbl}>Curated Pins Monthly</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statVal}>Exclusive</span>
                <span className={styles.statLbl}>Zip Code Clusters</span>
              </div>
            </div>
          </div>
          
          <div className={styles.heroVisual}>
            <PhoneMockup />
          </div>
        </div>
      </section>

      {/* 3. Territory Availability Section */}
      <section id="availability" className={styles.zipSection}>
        <div className="premium-container">
          <ZipCodeChecker />
        </div>
      </section>

      {/* 4. How It Works Section */}
      <section id="how-it-works" className="bg-light-section" style={{ padding: '120px 0' }}>
        <div className="premium-container">
          <div className={styles.sectionHeader} style={{ color: 'var(--text-dark)' }}>
            <h2 className={styles.sectionTitle}>The Simple Process</h2>
            <p className={styles.sectionIntro} style={{ color: 'rgba(7, 9, 13, 0.7)' }}>
              VelocityRE.pro monitors thousands of properties across your selected zip code clusters through a continuous 12-month tracking loop. Our AI stack watches property data changes, filters out slow statistical noise, and isolates properties that move into a 60-day immediate-action window.
            </p>
          </div>

          <div className={styles.stepsGrid}>
            
            {/* Step 01 */}
            <div className={styles.stepCard} style={{ backgroundColor: 'rgba(7, 9, 13, 0.03)', borderColor: 'rgba(7, 9, 13, 0.08)' }}>
              <div className={styles.stepNum}>Step 01 — Monitor</div>
              <h3 className={styles.stepTitle} style={{ color: 'var(--text-dark)' }}>Continuous Tracking</h3>
              <p className={styles.stepDesc} style={{ color: 'rgba(7, 9, 13, 0.65)' }}>
                Properties across your territory are continuously tracked through a 12-month lifecycle using legal, financial, property, and market movement signals.
              </p>
            </div>

            {/* Step 02 */}
            <div className={styles.stepCard} style={{ backgroundColor: 'rgba(7, 9, 13, 0.03)', borderColor: 'rgba(7, 9, 13, 0.08)' }}>
              <div className={styles.stepNum}>Step 02 — Detect</div>
              <h3 className={styles.stepTitle} style={{ color: 'var(--text-dark)' }}>Isolate Triggers</h3>
              <p className={styles.stepDesc} style={{ color: 'rgba(7, 9, 13, 0.65)' }}>
                The system identifies sharp trigger events such as tax delinquency movement, pre-foreclosure notices, expired contracts, and other urgent listing indicators.
              </p>
            </div>

            {/* Step 03 */}
            <div className={styles.stepCard} style={{ backgroundColor: 'rgba(7, 9, 13, 0.03)', borderColor: 'rgba(7, 9, 13, 0.08)' }}>
              <div className={styles.stepNum}>Step 03 — Upgrade</div>
              <h3 className={styles.stepTitle} style={{ color: 'var(--text-dark)' }}>Activate Golden Pin</h3>
              <p className={styles.stepDesc} style={{ color: 'rgba(7, 9, 13, 0.65)' }}>
                When a property crosses into an immediate-action window, it is upgraded into a premium Golden Pin and placed on your mobile map.
              </p>
            </div>

            {/* Step 04 */}
            <div className={styles.stepCard} style={{ backgroundColor: 'rgba(7, 9, 13, 0.03)', borderColor: 'rgba(7, 9, 13, 0.08)' }}>
              <div className={styles.stepNum}>Step 04 — Contact</div>
              <h3 className={styles.stepTitle} style={{ color: 'var(--text-dark)' }}>Direct Outreach</h3>
              <p className={styles.stepDesc} style={{ color: 'rgba(7, 9, 13, 0.65)' }}>
                Tap the pin, review the AI-generated context summary, and contact the owner before other agents recognize the opportunity.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Golden Trigger Matrix Section */}
      <section id="golden-pins" className={styles.matrixSection}>
        <div className="premium-container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>The Golden Trigger Matrix</h2>
            <p className={styles.sectionIntro} style={{ color: 'var(--text-muted)' }}>
              VelocityRE.pro does not send you a massive spreadsheet. It isolates short-timeline listing triggers and turns only the strongest opportunities into Golden Pins.
            </p>
          </div>

          <div className={styles.matrixGrid}>
            
            {/* Trigger 1 */}
            <div className={styles.matrixCard}>
              <div className={styles.matrixIcon}>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <span className={styles.matrixText}>Fresh county tax delinquency signals</span>
            </div>

            {/* Trigger 2 */}
            <div className={styles.matrixCard}>
              <div className={styles.matrixIcon}>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01" />
                </svg>
              </div>
              <span className={styles.matrixText}>Active pre-foreclosure notices</span>
            </div>

            {/* Trigger 3 */}
            <div className={styles.matrixCard}>
              <div className={styles.matrixIcon}>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8" />
                </svg>
              </div>
              <span className={styles.matrixText}>Notice of Default / Lis Pendens movement</span>
            </div>

            {/* Trigger 4 */}
            <div className={styles.matrixCard}>
              <div className={styles.matrixIcon}>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <span className={styles.matrixText}>Recently expired listing contracts</span>
            </div>

            {/* Trigger 5 */}
            <div className={styles.matrixCard}>
              <div className={styles.matrixIcon}>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <span className={styles.matrixText}>Situational property stress signals</span>
            </div>

            {/* Trigger 6 */}
            <div className={styles.matrixCard}>
              <div className={styles.matrixIcon}>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <span className={styles.matrixText}>Ownership and equity movement</span>
            </div>

            {/* Trigger 7 */}
            <div className={styles.matrixCard}>
              <div className={styles.matrixIcon}>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <span className={styles.matrixText}>Market timing changes</span>
            </div>

            {/* Trigger 8 */}
            <div className={styles.matrixCard}>
              <div className={styles.matrixIcon}>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <span className={styles.matrixText}>Urgency-score escalation</span>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Mobile Map Advantage Section */}
      <section className={styles.advantageSection}>
        <div className="premium-container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Built for the Agent in the Field — Not the Spreadsheet Collector</h2>
            <p className={styles.sectionIntro} style={{ color: 'var(--text-muted)' }}>
              Instead of dumping 5,000 rows into a desktop file, VelocityRE.pro gives you exactly 50 or 100 ultra-curated listing targets per month as clean Golden Pins on your phone.
            </p>
          </div>

          <div className={styles.advantageGrid}>
            <div className={styles.heroVisual}>
              
              {/* Floating App Preview */}
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
                <PhoneMockup />
                
                {/* Interactive Pipeline Toggle Demo */}
                <div className={styles.pipelineDemo}>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', color: '#A7AFBC', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '8px' }}>
                    Interactive Feature: Pipeline Status Tracker
                  </div>
                  <div className={styles.pipelineButtons}>
                    {(['new', 'contacted', 'followup', 'appointment', 'listed'] as PipelineStatus[]).map((status) => (
                      <button
                        key={status}
                        onClick={() => setPipelineStatus(status)}
                        className={`${styles.pipelineBtn} ${pipelineStatus === status ? styles.pipelineBtnActive : ''}`}
                      >
                        {status.toUpperCase()}
                      </button>
                    ))}
                  </div>
                  <div className={styles.pipelineCard} style={{ borderColor: activePipeline.color, borderLeft: `3px solid ${activePipeline.color}` }}>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#F7F4EC' }}>{activePipeline.address}</div>
                      <div style={{ fontSize: '11px', color: '#A7AFBC', marginTop: '2px' }}>{activePipeline.owner} &bull; {activePipeline.date}</div>
                    </div>
                    <span 
                      className={styles.pipelineStatus} 
                      style={{ 
                        backgroundColor: `${activePipeline.color}20`, 
                        color: activePipeline.color,
                        border: `1px solid ${activePipeline.color}50`
                      }}
                    >
                      {activePipeline.status}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            <div className={styles.bulletsContainer}>
              
              {/* Bullet 1 */}
              <div className={`${styles.bulletItem} ${activeAdvantageTab === 0 ? styles.bulletItemActive : ''}`} onMouseEnter={() => setActiveAdvantageTab(0)}>
                <div className={styles.bulletIconContainer}>
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <polygon points="3 11 22 2 13 21 11 13 3 11" />
                  </svg>
                </div>
                <div className={styles.bulletText}>
                  <h3 className={styles.bulletTitle}>Micro-Dosed Mobile Map View</h3>
                  <p className={styles.bulletDesc}>
                    Receive only the strongest listing targets, mapped visually on your smartphone.
                  </p>
                </div>
              </div>

              {/* Bullet 2 */}
              <div className={`${styles.bulletItem} ${activeAdvantageTab === 1 ? styles.bulletItemActive : ''}`} onMouseEnter={() => setActiveAdvantageTab(1)}>
                <div className={styles.bulletIconContainer}>
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div className={styles.bulletText}>
                  <h3 className={styles.bulletTitle}>AI Context Summaries</h3>
                  <p className={styles.bulletDesc}>
                    Tap a Golden Pin to see a one-sentence conversational explanation of why the owner may be ready to sell.
                  </p>
                </div>
              </div>

              {/* Bullet 3 */}
              <div className={`${styles.bulletItem} ${activeAdvantageTab === 2 ? styles.bulletItemActive : ''}`} onMouseEnter={() => setActiveAdvantageTab(2)}>
                <div className={styles.bulletIconContainer}>
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className={styles.bulletText}>
                  <h3 className={styles.bulletTitle}>Tap-to-Call Contact Data</h3>
                  <p className={styles.bulletDesc}>
                    Cell numbers and verified emails appear inside the pin screen for immediate outreach.
                  </p>
                </div>
              </div>

              {/* Bullet 4 */}
              <div className={`${styles.bulletItem} ${activeAdvantageTab === 3 ? styles.bulletItemActive : ''}`} onMouseEnter={() => setActiveAdvantageTab(3)}>
                <div className={styles.bulletIconContainer}>
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                </div>
                <div className={styles.bulletText}>
                  <h3 className={styles.bulletTitle}>Push Timing Alerts</h3>
                  <p className={styles.bulletDesc}>
                    Get notified the moment a property upgrades into your immediate-action window.
                  </p>
                </div>
              </div>

              {/* Bullet 5 */}
              <div className={`${styles.bulletItem} ${activeAdvantageTab === 4 ? styles.bulletItemActive : ''}`} onMouseEnter={() => setActiveAdvantageTab(4)}>
                <div className={styles.bulletIconContainer}>
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div className={styles.bulletText}>
                  <h3 className={styles.bulletTitle}>Pipeline Toggles</h3>
                  <p className={styles.bulletDesc}>
                    Mark owners as new, contacted, follow-up, appointment, or listed directly in the dashboard map.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 7. Results / Benefits Section */}
      <section className="bg-light-section" style={{ padding: '120px 0' }}>
        <div className="premium-container">
          <div className={styles.sectionHeader} style={{ color: 'var(--text-dark)' }}>
            <h2 className={styles.sectionTitle}>What You Are Actually Buying</h2>
            <p className={styles.sectionIntro} style={{ color: 'rgba(7, 9, 13, 0.7)' }}>
              We design listing target logistics with complete territory integrity. Review our structural values and predictive thresholds.
            </p>
          </div>

          <div className={styles.resultsGrid}>
            
            {/* Card 1 */}
            <div className={styles.resultCard} style={{ backgroundColor: '#FFFFFF', borderColor: 'rgba(7, 9, 13, 0.08)' }}>
              <h3 className={styles.resultTitle} style={{ color: 'var(--text-dark)' }}>Elite Platform Accuracy</h3>
              <p className={styles.resultDesc} style={{ color: 'rgba(7, 9, 13, 0.65)' }}>
                VelocityRE.pro is designed to improve prospecting accuracy by stacking advanced property monitoring variables with AI market timing analysis.
              </p>
              
              <div className={styles.accuracyHighlight}>
                <span className={styles.accuracyVal}>72%</span>
                <span className={styles.accuracyLbl} style={{ color: 'var(--text-dark)' }}>Verified Predictive Accuracy Nationally</span>
              </div>
              
              <div style={{ padding: '12px 16px', backgroundColor: 'rgba(7, 9, 13, 0.02)', borderRadius: '8px', borderLeft: '3px solid rgba(7, 9, 13, 0.15)' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, color: 'rgba(7, 9, 13, 0.8)', display: 'block', marginBottom: '2px' }}>80%+</span>
                <span style={{ fontSize: '11px', color: 'rgba(7, 9, 13, 0.6)', fontWeight: 600 }}>Market prediction potential with stacked AI variables</span>
              </div>

              <p className={styles.accuracyNote}>
                Accuracy claims should be validated against internal data before final public launch.
              </p>
            </div>

            {/* Card 2 */}
            <div className={styles.resultCard} style={{ backgroundColor: '#FFFFFF', borderColor: 'rgba(7, 9, 13, 0.08)' }}>
              <h3 className={styles.resultTitle} style={{ color: 'var(--text-dark)' }}>0-to-60 Day Isolation Gate</h3>
              <p className={styles.resultDesc} style={{ color: 'rgba(7, 9, 13, 0.65)' }}>
                The platform filters out slow-moving records and isolates the fraction of properties showing near-term listing potential.
              </p>
            </div>

            {/* Card 3 */}
            <div className={styles.resultCard} style={{ backgroundColor: '#FFFFFF', borderColor: 'rgba(7, 9, 13, 0.08)' }}>
              <h3 className={styles.resultTitle} style={{ color: 'var(--text-dark)' }}>Continuous Pipeline Progression</h3>
              <p className={styles.resultDesc} style={{ color: 'rgba(7, 9, 13, 0.65)' }}>
                Properties that are not ready today continue through the monitoring loop until their records hit a live trigger point.
              </p>
            </div>

            {/* Card 4 */}
            <div className={styles.resultCard} style={{ backgroundColor: '#FFFFFF', borderColor: 'rgba(7, 9, 13, 0.08)' }}>
              <h3 className={styles.resultTitle} style={{ color: 'var(--text-dark)' }}>Guaranteed Territory Scarcity</h3>
              <p className={styles.resultDesc} style={{ color: 'rgba(7, 9, 13, 0.65)' }}>
                To prevent list fatigue and protect local market splits, access is capped by exclusive zip code clusters.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 8. Pricing / Allocation Slots Section */}
      <section id="pricing" className={styles.pricingSection}>
        <div className="premium-container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Choose Your Allocation Slot</h2>
            <p className={styles.sectionIntro} style={{ color: 'var(--text-muted)' }}>
              Lock a monthly Golden Pin allocation before your zip code cluster closes.
            </p>
          </div>

          <div className={styles.pricingGrid}>
            
            {/* Card 1 */}
            <div className={styles.pricingCard}>
              <span className={styles.planName}>The 50-Pin Starter Cluster</span>
              <div className={styles.price}>
                $79<span className={styles.pricePeriod}>/mo</span>
              </div>
              
              <div className={styles.planDivider} />
              
              <ul className={styles.planFeatures}>
                <li className={styles.featureItem}>
                  <svg className={styles.featureItemIcon} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  50 Curated Golden Tier Pins Per Month
                </li>
                <li className={styles.featureItem}>
                  <svg className={styles.featureItemIcon} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Real-Time Push Timing Alerts
                </li>
                <li className={styles.featureItem}>
                  <svg className={styles.featureItemIcon} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Mobile PWA Interactive Map View
                </li>
                <li className={styles.featureItem}>
                  <svg className={styles.featureItemIcon} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Tap-to-Reveal Contact Enrichment
                </li>
                <li className={styles.featureItem}>
                  <svg className={styles.featureItemIcon} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  AI Conversational Context Scripts
                </li>
              </ul>

              <button className={`${styles.planBtn} ${styles.planBtnSecondary}`} onClick={() => handleScrollTo('availability')}>
                Claim 50-Pin Zone
              </button>
            </div>

            {/* Card 2 */}
            <div className={`${styles.pricingCard} ${styles.pricingCardRecommended}`}>
              <span className={styles.planName}>The 100-Pin Territory Lockdown</span>
              <div className={styles.price}>
                $129<span className={styles.pricePeriod}>/mo</span>
              </div>
              
              <div className={styles.planDivider} />
              
              <ul className={styles.planFeatures}>
                <li className={styles.featureItem}>
                  <svg className={styles.featureItemIcon} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  100 Curated Golden Tier Pins Per Month
                </li>
                <li className={styles.featureItem}>
                  <svg className={styles.featureItemIcon} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Complete Zip Code Territory Cluster
                </li>
                <li className={styles.featureItem}>
                  <svg className={styles.featureItemIcon} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Real-Time Push Timing Alerts
                </li>
                <li className={styles.featureItem}>
                  <svg className={styles.featureItemIcon} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Mobile PWA Interactive Map View
                </li>
                <li className={styles.featureItem}>
                  <svg className={styles.featureItemIcon} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Tap-to-Reveal Contact Enrichment
                </li>
                <li className={styles.featureItem}>
                  <svg className={styles.featureItemIcon} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  AI Conversational Context Scripts
                </li>
                <li className={styles.featureItem}>
                  <svg className={styles.featureItemIcon} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  In-App Pipeline Tracker Toggles
                </li>
              </ul>

              <button className={`${styles.planBtn} ${styles.planBtnPrimary}`} onClick={() => handleScrollTo('availability')}>
                Lock Down 100-Pin Zone
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 9. Scarcity / Closing CTA Section */}
      <section className={styles.ctaSection}>
        <div className={`${styles.ctaContainer} premium-container`}>
          <h2 className={styles.ctaTitle}>Your Zip Code Cluster Will Not Stay Open Forever</h2>
          <p className={styles.ctaDesc}>
            VelocityRE.pro limits access by territory to prevent consumer fatigue and protect local opportunity density. Once a zip code cluster is locked, the gate closes.
          </p>
          <button className={styles.btnPrimary} style={{ padding: '18px 36px' }} onClick={() => handleScrollTo('availability')}>
            Check Your Zip Code Availability
          </button>
          <p className={styles.ctaSubtext}>
            No massive spreadsheets. No guessing. Just curated listing opportunities delivered to your phone.
          </p>
        </div>
      </section>

      {/* 10. Footer */}
      <footer className={styles.footer}>
        <div className={`${styles.footerGrid} premium-container`}>
          
          <div className={styles.footerBrand}>
            <span className={styles.logo} style={{ fontSize: '24px' }}>
              VelocityRE<span className={styles.logoDot}>.pro</span>
            </span>
            <p className={styles.footerText}>
              AI-powered listing target intelligence for real estate professionals.
            </p>
          </div>

          <div className={styles.footerLinks}>
            <div className={styles.footerLinkCol}>
              <span className={styles.footerLinkHeader}>Platform</span>
              <a href="#how-it-works" className={styles.footerLink} onClick={(e) => { e.preventDefault(); handleScrollTo('how-it-works'); }}>How It Works</a>
              <a href="#golden-pins" className={styles.footerLink} onClick={(e) => { e.preventDefault(); handleScrollTo('golden-pins'); }}>Golden Pins</a>
              <a href="#pricing" className={styles.footerLink} onClick={(e) => { e.preventDefault(); handleScrollTo('pricing'); }}>Pricing</a>
            </div>
            
            <div className={styles.footerLinkCol}>
              <span className={styles.footerLinkHeader}>Legal & Contact</span>
              <a href="#" className={styles.footerLink} onClick={(e) => e.preventDefault()}>Privacy Policy</a>
              <a href="#" className={styles.footerLink} onClick={(e) => e.preventDefault()}>Terms of Service</a>
              <a href="#" className={styles.footerLink} onClick={(e) => e.preventDefault()}>Contact Sales</a>
            </div>
          </div>

        </div>

        <div className={`${styles.footerBottom} premium-container`}>
          <p className={styles.disclaimer}>
            <strong>Disclaimer:</strong> VelocityRE.pro provides data-driven prospecting intelligence. Results vary by market, timing, agent follow-up, and data availability.
          </p>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} VelocityRE.pro. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}
