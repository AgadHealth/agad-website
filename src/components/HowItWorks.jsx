"use client";

import { useEffect, useRef, useState } from "react";
import { Download, UserPlus, Heart } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HowItWorks() {
  const sectionRef = useRef(null); // pinned section
  const pathRef = useRef(null); // animated SVG path
  const nodeRefs = [useRef(null), useRef(null), useRef(null)];
  const labelRefs = [useRef(null), useRef(null), useRef(null)];
  const ghostRefs = [useRef(null), useRef(null), useRef(null)];
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: <Download size={19} strokeWidth={2} />,
      num: "1",
      title: "Download Agad",
      desc: "Available on iOS and Android. Get the app from the App Store or Google Play, or scan the QR code to install instantly.",
      pos: "below",
    },
    {
      icon: <UserPlus size={19} strokeWidth={2} />,
      num: "2",
      title: "Set Up Your Profile",
      desc: "Enter your health baseline, connect wearable trackers, and let Agad build your personalized health dashboard.",
      pos: "above",
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
  const W = 1000,
    H = 350;
  const WAVE = `M 45,40 C 260,10 280,340 500,175 C 720,10 740,340 955,310`;
  const NODES = [
    { cx: 45, cy: 40 },
    { cx: 500, cy: 175 },
    { cx: 955, cy: 310 },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isDesktop = window.innerWidth > 880;
      const path = pathRef.current;

      if (isDesktop && path) {
        const total = path.getTotalLength();
        path.style.strokeDasharray = total;
        path.style.strokeDashoffset = total;

        // Find the length-fraction at which the drawn path reaches each node's x
        // by sampling the path (robust to the exact bezier shape).
        const findLenFractionForX = (targetX) => {
          const samples = 400;
          let bestLen = total;
          let bestDiff = Infinity;
          for (let i = 0; i <= samples; i++) {
            const len = (total * i) / samples;
            const pt = path.getPointAtLength(len);
            const diff = Math.abs(pt.x - targetX);
            if (diff < bestDiff) {
              bestDiff = diff;
              bestLen = len;
            }
          }
          return bestLen / total;
        };

        const nodeLenFractions = NODES.map((n) => findLenFractionForX(n.cx));

        // Pin the section
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "+=350%",
          pin: true,
          pinSpacing: true,
        });

        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=350%",
            scrub: 1,
            onUpdate: (self) => {
              // Derive active step from overall progress against node fractions,
              // each node "activates" once the wave reaches it.
              const raw = self.progress;
              // Map timeline progress to drawn length using a rough proportional model:
              // we reserve small pauses, so just use direct fraction checks below
              // via the timeline labels (set in onComplete callbacks instead).
            },
          },
        });

        // Helper to animate node "on" state (glow + scale)
        const activateNode = (i) => {
          masterTl.to(
            nodeRefs[i].current,
            { scale: 1.18, svgOrigin: `${NODES[i].cx} ${NODES[i].cy}`, duration: 0.4, ease: "back.out(2)" },
            "<"
          );
        };

        // STEP 1: node 1 pops in immediately (start of journey)
        masterTl
          .call(() => setActiveStep(1))
          .to(nodeRefs[0].current, {
            scale: 1.15,
            svgOrigin: `${NODES[0].cx} ${NODES[0].cy}`,
            duration: 0.6,
            ease: "back.out(2)",
          })
          .to(ghostRefs[0].current, { opacity: 1, duration: 0.6 }, "<")
          .to(labelRefs[0].current, { opacity: 1, y: 0, duration: 0.6 }, "<")

          // pause to let step 1 sit
          .to({}, { duration: 0.3 })

          // draw wave from start to node 2
          .to(path, {
            strokeDashoffset: total - total * nodeLenFractions[1],
            duration: 1.4,
            ease: "none",
            onStart: () => setActiveStep(1),
          })

          // node 1 settles back, node 2 pops with glow
          .to(nodeRefs[0].current, { scale: 1, svgOrigin: `${NODES[0].cx} ${NODES[0].cy}`, duration: 0.4 }, "<+0.2")
          .call(() => setActiveStep(2))
          .to(
            nodeRefs[1].current,
            { scale: 1.15, svgOrigin: `${NODES[1].cx} ${NODES[1].cy}`, duration: 0.6, ease: "back.out(2)" },
            "-=0.3"
          )
          .to(ghostRefs[1].current, { opacity: 1, duration: 0.6 }, "<")
          .to(labelRefs[1].current, { opacity: 1, y: 0, duration: 0.6 }, "<")

          // pause to let step 2 sit
          .to({}, { duration: 0.3 })

          // draw wave from node 2 to node 3 (end)
          .to(path, {
            strokeDashoffset: total - total * nodeLenFractions[2],
            duration: 1.4,
            ease: "none",
            onStart: () => setActiveStep(2),
          })

          // node 2 settles back, node 3 pops with glow
          .to(nodeRefs[1].current, { scale: 1, svgOrigin: `${NODES[1].cx} ${NODES[1].cy}`, duration: 0.4 }, "<+0.2")
          .call(() => setActiveStep(3))
          .to(
            nodeRefs[2].current,
            { scale: 1.15, svgOrigin: `${NODES[2].cx} ${NODES[2].cy}`, duration: 0.6, ease: "back.out(2)" },
            "-=0.3"
          )
          .to(ghostRefs[2].current, { opacity: 1, duration: 0.6 }, "<")
          .to(labelRefs[2].current, { opacity: 1, y: 0, duration: 0.6 }, "<")

          // hold final state briefly before unpinning
          .to({}, { duration: 0.4 });
      } else {
        // Mobile / tablet: simple reveal-on-scroll, no pin
        gsap.set(
          [nodeRefs[0].current, nodeRefs[1].current, nodeRefs[2].current],
          { clearProps: "all" }
        );

        // Mobile straight line and step nodes scroll trigger reveal
        const mobRows = gsap.utils.toArray(".mob-row-step");
        mobRows.forEach((row) => {
          const node = row.querySelector(".mob-node");
          const line = row.querySelector(".mob-line");
          const body = row.querySelector(".mob-body");

          gsap.fromTo(
            [node, body],
            { opacity: 0.25, y: 15, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              scrollTrigger: {
                trigger: row,
                start: "top 85%",
                end: "top 65%",
                scrub: true,
              },
            }
          );

          if (line) {
            gsap.fromTo(
              line,
              { scaleY: 0, transformOrigin: "top center" },
              {
                scaleY: 1,
                scrollTrigger: {
                  trigger: row,
                  start: "top 80%",
                  end: "bottom 70%",
                  scrub: true,
                },
              }
            );
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="how-it-works" ref={sectionRef} className="hiw-section">
      {/* Gradient fade edges */}
      <div className="fade-top" aria-hidden="true" />
      <div className="fade-bottom" aria-hidden="true" />

      {/* Subtle background decoration */}
      <div className="bg-orb bg-orb-tl" aria-hidden="true" />
      <div className="bg-orb bg-orb-br" aria-hidden="true" />
      <div className="bg-dot-grid" aria-hidden="true" />

      {/* Header */}
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
          Getting high-quality healthcare shouldn&apos;t be complicated. Here
          is how Agad keeps it straightforward.
        </p>
      </div>

      {/* ══ DESKTOP WAVE SCENE ══ */}
      <div className="wave-scene">
        {/* Ghost step numbers */}
        {/* Ghost step numbers */}
        {NODES.map((n, i) => (
          <span
            key={i}
            ref={ghostRefs[i]}
            className="ghost-num"
            style={{ left: `calc(15px + (${n.cx} / 1000) * (100% - 30px))` }}
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
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="50%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
            <linearGradient id="nodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <filter id="glow" x="-30%" y="-150%" width="160%" height="400%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="nodeShadow" x="-60%" y="-60%" width="220%" height="220%">
              <feDropShadow
                dx="0"
                dy="4"
                stdDeviation="7"
                floodColor="rgba(20,60,100,0.20)"
              />
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
          {NODES.map((n, i) => (
            <g key={i} ref={nodeRefs[i]} style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}>
              <circle
                cx={n.cx}
                cy={n.cy}
                r="35"
                className="ring-outer"
              />
              <circle
                cx={n.cx}
                cy={n.cy}
                r="26"
                className="ring-mid"
              />
              <circle
                cx={n.cx}
                cy={n.cy}
                r="20"
                className="node-bubble"
                filter="url(#nodeShadow)"
              />
              <foreignObject
                x={n.cx - 10}
                y={n.cy - 10}
                width="20"
                height="20"
                style={{ overflow: "visible", pointerEvents: "none" }}
              >
                <div
                  xmlns="http://www.w3.org/1999/xhtml"
                  className="node-icon"
                >
                  {steps[i].icon}
                </div>
              </foreignObject>
            </g>
          ))}
        </svg>

        {/* Step text labels */}
        {NODES.map((n, i) => {
          const step = steps[i];
          return (
            <div
              key={i}
              className={`step-label step-${step.pos}`}
              style={{
                left: `calc(15px + (${n.cx} / 1000) * (100% - 30px))`,
                ...(step.pos === "above"
                  ? { bottom: `calc(100% - (var(--offset-y) + (${n.cy} / 350) * var(--h-svg)) + ${i === 2 ? -75 : 20}px)` }
                  : { top: `calc(var(--offset-y) + (${n.cy} / 350) * var(--h-svg) + ${i === 0 ? -80 : 20}px)` }),
              }}
            >
              <div ref={labelRefs[i]} className="sl-card">
                <h3 className="sl-num">Step {step.num}</h3>
                <h4 className="sl-title">{step.title}</h4>
                <p className="sl-desc">{step.desc}</p>
              </div>
              <div className={`sl-connector ${activeStep > i ? "conn-on" : ""}`} />
            </div>
          );
        })}
      </div>

      {/* ══ MOBILE vertical timeline ══ */}
      <div className="mob-timeline">
        {steps.map((step, i) => (
          <div key={i} className="mob-row mob-row-step">
            <div className="mob-track">
              <div className="mob-node">{step.icon}</div>
              {i < steps.length - 1 && <div className="mob-line" />}
            </div>
            <div className="mob-body">
              <span className="mob-num">Step {step.num}</span>
              <h3 className="mob-title">{step.title}</h3>
              <p className="mob-desc">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .hiw-section {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: transparent;
        }

        .fade-top {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 25vh;
          background: linear-gradient(to bottom, #f0f9ff 0%, transparent 100%);
          pointer-events: none;
          z-index: 10;
        }
        .fade-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 25vh;
          background: linear-gradient(to top, #f0f9ff 0%, transparent 100%);
          pointer-events: none;
          z-index: 10;
        }

        .bg-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
        }
        .bg-orb-tl {
          width: 500px;
          height: 500px;
          top: -150px;
          left: -150px;
          background: radial-gradient(circle, rgba(14, 165, 233, 0.07) 0%, transparent 70%);
          filter: blur(60px);
        }
        .bg-orb-br {
          width: 420px;
          height: 420px;
          bottom: -100px;
          right: -100px;
          background: radial-gradient(circle, rgba(2, 132, 199, 0.08) 0%, transparent 70%);
          filter: blur(55px);
        }

        .bg-dot-grid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(14, 165, 233, 0.06) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
          z-index: 0;
        }

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
          background: #0ea5e9;
          opacity: 0.35;
          border-radius: 2px;
        }
        .eyebrow-text {
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2.5px;
          color: #0ea5e9;
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
          background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hiw-sub {
          font-size: 0.95rem;
          color: #4a6a80;
          line-height: 1.65;
        }

        .wave-scene {
          position: relative;
          width: 100%;
          max-width: 1250px;
          padding: 0 15px;
          height: 480px;
          flex-shrink: 0;
          z-index: 2;

          /* Precise vertical aspect-ratio coordinate variables */
          --w-svg: calc(100% - 30px);
          --h-svg: calc(var(--w-svg) / 2.857);
          --offset-y: calc((480px - var(--h-svg)) / 2);
        }

        .wave-svg {
          position: absolute;
          left: 15px;
          right: 15px;
          top: 0;
          bottom: 0;
          width: calc(100% - 30px);
          height: 100%;
        }

        .ring-outer {
          fill: rgba(14, 165, 233, 0.07);
          stroke: rgba(14, 165, 233, 0.14);
          stroke-width: 1;
        }
        .ring-mid {
          fill: rgba(14, 165, 233, 0.06);
          stroke: rgba(14, 165, 233, 0.2);
          stroke-width: 1;
        }
        .node-bubble {
          fill: url(#nodeGrad);
          stroke: none;
          stroke-width: 1.5;
        }
        .node-icon {
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
        }

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
          color: rgba(14, 165, 233, 0.05);
          opacity: 0;
          z-index: 0;
        }

        .step-label {
          position: absolute;
          width: 195px;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 5;
        }
        .step-above {
          flex-direction: column;
        }
        .step-below {
          flex-direction: column-reverse;
        }

        .sl-card {
          width: 100%;
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(160, 200, 225, 0.45);
          border-radius: 18px;
          padding: 16px 18px;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 4px 20px rgba(20, 60, 100, 0.07), 0 1px 6px rgba(20, 60, 100, 0.04);
          opacity: 0;
          transform: translateY(12px);
        }
        .step-below .sl-card {
          transform: translateY(-12px);
        }

        .sl-num {
          font-size: 0.6rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #0ea5e9;
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

        .sl-connector {
          width: 1.5px;
          height: 22px;
          background: rgba(160, 200, 225, 0.4);
          border-radius: 2px;
          flex-shrink: 0;
          opacity: 0;
          transition: opacity 0.4s ease, background 0.5s ease;
        }
        .conn-on {
          opacity: 1;
          background: linear-gradient(to bottom, rgba(14, 165, 233, 0.5), rgba(2, 132, 199, 0.3));
        }

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
          width: 42px;
          height: 42px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background: linear-gradient(135deg, #0ea5e9, #0284c7);
          color: white;
          box-shadow: 0 6px 20px rgba(14, 165, 233, 0.28);
        }

        .mob-line {
          width: 2px;
          flex: 1;
          min-height: 28px;
          border-radius: 2px;
          margin: 6px 0;
          background: linear-gradient(to bottom, #0ea5e9, #0284c7);
        }

        .mob-body {
          flex: 1;
          padding: 2px 0 26px;
        }

        .mob-num {
          display: block;
          font-size: 0.6rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #0ea5e9;
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

        @media (max-width: 880px) {
          .hiw-section {
            height: auto;
            padding: 80px 0 100px;
          }
          .wave-scene {
            display: none;
          }
          .mob-timeline {
            display: flex;
          }
          .fade-top,
          .fade-bottom {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .hiw-title {
            font-size: 1.7rem;
          }
        }
      `}</style>
    </div>
  );
}