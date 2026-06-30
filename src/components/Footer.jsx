"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const LAUNCH_DATE = new Date("2026-09-01T00:00:00");

function useCountdown(target) {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    function calc() {
      const diff = Math.max(0, target - new Date());
      setT({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export default function Footer() {
  const { days, hours, minutes, seconds } = useCountdown(LAUNCH_DATE);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  return (
    <footer id="download" className="footer">
      {/* Main Footer Links & Info */}
      <div className="footer-links-container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-clip">
                <img src="/logo.png" alt="Agad logo" className="footer-logo-img" />
              </div>
              <span className="logo-text">Agad</span>
            </div>
            <p className="brand-tagline">
              Your health, in your hands. Agad connects you to certified doctors, tracks your vitals, and keeps you on schedule — all from one clean app.
            </p>
          </div>

          {/* Site Sections */}
          <div className="footer-column">
            <h4>Application</h4>
            <a href="#features">Features</a>
            <a href="#showcase">Waitlist</a>
            <a href="#how-it-works">How It Works</a>
          </div>

          {/* Legal / Policy */}
          <div className="footer-column">
            <h4>Trust & Privacy</h4>
            <a href="#download">Security Compliance</a>
            <a href="#download">Privacy Policy</a>
            <a href="#download">Terms of Service</a>
          </div>

          {/* Contact */}
          <div className="footer-column">
            <h4>Contact Info</h4>
            <a href="mailto:reach.agad@gmail.com" className="contact-item"><Mail size={14} /> reach.agad@gmail.com</a>
            <a href="https://maps.google.com/?q=Bhubaneswar,India" target="_blank" rel="noopener noreferrer" className="contact-item"><MapPin size={14} /> Bhubaneswar, India</a>
            <a href="tel:+919876543210" className="contact-item"><Phone size={14} /> +91 98765 43210</a>
          </div>
        </div>

        {/* Bottom row copyrights */}
        <div className="footer-bottom">
          <p>© 2026 Agad Health. All rights reserved.</p>
          <div className="social-links">
            <a href="https://linkedin.com/company/agadhealth" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://instagram.com/agad.health" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          width: 100%;
          background: #071124;
          color: white;
          position: relative;
          z-index: 1;
        }

        /* Footer Links */
        .footer-links-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 24px 60px;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          gap: 40px;
          padding-bottom: 60px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* Circular clip — removes the white square corners of the PNG on the dark footer */
        .footer-logo-clip {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
        }

        .footer-logo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.06);
        }

        .footer-logo .logo-text {
          font-size: 1.4rem;
          font-weight: 800;
          color: white;
        }

        .brand-tagline {
          color: #94a3b8;
          font-size: 0.92rem;
          line-height: 1.65;
          max-width: 300px;
        }

        .footer-column {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .footer-column h4 {
          color: white;
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 6px;
        }

        .footer-column a {
          color: #94a3b8;
          font-size: 0.9rem;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer-column a:hover {
          color: #a5b4fc;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #94a3b8;
          font-size: 0.9rem;
          text-decoration: none;
          transition: color 0.2s ease;
          cursor: pointer;
        }

        .contact-item:hover {
          color: #a5b4fc;
        }

        /* Bottom Row */
        .footer-bottom {
          padding-top: 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
          color: #64748b;
          font-size: 0.85rem;
        }

        .social-links {
          display: flex;
          gap: 24px;
        }

        .social-links a {
          color: #64748b;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .social-links a:hover {
          color: #a5b4fc;
        }

        @media (max-width: 992px) {
          .download-cta-banner {
            flex-direction: column;
            padding: 40px;
            align-items: stretch;
            transform: translateY(-30px);
            margin: 0 20px;
          }

          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 30px;
          }
        }

        @media (max-width: 576px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
          .download-cta-banner {
            padding: 32px 24px;
          }
          .cta-title {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </footer>
  );
}
