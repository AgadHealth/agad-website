"use client";
import LoadingScreen from "@/components/LoadingScreen";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Features from "@/components/Features";
import Waitlist from "@/components/Waitlist";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import { ArrowRight, Heart, Shield, Activity, Users } from "lucide-react";

export default function Home() {
  const [visible, setVisible] = useState(false);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const show = setTimeout(() => {
    setVisible(true);
  }, 80);

  const loader = setTimeout(() => {
    setLoading(false);
  }, 2400);

  return () => {
    clearTimeout(show);
    clearTimeout(loader);
  };
}, []);

  return (
  <>
    {loading && <LoadingScreen />}

    <div className="home-wrapper">
      <Navbar />

      <main className="main-content">

        {/* ═══════════════════════════════════════════════════
            HERO — Fintpay-inspired centered layout
            Dark blue/teal top → light/white bottom
        ═══════════════════════════════════════════════════ */}
        <section id="hero" className="hero-section">

          {/* ── Background layers ── */}
          <div className="hero-bg" aria-hidden="true">
            {/* Base gradient: dark teal top → light bottom */}
            <div className="bg-gradient-base" />
            {/* Subtle radial glow near top-center */}
            <div className="bg-radial-glow" />
            {/* Dot grid, fades away towards bottom */}
            <div className="bg-dot-grid" />
          </div>

          {/* ── CENTERED COPY ── */}
          <div className={`hero-copy ${visible ? "anim-in" : ""}`}>

            {/* Pill badge — matches Fintpay "New | Your Smart Finance Companion" */}
            <div className="hero-badge">
              <span className="badge-tag">New</span>
              <span className="badge-text">Your Smart Health Companion</span>
              <ArrowRight size={11} strokeWidth={2.5} />
            </div>

            <h1 className="hero-headline">
              Your Doctor,<br />On Demand.
            </h1>

            {/* CTAs — outline ghost + solid filled (like Fintpay "Explore APIs" + "Get in Touch") */}
            <div className="hero-actions">
              <a href="#features" className="cta-outline">
                Explore Features
              </a>
              <a href="#waitlist" className="cta-filled">
  Join Waitlist
</a>
            </div>
          </div>

          {/* ── VISUAL: phone + orbit + 3 floating cards ── */}
          <div className={`hero-visual ${visible ? "anim-in" : ""}`}>

            {/* Orbit circle — SVG ring around phone area */}
            <div className="orbit-ring" aria-hidden="true">
              <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle
                  cx="250" cy="250" r="220"
                  stroke="rgba(56,189,248,0.18)"
                  strokeWidth="1"
                  strokeDasharray="6 8"
                />
                {/* Glowing dot on orbit */}
                <circle cx="470" cy="250" r="4" fill="#38bdf8" opacity="0.9" />
                <circle cx="470" cy="250" r="8" fill="rgba(56,189,248,0.25)" />
              </svg>
            </div>

            {/* Floating card — "The Future of Healthcare, Today" (top-left, like Fintpay) */}
            <div className={`float-card card-tl ${visible ? "card-in" : ""}`}>
              <div className="fc-icon-row">
                <div className="fc-dot fc-dot-blue" />
                <span className="fc-label">The Future of</span>
              </div>
              <p className="fc-title">Healthcare, Today.</p>
            </div>

            {/* Floating card — Health Score 98% (right, like Fintpay "Phone Bill Payment 80%") */}
            <div className={`float-card card-tr ${visible ? "card-in" : ""}`}>
              <div className="fc-header">
                <div className="fc-icon-wrap"><Shield size={12} /></div>
                <span className="fc-label">Health Score</span>
                <div className="fc-badge-blue">Optimal</div>
              </div>
              <p className="fc-big-num">98<span className="fc-big-pct">%</span></p>
            </div>

            {/* Phone centered */}
            <div className="phone-wrap">
              <div className="phone-fade-wrap">
                <img
                  src="/hero-mockup.png"
                  alt="Agad app on iPhone"
                  className="phone-img"
                />
              </div>
            </div>

            {/* Floating card — bottom left, like Fintpay "Secure Digital payments / 2.5M" */}
            <div className={`float-card card-bl ${visible ? "card-in" : ""}`}>
              <div className="fc-avatars">
                <div className="fca fca-1" />
                <div className="fca fca-2" />
                <div className="fca fca-3" />
              </div>
              <div className="fc-count-block">
                <p className="fc-count">1,200+</p>
                <p className="fc-count-sub">On Waitlist</p>
              </div>
            </div>

          </div>
        

        </section>

        {/* FEATURES GRID */}
        <Features />

        {/* WAITLIST + SOCIALS */}
        <Waitlist />

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
          /* Body bg matches hero bottom so no seam */
          background: #f0f9ff;
        }
        .main-content { margin-top: 0; }

        /* ══════════════════════════════════════════
           HERO SECTION
        ══════════════════════════════════════════ */
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: 0;
          overflow: hidden;
          max-width: 100% !important;
          margin: 0 !important;
        }

        /* ── BACKGROUND ── */
        .hero-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        /*
          Base gradient: Dark blue-teal at top (like Fintpay dark green),
          transitioning to a very light sky-blue / near-white at bottom.
          This is the EXACT same pattern as the Fintpay reference, just
          blue instead of green.
        */
        .bg-gradient-base {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            #1a3a5c 0%,      /* medium-dark blue — clearly blue, not near-black */
            #1e4d70 12%,     /* ocean blue */
            #2e6090 22%,     /* mid blue */
            #6ba3c0 42%,     /* soft sky blue */
            #a8c8d8 60%,     /* pale blue-grey */
            #dceef6 75%,     /* very light blue */
            #f0f7fb 88%,     /* near white with faint blue */
            #f8fafc 100%     /* white */
          );
        }

        /* Soft radial glow at top-center for depth (like Fintpay's bright center spot) */
        .bg-radial-glow {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(
              ellipse 70% 55% at 50% 8%,
              rgba(14,165,233,0.35) 0%,
              rgba(56,189,248,0.15) 35%,
              transparent 65%
            );
        }

        /* Dot grid — only visible in the dark top portion */
        .bg-dot-grid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px);
          background-size: 38px 38px;
          -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 50%);
          mask-image: linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 50%);
        }

        /* ══════════════════════════════════════════
           CENTERED COPY
        ══════════════════════════════════════════ */
        .hero-copy {
          position: relative;
          z-index: 4;
          width: 100%;
          max-width: 680px;
          padding: 148px 24px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0;
        }

        .hero-copy > * {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.75s cubic-bezier(0.16,1,0.3,1),
                      transform 0.75s cubic-bezier(0.16,1,0.3,1);
        }
        .hero-copy.anim-in > *:nth-child(1) { opacity:1; transform:none; transition-delay:0ms; }
        .hero-copy.anim-in > *:nth-child(2) { opacity:1; transform:none; transition-delay:90ms; }
        .hero-copy.anim-in > *:nth-child(3) { opacity:1; transform:none; transition-delay:180ms; }

        /* ── Pill badge ── exactly like Fintpay "New | Your Smart Finance Companion >" */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.28);
          border-radius: 999px;
          padding: 5px 14px 5px 6px;
          font-size: 0.78rem;
          font-weight: 600;
          color: rgba(255,255,255,0.9);
          margin-bottom: 24px;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          letter-spacing: 0.01em;
        }

        .badge-tag {
          background: rgba(56,189,248,0.55);
          border: 1px solid rgba(56,189,248,0.6);
          border-radius: 999px;
          padding: 2px 10px;
          font-size: 0.7rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.02em;
        }

        .badge-text {
          color: rgba(255,255,255,0.88);
        }

        /* ── Headline ── */
        .hero-headline {
          font-size: clamp(2.6rem, 6vw, 5.4rem);
          font-weight: 900;
          line-height: 1.06;
          letter-spacing: -0.04em;
          color: #ffffff;
          margin-bottom: 36px;
          text-shadow: 0 2px 24px rgba(0,0,0,0.18);
        }

        /* ── CTAs — exactly like Fintpay: outline + filled ── */
        .hero-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          justify-content: center;
        }

        /* "Explore Features" — white outline pill (like "Explore APIs") */
        .cta-outline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 30px;
          border-radius: 999px;
          border: 1.5px solid rgba(255,255,255,0.75);
          color: #ffffff;
          font-size: 0.94rem;
          font-weight: 600;
          text-decoration: none;
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(8px);
          transition: background 0.22s ease, border-color 0.22s ease, transform 0.22s ease;
        }

        .cta-outline:hover {
          background: rgba(255,255,255,0.18);
          border-color: rgba(255,255,255,0.95);
          transform: translateY(-2px);
        }

        /* "Join Waitlist" — solid sky-blue filled pill (like "Get in Touch" green) */
        .cta-filled {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 30px;
          border-radius: 999px;
          border: none;
          color: #ffffff;
          font-size: 0.94rem;
          font-weight: 700;
          text-decoration: none;
          background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
          box-shadow: 0 6px 24px rgba(14,165,233,0.45);
          transition: transform 0.22s ease, box-shadow 0.22s ease;
          position: relative;
          overflow: hidden;
        }

        .cta-filled::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.25s ease;
        }

        .cta-filled:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(14,165,233,0.55);
        }

        .cta-filled:hover::after { opacity: 1; }

        /* ══════════════════════════════════════════
           VISUAL — phone + orbit + floating cards
        ══════════════════════════════════════════ */
        .hero-visual {
          position: relative;
          z-index: 3;
          width: 100%;
          max-width: 620px;
          margin: 52px auto 0;
          display: flex;
          justify-content: center;
          align-items: center;
          /* Extra padding so absolute cards don't clip */
          padding: 0 120px 100px;
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.22s,
                      transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.22s;
        }

        .hero-visual.anim-in {
          opacity: 1;
          transform: none;
        }

        /* Orbit SVG ring */
        .orbit-ring {
          position: absolute;
          inset: -40px;
          pointer-events: none;
          z-index: 1;
          opacity: 0.7;
          animation: orbitSpin 28s linear infinite;
        }

        @keyframes orbitSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* Phone image — hand-mockup */
        .phone-wrap {
          position: relative;
          z-index: 3;
          width: 300px;
          max-width: 48vw;
          filter: drop-shadow(0 28px 56px rgba(0,0,0,0.32));
        }

        .phone-fade-wrap {
          position: relative;
          width: 100%;
          /*
            Fade the bottom of the hand mockup to blend into the light background,
            exactly as in the Fintpay reference where the phone fades into the page.
          */
          -webkit-mask-image: linear-gradient(
            to bottom,
            rgba(0,0,0,1) 0%,
            rgba(0,0,0,1) 50%,
            rgba(0,0,0,0.4) 72%,
            rgba(0,0,0,0) 88%
          );
          mask-image: linear-gradient(
            to bottom,
            rgba(0,0,0,1) 0%,
            rgba(0,0,0,1) 50%,
            rgba(0,0,0,0.4) 72%,
            rgba(0,0,0,0) 88%
          );
        }

        .phone-img {
          width: 100%;
          height: auto;
          display: block;
        }

        /* ── Floating cards — WHITE, like Fintpay ── */
        .float-card {
          position: absolute;
          z-index: 8;
          background: rgba(255, 255, 255, 0.96);
          border: 1px solid rgba(255, 255, 255, 1);
          border-radius: 16px;
          box-shadow:
            0 8px 30px rgba(0, 0, 0, 0.10),
            0 2px 8px rgba(0, 0, 0, 0.06);
          opacity: 0;
          transform: scale(0.88) translateY(8px);
          transition: opacity 0.5s cubic-bezier(0.16,1,0.3,1),
                      transform 0.5s cubic-bezier(0.16,1,0.3,1);
        }

        .card-in {
          opacity: 1;
          transform: scale(1) translateY(0);
        }

        /* "The Future of Healthcare, Today" — top left */
        .card-tl {
          left: -10px;
          top: 8%;
          padding: 12px 14px;
          min-width: 150px;
          transition-delay: 0.55s;
          animation: floatA 6s ease-in-out 0.55s infinite;
        }

        /* Health Score 98% — right */
        .card-tr {
          right: -10px;
          top: 30%;
          padding: 12px 16px;
          min-width: 130px;
          transition-delay: 0.70s;
          animation: floatC 7s ease-in-out 0.70s infinite;
        }

        /* Waitlist count — bottom left */
        .card-bl {
          left: -10px;
          bottom: 16%;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          transition-delay: 0.85s;
          animation: floatB 6.5s ease-in-out 0.85s infinite;
        }

        @keyframes floatA {
          0%,100% { transform: translateY(0px) rotate(0.3deg); }
          50%      { transform: translateY(-10px) rotate(-0.3deg); }
        }
        @keyframes floatB {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-8px); }
        }
        @keyframes floatC {
          0%,100% { transform: translateY(0px) rotate(-0.2deg); }
          40%      { transform: translateY(-7px) rotate(0.2deg); }
          80%      { transform: translateY(-12px) rotate(-0.2deg); }
        }

        /* Card content helpers */
        .fc-icon-row {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 4px;
        }

        .fc-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .fc-dot-blue { background: #0ea5e9; }

        .fc-label {
          font-size: 0.58rem;
          font-weight: 600;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.6px;
        }

        .fc-title {
          font-size: 0.82rem;
          font-weight: 800;
          color: #0c1a2e;
          letter-spacing: -0.02em;
          margin: 0;
        }

        .fc-header {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 6px;
        }

        .fc-icon-wrap {
          width: 20px;
          height: 20px;
          border-radius: 6px;
          background: #e0f2fe;
          color: #0284c7;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .fc-badge-blue {
          margin-left: auto;
          font-size: 0.52rem;
          font-weight: 700;
          color: #0284c7;
          background: #e0f2fe;
          border-radius: 99px;
          padding: 2px 7px;
        }

        .fc-big-num {
          font-size: 2rem;
          font-weight: 900;
          color: #0ea5e9;
          letter-spacing: -0.05em;
          line-height: 1;
          margin: 0;
        }

        .fc-big-pct {
          font-size: 1rem;
          font-weight: 700;
          color: #38bdf8;
          margin-left: 1px;
        }

        /* Avatars row */
        .fc-avatars {
          display: flex;
          align-items: center;
        }

        .fca {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 2px solid #fff;
          margin-left: -7px;
          flex-shrink: 0;
        }
        .fca:first-child { margin-left: 0; }
        .fca-1 { background: linear-gradient(135deg, #38bdf8, #0284c7); }
        .fca-2 { background: linear-gradient(135deg, #818cf8, #4f46e5); }
        .fca-3 { background: linear-gradient(135deg, #34d399, #059669); }

        .fc-count-block {}

        .fc-count {
          font-size: 0.92rem;
          font-weight: 800;
          color: #0c1a2e;
          letter-spacing: -0.03em;
          margin: 0 0 1px;
          line-height: 1;
        }

        .fc-count-sub {
          font-size: 0.6rem;
          color: #94a3b8;
          font-weight: 500;
          margin: 0;
        }

        /* ══════════════════════════════════════════
           RESPONSIVE
        ══════════════════════════════════════════ */
        @media (max-width: 768px) {
          .hero-section {
            min-height: auto;
            padding-bottom: 20px;
          }
          .hero-copy {
            padding: 100px 20px 0;
            max-width: 100%;
          }
          .hero-headline { font-size: clamp(2.2rem, 8vw, 3.2rem); }
          .hero-visual {
            max-width: 100%;
            padding: 0 20px 20px;
            margin-top: 30px;
          }
          .phone-wrap { width: 240px; max-width: 54vw; }
          .card-tl { left: -5px; }
          .card-tr { right: -5px; }
          .card-bl { left: -5px; }
        }

        @media (max-width: 480px) {
          .float-card { display: none; }
          .orbit-ring { display: none; }
          .phone-wrap { width: 200px; }
          .hero-headline { font-size: 2rem; }
          .hero-badge { font-size: 0.7rem; }
        }
      `}</style>
    </div>
  );
  </>
  )
}
