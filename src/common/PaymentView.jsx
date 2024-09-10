import React, { useState } from 'react'
import { UseFetch } from '../utils/UseFetch';
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
import { Link } from "react-router-dom";
import CommonHeader from './CommonHeader';
import { useSelector } from 'react-redux';

function PaymentView() {
  const user = UseFetch();
  

  return (
    <>
    <CommonHeader userData={user}/>
    <section className={Styles.addPickupDetailsSec}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div>
                <div>
                  <Link className={Styles.addPickupDetailsBackArrow} to="/">
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
                          src={Truck}
                          alt="icon"
                        />
                      </div>

                      <p className={Styles.paymentOrderSummaryText}>Order Summary</p>

                      <div>
                        <div className={Styles.paymentInvoiceDetailsText}>
                          <p className={Styles.paymentAddressDetailText}>Pickup</p>
                          <p className={Styles.paymentMainDetailsText}>
                            3891 Ranchview...
                          </p>
                        </div>

                        <div className={Styles.paymentInvoiceDetailsText}>
                          <p className={Styles.paymentAddressDetailText}>Drop-off</p>
                          <p className={Styles.paymentMainDetailsText}>
                            1901 Thornridge Cir...
                          </p>
                        </div>

                        <div className={Styles.paymentInvoiceDetailsText}>
                          <p className={Styles.paymentAddressDetailText}>
                            Vehicle type
                          </p>
                          <p className={Styles.paymentMainDetailsText}>Semi truck</p>
                        </div>

                        <div className={Styles.paymentInvoiceDetailsText}>
                          <p className={Styles.paymentAddressDetailText}>Distance</p>
                          <p className={Styles.paymentMainDetailsText}>2.6 Km</p>
                        </div>

                        <div className={Styles.paymentInvoiceDetailsText}>
                          <p className={Styles.paymentAddressDetailText}>Time</p>
                          <p className={Styles.paymentMainDetailsText}>23 min</p>
                        </div>

                        <div className={Styles.paymentTotalAmountCard}>
                          <p className={Styles.paymentTotalAmounttext}>
                            Total amount
                          </p>
                          <p className={Styles.paymentTotalAmounttext}>€34.00</p>
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
  )
}

export default PaymentView
