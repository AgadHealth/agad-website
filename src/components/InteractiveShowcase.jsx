"use client";

import { useState } from "react";
import IPhoneMockup from "./IPhoneMockup";
import { Activity, ShieldAlert, Heart, Eye, ChevronRight } from "lucide-react";

export default function InteractiveShowcase() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const tabsInfo = {
    dashboard: {
      title: "Real-time Health Dashboard",
      subtitle: "Track Your Daily Vitals",
      description: "Get a comprehensive view of your active physiological indicators. Our dashboard aggregates steps, heart rate metrics, and oxygen levels seamlessly.",
      bulletPoints: [
        "Live heartbeat analyzer with dynamic graphical representation.",
        "Automatic notifications when blood pressure or pulse levels fluctuate.",
        "Integrates with major wearable health tech and smart sensors."
      ]
    },
    consult: {
      title: "Virtual Doctor's Clinic",
      subtitle: "Telemedicine Redefined",
      description: "Consult qualified, vetted cardiologists, mental health specialists, and general physicians instantly from the comfort of your living room.",
      bulletPoints: [
        "In-app high-definition video calls that simulate a physical clinic visit.",
        "Instant consultation queue showing doctor online statuses.",
        "Direct digital prescriptions sent straight to your device."
      ]
    },
    records: {
      title: "Smart Reminders & Prescriptions",
      subtitle: "Never Miss a Dosage",
      description: "Manage your active treatments, medications, and clinical appointments with a contextual, automated reminder list.",
      bulletPoints: [
        "Automatic tracking of medication compliance ratios (e.g. 2 of 3 taken).",
        "Configurable notification schedules with custom alerts.",
        "Future diagnostic test check-ups logged into your health calendar."
      ]
    }
  };

  const currentTab = tabsInfo[activeTab];

  return (
    <section id="showcase" className="showcase-section">
      {/* Background glowing shape */}
      <div className="glow-backdrop animate-pulse-slow"></div>

      <div className="showcase-layout">
        {/* Left side: Text and tab triggers */}
        <div className="showcase-content">
          <span className="section-subtitle">App Experience</span>
          <h2 className="section-title text-gradient">Explore the Agad app</h2>
          <p className="section-description">
            Experience our fluid, intuitive mobile layout. Select an option below to test drive the app features.
          </p>

          <div className="tabs-container">
            <button 
              className={`tab-btn ${activeTab === "dashboard" ? "active" : ""}`}
              onClick={() => setActiveTab("dashboard")}
            >
              <div className="tab-indicator"></div>
              <div className="tab-meta">
                <span className="tab-label">01. Live Vitals</span>
                <span className="tab-name">Health Dashboard</span>
              </div>
            </button>

            <button 
              className={`tab-btn ${activeTab === "consult" ? "active" : ""}`}
              onClick={() => setActiveTab("consult")}
            >
              <div className="tab-indicator"></div>
              <div className="tab-meta">
                <span className="tab-label">02. Consultations</span>
                <span className="tab-name">On-Demand Doctors</span>
              </div>
            </button>

            <button 
              className={`tab-btn ${activeTab === "records" ? "active" : ""}`}
              onClick={() => setActiveTab("records")}
            >
              <div className="tab-indicator"></div>
              <div className="tab-meta">
                <span className="tab-label">03. Treatment Plans</span>
                <span className="tab-name">Pill Reminders & Vitals</span>
              </div>
            </button>
          </div>

          <div className="tab-details-box animate-fade">
            <span className="detail-tagline">{currentTab.subtitle}</span>
            <h3 className="detail-title">{currentTab.title}</h3>
            <p className="detail-description">{currentTab.description}</p>
            
            <ul className="bullet-list">
              {currentTab.bulletPoints.map((point, index) => (
                <li key={index} className="bullet-item">
                  <div className="bullet-dot">✓</div>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right side: iPhone 3D mockup */}
        <div className="showcase-visual">
          <IPhoneMockup activeScreen={activeTab} />
        </div>
      </div>

      <style jsx>{`
        .showcase-section {
          width: 100%;
          position: relative;
          overflow: visible;
          padding-top: 100px;
          padding-bottom: 100px;
        }

        .glow-backdrop {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(var(--secondary-blue-rgb), 0.08) 0%, rgba(var(--accent-cyan-rgb), 0.03) 70%, transparent 100%);
          right: -150px;
          top: 100px;
          pointer-events: none;
          z-index: 0;
        }

        .showcase-layout {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 64px;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .showcase-content {
          display: flex;
          flex-direction: column;
        }

        .section-subtitle {
          color: var(--secondary-blue);
          font-weight: 700;
          font-size: 0.95rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          display: block;
          margin-bottom: 14px;
        }

        .section-title {
          font-size: 2.8rem;
          font-weight: 800;
          margin-bottom: 20px;
          letter-spacing: -0.02em;
        }

        .section-description {
          color: var(--text-secondary);
          font-size: 1.15rem;
          line-height: 1.65;
          margin-bottom: 44px;
        }

        .tabs-container {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 44px;
        }

        .tab-btn {
          display: flex;
          align-items: center;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 18px 24px;
          border-radius: var(--radius-md);
          text-align: left;
          transition: all var(--transition-smooth);
          border: 1px solid transparent;
          gap: 20px;
        }

        .tab-btn:hover {
          background: rgba(255, 255, 255, 0.45);
          border-color: rgba(226, 232, 240, 0.5);
        }

        .tab-btn.active {
          background: white;
          border-color: rgba(var(--secondary-blue-rgb), 0.15);
          box-shadow: var(--shadow-md), 0 10px 30px rgba(var(--secondary-blue-rgb), 0.02);
        }

        .tab-indicator {
          width: 4px;
          height: 36px;
          border-radius: 99px;
          background: #e2e8f0;
          transition: all var(--transition-smooth);
        }

        .tab-btn.active .tab-indicator {
          background: var(--brand-gradient);
          height: 44px;
          box-shadow: 0 0 8px rgba(var(--secondary-blue-rgb), 0.4);
        }

        .tab-meta {
          display: flex;
          flex-direction: column;
        }

        .tab-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }

        .tab-name {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--primary-navy);
          margin-top: 3px;
        }

        /* Detail Box */
        .tab-details-box {
          background: var(--bg-glass-card);
          border-radius: var(--radius-lg);
          padding: 32px;
          border: 1px solid var(--border-color);
          min-height: 260px;
          box-shadow: var(--shadow-sm);
        }

        .detail-tagline {
          color: var(--secondary-blue);
          font-weight: 700;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          display: block;
          margin-bottom: 8px;
        }

        .detail-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary-navy);
          margin-bottom: 14px;
          letter-spacing: -0.01em;
        }

        .detail-description {
          color: var(--text-secondary);
          font-size: 1rem;
          line-height: 1.65;
          margin-bottom: 24px;
        }

        .bullet-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .bullet-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          font-size: 0.95rem;
          color: var(--text-primary);
        }

        .bullet-dot {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgba(var(--secondary-blue-rgb), 0.08);
          color: var(--secondary-blue);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: bold;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .showcase-visual {
          display: flex;
          justify-content: center;
        }

        @keyframes fade {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade {
          animation: fade 0.4s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        @media (max-width: 992px) {
          .showcase-layout {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          
          .showcase-visual {
            order: -1;
          }
        }

        /* ───── Mobile-first redesign (≤ 640px) ───── */
        @media (max-width: 640px) {
          /* Hide phone mockup entirely on mobile */
          .showcase-visual {
            display: none;
          }

          .section-title {
            font-size: 2.1rem;
          }

          .section-description {
            font-size: 1rem;
            margin-bottom: 28px;
          }

          /* Pill chip tab strip — horizontal scroll */
          .tabs-container {
            flex-direction: row;
            overflow-x: auto;
            scrollbar-width: none;
            gap: 10px;
            margin-bottom: 28px;
            padding-bottom: 4px;
          }
          .tabs-container::-webkit-scrollbar { display: none; }

          .tab-btn {
            flex-direction: row;
            flex-shrink: 0;
            padding: 10px 18px;
            border-radius: 999px;
            gap: 8px;
            background: rgba(226,232,240,0.4);
            border: 1.5px solid transparent;
          }

          .tab-btn.active {
            background: rgba(58,134,255,0.08);
            border-color: rgba(58,134,255,0.28);
            box-shadow: none;
          }

          /* Hide the vertical indicator bar inside each pill */
          .tab-indicator { display: none; }

          /* Show only the short label inside the pill */
          .tab-label {
            font-size: 0.8rem;
            color: var(--primary-navy);
            text-transform: none;
            letter-spacing: 0;
          }

          .tab-btn.active .tab-label {
            color: var(--secondary-blue);
          }

          /* Hide the long name in pill mode */
          .tab-name { display: none; }

          /* Content card: minimal border, no min-height */
          .tab-details-box {
            padding: 24px 22px;
            border-radius: 18px;
            min-height: unset;
            background: white;
            box-shadow: 0 4px 24px rgba(11,19,43,0.07);
          }

          .detail-title {
            font-size: 1.25rem;
          }

          .detail-description {
            font-size: 0.93rem;
            margin-bottom: 18px;
          }

          .bullet-item {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </section>
  );
}
