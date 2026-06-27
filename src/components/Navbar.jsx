"use client";

import { useEffect, useState, useRef } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!mobileOpen) return;
    const close = () => setMobileOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [mobileOpen]);

  return (
    <header className={`navbar-header ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">

        {/* Logo */}
        <a href="#hero" className="navbar-logo">
          {/* Clip wrapper cuts away the white square corners of the PNG */}
          <div className="logo-clip">
            <img src="/logo.png" alt="Agad logo" className="logo-img" />
          </div>
          <span className="logo-text">Agad</span>
        </a>

        {/* Desktop nav links */}
        <nav className="navbar-links" aria-label="Main navigation">
          <a href="#features"    className="nav-link">Features</a>
          <a href="#showcase"    className="nav-link">Showcase</a>
          <a href="#how-it-works" className="nav-link">How It Works</a>
        </nav>

        {/* CTA */}
        <div className="navbar-actions">
          <a href="#download" className="nav-cta">
            Get Agad
          </a>

          {/* Mobile hamburger */}
          <button
            className="hamburger"
            aria-label="Toggle menu"
            onClick={(e) => { e.stopPropagation(); setMobileOpen(v => !v); }}
          >
            <span className={`ham-line ${mobileOpen ? "open" : ""}`} />
            <span className={`ham-line ${mobileOpen ? "open" : ""}`} />
            <span className={`ham-line ${mobileOpen ? "open" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="mobile-menu" onClick={e => e.stopPropagation()}>
          <a href="#features"     className="mobile-link" onClick={() => setMobileOpen(false)}>Features</a>
          <a href="#showcase"     className="mobile-link" onClick={() => setMobileOpen(false)}>Showcase</a>
          <a href="#how-it-works" className="mobile-link" onClick={() => setMobileOpen(false)}>How It Works</a>
          <a href="#download"     className="mobile-cta"  onClick={() => setMobileOpen(false)}>Get Agad</a>
        </div>
      )}

      <style jsx>{`
        /* ══════════════════════════════════════════
           NAVBAR HEADER
        ══════════════════════════════════════════ */
        .navbar-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 68px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          z-index: 1000;
          transition:
            background 0.4s cubic-bezier(0.16, 1, 0.3, 1),
            border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1),
            height 0.3s cubic-bezier(0.16, 1, 0.3, 1);

          /* Default: fully transparent — sits on dark hero */
          background: transparent;
          border-bottom: 1px solid transparent;
        }

        /*
          Scrolled state: frosted dark-blue glass panel.
          Matches the hero's dark blue palette rather than snapping to white.
        */
        .navbar-header.scrolled {
          height: 60px;
          background: rgba(20, 48, 74, 0.72);
          backdrop-filter: blur(22px) saturate(160%);
          -webkit-backdrop-filter: blur(22px) saturate(160%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.10);
          box-shadow: 0 4px 28px rgba(10, 25, 47, 0.22);
        }

        /* ══════════════════════════════════════════
           CONTAINER
        ══════════════════════════════════════════ */
        .navbar-container {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding: 0 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        /* ══════════════════════════════════════════
           LOGO
        ══════════════════════════════════════════ */
        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }

        /* Circular clip — hides the white square corners of the PNG */
        .logo-clip {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.22);
        }

        .navbar-logo:hover .logo-clip {
          transform: translateY(-1px) scale(1.04);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.30);
        }

        .logo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          /* Scale up slightly so the circular logo fills the clip area edge-to-edge */
          transform: scale(1.06);
        }

        .logo-text {
          font-size: 1.32rem;
          font-weight: 800;
          /* White on dark hero; stays white since we use frosted-dark on scroll */
          color: #ffffff;
          letter-spacing: -0.5px;
          text-shadow: 0 1px 8px rgba(0, 0, 0, 0.18);
        }

        /* ══════════════════════════════════════════
           DESKTOP NAV LINKS
        ══════════════════════════════════════════ */
        .navbar-links {
          display: flex;
          align-items: center;
          gap: 38px;
        }

        .nav-link {
          /* Slightly transparent white — readable on dark hero, still visible on scroll */
          color: rgba(255, 255, 255, 0.82);
          font-size: 0.90rem;
          font-weight: 500;
          text-decoration: none;
          letter-spacing: -0.01em;
          position: relative;
          padding: 4px 0;
          transition: color 0.2s ease;
        }

        /* Underline slide-in on hover */
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 0;
          height: 1.5px;
          background: rgba(255, 255, 255, 0.65);
          border-radius: 2px;
          transition: width 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .nav-link:hover {
          color: #ffffff;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        /* ══════════════════════════════════════════
           CTA BUTTON — white outlined pill
           Matches Fintpay "Try For Free" style exactly
        ══════════════════════════════════════════ */
        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }

        .nav-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 9px 22px;
          border-radius: 999px;
          font-size: 0.88rem;
          font-weight: 700;
          text-decoration: none;
          letter-spacing: -0.01em;
          /* White outlined pill — same as Fintpay "Try For Free" */
          background: rgba(255, 255, 255, 0.14);
          border: 1.5px solid rgba(255, 255, 255, 0.65);
          color: #ffffff;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          transition:
            background 0.22s ease,
            border-color 0.22s ease,
            transform 0.22s ease,
            box-shadow 0.22s ease;
          position: relative;
          overflow: hidden;
        }

        .nav-cta::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.22s ease;
        }

        .nav-cta:hover {
          background: rgba(255, 255, 255, 0.24);
          border-color: rgba(255, 255, 255, 0.9);
          transform: translateY(-2px);
          box-shadow: 0 6px 22px rgba(0, 0, 0, 0.18);
        }

        .nav-cta:hover::after { opacity: 1; }

        /* ══════════════════════════════════════════
           HAMBURGER
        ══════════════════════════════════════════ */
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          width: 36px;
          height: 36px;
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.22);
          border-radius: 10px;
          cursor: pointer;
          padding: 0;
          transition: background 0.2s ease;
        }

        .hamburger:hover { background: rgba(255,255,255,0.18); }

        .ham-line {
          display: block;
          width: 18px;
          height: 1.5px;
          background: #fff;
          border-radius: 2px;
          transition: transform 0.3s ease, opacity 0.3s ease;
          transform-origin: center;
        }

        .ham-line.open:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .ham-line.open:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .ham-line.open:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* ══════════════════════════════════════════
           MOBILE DROPDOWN
        ══════════════════════════════════════════ */
        .mobile-menu {
          background: rgba(16, 40, 62, 0.96);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-top: 1px solid rgba(255,255,255,0.10);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding: 16px 24px 20px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.28);
          animation: menuSlide 0.22s cubic-bezier(0.16,1,0.3,1) forwards;
        }

        @keyframes menuSlide {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .mobile-link {
          color: rgba(255,255,255,0.82);
          font-size: 0.96rem;
          font-weight: 500;
          text-decoration: none;
          padding: 12px 8px;
          border-radius: 10px;
          transition: background 0.18s ease, color 0.18s ease;
          letter-spacing: -0.01em;
        }

        .mobile-link:hover {
          background: rgba(255,255,255,0.08);
          color: #fff;
        }

        .mobile-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-top: 8px;
          padding: 12px 24px;
          border-radius: 999px;
          background: rgba(255,255,255,0.12);
          border: 1.5px solid rgba(255,255,255,0.55);
          color: #fff;
          font-size: 0.92rem;
          font-weight: 700;
          text-decoration: none;
          transition: background 0.2s ease;
        }

        .mobile-cta:hover { background: rgba(255,255,255,0.22); }

        /* ══════════════════════════════════════════
           RESPONSIVE
        ══════════════════════════════════════════ */
        @media (max-width: 768px) {
          .navbar-links { display: none; }
          .hamburger { display: flex; }
          .nav-cta { display: none; }
          .navbar-container { padding: 0 20px; }
        }
      `}</style>
    </header>
  );
}
