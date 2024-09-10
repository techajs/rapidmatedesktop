import React from "react";
import DeliveryService from "../assets/images/Delivery-Services-Icon.png";
import CourierService from "../assets/images/Courier-Service-Icon.png";
import MultiSkilled from "../assets/images/Multi-Siklled-Icon.png";
import HireMovers from "../assets/images/Hire-Movers-Icon.png";
import Styles from "../assets/css/home.module.css"

const Services = () => {
  return (
    <>
      <section className={Styles.HomeourServicesSec}>
        <div className="container">
          <div className="row">
            <div className={Styles.HomeourServicesTitleMainCard}>
              <h2 className={Styles.HomeourServicesTitle}>Our services</h2>
            </div>
            <div className="col-md-3">
              <div className={Styles.DeliveryServicesImagesCard}>
                <div>
                  <img
                    className={Styles.DeliveryServicesImages}
                    src={DeliveryService}
                    alt="Delivery"
                  />
                </div>
                <h4 className={Styles.DeliveryServicesTitle}>
                  Courier service with scooter
                </h4>
                <p className={Styles.DeliveryServicesSubtitle}>
                  For establishments without a scooter fleet, we provide
                  couriers with their own means of transport equipped with a
                  durable "top case", thus ensuring the safety and protection of
                  food during delivery.
                </p>
              </div>
            </div>

            <div className="col-md-3">
              <div className={Styles.DeliveryServicesImagesCard}>
                <div>
                  <img
                    className={Styles.DeliveryServicesImages}
                    src={CourierService}
                    alt="CourierService"
                  />
                </div>
                <h4 className={Styles.DeliveryServicesTitle}>Courier service</h4>
                <p className={Styles.DeliveryServicesSubtitle}>
                  Experienced professionals for safe and punctual deliveries.
                </p>
              </div>
            </div>

            <div className="col-md-3">
              <div className={Styles.DeliveryServicesImagesCard}>
                <div>
                  <img
                    className={Styles.DeliveryServicesImages}
                    src={MultiSkilled}
                    alt="MultiSkilled"
                  />
                </div>
                <h4 className={Styles.DeliveryServicesTitle}>
                  Multi-skilled employee
                </h4>
                <p className={Styles.DeliveryServicesSubtitle}>
                  Trained staff to support your production operations.
                </p>
              </div>
            </div>

            <div className="col-md-3">
              <div className={Styles.DeliveryServicesImagesCard}>
                <div>
                  <img
                    className={Styles.DeliveryServicesImages}
                    src={HireMovers}
                    alt="HireMovers"
                  />
                </div>
                <h4 className={Styles.DeliveryServicesTitle}>Hire Movers</h4>
                <p className={Styles.DeliveryServicesSubtitle}>
                  Hire professional movers to manage your move transparently and
                  efficiently.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
