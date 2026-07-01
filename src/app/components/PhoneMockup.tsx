'use client';

import React, { useState, useEffect } from 'react';

interface Pin {
  id: number;
  x: number; // percentage
  y: number; // percentage
  address: string;
  trigger: string;
  window: string;
  reason: string;
  owner: string;
}

const pinsData: Pin[] = [
  {
    id: 1,
    x: 35,
    y: 28,
    address: "412 Oakridge Ave",
    trigger: "Legal + Financial Trigger",
    window: "60-Day Listing Window",
    reason: "Tax Lien + Notice of Default detected",
    owner: "R. Harrington"
  },
  {
    id: 2,
    x: 65,
    y: 22,
    address: "1894 Pinecrest Blvd",
    trigger: "Contract Expired",
    window: "45-Day Listing Window",
    reason: "MLS Listing expired 48 hours ago",
    owner: "M. Vance"
  },
  {
    id: 3,
    x: 20,
    y: 55,
    address: "874 Heather Lane",
    trigger: "Situational Stress",
    window: "30-Day Listing Window",
    reason: "Out-of-state owner + 2rd tax notice",
    owner: "J. Mercer"
  },
  {
    id: 4,
    x: 75,
    y: 58,
    address: "612 W Maple Dr",
    trigger: "Pre-Foreclosure Notice",
    window: "15-Day Listing Window",
    reason: "Lis Pendens filed at County Court",
    owner: "D. Kincaid"
  },
  {
    id: 5,
    x: 48,
    y: 70,
    address: "1055 Highland Ter",
    trigger: "Equity & Ownership Shift",
    window: "60-Day Listing Window",
    reason: "Inheritance probate filing completed",
    owner: "Estate of S. Miller"
  },
  {
    id: 6,
    x: 82,
    y: 35,
    address: "332 Crestview Dr",
    trigger: "Tax Delinquency",
    window: "60-Day Listing Window",
    reason: "24-month consecutive county tax default",
    owner: "T. Sterling"
  },
  {
    id: 7,
    x: 30,
    y: 82,
    address: "148 Outer Drive",
    trigger: "Situational Stress",
    window: "45-Day Listing Window",
    reason: "Water utility shutoff + code violations",
    owner: "K. Zhao"
  },
  {
    id: 8,
    x: 55,
    y: 42,
    address: "921 Edgewood Rd",
    trigger: "Expired Contract",
    window: "30-Day Listing Window",
    reason: "Active listing withdrawn from broker MLS",
    owner: "A. Patel"
  }
];

export default function PhoneMockup() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [pulsing, setPulsing] = useState<boolean>(true);

  // Auto-rotate pins slowly if not interacted with
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % pinsData.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const activePin = pinsData[activeIndex];

  const handlePinClick = (index: number) => {
    setActiveIndex(index);
    setPulsing(false);
    // Restart pulsing after a tiny delay
    setTimeout(() => setPulsing(true), 50);
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: '360px',
      margin: '0 auto',
      aspectRatio: '9 / 18.5',
      backgroundColor: '#000000',
      borderRadius: '40px',
      padding: '11px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.08), 0 0 0 4px #1A1C20',
      boxSizing: 'border-box'
    }}>
      {/* Top Speaker / Dynamic Island Grill */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80px',
        height: '24px',
        borderRadius: '12px',
        backgroundColor: '#000000',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Camera Lens effect */}
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: '#091833',
          border: '1px solid #142850',
          marginLeft: 'auto',
          marginRight: '12px'
        }} />
      </div>

      {/* Screen Area */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        borderRadius: '30px',
        backgroundColor: '#07090D',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        
        {/* Status Bar */}
        <div style={{
          height: '44px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          padding: '0 24px 8px',
          fontSize: '11px',
          fontWeight: 600,
          color: '#FFFFFF',
          zIndex: 40,
          backgroundColor: '#07090D',
        }}>
          <span>9:41</span>
          <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
            {/* Signal strength indicator */}
            <svg width="15" height="9" viewBox="0 0 17 11" fill="currentColor">
              <rect x="0" y="8" width="2.5" height="3" rx="0.5" />
              <rect x="4" y="6" width="2.5" height="5" rx="0.5" />
              <rect x="8" y="4" width="2.5" height="7" rx="0.5" />
              <rect x="12" y="1.5" width="2.5" height="9.5" rx="0.5" />
            </svg>
            <span>5G</span>
          </div>
        </div>

        {/* Interactive Map Area */}
        <div style={{
          flex: 1,
          position: 'relative',
          backgroundColor: '#0B1424',
          backgroundImage: `
            radial-gradient(#1E293B 1.5px, transparent 1.5px),
            linear-gradient(rgba(255,255,255,0.01) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.01) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px, 12px 12px, 12px 12px',
          overflow: 'hidden'
        }}>
          
          {/* Vector Streets / Roads SVG Background */}
          <svg style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0.15,
            pointerEvents: 'none'
          }} viewBox="0 0 300 400" fill="none">
            {/* Roads */}
            <path d="M -50,150 L 350,180" stroke="#FFFFFF" strokeWidth="8" />
            <path d="M 120,-50 L 150,450" stroke="#FFFFFF" strokeWidth="6" />
            <path d="M 220,-50 L 80,450" stroke="#FFFFFF" strokeWidth="4" />
            <path d="M -50,80 Q 150,120 350,60" stroke="#FFFFFF" strokeWidth="5" />
            <path d="M -50,300 C 100,320 200,260 350,320" stroke="#FFFFFF" strokeWidth="6" />
            <path d="M 50,-50 C 40,180 80,300 90,450" stroke="#FFFFFF" strokeWidth="4" />
            {/* Secondary thin streets */}
            <path d="M -50,220 L 350,230" stroke="#FFFFFF" strokeWidth="1.5" />
            <path d="M -50,50 L 350,40" stroke="#FFFFFF" strokeWidth="1.5" />
            <path d="M 280,-50 L 290,450" stroke="#FFFFFF" strokeWidth="2" />
          </svg>

          {/* Compass / Location Button */}
          <div style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: 'rgba(7, 9, 13, 0.85)',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#D8A63F',
            zIndex: 10,
            cursor: 'pointer'
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="3 11 22 2 13 21 11 13 3 11" />
            </svg>
          </div>

          {/* Map Pins */}
          {pinsData.map((pin, index) => {
            const isSelected = activeIndex === index;
            return (
              <button
                key={pin.id}
                onClick={() => handlePinClick(index)}
                style={{
                  position: 'absolute',
                  left: `${pin.x}%`,
                  top: `${pin.y}%`,
                  transform: 'translate(-50%, -100%)',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  outline: 'none',
                  zIndex: isSelected ? 30 : 20,
                  transition: 'transform 0.2s ease'
                }}
              >
                {/* Active Pin Pulse Animation */}
                {isSelected && pulsing && (
                  <span style={{
                    position: 'absolute',
                    left: '50%',
                    top: '80%',
                    transform: 'translate(-50%, -50%)',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(218, 166, 63, 0.25)',
                    animation: 'pulse-gold 2s infinite',
                    pointerEvents: 'none'
                  }} />
                )}

                {/* SVG Pin Marker */}
                <svg
                  width={isSelected ? "32" : "24"}
                  height={isSelected ? "38" : "28"}
                  viewBox="0 0 24 30"
                  fill="none"
                  style={{
                    filter: isSelected ? 'drop-shadow(0 4px 10px rgba(218,166,63,0.4))' : 'none',
                    transition: 'width 0.2s, height 0.2s',
                    color: isSelected ? '#D8A63F' : '#A7AFBC'
                  }}
                >
                  <path
                    d="M12 2C7.03 2 3 6.03 3 11C3 16.8 12 28 12 28C12 28 21 16.8 21 11C21 6.03 16.97 2 12 2Z"
                    fill="currentColor"
                  />
                  <circle
                    cx="12"
                    cy="11"
                    r="4"
                    fill="#07090D"
                  />
                </svg>
              </button>
            );
          })}

          {/* Golden Pin HUD Overlay Card (Active Details) */}
          <div style={{
            position: 'absolute',
            bottom: '16px',
            left: '12px',
            right: '12px',
            backgroundColor: 'rgba(7, 9, 13, 0.95)',
            border: '1px solid #D8A63F',
            borderRadius: '16px',
            padding: '16px',
            boxShadow: '0 12px 24px -6px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)',
            zIndex: 35,
            transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
            color: '#FFFFFF'
          }}>
            {/* Header Badge */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '10px'
            }}>
              <span style={{
                fontSize: '9px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#D8A63F',
                backgroundColor: 'rgba(218, 166, 63, 0.12)',
                padding: '3px 8px',
                borderRadius: '99px',
                border: '1px solid rgba(218, 166, 63, 0.2)'
              }}>
                Golden Pin Activated
              </span>
              <span style={{
                fontSize: '10px',
                fontWeight: 600,
                color: '#A7AFBC'
              }}>
                {activePin.window}
              </span>
            </div>

            {/* Address & Owner */}
            <div style={{ marginBottom: '8px' }}>
              <h4 style={{
                fontSize: '15px',
                fontWeight: 700,
                color: '#F7F4EC',
                marginBottom: '2px'
              }}>{activePin.address}</h4>
              <p style={{
                fontSize: '11px',
                color: '#A7AFBC'
              }}>Owner: {activePin.owner}</p>
            </div>

            {/* Divider */}
            <div style={{
              height: '1px',
              backgroundColor: 'rgba(255,255,255,0.08)',
              margin: '10px 0'
            }} />

            {/* Trigger Reason */}
            <div style={{ marginBottom: '14px' }}>
              <div style={{
                fontSize: '9px',
                textTransform: 'uppercase',
                fontWeight: 700,
                color: '#A7AFBC',
                letterSpacing: '0.05em',
                marginBottom: '4px'
              }}>AI Trigger Context</div>
              <p style={{
                fontSize: '12px',
                color: '#F7F4EC',
                lineHeight: 1.4
              }}>
                {activePin.reason}
              </p>
            </div>

            {/* Action CTA Button inside HUD */}
            <a
              href="tel:5550199"
              onClick={(e) => e.preventDefault()} // static mock
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%',
                backgroundColor: '#D8A63F',
                color: '#07090D',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 0',
                fontSize: '12px',
                fontWeight: 700,
                textAlign: 'center',
                cursor: 'pointer'
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-2.2 2.2a15.045 15.045 0 0 1-6.59-6.59l2.2-2.2c.28-.28.36-.67.25-1.02A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" />
              </svg>
              Tap to Call Owner
            </a>
          </div>

          {/* Tracking Target Count Overlay */}
          <div style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            backgroundColor: 'rgba(7, 9, 13, 0.85)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '99px',
            padding: '6px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            pointerEvents: 'none',
            zIndex: 10
          }}>
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#D8A63F',
              animation: 'blink 1.5s infinite'
            }} />
            <span style={{
              fontSize: '9px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: '#F7F4EC'
            }}>
              Tracking 1,000+ Targets
            </span>
          </div>

        </div>

        {/* Bottom Swipe bar */}
        <div style={{
          height: '24px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#07090D'
        }}>
          <div style={{
            width: '110px',
            height: '4px',
            borderRadius: '2px',
            backgroundColor: 'rgba(255,255,255,0.3)',
            marginBottom: '4px'
          }} />
        </div>

      </div>
    </div>
  );
}
