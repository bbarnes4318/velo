'use client';

import React, { useState } from 'react';

type Status = 'idle' | 'checking' | 'available' | 'unavailable' | 'waitlist-success';

export default function ZipCodeChecker() {
  const [zip, setZip] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [lastCheckedZip, setLastCheckedZip] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!zip || !email) return;

    setStatus('checking');

    // Simulate polished API check delay
    setTimeout(() => {
      // Logic: Even last digit = Unavailable, Odd last digit = Available
      const lastDigit = zip.trim().slice(-1);
      const isOdd = parseInt(lastDigit, 10) % 2 !== 0;

      if (isOdd) {
        setStatus('available');
      } else {
        setStatus('unavailable');
      }
      setLastCheckedZip(zip);
    }, 1800);
  };

  const handleJoinWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('checking');
    setTimeout(() => {
      setStatus('waitlist-success');
    }, 1200);
  };

  const handleReset = () => {
    setZip('');
    setEmail('');
    setStatus('idle');
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: '540px',
      margin: '0 auto',
      backgroundColor: '#0B1424',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '24px',
      padding: '36px',
      boxShadow: '0 20px 40px -15px rgba(0,0,0,0.5)',
      boxSizing: 'border-box',
      textAlign: 'left'
    }}>
      <h3 style={{
        fontSize: '22px',
        color: '#F7F4EC',
        marginBottom: '12px',
        fontWeight: 700,
        letterSpacing: '-0.01em',
        textAlign: 'center'
      }}>
        Check If Your Zip Code Cluster Is Still Available
      </h3>
      <p style={{
        fontSize: '14px',
        color: '#A7AFBC',
        marginBottom: '28px',
        lineHeight: '1.5',
        textAlign: 'center'
      }}>
        Enter your primary target zip code and business email. Access is strictly limited to 1 active agent per zip code cluster.
      </p>

      {status === 'idle' && (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 120px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="zip" style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#A7AFBC' }}>
                Zip Code
              </label>
              <input
                id="zip"
                type="text"
                required
                pattern="^[0-9]{5}$"
                maxLength={5}
                placeholder="90210"
                value={zip}
                onChange={(e) => setZip(e.target.value.replace(/\D/g, ''))}
                style={{
                  backgroundColor: '#07090D',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  fontSize: '15px',
                  color: '#F7F4EC',
                  width: '100%',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s'
                }}
              />
            </div>
            <div style={{ flex: '2 1 200px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="email" style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#A7AFBC' }}>
                Professional Email
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="agent@brokerage.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  backgroundColor: '#07090D',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  fontSize: '15px',
                  color: '#F7F4EC',
                  width: '100%',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s'
                }}
              />
            </div>
          </div>
          <button
            type="submit"
            style={{
              marginTop: '8px',
              backgroundColor: '#D8A63F',
              color: '#07090D',
              border: 'none',
              borderRadius: '8px',
              padding: '14px 24px',
              fontSize: '15px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'background-color 0.2s, transform 0.1s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F2C766'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#D8A63F'}
          >
            Check Territory Availability
          </button>
        </form>
      )}

      {status === 'checking' && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 0',
          gap: '16px'
        }}>
          {/* Polished loading spinner */}
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '2px solid rgba(218,166,63,0.1)',
            borderTopColor: '#D8A63F',
            animation: 'pulse-glow 1s infinite linear, spin 1s infinite linear',
          }} />
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '15px', color: '#F7F4EC', fontWeight: 600 }}>Querying County Tax Registry & MLS Feeds...</p>
            <p style={{ fontSize: '12px', color: '#A7AFBC', marginTop: '4px' }}>Evaluating active boundaries for Zip {zip || lastCheckedZip}</p>
          </div>
        </div>
      )}

      {status === 'available' && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          animation: 'fade-in-up 0.5s ease'
        }}>
          {/* Status Banner */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            backgroundColor: 'rgba(218,166,63,0.1)',
            border: '1px solid #D8A63F',
            borderRadius: '12px',
            padding: '16px'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D8A63F" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: '2px' }}>
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#F7F4EC', marginBottom: '4px' }}>
                Good news — Zip Cluster {lastCheckedZip} is available
              </h4>
              <p style={{ fontSize: '13px', color: '#A7AFBC', lineHeight: 1.4 }}>
                This territory cluster is currently open for exclusive lockdown. No other agent has locked this slot.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => {
                // Scroll to pricing section
                const target = document.getElementById('pricing');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                flex: 1,
                backgroundColor: '#D8A63F',
                color: '#07090D',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 18px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F2C766'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#D8A63F'}
            >
              Secure This Territory
            </button>
            <button
              onClick={handleReset}
              style={{
                backgroundColor: 'transparent',
                color: '#A7AFBC',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                padding: '12px 18px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                e.currentTarget.style.color = '#F7F4EC';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.color = '#A7AFBC';
              }}
            >
              Check Another
            </button>
          </div>
        </div>
      )}

      {status === 'unavailable' && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          animation: 'fade-in-up 0.5s ease'
        }}>
          {/* Status Banner */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            backgroundColor: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '12px',
            padding: '16px'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A7AFBC" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: '2px' }}>
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#F7F4EC', marginBottom: '4px' }}>
                Zip Cluster {lastCheckedZip} is locked
              </h4>
              <p style={{ fontSize: '13px', color: '#A7AFBC', lineHeight: 1.4 }}>
                This territory cluster is already locked by another agent. In order to protect local opportunity density, we limit access to 1 agent per cluster.
              </p>
            </div>
          </div>

          <form onSubmit={handleJoinWaitlist} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p style={{ fontSize: '12px', color: '#F7F4EC', fontWeight: 600 }}>
              Join the priority waitlist for Zip {lastCheckedZip} to be notified if access opens:
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="submit"
                style={{
                  flex: 1,
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: '#F7F4EC',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  padding: '12px 18px',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
              >
                Join Priority Waitlist
              </button>
              <button
                type="button"
                onClick={handleReset}
                style={{
                  backgroundColor: 'transparent',
                  color: '#A7AFBC',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  padding: '12px 18px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.color = '#F7F4EC';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.color = '#A7AFBC';
                }}
              >
                Check Different Zip
              </button>
            </div>
          </form>
        </div>
      )}

      {status === 'waitlist-success' && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          padding: '20px 0',
          textAlign: 'center',
          animation: 'fade-in-up 0.5s ease'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: 'rgba(218,166,63,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #D8A63F'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D8A63F" strokeWidth="2.5">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div>
            <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#F7F4EC', marginBottom: '8px' }}>
              Waitlist Registration Confirmed
            </h4>
            <p style={{ fontSize: '14px', color: '#A7AFBC', lineHeight: 1.5, maxWidth: '400px', margin: '0 auto' }}>
              You are now locked into the queue for Zip Code cluster {lastCheckedZip}. If the current reservation lapses, we will contact you immediately at {email}.
            </p>
          </div>
          <button
            onClick={handleReset}
            style={{
              backgroundColor: 'transparent',
              color: '#D8A63F',
              border: '1px solid rgba(218,166,63,0.3)',
              borderRadius: '8px',
              padding: '10px 20px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              marginTop: '10px',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(218,166,63,0.05)';
              e.currentTarget.style.borderColor = '#D8A63F';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(218,166,63,0.3)';
            }}
          >
            Check Another Zip Code
          </button>
        </div>
      )}
    </div>
  );
}
