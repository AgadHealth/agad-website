"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar-header ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <a href="#hero" className="navbar-logo">
          <img src="/logo.png" alt="Agad logo" className="logo-img" />
          <span className="logo-text">Agad</span>
        </a>

        <nav className="navbar-links">
          <a href="#features" className="nav-link">Features</a>
          <a href="#showcase" className="nav-link">Showcase</a>
          <a href="#how-it-works" className="nav-link">How It Works</a>
        </nav>

        <div className="navbar-actions">
          <a href="#download" className="btn nav-btn-primary">
            Get Agad
          </a>
        </div>
      </div>
      
      <style jsx>{`
        .navbar-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 72px;
          display: flex;
          align-items: center;
          z-index: 1000;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          background: transparent;
          border-bottom: 1px solid transparent;
        }
        
        .navbar-header.scrolled {
          height: 64px;
          background: rgba(255, 255, 255, 0.82);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(226, 232, 240, 0.7);
          box-shadow: 0 4px 24px rgba(13, 30, 61, 0.04);
        }
        
        .navbar-container {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding: 0 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }
        
        .logo-img {
          width: 38px;
          height: 38px;
          object-fit: contain;
          display: block;
          /* PNG is already circular — no border-radius needed */
          transition: transform 0.3s ease, filter 0.3s ease;
          filter: drop-shadow(0 2px 8px rgba(13, 30, 61, 0.15));
        }

        .navbar-logo:hover .logo-img {
          transform: translateY(-1px);
          filter: drop-shadow(0 6px 16px rgba(13, 30, 61, 0.22));
        }
        
        .logo-text {
          font-size: 1.35rem;
          font-weight: 800;
          color: #0d1e3d;
          letter-spacing: -0.5px;
        }
        
        .navbar-links {
          display: flex;
          align-items: center;
          gap: 36px;
        }
        
        .nav-link {
          color: #475569;
          font-size: 0.92rem;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.2s ease;
          padding: 4px 0;
          letter-spacing: -0.01em;
        }
        
        .nav-link:hover {
          color: #0d1e3d;
        }

        /* Button */
        .nav-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 22px;
          border-radius: 999px;
          font-size: 0.88rem;
          font-weight: 700;
          text-decoration: none;
          letter-spacing: -0.01em;
          background: linear-gradient(135deg, #6366f1 0%, #4f46e5 60%, #3730a3 100%);
          color: white;
          border: none;
          cursor: pointer;
          transition: transform 0.22s ease, box-shadow 0.22s ease, opacity 0.22s ease;
          box-shadow: 0 4px 16px rgba(99, 102, 241, 0.3);
          position: relative;
          overflow: hidden;
        }

        .nav-btn-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        
        .nav-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(99, 102, 241, 0.45);
        }

        .nav-btn-primary:hover::after {
          opacity: 1;
        }
        
        @media (max-width: 768px) {
          .navbar-links {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
