import React from "react";
import ChooseVehicle from "../assets/images/HomeChooseDeliveryVehicle.png";
import Styles from "../assets/css/home.module.css";

const HomeChooseDeliveryVehicleCard = () => {
  return (
    <>
      <section className={Styles.homeChooseDeliveryVehicleSec}>
        <div className={`${Styles.manageRow} row`}>
          <div className="col-md-12">
            <div>
              <div className={Styles.homeChooseDeliveryVehicleTitleCard}>
                <h2>Choose Your Delivery Vehicle</h2>
                <p>
                  Select the perfect vehicle for your package, from bicycles to
                  trucks
                </p>
              </div>
              <div>
                <img
                  className={Styles.homeChooseDeliveryVehicleImg}
                  src={ChooseVehicle}
                  alt="Choose Delivery Vehicle"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeChooseDeliveryVehicleCard;
