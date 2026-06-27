"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const LAUNCH_DATE = new Date("2026-09-01T00:00:00");

function useCountdown(target) {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    function calc() {
      const diff = Math.max(0, target - new Date());
      setT({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export default function Footer() {
  const { days, hours, minutes, seconds } = useCountdown(LAUNCH_DATE);
  const [email, setEmail] = useState("");
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

  return (
    <footer id="download" className="footer">
      {/* Coming Soon + Waitlist Banner */}
      <div className="download-cta-banner">
        {/* Content only — no right side stat cards */}
        <div className="cta-content">
          <div className="cs-badge">
            <span className="cs-badge-dot" />
            <span>Launching Soon</span>
          </div>
          <h2 className="cta-title">Your Health App Is Almost Here</h2>
          <p className="cta-description">
            We're putting the final touches on something incredible. Join the waitlist and be the first to experience instant doctor consultations, AI vitals tracking, and seamless prescription management.
          </p>

          {/* Countdown */}
          <div className="cd-row">
            {[{ v: days, l: "Days" }, { v: hours, l: "Hrs" }, { v: minutes, l: "Min" }, { v: seconds, l: "Sec" }].map(({ v, l }, i) => (
              <div key={l} className="cd-unit">
                <div className="cd-box">
                  <span className="cd-value">{String(v).padStart(2, "0")}</span>
                </div>
                <span className="cd-label">{l}</span>
                {i < 3 && <span className="cd-sep">:</span>}
              </div>
            ))}
          </div>

          {/* Email form */}
          {submitted ? (
            <div className="success-msg">
              <span className="success-icon">✓</span>
              <span>You're on the list! We'll notify you at launch.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="notify-form" noValidate>
              <div className="input-wrap">
                <input
                  id="waitlist-email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  className={`notify-input${error ? " input-error" : ""}`}
                />
                <button type="submit" className="notify-btn">Notify Me</button>
              </div>
              {error && <p className="error-text">{error}</p>}
              <p className="notify-hint">No spam, ever. Unsubscribe anytime.</p>
            </form>
          )}
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="footer-links-container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-clip">
                <img src="/logo.png" alt="Agad logo" className="footer-logo-img" />
              </div>
              <span className="logo-text">Agad</span>
            </div>
            <p className="brand-tagline">
              Your health, in your hands. Agad connects you to certified doctors, tracks your vitals, and keeps you on schedule — all from one clean app.
            </p>
          </div>

          {/* Site Sections */}
          <div className="footer-column">
            <h4>Application</h4>
            <a href="#features">Features</a>
            <a href="#showcase">Waitlist</a>
            <a href="#how-it-works">How It Works</a>
          </div>

          {/* Legal / Policy */}
          <div className="footer-column">
            <h4>Trust & Privacy</h4>
            <a href="#download">Security Compliance</a>
            <a href="#download">Privacy Policy</a>
            <a href="#download">Terms of Service</a>
          </div>

          {/* Contact */}
          <div className="footer-column">
            <h4>Contact Info</h4>
            <span className="contact-item"><Mail size={14} /> hello@agad.health</span>
            <span className="contact-item"><MapPin size={14} /> Bengaluru, India</span>
            <span className="contact-item"><Phone size={14} /> +91 98765 43210</span>
          </div>
        </div>

        {/* Bottom row copyrights */}
        <div className="footer-bottom">
          <p>© 2026 Agad Health. All rights reserved.</p>
          <div className="social-links">
            <a href="https://twitter.com/agadhealth" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://linkedin.com/company/agadhealth" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://instagram.com/agad.health" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          width: 100%;
          background: #071124;
          color: white;
          position: relative;
          z-index: 1;
        }

        /* Coming Soon Banner */
        .download-cta-banner {
          max-width: 1200px;
          margin: 0 auto;
          background: linear-gradient(135deg, #0c1e46 0%, #0a1a3a 60%, #071124 100%);
          border: 1px solid rgba(99, 102, 241, 0.18);
          border-radius: 32px;
          padding: 56px 60px;
          display: flex;
          align-items: center;
          transform: translateY(-50px);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(99,102,241,0.08) inset;
          position: relative;
          overflow: hidden;
        }

        .download-cta-banner::before {
          content: '';
          position: absolute;
          top: -80px; left: -80px;
          width: 400px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 70%);
          pointer-events: none;
        }

        .download-cta-banner::after {
          content: '';
          position: absolute;
          bottom: -60px; right: -60px;
          width: 350px; height: 350px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .cta-content {
          flex: 1;
          position: relative;
          z-index: 1;
          max-width: 640px;
        }

        /* Badge */
        .cs-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.25);
          border-radius: 999px;
          padding: 6px 16px;
          font-size: 0.8rem;
          font-weight: 700;
          color: #a5b4fc;
          letter-spacing: 0.03em;
          margin-bottom: 20px;
        }

        .cs-badge-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #6366f1;
          box-shadow: 0 0 8px rgba(99,102,241,0.8);
          animation: pulse-dot 1.5s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.7); }
        }

        .cta-title {
          font-size: 2.4rem;
          font-weight: 800;
          color: white;
          margin-bottom: 16px;
          line-height: 1.1;
          letter-spacing: -0.03em;
        }

        .cta-description {
          color: rgba(148, 163, 184, 1);
          font-size: 1.02rem;
          margin-bottom: 30px;
          max-width: 520px;
          line-height: 1.65;
        }

        /* Countdown */
        .cd-row {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }

        .cd-unit {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .cd-box {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(99,102,241,0.2);
          border-radius: 12px;
          width: 68px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }

        .cd-value {
          font-size: 1.8rem;
          font-weight: 800;
          color: white;
          letter-spacing: -0.04em;
          font-variant-numeric: tabular-nums;
        }

        .cd-label {
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #64748b;
          text-transform: uppercase;
          display: none;
        }

        .cd-sep {
          font-size: 1.5rem;
          font-weight: 800;
          color: rgba(99,102,241,0.5);
          margin: 0 2px;
          padding-bottom: 4px;
        }

        /* Notify form */
        .notify-form {
          display: flex;
          flex-direction: column;
          gap: 8px;
          max-width: 480px;
        }

        .input-wrap {
          display: flex;
          gap: 8px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(99,102,241,0.2);
          border-radius: 999px;
          padding: 6px 6px 6px 20px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .input-wrap:focus-within {
          border-color: rgba(99,102,241,0.5);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.08);
        }

        .notify-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: white;
          min-width: 0;
        }

        .notify-input::placeholder {
          color: #475569;
        }

        .notify-btn {
          background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
          color: white;
          border: none;
          border-radius: 999px;
          padding: 11px 24px;
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          font-family: var(--font-sans);
          transition: opacity 0.2s, transform 0.2s;
          flex-shrink: 0;
          letter-spacing: -0.01em;
        }

        .notify-btn:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }

        .error-text {
          font-size: 0.78rem;
          color: #f87171;
          padding-left: 20px;
          font-weight: 500;
        }

        .notify-hint {
          font-size: 0.75rem;
          color: #475569;
          padding-left: 20px;
          font-weight: 500;
          margin-top: 2px;
        }

        .success-msg {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(22,163,74,0.1);
          border: 1px solid rgba(22,163,74,0.25);
          border-radius: 999px;
          padding: 14px 22px;
          color: #4ade80;
          font-weight: 600;
          font-size: 0.9rem;
          max-width: 480px;
        }

        .success-icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #16a34a;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          flex-shrink: 0;
        }

        /* Footer Links */
        .footer-links-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 24px 60px;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          gap: 40px;
          padding-bottom: 60px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* Circular clip — removes the white square corners of the PNG on the dark footer */
        .footer-logo-clip {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
        }

        .footer-logo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.06);
        }

        .footer-logo .logo-text {
          font-size: 1.4rem;
          font-weight: 800;
          color: white;
        }

        .brand-tagline {
          color: #94a3b8;
          font-size: 0.92rem;
          line-height: 1.65;
          max-width: 300px;
        }

        .footer-column {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .footer-column h4 {
          color: white;
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 6px;
        }

        .footer-column a {
          color: #94a3b8;
          font-size: 0.9rem;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer-column a:hover {
          color: #a5b4fc;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #94a3b8;
          font-size: 0.9rem;
        }

        /* Bottom Row */
        .footer-bottom {
          padding-top: 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
          color: #64748b;
          font-size: 0.85rem;
        }

        .social-links {
          display: flex;
          gap: 24px;
        }

        .social-links a {
          color: #64748b;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .social-links a:hover {
          color: #a5b4fc;
        }

        @media (max-width: 992px) {
          .download-cta-banner {
            flex-direction: column;
            padding: 40px;
            align-items: stretch;
            transform: translateY(-30px);
            margin: 0 20px;
          }

          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 30px;
          }
        }

        @media (max-width: 576px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
          .download-cta-banner {
            padding: 32px 24px;
          }
          .cta-title {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </footer>
  );
}
