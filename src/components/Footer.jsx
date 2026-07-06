"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer id="download" className="footer">
      {/* Background decoration matching hero section */}
      <div className="footer-bg" aria-hidden="true">
        <div className="footer-bg-glow" />
        <div className="footer-bg-dots" />
      </div>

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
              Your health, in your hands. Agad stores your medical records, lets you share them with any doctor in seconds, and keeps every access consent-verified, all from one secure app.
            </p>
          </div>

          {/* Site Sections */}
          <div className="footer-column">
            <h4>Application</h4>
            <Link href="/#features" legacyBehavior><a>Features</a></Link>
            <Link href="/#waitlist" legacyBehavior><a>Waitlist</a></Link>
            <Link href="/#how-it-works" legacyBehavior><a>How It Works</a></Link>
          </div>

          {/* Legal / Policy */}
          <div className="footer-column">
            <h4>Trust & Privacy</h4>
            <Link href="/privacy" legacyBehavior><a>Privacy Policy</a></Link>
            <Link href="/terms" legacyBehavior><a>Terms of Service</a></Link>
          </div>

          {/* Contact */}
          <div className="footer-column">
            <h4>Contact Info</h4>
            <a href="mailto:reach.agad@gmail.com" className="contact-item"><Mail size={14} /> reach.agad@gmail.com</a>
            <a href="https://maps.google.com/?q=Bhubaneswar,India" target="_blank" rel="noopener noreferrer" className="contact-item"><MapPin size={14} /> Bhubaneswar, India</a>
            <a href="tel:+919876543210" className="contact-item"><Phone size={14} /> +91 82876 13610</a>
          </div>
        </div>

        {/* Bottom row copyrights */}
        <div className="footer-bottom">
          <p>© 2026 Agad Health. All rights reserved.</p>
          <div className="social-links">
            <a href="https://www.linkedin.com/company/reachagad/posts/?feedView=all" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://www.instagram.com/reach.agad?igsh=MW5kNTIwZzl6Y3BpdQ==" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          width: 100%;
          background: linear-gradient(
            180deg,
            #f8fafc 0%,
            #cfdfef 15%,
            #6b94c0 35%,
            #204d7c 55%,
            #0b132b 75%,
            #071124 100%
          );
          color: #334155;
          position: relative;
          z-index: 1;
          overflow: hidden;
        }

        .footer-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .footer-bg-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 150% 120% at 50% 100%,
            rgba(58, 134, 255, 0.65) 0%,
            rgba(14, 165, 233, 0.35) 50%,
            transparent 90%
          );
        }

        .footer-bg-dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
          background-size: 38px 38px;
          -webkit-mask-image: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 80%);
          mask-image: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 80%);
        }

        /* Footer Links */
        .footer-links-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 240px 24px 50px;
          position: relative;
          z-index: 1;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          gap: 40px;
          padding-bottom: 60px;
          border-bottom: 1px solid rgba(148, 163, 184, 0.25);
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
          color: #0b132b;
        }

        .brand-tagline {
          color: #ffffff;
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
          color: #0b132b;
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 6px;
        }

        .footer-column a {
          color: #ffffff;
          font-size: 0.9rem;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer-column a:hover {
          color: #00f5d4;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #ffffff;
          font-size: 0.9rem;
          text-decoration: none;
          transition: color 0.2s ease;
          cursor: pointer;
        }

        .contact-item:hover {
          color: #00f5d4;
        }

        .footer-bottom {
          padding-top: 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
          font-size: 0.85rem;
        }

        .footer-bottom p {
          color: #ffffff;
          margin: 0;
        }

        .social-links {
          display: flex;
          gap: 24px;
        }

        .social-links a {
          color: #ffffff;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .social-links a:hover {
          color: #00f5d4;
        }

        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: 1.25fr 0.75fr;
            gap: 35px;
          }
          .footer-brand {
            grid-column: span 2;
          }
          .footer-column:last-child {
            grid-column: span 2;
            align-items: center;
            text-align: center;
            margin-top: 20px;
            transform: translateX(-25px);
          }
          .footer-column:last-child .contact-item {
            justify-content: center;
            width: 100%;
          }
        }

        @media (max-width: 576px) {
          .footer-grid {
            grid-template-columns: 1.25fr 0.75fr;
            gap: 30px 15px;
          }
          .footer-brand {
            grid-column: span 2;
          }
          .footer-column:last-child {
            grid-column: span 2;
            margin-top: 25px;
            align-items: center;
            text-align: center;
            transform: translateX(-25px);
          }
          .footer-column:last-child .contact-item {
            justify-content: center;
            width: 100%;
          }
          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
