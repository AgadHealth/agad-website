"use client";

import { Activity, Clock, ShieldCheck, Heart, ArrowLeft, ArrowRight, User } from "lucide-react";

export default function Features() {
  return (
    <section id="features" className="features-section-container">
      
      <div className="section-header">
        <span className="section-subtitle">Why Choose Agad</span>
        <h2 className="section-title">Your healthcare, simplified.</h2>
        <p className="section-description">
          Agad unites advanced medical technology with human expertise to bring
          complete healthcare to your pocket.
        </p>
      </div>

      {/* Grid of the three cards */}
      <div className="features-grid-custom">
        
        {/* Card 1: Track Vitals */}
        <div className="feature-card-new">
          <div className="card-text-content">
            <h3 className="card-title-new">TRACK VITALS.<br />NO EFFORT.</h3>
            <p className="card-desc-new">
              Seamlessly syncs with your wearables for real-time heart rate and activity metrics.
            </p>
          </div>
          
          <div className="phone-wrapper phone-vitals">
            <div className="phone-container">
              {/* iPhone Hardware details */}
              <div className="iphone-dynamic-island" />
              
              {/* Phone Content */}
              <div className="phone-screen-content-image" style={{ paddingTop: '24px', background: '#faf8f6' }}>
                <img 
                  src="/feature-vitals.png" 
                  alt="Vitals History Screen" 
                  className="phone-image-fill" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: AI Coach */}
        <div className="feature-card-new">
          <div className="card-text-content">
            <h3 className="card-title-new">PERSONALIZED AI<br />HEALTH COACH.</h3>
            <p className="card-desc-new">
              Receive smart insights and actionable advice tailored to your biometrics.
            </p>
          </div>
          
          <div className="phone-wrapper phone-coach">
            <div className="phone-container">
              <div className="iphone-dynamic-island" />
              
              <div className="phone-screen-content-image" style={{ paddingTop: '24px', background: '#f8fafc' }}>
                <img 
                  src="/feature-home.png" 
                  alt="Agad Home Screen" 
                  className="phone-image-fill" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Expert Care */}
        <div className="feature-card-new">
          <div className="card-text-content">
            <h3 className="card-title-new">EXPERT CARE.<br />ANYWHERE.</h3>
            <p className="card-desc-new">
              Instantly connect with certified medical experts, nutritionists, and mental health professionals.
            </p>
          </div>
          
          <div className="phone-wrapper phone-telehealth">
            <div className="phone-container">
              <div className="iphone-dynamic-island" />
              
              <div className="phone-screen-content-image" style={{ paddingTop: '24px', background: '#faf8f6' }}>
                <img 
                  src="/feature-labs.png" 
                  alt="Labs Screen" 
                  className="phone-image-fill" 
                />
              </div>
            </div>
          </div>
        </div>

      </div>

      <style jsx>{`
        /* ───── Features Section Container ───── */
        .features-section-container {
          background: linear-gradient(to bottom, #f8fafc, #f0f9ff);
          padding: 100px 24px;
          position: relative;
          overflow: hidden;
          color: #0b132b;
        }



        .section-header {
          text-align: center;
          max-width: 650px;
          margin: 0 auto 60px;
          position: relative;
          z-index: 1;
        }

        .section-subtitle {
          color: #4f46e5;
          font-weight: 700;
          font-size: 0.95rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          display: block;
          margin-bottom: 14px;
        }

        .section-title {
          font-size: 3.2rem;
          font-weight: 800;
          margin-bottom: 20px;
          letter-spacing: -0.02em;
          color: #0d1e3d;
        }

        .section-description {
          color: #4a5568;
          font-size: 1.15rem;
          line-height: 1.6;
        }

        /* ───── Features Grid ───── */
        .features-grid-custom {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* ───── Card Styling ───── */
        .feature-card-new {
          background: #ffffff;
          border-radius: var(--radius-lg, 24px);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border: 1px solid rgba(99, 102, 241, 0.08);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04), 0 2px 8px rgba(0, 0, 0, 0.02);
          transition: transform 0.4s cubic-bezier(0.2, 1, 0.2, 1), box-shadow 0.4s ease;
          height: 600px;
          position: relative;
        }

        .feature-card-new:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(99, 102, 241, 0.08), 0 4px 12px rgba(0, 0, 0, 0.02);
        }

        .card-text-content {
          padding: 40px 32px 10px;
          z-index: 2;
        }

        .card-title-new {
          font-size: 1.8rem;
          font-weight: 800;
          color: #0b132b;
          line-height: 1.2;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }

        .card-desc-new {
          font-size: 0.95rem;
          color: #475569;
          line-height: 1.5;
        }

        /* ───── iPhone Mockups ───── */
        .phone-wrapper {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 250px;
          height: 380px;
          transition: transform 0.4s cubic-bezier(0.2, 1, 0.2, 1);
          z-index: 1;
        }

        /* Specific rotations & placement based on reference image */
        .phone-vitals {
          transform: translateX(-50%) translateY(20px);
        }

        .phone-coach {
          transform: translateX(-40%) translateY(30px) rotate(-8deg);
        }

        .phone-telehealth {
          transform: translateX(-55%) translateY(40px) rotate(12deg);
        }

        /* Hover animations for phones */
        .feature-card-new:hover .phone-vitals {
          transform: translateX(-50%) translateY(5px);
        }

        .feature-card-new:hover .phone-coach {
          transform: translateX(-40%) translateY(10px) rotate(-3deg);
        }

        .feature-card-new:hover .phone-telehealth {
          transform: translateX(-55%) translateY(15px) rotate(4deg);
        }

        .phone-container {
          width: 100%;
          height: 100%;
          background: #000000;
          border: 6px solid #1e293b;
          border-bottom: none;
          border-radius: 36px 36px 0 0;
          position: relative;
          box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.15);
          overflow: hidden;
        }

        /* iPhone Dynamic Island */
        .iphone-dynamic-island {
          position: absolute;
          top: 10px;
          left: 50%;
          transform: translateX(-50%);
          width: 75px;
          height: 18px;
          background: #000000;
          border-radius: 20px;
          z-index: 10;
        }

        .iphone-status-bar {
          position: absolute;
          top: 4px;
          left: 0;
          right: 0;
          height: 18px;
          padding: 0 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.65rem;
          color: #0b132b;
          z-index: 9;
          font-weight: 600;
        }

        .status-icons {
          display: flex;
          gap: 4px;
        }

        /* Phone Screen Content Frame */
        .phone-screen-content {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #f8fafc;
          padding: 24px 12px 10px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .phone-screen-content-image {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #ffffff;
          overflow: hidden;
          box-sizing: border-box;
        }

        .phone-image-fill {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
          display: block;
        }

        /* App General Navigation Bar */
        .app-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 4px;
          margin-bottom: 2px;
        }

        .back-link {
          font-size: 0.75rem;
          color: #3a86ff;
          font-weight: 500;
          cursor: pointer;
        }

        .screen-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: #0b132b;
        }

        .header-right {
          width: 30px;
        }

        /* Vitals Cards Inside Screen 1 */
        .vitals-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 10px 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
          border: 1px solid #f1f5f9;
        }

        .vitals-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.75rem;
          font-weight: 700;
          color: #0b132b;
          margin-bottom: 4px;
        }

        .right-chevron {
          color: #94a3b8;
        }

        /* Circular Steps Gauge */
        .steps-gauge-container {
          position: relative;
          width: 90px;
          height: 90px;
          margin: 0 auto;
        }

        .gauge-svg {
          width: 100%;
          height: 100%;
          transform: rotate(-10deg);
        }

        .gauge-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -42%);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .gauge-icon {
          font-size: 0.7rem;
        }

        .steps-value {
          font-size: 0.95rem;
          font-weight: 800;
          color: #0b132b;
          line-height: 1;
        }

        .steps-goal {
          font-size: 0.5rem;
          color: #64748b;
        }

        /* Heart Rate Card styling */
        .heart-pulse-rate {
          font-size: 0.7rem;
          font-weight: 700;
          color: #ff4d6d;
        }

        .heart-graph-container {
          width: 100%;
          margin-top: 6px;
        }

        .heart-graph-svg {
          width: 100%;
          height: 38px;
        }

        .graph-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.5rem;
          color: #94a3b8;
          margin-top: 2px;
          padding: 0 4px;
        }

        /* Row of sleep/cal mini cards */
        .two-col-row {
          display: flex;
          gap: 8px;
        }

        .mini-card {
          flex: 1;
          background: #ffffff;
          border-radius: 12px;
          padding: 8px 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
          border: 1px solid #f1f5f9;
        }

        .mini-card-header {
          font-size: 0.65rem;
          font-weight: 700;
          color: #0b132b;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .chevron-mini {
          color: #94a3b8;
        }

        /* ───── Insights Cards Screen 2 ───── */
        .insights-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 10px 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
          border: 1px solid #f1f5f9;
        }

        .insights-header {
          font-size: 0.75rem;
          font-weight: 700;
          color: #0b132b;
          margin-bottom: 6px;
        }

        .wellness-gauge {
          position: relative;
          width: 80px;
          height: 80px;
          margin: 0 auto;
        }

        .wellness-score-pct {
          font-size: 1.1rem;
          font-weight: 800;
          color: #0b132b;
        }

        .gauge-center-val {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -42%);
        }

        /* Bar Chart columns */
        .progress-bars {
          display: flex;
          justify-content: space-around;
          align-items: flex-end;
          height: 60px;
          padding-top: 4px;
        }

        .bar-column {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          width: 45px;
        }

        .bar-track {
          width: 8px;
          height: 38px;
          background: #f1f5f9;
          border-radius: 4px;
          overflow: hidden;
          position: relative;
        }

        .bar-fill {
          width: 100%;
          position: absolute;
          bottom: 0;
          left: 0;
          border-radius: 4px;
        }

        .hydration-fill { background: #3a86ff; }
        .focus-fill { background: #00f5d4; }
        .recovery-fill { background: #ff4d6d; }

        .bar-label {
          font-size: 0.5rem;
          color: #64748b;
          font-weight: 600;
        }

        /* AI Chat Bubble in screen 2 */
        .recommendation-bubble {
          background: #ffffff;
          border-radius: 12px;
          padding: 8px 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          display: flex;
          gap: 8px;
          align-items: flex-start;
          border: 1px solid #f1f5f9;
        }

        .coach-avatar {
          font-size: 0.9rem;
          line-height: 1;
        }

        .bubble-text {
          font-size: 0.62rem;
          color: #334155;
          line-height: 1.4;
          font-weight: 500;
        }

        /* ───── Telehealth Screen 3 ───── */
        .telehealth-profile-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 14px 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
          border: 1px solid #f1f5f9;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 6px;
        }

        .dr-avatar-circle {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #475569;
        }

        .dr-name {
          font-size: 0.8rem;
          font-weight: 700;
          color: #0b132b;
        }

        .book-now-btn {
          background: #3a86ff;
          color: white;
          border: none;
          padding: 5px 16px;
          font-size: 0.65rem;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .book-now-btn:hover {
          background: #2563eb;
        }

        /* Notification overlay overlay in screen 3 */
        .chat-notification-overlay {
          background: #ffffff;
          border-radius: 12px;
          padding: 8px 10px;
          border-left: 3px solid #00f5d4;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .notif-header {
          font-size: 0.55rem;
          font-weight: 700;
          color: #64748b;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .notif-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #00f5d4;
        }

        .notif-message {
          font-size: 0.6rem;
          color: #334155;
          margin-top: 2px;
          line-height: 1.35;
          font-weight: 500;
        }

        /* Telehealth bottom navigation footer inside mockup */
        .telehealth-footer-row {
          display: flex;
          justify-content: space-around;
          margin-top: auto;
          padding-top: 6px;
          border-top: 1px solid #f1f5f9;
        }

        .telehealth-icon-btn {
          background: transparent;
          border: none;
          font-size: 0.85rem;
          cursor: pointer;
          opacity: 0.5;
          padding: 4px;
          transition: opacity 0.2s ease;
        }

        .telehealth-icon-btn.active {
          opacity: 1;
        }

        /* ───── Responsive Breakpoints ───── */
        @media (max-width: 1024px) {
          .features-grid-custom {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
        }

        @media (max-width: 768px) {
          .features-section-container {
            padding: 24px 16px 80px;
          }

          .section-title {
            font-size: 2.4rem;
          }

          .features-grid-custom {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .feature-card-new {
            height: 520px;
          }

          .phone-wrapper {
            height: 320px;
            width: 220px;
          }
        }
      `}</style>
    </section>
  );
}
