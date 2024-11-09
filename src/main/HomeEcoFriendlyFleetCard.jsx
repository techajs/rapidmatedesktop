import React from "react";
import Styles from "../assets/css/home.module.css";
import HybridVehicle from "../assets/images/HybridVehiclePickup.png";
import RouteOptimization from "../assets/images/RouteOptimization.png";
import EBikeImage from "../assets/images/E-BikeImage.png";

const HomeEcoFriendlyFleetCard = () => {
  return (
    <>
      <section className={Styles.HomeEcoFriendlyFleetSec}>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className={Styles.EcoFriendlyFleetMainCard}>
                <img src={HybridVehicle} alt="img" />
                <div className={Styles.EcoFriendlyFleettitleCard}>
                  <h4>Electric & Hybrid Vehicles</h4>
                  <p>
                    Gradually transition to electric or hybrid vehicles to
                    reduce carbon emissions
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className={Styles.EcoFriendlyFleetMainCard}>
                <img src={RouteOptimization} alt="img" />
                <div className={Styles.EcoFriendlyFleettitleCard}>
                  <h4>Route Optimization</h4>
                  <p>
                    Implement advanced routing software to minimize fuel
                    consumption by reducing travel time and distance.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className={Styles.EcoFriendlyFleetMainCard}>
                <img src={EBikeImage} alt="img" />
                <div className={Styles.EcoFriendlyFleettitleCard}>
                  <h4>Bicycle or E-bike Deliveries</h4>
                  <p>
                    In urban areas, use bicycles or e-bikes to eliminate
                    emissions entirely for short-distance deliveries.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeEcoFriendlyFleetCard;
