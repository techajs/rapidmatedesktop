import React, { useEffect, useState } from "react";
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
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CommonHeader from "./CommonHeader";
import { useSelector } from "react-redux";
import getImage from "../components/consumer/common/GetImage";
import { addPayment, checkPromoCode, createPickupOrder } from "../data_manager/dataManage";
import { ToastContainer } from "react-toastify";
import { showErrorToast, showSuccessToast } from "../utils/Toastify";
import { addLocation, BASE_URL, buildAddress, getLocation, uploadImage } from "../utils/Constants";

const stripePromise = loadStripe("pk_test_51PgiLhLF5J4TIxENPZOMh8xWRpEsBxheEx01qB576p0vUZ9R0iTbzBFz0QvnVaoCZUwJu39xkym38z6nfNmEgUMX00SSmS6l7e");

const PaymentPage = ({
  clientSecret,
  totalAmount,
  setTotalAmount,
  paymentAmount,
  setPaymentAmount,
}) => {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  const  navigate= useNavigate();

  const { order, orderCustomerDetails } = location.state || {};
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [orderNumber, setOrderNumber] = useState(null);
  const [offerDiscount, setOfferDiscount] = useState(order?.paymentDiscount);
  const [promoCodeResponse, setPromoCodeResponse] = useState();
  const [promoCode, setPromoCode] = useState("");
  const [sourceLocationId, setSourceLocationId] = useState("");
  const [destinationLocationId, setDestinationLocationId] = useState("");
  const [packageImageId, setPackageImageId] = useState(null);
  console.log("order",order)
  console.log("ordercus",orderCustomerDetails)

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!stripe || !elements) return;

    try {
      const pickupLocationParam=order?.addPickupLocation
      const dropoffLocationParam=order?.addDestinationLocation
      const pickupLocatiId = await addLocation(pickupLocationParam);
      const dropoffLocatiId = await addLocation(dropoffLocationParam);
      if (pickupLocatiId=="false") {
        showErrorToast("Something went wrong.");
        return true;
      }
      if (dropoffLocatiId=="false") {
        showErrorToast("Something went wrong.");
        return true;
      }
      setSourceLocationId(pickupLocatiId);
      setDestinationLocationId(dropoffLocatiId);
      const passportFormData = new FormData();
      passportFormData.append("file", orderCustomerDetails?.file[0]);
      const passportResponse = await uploadImage(passportFormData);
      setPackageImageId(passportResponse);
    } catch (error) {
      showErrorToast(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => {
    const callPlaceOrder = async () =>{
      await placePickUpOrder()
    }
    if(sourceLocationId && destinationLocationId && packageImageId){
      callPlaceOrder()
    }
    // callPlaceOrder()
  }, [sourceLocationId, destinationLocationId,packageImageId]); 
  const placePickUpOrder = async () => {
    if (user.userDetails) {
      const distance = order?.distance;
      const floatDistance = distance
        ? parseFloat(distance.replace(" km", ""))
        : 0;
      let requestParams = {
        enterprise_ext_id: user.userDetails.ext_id,
        branch_id: order?.selectedBranch.id,
        delivery_type_id: order?.serviceType.id,
        service_type_id: order?.selectedServiceType,
        vehicle_type_id: order?.selectedVehicleDetails.id,
        pickup_date: params.pickup_date,
        pickup_time: params.pickup_time,
        pickup_location_id: sourceLocationId ||  1,
        dropoff_location_id: destinationLocationId || 2,
        is_repeat_mode: params.is_repeat_mode,
        repeat_day: '',
        is_my_self: 1,
        first_name: userDetails.userDetails[0].first_name,
        last_name: userDetails.userDetails[0].last_name,
        company_name: orderCustomerDetails?.company,
        email: user.userDetails.email,
        mobile: params.mobile,
        package_id: params.package_id,
        pickup_notes: params.pickup_notes,
        is_same_dropoff_location: 0,
        repeat_dropoff_location_id: '',
        distance:floatDistance,
        total_amount: parseFloat(order.selectedVehiclePrice),
        package_photo: packageImageId,
        repeat_mode: orderCustomerDetails?.repeat_mode,
        repeat_every: orderCustomerDetails?.repeat_every,
        repeat_until: orderCustomerDetails?.repeat_until,
      };
      if (order.selectedBranch) {
        requestParams.branches = order.selectedBranch;
      }
      // if (order.date) {
      //   var scheduleParam = {
      //     schedule_date_time: order?.date + " " + order?.time,
      //   };
      // }
      // const distance = order?.distance;
      // const floatDistance = distance
      //   ? parseFloat(distance.replace(" km", ""))
      //   : 0;
      // let requestParams = {
      //   consumer_ext_id: user.userDetails.ext_id,
      //   service_type_id: order?.date ? 1 : 2,
      //   vehicle_type_id: order?.selectedVehicleDetails.id,
      //   pickup_location_id: sourceLocationId ||  1,
      //   dropoff_location_id: destinationLocationId || 2,
      //   distance: floatDistance,
      //   total_amount: parseFloat(paymentAmount),
      //   discount: offerDiscount,
      //   pickup_notes: orderCustomerDetails?.pickupNotes || "",
      //   company_name: orderCustomerDetails?.company || "",
      //   drop_first_name: dropoffDetail?.first_name || "",
      //   drop_last_name: dropoffDetail?.last_name || "",
      //   drop_mobile: dropoffDetail?.phone ? "+" + dropoffDetail.phone : "",
      //   package_photo:packageImageId,
      //   drop_company_name: dropoffDetail?.company || "",
      //   ...scheduleParam,
      // };

      // if (promoCodeResponse) {
      //   requestParams.promo_code = promoCodeResponse.promoCode;
      //   requestParams.promo_value = promoCodeResponse.discount;
      //   requestParams.order_amount = parseFloat(totalAmount);
      // }

      setLoading(true);
      // createPickupOrder(
      //   requestParams,
      //   (successResponse) => {
      //     if (successResponse[0]._success) {
      //       setLoading(false);
      //       setOrderNumber(successResponse[0]._response[0].order_number);
      //     }
      //   },
      //   (errorResponse) => {
      //     setLoading(false);

      //     if (errorResponse.errors) {
      //       err = errorResponse.errors.msg[0].msg;
      //     } else {
      //       err = errorResponse[0]._errors.message;
      //     }
      //     showErrorToast(err);
      //   }
      // );
    } else {
      showErrorToast("Consumer extended ID missing");
    }
  };

  const doPayment = async () => {
    setLoading(true);
    const { error,paymentIntent} = await stripe.confirmPayment({
      elements,
      confirmParams: {
        payment_method_data: {
          billing_details: {
            name: user?.userDetails.first_name +" "+ user?.userDetails?.last_name,
            email: user?.userDetails.email || '',
            address: {
              line1: addPickupL?.address,
              city: addPickupL?.city,
              postal_code: addPickupL?.postal_code,
              country:addPickupL?.country,
            }
          }
        }
      },
      redirect: "if_required", 
    });

    if (error) {
      showErrorToast(error.message);
    }

    if (paymentIntent?.status === "succeeded") {
      setMessage("Payment successful!");
      await createPayment()
    } else {
      showErrorToast(`Payment not successful. Current status: ${paymentIntent?.status}`);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (orderNumber) {
      doPayment();
    }
  }, [orderNumber]);

  useEffect(() => {
    {
      offerDiscount > 0 &&
        setPaymentAmount(calculateFinalPrice(paymentAmount, offerDiscount));
    }
    
  }, []);

  const handleApplyCoupon = () => {
    let params = {
      promoCode: promoCode,
      orderAmount: paymentAmount,
    };
    checkPromoCode(
      params,
      (successResponse) => {
        if (successResponse[0]._success) {
          const promoResponse = successResponse[0]._response[0];
          setPromoCodeResponse(promoResponse);
          setPaymentAmount(successResponse[0]._response[0].totalAmount);
        }
      },
      (errorResponse) => {
        let err = "";
        if (errorResponse.errors) {
          err = errorResponse.errors.msg[0].msg;
        } else {
          err = errorResponse[0]._errors.message;
        }
        showErrorToast(err);
      }
    );
  };
  const calculateFinalPrice = (originalPrice, discountPercentage) => {
    const discount = (originalPrice * discountPercentage) / 100;
    const finalPrice = originalPrice - discount;
    return finalPrice.toFixed(2);
  };

  const createPayment = async () => {
    let requestParams = {
      order_number: orderNumber,
      amount: paymentAmount,
    };
    addPayment(
      requestParams,
      (successResponse) => {
        setLoading(false);
        if (successResponse[0]._success) {
          navigate("/consumer/find-driver", {
            state: {
              orderNumber:orderNumber
            },
          });
        }
      },
      (errorResponse) => {
        let params = {
          order_number: orderNumber,
          status: "Payment Failed",
        };
       showErrorToast('Payment Failed.')
      }
    );
  };

  const pickupLocation =buildAddress(
    order?.addPickupLocation?.address,
    order?.addPickupLocation?.city,
    order?.addPickupLocation?.state,
    order?.addPickupLocation?.country,
    order?.addPickupLocation?.postal_code
  );;
  const dropOffLocation =buildAddress(
    order?.addDestinationLocation?.address,
    order?.addDestinationLocation?.city,
    order?.addDestinationLocation?.state,
    order?.addDestinationLocation?.country,
    order?.addDestinationLocation?.postal_code
  );

  return (
    <>
      <CommonHeader userData={user} />
      <section className={Styles.addPickupDetailsSec}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div>
                <div>
                  <Link className={Styles.addPickupDetailsBackArrow} href="#">
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
                          value={promoCode}
                          disabled={promoCodeResponse ? true : false}
                          onChange={(e) => setPromoCode(e.target.value)}
                        />
                        {promoCodeResponse ? (
                          <button
                            className={Styles.paymentApplyCouponBtn}
                            onClick={() => {
                              setPromoCodeResponse(null);
                              setPaymentAmount(totalAmount);
                            }}
                          >
                            <FontAwesomeIcon icon={faClose} />
                          </button>
                        ) : (
                          <button
                            className={Styles.paymentApplyCouponBtn}
                            onClick={handleApplyCoupon}
                          >
                            <FontAwesomeIcon icon={faCheck} />
                          </button>
                        )}
                      </div>
                      <p className={Styles.paymentDebitCreditCardsText}>
                        Credit & Debit Cards
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
                            {pickupLocation?.length <= 27
                              ? pickupLocation
                              : `${pickupLocation.substring(0, 27)}...`}
                          </p>
                        </div>

                        <div className={Styles.paymentInvoiceDetailsText}>
                          <p className={Styles.paymentAddressDetailText}>
                            Drop-off
                          </p>
                          <p className={Styles.paymentMainDetailsText}>
                            {dropOffLocation?.length <= 27
                              ? dropOffLocation
                              : `${dropOffLocation.substring(0, 27)}...`}
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
                            € {paymentAmount || 0.0}
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

                  {/* <form onSubmit={handleSubmit}>
                    <PaymentElement />
                    <button
                      type="submit"
                      disabled={!stripe || loading}
                      className={`${Styles.addPickupDetailsNextBtn} m-2`}
                    >
                      {loading ? "Processing..." : "Pay Now"}
                    </button>
                  </form>
                  {message && <p>{showSuccessToast(message)}</p>} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

function EnterprisePaymentView() {
  const user = useSelector((state) => state.auth.user);

  const [clientSecret, setClientSecret] = useState("");
  const { order } = useLocation().state || {};
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const  navigate= useNavigate();

  useEffect(() => {
    if (order?.selectedVehiclePrice) {
      const calculatedTotalAmount =
        typeof order.selectedVehiclePrice === "number"
          ? order.selectedVehiclePrice.toFixed(2)
          : parseFloat(order.selectedVehiclePrice).toFixed(2);

      setTotalAmount(calculatedTotalAmount);
      setPaymentAmount(calculatedTotalAmount);
    }
    setTimeout(()=>{
      if(!order){
        navigate('/consumer/dashboard')
      }
    },2000)
  }, [order]);

  useEffect(() => {
    if (paymentAmount > 0) {
      const createPaymentIntent = async () => {
        try {
          const response = await fetch(
            `${BASE_URL}payment/create-payment-intent`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                amount: paymentAmount, // Convert to cents for Stripe
                currency: "eur",
              }),
            }
          );

          const data = await response.json();

          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          } else {
            console.error("Failed to fetch client secret:", data);
          }
        } catch (error) {
          console.error("Error creating payment intent:", error);
        }
      };

      createPaymentIntent();
    }
  }, [paymentAmount]);

  const options = {
    clientSecret,
    appearance: {
      theme: "stripe",
    },
    defaultValues: { billingDetails: { address: { country: "FR" } } },
  };

  return (
    <div>
      {clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
          <PaymentPage
            clientSecret={clientSecret}
            totalAmount={totalAmount}
            setTotalAmount={setTotalAmount}
            paymentAmount={paymentAmount}
            setPaymentAmount={setPaymentAmount}
          />
        </Elements>
      ) : (
        <>
          <CommonHeader userData={user} />
          <p>Loading...</p>
        </>
       
      )}
      <ToastContainer />
    </div>
  );
}

export default EnterprisePaymentView;