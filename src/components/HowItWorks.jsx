"use client";

import { useEffect, useRef } from "react";
import { Download, UserPlus, Heart } from "lucide-react";

export default function HowItWorks() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("card-visible");
          }
        });
      },
      { threshold: 0.15 }
    );
    const cards = sectionRef.current?.querySelectorAll(".step-3d-card");
    cards?.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      icon: <Download size={26} />,
      number: "01",
      title: "Download Agad",
      description:
        "Available on iOS and Android. Get the app from the App Store or Google Play, or scan the QR code to install instantly.",
      color: "#6366f1",
      colorRgb: "99,102,241",
      glow: "rgba(99,102,241,0.25)",
    },
    {
      icon: <UserPlus size={26} />,
      number: "02",
      title: "Set Up Your Profile",
      description:
        "Enter your health baseline, connect wearable trackers, and let Agad build your personalized health dashboard.",
      color: "#3a86ff",
      colorRgb: "58,134,255",
      glow: "rgba(58,134,255,0.25)",
    },
    {
      icon: <Heart size={26} />,
      number: "03",
      title: "Instant Care & Advice",
      description:
        "Connect with certified doctors in minutes, get smart pill reminders, and receive real-time cardiovascular insights.",
      color: "#00b4d8",
      colorRgb: "0,180,216",
      glow: "rgba(0,180,216,0.25)",
    },
  ];

  return (
    <section id="how-it-works" className="hiw-section" ref={sectionRef}>

      {/* Decorative background blobs */}
      <div className="hiw-blob hiw-blob-1" />
      <div className="hiw-blob hiw-blob-2" />

      <div className="hiw-header">
        <span className="hiw-eyebrow">Simplified Onboarding</span>
        <h2 className="hiw-title">Start in <span className="hiw-accent">3 Simple Steps</span></h2>
        <p className="hiw-sub">
          Getting high-quality healthcare shouldn't be complicated. Here is how Agad keeps it straightforward.
        </p>
      </div>

      {/* Desktop 3-column 3D cards */}
      <div className="steps-grid">
        {/* Connecting line */}
        <div className="connect-line" />

        {steps.map((step, idx) => (
          <div
            key={idx}
            className="step-3d-card"
            style={{
              "--step-color": step.color,
              "--step-rgb": step.colorRgb,
              "--step-glow": step.glow,
              animationDelay: `${idx * 0.15}s`,
            }}
          >
            {/* Glowing number badge */}
            <div className="step-num-badge">
              <span>{step.number}</span>
            </div>

            {/* Icon orb */}
            <div className="step-icon-orb">
              <div className="step-icon-inner">
                {step.icon}
              </div>
              <div className="step-icon-ring" />
              <div className="step-icon-glow" />
            </div>

            <h3 className="step-card-title">{step.title}</h3>
            <p className="step-card-desc">{step.description}</p>

            {/* Bottom accent bar */}
            <div className="step-card-bar" />

            {/* 3D highlight */}
            <div className="step-card-shine" />
          </div>
        ))}
      </div>

      {/* Mobile vertical timeline */}
      <div className="mobile-hiw">
        {steps.map((step, idx) => (
          <div key={idx} className="mt-row" style={{ "--step-color": step.color, "--step-glow": step.glow }}>
            <div className="mt-left">
              <div className="mt-badge">{step.number}</div>
              {idx < steps.length - 1 && <div className="mt-connector" />}
            </div>
            <div className="mt-card">
              <div className="mt-icon-row">
                <div className="mt-icon">{step.icon}</div>
                <h3 className="mt-title">{step.title}</h3>
              </div>
              <p className="mt-desc">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        /* ── Section ── */
        .hiw-section {
          width: 100%;
          position: relative;
          overflow: hidden;
          padding-top: 120px;
          padding-bottom: 140px;
          background: linear-gradient(180deg, #ffffff 0%, #f8faff 50%, #f0f5ff 100%);
        }

        /* Background blobs */
        .hiw-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
          z-index: 0;
        }
        .hiw-blob-1 {
          width: 600px; height: 600px;
          top: -150px; left: -150px;
          background: radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%);
        }
        .hiw-blob-2 {
          width: 500px; height: 500px;
          bottom: -100px; right: -100px;
          background: radial-gradient(circle, rgba(0,180,216,0.08) 0%, transparent 70%);
        }

        /* Header */
        .hiw-header {
          text-align: center;
          max-width: 640px;
          margin: 0 auto 80px;
          position: relative;
          z-index: 1;
          padding: 0 24px;
        }

        .hiw-eyebrow {
          display: inline-block;
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2.5px;
          color: #6366f1;
          margin-bottom: 16px;
        }

        .hiw-title {
          font-size: clamp(2.2rem, 4vw, 3rem);
          font-weight: 800;
          color: #0d1e3d;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin-bottom: 18px;
        }

        .hiw-accent {
          background: linear-gradient(135deg, #6366f1 0%, #3a86ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hiw-sub {
          font-size: 1.05rem;
          color: #4a5568;
          line-height: 1.7;
        }

        /* ── Desktop 3-col grid ── */
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 28px;
        }

        /* Connecting gradient line */
        .connect-line {
          position: absolute;
          top: 72px;
          left: calc(16.66% + 60px);
          right: calc(16.66% + 60px);
          height: 2px;
          background: linear-gradient(90deg, 
            rgba(99,102,241,0.5) 0%,
            rgba(58,134,255,0.6) 50%,
            rgba(0,180,216,0.4) 100%
          );
          z-index: 0;
          border-radius: 99px;
        }

        .connect-line::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 99px;
          background: inherit;
          filter: blur(4px);
          opacity: 0.5;
        }

        /* ── 3D Card ── */
        .step-3d-card {
          position: relative;
          z-index: 1;
          background: rgba(255,255,255,0.85);
          border: 1px solid rgba(203,213,225,0.7);
          border-radius: 28px;
          padding: 44px 36px 40px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          overflow: hidden;
          cursor: default;

          /* 3D initial state */
          opacity: 0;
          transform: translateY(40px) perspective(800px) rotateX(6deg);
          transition:
            opacity 0.7s cubic-bezier(0.16,1,0.3,1),
            transform 0.7s cubic-bezier(0.16,1,0.3,1),
            box-shadow 0.3s ease,
            border-color 0.3s ease;

          box-shadow:
            0 4px 16px rgba(11,19,43,0.04),
            0 1px 4px rgba(11,19,43,0.02);
        }

        /* Card visible via IntersectionObserver */
        .step-3d-card.card-visible {
          opacity: 1;
          transform: translateY(0) perspective(800px) rotateX(0deg);
        }

        /* Hover — 3D lift effect */
        .step-3d-card:hover {
          border-color: rgba(var(--step-rgb), 0.3);
          box-shadow:
            0 20px 60px rgba(var(--step-rgb), 0.12),
            0 8px 24px rgba(var(--step-rgb), 0.08),
            0 2px 8px rgba(11,19,43,0.04);
          transform: translateY(-8px) perspective(800px) rotateX(-2deg) scale(1.01);
        }

        /* Number badge */
        .step-num-badge {
          position: absolute;
          top: 26px;
          right: 28px;
          font-size: 3.5rem;
          font-weight: 900;
          color: rgba(var(--step-rgb), 0.06);
          line-height: 1;
          letter-spacing: -0.04em;
          transition: color 0.3s ease;
          pointer-events: none;
          user-select: none;
        }

        .step-3d-card:hover .step-num-badge {
          color: rgba(var(--step-rgb), 0.12);
        }

        /* Icon orb */
        .step-icon-orb {
          position: relative;
          width: 64px;
          height: 64px;
          margin-bottom: 28px;
          flex-shrink: 0;
        }

        .step-icon-inner {
          position: relative;
          z-index: 2;
          width: 64px;
          height: 64px;
          border-radius: 20px;
          background: linear-gradient(135deg,
            rgba(var(--step-rgb), 0.12) 0%,
            rgba(var(--step-rgb), 0.06) 100%
          );
          border: 1.5px solid rgba(var(--step-rgb), 0.2);
          color: var(--step-color);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
          box-shadow: 0 4px 16px rgba(var(--step-rgb), 0.1);
        }

        .step-3d-card:hover .step-icon-inner {
          background: linear-gradient(135deg, var(--step-color) 0%, rgba(var(--step-rgb), 0.8) 100%);
          color: white;
          border-color: var(--step-color);
          transform: scale(1.1) rotate(-4deg);
          box-shadow: 0 8px 28px rgba(var(--step-rgb), 0.35);
        }

        /* Glowing ring around icon */
        .step-icon-ring {
          position: absolute;
          inset: -6px;
          border-radius: 26px;
          border: 1.5px solid rgba(var(--step-rgb), 0.12);
          z-index: 1;
          transition: border-color 0.3s ease, inset 0.3s ease;
        }

        .step-3d-card:hover .step-icon-ring {
          border-color: rgba(var(--step-rgb), 0.25);
          inset: -8px;
        }

        .step-icon-glow {
          position: absolute;
          inset: -10px;
          border-radius: 30px;
          background: radial-gradient(circle, rgba(var(--step-rgb), 0.15) 0%, transparent 70%);
          filter: blur(8px);
          z-index: 0;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .step-3d-card:hover .step-icon-glow {
          opacity: 1;
        }

        /* Text */
        .step-card-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: #0d1e3d;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
          line-height: 1.3;
        }

        .step-card-desc {
          font-size: 0.97rem;
          color: #4a5568;
          line-height: 1.7;
          flex: 1;
        }

        /* Bottom accent bar */
        .step-card-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg,
            var(--step-color) 0%,
            transparent 100%
          );
          border-radius: 0 0 28px 28px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .step-3d-card:hover .step-card-bar {
          opacity: 1;
        }

        /* Inner shine effect */
        .step-card-shine {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 50%;
          background: linear-gradient(180deg,
            rgba(255,255,255,0.6) 0%,
            transparent 100%
          );
          border-radius: 28px 28px 0 0;
          pointer-events: none;
          z-index: 0;
        }

        /* ── Mobile vertical timeline ── */
        .mobile-hiw {
          display: none;
          flex-direction: column;
          gap: 0;
          max-width: 600px;
          margin: 0 auto;
          padding: 0 20px;
          position: relative;
          z-index: 1;
        }

        @media (max-width: 960px) {
          .steps-grid { display: none; }
          .mobile-hiw { display: flex; }

          .hiw-header { margin-bottom: 52px; }
        }

        .mt-row {
          display: flex;
          gap: 20px;
          align-items: flex-start;
        }

        .mt-left {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
        }

        .mt-badge {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(var(--step-rgb,99,102,241), 0.15) 0%, rgba(var(--step-rgb,99,102,241), 0.08) 100%);
          border: 2px solid rgba(var(--step-rgb,99,102,241), 0.3);
          color: var(--step-color, #6366f1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          flex-shrink: 0;
          box-shadow: 0 4px 12px var(--step-glow, rgba(99,102,241,0.2));
        }

        .mt-connector {
          width: 2px;
          flex: 1;
          min-height: 24px;
          margin: 6px 0;
          background: linear-gradient(to bottom, rgba(99,102,241,0.3), rgba(58,134,255,0.15));
          border-radius: 99px;
        }

        .mt-card {
          flex: 1;
          background: rgba(255,255,255,0.9);
          border: 1px solid rgba(203,213,225,0.7);
          border-radius: 20px;
          padding: 22px 24px;
          margin-bottom: 20px;
          box-shadow: 0 4px 16px rgba(11,19,43,0.05);
          backdrop-filter: blur(10px);
        }

        .mt-icon-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 10px;
        }

        .mt-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: rgba(var(--step-rgb,99,102,241), 0.1);
          color: var(--step-color, #6366f1);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 1px solid rgba(var(--step-rgb,99,102,241), 0.2);
        }

        .mt-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #0d1e3d;
          letter-spacing: -0.01em;
        }

        .mt-desc {
          font-size: 0.92rem;
          color: #4a5568;
          line-height: 1.65;
        }
      `}</style>
    </section>
  );
}
