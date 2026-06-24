"use client";
import { useEffect, useRef } from "react";

/**
 * ECG waveform sampler — returns a Y displacement (-1 to 1)
 * for a given normalized phase t (0–1), modeled after a realistic PQRST complex.
 */
function ecgSample(t) {
  const p = t % 1;

  // P wave  (0.07 – 0.16)
  if (p > 0.07 && p < 0.16)
    return -0.18 * Math.sin(((p - 0.07) / 0.09) * Math.PI);

  // Q dip   (0.26 – 0.29)
  if (p > 0.26 && p < 0.29)
    return 0.12 * ((p - 0.26) / 0.03);

  // R spike up then S down  (0.29 – 0.38)
  if (p > 0.29 && p < 0.34)
    return 0.12 - 1.12 * Math.sin(((p - 0.29) / 0.05) * Math.PI);
  if (p > 0.34 && p < 0.38)
    return -0.12 * (1 - (p - 0.34) / 0.04);

  // T wave   (0.48 – 0.64)
  if (p > 0.48 && p < 0.64)
    return -0.27 * Math.sin(((p - 0.48) / 0.16) * Math.PI);

  return 0;
}

export default function PageBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let W = window.innerWidth;
    let H = window.innerHeight;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Single ECG line config ──
    // period: px per beat cycle — larger = lower frequency
    const PERIOD = 180;         // lower frequency: ~5-6 beats across a 1000px screen
    const AMPLITUDE = 110;      // very tall wave — large and dramatic
    const CENTER_Y_FRAC = 0.52; // slightly below vertical center

    // How far the line has been "revealed" — driven by scroll (0 → W)
    // We keep an autonomous slow-scroll offset for the idle animation too.
    let autoOffset = 0;
    const AUTO_SPEED = 0.55; // px per frame — leisurely background drift

    // Scroll state
    let scrollRevealPx = 0; // 0 = only left edge dot; W = fully drawn
    let lastScrollY = 0;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;
      scrollRevealPx = progress * W;
      lastScrollY = scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initialise

    let animId;

    function draw() {
      ctx.clearRect(0, 0, W, H);

      const centerY = CENTER_Y_FRAC * H;
      // The line is always fully drawn (looping), but we highlight up to scrollRevealPx
      // with a brighter colour + wider stroke, and dim the rest.

      // ── 1. Draw the full "dim" baseline trace ──
      ctx.beginPath();
      for (let x = 0; x <= W; x++) {
        const phase = ((x + autoOffset) % PERIOD) / PERIOD;
        const y = centerY + ecgSample(phase) * AMPLITUDE;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }

      const dimGrad = ctx.createLinearGradient(0, 0, W, 0);
      dimGrad.addColorStop(0,   "rgba(58,134,255,0.06)");
      dimGrad.addColorStop(0.5, "rgba(0,180,216,0.08)");
      dimGrad.addColorStop(1,   "rgba(0,245,212,0.05)");

      ctx.strokeStyle = dimGrad;
      ctx.lineWidth   = 1.5;
      ctx.shadowBlur  = 0;
      ctx.stroke();

      // ── 2. Draw the "revealed" portion (scroll-synced) — bright & glowing ──
      if (scrollRevealPx > 0) {
        ctx.beginPath();
        const clipped = Math.min(scrollRevealPx, W);
        for (let x = 0; x <= clipped; x++) {
          const phase = ((x + autoOffset) % PERIOD) / PERIOD;
          const y = centerY + ecgSample(phase) * AMPLITUDE;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }

        const revGrad = ctx.createLinearGradient(0, 0, clipped, 0);
        revGrad.addColorStop(0,   "rgba(58,134,255,0.55)");
        revGrad.addColorStop(0.45,"rgba(58,134,255,0.75)");
        revGrad.addColorStop(0.75,"rgba(0,200,230,0.80)");
        revGrad.addColorStop(1,   "rgba(0,245,212,0.70)");

        ctx.strokeStyle = revGrad;
        ctx.lineWidth   = 2.5;
        ctx.shadowColor = "rgba(58,134,255,0.60)";
        ctx.shadowBlur  = 14;
        ctx.stroke();
        ctx.shadowBlur  = 0;
      }

      // ── 3. Glowing highlight dot at the leading edge of the revealed portion ──
      const dotX = Math.min(scrollRevealPx, W);
      const dotPhase = ((dotX + autoOffset) % PERIOD) / PERIOD;
      const dotY = centerY + ecgSample(dotPhase) * AMPLITUDE;

      // Outer glow ring
      const outerRadius = 14;
      const outerGrad = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, outerRadius);
      outerGrad.addColorStop(0, "rgba(58,134,255,0.45)");
      outerGrad.addColorStop(1, "rgba(58,134,255,0.00)");
      ctx.beginPath();
      ctx.arc(dotX, dotY, outerRadius, 0, Math.PI * 2);
      ctx.fillStyle = outerGrad;
      ctx.fill();

      // Inner bright core
      ctx.beginPath();
      ctx.arc(dotX, dotY, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "rgba(58,134,255,1)";
      ctx.shadowBlur  = 18;
      ctx.fill();
      ctx.shadowBlur  = 0;

      // Tiny bright ring around the core
      ctx.beginPath();
      ctx.arc(dotX, dotY, 5.5, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,230,255,0.9)";
      ctx.lineWidth   = 1.5;
      ctx.stroke();

      // Advance autonomous offset so the wave slowly drifts even when not scrolling
      autoOffset += AUTO_SPEED;

      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      {/* Canvas for the animated single ECG line */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Subtle dot-grid texture overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(58,134,255,0.07) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
          maskImage:
            "radial-gradient(ellipse 90% 90% at 50% 50%, black 0%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 90% at 50% 50%, black 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.5,
        }}
      />
    </>
  );
}
