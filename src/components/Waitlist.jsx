"use client";

import { useState } from "react";


export default function Waitlist() {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const openModal = () => {

    if (!email.trim()) {
      alert("Please enter your email first.");
      return;
    }

    setShowModal(true);

  };

  const handleSubmit = async () => {

    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    setLoading(true);

    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    setLoading(false);

    setSuccess(true);

    setTimeout(() => {

      setShowModal(false);

      setSuccess(false);

      setName("");

      setEmail("");

    }, 1800);

  };
 return (
  <>
    <section id="waitlist" className="waitlist">

      <div className="glow"></div>

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
            onChange={(e) => setEmail(e.target.value)}
          />

          <button onClick={openModal}>
            Join Waitlist
          </button>

        </div>

        <div className="joined">

          <div className="avatars">

            <img src="https://i.pravatar.cc/100?img=12" alt="" />
            <img src="https://i.pravatar.cc/100?img=14" alt="" />
            <img src="https://i.pravatar.cc/100?img=16" alt="" />

          </div>

          <span>
            Join <strong>1,000+</strong> others on the waitlist
          </span>

        </div>

      </div>

      {showModal && (

        <div className="modalOverlay">

          <div className="modal">

            {!success ? (

              <>

                <h3>Almost there 👋</h3>

                <p>
                  Tell us your name to reserve your spot.
                </p>

                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                />

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Joining..." : "Continue"}
                </button>

              </>

            ) : (

              <div className="success">

                <div className="tick">
                  ✓
                </div>

                <h3>You're on the list!</h3>

                <p>
                  We'll notify you as soon as AGAD launches.
                </p>

              </div>

            )}

          </div>

        </div>

      )}

    </section>

    <style jsx>{`
    .waitlist{
  padding:60px 20px 100px;
  position:relative;
  overflow:hidden;
  background:linear-gradient(
    180deg,
    #f6fbff,
    #ffffff
  );
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

  background:#2563EB;

  color:white;

  font-size:16px;

  font-weight:700;

  cursor:pointer;

  transition:.3s;

}

.inputBox button:hover{

  background:#1D4ED8;

  transform:translateY(-2px);

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

/* ====================== */
/* MODAL */
/* ====================== */

.modalOverlay{

  position:fixed;

  inset:0;

  background:rgba(15,23,42,.45);

  backdrop-filter:blur(10px);

  display:flex;

  justify-content:center;

  align-items:center;

  z-index:999;

  animation:fade .25s ease;

}

.modal{

  width:440px;

  background:white;

  border-radius:28px;

  padding:48px;

  box-shadow:
  0 40px 90px rgba(0,0,0,.18);

  display:flex;

  flex-direction:column;

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

  background:#2563EB;

  color:white;

  font-size:18px;

  font-weight:700;

  cursor:pointer;

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