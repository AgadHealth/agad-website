"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Eye, Lock, FileText, Calendar, CheckCircle } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="policy-wrapper">
      <Navbar solidBg />

      <main className="policy-main">
        {/* Aurora Background */}
        <div className="aurora-container" aria-hidden="true">
          <div className="aurora-effect" />
        </div>

        <section className="policy-hero">
          <div className="policy-hero-content">
            <div className="policy-icon-badge">
              <Shield size={24} className="icon-gradient" />
            </div>
            <h1 className="policy-title">Privacy Policy</h1>
            <p className="policy-subtitle">
              Agad Health | Effective Date: 05-07-2026
            </p>
          </div>
        </section>

        <section className="policy-content-section">
          <div className="policy-card glass">
            <div className="policy-intro">
              <p>
                Agad operates a patient-controlled health record platform. Agad is not a hospital, clinic, telemedicine service, or healthcare provider, and does not practice medicine, render medical advice, or provide diagnosis or treatment of any kind.
              </p>
            </div>

            <div className="policy-section">
              <h2>1. Information We Collect</h2>
              <p>
                We collect identity and contact details, health records you or your treating provider upload (such as prescriptions, reports, and vitals), and limited technical data required for account security.
              </p>
            </div>

            <div className="policy-section">
              <h2>2. How We Use Your Information</h2>
              <p>
                Your data is used solely to operate your health record account, enable consent-based sharing with healthcare providers you select, verify provider credentials, and comply with applicable law. We do not use health data for advertising, and we do not sell personal data under any circumstances.
              </p>
            </div>

            <div className="policy-section">
              <h2>3. Ownership and Control</h2>
              <p>
                You remain the sole owner of your health records at all times. Agad acts only as a custodian and consent-management facilitator.
              </p>
            </div>

            <div className="policy-section">
              <h2>4. Consent-Based Access</h2>
              <p>
                No healthcare provider may access your records without your explicit, purpose-specific, and time-bound consent. You may approve, modify, or revoke that consent at any time, and every access event is logged for your review.
              </p>
            </div>

            <div className="policy-section">
              <h2>5. Security</h2>
              <p>
                Data is encrypted both at rest and in transit, and access is protected through role-based controls and multi-factor authentication. No system can guarantee absolute security, and Agad makes no representation to the contrary.
              </p>
            </div>

            <div className="policy-section">
              <h2>6. Your Rights</h2>
              <p>
                You are entitled to access, correction, deletion, and export of your data, and may raise a grievance with our designated Grievance Officer, with a right of escalation to the Data Protection Board of India.
              </p>
            </div>

            <div className="policy-section">
              <h2>7. Governing Law</h2>
              <p>
                This Policy is governed by Indian law, including the Digital Personal Data Protection Act, 2023.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .policy-wrapper {
          --primary-navy: #0f172a;
          --secondary-blue: #0284c7;
          --text-gradient: linear-gradient(135deg, #0f172a 20%, #1e4e79 60%, #0284c7 100%);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background-color: var(--bg-main);
          position: relative;
        }

        .policy-main {
          flex: 1;
          position: relative;
          z-index: 1;
          padding-top: 68px; /* Offset for fixed navbar */
        }

        .aurora-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: -1;
        }

        .aurora-effect {
          --white: #fff;
          --black: #000;
          --transparent: transparent;
          --blue-500: #0284c7;
          --indigo-300: #7dd3fc;
          --blue-300: #38bdf8;
          --violet-200: #e0f2fe;
          --blue-400: #0ea5e9;

          --white-gradient: repeating-linear-gradient(100deg, var(--white) 0%, var(--white) 7%, var(--transparent) 10%, var(--transparent) 12%, var(--white) 16%);
          --aurora: repeating-linear-gradient(100deg, var(--blue-500) 10%, var(--indigo-300) 15%, var(--blue-300) 20%, var(--violet-200) 25%, var(--blue-400) 30%);

          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          opacity: 0.3;
          will-change: transform;
          filter: blur(10px) invert(1);
          background-image: var(--white-gradient), var(--aurora);
          background-size: 300% 200%;
          background-position: 50% 50%, 50% 50%;
          
          -webkit-mask-image: radial-gradient(ellipse at 100% 0%, black 10%, transparent 70%);
          mask-image: radial-gradient(ellipse at 100% 0%, black 10%, transparent 70%);
        }

        .aurora-effect::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: var(--white-gradient), var(--aurora);
          background-size: 200% 100%;
          background-attachment: fixed;
          mix-blend-mode: difference;
          animation: aurora 60s linear infinite;
        }

        @keyframes aurora {
          from {
            background-position: 50% 50%, 50% 50%;
          }
          to {
            background-position: 350% 50%, 350% 50%;
          }
        }

        .policy-hero {
          padding: 80px 24px 40px;
          text-align: center;
        }

        .policy-hero-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .policy-icon-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: rgba(14, 165, 233, 0.08);
          border: 1px solid rgba(14, 165, 233, 0.15);
          margin-bottom: 24px;
        }

        .policy-title {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 16px;
          background: var(--text-gradient);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .policy-subtitle {
          font-size: 1.15rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .policy-content-section {
          padding: 0 24px 120px;
          display: flex;
          justify-content: center;
        }

        .policy-card {
          width: 100%;
          max-width: 900px;
          border-radius: var(--radius-lg);
          padding: 60px;
          display: flex;
          flex-direction: column;
          gap: 40px;
          box-shadow: var(--shadow-lg);
        }

        .policy-section h2 {
          font-size: 1.5rem;
          color: var(--primary-navy);
          margin-bottom: 16px;
          font-weight: 700;
        }

        .policy-section p {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 12px;
        }

        .policy-list {
          padding-left: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .policy-list li {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.7;
        }

        .policy-list strong {
          color: var(--primary-navy);
        }

        .security-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-top: 20px;
        }

        .security-feature {
          background: rgba(255, 255, 255, 0.4);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 20px;
          display: flex;
          gap: 16px;
        }

        .feature-icon {
          color: var(--secondary-blue);
          flex-shrink: 0;
          margin-top: 3px;
        }

        .security-feature strong {
          display: block;
          color: var(--primary-navy);
          margin-bottom: 4px;
        }

        .security-feature div {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .contact-details {
          background: rgba(14, 165, 233, 0.04);
          border: 1px dashed rgba(14, 165, 233, 0.2);
          border-radius: var(--radius-md);
          padding: 24px;
          margin-top: 16px;
        }

        .contact-details p {
          margin-bottom: 8px;
        }
        
        .contact-details p:last-child {
          margin-bottom: 0;
        }

        .contact-details a {
          color: var(--secondary-blue);
          text-decoration: none;
          font-weight: 500;
        }

        .contact-details a:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .policy-title {
            font-size: 2.25rem;
          }

          .policy-card {
            padding: 30px 20px;
          }

          .security-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
