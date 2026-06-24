"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Features from "@/components/Features";
import InteractiveShowcase from "@/components/InteractiveShowcase";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import { ArrowRight, Heart, Shield, Star } from "lucide-react";

export default function Home() {
  const [visible, setVisible] = useState(false);

  // Trigger entrance animations after mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="home-wrapper">
      <Navbar />

      <main className="main-content">

        {/* ═══════════════════════════════════════════════════
            HERO — split layout, phone visible above the fold
        ═══════════════════════════════════════════════════ */}
        <section id="hero" className="hero-section">

          {/* Ambient gradient mesh — sits behind everything */}
          <div className="hero-mesh" aria-hidden="true">
            <div className="mesh-orb mesh-orb-1" />
            <div className="mesh-orb mesh-orb-2" />
            <div className="mesh-orb mesh-orb-3" />
          </div>

          {/* ── LEFT: copy ── */}
          <div className={`hero-copy ${visible ? "anim-in" : ""}`}>

            {/* App badge */}
            <div className="hero-badge" style={{ transitionDelay: "0ms" }}>
              <Star size={11} fill="#00e5ff" strokeWidth={0} />
              <span>Now on App Store &amp; Google Play</span>
            </div>

            <h1 className="hero-headline" style={{ transitionDelay: "80ms" }}>
              Your Health,<br />
              <span className="headline-stroke">Instantly.</span>
            </h1>

            <p className="hero-sub" style={{ transitionDelay: "160ms" }}>
              Consult certified doctors in minutes, track your vitals in
              real time, and manage prescriptions — all in one clean,
              secure app.
            </p>

            {/* CTAs */}
            <div className="hero-actions" style={{ transitionDelay: "240ms" }}>
              <a href="#download" className="cta-primary">
                Download Free <ArrowRight size={15} />
              </a>
              <a href="#features" className="cta-ghost">
                Explore Features
              </a>
            </div>

            {/* Trust stats */}
            <div className="hero-stats" style={{ transitionDelay: "320ms" }}>
              {[
                { val: "2 Min",  label: "Doctor Response" },
                { val: "4.9 ★", label: "App Store" },
                { val: "50K+",  label: "Patients" },
              ].map((s, i) => (
                <div className="stat-item" key={i}>
                  <strong>{s.val}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: phone + floating pills ── */}
          <div className={`hero-visual ${visible ? "anim-in" : ""}`}>

            {/* Soft glow blob behind phone */}
            <div className="phone-glow" aria-hidden="true" />

            {/* Floating pill — BP */}
            <div className={`float-pill pill-bp ${visible ? "pill-in" : ""}`}>
              <div className="pill-ico pill-ico-bp"><Shield size={13} /></div>
              <div>
                <span className="pill-label">Blood Pressure</span>
                <strong className="pill-val">
                  120/80
                  <span className="pill-badge">Normal</span>
                </strong>
              </div>
            </div>

            {/* The mockup */}
            <div className="phone-wrap">
              <img
                src="/hand-mockup.png"
                alt="Agad app on iPhone"
                className="phone-img"
              />
            </div>

            {/* Floating pill — Heart Rate */}
            <div className={`float-pill pill-hr ${visible ? "pill-in" : ""}`}>
              <div className="pill-ico pill-ico-hr"><Heart size={13} /></div>
              <div>
                <span className="pill-label">Heart Rate</span>
                <strong className="pill-val">
                  68 <span className="pill-unit">bpm</span>
                </strong>
              </div>
            </div>

            {/* Subtle ECG line decoration */}
            <div className="ecg-deco" aria-hidden="true">
              <svg viewBox="0 0 280 36" fill="none">
                <polyline
                  points="0,18 30,18 46,18 58,4 70,32 82,18 106,18 122,18 134,10 146,26 158,18 182,18 210,18 222,4 234,32 246,18 280,18"
                  stroke="url(#ecgG)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient id="ecgG" x1="0" y1="0" x2="280" y2="0">
                    <stop offset="0%" stopColor="#00e5ff" stopOpacity="0" />
                    <stop offset="30%" stopColor="#00e5ff" stopOpacity="0.7" />
                    <stop offset="70%" stopColor="#3a86ff" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#3a86ff" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Full-width wave anchored to bottom of hand */}
          <div className="hero-wave" aria-hidden="true" />

        </section>

        {/* FEATURES GRID */}
        <Features />

        {/* INTERACTIVE SHOWCASE */}
        <InteractiveShowcase />

        {/* HOW IT WORKS */}
        <HowItWorks />

      </main>

      <Footer />

      <style jsx>{`
        /* ══════════════════════════════════════════
           ROOT
        ══════════════════════════════════════════ */
        .home-wrapper {
          overflow-x: hidden;
          width: 100%;
          min-height: 100vh;
          background: #ffffff;
          font-family: 'Outfit', -apple-system, sans-serif;
        }
        .main-content { margin-top: 68px; }

        /* ══════════════════════════════════════════
           HERO SECTION
        ══════════════════════════════════════════ */
        .hero-section {
          position: relative;
          min-height: calc(100vh - 68px);
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 0;
          padding: 0 5vw;
          overflow: visible;
          background: #ffffff;
        }

        /* ── Ambient mesh ── */
        .hero-mesh {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }
        .mesh-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
        }
        .mesh-orb-1 {
          width: 600px; height: 600px;
          top: -120px; right: -60px;
          background: radial-gradient(circle,
            rgba(0,229,255,0.18) 0%,
            rgba(58,134,255,0.10) 50%,
            transparent 70%);
          animation: orbDrift 12s ease-in-out infinite alternate;
        }
        .mesh-orb-2 {
          width: 400px; height: 400px;
          bottom: 0; right: 20%;
          background: radial-gradient(circle,
            rgba(0,180,216,0.14) 0%,
            transparent 70%);
          animation: orbDrift 16s ease-in-out infinite alternate-reverse;
        }
        .mesh-orb-3 {
          width: 300px; height: 300px;
          top: 30%; left: -80px;
          background: radial-gradient(circle,
            rgba(0,229,255,0.07) 0%,
            transparent 70%);
          animation: orbDrift 10s ease-in-out infinite alternate;
        }
        @keyframes orbDrift {
          from { transform: translate(0px, 0px) scale(1); }
          to   { transform: translate(20px, 30px) scale(1.08); }
        }

        /* ══════════════════════════════════════════
           LEFT COPY
        ══════════════════════════════════════════ */
        .hero-copy {
          position: relative;
          z-index: 4;
          padding: 60px 0 60px 2vw;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0;
        }

        /* Staggered entrance — each child uses transition-delay via inline style */
        .hero-copy > * {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.75s cubic-bezier(0.16,1,0.3,1),
                      transform 0.75s cubic-bezier(0.16,1,0.3,1);
        }
        .hero-copy.anim-in > *:nth-child(1) { opacity:1; transform:none; transition-delay:0ms; }
        .hero-copy.anim-in > *:nth-child(2) { opacity:1; transform:none; transition-delay:80ms; }
        .hero-copy.anim-in > *:nth-child(3) { opacity:1; transform:none; transition-delay:160ms; }
        .hero-copy.anim-in > *:nth-child(4) { opacity:1; transform:none; transition-delay:240ms; }
        .hero-copy.anim-in > *:nth-child(5) { opacity:1; transform:none; transition-delay:320ms; }

        /* Badge */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 6px 16px;
          border-radius: 999px;
          background: rgba(0,229,255,0.07);
          border: 1px solid rgba(0,229,255,0.25);
          font-size: 0.78rem;
          font-weight: 600;
          color: #0d1e3d;
          margin-bottom: 24px;
          letter-spacing: 0.01em;
        }

        /* Headline */
        .hero-headline {
          font-size: clamp(2.8rem, 5.2vw, 5rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.04em;
          color: #0d1e3d;
          margin-bottom: 20px;
        }
        .headline-stroke {
          font-style: italic;
          color: transparent;
          -webkit-text-stroke: 2.5px #0d1e3d;
        }

        /* Subtitle */
        .hero-sub {
          font-size: 1.05rem;
          color: #4a5568;
          line-height: 1.72;
          max-width: 440px;
          margin-bottom: 36px;
        }

        /* CTAs */
        .hero-actions {
          display: flex;
          gap: 14px;
          margin-bottom: 48px;
          flex-wrap: wrap;
        }
        .cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 28px;
          border-radius: 999px;
          background: #0d1e3d;
          color: #ffffff;
          font-size: 0.92rem;
          font-weight: 600;
          text-decoration: none;
          letter-spacing: -0.01em;
          position: relative;
          overflow: hidden;
          transition: transform 0.22s ease, box-shadow 0.22s ease;
          box-shadow: 0 4px 20px rgba(13,30,61,0.18);
        }
        .cta-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0,229,255,0.18) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(13,30,61,0.25);
        }
        .cta-primary:hover::after { opacity: 1; }

        .cta-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 26px;
          border-radius: 999px;
          border: 1.5px solid rgba(13,30,61,0.18);
          color: #0d1e3d;
          font-size: 0.92rem;
          font-weight: 600;
          text-decoration: none;
          transition: border-color 0.22s ease, transform 0.22s ease;
        }
        .cta-ghost:hover {
          border-color: #0d1e3d;
          transform: translateY(-2px);
        }

        /* Stats row */
        .hero-stats {
          display: flex;
          align-items: center;
          gap: 32px;
          padding-top: 28px;
          border-top: 1px solid rgba(203,213,225,0.6);
        }
        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .stat-item strong {
          font-size: 1.25rem;
          font-weight: 800;
          color: #0d1e3d;
          letter-spacing: -0.03em;
          line-height: 1;
        }
        .stat-item span {
          font-size: 0.75rem;
          color: #718096;
          font-weight: 500;
        }

        /* ══════════════════════════════════════════
           RIGHT VISUAL
        ══════════════════════════════════════════ */
        .hero-visual {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px 0;
          min-height: calc(100vh - 68px);
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s,
                      transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s;
        }
        .hero-visual.anim-in {
          opacity: 1;
          transform: none;
        }

        /* Glow orb behind phone */
        .phone-glow {
          position: absolute;
          width: 520px;
          height: 520px;
          border-radius: 50%;
          background: radial-gradient(circle,
            rgba(0,229,255,0.22) 0%,
            rgba(58,134,255,0.14) 40%,
            transparent 70%);
          filter: blur(50px);
          pointer-events: none;
          z-index: 0;
          animation: glowPulse 5s ease-in-out infinite alternate;
        }
        @keyframes glowPulse {
          from { transform: scale(1); opacity: 0.9; }
          to   { transform: scale(1.07); opacity: 1; }
        }

        /* Phone image */
        .phone-wrap {
          position: relative;
          z-index: 2;
          width: 420px;
          max-width: 48vw;
          animation: phoneBob 7s ease-in-out infinite;
        }
        @keyframes phoneBob {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-14px) rotate(0.4deg); }
        }
        .phone-img {
          width: 100%;
          height: auto;
          display: block;
          filter: drop-shadow(0 24px 48px rgba(13,30,61,0.12));
        }
        /* ── Full-width horizontal gradient wave at bottom of hero ── */
        .hero-wave {
          position: absolute;
          bottom: 0;
          left: calc(50% - 50vw);
          width: 100vw;
          height: 410px;
          pointer-events: none;
          z-index: 3;
          background:
            radial-gradient(ellipse 60% 80% at 20% 45%,
              rgba(0, 229, 255, 0.18) 0%,
              transparent 65%),
            radial-gradient(ellipse 50% 70% at 60% 45%,
              rgba(58, 134, 255, 0.11) 0%,
              transparent 65%),
            radial-gradient(ellipse 40% 60% at 90% 45%,
              rgba(0, 200, 245, 0.14) 0%,
              transparent 65%),
            linear-gradient(
              to top,
              transparent 0%,
              rgba(200, 240, 255, 0.44) 15%,
              rgba(200, 240, 255, 0.44) 55%,
              rgba(160, 220, 255, 0.18) 75%,
              transparent 100%
            );
          mask-image: linear-gradient(to right, transparent, black 15%, black 100%);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 100%);
          animation: wavePulse 5s ease-in-out infinite alternate;
        }
        @keyframes wavePulse {
          from { opacity: 0.85; transform: scaleY(1); }
          to   { opacity: 1.00; transform: scaleY(1.06); }
        }

        /* Floating pills */
        .float-pill {
          position: absolute;
          z-index: 6;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(255,255,255,0.98);
          border-radius: 16px;
          padding: 11px 15px;
          display: flex;
          align-items: center;
          gap: 11px;
          box-shadow:
            0 8px 32px rgba(13,30,61,0.09),
            0 2px 8px rgba(13,30,61,0.05);
          opacity: 0;
          transform: scale(0.88) translateY(8px);
          transition: opacity 0.55s cubic-bezier(0.16,1,0.3,1),
                      transform 0.55s cubic-bezier(0.16,1,0.3,1);
        }
        .pill-in {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
        .pill-bp {
          top: 20%;
          left: -8px;
          transition-delay: 0.55s;
          animation: floatA 6s ease-in-out 0.55s infinite;
        }
        .pill-hr {
          bottom: 26%;
          right: -8px;
          transition-delay: 0.70s;
          animation: floatB 6s ease-in-out 0.70s infinite;
        }
        @keyframes floatA {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-9px); }
        }
        @keyframes floatB {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-7px); }
        }
        .pill-ico {
          width: 30px; height: 30px;
          border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .pill-ico-bp { background: #dbeafe; color: #3a86ff; }
        .pill-ico-hr { background: #ffe4e6; color: #f43f5e; }
        .pill-label {
          display: block;
          font-size: 0.6rem;
          font-weight: 600;
          color: #718096;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 2px;
        }
        .pill-val {
          font-size: 0.92rem;
          font-weight: 800;
          color: #0d1e3d;
          letter-spacing: -0.02em;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .pill-unit {
          font-size: 0.65rem;
          font-weight: 500;
          color: #718096;
        }
        .pill-badge {
          font-size: 0.58rem;
          font-weight: 700;
          background: #dcfce7;
          color: #16a34a;
          padding: 2px 7px;
          border-radius: 99px;
        }

        /* ECG decoration under phone */
        .ecg-deco {
          position: absolute;
          bottom: 18%;
          left: 50%;
          transform: translateX(-50%);
          width: 260px;
          z-index: 3;
          opacity: 0.65;
          animation: ecgFade 3s ease-in-out infinite alternate;
        }
        @keyframes ecgFade {
          from { opacity: 0.45; }
          to   { opacity: 0.80; }
        }

        /* ══════════════════════════════════════════
           RESPONSIVE
        ══════════════════════════════════════════ */
        @media (max-width: 960px) {
          .hero-section {
            grid-template-columns: 1fr;
            min-height: auto;
            padding: 60px 6vw 48px;
            text-align: center;
          }
          .hero-copy {
            align-items: center;
            padding: 0;
            order: 1;
          }
          .hero-visual {
            order: 2;
            min-height: auto;
            padding: 0;
            margin-top: 32px;
          }
          .phone-wrap { max-width: 68vw; width: 300px; }
          .pill-bp { left: 0; top: 15%; }
          .pill-hr { right: 0; bottom: 20%; }
          .hero-stats { justify-content: center; }
          .hero-sub { text-align: center; }
          .hero-actions { justify-content: center; }
        }

        @media (max-width: 540px) {
          .float-pill { display: none; }
          .phone-wrap { width: 260px; }
          .hero-badge { font-size: 0.72rem; }
          .hero-stats { gap: 20px; }
        }
      `}</style>
    </div>
  );
}
