"use client";

import { useState } from "react";
import { Send, CheckCircle, Smartphone, ArrowRight, Users, Bell, Zap } from "lucide-react";

// Inline social SVGs (not in this version of lucide-react)
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.264 5.632 5.9-5.632Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function InteractiveShowcase() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  const socials = [
    {
      name: "Twitter / X",
      handle: "@agadhealth",
      icon: <TwitterIcon />,
      color: "#1DA1F2",
      bg: "rgba(29,161,242,0.1)",
      border: "rgba(29,161,242,0.25)",
      href: "https://twitter.com/agadhealth",
    },
    {
      name: "Instagram",
      handle: "@agad.health",
      icon: <InstagramIcon />,
      color: "#E1306C",
      bg: "rgba(225,48,108,0.1)",
      border: "rgba(225,48,108,0.25)",
      href: "https://instagram.com/agad.health",
    },
    {
      name: "LinkedIn",
      handle: "Agad Health",
      icon: <LinkedinIcon />,
      color: "#0A66C2",
      bg: "rgba(10,102,194,0.1)",
      border: "rgba(10,102,194,0.25)",
      href: "https://linkedin.com/company/agadhealth",
    },
  ];

  const perks = [
    { icon: <Zap size={16} />, text: "Early access before public launch" },
    { icon: <Bell size={16} />, text: "Priority onboarding & setup" },
    { icon: <Users size={16} />, text: "Exclusive beta community access" },
  ];

  return (
    <section id="showcase" className="waitlist-section">

      {/* Background blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <div className="wl-inner">

        {/* ── LEFT: Form ── */}
        <div className="wl-left">
          <span className="section-eyebrow">Join the Movement</span>
          <h2 className="wl-headline">
            Be First to Experience <span className="wl-brand">Agad</span>
          </h2>
          <p className="wl-sub">
            We're launching soon. Get on the waitlist for exclusive early access,
            priority onboarding, and a behind-the-scenes look at the future of healthcare.
          </p>

          {/* Perks */}
          <ul className="perks-list">
            {perks.map((p, i) => (
              <li key={i} className="perk-item">
                <span className="perk-icon">{p.icon}</span>
                <span>{p.text}</span>
              </li>
            ))}
          </ul>

          {/* Form */}
          {submitted ? (
            <div className="success-card">
              <CheckCircle size={32} className="success-icon-svg" />
              <div>
                <strong>You're on the list! 🎉</strong>
                <p>We'll reach out at launch with your early access link.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="wl-form" noValidate>
              <div className="input-row">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="wl-input"
                    id="waitlist-name"
                  />
                </div>
                <div className="input-group">
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    className={`wl-input${error ? " input-error" : ""}`}
                    id="waitlist-email-showcase"
                  />
                  {error && <p className="error-text">{error}</p>}
                </div>
              </div>
              <button type="submit" className="wl-btn">
                <Send size={16} />
                Join the Waitlist
              </button>
              <p className="form-hint">No spam. Unsubscribe anytime. 100% free.</p>
            </form>
          )}
        </div>

        {/* ── RIGHT: Socials + App Badges ── */}
        <div className="wl-right">

          {/* Social cards */}
          <div className="socials-group">
            <span className="socials-label">Follow Our Journey</span>
            <div className="socials-list">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-card"
                  style={{
                    "--sc": s.color,
                    "--sbg": s.bg,
                    "--sborder": s.border,
                  }}
                >
                  <span className="social-icon-wrap">{s.icon}</span>
                  <div className="social-info">
                    <strong>{s.name}</strong>
                    <span>{s.handle}</span>
                  </div>
                  <ArrowRight size={15} className="social-arrow" />
                </a>
              ))}
            </div>
          </div>

          {/* App store badges */}
          <div className="stores-group">
            <span className="socials-label">Available Soon</span>
            <div className="store-badges">
              <div className="store-badge">
                <div className="store-badge-icon">
                  <Smartphone size={22} />
                </div>
                <div>
                  <span className="store-badge-sub">Download on the</span>
                  <strong>App Store</strong>
                </div>
                <span className="coming-soon-chip">Soon</span>
              </div>
              <div className="store-badge">
                <div className="store-badge-icon store-badge-icon--android">
                  <Smartphone size={22} />
                </div>
                <div>
                  <span className="store-badge-sub">Get it on</span>
                  <strong>Google Play</strong>
                </div>
                <span className="coming-soon-chip">Soon</span>
              </div>
            </div>
          </div>

          {/* Counter card */}
          <div className="counter-card">
            <div className="counter-live-dot" />
            <span className="counter-num">1,200+</span>
            <span className="counter-label">people already on the waitlist</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* ── Section shell ── */
        .waitlist-section {
          width: 100%;
          position: relative;
          overflow: hidden;
          padding-top: 120px;
          padding-bottom: 120px;
          background: transparent;
        }

        /* Blobs */
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }
        .blob-1 {
          width: 500px; height: 500px;
          top: -100px; left: -80px;
          background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%);
        }
        .blob-2 {
          width: 400px; height: 400px;
          bottom: -100px; right: -80px;
          background: radial-gradient(circle, rgba(0,229,255,0.10) 0%, transparent 70%);
        }
        .blob-3 {
          width: 300px; height: 300px;
          top: 40%; right: 30%;
          background: radial-gradient(circle, rgba(79,70,229,0.07) 0%, transparent 70%);
        }

        /* Inner layout */
        .wl-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 28px;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 80px;
          align-items: start;
          position: relative;
          z-index: 1;
        }

        /* ── LEFT ── */
        .section-eyebrow {
          display: inline-block;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #6366f1;
          margin-bottom: 18px;
        }

        .wl-headline {
          font-size: clamp(2.2rem, 3.8vw, 3.2rem);
          font-weight: 800;
          color: #0d1e3d;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin-bottom: 20px;
        }

        .wl-brand {
          background: linear-gradient(135deg, #6366f1 0%, #3a86ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .wl-sub {
          font-size: 1.05rem;
          color: #4a5568;
          line-height: 1.7;
          max-width: 500px;
          margin-bottom: 32px;
        }

        /* Perks */
        .perks-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 36px;
        }

        .perk-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.95rem;
          color: #334155;
          font-weight: 500;
        }

        .perk-icon {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          background: linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(99,102,241,0.06) 100%);
          color: #6366f1;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* Form */
        .wl-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-width: 520px;
        }

        .input-row {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .input-group {
          position: relative;
        }

        .wl-input {
          width: 100%;
          padding: 14px 18px;
          border-radius: 14px;
          border: 1.5px solid rgba(203,213,225,0.8);
          background: rgba(255,255,255,0.9);
          font-family: var(--font-sans);
          font-size: 0.95rem;
          color: #0d1e3d;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          backdrop-filter: blur(8px);
        }

        .wl-input::placeholder {
          color: #94a3b8;
        }

        .wl-input:focus {
          border-color: rgba(99,102,241,0.5);
          box-shadow: 0 0 0 4px rgba(99,102,241,0.08);
        }

        .wl-input.input-error {
          border-color: rgba(239,68,68,0.5);
        }

        .error-text {
          font-size: 0.78rem;
          color: #ef4444;
          padding-left: 4px;
          margin-top: 4px;
          font-weight: 500;
        }

        .wl-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 15px 28px;
          border-radius: 14px;
          background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
          color: white;
          font-size: 0.96rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          font-family: var(--font-sans);
          transition: transform 0.22s ease, box-shadow 0.22s ease;
          box-shadow: 0 6px 24px rgba(99,102,241,0.3);
          letter-spacing: -0.01em;
        }

        .wl-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(99,102,241,0.42);
        }

        .form-hint {
          font-size: 0.78rem;
          color: #94a3b8;
          font-weight: 500;
          padding-left: 2px;
        }

        /* Success */
        .success-card {
          display: flex;
          align-items: center;
          gap: 18px;
          background: rgba(22,163,74,0.06);
          border: 1.5px solid rgba(22,163,74,0.2);
          border-radius: 18px;
          padding: 24px 28px;
          max-width: 520px;
        }

        .success-icon-svg {
          color: #16a34a;
          flex-shrink: 0;
        }

        .success-card strong {
          display: block;
          font-size: 1.05rem;
          font-weight: 700;
          color: #0d1e3d;
          margin-bottom: 4px;
        }

        .success-card p {
          font-size: 0.9rem;
          color: #4a5568;
          line-height: 1.5;
          margin: 0;
        }

        /* ── RIGHT ── */
        .wl-right {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .socials-label {
          display: block;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #94a3b8;
          margin-bottom: 14px;
        }

        /* Social cards */
        .socials-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .social-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 18px;
          border-radius: 16px;
          border: 1.5px solid var(--sborder);
          background: var(--sbg);
          text-decoration: none;
          transition: transform 0.22s ease, box-shadow 0.22s ease, background 0.22s ease;
          backdrop-filter: blur(12px);
        }

        .social-card:hover {
          transform: translateX(4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
          background: rgba(255,255,255,0.7);
        }

        .social-icon-wrap {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: var(--sbg);
          color: var(--sc);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1.5px solid var(--sborder);
          flex-shrink: 0;
          transition: transform 0.2s ease;
        }

        .social-card:hover .social-icon-wrap {
          transform: scale(1.08);
        }

        .social-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .social-info strong {
          font-size: 0.92rem;
          font-weight: 700;
          color: #0d1e3d;
        }

        .social-info span {
          font-size: 0.78rem;
          color: #94a3b8;
          font-weight: 500;
        }

        .social-arrow {
          color: #cbd5e1;
          transition: color 0.2s, transform 0.2s;
        }

        .social-card:hover .social-arrow {
          color: var(--sc);
          transform: translateX(3px);
        }

        /* Store badges */
        .store-badges {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .store-badge {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 18px;
          border-radius: 16px;
          background: rgba(255,255,255,0.9);
          border: 1.5px solid rgba(203,213,225,0.7);
          backdrop-filter: blur(12px);
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }

        .store-badge:hover {
          transform: translateX(4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
        }

        .store-badge-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: #0d1e3d;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .store-badge-icon--android {
          background: linear-gradient(135deg, #3ddc84 0%, #1db954 100%);
        }

        .store-badge div {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .store-badge-sub {
          font-size: 0.72rem;
          color: #94a3b8;
          font-weight: 500;
        }

        .store-badge strong {
          font-size: 0.92rem;
          font-weight: 700;
          color: #0d1e3d;
        }

        .coming-soon-chip {
          font-size: 0.68rem;
          font-weight: 700;
          background: rgba(99,102,241,0.1);
          color: #6366f1;
          border: 1px solid rgba(99,102,241,0.2);
          padding: 4px 10px;
          border-radius: 99px;
          white-space: nowrap;
          letter-spacing: 0.02em;
        }

        /* Counter */
        .counter-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 18px 22px;
          border-radius: 18px;
          background: linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(58,134,255,0.04) 100%);
          border: 1.5px solid rgba(99,102,241,0.15);
          backdrop-filter: blur(12px);
        }

        .counter-live-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 0 3px rgba(34,197,94,0.25);
          flex-shrink: 0;
          animation: livePulse 2s ease-in-out infinite;
        }

        @keyframes livePulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(34,197,94,0.25); }
          50% { box-shadow: 0 0 0 6px rgba(34,197,94,0.1); }
        }

        .counter-num {
          font-size: 1.4rem;
          font-weight: 800;
          color: #0d1e3d;
          letter-spacing: -0.03em;
        }

        .counter-label {
          font-size: 0.85rem;
          color: #64748b;
          font-weight: 500;
        }

        /* Responsive */
        @media (max-width: 992px) {
          .wl-inner {
            grid-template-columns: 1fr;
            gap: 52px;
          }
        }

        @media (max-width: 640px) {
          .waitlist-section {
            padding-top: 80px;
            padding-bottom: 80px;
          }
          .wl-headline {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
}
