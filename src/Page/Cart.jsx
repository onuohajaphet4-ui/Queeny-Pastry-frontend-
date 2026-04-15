import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiLock, FiTrash2 } from "react-icons/fi";
import { FaArrowLeft, FaShoppingBasket, FaWhatsapp } from "react-icons/fa";
import "./Cart.css";
import Mobile from "./Smallcart";
import Nav from "../Component/Nav";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  
  // FORMAT PRICE
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(price);
  };

  
  // LOAD CART FROM LOCAL STORAGE
  
  useEffect(() => {
    const fetchCart = () => {
      try {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
      } catch (error) {
        console.error("Error loading cart:", error);
        setCart([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  
 //Delete
  const deleteCart = (_id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this product?"
    );

    if (!confirmDelete) return;

    const updatedCart = cart.filter((item) => item._id !== _id);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  
  // CHANGE QUANTITY

  const changeQty = (id, type) => {
    const updatedCart = cart.map((item) => {
      if (item._id !== id) return item;

      let newQty =
        type === "inc"
          ? item.quantity + 1
          : Math.max(1, item.quantity - 1);

      return { ...item, quantity: newQty };
    });

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // ===============================
  // TOTAL
  // ===============================
  const totalAmount = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  // ===============================
  // WHATSAPP ORDER
  // ===============================
  const generateWhatsAppLink = () => {
    const phone = "2347074293026";

    let message = "Hello Quenndy Pastry , I'd like to place an order:\n\n";

    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (x${item.quantity}) - ₦${
        item.price * item.quantity
      }\n`;
    });

    message +=`\nSubtotal: ₦${totalAmount}\n`;
    message += `Delivery Fee: ₦0\n`;
    message += `Total: ₦${totalAmount}`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  // ===============================
  // LOADING
  // ===============================
  if (loading) {
    return <h2>Loading cart...</h2>;
  }

  return (
    <div>
      <Nav />

      <div className="cart-container">
        <div className="review">
          <h1>Your Shopping Cart</h1>
          <p>Review your items before checkout</p>
        </div>

        <hr style={{ marginBottom: "20px" }} />

        {/* EMPTY CART */}
        {cart.length === 0 ? (
          <div className="empty">
            <FaShoppingBasket size={70} className="icon" />

            <h3>Your food basket is empty</h3>

            <p>
              Looks like you haven't added anything to your food basket yet
            </p>

            <Link to="/product" style={{ textDecoration: "none" }}>
              <button>
                <FaArrowLeft /> Browse Menu
              </button>
            </Link>
          </div>
        ) : (
          <div className="cart">
            {/* CART ITEMS */}
            <div className="ddiv">
              {cart.map((item) => (
                <div key={item._id} className="cart-item">
                  <img src={item.imageUrl} alt="" />
                  <div className="div">
                    <div className="divv">
                      <h4>{item.name}</h4>

                      <div className="divvv">
                        <button
                          onClick={() =>
                            changeQty(item._id, "dec")
                          }
                        >
                          -
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          onClick={() =>
                            changeQty(item._id, "inc")
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p">
                    <p>
                      {formatPrice(
                        item.price * item.quantity
                      )}
                    </p>

                    <FiTrash2
                      onClick={() => deleteCart(item._id)}
                      size={20}
                      color="red"
                      className="divvvv"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* CHECKOUT SIDE */}
            <div className="check">
              <div className="fo">
                <h4>Subtotal</h4>
                <p style={{ fontWeight: "bold", fontSize: "20px" }}>
                  {formatPrice(totalAmount)}
                </p>
              </div>

              <div className="fo">
                <h4>Delivery fee</h4>
                <p style={{ fontWeight: "bold", fontSize: "20px" }}>
                  ₦0
                </p>
              </div>

              <div className="fo">
                <h4>Total</h4>
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "green",
                  }}
                >
                  {formatPrice(totalAmount)}
                </p>
              </div>

              {/* NORMAL CHECKOUT */}
              <button onClick={() => navigate("/form")}>
                Checkout
              </button>

              <div className="or">or</div>

              {/* WHATSAPP CHECKOUT */}
              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <button>
                  <FaWhatsapp color="green" size={15} /> Order Via WhatsApp
                </button>
              </a>

              <p className="end">
                <FiLock size={20} color="gray" /> SSL Encryption
              </p>

              <p className="end">
                Your payment information is protected with bank-level security
              </p>
            </div>
          </div>
        )}

        <div className="cart-mobile">
          <Mobile />
        </div>
      </div>

      {/* FLOATING ICONS */}
      <div className="iconic">
        <a href="https://wa.me/2347074293026">
          <FaWhatsapp color="green" size={35} />
        </a>

        <hr />

        <a href="tel:08145990289">
          <ion-icon
            name="call-outline"
            style={{ color: "blue" }}
          ></ion-icon>
        </a>
      </div>
    </div>
  );
};

export default Cart;