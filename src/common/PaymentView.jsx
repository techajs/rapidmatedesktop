import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Styles from "../assets/css/home.module.css";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPercent, faCheck, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import Truck from "../assets/images/Truck.png";
import { Link, useLocation } from "react-router-dom";
import CommonHeader from './CommonHeader';
import { useSelector } from 'react-redux';
import getImage from "../components/consumer/common/GetImage";


function PaymentView() {
  const user  = useSelector((state) => state.auth.user);
  const location = useLocation();
  const { order, orderCustomerDetails, dropoffDetail } = location.state || {};
  
  // const stripe = useStripe();
  // const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const dataSubmit = () =>{
    
  }
  return (
    <>
      <CommonHeader userData={user} />
   
        
      <section className={Styles.addPickupDetailsSec}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div>
                <div>
                  <Link className={`${Styles.addPickupDetailsBackArrow}`} href="#">
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

                      <p className={Styles.paymentOrderSummaryText}>Order Summary</p>

                      <div>
                        <div className={Styles.paymentInvoiceDetailsText}>
                          <p className={Styles.paymentAddressDetailText}>Pickup</p>
                          <p className={Styles.paymentMainDetailsText}>
                    
                          {order?.pickupLocation?.length <=27 ? order?.pickupLocation : `${order?.pickupLocation.substring(0, 27)}...`}

                          </p>
                        </div>

                        <div className={Styles.paymentInvoiceDetailsText}>
                          <p className={Styles.paymentAddressDetailText}>Drop-off</p>
                          <p className={Styles.paymentMainDetailsText}>
                          {/* {order?.dropoffLocation} */}
                          {order?.dropoffLocation?.length <=27 ? order?.dropoffLocation : `${order?.dropoffLocation.substring(0, 27)}...`}
                          </p>
                        </div>

                        <div className={Styles.paymentInvoiceDetailsText}>
                          <p className={Styles.paymentAddressDetailText}>
                            Vehicle type
                          </p>
                          <p className={Styles.paymentMainDetailsText}>{order?.selectedVehicleDetails?.vehicle_type}</p>
                        </div>

                        <div className={Styles.paymentInvoiceDetailsText}>
                          <p className={Styles.paymentAddressDetailText}>Distance</p>
                          <p className={Styles.paymentMainDetailsText}>{order?.distance}</p>
                        </div>

                        <div className={Styles.paymentInvoiceDetailsText}>
                          <p className={Styles.paymentAddressDetailText}>Time</p>
                          <p className={Styles.paymentMainDetailsText}>{order?.duration}</p>
                        </div>

                        <div className={Styles.paymentTotalAmountCard}>
                          <p className={Styles.paymentTotalAmounttext}>
                            Total amount
                          </p>
                          <p className={Styles.paymentTotalAmounttext}>€ {order?.selectedVehiclePrice?.toFixed(2) || 0.00}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={Styles.addPickupDetailsBtnCard}>
                  <button className={Styles.addPickupDetailsCancelBTn}>Cancel</button>
                  <Link
                    to="/pickup-looking-for-driver"
                    className={Styles.addPickupDetailsNextBtn}
                  >
                    Pay Now

                  </Link>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PaymentView;
