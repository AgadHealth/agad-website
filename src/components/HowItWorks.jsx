"use client";

import { Download, UserPlus, Heart } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <Download size={24} />,
      number: "01",
      title: "Download Agad",
      description:
        "Available on iOS and Android. Download the application using direct store buttons or scan our QR code.",
      color: "#3a86ff",
    },
    {
      icon: <UserPlus size={24} />,
      number: "02",
      title: "Establish Your Profile",
      description:
        "Enter your health vitals baseline and connect wearable fitness trackers for synchronized real-time health telemetry.",
      color: "#00b4d8",
    },
    {
      icon: <Heart size={24} />,
      number: "03",
      title: "Instant Care & Advice",
      description:
        "Launch direct consultations with specialists, set pill reminders, and receive insights about your cardiovascular indicators.",
      color: "#00f5d4",
    },
  ];

  return (
    <section id="how-it-works" className="how-it-works-section">
      <div className="section-header">
        <span className="section-subtitle">Simplified Onboarding</span>
        <h2 className="section-title text-gradient">Start in 3 Simple Steps</h2>
        <p className="section-description">
          Getting high-quality healthcare shouldn&apos;t be complicated. Here is how
          Agad keeps it straightforward.
        </p>
      </div>

      {/* Desktop 3-column layout */}
      <div className="steps-container">
        <div className="timeline-line" />
        {steps.map((step, idx) => (
          <div key={idx} className="step-card glass">
            <div className="step-indicator-row">
              <span className="step-number">{step.number}</span>
              <div className="step-icon-bg">{step.icon}</div>
            </div>
            <h3 className="step-card-title">{step.title}</h3>
            <p className="step-card-description">{step.description}</p>
          </div>
        ))}
      </div>

      {/* Mobile pill-timeline */}
      <div className="mobile-timeline">
        {steps.map((step, idx) => (
          <div key={idx} className="mt-row">
            {/* Left column: number badge + vertical connector */}
            <div className="mt-left">
              <div
                className="mt-badge"
                style={{
                  background: `linear-gradient(135deg, ${step.color}22, ${step.color}44)`,
                  borderColor: `${step.color}55`,
                  color: step.color,
                }}
              >
                {step.number}
              </div>
              {idx < steps.length - 1 && (
                <div
                  className="mt-connector"
                  style={{ background: `linear-gradient(to bottom, ${step.color}60, ${steps[idx + 1].color}40)` }}
                />
              )}
            </div>

            {/* Right column: pill card */}
            <div className="mt-card">
              <div className="mt-card-top">
                <div
                  className="mt-icon"
                  style={{
                    background: `${step.color}18`,
                    color: step.color,
                  }}
                >
                  {step.icon}
                </div>
                <h3 className="mt-title">{step.title}</h3>
              </div>
              <p className="mt-desc">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        /* ───── Section shell ───── */
        .how-it-works-section {
          width: 100%;
          position: relative;
          padding-top: 100px;
          padding-bottom: 100px;
        }

        .section-header {
          text-align: center;
          max-width: 650px;
          margin: 0 auto 70px;
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
        }

        /* ───── Desktop layout ───── */
        .steps-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          position: relative;
        }

        .timeline-line {
          position: absolute;
          top: 52px;
          left: 12%;
          right: 12%;
          height: 2px;
          background: linear-gradient(
            90deg,
            rgba(58, 134, 255, 0.1) 0%,
            rgba(58, 134, 255, 0.6) 50%,
            rgba(0, 245, 212, 0.2) 100%
          );
          z-index: 0;
        }

        .step-card {
          padding: 40px 32px;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-color);
          background: var(--bg-glass-card);
          position: relative;
          z-index: 1;
          transition: all var(--transition-smooth);
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-sm);
        }

        .step-card:hover {
          transform: translateY(-6px);
          background: white;
          box-shadow: var(--shadow-lg),
            0 10px 30px rgba(var(--secondary-blue-rgb), 0.03);
          border-color: rgba(var(--secondary-blue-rgb), 0.2);
        }

        .step-indicator-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 28px;
        }

        .step-number {
          font-size: 2.8rem;
          font-weight: 800;
          color: rgba(var(--secondary-blue-rgb), 0.08);
          line-height: 1;
          letter-spacing: -0.03em;
          transition: all var(--transition-smooth);
        }

        .step-card:hover .step-number {
          color: rgba(var(--secondary-blue-rgb), 0.16);
          transform: scale(1.05);
        }

        .step-icon-bg {
          width: 50px;
          height: 50px;
          border-radius: var(--radius-md);
          background: white;
          border: 1px solid var(--border-color);
          color: var(--primary-navy);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-smooth);
        }

        .step-card:hover .step-icon-bg {
          background: var(--primary-navy);
          color: var(--accent-cyan);
          border-color: var(--primary-navy);
          box-shadow: 0 8px 20px rgba(11, 19, 43, 0.15);
          transform: scale(1.08);
        }

        .step-card-title {
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--primary-navy);
          margin-bottom: 14px;
          letter-spacing: -0.01em;
        }

        .step-card-description {
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.65;
        }

        /* ───── Mobile pill-timeline (hidden on desktop) ───── */
        .mobile-timeline {
          display: none;
        }

        /* ───── Responsive switch ───── */
        @media (max-width: 992px) {
          .timeline-line {
            display: none;
          }
          .steps-container {
            display: none;
          }

          .section-title {
            font-size: 2.2rem;
          }

          .mobile-timeline {
            display: flex;
            flex-direction: column;
            gap: 0;
            padding: 0 4px;
          }

          /* Each step row */
          .mt-row {
            display: flex;
            align-items: flex-start;
            gap: 18px;
          }

          /* Left: badge + connector line */
          .mt-left {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex-shrink: 0;
          }

          .mt-badge {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            border: 2px solid;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.85rem;
            font-weight: 800;
            letter-spacing: -0.02em;
            flex-shrink: 0;
          }

          .mt-connector {
            width: 2px;
            flex: 1;
            min-height: 28px;
            border-radius: 99px;
            margin: 6px 0;
          }

          /* Right: pill card */
          .mt-card {
            flex: 1;
            background: var(--bg-glass-card);
            border: 1px solid var(--border-color);
            border-radius: 18px;
            padding: 20px 22px;
            margin-bottom: 20px;
            box-shadow: 0 2px 16px rgba(11, 19, 43, 0.06);
          }

          .mt-card-top {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 10px;
          }

          .mt-icon {
            width: 40px;
            height: 40px;
            border-radius: 11px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }

          .mt-title {
            font-size: 1.05rem;
            font-weight: 700;
            color: var(--primary-navy);
            letter-spacing: -0.01em;
          }

          .mt-desc {
            font-size: 0.9rem;
            color: var(--text-secondary);
            line-height: 1.6;
          }
        }
      `}</style>
    </section>
  );
}
