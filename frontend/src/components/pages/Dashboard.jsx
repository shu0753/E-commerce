import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.css";

function Dashboard() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState([]);

  // 🌸 Hero Messages
  const messages = [
    "🪔 Welcome to ShubhDeep Mart — Where Every Ritual Begins with Devotion ✨",
    "🌸 ShubhDeep Mart — Light the Lamp of Faith in Every Home 🪔",
    "🕉️ Experience Divine Living with ShubhDeep Mart ✨",
    "🔱 Your One-Stop Destination for All Pooja Essentials 🪔",
  ];

  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");

  // ✨ Typing + rotating text
  useEffect(() => {
    let i = 0;
    const currentText = messages[index];

    const typing = setInterval(() => {
      setDisplayText(currentText.slice(0, i + 1));
      i++;

      if (i === currentText.length) {
        clearInterval(typing);

        setTimeout(() => {
          setIndex((prev) => (prev + 1) % messages.length);
          setDisplayText("");
        }, 2000);
      }
    }, 40);

    return () => clearInterval(typing);
  }, [index]);

  // 🎞️ Slider Images
  const sliderImages = [
    "https://i.pinimg.com/1200x/de/b5/08/deb508f248644a7ae9d668ee1a2a8fbd.jpg",
    "https://i.pinimg.com/1200x/02/6f/34/026f3447dfac30fc73572e8e7a32d92a.jpg",
    "https://i.pinimg.com/1200x/ae/7c/ba/ae7cbaca94a04fb925604319d02b0e17.jpg",
  ];

  // 🔄 Slider Auto Change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [sliderImages.length]);

  // 🔀 Shuffle Function
  const shuffleArray = (array) => {
    let newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  // 🛍️ Fetch Products
  useEffect(() => {
    fetch("http://localhost:5000/api/getProduct")
      .then((res) => res.json())
      .then((data) => {
        const allProducts = data.productData || [];
        const shuffled = shuffleArray(allProducts);
        setProducts(shuffled.slice(0, 5));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={styles.dashboardPage}>
      
      {/* 🌸 HERO SECTION */}
      <div className={styles.heroText}>
        <h1 className={styles.glowText}>{displayText}</h1>
        {/* Subtitle */}
        <p className={styles.subtitle}>
          पूजा सामग्री • आध्यात्मिक उत्पाद • शुद्ध परंपरा 🌸
        </p>
      </div>

      {/* 🎞️ SLIDER */}
      <div className={styles.slider}>
        {sliderImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`slide-${index}`}
            className={
              index === currentSlide
                ? styles.activeSlide
                : styles.inactiveSlide
            }
          />
        ))}
      </div>

      {/* 🛍️ PRODUCTS */}
      <h2 className={styles.sectionTitle}>🪔 Recommended Products</h2>

      <div className={styles.productGrid}>
        {products.length === 0 && (
          <p style={{ textAlign: "center" }}>No products available</p>
        )}

        {products.map((product) => (
          <div className={styles.card} key={product._id}>
            
            <div className={styles.cardImage}>
              <img
                src={product.image || "https://via.placeholder.com/250"}
                alt={product.productName}
              />
              <span className={styles.badge}>{product.category}</span>
            </div>

            <div className={styles.cardContent}>
              <h3>{product.productName}</h3>
              <p className={styles.price}>₹{product.price}</p>
            </div>

            <div className={styles.cardActions}>
              <button className={styles.viewBtn}>View</button>
              <button className={styles.cartBtn}>Add to Cart</button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;