"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Features from "@/components/Features";
import InteractiveShowcase from "@/components/InteractiveShowcase";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import { ArrowRight, Heart, Shield, Activity, Zap } from "lucide-react";

export default function Home() {
  const [visible, setVisible] = useState(false);
  const phoneRef = useRef(null);

  // Trigger entrance animations after mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  // 3D parallax tilt on phone container
  useEffect(() => {
    const phoneEl = phoneRef.current;
    if (!phoneEl) return;

    const handleMove = (e) => {
      const rect = phoneEl.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      phoneEl.style.transform = `perspective(900px) rotateY(${dx * 8}deg) rotateX(${-dy * 6}deg) translateY(0px)`;
    };

    const handleLeave = () => {
      phoneEl.style.transform = "";
      phoneEl.style.transition = "transform 0.6s cubic-bezier(0.16,1,0.3,1)";
      setTimeout(() => {
        if (phoneEl) phoneEl.style.transition = "";
      }, 600);
    };

    const section = phoneEl.closest(".hero-section");
    section?.addEventListener("mousemove", handleMove);
    section?.addEventListener("mouseleave", handleLeave);

    return () => {
      section?.removeEventListener("mousemove", handleMove);
      section?.removeEventListener("mouseleave", handleLeave);
    };
  }, [visible]);

  return (
    <div className="home-wrapper">
      <Navbar />

      <main className="main-content">

        {/* ═══════════════════════════════════════════════════
            HERO — centered layout with phone in center
        ═══════════════════════════════════════════════════ */}
        <section id="hero" className="hero-section">

          {/* Full-viewport consistent gradient background */}
          <div className="hero-bg" aria-hidden="true">
            <div className="bg-orb bg-orb-1" />
            <div className="bg-orb bg-orb-2" />
            <div className="bg-orb bg-orb-3" />
            <div className="bg-grid" />
          </div>

          {/* ── LEFT: copy ── */}
          <div className={`hero-copy ${visible ? "anim-in" : ""}`}>

            <h1 className="hero-headline" style={{ transitionDelay: "0ms" }}>
              Your Doctor,<br />
              <span className="headline-gradient">On Demand.</span>
            </h1>

            <p className="hero-sub" style={{ transitionDelay: "100ms" }}>
              Consult certified specialists in under 2 minutes, track your vitals
              in real time, and manage your health — all in one beautifully simple app.
            </p>

            {/* CTAs */}
            <div className="hero-actions" style={{ transitionDelay: "200ms" }}>
              <a href="#showcase" className="cta-primary">
                <Zap size={15} fill="currentColor" strokeWidth={0} />
                Join Waitlist
              </a>
              <a href="#features" className="cta-ghost">
                Explore Features <ArrowRight size={14} />
              </a>
            </div>

            {/* Trust stats */}
            <div className="hero-stats" style={{ transitionDelay: "300ms" }}>
              {[
                { val: "< 2 Min", label: "Doctor Response" },
                { val: "5 ★",     label: "Beta Rating" },
                { val: "1,200+",  label: "On Waitlist" },
              ].map((s, i) => (
                <div className="stat-item" key={i}>
                  <strong>{s.val}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: phone + 3 floating pills ── */}
          <div className={`hero-visual ${visible ? "anim-in" : ""}`}>

            {/* Glow orb behind phone */}
            <div className="phone-glow" aria-hidden="true" />

            {/* Floating pill — Blood Pressure (top-left) */}
            <div className={`float-pill pill-bp ${visible ? "pill-in" : ""}`}>
              <div className="pill-ico pill-ico-bp"><Shield size={13} /></div>
              <div>
                <span className="pill-label">Blood Pressure</span>
                <strong className="pill-val">
                  120/80
                  <span className="pill-badge pill-badge-green">Normal</span>
                </strong>
              </div>
            </div>

            {/* Floating pill — SpO2 (top-right) */}
            <div className={`float-pill pill-spo2 ${visible ? "pill-in" : ""}`}>
              <div className="pill-ico pill-ico-spo2"><Activity size={13} /></div>
              <div>
                <span className="pill-label">SpO₂ Level</span>
                <strong className="pill-val">
                  98%
                  <span className="pill-badge pill-badge-blue">Optimal</span>
                </strong>
              </div>
            </div>

            {/* The phone mockup with 3D tilt */}
            <div className="phone-wrap" ref={phoneRef}>
              <div className="phone-fade-wrap">
                <img
                  src="/hand-mockup.png"
                  alt="Agad app on iPhone"
                  className="phone-img"
                />
                {/* Bottom fade overlay */}
                <div className="phone-fade-bottom" aria-hidden="true" />
              </div>
            </div>

            {/* Floating pill — Heart Rate (bottom-right) */}
            <div className={`float-pill pill-hr ${visible ? "pill-in" : ""}`}>
              <div className="pill-ico pill-ico-hr"><Heart size={13} /></div>
              <div>
                <span className="pill-label">Heart Rate</span>
                <strong className="pill-val">
                  68 <span className="pill-unit">bpm</span>
                </strong>
              </div>
            </div>

            {/* ECG decoration */}
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
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
                    <stop offset="30%" stopColor="#6366f1" stopOpacity="0.7" />
                    <stop offset="70%" stopColor="#3a86ff" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#3a86ff" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

        </section>

        {/* FEATURES GRID */}
        <Features />

        {/* WAITLIST + SOCIALS (was Interactive Showcase) */}
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
          font-family: 'Outfit', -apple-system, sans-serif;
          /* Match hero background so no white strip shows before JS loads */
          background: #eef2ff;
        }
        /* Remove top margin — hero section uses padding-top instead so
           the background covers all the way to the top edge */
        .main-content { margin-top: 0; }

        /* ══════════════════════════════════════════
           HERO SECTION
        ══════════════════════════════════════════ */
        .hero-section {
          position: relative;
          /* Extend full viewport height including navbar area */
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 0;
          /* Top padding pushes content below the fixed navbar */
          padding: 72px 5vw 0;
          overflow: hidden;
          /* Override global section max-width/margin so background fills full viewport */
          max-width: 100% !important;
          margin: 0 !important;
          /* Solid base so body/globals don't bleed through */
          background: #eef2ff;
        }

        /* ── Full-viewport gradient background ── */
        .hero-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          /* Radial from center-right so it's perfectly even left-to-right */
          background:
            radial-gradient(ellipse 120% 100% at 70% 40%,
              rgba(99,102,241,0.13) 0%,
              rgba(79,70,229,0.06) 40%,
              transparent 70%
            ),
            radial-gradient(ellipse 80% 80% at 10% 80%,
              rgba(58,134,255,0.08) 0%,
              transparent 60%
            ),
            linear-gradient(180deg, #edf0ff 0%, #eef2ff 40%, #e8f0ff 100%);
          overflow: hidden;
        }

        .bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
        }

        .bg-orb-1 {
          width: 700px; height: 700px;
          top: -200px; right: -100px;
          background: radial-gradient(circle,
            rgba(99,102,241,0.18) 0%,
            rgba(79,70,229,0.08) 50%,
            transparent 70%
          );
          animation: orbDrift 14s ease-in-out infinite alternate;
        }

        .bg-orb-2 {
          width: 500px; height: 500px;
          bottom: -100px; left: -80px;
          background: radial-gradient(circle,
            rgba(58,134,255,0.12) 0%,
            transparent 70%
          );
          animation: orbDrift 18s ease-in-out infinite alternate-reverse;
        }

        .bg-orb-3 {
          width: 350px; height: 350px;
          top: 40%; left: 40%;
          background: radial-gradient(circle,
            rgba(0,180,216,0.08) 0%,
            transparent 70%
          );
          animation: orbDrift 11s ease-in-out infinite alternate;
        }

        @keyframes orbDrift {
          from { transform: translate(0px, 0px) scale(1); }
          to   { transform: translate(24px, 32px) scale(1.10); }
        }

        /* Subtle dot grid */
        .bg-grid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(99,102,241,0.06) 1px, transparent 1px);
          background-size: 40px 40px;
          opacity: 0.7;
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

        .hero-copy > * {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1),
                      transform 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .hero-copy.anim-in > *:nth-child(1) { opacity:1; transform:none; transition-delay:0ms; }
        .hero-copy.anim-in > *:nth-child(2) { opacity:1; transform:none; transition-delay:100ms; }
        .hero-copy.anim-in > *:nth-child(3) { opacity:1; transform:none; transition-delay:200ms; }
        .hero-copy.anim-in > *:nth-child(4) { opacity:1; transform:none; transition-delay:300ms; }

        /* Headline */
        .hero-headline {
          font-size: clamp(3rem, 5.5vw, 5.2rem);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -0.045em;
          color: #0d1e3d;
          margin-bottom: 22px;
        }

        .headline-gradient {
          background: linear-gradient(135deg, #6366f1 0%, #3a86ff 50%, #00b4d8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: inline-block;
        }

        /* Subtitle */
        .hero-sub {
          font-size: 1.08rem;
          color: #4a5568;
          line-height: 1.75;
          max-width: 440px;
          margin-bottom: 38px;
        }

        /* CTAs */
        .hero-actions {
          display: flex;
          gap: 14px;
          margin-bottom: 52px;
          flex-wrap: wrap;
        }

        .cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 14px 30px;
          border-radius: 999px;
          background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
          color: #ffffff;
          font-size: 0.94rem;
          font-weight: 700;
          text-decoration: none;
          letter-spacing: -0.01em;
          position: relative;
          overflow: hidden;
          transition: transform 0.22s ease, box-shadow 0.22s ease;
          box-shadow: 0 6px 24px rgba(99,102,241,0.35);
        }

        .cta-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .cta-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 36px rgba(99,102,241,0.45);
        }

        .cta-primary:hover::after { opacity: 1; }

        .cta-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 26px;
          border-radius: 999px;
          border: 1.5px solid rgba(13,30,61,0.15);
          color: #0d1e3d;
          font-size: 0.94rem;
          font-weight: 600;
          text-decoration: none;
          transition: border-color 0.22s ease, transform 0.22s ease, background 0.22s ease;
          background: rgba(255,255,255,0.6);
          backdrop-filter: blur(8px);
        }

        .cta-ghost:hover {
          border-color: rgba(99,102,241,0.4);
          background: rgba(255,255,255,0.9);
          transform: translateY(-3px);
          color: #6366f1;
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
          font-size: 1.22rem;
          font-weight: 800;
          color: #0d1e3d;
          letter-spacing: -0.03em;
          line-height: 1;
        }

        .stat-item span {
          font-size: 0.72rem;
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
          min-height: calc(100vh - 72px);
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
          width: 480px;
          height: 480px;
          border-radius: 50%;
          background: radial-gradient(circle,
            rgba(99,102,241,0.2) 0%,
            rgba(58,134,255,0.12) 40%,
            transparent 70%
          );
          filter: blur(60px);
          pointer-events: none;
          z-index: 0;
          animation: glowPulse 5s ease-in-out infinite alternate;
        }

        @keyframes glowPulse {
          from { transform: scale(1); opacity: 0.85; }
          to   { transform: scale(1.1); opacity: 1; }
        }

        /* Phone wrap — 3D tilt container */
        .phone-wrap {
          position: relative;
          z-index: 2;
          width: 400px;
          max-width: 46vw;
          transform-style: preserve-3d;
          transition: transform 0.12s ease;
          will-change: transform;
        }

        /* Fade wrap — contains image and bottom fade */
        .phone-fade-wrap {
          position: relative;
          width: 100%;
          -webkit-mask-image: linear-gradient(to bottom,
            rgba(0,0,0,1) 0%,
            rgba(0,0,0,1) 50%,
            rgba(0,0,0,0) 80%,
            rgba(0,0,0,0) 100%
          );
          mask-image: linear-gradient(to bottom,
            rgba(0,0,0,1) 0%,
            rgba(0,0,0,1) 50%,
            rgba(0,0,0,0) 80%,
            rgba(0,0,0,0) 100%
          );
        }

        .phone-img {
          width: 100%;
          height: auto;
          display: block;
        }

        /* Remove the now-unneeded overlay div */
        .phone-fade-bottom {
          display: none;
        }

        /* Floating pills */
        .float-pill {
          position: absolute;
          z-index: 6;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,1);
          border-radius: 18px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow:
            0 8px 32px rgba(13,30,61,0.08),
            0 2px 8px rgba(13,30,61,0.04),
            0 0 0 1px rgba(203,213,225,0.4);
          opacity: 0;
          transform: scale(0.88) translateY(10px);
          transition: opacity 0.55s cubic-bezier(0.16,1,0.3,1),
                      transform 0.55s cubic-bezier(0.16,1,0.3,1);
        }

        .pill-in {
          opacity: 1;
          transform: scale(1) translateY(0);
        }

        /* Blood Pressure — top left */
        .pill-bp {
          top: 18%;
          left: -20px;
          transition-delay: 0.50s;
          animation: floatA 6.5s ease-in-out 0.5s infinite;
        }

        /* SpO2 — top right */
        .pill-spo2 {
          top: 12%;
          right: -16px;
          transition-delay: 0.65s;
          animation: floatC 7s ease-in-out 0.65s infinite;
        }

        /* Heart Rate — bottom right */
        .pill-hr {
          bottom: 22%;
          right: -20px;
          transition-delay: 0.80s;
          animation: floatB 6s ease-in-out 0.80s infinite;
        }

        @keyframes floatA {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          50%      { transform: translateY(-10px) rotate(0.5deg); }
        }
        @keyframes floatB {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          50%      { transform: translateY(-8px) rotate(-0.4deg); }
        }
        @keyframes floatC {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          33%      { transform: translateY(-6px) rotate(0.3deg); }
          66%      { transform: translateY(-12px) rotate(-0.3deg); }
        }

        .pill-ico {
          width: 32px; height: 32px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .pill-ico-bp  { background: #ede9fe; color: #7c3aed; }
        .pill-ico-hr  { background: #ffe4e6; color: #f43f5e; }
        .pill-ico-spo2 { background: #dbeafe; color: #3a86ff; }

        .pill-label {
          display: block;
          font-size: 0.58rem;
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
          gap: 6px;
        }

        .pill-unit {
          font-size: 0.65rem;
          font-weight: 500;
          color: #718096;
        }

        .pill-badge {
          font-size: 0.56rem;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 99px;
        }

        .pill-badge-green {
          background: #dcfce7;
          color: #16a34a;
        }

        .pill-badge-blue {
          background: #dbeafe;
          color: #1d4ed8;
        }

        /* ECG decoration */
        .ecg-deco {
          position: absolute;
          bottom: 14%;
          left: 50%;
          transform: translateX(-50%);
          width: 260px;
          z-index: 3;
          opacity: 0.7;
          animation: ecgFade 3s ease-in-out infinite alternate;
        }

        @keyframes ecgFade {
          from { opacity: 0.45; }
          to   { opacity: 0.85; }
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
          .pill-bp  { left: 0; top: 14%; }
          .pill-spo2 { right: 0; top: 8%; }
          .pill-hr  { right: 0; bottom: 20%; }
          .hero-stats { justify-content: center; }
          .hero-sub { text-align: center; }
          .hero-actions { justify-content: center; }
        }

        @media (max-width: 540px) {
          .float-pill { display: none; }
          .phone-wrap { width: 260px; }
          .hero-headline { font-size: 2.8rem; }
          .hero-stats { gap: 20px; }
        }
      `}</style>
    </div>
  );
}
