import React from "react";
import LogoFooter from "../assets/images/Logo-icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import Styles from "../assets/css/home.module.css"

const HomeFooter = () => {
  return (
    <>
      <section className={Styles.HomeFooterSec}>
        <div className="container">
          <div className="row">
            <div className={Styles.HomeFooterlogotitleCard}>
              <img className={Styles.HomeFooterlogoImg} src={LogoFooter} alt="logo" />
              <h4 className={Styles.HomeFooterCompanyName}>Rapidmate</h4>
            </div>
            <div className="col-md-3">
              <div>
                <h4 className={Styles.HomeFooterReachTexttitle}>Reach us</h4>
                <div className={Styles.HomeFooterReachCard}>
                  <FontAwesomeIcon
                    className={Styles.HomeFooterReachCallIcon}
                    icon={faPhone}
                  />
                  <p className={Styles.HomeFooterReachText}>+33761406084</p>
                </div>

                <div className={Styles.HomeFooterReachCard}>
                  <FontAwesomeIcon
                    className={Styles.HomeFooterReachCallIcon}
                    icon={faEnvelope}
                  />
                  <p className={Styles.HomeFooterReachText}>elyas@rapidmate.fr</p>
                </div>

                <div className={Styles.HomeFooterReachCard}>
                  <FontAwesomeIcon
                    className={Styles.HomeFooterReachCallIcon}
                    icon={faLocationDot}
                  />
                  <p className={Styles.HomeFooterReachText}>8B Avenue Danielle Casanova, 95210 Saint-Gratien, France</p>
                </div>
              </div>
            </div>

            <div className="col-md-2">
              <div>
                <h4 className={Styles.HomeFooterReachTexttitle}>Company</h4>
                <div className={Styles.HomeFooterCompanyLinksCards}>
                  <Link className={Styles.HomeFooterCompanyLinks}>About</Link>
                </div>
                <div className={Styles.HomeFooterCompanyLinksCards}>
                  <Link className={Styles.HomeFooterCompanyLinks}>Contact</Link>
                </div>
                <div className={Styles.HomeFooterCompanyLinksCards}>
                  <Link className={Styles.HomeFooterCompanyLinks}>Blogs</Link>
                </div>
              </div>
            </div>

            <div className="col-md-2">
              <div>
                <h4 className={Styles.HomeFooterReachTexttitle}>Legal</h4>
                <div className={Styles.HomeFooterCompanyLinksCards}>
                  <Link className={Styles.HomeFooterCompanyLinks}>
                    Privacy Policy
                  </Link>
                </div>
                <div className={Styles.HomeFooterCompanyLinksCards}>
                  <Link className={Styles.HomeFooterCompanyLinks}>
                    Terms & Services
                  </Link>
                </div>
                <div className={Styles.HomeFooterCompanyLinksCards}>
                  <Link className={Styles.HomeFooterCompanyLinks}>Terms of Use</Link>
                </div>
                <div className={Styles.HomeFooterCompanyLinksCards}>
                  <Link className={Styles.HomeFooterCompanyLinks}>Refund Policy</Link>
                </div>
              </div>
            </div>

            <div className="col-md-2">
              <div>
                <h4 className={Styles.HomeFooterReachTexttitle}>Quick Links</h4>
                <div className={Styles.HomeFooterCompanyLinksCards}>
                  <Link className={Styles.HomeFooterCompanyLinks}>Home</Link>
                </div>
                <div className={Styles.HomeFooterCompanyLinksCards}>
                  <Link className={Styles.HomeFooterCompanyLinks}>Product</Link>
                </div>
                <div className={Styles.HomeFooterCompanyLinksCards}>
                  <Link className={Styles.HomeFooterCompanyLinks}>FAQs</Link>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div>
                <h4 className={Styles.HomeFooterReachTexttitle}>
                  Join Our Newsletter
                </h4>
                <div>
                  <Form>
                    <div className={Styles.HomeFooterSubscribeNewsletterCard}>
                      <Form.Control
                        className={Styles.HomeFooterSubscribeNewsletterInput}
                        type="email"
                        placeholder="Your email address"
                      />
                      <button className={Styles.HomeFooterSubscribeBtn}>
                        Subscribe
                      </button>
                    </div>
                    <p className={Styles.HomeFooterSubscribeNewsletterDiscription}>
                      * Will send you weekly updates and news about the company
                    </p>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeFooter;
