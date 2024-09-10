import React from "react";
import Resturent from "../assets/images/Restaurants-Icon.png";
import Grocery from "../assets/images/Grocery-Icon.png";
import Meds from "../assets/images/PharmacyMeds-Icon.png";
import Gifts from "../assets/images/Gifts-Icon.png";
import Commerce from "../assets/images/E-commerce-Icon.png";
import Styles from "../assets/css/home.module.css"

const ServicesTypesCard = () => {
  return (
    <>
      <section className={Styles.homeCompaniesSec}>
        <div className={`${Styles.manageRow} row`}>
          <div className="col-md-2 offset-md-1">
            <div className={Styles.homerCardsImagesbg}>
              <div className={Styles.homerCardsImages}>
                <img
                  className={Styles.homeResturentCardImg}
                  src={Resturent}
                  alt="Resturent"
                />
              </div>
              <p className={Styles.homeResturentCardsText}>Restaurants</p>
            </div>
          </div>

          <div className="col-md-2">
            <div className={Styles.homerCardsImageswithoutBg}>
              <div className={Styles.homerCardsImages}>
                <img
                  className={Styles.homeGroceryCardImg}
                  src={Grocery}
                  alt="Grocery"
                />
              </div>
              <p className={Styles.homeResturentCardsText}>Grocery</p>
            </div>
          </div>

          <div className="col-md-2">
            <div className={Styles.homerCardsImagesbg}>
              <div className={Styles.homerCardsImages}>
                <img className={Styles.homeResturentCardImg} src={Meds} alt="Meds" />
              </div>
              <p className={Styles.homeResturentCardsText}>Pharmacy & Meds</p>
            </div>
          </div>

          <div className="col-md-2">
            <div className={Styles.homerCardsImageswithoutBg}>
              <div className={Styles.homerCardsImages}>
                <img className={Styles.homeGroceryCardImg} src={Gifts} alt="Gifts" />
              </div>
              <p className={Styles.homeResturentCardsText}>Gifts</p>
            </div>
          </div>

          <div className="col-md-2">
            <div className={Styles.homerCardsImagesbg}>
              <div className={Styles.homerCardsImages}>
                <img
                  className={Styles.homeResturentCardImg}
                  src={Commerce}
                  alt="Commerce"
                />
              </div>
              <p className={Styles.homeResturentCardsText}>E-commerce</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesTypesCard;
