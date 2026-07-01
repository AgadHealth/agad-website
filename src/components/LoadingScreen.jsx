"use client";
import "./LoadingScreen.css";

export default function LoadingScreen() {
  return (
    <div className="loader">
      <div className="loaderContent">
        <div className="logoCircle">
          <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
            <defs>
              <linearGradient id="ecgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="50%" stopColor="#7dd3fc" />
                <stop offset="100%" stopColor="#ffffff" />
              </linearGradient>
            </defs>
            <path
              d="
                M4 52
                H24
                L31 52
                L38 40
                L44 64
                L52 22
                L61 78
                L69 48
                L76 52
                H96
              "
              stroke="url(#ecgGradient)"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="heartbeat"
            />
          </svg>
        </div>
        <h1>AGAD</h1>
        <p>Healthcare, Instantly.</p>
      </div>
    </div>
  );
}