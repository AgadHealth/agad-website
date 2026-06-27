"use client";

import { useEffect, useRef, useState } from "react";
import { Download, UserPlus, Heart } from "lucide-react";

export default function HowItWorks() {
  const wrapperRef = useRef(null); // the tall scroll container
  const pathRef = useRef(null); // animated SVG path
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  /* ─────────────────────────────────────────────────────
     Sticky-scroll progress
     The wrapper is 280vh tall. The inner section sticks
     to top: 0 for the full scroll distance, giving us
     ~(280-100)vh = 180vh of scroll to drive the animation.
  ───────────────────────────────────────────────────── */
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const total = path.getTotalLength();
    path.style.strokeDasharray = total;
    path.style.strokeDashoffset = total;

    const update = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const { top, height } = wrapper.getBoundingClientRect();
      const vh = window.innerHeight;

      // scrollable distance = total wrapper height - one viewport
      const scrollable = height - vh;
      // how far we've scrolled into the wrapper
      const scrolled = -top;
      const raw = Math.min(1, Math.max(0, scrolled / scrollable));

      setProgress(raw);
      path.style.strokeDashoffset = total * (1 - raw);

      // Activate steps progressively
      let active = 0;
      if (raw >= 0.08) active = 1;
      if (raw >= 0.44) active = 2;
      if (raw >= 0.78) active = 3;
      setActiveStep(active);
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  const steps = [
    {
      icon: <Download size={19} strokeWidth={2} />,
      num: "1",
      title: "Download Agad",
      desc: "Available on iOS and Android. Get the app from the App Store or Google Play, or scan the QR code to install instantly.",
      pos: "above",
    },
    {
      icon: <UserPlus size={19} strokeWidth={2} />,
      num: "2",
      title: "Set Up Your Profile",
      desc: "Enter your health baseline, connect wearable trackers, and let Agad build your personalized health dashboard.",
      pos: "below",
    },
    {
      icon: <Heart size={19} strokeWidth={2} />,
      num: "3",
      title: "Instant Care & Advice",
      desc: "Connect with certified doctors in minutes, get smart pill reminders, and receive real-time cardiovascular insights.",
      pos: "above",
    },
  ];

  // SVG coordinate space
  const W = 900, H = 220;
  const WAVE = `M 70,65 C 210,65 295,155 450,155 C 605,155 690,65 830,65`;
  const NODES = [
    { cx: 70, cy: 65 }, // step 1 — left crest
    { cx: 450, cy: 155 }, // step 2 — middle trough
    { cx: 830, cy: 65 }, // step 3 — right crest
  ];

  return (
    /* ── Tall wrapper that creates the scroll distance ── */
    <div id="how-it-works" className="hiw-wrapper" ref={wrapperRef}>

      {/* ── Sticky viewport-filling section ── */}
      <section className="hiw-sticky">

        {/* Gradient fade edges — blend into surrounding white page */}
        <div className="fade-top" aria-hidden="true" />
        <div className="fade-bottom" aria-hidden="true" />

        {/* Subtle background decoration */}
        <div className="bg-orb bg-orb-tl" aria-hidden="true" />
        <div className="bg-orb bg-orb-br" aria-hidden="true" />
        <div className="bg-dot-grid" aria-hidden="true" />

        {/* ── Header ── */}
        <div className="hiw-header">
          <div className="eyebrow-row">
            <span className="eyebrow-dash" />
            <span className="eyebrow-text">Simplified Onboarding</span>
            <span className="eyebrow-dash" />
          </div>
          <h2 className="hiw-title">
            Start in <span className="hiw-accent">3 Simple Steps</span>
          </h2>
          <p className="hiw-sub">
            Getting high-quality healthcare shouldn't be complicated.
            Here is how Agad keeps it straightforward.
          </p>
        </div>

        {/* ══ DESKTOP WAVE SCENE ══ */}
        <div className="wave-scene">

          {/* Ghost step numbers */}
          {NODES.map((n, i) => (
            <span
              key={i}
              className={`ghost-num ${activeStep > i ? "ghost-on" : ""}`}
              style={{ left: `${(n.cx / W) * 100}%` }}
            >
              {i + 1}
            </span>
          ))}

          {/* SVG wave */}
          <svg
            className="wave-svg"
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="wg" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1e4d70" />
                <stop offset="50%" stopColor="#4a7a9b" />
                <stop offset="100%" stopColor="#6ba3c0" />
              </linearGradient>
              <linearGradient id="nodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e4d70" />
                <stop offset="100%" stopColor="#6ba3c0" />
              </linearGradient>
              <filter id="glow" x="-30%" y="-150%" width="160%" height="400%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="nodeShadow" x="-60%" y="-60%" width="220%" height="220%">
                <feDropShadow dx="0" dy="4" stdDeviation="7"
                  floodColor="rgba(20,60,100,0.20)" />
              </filter>
            </defs>

            {/* Faint track — always visible */}
            <path
              d={WAVE}
              fill="none"
              stroke="rgba(160,200,225,0.40)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Animated drawing stroke */}
            <path
              ref={pathRef}
              d={WAVE}
              fill="none"
              stroke="url(#wg)"
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="url(#glow)"
            />

            {/* Node circles + embedded icons */}
            {NODES.map((n, i) => {
              const on = activeStep > i;
              return (
                <g key={i}>
                  {/* Outer glow ring */}
                  <circle
                    cx={n.cx} cy={n.cy} r="35"
                    fill={on ? "rgba(30,77,112,0.07)" : "transparent"}
                    stroke={on ? "rgba(30,77,112,0.14)" : "rgba(160,200,225,0.25)"}
                    strokeWidth="1"
                    style={{ transition: "all 0.55s ease" }}
                  />
                  {/* Mid ring */}
                  <circle
                    cx={n.cx} cy={n.cy} r="26"
                    fill={on ? "rgba(30,77,112,0.06)" : "transparent"}
                    stroke={on ? "rgba(30,77,112,0.20)" : "rgba(160,200,225,0.40)"}
                    strokeWidth="1"
                    style={{ transition: "all 0.5s ease" }}
                  />
                  {/* Main bubble */}
                  <circle
                    cx={n.cx} cy={n.cy} r="20"
                    fill={on ? "url(#nodeGrad)" : "white"}
                    stroke={on ? "none" : "rgba(160,200,225,0.7)"}
                    strokeWidth="1.5"
                    filter="url(#nodeShadow)"
                    style={{ transition: "all 0.45s cubic-bezier(0.34,1.56,0.64,1)" }}
                  />
                  {/* Icon via foreignObject */}
                  <foreignObject
                    x={n.cx - 10} y={n.cy - 10}
                    width="20" height="20"
                    style={{ overflow: "visible", pointerEvents: "none" }}
                  >
                    <div
                      xmlns="http://www.w3.org/1999/xhtml"
                      style={{
                        width: "20px", height: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: on ? "#ffffff" : "rgba(100,155,195,0.75)",
                        transition: "color 0.45s ease",
                      }}
                    >
                      {steps[i].icon}
                    </div>
                  </foreignObject>
                </g>
              );
            })}
          </svg>

          {/* Step text labels — positioned via inline style from SVG coords */}
          {NODES.map((n, i) => {
            const step = steps[i];
            const on = activeStep > i;
            const leftPct = (n.cx / W) * 100;
            const topPct = (n.cy / H) * 100;

            return (
              <div
                key={i}
                className={`step-label step-${step.pos} ${on ? "label-on" : ""}`}
                style={{
                  left: `${leftPct}%`,
                  ...(step.pos === "above"
                    ? { bottom: `${100 - topPct + 18}%` }
                    : { top: `${topPct + 18}%` }),
                }}
              >
                <div className={`sl-card ${on ? "sl-card-on" : ""}`}>
                  <h3 className="sl-num">Step {step.num}</h3>
                  <h4 className="sl-title">{step.title}</h4>
                  <p className="sl-desc">{step.desc}</p>
                </div>
                {/* Connector line from card to node */}
                <div className={`sl-connector ${on ? "conn-on" : ""}`} />
              </div>
            );
          })}
        </div>

        {/* ══ MOBILE vertical timeline (no sticky) ══ */}
        <div className="mob-timeline">
          {steps.map((step, i) => {
            const on = activeStep > i;
            return (
              <div key={i} className="mob-row">
                <div className="mob-track">
                  <div className={`mob-node ${on ? "mob-node-on" : ""}`}>
                    {step.icon}
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`mob-line ${on ? "mob-line-on" : ""}`} />
                  )}
                </div>
                <div className={`mob-body ${on ? "mob-body-on" : ""}`}>
                  <span className="mob-num">Step {step.num}</span>
                  <h3 className="mob-title">{step.title}</h3>
                  <p className="mob-desc">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* ════════════════════════════════════════════
          STYLES
      ════════════════════════════════════════════ */}
      <style jsx>{`

        /* ══════════════════════════════════════════
           TALL SCROLL WRAPPER
           Creates the "virtual" scroll distance that
           drives the sticky animation.
        ══════════════════════════════════════════ */
        .hiw-wrapper {
          position: relative;
          height: 280vh;        /* <-- scroll distance */
        }

        /* ══════════════════════════════════════════
           STICKY SECTION
        ══════════════════════════════════════════ */
        .hiw-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0;

          /* Seamless blend: transparent base so it inherits the natural page background */
          background: transparent;
        }

        /* ── Top fade: blend into the previous section's background ── */
        .fade-top {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 25vh;
          background: linear-gradient(to bottom, var(--bg-main, #ffffff) 0%, transparent 100%);
          pointer-events: none;
          z-index: 10;
        }

        /* ── Bottom fade: blend into the next section's background ── */
        .fade-bottom {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 25vh;
          background: linear-gradient(to top, var(--bg-main, #ffffff) 0%, transparent 100%);
          pointer-events: none;
          z-index: 10;
        }

        /* ── Decorative background orbs ── */
        .bg-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
        }
        .bg-orb-tl {
          width: 500px; height: 500px;
          top: -150px; left: -150px;
          background: radial-gradient(circle, rgba(30,77,112,0.07) 0%, transparent 70%);
          filter: blur(60px);
        }
        .bg-orb-br {
          width: 420px; height: 420px;
          bottom: -100px; right: -100px;
          background: radial-gradient(circle, rgba(107,163,192,0.08) 0%, transparent 70%);
          filter: blur(55px);
        }

        /* ── Subtle dot grid ── */
        .bg-dot-grid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(30,77,112,0.06) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
          z-index: 0;
        }

        /* ══════════════════════════════════════════
           HEADER
        ══════════════════════════════════════════ */
        .hiw-header {
          text-align: center;
          max-width: 520px;
          padding: 0 24px;
          position: relative;
          z-index: 2;
          margin-bottom: 8px;
        }

        .eyebrow-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 14px;
        }
        .eyebrow-dash {
          flex: 0 0 32px;
          height: 1px;
          background: #1e4d70;
          opacity: 0.35;
          border-radius: 2px;
        }
        .eyebrow-text {
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2.5px;
          color: #1e4d70;
          opacity: 0.8;
        }

        .hiw-title {
          font-size: clamp(1.8rem, 3.5vw, 2.6rem);
          font-weight: 800;
          color: #0c1a2e;
          letter-spacing: -0.03em;
          line-height: 1.12;
          margin-bottom: 10px;
        }
        .hiw-accent {
          background: linear-gradient(135deg, #1e4d70 0%, #6ba3c0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hiw-sub {
          font-size: 0.95rem;
          color: #4a6a80;
          line-height: 1.65;
        }

        /* ══════════════════════════════════════════
           WAVE SCENE
        ══════════════════════════════════════════ */
        .wave-scene {
          position: relative;
          width: 100%;
          max-width: 1050px;
          padding: 0 80px;
          height: 380px;
          flex-shrink: 0;
          z-index: 2;
        }

        .wave-svg {
          position: absolute;
          left: 80px; right: 80px;
          top: 0; bottom: 0;
          width: calc(100% - 160px);
          height: 100%;
        }

        /* ── Ghost numbers ── */
        .ghost-num {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          font-size: clamp(7rem, 11vw, 10rem);
          font-weight: 900;
          letter-spacing: -0.06em;
          line-height: 1;
          user-select: none;
          pointer-events: none;
          color: rgba(30,77,112,0.05);
          transition: color 0.7s ease;
          z-index: 0;
        }
        .ghost-on {
          color: rgba(30,77,112,0.10);
        }

        /* ── Step labels ── */
        .step-label {
          position: absolute;
          width: 195px;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 5;
        }

        /* "above" label: card on top, connector points down to node */
        .step-above {
          flex-direction: column;        /* card then connector */
        }
        /* "below" label: connector first (pointing up to node), then card */
        .step-below {
          flex-direction: column-reverse;
        }

        /* Glassmorphism step card */
        .sl-card {
          width: 100%;
          background: rgba(255, 255, 255, 0.70);
          border: 1px solid rgba(160,200,225,0.45);
          border-radius: 18px;
          padding: 16px 18px;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow:
            0 4px 20px rgba(20,60,100,0.07),
            0 1px 6px rgba(20,60,100,0.04);
          opacity: 0;
          transform: translateY(12px);
          transition:
            opacity 0.55s ease,
            transform 0.55s cubic-bezier(0.16,1,0.3,1),
            border-color 0.4s ease,
            box-shadow 0.4s ease;
        }

        .step-below .sl-card {
          transform: translateY(-12px);
        }

        .sl-card-on {
          opacity: 1;
          transform: translateY(0) !important;
          border-color: rgba(30,77,112,0.22);
          box-shadow:
            0 8px 32px rgba(20,60,100,0.12),
            0 2px 8px rgba(20,60,100,0.06);
        }

        .sl-num {
          font-size: 0.60rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #1e4d70;
          opacity: 0.65;
          margin: 0 0 5px;
        }
        .sl-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: #0c1a2e;
          letter-spacing: -0.02em;
          line-height: 1.3;
          margin: 0 0 6px;
        }
        .sl-desc {
          font-size: 0.74rem;
          color: #4a6a80;
          line-height: 1.6;
          margin: 0;
        }

        /* Thin connector line from card to node */
        .sl-connector {
          width: 1.5px;
          height: 22px;
          background: rgba(160,200,225,0.4);
          border-radius: 2px;
          flex-shrink: 0;
          transition: background 0.5s ease;
        }
        .conn-on {
          background: linear-gradient(to bottom, rgba(30,77,112,0.50), rgba(107,163,192,0.30));
        }

        /* ══════════════════════════════════════════
           MOBILE TIMELINE (hidden on desktop)
        ══════════════════════════════════════════ */
        .mob-timeline {
          display: none;
          flex-direction: column;
          max-width: 480px;
          width: 100%;
          padding: 0 24px;
          position: relative;
          z-index: 2;
          margin-top: 32px;
        }

        .mob-row {
          display: flex;
          gap: 18px;
          align-items: stretch;
        }

        .mob-track {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
          width: 42px;
        }

        .mob-node {
          width: 42px; height: 42px;
          border-radius: 50%;
          background: white;
          border: 1.5px solid rgba(160,200,225,0.65);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(140,185,215,0.9);
          box-shadow: 0 3px 10px rgba(20,60,100,0.06);
          flex-shrink: 0;
          transition: all 0.45s cubic-bezier(0.34,1.56,0.64,1);
        }
        .mob-node-on {
          background: linear-gradient(135deg, #1e4d70, #6ba3c0);
          color: white;
          border-color: transparent;
          box-shadow: 0 6px 20px rgba(30,77,112,0.28);
          transform: scale(1.06);
        }

        .mob-line {
          width: 2px;
          flex: 1;
          min-height: 28px;
          border-radius: 2px;
          margin: 6px 0;
          background: rgba(160,200,225,0.35);
          transition: background 0.5s ease;
        }
        .mob-line-on {
          background: linear-gradient(to bottom, #1e4d70, #6ba3c0);
        }

        .mob-body {
          flex: 1;
          padding: 2px 0 26px;
          opacity: 0.4;
          transition: opacity 0.5s ease;
        }
        .mob-body-on { opacity: 1; }

        .mob-num {
          display: block;
          font-size: 0.60rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #1e4d70;
          margin-bottom: 4px;
          opacity: 0.65;
        }
        .mob-title {
          font-size: 1rem;
          font-weight: 700;
          color: #0c1a2e;
          letter-spacing: -0.02em;
          margin: 0 0 7px;
        }
        .mob-desc {
          font-size: 0.86rem;
          color: #4a6a80;
          line-height: 1.65;
          margin: 0;
        }

        /* ══════════════════════════════════════════
           RESPONSIVE
        ══════════════════════════════════════════ */
        @media (max-width: 880px) {
          .hiw-wrapper { height: auto; }
          .hiw-sticky {
            position: relative;
            height: auto;
            padding: 80px 0 100px;
            min-height: unset;
          }
          .wave-scene      { display: none; }
          .progress-track  { display: none; }
          .step-counter    { display: none; }
          .mob-timeline    { display: flex; }
          .fade-top, .fade-bottom { display: none; }
        }

        @media (max-width: 480px) {
          .hiw-title { font-size: 1.7rem; }
        }
      `}</style>
    </div>
  );
}

