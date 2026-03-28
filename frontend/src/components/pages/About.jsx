import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./about.module.css";

function About() {
  const navigate = useNavigate();

  // 🔐 Auth check
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/auth");
    }
  }, [navigate]);

  return (
    <div className={styles.aboutPage}>
      
      {/* HERO SECTION */}
      <div className={styles.hero}>
        <h1>🪔 Our Sacred Journey 🪔</h1>
        <p>
          Bringing you authentic ritual products with devotion and love 🌺.
          Every item carries the essence of tradition.
        </p>

        {/* Motivational Mantra */}
        <div className={styles.mantra}>
          <p>“ॐ सर्वे भवन्तु सुखिनः, सर्वे सन्तु निरामयाः”</p>
          <p>(May all be happy, may all be free from illness)</p>
        </div>
      </div>

      {/* STORY SECTION */}
      <div className={styles.story}>
        <h2>Our Story</h2>
        <p>
          Founded with a vision to make traditional Hindu rituals accessible
          to everyone, we source high-quality items and maintain a deep
          connection with spiritual practices. From diyas and incense to
          puja kits, every product is curated with care.
        </p>
      </div>

      {/* MISSION & VISION */}
      <div className={styles.missionVision}>
        <div className={styles.card}>
          <h3>Our Mission</h3>
          <p>
            To provide authentic, high-quality ritual products while
            preserving the spiritual essence of Hindu traditions.
          </p>
        </div>
        <div className={styles.card}>
          <h3>Our Vision</h3>
          <p>
            To become the go-to destination for devotees seeking meaningful
            products for their spiritual journey.
          </p>
        </div>
      </div>

      {/* CORE VALUES */}
      <div className={styles.values}>
        <h2>Core Values</h2>
        <ul>
          <li>Authenticity 🕉️</li>
          <li>Devotion 🪔</li>
          <li>Tradition 🌺</li>
          <li>Quality ✨</li>
        </ul>
      </div>
    </div>
  );
}

export default About;