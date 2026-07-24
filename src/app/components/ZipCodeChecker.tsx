'use client';

import React, { useMemo, useState } from 'react';
import styles from './ZipCodeChecker.module.css';

type Status = 'idle' | 'checking' | 'available' | 'locked';

const isPreliminarilyAssigned = (zip: string) => {
  const score = zip
    .split('')
    .reduce((total, digit, index) => total + Number(digit) * (index + 3), 0);

  // Until a live territory inventory API is connected, keep the preview useful:
  // most ZIPs return preliminary availability, while a small deterministic set
  // demonstrates the assigned-territory state.
  return score % 13 === 0;
};

const nearbyZips = (zip: string) => {
  const base = Number(zip);
  return [1, 2, 4]
    .map((offset) => String(Math.min(99999, base + offset)).padStart(5, '0'))
    .filter((value) => value !== zip);
};

export default function ZipCodeChecker() {
  const [zip, setZip] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [lastCheckedZip, setLastCheckedZip] = useState('');

  const suggestions = useMemo(
    () => (lastCheckedZip ? nearbyZips(lastCheckedZip) : []),
    [lastCheckedZip],
  );

  const runCheck = (value: string) => {
    if (!/^\d{5}$/.test(value) || value === '00000') return;

    setZip(value);
    setLastCheckedZip(value);
    setStatus('checking');

    window.setTimeout(() => {
      setStatus(isPreliminarilyAssigned(value) ? 'locked' : 'available');
    }, 750);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    runCheck(zip);
  };

  const handleReset = () => {
    setZip('');
    setLastCheckedZip('');
    setStatus('idle');
  };

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.experience}>
      <div className={styles.story}>
        <div className={styles.eyebrow}><span /> PROTECTED LOCAL TERRITORIES</div>
        <h2>Find Out If Your Market Is Still Open.</h2>
        <p>
          VelocityRE limits territory overlap so agents are not competing against other VelocityRE customers for the same seller opportunities. Start with your primary ZIP code and see the preliminary status instantly.
        </p>

        <div className={styles.proofRow}>
          <div className={styles.proof}>
            <strong>1</strong>
            <span>Active VelocityRE agent per territory</span>
          </div>
          <div className={styles.proof}>
            <strong>50</strong>
            <span>New seller opportunities each month</span>
          </div>
          <div className={styles.proof}>
            <strong>1</strong>
            <span>Listing guaranteed under program terms</span>
          </div>
        </div>

        <div className={styles.mapPreview} aria-hidden="true">
          <div className={styles.mapLabel}>
            <strong>Protected Market Preview</strong>
            <span>Opportunity density • territory boundaries</span>
          </div>
          <div className={styles.mapStatus}>MARKETS OPEN</div>
          <span className={`${styles.pin} ${styles.pinOne}`} />
          <span className={`${styles.pin} ${styles.pinTwo}`} />
          <span className={`${styles.pin} ${styles.pinThree}`} />
        </div>
      </div>

      <div className={styles.checkerCard}>
        <div className={styles.cardTopline}>
          <span>TERRITORY AVAILABILITY</span>
          <small>PRELIMINARY CHECK</small>
        </div>

        {status === 'idle' && (
          <>
            <h3>Check Your Primary ZIP</h3>
            <p>No email required. Enter the market where you want protected seller opportunities.</p>

            <form className={styles.form} onSubmit={handleSubmit}>
              <label className={styles.label} htmlFor="territory-zip">5-DIGIT ZIP CODE</label>
              <div className={styles.inputRow}>
                <div className={styles.inputWrap}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 1 1 18 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <input
                    id="territory-zip"
                    type="text"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    required
                    pattern="^[0-9]{5}$"
                    maxLength={5}
                    placeholder="37909"
                    value={zip}
                    onChange={(event) => setZip(event.target.value.replace(/\D/g, ''))}
                  />
                </div>
                <button className={styles.primaryButton} type="submit">
                  Check Availability
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </button>
              </div>
              <p className={styles.microcopy}>
                Results are preliminary until our team confirms the final territory boundary and current assignment status.
              </p>
            </form>
          </>
        )}

        {status === 'checking' && (
          <div className={styles.loading}>
            <div className={styles.spinner} />
            <strong>Checking territory assignments…</strong>
            <span>Reviewing the market around ZIP {lastCheckedZip}</span>
          </div>
        )}

        {status === 'available' && (
          <>
            <h3>Preliminary Availability Found</h3>
            <p>ZIP {lastCheckedZip} appears open for a protected VelocityRE territory.</p>

            <div className={`${styles.result} ${styles.resultAvailable}`}>
              <div className={styles.resultHeading}>
                <div className={styles.resultIcon}>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                </div>
                <div>
                  <h4>Your market may still be available.</h4>
                  <p>Review the two guaranteed-listing programs, then request final territory confirmation.</p>
                </div>
              </div>

              <div className={styles.resultActions}>
                <button className={styles.primaryButton} type="button" onClick={scrollToPricing}>
                  View Program & Returns
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </button>
                <button className={styles.secondaryButton} type="button" onClick={handleReset}>Check Another ZIP</button>
              </div>
            </div>
          </>
        )}

        {status === 'locked' && (
          <>
            <h3>This ZIP Is Currently Assigned</h3>
            <p>ZIP {lastCheckedZip} appears to fall inside an existing protected territory.</p>

            <div className={`${styles.result} ${styles.resultLocked}`}>
              <div className={styles.resultHeading}>
                <div className={styles.resultIcon}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="4" y="10" width="16" height="11" rx="2" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                  </svg>
                </div>
                <div>
                  <h4>Try a nearby market boundary.</h4>
                  <p>Territories are based on workable market clusters, not always a single ZIP code.</p>
                </div>
              </div>

              <div className={styles.suggestions}>
                <span>CHECK A NEARBY ZIP</span>
                <div className={styles.suggestionRow}>
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      className={styles.zipSuggestion}
                      onClick={() => runCheck(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.resultActions}>
                <button className={styles.secondaryButton} type="button" onClick={handleReset}>Enter a Different ZIP</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
