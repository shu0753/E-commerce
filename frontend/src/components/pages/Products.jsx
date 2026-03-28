import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./product.module.css";

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Shuffle function for random order
  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/auth");
      return;
    }

    fetch("http://localhost:5000/api/getProduct")
      .then((res) => res.json())
      .then((data) => {
        const productsData = data.productData || [];
        setProducts(shuffleArray(productsData));
      })
      .catch((err) => console.log(err));
  }, [navigate]);

  return (
    <div className={styles.productsPage}>
      {/* HEADER */}
      <div className={styles.header}>
       <h1 className={styles.heading}>🪔 Divine Treasures 🪔</h1>
      </div>

      {/* PRODUCT GRID */}
      <div className={styles.productGrid}>
        {products.map((item) => (
          <div className={styles.card} key={item._id}>
            {/* IMAGE */}
            <div className={styles.cardImage}>
              <img
                src={item.image || "https://via.placeholder.com/300"}
                alt={item.productName}
              />
              <span className={styles.badge}>{item.category}</span>

              {/* RATING */}
              <div className={styles.rating}>
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={
                      i < (item.rating || 0)
                        ? `${styles.star} ${styles.filled}`
                        : styles.star
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            {/* CONTENT */}
            <div className={styles.cardContent}>
              <h2>{item.productName}</h2>
              <p className={styles.price}>₹{item.price}</p>
              <p className={styles.desc}>{item.description}</p>
            </div>

            {/* ACTIONS */}
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

export default Products;