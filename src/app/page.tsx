'use client';

import { useState, type FormEvent } from 'react';
import styles from './page.module.css';

const CALENDLY_URL = 'https://calendly.com/leadsbystorm-support/30min';

type SignalId = 'expired' | 'corporate' | 'preforeclosure' | 'landlord';
type FormState = { firstName: string; lastName: string; email: string; phone: string; brokerage: string; market: string };

const signals: Record<SignalId, {
  label: string;
  address: string;
  profile: string;
  why: string;
  action: string;
  message: string;
  className: string;
}> = {
  expired: {
    label: 'Expired',
    address: '3346 Treviso Cove',
    profile: 'Owner occupied',
    why: 'Listing expired 18 days ago · No deed transfer found',
    action: 'Call strategy ready',
    message: 'Are you taking a break from the market, or would you still consider selling if the right option came along?',
    className: 'pinExpired',
  },
  corporate: {
    label: 'Corporate',
    address: '13065 Vista Verde Blvd',
    profile: 'Corporate owned',
    why: 'Recent listing did not close · Portfolio ownership confirmed',
    action: 'Decision-maker path ready',
    message: 'Are you planning to hold the property, or would you consider a different path to get it sold?',
    className: 'pinCorporate',
  },
  preforeclosure: {
    label: 'Time-sensitive',
    address: '2035 Pauline Street',
    profile: 'Public-record signal',
    why: 'Failed listing · Time-sensitive public record activity detected',
    action: 'Priority outreach ready',
    message: 'Would you be open to looking at another option that could help get the property resolved on your timeline?',
    className: 'pinPriority',
  },
  landlord: {
    label: 'Landlord',
    address: '4821 Crestwood Drive',
    profile: 'Non-owner occupied',
    why: 'Long-term ownership · Rental profile · Listing history match',
    action: 'Email sequence ready',
    message: 'Would selling the property make sense if the process were straightforward and the timing worked for you?',
    className: 'pinLandlord',
  },
};

const engineSteps = [
  ['01', 'The Velocity Scrub', 'Recent deed transfers and listing outcomes remove properties that already sold or no longer belong in the package.'],
  ['02', 'Contact-Path Waterfall', 'Up to five phone numbers are screened. Callable records move forward; DNC-restricted properties move to email rescue.'],
  ['03', 'Disposition Intelligence', 'Each property is categorized by the strongest reason an owner may be ready to make a move.'],
  ['04', 'Action-Ready Delivery', 'The mobile map gives you the property context and the call strategy or email template for that exact situation.'],
];

const packageItems = [
  ['10–15', 'Scrubbed target properties', 'Market-specific properties selected, verified, and ready to work.'],
  ['1–2', 'Face-to-face appointments', 'Our internal team works the package and books your first listing conversations.'],
  ['5–10', 'Premium email opportunities', 'DNC-restricted properties rescued with available email data and matched templates.'],
];

const faqs = [
  ['What exactly do I receive?', 'A market-specific pilot containing 10–15 scrubbed target properties, 1–2 face-to-face appointments, 5–10 email-ready opportunities, mobile map access, and property-specific call and email messaging.'],
  ['Are these ordinary internet leads?', 'No. VelocityRE begins with property and ownership records, removes properties that no longer qualify, identifies the strongest seller situation, and builds a specific outreach path around each remaining property.'],
  ['What happens when a phone number is on the DNC list?', 'We do not discard the property. It moves into the email-rescue path with the available email contact and a template matched to the property situation. You remain responsible for following applicable law and brokerage policy.'],
  ['What is guaranteed?', 'The pilot includes 1–2 face-to-face appointments subject to the written pilot terms, market eligibility, and agent cooperation. A listing, closing, commission, homeowner response, or financial return is not guaranteed.'],
  ['What happens after the pilot?', 'You choose the ongoing package that fits your business: work the opportunities yourself, increase the number of properties, or have our team continue outreach and appointment setting.'],
];

function Arrow() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" /></svg>;
}

function Check() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" /></svg>;
}

function HomeIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="m3 11 9-7 9 7v9H3v-9Z" /><path d="M9 20v-6h6v6" /></svg>;
}

function MailIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>;
}

function CalendarIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4m8-4v4M3 10h18m-13 5 2 2 5-5" /></svg>;
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Home() {
  const [activeSignal, setActiveSignal] = useState<SignalId>('expired');
  const [form, setForm] = useState<FormState>({ firstName: '', lastName: '', email: '', phone: '', brokerage: '', market: '' });
  const [error, setError] = useState('');
  const active = signals[activeSignal];

  const setField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (error) setError('');
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
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
        <button className={styles.brand} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><strong>VelocityRE<span>.pro</span></strong><small>by Leads By Storm</small></button>
        <nav aria-label="Main navigation"><button onClick={() => scrollToId('engine')}>The engine</button><button onClick={() => scrollToId('pilot')}>Pilot package</button><button onClick={() => scrollToId('faq')}>Questions</button></nav>
        <button className={styles.headerCta} onClick={() => scrollToId('apply')}>Apply for the pilot</button>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <span className={styles.kicker}><i />The intelligent off-market listing engine</span>
            <h1>We build your off-market pipeline—and book the first appointments.</h1>
            <p>VelocityRE scrubs failed listings, finds the right contact path, identifies why each owner may sell, and delivers a complete market package you can start working immediately.</p>
            <div className={styles.heroActions}><button className={styles.primary} onClick={() => scrollToId('apply')}>Apply for the $279 pilot <Arrow /></button><button className={styles.secondary} onClick={() => scrollToId('engine')}>See the engine work</button></div>
            <div className={styles.metrics}>
              <div><strong>10–15</strong><span>Scrubbed targets</span></div>
              <div><strong>1–2</strong><span>Appointments</span></div>
              <div><strong>5–10</strong><span>Email opportunities</span></div>
            </div>
          </div>

          <div className={styles.appShell} aria-label="Interactive VelocityRE mobile market map">
            <div className={styles.appTop}><div><span /><span /><span /></div><strong>VelocityRE · Fort Wayne</strong><b>15 targets</b></div>
            <div className={styles.appBody}>
              <div className={styles.map}>
                <div className={styles.roadOne} /><div className={styles.roadTwo} /><div className={styles.roadThree} />
                {(Object.keys(signals) as SignalId[]).map((id, index) => (
                  <button key={id} aria-label={`View ${signals[id].label} property`} className={`${styles.mapPin} ${styles[signals[id].className]} ${styles[`pinPosition${index + 1}`]} ${activeSignal === id ? styles.pinActive : ''}`} onClick={() => setActiveSignal(id)}><HomeIcon /><span>{signals[id].label}</span></button>
                ))}
                <div className={styles.mapLabelOne}>Aboite</div><div className={styles.mapLabelTwo}>Fort Wayne</div>
              </div>
              <aside className={styles.propertyPanel}>
                <div className={styles.panelStatus}><span>{active.label}</span><b>{active.action}</b></div>
                <h2>{active.address}</h2><p>{active.profile}</p>
                <div className={styles.signalBox}><small>WHY IT SURFACED</small><strong>{active.why}</strong></div>
                <div className={styles.messageBox}><small>PROPERTY-SPECIFIC APPROACH</small><p>“{active.message}”</p></div>
                <button onClick={() => scrollToId('apply')}>Open opportunity <Arrow /></button>
              </aside>
            </div>
            <div className={styles.appFooter}><span><i className={styles.legendOrange} />Expired</span><span><i className={styles.legendBlue} />Corporate</span><span><i className={styles.legendRed} />Time-sensitive</span><span><i className={styles.legendPurple} />Landlord</span></div>
          </div>
        </div>
      </section>

      <section id="engine" className={styles.engineSection}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeading}><div><span className={styles.kicker}><i />The VelocityRE engine</span><h2>From failed listing to agent-ready opportunity.</h2></div><p>Every property passes through the same four-stage system before it reaches your phone. The result is not a spreadsheet—it is a clear reason to reach out and the next action already prepared.</p></div>
          <div className={styles.engineRail}>
            {engineSteps.map(([number, title, body], index) => <article key={number}><div className={styles.stepIcon}>{index === 0 ? <HomeIcon /> : index === 1 ? <MailIcon /> : index === 2 ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="8" /><path d="m12 7 2 4 4 1-4 2-2 4-2-4-4-2 4-1 2-4Z" /></svg> : <CalendarIcon />}</div><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}
          </div>
          <div className={styles.engineOutput}><span>FAILED LISTING DATA</span><Arrow /><span>VERIFIED PROPERTY</span><Arrow /><span>SELLER SITUATION</span><Arrow /><strong>READY-TO-WORK OPPORTUNITY</strong></div>
        </div>
      </section>

      <section className={styles.rescueSection}>
        <div className={styles.rescueInner}>
          <div className={styles.rescueCopy}><span className={styles.kicker}><i />No Lead Left Behind</span><h2>A DNC number does not erase a valuable property.</h2><p>VelocityRE screens up to five phone numbers for a compliant calling path. If the property cannot be called, it moves into email rescue—preserving the opportunity and giving you a property-specific way to reach out.</p><ul><li><Check />Up to five numbers screened per property</li><li><Check />DNC-restricted records separated automatically</li><li><Check />Available owner email captured</li><li><Check />Matched email template delivered in the app</li></ul></div>
          <div className={styles.waterfall}>
            <div className={styles.waterfallTop}><span>CONTACT-PATH WATERFALL</span><b>Property retained</b></div>
            <div className={styles.phoneStack}>{['Phone 01 · DNC', 'Phone 02 · DNC', 'Phone 03 · Invalid', 'Phone 04 · DNC', 'Phone 05 · No match'].map((phone, index) => <div key={phone}><span>{phone}</span><b>{index < 2 || index === 3 ? 'RESTRICTED' : 'REMOVED'}</b></div>)}</div>
            <div className={styles.rescueArrow}><span>NO CALLABLE NUMBER</span><Arrow /></div>
            <div className={styles.emailRecovered}><MailIcon /><div><small>EMAIL RESCUE COMPLETE</small><strong>Owner email + matched template</strong><p>Opportunity stays in your package.</p></div><Check /></div>
          </div>
        </div>
      </section>

      <section id="pilot" className={styles.pilotSection}>
        <div className={styles.pilotInner}>
          <div className={styles.pilotIntro}><span className={styles.kicker}><i />The VelocityRE Pilot Package</span><h2>Everything needed to prove the system in your market.</h2><p>For $279 per month, we build the package, work the initial outreach, and put your first face-to-face listing conversations on the calendar.</p></div>
          <div className={styles.packageVisual}>
            <div className={styles.packageBand}><span>MARKET-SPECIFIC</span><strong>$279<small>/ month</small></strong><span>MONTH TO MONTH</span></div>
            <div className={styles.packageContents}>{packageItems.map(([value, title, body], index) => <article key={title}><span>{index === 0 ? <HomeIcon /> : index === 1 ? <CalendarIcon /> : <MailIcon />}</span><div><b>{value}</b><h3>{title}</h3><p>{body}</p></div><Check /></article>)}</div>
            <div className={styles.packageBottom}><span><Check />Mobile opportunity map</span><span><Check />Property-specific messaging</span><span><Check />Internal appointment team</span></div>
          </div>
          <div className={styles.afterPilot}><span>AFTER THE PILOT</span><p>Keep working a focused package yourself, scale the number of properties, or have our team continue booking appointments for you.</p><button onClick={() => scrollToId('apply')}>See if my market qualifies <Arrow /></button></div>
        </div>
      </section>

      <section id="apply" className={styles.applySection}>
        <div className={styles.applyInner}>
          <div className={styles.applyCopy}><span className={styles.kicker}><i />Pilot markets are limited</span><h2>See if your market is available.</h2><p>Send us your target city. We will confirm availability and show you what the first VelocityRE package would look like in your market.</p><div className={styles.applyProof}><div><strong>$279</strong><span>Monthly pilot</span></div><div><strong>1–2</strong><span>Appointments included*</span></div><div><strong>0</strong><span>Payment collected here</span></div></div></div>
          <form className={styles.form} onSubmit={submit}>
            <div className={styles.formTitle}><span>VELOCITYRE PILOT</span><strong>Market application</strong><small>Complete the form to continue to scheduling.</small></div>
            <div className={styles.formRow}><label>First name<input value={form.firstName} onChange={(e) => setField('firstName', e.target.value)} autoComplete="given-name" /></label><label>Last name<input value={form.lastName} onChange={(e) => setField('lastName', e.target.value)} autoComplete="family-name" /></label></div>
            <div className={styles.formRow}><label>Email address<input type="email" value={form.email} onChange={(e) => setField('email', e.target.value)} autoComplete="email" /></label><label>Mobile phone<input type="tel" value={form.phone} onChange={(e) => setField('phone', e.target.value)} autoComplete="tel" /></label></div>
            <div className={styles.formRow}><label>Brokerage name<input value={form.brokerage} onChange={(e) => setField('brokerage', e.target.value)} autoComplete="organization" /></label><label>Target market / city<input value={form.market} onChange={(e) => setField('market', e.target.value)} placeholder="Fort Wayne, IN" /></label></div>
            {error && <p className={styles.error}>{error}</p>}
            <button className={styles.primary} type="submit">See if I qualify <Arrow /></button><small className={styles.formNote}>By continuing, you agree to be contacted about the VelocityRE Pilot. No payment is collected on this form.</small>
          </form>
        </div>
      </section>

      <section id="faq" className={styles.faqSection}><div className={styles.faqInner}><div><span className={styles.kicker}><i />Straight answers</span><h2>What agents need to know.</h2></div><div className={styles.faqList}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></div></section>

      <footer className={styles.footer}><div><strong>VelocityRE<span>.pro</span></strong><nav><a href="/terms">Program Terms</a><a href="/privacy">Privacy Policy</a><a href="mailto:support@leadsbystorm.com?subject=VelocityRE.pro%20Pilot">Contact</a></nav></div><p>VelocityRE.pro provides data-driven prospecting opportunities and outreach support. Appointment delivery is subject to written pilot terms, market eligibility, and agent cooperation. No homeowner response, listing, closing, commission, earnings amount, or return is guaranteed. Users are responsible for compliance with applicable laws and brokerage policies.</p><small>© {new Date().getFullYear()} Leads By Storm. All rights reserved.</small></footer>
      <div className={styles.mobileCta}><button onClick={() => scrollToId('apply')}>Apply for the $279 pilot <Arrow /></button></div>
    </main>
  );
}
