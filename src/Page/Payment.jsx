import { useEffect, useRef } from "react";
import axios from "axios";

export default function Payment() {

  const started = useRef(false);

  useEffect(() => {

    if (started.current) return;
    started.current = true;

    const startPayment = async () => {
      try {

        const delivery = JSON.parse(localStorage.getItem("deliveryInfo"));
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

        if (!delivery) {
          alert("Fill delivery form first");
          window.location.href = "/cart";
          return;
        }

        if (cartItems.length === 0) {
          alert("Cart is empty");
          window.location.href = "/cart";
          return;
        }
        const token = localStorage.getItem("token")

        const res = await axios.post(
          "https://queeny-pastry.onrender.com/api/payment/initialize",
          {
            email: delivery.email,
            cartItems,
            delivery
          },{
               headers: {
              "Authorization": `Bearer ${token}`
             }
            }
        );

        // 🔥 Redirect to Paystack
        window.location.href = res.data.authorization_url;

      } catch (error) {
        console.log(error);
        alert("Payment failed");
      }
    };

    startPayment();

  }, []);

  return <h2 style={{textAlign:"center"}}>Redirecting to payment...</h2>;
}