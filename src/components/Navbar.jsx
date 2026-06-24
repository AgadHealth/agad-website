"use client";

import { useEffect, useState } from "react";
import { Activity } from "lucide-react";

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
          <div className="logo-icon-bg">
            <Activity className="logo-icon" size={22} />
          </div>
          <span className="logo-text">Agad</span>
        </a>

        <nav className="navbar-links">
          <a href="#features" className="nav-link">Features</a>
          <a href="#showcase" className="nav-link">Showcase</a>
          <a href="#how-it-works" className="nav-link">How It Works</a>
        </nav>

        <div className="navbar-actions">
          <a href="#download" className="btn btn-primary nav-btn">
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
          height: 80px;
          display: flex;
          align-items: center;
          z-index: 1000;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          background: transparent;
          border-bottom: 1px solid transparent;
        }
        
        .navbar-header.scrolled {
          height: 70px;
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(226, 232, 240, 0.8);
          box-shadow: 0 4px 20px rgba(13, 30, 61, 0.03);
        }
        
        .navbar-container {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding: 0 24px;
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
        
        .logo-icon-bg {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: #0d1e3d; /* dark blue circle from logo */
          color: #00e5ff; /* light blue/cyan heartbeat */
          box-shadow: 0 4px 12px rgba(13, 30, 61, 0.15);
        }
        
        .logo-text {
          font-size: 1.4rem;
          font-weight: 800;
          color: #0d1e3d;
          letter-spacing: -0.5px;
        }
        
        .navbar-links {
          display: flex;
          align-items: center;
          gap: 32px;
        }
        
        .nav-link {
          color: #475569;
          font-size: 0.95rem;
          font-weight: 500;
          transition: color 0.2s ease;
          position: relative;
          padding: 6px 0;
        }
        
        .nav-link:hover {
          color: #0066ff;
        }
        
        .nav-link::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, #0066ff, #00e5ff);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s ease;
        }
        
        .nav-link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }
        
        .nav-btn {
          font-size: 0.9rem;
          padding: 10px 22px;
        }
        
        @media (max-width: 768px) {
          .navbar-links {
            display: none; /* simple responsive: hide nav links on mobile */
          }
        }
      `}</style>
    </header>
  );
}
