import axios from "axios";

const loadScript = (src) => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

const PaymentButton = ({ amount }) => {
    const handlePayment = async () => {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if (!res) {
            alert("Razorpay SDK failed to load");
            return;
        }

        // 1️⃣ Create order
        const { data } = await axios.post(
            "http://localhost:5000/api/payment/create-order",
            { amount }
        );

        const { order } = data;

        // 2️⃣ Open Razorpay
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: "INR",
            name: "Your Store",
            description: "Test Transaction",
            order_id: order.id,

            handler: async function (response) {
                const verifyRes = await axios.post(
                    "http://localhost:5000/api/payment/verify",
                    response
                );

                if (verifyRes.data.success) {
                    alert("Payment successful 🎉");
                } else {
                    alert("Payment verification failed");
                }
            },

            prefill: {
                name: "Pranay",
                email: "test@example.com",
                contact: "9999999999",
            },

            theme: {
                color: "#3399cc",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    return <button onClick={handlePayment}>Pay ₹{amount}</button>;
};

export default PaymentButton;