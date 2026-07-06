"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { Mail } from "lucide-react";

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="instagram-svg">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" className="instagram-dot" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="linkedin-svg">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

function TurnstileWidget({ sitekey, onSuccess, onError, onExpired }) {
  const widgetIdRef = useRef(null);
  const callbacksRef = useRef({ onSuccess, onError, onExpired });

  // Keep callback refs up to date without re-triggering the layout effect
  useEffect(() => {
    callbacksRef.current = { onSuccess, onError, onExpired };
  });

  useLayoutEffect(() => {
    let script = document.getElementById("cloudflare-turnstile-script");
    if (!script) {
      script = document.createElement("script");
      script.id = "cloudflare-turnstile-script";
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    let interval;
    let mounted = true;

    const tryRender = () => {
      if (!mounted) return;
      if (typeof window !== "undefined" && window.turnstile) {
        try {
          if (widgetIdRef.current !== null) {
            try {
              window.turnstile.remove(widgetIdRef.current);
            } catch (err) {
              // stale widget
            }
            widgetIdRef.current = null;
          }

          const widgetId = window.turnstile.render("#turnstile-container", {
            sitekey: sitekey,
            callback: (token) => callbacksRef.current.onSuccess?.(token),
            "error-callback": () => callbacksRef.current.onError?.(),
            "expired-callback": () => callbacksRef.current.onExpired?.(),
          });

          widgetIdRef.current = widgetId;
          if (interval) clearInterval(interval);
        } catch (e) {
          // container not ready yet
        }
      }
    };

    interval = setInterval(tryRender, 100);

    return () => {
      mounted = false;
      if (interval) clearInterval(interval);
      if (widgetIdRef.current !== null && typeof window !== "undefined" && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch (err) {
          // stale widget
        }
        widgetIdRef.current = null;
      }
    };
  }, [sitekey]);

  return (
    <div id="turnstile-container" style={{ marginTop: "16px", display: "flex", justifyContent: "center" }}></div>
  );
}

export default function Waitlist() {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [modalError, setModalError] = useState("");

  // Accessibility: focus the name input when the modal opens
  useEffect(() => {
    if (showModal && !success) {
      const nameInput = document.querySelector('.modal input[type="text"]');
      if (nameInput) {
        const timer = setTimeout(() => nameInput.focus(), 60);
        return () => clearTimeout(timer);
      }
    }
  }, [showModal, success]);

  // Accessibility: Trap focus inside the modal and prevent ESC default action
  useEffect(() => {
    if (!showModal) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault(); // Non-dismissible by design: explicit no-op
        return;
      }

      if (e.key === "Tab") {
        const modalEl = document.querySelector(".modal");
        if (!modalEl) return;

        const focusable = Array.from(
          modalEl.querySelectorAll('input:not([disabled]), button:not([disabled]), iframe, [tabindex="0"]')
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        let active = document.activeElement;

        // Support Turnstile iframe focus containment
        const turnstileContainer = modalEl.querySelector("#turnstile-container");
        if (turnstileContainer && turnstileContainer.contains(active)) {
          active = turnstileContainer;
        }

        if (e.shiftKey) {
          if (active === first || !focusable.includes(active)) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (active === last || !focusable.includes(active)) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showModal]);

  // Accessibility: Make background content inert/aria-hidden when modal is open
  useEffect(() => {
    if (!showModal) return;

    const mainContent = document.querySelector(".main-content");
    const navbar = document.querySelector("header");
    const footer = document.querySelector("footer");
    const waitlistContent = document.querySelector("#waitlist .content");

    const modifiedElements = [];

    const setInert = (el) => {
      if (el && !el.hasAttribute("inert")) {
        el.setAttribute("inert", "");
        el.setAttribute("aria-hidden", "true");
        modifiedElements.push(el);
      }
    };

    if (mainContent) {
      Array.from(mainContent.children).forEach(child => {
        if (child.id !== "waitlist") {
          setInert(child);
        }
      });
    }

    setInert(navbar);
    setInert(footer);
    setInert(waitlistContent);

    return () => {
      modifiedElements.forEach(el => {
        el.removeAttribute("inert");
        el.removeAttribute("aria-hidden");
      });
    };
  }, [showModal]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);



  const openModal = async () => {

    if (!email.trim()) {
      setEmailError("Please enter your email address.");
      return;
    }

    setLoading(true);
    setEmailError("");
    try {
      const normalizedEmail = email.trim().toLowerCase();
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/check-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: normalizedEmail }),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        setEmailError(data.error || "Something went wrong. Please try again.");
        return;
      }

      if (data.exists) {
        setEmailError("This email is already registered on the waitlist.");
        return;
      }

      setShowModal(true);

    } catch (e) {
      setLoading(false);
      setEmailError("Network error. Please try again.");
    }

  };


  const handleSubmit = async () => {
    setModalError("");

    if (!name.trim()) {
      setModalError("Please enter your name.");
      return;
    }

    if (!turnstileToken) {
      setModalError("Please complete Turnstile verification.");
      return;
    }

    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/join-waitlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, turnstileToken }),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        setModalError(data.error || "Something went wrong. Please try again.");
        return;
      }

      if (data && !data.success) {
        if (data.reason === "already_registered") {
          setEmailError("This email is already registered on the waitlist.");
          setIsClosing(true);
          setTimeout(() => {
            setShowModal(false);
            setIsClosing(false);
            setName("");
            setTurnstileToken("");
            setModalError("");
          }, 250);
        } else {
          setModalError("Could not join waitlist: " + (data.reason || "unknown error"));
        }
        return;
      }

      setSuccess(true);

      setTimeout(() => {
        setIsClosing(true);
        setTimeout(() => {
          setShowModal(false);
          setSuccess(false);
          setIsClosing(false);
          setName("");
          setEmail("");
          setTurnstileToken("");
          setModalError("");
        }, 250);
      }, 1800);

    } catch (e) {
      setLoading(false);
      setModalError("Network error. Please try again.");
    }

  };
  return (
    <>
      <section id="waitlist" className="waitlist">

        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
          <defs>
            <linearGradient id="socialsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="socialsGradHover" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#015a87" />
            </linearGradient>
          </defs>
        </svg>

        <div className="content">

          <h2>Get Early Access</h2>

          <p>
            Be among the first to experience Agad.
            Join our waitlist and get notified on launch.
          </p>

          <div className="inputBox">

            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError("");
              }}
              aria-label="Email address"
            />

            <button onClick={openModal} disabled={loading}>
              {loading && !showModal ? "Checking..." : "Join Waitlist"}
            </button>

          </div>

          {emailError && (
            <p className="errorMessage">{emailError}</p>
          )}

          <div className="joined">

            <div className="avatars">

              <img src="https://ik.imagekit.io/zftua2pck/3.png" alt="" />
              <img src="https://ik.imagekit.io/zftua2pck/Untitled.png" alt="" />
              <img src="https://ik.imagekit.io/zftua2pck/1.png" alt="" />

            </div>

            <span>
              Join <strong>120+</strong> others on the waitlist
            </span>

          </div>

          <div className="waitlist-socials">
            <a href="https://www.instagram.com/reach.agad?igsh=MW5kNTIwZzl6Y3BpdQ==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-btn">
              <InstagramIcon />
            </a>
            <a href="https://www.linkedin.com/company/reachagad/posts/?feedView=all" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-btn">
              <LinkedinIcon />
            </a>
            <a href="mailto:reach.agad@gmail.com" aria-label="Email" className="social-btn">
              <Mail size={20} />
            </a>
          </div>

        </div>

      </section>

      {showModal && createPortal(

        <div className={`modalOverlay ${isClosing ? "closing" : ""}`}>

          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">

            {!success ? (

              <div key="form-view">

                <h3 id="modal-title">Almost there 👋</h3>

                <p>
                  Tell us your name to reserve your spot.
                </p>

                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (modalError) setModalError("");
                  }}
                  aria-label="Your Name"
                />

                <TurnstileWidget
                  sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"}
                  onSuccess={(token) => {
                    setTurnstileToken(token);
                    if (modalError) setModalError("");
                  }}
                  onError={() => setTurnstileToken("")}
                  onExpired={() => setTurnstileToken("")}
                />

                {modalError && (
                  <p className="errorMessage" role="alert" style={{ marginTop: "14px", marginBottom: "0" }}>
                    {modalError}
                  </p>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={loading || !turnstileToken}
                >
                  {loading ? "Joining..." : "Continue"}
                </button>

              </div>

            ) : (

              <div key="success-view" className="success">

                <div className="tick">
                  ✓
                </div>

                <h3 id="modal-title">You&apos;re on the list!</h3>

                <p>
                  We&apos;ll notify you as soon as AGAD launches.
                </p>

              </div>

            )}

          </div>

        </div>,

        document.body
      )}

      <style jsx>{`
    .waitlist{
  padding:60px 20px 100px;
  position:relative;
  overflow:hidden;
  background:#f0f9ff;
}

.glow{
  position:absolute;
  width:700px;
  height:700px;
  left:50%;
  top:-300px;
  transform:translateX(-50%);
  border-radius:50%;
  background:radial-gradient(
    circle,
    rgba(37,99,235,.12),
    transparent 70%
  );
  filter:blur(80px);
}

.content{
  max-width:760px;
  margin:auto;
  text-align:center;
  position:relative;
  z-index:2;
}

h2{
  font-size:56px;
  font-weight:800;
  color:#0f172a;
  margin-bottom:20px;
}

p{
  font-size:20px;
  color:#64748b;
  line-height:1.8;
  margin-bottom:42px;
}

.inputBox{

  display:flex;
  align-items:center;

  background:white;

  padding:8px;

  border-radius:999px;

  box-shadow:
  0 20px 50px rgba(0,0,0,.08);

}

.inputBox input{

  flex:1;

  border:none;

  outline:none;

  padding:22px 26px;

  background:transparent;

  font-size:17px;

}

.inputBox button{

  padding:0 34px;

  height:58px;

  border:none;

  border-radius:999px;

  background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);

  color:white;

  font-size:16px;

  font-weight:700;

  cursor:pointer;

  transition: all 0.22s ease;

  box-shadow: 0 4px 18px rgba(14,165,233,0.35);

}

.inputBox button:hover{

  transform:translateY(-2px);

  box-shadow: 0 8px 24px rgba(14,165,233,0.48);

}

.errorMessage{
  color:#ef4444;
  font-size:15px;
  margin-top:14px;
  text-align:center;
  font-weight:500;
}

.joined{

  margin-top:36px;

  display:flex;

  justify-content:center;

  align-items:center;

  gap:16px;

}

.avatars{

  display:flex;

}

.avatars img{

  width:46px;
  height:46px;

  border-radius:50%;

  margin-left:-14px;

  border:3px solid white;

}

.avatars img:first-child{

  margin-left:0;

}

.joined span{

  color:#64748b;

  font-size:17px;

}

.joined strong{

  color:#111827;

}

.waitlist-socials {
  margin-top: 24px;
  display: flex;
  justify-content: center;
  gap: 16px;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 4px 15px rgba(14, 165, 233, 0.1);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  outline: none;
  -webkit-tap-highlight-color: transparent;
}

.social-btn svg {
  stroke: url(#socialsGrad);
  transition: stroke 0.25s ease, fill 0.25s ease;
}

.social-btn .instagram-dot {
  fill: url(#socialsGrad);
  transition: fill 0.25s ease;
}

.social-btn .linkedin-svg {
  fill: url(#socialsGrad);
  transition: fill 0.25s ease;
}

.social-btn:hover {
  background: rgba(255, 255, 255, 0.85);
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(14, 165, 233, 0.22);
  border-color: rgba(14, 165, 233, 0.3);
}

.social-btn:hover svg {
  stroke: url(#socialsGradHover);
}

.social-btn:hover .instagram-dot {
  fill: url(#socialsGradHover);
}

.social-btn:hover .linkedin-svg {
  fill: url(#socialsGradHover);
}

.social-btn:focus,
.social-btn:active,
.social-btn:visited {
  outline: none;
  box-shadow: 0 4px 15px rgba(14, 165, 233, 0.1);
  background: rgba(255, 255, 255, 0.45);
  border-color: rgba(255, 255, 255, 0.5);
}

.social-btn:focus svg,
.social-btn:active svg,
.social-btn:visited svg {
  stroke: url(#socialsGrad) !important;
}

.social-btn:focus .linkedin-svg,
.social-btn:active .linkedin-svg,
.social-btn:visited .linkedin-svg {
  fill: url(#socialsGrad) !important;
}

.social-btn:focus .instagram-dot,
.social-btn:active .instagram-dot,
.social-btn:visited .instagram-dot {
  fill: url(#socialsGrad) !important;
}

/* ====================== */
/* MODAL */
/* ====================== */

.modalOverlay{

  position:fixed;

  inset:0;

  background:rgba(8, 15, 30, 0.7);

  backdrop-filter:blur(12px);

  -webkit-backdrop-filter:blur(12px);

  display:flex;

  justify-content:center;

  align-items:center;

  z-index:2000;

  animation:fade .25s ease forwards;

}

.modalOverlay.closing {
  animation: fadeOut .25s ease forwards;
}

.modal{

  position:relative;

  width:440px;

  background:white;

  border-radius:28px;

  padding:48px;

  box-shadow:
  0 40px 90px rgba(0,0,0,.18);

  display:flex;

  flex-direction:column;

  animation:scaleUp .25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;

}

.modalOverlay.closing .modal {
  animation: scaleDown .20s ease forwards;
}

.closeBtn {
  position:absolute;
  top:24px;
  right:28px;
  background:none;
  border:none;
  font-size:28px;
  cursor:pointer;
  color:#94a3b8;
  transition:color .2s;
  line-height:1;
  padding:4px;
  z-index:10;
}

.closeBtn:hover {
  color:#475569;
}

.modal h3{

  text-align:center;

  font-size:34px;

  color:#111827;

  margin-bottom:12px;

}

.modal p{

  text-align:center;

  font-size:17px;

  color:#64748b;

  margin-bottom:30px;

}

.modal input{

  width:100%;

  height:64px;

  padding:0 20px;

  font-size:18px;

  border-radius:16px;

  border:1.5px solid #dbeafe;

  outline:none;

  box-sizing:border-box;

}

.modal input:focus{

  border-color:#2563EB;

}

.modal button{

  margin-top:22px;

  width:100%;

  height:64px;

  border:none;

  border-radius:16px;

  background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);

  color:white;

  font-size:18px;

  font-weight:700;

  cursor:pointer;

  transition: all 0.22s ease;

  box-shadow: 0 4px 18px rgba(14,165,233,0.3);

}

.modal button:hover {

  transform: translateY(-2px);

  box-shadow: 0 8px 24px rgba(14,165,233,0.42);

}

.success{

  display:flex;

  flex-direction:column;

  align-items:center;

}

.tick{

  width:80px;

  height:80px;

  border-radius:50%;

  background:#22C55E;

  color:white;

  font-size:42px;

  display:flex;

  justify-content:center;

  align-items:center;

  margin-bottom:24px;

}

@keyframes fade{

  from{
    opacity:0;
  }

  to{
    opacity:1;
  }

}

@keyframes fadeOut{

  from{
    opacity:1;
  }

  to{
    opacity:0;
  }

}

@keyframes scaleUp {

  from {
    transform:scale(0.9);
    opacity:0;
  }

  to {
    transform:scale(1);
    opacity:1;
  }

}

@keyframes scaleDown {

  from {
    transform:scale(1);
    opacity:1;
  }

  to {
    transform:scale(0.9);
    opacity:0;
  }

}

@media(max-width:768px){

  h2{

    font-size:42px;

  }

  p{

    font-size:18px;

  }

  .inputBox{

    flex-direction:column;

    border-radius:28px;

  }

  .inputBox input{

    width:100%;

  }

  .inputBox button{

    width:100%;

    margin-top:10px;

  }

  .modal{

    width:92%;

    padding:32px;

  }
`}</style>

    </>
  );
}
