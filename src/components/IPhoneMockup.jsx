"use client";

import { useState, useEffect, useRef } from "react";
import { Activity, Calendar, Heart, Shield, MessageSquare, Phone, Clock, Video } from "lucide-react";

export default function IPhoneMockup({ activeScreen = "dashboard" }) {
  const phoneRef = useRef(null);
  const [coords, setCoords] = useState({ rx: 0, ry: 0, shineX: 50, shineY: 50 });

  const handleMouseMove = (e) => {
    if (!phoneRef.current) return;
    const element = phoneRef.current;
    const rect = element.getBoundingClientRect();
    
    // Position of mouse relative to card center
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Normalize coordinates (-1 to 1)
    const normX = x / (rect.width / 2);
    const normY = y / (rect.height / 2);
    
    // Rotate max 15 degrees
    const rx = -normY * 12;
    const ry = normX * 12;
    
    // Shine position
    const shineX = (normX + 1) * 50;
    const shineY = (normY + 1) * 50;
    
    setCoords({ rx, ry, shineX, shineY });
  };

  const handleMouseLeave = () => {
    setCoords({ rx: 0, ry: 0, shineX: 50, shineY: 50 });
  };

  // Screens to display inside the phone mockup
  const renderScreenContent = () => {
    switch (activeScreen) {
      case "consult":
        return (
          <div className="phone-screen consult-screen">
            {/* Header */}
            <div className="screen-header">
              <span className="screen-title">Teleconsult</span>
              <div className="avatar-small"></div>
            </div>
            
            {/* Search doctors */}
            <div className="search-bar">
              <span className="search-placeholder">Search specialty or doctor...</span>
            </div>

            {/* Specialties */}
            <span className="section-label">Medical Specialists</span>
            <div className="specialties-grid">
              <div className="specialty-card active">
                <Heart size={16} />
                <span>Cardio</span>
              </div>
              <div className="specialty-card">
                <Shield size={16} />
                <span>General</span>
              </div>
              <div className="specialty-card">
                <MessageSquare size={16} />
                <span>Mental</span>
              </div>
            </div>

            {/* Doctor Card */}
            <span className="section-label">Available Doctors</span>
            <div className="doctor-card animate-slide-up">
              <div className="doctor-info">
                <div className="doctor-avatar dr-sarah"></div>
                <div className="doctor-details">
                  <h4>Dr. Sarah Patel</h4>
                  <p>Cardiologist • 9 yrs exp</p>
                  <span className="status-badge"><span className="dot"></span> Online</span>
                </div>
              </div>
              <div className="doctor-actions">
                <button className="icon-btn-call"><Phone size={14} /></button>
                <button className="icon-btn-call video"><Video size={14} /></button>
                <button className="btn-book">Consult Now</button>
              </div>
            </div>

            {/* Another Doctor */}
            <div className="doctor-card animate-slide-up second">
              <div className="doctor-info">
                <div className="doctor-avatar dr-james"></div>
                <div className="doctor-details">
                  <h4>Dr. James Miller</h4>
                  <p>General Physician • 12 yrs exp</p>
                  <span className="status-badge offline"><span className="dot"></span> 5m ago</span>
                </div>
              </div>
              <div className="doctor-actions">
                <button className="icon-btn-call offline"><Phone size={14} /></button>
                <button className="btn-book offline-btn">Schedule</button>
              </div>
            </div>
          </div>
        );

      case "records":
        return (
          <div className="phone-screen records-screen">
            <div className="screen-header">
              <span className="screen-title">Reminders</span>
              <div className="avatar-small"></div>
            </div>
            
            {/* Progress bar */}
            <div className="meds-progress">
              <div className="meds-progress-info">
                <span>Daily Medication</span>
                <span>2 of 3 taken</span>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar-fill" style={{ width: "66%" }}></div>
              </div>
            </div>

            {/* Reminder Items */}
            <span className="section-label">Today's Schedule</span>
            <div className="reminder-item taken">
              <div className="reminder-icon-bg">
                <Clock size={16} />
              </div>
              <div className="reminder-details">
                <h4>Vitamin D3 (1000 IU)</h4>
                <p>Taken • 9:00 AM</p>
              </div>
              <div className="check-bubble checked">✓</div>
            </div>

            <div className="reminder-item taken">
              <div className="reminder-icon-bg">
                <Clock size={16} />
              </div>
              <div className="reminder-details">
                <h4>Omega 3 Fish Oil</h4>
                <p>Taken • 1:30 PM</p>
              </div>
              <div className="check-bubble checked">✓</div>
            </div>

            <div className="reminder-item pending animate-pulse-pulse">
              <div className="reminder-icon-bg active">
                <Clock size={16} />
              </div>
              <div className="reminder-details">
                <h4>Atorvastatin (20mg)</h4>
                <p>Scheduled • 9:00 PM</p>
              </div>
              <div className="check-bubble"></div>
            </div>

            <div className="reminder-item pending text-muted">
              <div className="reminder-icon-bg block">
                <Calendar size={16} />
              </div>
              <div className="reminder-details">
                <h4>Cardiology Review</h4>
                <p>Tomorrow • 10:30 AM</p>
              </div>
            </div>
          </div>
        );

      case "dashboard":
      default:
        return (
          <div className="phone-screen dashboard-screen">
            {/* Top Bar */}
            <div className="screen-header">
              <div>
                <span className="greeting">Welcome back,</span>
                <h3 className="user-name">Alex Rivera</h3>
              </div>
              <div className="avatar-container">
                <div className="avatar-img"></div>
              </div>
            </div>

            {/* Pulse Card */}
            <div className="pulse-card">
              <div className="pulse-info">
                <span className="pulse-label">Live Heart Rate</span>
                <div className="pulse-value-row">
                  <span className="pulse-value">72</span>
                  <span className="pulse-unit">BPM</span>
                  <Heart className="pulse-heart-icon" size={16} fill="#ff3366" color="#ff3366" />
                </div>
              </div>
              
              {/* Graphic heartbeat representation (CSS SVG) */}
              <div className="heartbeat-graph">
                <svg viewBox="0 0 100 40" className="heartbeat-svg">
                  <path 
                    d="M0 20 L25 20 L30 10 L35 30 L40 20 L50 20 L55 5 L60 35 L65 20 L75 20 L80 15 L85 25 L90 20 L100 20" 
                    fill="none" 
                    stroke="url(#heartbeat-gradient)" 
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <linearGradient id="heartbeat-gradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#0066ff" />
                      <stop offset="50%" stopColor="#00e5ff" />
                      <stop offset="100%" stopColor="#e0f2fe" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Quick Vitals Row */}
            <div className="vitals-row">
              <div className="vital-mini-card">
                <span className="mini-label">Blood Press.</span>
                <span className="mini-val">120/80</span>
                <span className="mini-status normal">Normal</span>
              </div>
              <div className="vital-mini-card">
                <span className="mini-label">Oxygen SpO2</span>
                <span className="mini-val">98%</span>
                <span className="mini-status normal">Healthy</span>
              </div>
            </div>

            {/* Active Doctors Banner */}
            <div className="consult-shortcut animate-pulse-pulse">
              <div className="shortcut-text">
                <h4>Need medical advice?</h4>
                <p>Consult with a doctor in 2 minutes.</p>
              </div>
              <div className="shortcut-btn">→</div>
            </div>

            {/* Steps & Activity */}
            <div className="activity-card">
              <div className="activity-info">
                <span>Daily Steps Goal</span>
                <strong>6,420 / 8,000 steps</strong>
              </div>
              <div className="progress-ring-mini">
                <svg viewBox="0 0 36 36" className="circular-chart">
                  <path className="circle-bg"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path className="circle"
                    strokeDasharray="80, 100"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="ring-text">80%</span>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="mockup-wrapper">
      <div 
        ref={phoneRef}
        className="phone-container"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${coords.rx}deg) rotateY(${coords.ry}deg)`,
          "--shine-x": `${coords.shineX}%`,
          "--shine-y": `${coords.shineY}%`
        }}
      >
        {/* Inner Wrapper that clips the image edges */}
        <div className="phone-inner-wrapper">
          {/* Transparent Mockup Chassis Image */}
          <img 
            src="/iphone-mockup-transparent.png" 
            className="phone-chassis" 
            alt="iPhone Mockup" 
          />

          {/* Screen Frame */}
          <div className="phone-screen-frame">
            {renderScreenContent()}
            
            {/* Home indicator bar at bottom */}
            <div className="home-indicator"></div>
            
            {/* Dynamic Island */}
            <div className="dynamic-island">
              <div className="camera-lens"></div>
            </div>
          </div>
        </div>
      </div>



      <style jsx>{`
        .mockup-wrapper {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          perspective: 1500px;
        }

        .phone-container {
          position: relative;
          /* Phone body in 1024x1024 image: x:164-860 (w:696), y:54-970 (h:916) */
          /* Scale: 310/696 = 0.4454 → container: 310 x (916*0.4454=408)px */
          width: 310px;
          height: 408px;
          transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1);
          transform-style: preserve-3d;
          cursor: pointer;
        }

        .phone-inner-wrapper {
          /* Clip any overflow outside the phone bezel shape */
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 38px;
          overflow: hidden;
        }

        .phone-chassis {
          /* Image 1024×1024 scaled to 456×456px (scale=0.4454) then offset
             so phone body (starting at x:164,y:54 in original) aligns to top-left */
          position: absolute;
          /* width/height as % of container (310×408) */
          /* image 456px wide = 456/310 = 147.1% of container width */
          width: 147.1%;
          /* image 456px tall = 456/408 = 111.8% of container height */
          height: 111.8%;
          /* offset: -164*0.4454 = -73px = -73/310 = -23.5% horizontal */
          left: -23.5%;
          /* offset: -54*0.4454 = -24px = -24/408 = -5.9% vertical */
          top: -5.9%;
          pointer-events: none;
          object-fit: fill;
          z-index: 3;
        }

        /* Screen Frame - positioned inside phone bezel */
        .phone-screen-frame {
          position: absolute;
          /* Screen starts at x:177 in image → (177-164)*0.4454=5.8px → 5.8/310=1.9% */
          left: 1.9%;
          /* Screen starts at y:57 in image → (57-54)*0.4454=1.3px → 1.3/408=0.3% */
          top: 0.3%;
          /* Screen width: (847-177)*0.4454=298px → 298/310=96.1% */
          width: 96.1%;
          /* Screen height: (970-57)*0.4454=406px → 406/408=99.5% */
          height: 99.5%;
          border-radius: 36px;
          background: #f8fafc;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          z-index: 2;
        }

        /* Dynamic Island / Camera Notch */
        .dynamic-island {
          position: absolute;
          top: 10px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 22px;
          border-radius: 9999px;
          background: black;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 10px;
        }

        .camera-lens {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #111;
          box-shadow: inset 0 0 2px rgba(255, 255, 255, 0.5);
        }

        /* Home indicator bar at bottom */
        .home-indicator {
          position: absolute;
          bottom: 6px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 4px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 999px;
          z-index: 10;
        }




        /* Phone Screen Common */
        .phone-screen {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 48px 18px 24px;
          font-family: var(--font-sans);
          overflow-y: hidden;
          background: #f8fafc;
          font-size: 0.85rem;
        }

        .screen-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .screen-title {
          font-weight: 800;
          font-size: 1.25rem;
          color: #0d1e3d;
        }

        .avatar-small {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0066ff, #00e5ff);
          border: 1.5px solid white;
          box-shadow: 0 2px 6px rgba(13, 30, 61, 0.1);
        }

        .section-label {
          font-weight: 700;
          font-size: 0.8rem;
          color: #64748b;
          margin-top: 14px;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* Screen 1: Dashboard */
        .greeting {
          color: #64748b;
          font-size: 0.75rem;
          font-weight: 500;
        }
        
        .user-name {
          font-size: 1.1rem;
          color: #0d1e3d;
          font-weight: 800;
        }

        .avatar-container {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #e2e8f0;
          overflow: hidden;
          border: 2px solid white;
          box-shadow: 0 4px 8px rgba(13, 30, 61, 0.1);
        }

        .avatar-img {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #0066ff, #00e5ff);
        }

        /* Pulse Card */
        .pulse-card {
          background: #0d1e3d;
          color: white;
          border-radius: 20px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 20px rgba(13, 30, 61, 0.15);
          margin-bottom: 12px;
        }

        .pulse-info {
          display: flex;
          flex-direction: column;
          z-index: 2;
        }

        .pulse-label {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 500;
        }

        .pulse-value-row {
          display: flex;
          align-items: baseline;
          gap: 4px;
          margin-top: 4px;
        }

        .pulse-value {
          font-size: 2.1rem;
          font-weight: 800;
          color: #00e5ff;
        }

        .pulse-unit {
          font-size: 0.8rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.8);
        }

        .pulse-heart-icon {
          margin-left: 8px;
          animation: heart-beat 1.2s infinite;
        }

        .heartbeat-graph {
          width: 100%;
          height: 45px;
          margin-top: 10px;
          z-index: 2;
        }

        .heartbeat-svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        @keyframes heart-beat {
          0%, 100% {
            transform: scale(1);
          }
          30% {
            transform: scale(1.3);
          }
          60% {
            transform: scale(0.9);
          }
        }

        /* Vitals Mini Grid */
        .vitals-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 12px;
        }

        .vital-mini-card {
          background: white;
          padding: 12px;
          border-radius: 16px;
          border: 1px solid rgba(226, 232, 240, 0.8);
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 10px rgba(13, 30, 61, 0.02);
        }

        .mini-label {
          font-size: 0.7rem;
          color: #64748b;
          font-weight: 500;
        }

        .mini-val {
          font-size: 1.1rem;
          font-weight: 800;
          color: #0d1e3d;
          margin: 4px 0;
        }

        .mini-status {
          font-size: 0.65rem;
          font-weight: 600;
          padding: 2px 6px;
          background: #e2fcf2;
          color: #0f766e;
          border-radius: 9999px;
          width: fit-content;
        }

        /* Consult Banner */
        .consult-shortcut {
          background: linear-gradient(135deg, #0066ff, #00e5ff);
          border-radius: 16px;
          padding: 12px;
          color: white;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
          box-shadow: 0 6px 15px rgba(0, 102, 255, 0.15);
        }

        .consult-shortcut h4 {
          font-size: 0.8rem;
          font-weight: 700;
          color: white;
        }

        .consult-shortcut p {
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.9);
          margin-top: 2px;
        }

        .shortcut-btn {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 0.8rem;
        }

        /* Activity Card */
        .activity-card {
          background: white;
          border-radius: 16px;
          padding: 12px;
          border: 1px solid rgba(226, 232, 240, 0.8);
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          box-shadow: 0 4px 10px rgba(13, 30, 61, 0.02);
        }

        .activity-info {
          display: flex;
          flex-direction: column;
        }

        .activity-info span {
          font-size: 0.7rem;
          color: #64748b;
        }

        .activity-info strong {
          font-size: 0.85rem;
          color: #0d1e3d;
          font-weight: 800;
          margin-top: 2px;
        }

        .progress-ring-mini {
          position: relative;
          width: 36px;
          height: 36px;
        }

        .circular-chart {
          width: 100%;
          height: 100%;
        }

        .circle-bg {
          fill: none;
          stroke: #e2e8f0;
          stroke-width: 3;
        }

        .circle {
          fill: none;
          stroke: #0066ff;
          stroke-width: 3;
          stroke-linecap: round;
        }

        .ring-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 0.65rem;
          font-weight: 700;
          color: #0066ff;
        }

        /* Screen 2: Consult List */
        .search-bar {
          background: white;
          border: 1px solid rgba(226, 232, 240, 0.8);
          border-radius: 10px;
          padding: 8px 12px;
          color: #94a3b8;
          font-size: 0.75rem;
          margin-bottom: 4px;
        }

        .specialties-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        .specialty-card {
          background: white;
          border: 1px solid rgba(226, 232, 240, 0.8);
          border-radius: 12px;
          padding: 8px 4px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          font-size: 0.7rem;
          color: #64748b;
          font-weight: 500;
        }

        .specialty-card.active {
          border-color: #0066ff;
          background: #eff6ff;
          color: #0066ff;
        }

        .doctor-card {
          background: white;
          border: 1px solid rgba(226, 232, 240, 0.8);
          border-radius: 16px;
          padding: 12px;
          margin-bottom: 10px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          box-shadow: 0 4px 10px rgba(13, 30, 61, 0.02);
        }

        .doctor-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .doctor-avatar {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: #e2e8f0;
        }

        .dr-sarah {
          background: linear-gradient(135deg, #fed7aa, #f97316);
        }

        .dr-james {
          background: linear-gradient(135deg, #cbd5e1, #64748b);
        }

        .doctor-details h4 {
          font-size: 0.85rem;
          font-weight: 700;
          color: #0d1e3d;
        }

        .doctor-details p {
          font-size: 0.7rem;
          color: #64748b;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.65rem;
          color: #0f766e;
          font-weight: 600;
        }

        .status-badge.offline {
          color: #64748b;
        }

        .status-badge .dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #10b981;
        }

        .status-badge.offline .dot {
          background: #94a3b8;
        }

        .doctor-actions {
          display: flex;
          gap: 6px;
        }

        .icon-btn-call {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: #f1f5f9;
          color: #64748b;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .icon-btn-call.video {
          background: #eff6ff;
          color: #0066ff;
        }

        .icon-btn-call.offline {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-book {
          flex: 1;
          background: #0d1e3d;
          color: white;
          border-radius: 8px;
          border: none;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
        }

        .btn-book.offline-btn {
          background: white;
          border: 1px solid rgba(226, 232, 240, 0.8);
          color: #0d1e3d;
        }

        /* Screen 3: Reminders */
        .meds-progress {
          background: white;
          border-radius: 16px;
          border: 1px solid rgba(226, 232, 240, 0.8);
          padding: 12px;
          margin-bottom: 4px;
        }

        .meds-progress-info {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          font-weight: 600;
          color: #0d1e3d;
          margin-bottom: 6px;
        }

        .progress-bar-container {
          height: 6px;
          border-radius: 999px;
          background: #e2e8f0;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, #0066ff, #00e5ff);
        }

        .reminder-item {
          background: white;
          border: 1px solid rgba(226, 232, 240, 0.8);
          border-radius: 14px;
          padding: 10px 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }

        .reminder-item.taken {
          background: rgba(241, 245, 249, 0.5);
          border-color: rgba(226, 232, 240, 0.5);
        }

        .reminder-icon-bg {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: #f1f5f9;
          color: #64748b;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .reminder-icon-bg.active {
          background: #eff6ff;
          color: #0066ff;
        }

        .reminder-details {
          flex: 1;
        }

        .reminder-details h4 {
          font-size: 0.8rem;
          font-weight: 600;
          color: #0d1e3d;
        }

        .reminder-item.taken .reminder-details h4 {
          text-decoration: line-through;
          color: #94a3b8;
        }

        .reminder-details p {
          font-size: 0.65rem;
          color: #64748b;
          margin-top: 1px;
        }

        .check-bubble {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 1.5px solid #cbd5e1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.65rem;
          font-weight: bold;
          color: white;
        }

        .check-bubble.checked {
          background: #0066ff;
          border-color: #0066ff;
        }

        /* 3D Shadows & Extra Depth styling */
        .phone-shadow {
          position: absolute;
          bottom: -20px;
          left: 10%;
          width: 80%;
          height: 15px;
          border-radius: 50%;
          background: radial-gradient(ellipse at center, rgba(13, 30, 61, 0.25) 0%, rgba(13, 30, 61, 0) 70%);
          filter: blur(8px);
          z-index: 1;
        }

        /* Mini keyframes animations inside screens */
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-slide-up.second {
          animation-delay: 0.15s;
          opacity: 0;
        }

        @keyframes pulse-pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }
        .animate-pulse-pulse {
          animation: pulse-pulse 3s ease-in-out infinite;
        }
        
        .text-muted {
          opacity: 0.6;
        }
      `}</style>
    </div>
  );
}
