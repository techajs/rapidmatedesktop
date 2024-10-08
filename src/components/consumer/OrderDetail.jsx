import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Styles from "../../assets/css/home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faGear,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import Driver from "../../assets/images/Driver-Image.jpeg";
import PackageDrop from "../../assets/images/PackageDrop.png";
import OrderTag from "../../assets/images/OrderFare-Tag.png";
import MasterCard from "../../assets/images/MasterCard-Logo.png";
import Invoice from "../../assets/images/Invoice-Img.png";
import CommonHeader from "../../common/CommonHeader";
import {
  getAVehicleByTypeId,
  getLocationById,
  getViewOrderDetail,
} from "../../data_manager/dataManage";
import { API } from "../../utils/Constants";

function OrderDetail() {
  const location = useLocation();
  const { order, user } = location.state || {};
  const orderNumber = order?.order_number;
  const [orders, setOrders] = useState({});
  const [deliveryboy, setDeliveryboy] = useState({});
  const [destinationAddress, setDestinationAddress] = useState({});
  const [vehicleType, setVehicleType] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);  // Navigate back to the previous page
  };
  useEffect(() => {
    orderDetail();
  }, []);
  const orderDetail = async () => {
    setLoading(true);
    getViewOrderDetail(
      orderNumber,
      (successResponse) => {
        setLoading(false);
        if (successResponse[0]._success) {
          setOrders(successResponse[0]._response.order);
          setDeliveryboy(successResponse[0]._response.deliveryBoy);
          getDestinationAddress(
            successResponse[0]._response.order.dropoff_location_id
          );
          vehicleDetail(successResponse[0]._response.order.vehicle_type_id);
        }
      },
      (errorResponse) => {
        setLoading(false);
      }
    );
  };

  const getDestinationAddress = async (locationId) => {
    setLoading(true);
    getLocationById(
      locationId,
      (successResponse) => {
        setLoading(false);
        if (successResponse[0]._success) {
          setDestinationAddress(successResponse[0]._response[0]);
        }
      },
      (errorResponse) => {
        setLoading(false);
      }
    );
  };
  const vehicleDetail = async (vehicleTypeId) => {
    setLoading(true);
    getAVehicleByTypeId(
      vehicleTypeId,
      (successResponse) => {
        setLoading(false);
        if (successResponse[0]._success) {
          setVehicleType(successResponse[0]._response[0]);
        }
      },
      (errorResponse) => {
        setLoading(false);
      }
    );
  };

  return (
    <>
      <CommonHeader userData={user} />
      <section className={Styles.pickupDeliveryDetails}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div>
                <div className={Styles.pickupDeliveryDetailsHead}>
                  <div className={Styles.pickupDeliveryDetailsHeaderCard}>
                    <Link to="#" onClick={goBack}>
                      <FontAwesomeIcon
                        className={Styles.pickupHistoryBackspaceButton}
                        icon={faArrowLeft}
                      />
                    </Link>
                    <h4 className={Styles.pickupHistoryHeaderTitle}>
                      Delivery Details
                    </h4>
                  </div>
                  <button className={Styles.pickupDeliveryDetailsSettingsIcon}>
                    <FontAwesomeIcon icon={faGear} />
                  </button>
                </div>
                {/* Map  */}
                <div className={Styles.pickupDeliveryDetailsMapCard}></div>

                <div className={Styles.pickupDeliveryDetailDriverMainCard}>
                  <div className={Styles.pickupDeliveryDetailDrivernameCard}>
                    <img
                      className={Styles.pickupDeliveryDetailDriverImg}
                      src={API.viewImageUrl + deliveryboy?.profile_pic}
                      alt="driver"
                    />
                    <h4 className={Styles.pickupDeliveryDetailDriverName}>
                      {deliveryboy?.first_name} {deliveryboy?.last_name}
                    </h4>
                  </div>
                  <p className={Styles.pickupDevliveryDetailVehicleNumber}>
                    VOLVO FH16 2022
                  </p>
                </div>

                <div className={Styles.pickupDeliveryDetailPackageCard}>
                  <img
                    className={Styles.pickupDeliveryDetailPackage}
                    src={PackageDrop}
                    alt="package"
                  />
                  <div>
                    <p className={Styles.pickupDeliveryDetailDropInfo}>
                      Drop off information
                    </p>
                    <h4 className={Styles.pickupDeliverDetailCompanyName}>
                    {orders?.company_name ? orders?.company_name : ''}
                    </h4>
                    <p className={Styles.pickupDeliveryDetailCompanyAddress}>
                    {destinationAddress.address}, {destinationAddress.city},{' '}
                    {destinationAddress.state}
                    </p>
                  </div>
                </div>

                <div className={Styles.pickupDeliveryDetailOrderfareMainCard}>
                  <div>
                    <div className={Styles.pickupDeliveryDetailOrderPrice}>
                      <div className={Styles.pickupDeliveryDetailPickupCard}>
                        <img
                          className={Styles.pickupdeliveryDetailOrderfareIcon}
                          src={OrderTag}
                          alt="icon"
                        />
                        <p className={Styles.pickupDeliveryDetailOrderfareText}>
                          Order fare
                        </p>
                      </div>
                      <h4 className={Styles.pickupDeliveryDetailOrderPriceText}>
                      €{orders?.amount ? orders.amount.toFixed(2) : '0.00'}
                      </h4>
                    </div>
                    <div className={Styles.pickupDeliveryDetailPickuppriceCard}>
                      <p
                        className={Styles.pickupDeliveryDetailTraveledDistance}
                      >
                        Travelled 12 km in 32 mins
                      </p>
                      <div className={Styles.pickupDeliveryDetailsAllPriceCard}>
                        <p className={Styles.pickupDeliveryDetailOrderfaretext}>
                          Order fare
                        </p>
                        <p className={Styles.pickupDeliveryDetailPricesText}>
                          €
                          {orders?.delivery_boy_amount
                            ? orders.delivery_boy_amount.toFixed(2)
                            : "0.00"}
                        </p>
                      </div>
                      <div className={Styles.pickupDeliveryDetailsAllPriceCard}>
                        <p className={Styles.pickupDeliveryDetailOrderfaretext}>
                          Waiting
                        </p>
                        <p className={Styles.pickupDeliveryDetailPricesText}>
                          €0.00
                        </p>
                      </div>
                      <div className={Styles.pickupDeliveryDetailsAllPriceCard}>
                        <p className={Styles.pickupDeliveryDetailOrderfaretext}>
                          Platform fee
                        </p>
                        <p className={Styles.pickupDeliveryDetailPricesText}>
                          €
                          {orders.commission_amount
                            ? orders.commission_amount.toFixed(2)
                            : "0.00"}
                        </p>
                      </div>
                      <div className={Styles.pickupDeliveryDetailsAllPriceCard}>
                        <p className={Styles.pickupDeliveryDetailOrderfaretext}>
                          Amount charged
                        </p>
                        <p className={Styles.pickupDeliveryDetailPricesText}>
                          €{orders.amount ? orders.amount.toFixed(2) : "0.00"}
                        </p>
                      </div>
                      <div
                        className={Styles.pickupDeliveryDetailMastercardCard}
                      >
                        <img
                          className={Styles.pickupDeliveryDetailMastercardImg}
                          src={MasterCard}
                          alt="mastercard"
                        />
                        <p
                          className={Styles.pickupDeliveryDetailMasterCardtext}
                        >
                          Paid with mastercard
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={Styles.pickupDeliveryDetailPackageInformaitionCard}
                >
                  <p className={Styles.pickupDeliveryDetailsPackageInfoText}>
                    Package information
                  </p>

                  <p className={Styles.pickupDeliveryDetailOrderId}>
                    Order ID: <b>{orders.order_number}</b>
                  </p>
                  <p className={Styles.pickupDeliveryDetailOrderId}>
                    Comments: <b>{orders.pickup_notes}</b>
                  </p>
                  <p className={Styles.pickupDeliveryDetailOrderId}>
                    Vehicle: <b>{vehicleType.vehicle_type}</b>
                  </p>
                </div>

                <div className={Styles.pickupDeliveryDetailInvoiceCard}>
                  <div className={Styles.pickupDeliveryDetailInvoiceTextCard}>
                    <img
                      className={Styles.pickupDeliveryDetailsInvoiceImg}
                      src={Invoice}
                      alt="invoice"
                    />
                    <p
                      className={Styles.pickupDeliveryDetailDownloadInvoiceText}
                    >
                      Download invoice
                    </p>
                  </div>
                  <button className={Styles.pickupDeliveryDetailDownloadIcon}>
                    <FontAwesomeIcon icon={faDownload} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default OrderDetail;
