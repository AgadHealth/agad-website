"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, Scale, HelpCircle, CheckCircle, AlertTriangle } from "lucide-react";

export default function TermsAndConditions() {
  return (
    <div className="terms-wrapper">
      <Navbar solidBg />

      <main className="terms-main">
        {/* Background glow effects */}
        <div className="terms-bg" aria-hidden="true">
          <div className="terms-bg-glow" />
          <div className="terms-bg-dots" />
        </div>

        <section className="terms-hero">
          <div className="terms-hero-content">
            <div className="terms-icon-badge">
              <Scale size={24} className="icon-gradient" />
            </div>
            <h1 className="terms-title">Terms & Conditions</h1>
            <p className="terms-subtitle">
              Agad Health Technologies | Effective Date: 05-07-2026
            </p>
          </div>
        </section>

        <section className="terms-content-section">
          <div className="terms-card glass">
            <div className="terms-intro">
              <p>
                By accessing or using the Agad platform, you agree to be bound by these Terms in their entirety.
              </p>
            </div>

            <div className="terms-section">
              <h2>1. Nature of the Platform</h2>
              <p>
                Agad is a technology infrastructure provider that enables patients to store, manage, and share their health records with healthcare providers on a consent basis. Agad is not, and shall not be construed as, a hospital, clinic, or healthcare provider, and assumes no clinical responsibility of any kind.
              </p>
            </div>

            <div className="terms-section">
              <h2>2. Eligibility</h2>
              <p>
                Patients must be at least eighteen years of age, or must be a parent or lawful guardian acting on behalf of a minor. Healthcare providers must hold valid registration with the applicable State Medical Council or the National Medical Commission.
              </p>
            </div>

            <div className="terms-section">
              <h2>3. User Obligations</h2>
              <p>
                You are responsible for the accuracy of the information you provide, the confidentiality of your login credentials, and all activity conducted under your account. You may not misrepresent your identity, circumvent consent controls, or use the platform for any unlawful purpose.
              </p>
            </div>

            <div className="terms-section">
              <h2>4. Ownership of Records</h2>
              <p>
                You retain full ownership of your health records at all times. By uploading content, you grant Agad a limited license solely to store, host, and process that content in order to provide the service.
              </p>
            </div>

            <div className="terms-section">
              <h2>5. No Medical Advice</h2>
              <p>
                Nothing on the platform, including any AI-generated output, constitutes medical advice. Users experiencing a medical emergency must contact emergency services directly and must not rely on the platform.
              </p>
            </div>

            <div className="terms-section">
              <h2>6. Liability</h2>
              <p>
                The platform is provided on an &quot;as is&quot; basis. Agad&apos;s liability is limited to the maximum extent permitted under Indian law, and Agad bears no responsibility for clinical decisions made by any healthcare provider.
              </p>
            </div>

            <div className="terms-section">
              <h2>7. Amendments</h2>
              <p>
                Agad may revise these Terms from time to time. Material changes will be notified through the platform at least thirty days in advance.
              </p>
            </div>

            <div className="terms-section">
              <h2>8. Governing Law</h2>
              <p>
                These Terms are governed by the laws of India, and any dispute shall be subject to the exclusive jurisdiction of Indian courts.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .terms-wrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background-color: var(--bg-main);
          position: relative;
        }

        .terms-main {
          flex: 1;
          position: relative;
          z-index: 1;
          padding-top: 68px; /* Offset for fixed navbar */
        }

        .terms-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: -1;
          overflow: hidden;
        }

        .terms-bg-glow {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 1400px;
          height: 600px;
          background: radial-gradient(
            ellipse 80% 50% at 50% 0%,
            rgba(58, 134, 255, 0.15) 0%,
            rgba(0, 245, 212, 0.04) 50%,
            transparent 100%
          );
        }

        .terms-bg-dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(11, 19, 43, 0.03) 1px, transparent 1px);
          background-size: 30px 30px;
        }

        .terms-hero {
          padding: 80px 24px 40px;
          text-align: center;
        }

        .terms-hero-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .terms-icon-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: rgba(58, 134, 255, 0.08);
          border: 1px solid rgba(58, 134, 255, 0.15);
          margin-bottom: 24px;
        }

        .terms-title {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 16px;
          background: var(--text-gradient);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .terms-subtitle {
          font-size: 1.15rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .terms-content-section {
          padding: 0 24px 120px;
          display: flex;
          justify-content: center;
        }

        .terms-card {
          width: 100%;
          max-width: 900px;
          border-radius: var(--radius-lg);
          padding: 60px;
          display: flex;
          flex-direction: column;
          gap: 40px;
          box-shadow: var(--shadow-lg);
        }

        .terms-section h2 {
          font-size: 1.5rem;
          color: var(--primary-navy);
          margin-bottom: 16px;
          font-weight: 700;
        }

        .terms-section p {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 12px;
        }

        .terms-warning-box {
          background: rgba(239, 68, 68, 0.04);
          border: 1px solid rgba(239, 68, 68, 0.15);
          border-radius: var(--radius-md);
          padding: 20px;
          display: flex;
          gap: 16px;
          margin-top: 16px;
          color: var(--text-secondary);
        }

        .warning-icon {
          color: #ef4444;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .terms-warning-box strong {
          color: #b91c1c;
          display: block;
          margin-bottom: 4px;
        }

        .terms-list {
          padding-left: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .terms-list li {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.7;
        }

        .contact-details {
          background: rgba(58, 134, 255, 0.04);
          border: 1px dashed rgba(58, 134, 255, 0.2);
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
          .terms-title {
            font-size: 2.25rem;
          }

          .terms-card {
            padding: 30px 20px;
          }
        }
      `}</style>
    </div>
  );
}
