import React, { useState } from "react";
import Styles from "../assets/css/home.module.css";
import TalkTeam from "../assets/images/TalktoTeam.png";
import ContactModal from "../common/ContactModal";

const HomeTalkToTeam = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
      {/* modal start here  */}
      <ContactModal show={showModal} handleClose={handleClose} />
      <section className={Styles.homeEfficientCardSec}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className={Styles.HomeTalktoTeamMainCard}>
                <div className={Styles.HomeTalktoTeamBannerCard}>
                  <img src={TalkTeam} alt="img" />
                </div>
                <div className={Styles.HomeTalktoTeamTitleCard}>
                  <h2>Talk to our team</h2>
                  <p>
                    Our dedicated support team is here to help you with any
                    delivery-related queries. From tracking your order to
                    resolving issues, we’ve got you covered.
                  </p>
                  <button
                    className={Styles.HomeContactUsActionBtn}
                    type="button"
                    onClick={handleShow}
                  >
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeTalkToTeam;
