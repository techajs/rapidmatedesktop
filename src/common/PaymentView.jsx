import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Styles from "../assets/css/home.module.css";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPercent, faCheck, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import Truck from "../assets/images/Truck.png";
import { Link } from "react-router-dom";
import CommonHeader from './CommonHeader';
import { useSelector } from 'react-redux';

// Load your Stripe publishable key
const stripePromise = loadStripe("sk_test_51PgiLhLF5J4TIxENpifRFYuB13xzQzszqugfYchc33Meu4vh6zDM6tDCX0Fbv863qGGfM69PwF1CTHwkiSEm5XHv00wtIuDU2O"); // Replace with your Stripe publishable key

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setError(error.message);
    } else {
      // Fetch the client secret from your backend (assuming your API is set up)
      const response = await fetch("https://locahost:3000/api/paymentintent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: 9.30, currency: "eur" }), // Amount in cents
      });
      const { clientSecret } = await response.json();

      const confirmPayment = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (confirmPayment.error) {
        setError(confirmPayment.error.message);
      } else {
        setSuccess(true);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button disabled={!stripe}>Pay Now</button>
      {error && <div>{error}</div>}
      {success && <div>Payment Successful!</div>}
    </form>
  );
}

function PaymentView() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <CommonHeader userData={user} />
      <section className={Styles.addPickupDetailsSec}>
        <div className="container">
          {/* Wrap the payment form in Elements */}
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </section>
    </>
  );
}

export default PaymentView;
