import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./cart.module.css";
function PaymentButton({ amount }) {
  const formattedAmount = Number(amount).toFixed(2);

  return (
    <button
      className={styles.payBtn}
      onClick={() => alert(`Pay ₹${formattedAmount}`)}
    >
      💳 Pay Now ₹{formattedAmount}
    </button>
  );
}
function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [gst, setGst] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchCart = async () => {
    const userId = localStorage.getItem("userId");

    try {
      const res = await fetch("http://localhost:5000/api/getCart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId })
      });

      const data = await res.json();

      setCartItems(data?.items || []);
      setSubtotal(data?.subtotal || 0);
      setGst(data?.gst || 0);
      setTotal(data?.total || 0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) navigate("/auth");
    else fetchCart();
  }, [navigate]);

  const handleRemove = async (productId) => {
    const userId = localStorage.getItem("userId");
    if (!window.confirm("Remove this item?")) return;

    try {
      const res = await fetch("http://localhost:5000/api/removeCartProduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId })
      });

      if (res.ok) fetchCart();
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  const handleQuantity = async (productId, type) => {
    const userId = localStorage.getItem("userId");

    try {
      const res = await fetch("http://localhost:5000/api/updateCartQuantity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId, type })
      });

      if (res.ok) fetchCart();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <h2 className={styles.loading}>Loading...</h2>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🪔 Your Sacred Cart 🪔</h1>

      <div className={styles.wrapper}>
        
        {/* LEFT */}
        <div className={styles.left}>
          {cartItems.length === 0 ? (
            <h2 className={styles.empty}>No items in your cart 🌺</h2>
          ) : (
            cartItems.map((item) => (
              <div key={item?.productId?._id} className={styles.card}>
                <img
                  src={item?.productId?.image || "https://via.placeholder.com/150"}
                  alt=""
                  className={styles.image}
                />

                <div className={styles.details}>
                  <h3>{item?.productId?.productName}</h3>
                  <p className={styles.price}>₹{item?.productId?.price}</p>

                  <div className={styles.qty}>
                    <button onClick={() => handleQuantity(item.productId._id, "dec")}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantity(item.productId._id, "inc")}>+</button>
                  </div>
                </div>

                <button
                  className={styles.delete}
                  onClick={() => handleRemove(item.productId._id)}
                >
                  🗑
                </button>
              </div>
            ))
          )}
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          <h2>Order Summary</h2>

          <div className={styles.row}>
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className={styles.row}>
            <span>GST (18%)</span>
            <span>₹{gst.toFixed(2)}</span>
          </div>

          <div className={styles.row}>
            <span>Delivery</span>
            <span className={styles.free}>FREE</span>
          </div>

          <div className={styles.total}>
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <button className={styles.checkout}>
            🌿 Complete Your Puja 🌿
          </button>

          <PaymentButton amount={total} />
        </div>
      </div>
    </div>
  );
}

export default Cart;