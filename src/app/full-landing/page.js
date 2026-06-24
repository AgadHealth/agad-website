// ============================================================
//  FULL LANDING PAGE — preserved for post-launch use
//  To restore: copy this file's content back into src/app/page.js
// ============================================================

"use client";

import Navbar from "@/components/Navbar";
import Features from "@/components/Features";
import InteractiveShowcase from "@/components/InteractiveShowcase";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import IPhoneMockup from "@/components/IPhoneMockup";
import { ArrowRight, Activity, Heart, Shield, Award } from "lucide-react";
import HeroBackground from "@/components/HeroBackground";


export default function Home() {
  return (
    <div className="home-wrapper">
      {/* ECG cardiograph canvas — fixed, spans entire page */}
      <HeroBackground />

      <Navbar />

      <main className="main-content">
        {/* HERO SECTION */}
        <section id="hero" className="hero-section">

          <div className="hero-container">
            {/* Left side: Heading and Intro */}
            <div className="hero-text animate-fade-in-up">
              <div className="badge-promo">
                <span className="badge-bullet">★</span>
                <span>Now available on App Store &amp; Google Play</span>
              </div>
              
              <h1 className="hero-headline">
                Your Health, <br />
                <span className="text-gradient">Instantly.</span>
              </h1>
              
              <p className="hero-subheadline">
                Agad connects you with certified specialist doctors in minutes, monitors your vital stats, and manages your prescription records—all within one clean, secure app.
              </p>
              
              <div className="hero-actions">
                <a href="#download" className="btn btn-primary">
                  Download App <ArrowRight size={16} />
                </a>
                <a href="#features" className="btn btn-secondary">
                  Explore Features
                </a>
              </div>

              {/* Floating mini stats in text column */}
              <div className="hero-trust-metrics">
                <div className="metric-item">
                  <strong>2 Min</strong>
                  <span>Avg. Doctor Response</span>
                </div>
                <div className="divider"></div>
                <div className="metric-item">
                  <strong>4.9 ★</strong>
                  <span>App Store Rating</span>
                </div>
                <div className="divider"></div>
                <div className="metric-item">
                  <strong>100%</strong>
                  <span>Encrypted &amp; Private</span>
                </div>
              </div>
            </div>

            {/* Right side: 3D phone and floating vitals widgets */}
            <div className="hero-visual">
              <div className="visual-wrapper">
                <IPhoneMockup activeScreen="dashboard" />
                
                {/* Floating Vitals Card 1 */}
                <div className="floating-widget card-vitals animate-float">
                  <div className="widget-header">
                    <div className="widget-icon-box bp">
                      <Shield size={14} />
                    </div>
                    <span>Blood Pressure</span>
                  </div>
                  <strong className="widget-val">120/80</strong>
                  <span className="widget-tag bp-tag">Normal</span>
                </div>

                {/* Floating Vitals Card 2 */}
                <div className="floating-widget card-activity animate-float delay-1">
                  <div className="widget-header">
                    <div className="widget-icon-box heart">
                      <Heart size={14} />
                    </div>
                    <span>Avg. Heart Rate</span>
                  </div>
                  <strong className="widget-val">68 <span className="val-unit">bpm</span></strong>
                  <span className="widget-sub">Perfect Cardio Health</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES GRID SECTION */}
        <Features />

        {/* INTERACTIVE SHOWCASE WALKTHROUGH */}
        <InteractiveShowcase />

        {/* HOW IT WORKS TIMELINE */}
        <HowItWorks />
      </main>

      {/* FOOTER & DOWNLOAD CTA */}
      <Footer />

      <style jsx>{`
        .home-wrapper {
          overflow-x: hidden;
          width: 100%;
          min-height: 100vh;
          position: relative;
          z-index: 1;
        }

        .main-content {
          margin-top: 80px;
          position: relative;
          z-index: 1;
        }

        .hero-section {
          padding-top: 80px;
          padding-bottom: 100px;
          display: flex;
          align-items: center;
          position: relative;
          overflow: visible;
        }
        .hero-container {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 40px;
          align-items: center;
          width: 100%;
          position: relative;
          z-index: 1;
        }

        .hero-text {
          display: flex;
          flex-direction: column;
        }

        .badge-promo {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(58, 134, 255, 0.06);
          border: 1px solid rgba(58, 134, 255, 0.12);
          border-radius: 999px;
          padding: 8px 20px;
          width: fit-content;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--secondary-blue);
          box-shadow: 0 2px 12px rgba(58, 134, 255, 0.06);
          margin-bottom: 28px;
          backdrop-filter: blur(8px);
        }

        .badge-bullet {
          font-size: 1rem;
          color: var(--accent-cyan);
        }

        .hero-headline {
          font-size: 4.2rem;
          font-weight: 800;
          line-height: 1.05;
          color: var(--primary-navy);
          letter-spacing: -0.03em;
          margin-bottom: 24px;
        }

        .hero-subheadline {
          font-size: 1.2rem;
          color: var(--text-secondary);
          margin-bottom: 40px;
          max-width: 540px;
          line-height: 1.65;
        }

        .hero-actions {
          display: flex;
          gap: 16px;
          margin-bottom: 52px;
          flex-wrap: wrap;
        }

        .hero-trust-metrics {
          display: flex;
          align-items: center;
          gap: 28px;
          border-top: 1px solid rgba(226, 232, 240, 0.7);
          padding-top: 28px;
          width: fit-content;
        }

        .metric-item {
          display: flex;
          flex-direction: column;
        }

        .metric-item strong {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--primary-navy);
          letter-spacing: -0.02em;
        }

        .metric-item span {
          font-size: 0.82rem;
          color: var(--text-muted);
          margin-top: 2px;
          font-weight: 500;
        }

        .divider {
          width: 1px;
          height: 38px;
          background: rgba(203, 213, 225, 0.8);
        }

        .hero-visual {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .visual-wrapper {
          position: relative;
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .floating-widget {
          position: absolute;
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.9);
          border-radius: 18px;
          padding: 14px 16px;
          box-shadow: 0 12px 36px rgba(11, 19, 43, 0.1), 0 2px 8px rgba(11, 19, 43, 0.04);
          display: flex;
          flex-direction: column;
          z-index: 20;
        }

        .widget-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.73rem;
          color: var(--text-muted);
          font-weight: 600;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .widget-icon-box {
          width: 22px;
          height: 22px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .widget-icon-box.bp {
          background: #dbeafe;
          color: var(--secondary-blue);
        }

        .widget-icon-box.heart {
          background: #ffe4e6;
          color: #f43f5e;
        }

        .widget-val {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--primary-navy);
          letter-spacing: -0.01em;
        }

        .widget-val .val-unit {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .widget-tag {
          font-size: 0.65rem;
          font-weight: 700;
          padding: 3px 9px;
          border-radius: 99px;
          margin-top: 6px;
          width: fit-content;
          letter-spacing: 0.3px;
        }

        .bp-tag {
          background: #dcfce7;
          color: #16a34a;
        }

        .widget-sub {
          font-size: 0.7rem;
          color: var(--text-secondary);
          margin-top: 3px;
          font-weight: 500;
        }

        .card-vitals {
          top: 40px;
          left: -20px;
          width: 148px;
        }

        .card-activity {
          bottom: 80px;
          right: -20px;
          width: 162px;
        }

        .delay-1 {
          animation-delay: -2s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        @media (max-width: 992px) {
          .hero-headline {
            font-size: 3.2rem;
          }
          .hero-container {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 64px;
          }
          .badge-promo {
            margin-left: auto;
            margin-right: auto;
          }
          .hero-actions {
            justify-content: center;
          }
          .hero-trust-metrics {
            margin-left: auto;
            margin-right: auto;
          }
          .card-vitals {
            left: 20px;
          }
          .card-activity {
            right: 20px;
          }
        }

        @media (max-width: 576px) {
          .hero-headline {
            font-size: 2.6rem;
          }
          .card-vitals, .card-activity {
            display: none;
          }
          .hero-section {
            padding-bottom: 50px;
          }
        }
      `}</style>
    </div>
  );
}
