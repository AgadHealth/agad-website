"use client";

import { Video, Activity, Clock, ShieldCheck } from "lucide-react";

export default function Features() {
  const featureList = [
    {
      icon: <Video size={28} />,
      title: "Instant Video Consultations",
      description:
        "Skip the waiting room. Connect with certified specialist doctors in less than 2 minutes via end-to-end encrypted high-definition video calls.",
      accent: "#3a86ff",
    },
    {
      icon: <Activity size={28} />,
      title: "Real-Time Vital Tracking",
      description:
        "Monitor your heart rate, blood pressure, oxygen levels, and physical activity with beautiful, real-time analytics and alerts.",
      accent: "#00b4d8",
    },
    {
      icon: <Clock size={28} />,
      title: "Intelligent Pill Reminders",
      description:
        "Never miss a dose. Our automated, context-aware smart scheduling system helps you keep track of your medication plans effortlessly.",
      accent: "#7b5ea7",
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Bank-Grade Encryption",
      description:
        "Your health records are private. We store all your prescriptions, test results, and medical notes under zero-knowledge encryption.",
      accent: "#00f5d4",
    },
  ];

  return (
    <section id="features" className="features-section">
      <div className="section-header">
        <span className="section-subtitle">Why Choose Agad</span>
        <h2 className="section-title text-gradient">Your healthcare, simplified.</h2>
        <p className="section-description">
          Agad unites advanced medical technology with human expertise to bring
          complete healthcare to your pocket.
        </p>
      </div>

      {/* Desktop grid */}
      <div className="features-grid">
        {featureList.map((feature, idx) => (
          <div key={idx} className="feature-card glass">
            <div className="feature-icon-wrapper" style={{ "--accent": feature.accent }}>
              {feature.icon}
            </div>
            <h3 className="feature-card-title">{feature.title}</h3>
            <p className="feature-card-description">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Mobile swipe carousel */}
      <div className="mobile-carousel" aria-label="Features carousel">
        <div className="carousel-track">
          {featureList.map((feature, idx) => (
            <div key={idx} className="carousel-card glass">
              <div
                className="carousel-icon"
                style={{ background: `${feature.accent}18`, color: feature.accent }}
              >
                {feature.icon}
              </div>
              <h3 className="carousel-title">{feature.title}</h3>
              <p className="carousel-desc">{feature.description}</p>
              <div
                className="carousel-accent-bar"
                style={{ background: feature.accent }}
              />
            </div>
          ))}
        </div>
        <div className="carousel-dots">
          {featureList.map((_, idx) => (
            <span key={idx} className="carousel-dot" />
          ))}
        </div>
      </div>

      <style jsx>{`
        /* ───── Shared section shell ───── */
        .features-section {
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
          color: var(--primary-navy);
        }

        .section-description {
          color: var(--text-secondary);
          font-size: 1.15rem;
          line-height: 1.6;
        }

        /* ───── Desktop grid ───── */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
        }

        .feature-card {
          padding: 44px 40px;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-color);
          background: var(--bg-glass-card);
          transition: all var(--transition-smooth);
          box-shadow: var(--shadow-sm);
          position: relative;
          overflow: hidden;
        }

        .feature-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(
            circle at 10% 10%,
            rgba(58, 134, 255, 0.03) 0%,
            transparent 60%
          );
          pointer-events: none;
        }

        .feature-card:hover {
          transform: translateY(-6px);
          border-color: rgba(var(--secondary-blue-rgb), 0.2);
          box-shadow: var(--shadow-lg),
            0 10px 30px rgba(var(--secondary-blue-rgb), 0.03);
          background: white;
        }

        .feature-icon-wrapper {
          width: 60px;
          height: 60px;
          border-radius: var(--radius-md);
          background: rgba(var(--secondary-blue-rgb), 0.06);
          color: var(--secondary-blue);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 28px;
          transition: all var(--transition-smooth);
        }

        .feature-card:hover .feature-icon-wrapper {
          background: var(--brand-gradient);
          color: white;
          box-shadow: 0 8px 20px rgba(var(--secondary-blue-rgb), 0.25);
          transform: scale(1.06) rotate(5deg);
        }

        .feature-card-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--primary-navy);
          margin-bottom: 14px;
          letter-spacing: -0.01em;
        }

        .feature-card-description {
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.65;
        }

        /* ───── Mobile carousel — hidden on desktop ───── */
        .mobile-carousel {
          display: none;
        }

        /* ───── Breakpoint: switch to carousel ───── */
        @media (max-width: 768px) {
          .features-grid {
            display: none;
          }

          .section-title {
            font-size: 2.2rem;
          }

          .mobile-carousel {
            display: block;
          }

          /* Scrollable track – shows a peek of the next card */
          .carousel-track {
            display: flex;
            gap: 16px;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            padding: 8px 4px 20px;
            /* Left padding = page gutter; right peek = half-card visible */
            padding-left: 0;
            padding-right: 40px;
          }

          .carousel-track::-webkit-scrollbar {
            display: none;
          }

          .carousel-card {
            flex: 0 0 78vw;
            max-width: 320px;
            scroll-snap-align: start;
            padding: 32px 28px;
            border-radius: 20px;
            border: 1px solid var(--border-color);
            background: var(--bg-glass-card);
            box-shadow: 0 4px 24px rgba(11, 19, 43, 0.07);
            position: relative;
            overflow: hidden;
            transition: box-shadow 0.3s ease;
          }

          .carousel-card:active {
            box-shadow: 0 8px 32px rgba(11, 19, 43, 0.14);
          }

          /* Coloured top accent strip */
          .carousel-accent-bar {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            border-radius: 20px 20px 0 0;
            opacity: 0.85;
          }

          .carousel-icon {
            width: 52px;
            height: 52px;
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
          }

          .carousel-title {
            font-size: 1.2rem;
            font-weight: 700;
            color: var(--primary-navy);
            margin-bottom: 10px;
            letter-spacing: -0.01em;
            line-height: 1.25;
          }

          .carousel-desc {
            font-size: 0.93rem;
            color: var(--text-secondary);
            line-height: 1.6;
          }

          /* Scroll-progress dots */
          .carousel-dots {
            display: flex;
            justify-content: center;
            gap: 7px;
            margin-top: 4px;
          }

          .carousel-dot {
            width: 7px;
            height: 7px;
            border-radius: 99px;
            background: rgba(58, 134, 255, 0.2);
            transition: all 0.3s ease;
          }

          .carousel-dot:first-child {
            width: 20px;
            background: var(--secondary-blue);
          }
        }
      `}</style>
    </section>
  );
}
