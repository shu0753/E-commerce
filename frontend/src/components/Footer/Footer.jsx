import React from "react";
import { Link } from "react-router-dom";
import styles from "./footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>

      <div className={styles.container}>

        {/* Brand */}
        <div className={styles.column}>
          <h2 className={styles.brand}>🛕 ShubhDeepMart</h2>
          <p>
            Bringing devotion to your doorstep. पूजा सामग्री, हवन सामग्री,
            और सभी धार्मिक वस्तुएं एक ही जगह।
          </p>
        </div>

        {/* Categories */}
        <div className={styles.column}>
          <h3>Categories</h3>
          <ul>
            <li>Dhoop & Agarbatti</li>
            <li>Diyas & Lamps</li>
            <li>Pooja Thali</li>
            <li>God Idols</li>
            <li>Pooja Samagri</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className={styles.column}>
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Shop</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/about">About Us</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className={styles.column}>
          <h3>Contact Us</h3>
          <p>📍 Vadodara, Gujarat</p>
          <p>📞 +91 93264 30335</p>
          <p>📧 support@shubhdeepmart.com</p>
          <p>🕉️ Serving faith with purity</p>
        </div>

      </div>

      {/* Mantra Section */}
      <div className={styles.mantraBox}>
        <p>
  ॐ सह नाववतु, सह नौ भुनक्तु 🌸🕊️(May we be protected together, may we grow in harmony)🙏
</p>
      </div>

      {/* Bottom */}
      <div className={styles.bottom}>
        <p>© 2026 ShubhDeepMart | Made with devotion ❤️</p>
      </div>

    </footer>
  );
}

export default Footer;