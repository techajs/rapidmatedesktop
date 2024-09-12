import React from "react";
import Styles from "../../assets/css/home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faLocationCrosshairs,
} from "@fortawesome/free-solid-svg-icons";
import Package from "../../assets/images/package.png";

function CardComponent({ orderList = [], locationList = [],msg=''}) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); 
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };
  const getLocationAddress = (locationId) => {
    let result = locationList.filter((location) => location.id === locationId);
    return result[0]?.address || "Unknown Address";
  };
  return (
    <>
      {orderList.length > 0 ? (
        orderList.map((order, index) => (
          <div className="col-md-3" key={index}>
            <div className={Styles.enterpriseHomeDeliveryHistoryCard}>
              <div className={Styles.enterpriseHomePackagedeliveryInfoCard}>
                <div className={Styles.enterpriseHomePackageImgCard}>
                  <img
                    className={Styles.enterpriseHomePackage}
                    src={Package}
                    alt="Package"
                  />
                </div>
                <p className={Styles.enterpriseHomePickupTimeinfo}>
                  Pickup in {formatDate(order.delivery_date) || "N/A"}
                </p>
              </div>
              <div className={Styles.enterpriseHomeAddressFromCard}>
                <FontAwesomeIcon
                  className={Styles.enterpriseHomeAddresslocDotIcon}
                  icon={faLocationDot}
                />
                <p className={Styles.enterpriseHomeAddressText}>
                  From{" "}
                  <b>{getLocationAddress(order.pickup_location_id) || "N/A"}</b>
                </p>
              </div>
              <div className={Styles.enterpriseHomeAddressToCard}>
                <FontAwesomeIcon
                  className={Styles.enterpriseHomeAddresslocDotIcon}
                  icon={faLocationCrosshairs}
                />
                <p className={Styles.enterpriseHomeAddressText}>
                  To{" "}
                  <b>
                    {getLocationAddress(order.dropoff_location_id) || "N/A"}
                  </b>
                </p>
              </div>
              <div className={Styles.enterpriseHomeOrderidCard}>
                <p className={Styles.enterpriseHomeOrderIdText}>
                  Order ID: <span>{order.order_number}</span>
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-md-12">
          <div
            className={Styles.enterpriseHomeDeliveryHistoryCard}
            style={{ textAlign: "center" }}
          >
            <p className={Styles.enterpriseHomePickupTimeinfo}>
              {msg}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default CardComponent;
