import React from "react";
import Styles from "../assets/css/home.module.css"
const CompanyAchivments = () => {
  return (
    <>
      <section className={Styles.homeCompaniesSec}>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className={Styles.homeCompanyPartnerCountsMainCard}>
                <h4 className={Styles.homeCompanyPartnerCounts}>5000+</h4>
                <p className={Styles.homeCompanyPartnerCountsText}>
                  Companies trust us
                </p>
              </div>
            </div>

            <div className="col-md-3">
              <div className={Styles.homeCompanyPartnerCountsMainCard}>
                <h4 className={Styles.homeCompanyPartnerCounts}>96.4%</h4>
                <p className={Styles.homeCompanyPartnerCountsText}>
                  Successful deliveries
                </p>
              </div>
            </div>

            <div className="col-md-3">
              <div className={Styles.homeCompanyPartnerCountsMainCard}>
                <h4 className={Styles.homeCompanyPartnerCounts}>24/7</h4>
                <p className={Styles.homeCompanyPartnerCountsText}>Availability</p>
              </div>
            </div>

            <div className="col-md-3">
              <div className={Styles.homeCompanyPartnerCountsMainCard}>
                <h4 className={Styles.homeCompanyPartnerCounts}>15 min</h4>
                <p className={Styles.homeCompanyPartnerCountsText}>
                  Average delivery time
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CompanyAchivments;
