'use client';

import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

type CallPhase = 'dialing' | 'connected' | 'wrapup';

type CallSession = {
  host: HTMLElement;
  owner: string;
  address: string;
  phase: CallPhase;
};

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  const remainder = (seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remainder}`;
};

const getInitials = (name: string) => {
  const cleaned = name.replace(/[^a-zA-Z\s]/g, ' ').trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'PO';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

function ControlButton({
  label,
  active = false,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={{
        appearance: 'none',
        border: active ? '1px solid rgba(216,166,63,0.75)' : '1px solid rgba(255,255,255,0.14)',
        background: active ? 'rgba(216,166,63,0.18)' : 'rgba(255,255,255,0.08)',
        color: active ? '#F2C766' : '#FFFFFF',
        width: '58px',
        height: '58px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: active ? '0 0 0 5px rgba(216,166,63,0.08)' : 'inset 0 1px 0 rgba(255,255,255,0.08)',
        transition: 'all 180ms ease',
      }}
      aria-label={label}
      title={label}
    >
      {children}
    </button>
  );
}

/**
 * Converts the product mockup's existing tel: CTA into a visible, interactive
 * in-phone call experience. The mock phone transitions from the seller map to
 * dialing, connected, and post-call outcome states without leaving the page.
 */
export default function NativeCallBridge() {
  const [session, setSession] = useState<CallSession | null>(null);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [speaker, setSpeaker] = useState(false);
  const [keypadOpen, setKeypadOpen] = useState(false);

  useEffect(() => {
    const handleCallClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>('a[href^="tel:"]');
      if (!link) return;

      const card = link.parentElement;
      const mapArea = card?.parentElement;
      const phoneScreen = mapArea?.parentElement;
      if (!(phoneScreen instanceof HTMLElement)) return;

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      const ownerLine = Array.from(card?.querySelectorAll('p') ?? []).find((node) =>
        node.textContent?.trim().toLowerCase().startsWith('owner:'),
      );

      const owner = ownerLine?.textContent?.replace(/^owner:\s*/i, '').trim() || 'Property Owner';
      const address = card?.querySelector('h4')?.textContent?.trim() || 'Selected Property';

      setDuration(0);
      setMuted(false);
      setSpeaker(false);
      setKeypadOpen(false);
      setSession({ host: phoneScreen, owner, address, phase: 'dialing' });

      if ('vibrate' in navigator) navigator.vibrate([35, 45, 35]);
    };

    document.addEventListener('click', handleCallClick, true);
    return () => document.removeEventListener('click', handleCallClick, true);
  }, []);

  useEffect(() => {
    if (session?.phase !== 'dialing') return;

    const timer = window.setTimeout(() => {
      setSession((current) => (current ? { ...current, phase: 'connected' } : null));
    }, 1500);

    return () => window.clearTimeout(timer);
  }, [session?.phase]);

  useEffect(() => {
    if (session?.phase !== 'connected') return;

    const timer = window.setInterval(() => {
      setDuration((current) => current + 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [session?.phase]);

  const initials = useMemo(() => getInitials(session?.owner ?? ''), [session?.owner]);

  if (!session) return null;

  const closeCall = () => {
    if ('vibrate' in navigator) navigator.vibrate(45);
    setSession((current) => (current ? { ...current, phase: 'wrapup' } : null));
    setKeypadOpen(false);
  };

  const returnToMap = () => {
    setSession(null);
    setDuration(0);
    setMuted(false);
    setSpeaker(false);
    setKeypadOpen(false);
  };

  const overlay = (
    <div
      role="dialog"
      aria-label={`Call screen for ${session.owner}`}
      onClick={(event) => event.stopPropagation()}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 100,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        color: '#FFFFFF',
        background:
          'radial-gradient(circle at 50% 16%, rgba(216,166,63,0.20), transparent 30%), linear-gradient(180deg, #11253A 0%, #07101D 58%, #03070D 100%)',
        animation: 'velocity-call-enter 260ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <style>{`
        @keyframes velocity-call-enter {
          from { opacity: 0; transform: translateY(18px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes velocity-call-ring {
          0%, 100% { transform: scale(1); opacity: 0.42; }
          50% { transform: scale(1.18); opacity: 0; }
        }
        @keyframes velocity-call-wave {
          0%, 100% { transform: scaleY(0.35); opacity: 0.45; }
          50% { transform: scaleY(1); opacity: 1; }
        }
      `}</style>

      {session.phase === 'wrapup' ? (
        <div
          style={{
            minHeight: '100%',
            padding: '58px 18px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '66px',
              height: '66px',
              borderRadius: '50%',
              display: 'grid',
              placeItems: 'center',
              background: 'rgba(216,166,63,0.14)',
              border: '1px solid rgba(216,166,63,0.40)',
              color: '#F2C766',
              marginBottom: '18px',
            }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>

          <div style={{ fontSize: '10px', letterSpacing: '0.14em', color: '#91A1B2', fontWeight: 800 }}>
            CALL COMPLETE
          </div>
          <h3 style={{ fontSize: '24px', margin: '8px 0 4px', color: '#FFFFFF' }}>{session.owner}</h3>
          <div style={{ color: '#A7B4C2', fontSize: '12px' }}>{formatDuration(duration)} • {session.address}</div>

          <div
            style={{
              width: '100%',
              marginTop: '26px',
              padding: '14px',
              borderRadius: '14px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.10)',
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: 800, marginBottom: '10px', color: '#F7F4EC' }}>
              Log call outcome
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {['Reached owner', 'Left voicemail', 'Follow up', 'Not interested'].map((label) => (
                <button
                  type="button"
                  key={label}
                  onClick={returnToMap}
                  style={{
                    padding: '9px 8px',
                    borderRadius: '9px',
                    border: '1px solid rgba(255,255,255,0.12)',
                    background: 'rgba(255,255,255,0.07)',
                    color: '#FFFFFF',
                    fontSize: '10px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={returnToMap}
            style={{
              marginTop: 'auto',
              border: 0,
              background: 'transparent',
              color: '#D8A63F',
              fontSize: '11px',
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            Return to seller map
          </button>
        </div>
      ) : (
        <>
          <div
            style={{
              height: '44px',
              padding: '0 20px 8px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              fontSize: '10px',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.78)',
            }}
          >
            <span>9:41</span>
            <span>VelocityRE Call</span>
          </div>

          <div style={{ padding: '18px 20px 0', textAlign: 'center' }}>
            <div
              style={{
                position: 'relative',
                width: '86px',
                height: '86px',
                margin: '0 auto 16px',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  inset: '-10px',
                  borderRadius: '50%',
                  border: '1px solid rgba(216,166,63,0.40)',
                  animation: session.phase === 'dialing' ? 'velocity-call-ring 1.4s ease-out infinite' : 'none',
                }}
              />
              <div
                style={{
                  width: '86px',
                  height: '86px',
                  borderRadius: '50%',
                  display: 'grid',
                  placeItems: 'center',
                  background: 'linear-gradient(145deg, #D8A63F, #8A5E09)',
                  color: '#07101D',
                  fontSize: '25px',
                  fontWeight: 900,
                  boxShadow: '0 18px 45px rgba(0,0,0,0.34), inset 0 1px 0 rgba(255,255,255,0.42)',
                }}
              >
                {initials}
              </div>
            </div>

            <div style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.03em' }}>{session.owner}</div>
            <div style={{ marginTop: '4px', fontSize: '11px', color: '#9EADBC' }}>{session.address}</div>
            <div style={{ marginTop: '10px', color: session.phase === 'connected' ? '#75D6A1' : '#D8A63F', fontSize: '11px', fontWeight: 800 }}>
              {session.phase === 'connected' ? formatDuration(duration) : 'Calling owner…'}
            </div>

            <div
              aria-hidden="true"
              style={{
                height: '24px',
                margin: '14px auto 8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
              }}
            >
              {[12, 20, 9, 23, 15, 25, 11, 19, 13].map((height, index) => (
                <span
                  key={`${height}-${index}`}
                  style={{
                    width: '3px',
                    height: `${height}px`,
                    borderRadius: '99px',
                    background: session.phase === 'connected' ? '#75D6A1' : '#D8A63F',
                    transformOrigin: 'center',
                    animation: `velocity-call-wave 900ms ease-in-out ${index * 70}ms infinite`,
                  }}
                />
              ))}
            </div>
          </div>

          {keypadOpen ? (
            <div style={{ padding: '8px 32px 0' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((digit) => (
                  <button
                    key={digit}
                    type="button"
                    style={{
                      height: '34px',
                      borderRadius: '11px',
                      border: '1px solid rgba(255,255,255,0.10)',
                      background: 'rgba(255,255,255,0.07)',
                      color: '#FFFFFF',
                      fontSize: '15px',
                      cursor: 'pointer',
                    }}
                  >
                    {digit}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'center', gap: '22px' }}>
              <div style={{ textAlign: 'center' }}>
                <ControlButton label="Mute" active={muted} onClick={() => setMuted((value) => !value)}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 5.12 2.12M15 9.34V5a3 3 0 0 0-5.94-.6" />
                    <path d="M17 16.95A7 7 0 0 1 5 12v-2M12 19v3M8 22h8M3 3l18 18" />
                  </svg>
                </ControlButton>
                <div style={{ marginTop: '6px', fontSize: '9px', color: '#A7B4C2' }}>Mute</div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <ControlButton label="Keypad" active={keypadOpen} onClick={() => setKeypadOpen(true)}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    {[5, 12, 19].flatMap((y) => [5, 12, 19].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.5" />))}
                  </svg>
                </ControlButton>
                <div style={{ marginTop: '6px', fontSize: '9px', color: '#A7B4C2' }}>Keypad</div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <ControlButton label="Speaker" active={speaker} onClick={() => setSpeaker((value) => !value)}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 5 6 9H2v6h4l5 4V5Z" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" />
                  </svg>
                </ControlButton>
                <div style={{ marginTop: '6px', fontSize: '9px', color: '#A7B4C2' }}>Speaker</div>
              </div>
            </div>
          )}

          <div
            style={{
              margin: '16px 18px 0',
              padding: '10px 12px',
              borderRadius: '11px',
              background: 'rgba(216,166,63,0.08)',
              border: '1px solid rgba(216,166,63,0.18)',
              fontSize: '9px',
              lineHeight: 1.4,
              color: '#CBD4DD',
              textAlign: 'center',
            }}
          >
            Seller context stays pinned while you speak: property signal, owner, address, and follow-up status.
          </div>

          <div style={{ marginTop: 'auto', padding: '12px 0 22px', display: 'flex', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={closeCall}
              aria-label="End call"
              style={{
                width: '62px',
                height: '62px',
                borderRadius: '50%',
                border: 'none',
                background: 'linear-gradient(145deg, #FF5C5C, #C81E35)',
                color: '#FFFFFF',
                display: 'grid',
                placeItems: 'center',
                cursor: 'pointer',
                boxShadow: '0 14px 28px rgba(200,30,53,0.36), inset 0 1px 0 rgba(255,255,255,0.28)',
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" style={{ transform: 'rotate(135deg)' }}>
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-2.2 2.2a15.045 15.045 0 0 1-6.59-6.59l2.2-2.2c.28-.28.36-.67.25-1.02A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );

  return createPortal(overlay, session.host);
}
