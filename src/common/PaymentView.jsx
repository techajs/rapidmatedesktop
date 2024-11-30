import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import Styles from "../assets/css/home.module.css";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faPercent,
  faCheck,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import Truck from "../assets/images/Truck.png";
import { Link, useLocation } from "react-router-dom";
import CommonHeader from "./CommonHeader";
import { useSelector } from "react-redux";
import getImage from "../components/consumer/common/GetImage";
const stripePromise = loadStripe(
  "pk_test_51PgiLhLF5J4TIxENPZOMh8xWRpEsBxheEx01qB576p0vUZ9R0iTbzBFz0QvnVaoCZUwJu39xkym38z6nfNmEgUMX00SSmS6l7e"
);

const PaymentPage = () => {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  const { order, orderCustomerDetails, dropoffDetail } = location.state || {};
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/payment-success", // Set your success page
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Payment successful!");
    }

    setLoading(false);
  };

  return (
    <>
      <CommonHeader userData={user} />

      <section className={Styles.addPickupDetailsSec}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div>
                <div>
                  <Link
                    className={`${Styles.addPickupDetailsBackArrow}`}
                    href="#"
                  >
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </Link>
                  <h2 className={Styles.addPickupDetailsText}>Payment</h2>
                  <p className={Styles.addPickupDetailsSubtext}>
                    Please select a payment method
                  </p>
                </div>

                <div className="row">
                  <div className="col-md-8">
                    <div>
                      <div className={Styles.promoCodeCardPayments}>
                        <FontAwesomeIcon
                          className={Styles.paymentPromoCodeIcon}
                          icon={faPercent}
                        />
                        <Form.Control
                          className={Styles.promoCodeInputPayment}
                          type="text"
                          placeholder="Promo code"
                        />
                        <button className={Styles.paymentApplyCouponBtn}>
                          <FontAwesomeIcon icon={faCheck} />
                        </button>
                      </div>

                      <p className={Styles.paymentDebitCreditCardsText}>
                        Credi & Debit Cards
                      </p>

                      <div className={Styles.paymentsOffCreaditCardInfo}>
                        <FontAwesomeIcon
                          className={Styles.paymentsCardsInfoCircle}
                          icon={faCircleInfo}
                        />
                        <p className={Styles.paymentCreditCardOfferText}>
                          20% off on city bank credit card!
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className={Styles.paymentInvoiceCardMain}>
                      <div className={Styles.paymentInvoiceTruckImageCard}>
                        <img
                          className={Styles.paymentInvoiveTruckIcon}
                          src={getImage(order?.selectedVehicleDetails)}
                          alt="icon"
                        />
                      </div>

                      <p className={Styles.paymentOrderSummaryText}>
                        Order Summary
                      </p>

                      <div>
                        <div className={Styles.paymentInvoiceDetailsText}>
                          <p className={Styles.paymentAddressDetailText}>
                            Pickup
                          </p>
                          <p className={Styles.paymentMainDetailsText}>
                            {order?.pickupLocation?.length <= 27
                              ? order?.pickupLocation
                              : `${order?.pickupLocation.substring(0, 27)}...`}
                          </p>
                        </div>

                        <div className={Styles.paymentInvoiceDetailsText}>
                          <p className={Styles.paymentAddressDetailText}>
                            Drop-off
                          </p>
                          <p className={Styles.paymentMainDetailsText}>
                            {/* {order?.dropoffLocation} */}
                            {order?.dropoffLocation?.length <= 27
                              ? order?.dropoffLocation
                              : `${order?.dropoffLocation.substring(0, 27)}...`}
                          </p>
                        </div>

                        <div className={Styles.paymentInvoiceDetailsText}>
                          <p className={Styles.paymentAddressDetailText}>
                            Vehicle type
                          </p>
                          <p className={Styles.paymentMainDetailsText}>
                            {order?.selectedVehicleDetails?.vehicle_type}
                          </p>
                        </div>

                        <div className={Styles.paymentInvoiceDetailsText}>
                          <p className={Styles.paymentAddressDetailText}>
                            Distance
                          </p>
                          <p className={Styles.paymentMainDetailsText}>
                            {order?.distance}
                          </p>
                        </div>

                        <div className={Styles.paymentInvoiceDetailsText}>
                          <p className={Styles.paymentAddressDetailText}>
                            Time
                          </p>
                          <p className={Styles.paymentMainDetailsText}>
                            {order?.duration}
                          </p>
                        </div>

                        <div className={Styles.paymentTotalAmountCard}>
                          <p className={Styles.paymentTotalAmounttext}>
                            Total amount
                          </p>
                          <p className={Styles.paymentTotalAmounttext}>
                            € {order?.selectedVehiclePrice?.toFixed(2) || 0.0}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={Styles.addPickupDetailsBtnCard}>
                  <button className={Styles.addPickupDetailsCancelBTn}>
                    Cancel
                  </button>
                  {/* <Link
                    to="/pickup-looking-for-driver"
                    className={Styles.addPickupDetailsNextBtn}
                  >
                    Pay Now
                  </Link> */}
                  <form onSubmit={handleSubmit}>
                    <PaymentElement />
                    <button type="submit" disabled={!stripe || loading}>
                      {loading ? "Processing..." : "Pay Now"}
                    </button>
                  </form>
                  {message && <p>{message}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

function PaymentView() {
  const [clientSecret, setClientSecret] = useState("");

  React.useEffect(() => {
    // Fetch client secret from the backend
    fetch("http://localhost:3009/api/payment/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 10, currency: "eur" }), // Adjust amount and currency as needed
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const options = {
    clientSecret,
    appearance: {
      theme: "stripe", // Other themes: 'flat', 'night', 'none'
    },
  };
  return (
    <div>
      {clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
          <PaymentPage />
        </Elements>
      ) : (
        <>
          <p>Loading...</p>
        </>
      )}
    </div>
  );
}

export default PaymentView;
