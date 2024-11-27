import React from "react";
import Styles from "../../../assets/css/home.module.css";
import { UseFetch } from "../../../utils/UseFetch";
import CommonHeader from "../../../common/CommonHeader";
import UserProfile from "../../../assets/images/PickupUser-Profile.jpeg";
import { Link, Outlet, useLocation } from "react-router-dom";
import { API } from "../../../utils/Constants";

function Setting() {
  const { user } = UseFetch();
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <>
      <CommonHeader userData={user} />
      <section className={Styles.pickupAccountSec}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className={Styles.pickupAccountUserHeaderCard}>
                <img
                  className={Styles.pickupAccountUserProfile}
                  src={API.viewImageUrl + user?.userDetails?.profile_pic}
                  alt="Profile"
                />
                <div>
                  <h5 className={Styles.pickupAccountHeaderUserName}>
                    {user?.userDetails?.first_name}
                  </h5>
                  <p className={Styles.pickupAccountHeaderUserEmail}>
                    {user?.userDetails?.email}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className={Styles.pickupAccountSidebarNav}>
                <div
                  className={`${Styles.pickupAccountSideNavBtns} ${
                    currentPath.includes("pickup-address-book")
                      ? Styles.active
                      : ""
                  }`}
                >
                  <Link
                    to="pickup-address-book"
                    className={`${Styles.pickupAccountNavLinkText} ${
                      currentPath.includes("pickup-address-book")
                        ? Styles.activeLink
                        : ""
                    }`}
                  >
                    Address book
                  </Link>
                </div>

                <div
                  className={`${Styles.pickupAccountSideNavBtns} ${
                    currentPath.includes("pickup-payment-methods")
                      ? Styles.active
                      : ""
                  }`}
                >
                  <Link
                    to="pickup-payment-methods"
                    className={`${Styles.pickupAccountNavLinkText} ${
                      currentPath.includes("pickup-payment-methods")
                        ? Styles.activeLink
                        : ""
                    }`}
                  >
                    Payment methods
                  </Link>
                </div>

                <div
                  className={`${Styles.pickupAccountSideNavBtns} ${
                    currentPath.includes("pickup-payment-methods")
                      ? Styles.active
                      : ""
                  }`}
                >
                  <Link
                    to="enterprise-manage-company-locations"
                    className={`${Styles.pickupAccountNavLinkText} ${
                      currentPath.includes("enterprise-manage-company-locations")
                        ? Styles.activeLink
                        : ""
                    }`}
                  >
                    Manage company locations
                  </Link>
                </div>

                <div
                  className={`${Styles.pickupAccountSideNavBtns} ${
                    currentPath.includes("billing-details") ? Styles.active : ""
                  }`}
                >
                  <Link
                    to="#"
                    className={`${Styles.pickupAccountNavLinkText} ${
                      currentPath.includes("billing-details")
                        ? Styles.activeLink
                        : ""
                    }`}
                  >
                    Billing details
                  </Link>
                </div>

                <div
                  className={`${Styles.pickupAccountSideNavBtns} ${
                    currentPath.includes("pickup-change-password")
                      ? Styles.active
                      : ""
                  }`}
                >
                  <Link
                    to="pickup-change-password"
                    className={`${Styles.pickupAccountNavLinkText} ${
                      currentPath.includes("pickup-change-password")
                        ? Styles.activeLink
                        : ""
                    }`}
                  >
                    Change password
                  </Link>
                </div>

                <div
                  className={`${Styles.pickupAccountSideNavBtns} ${
                    currentPath.includes("pickup-notification-settings")
                      ? Styles.active
                      : ""
                  }`}
                >
                  <Link
                    to="pickup-notification-settings"
                    className={`${Styles.pickupAccountNavLinkText} ${
                      currentPath.includes("pickup-notification-settings")
                        ? Styles.activeLink
                        : ""
                    }`}
                  >
                    Notifications
                  </Link>
                </div>

                <div
                  className={`${Styles.pickupAccountSideNavBtns} ${
                    currentPath.includes("language") ? Styles.active : ""
                  }`}
                >
                  <Link
                    to="language"
                    className={`${Styles.pickupAccountNavLinkText} ${
                      currentPath.includes("language") ? Styles.activeLink : ""
                    }`}
                  >
                    Language
                  </Link>
                </div>
                <div
                  className={`${Styles.pickupAccountSideNavBtns} ${
                    currentPath.includes("logout") ? Styles.active : ""
                  }`}
                >
                  <Link
                    to="logout"
                    className={`${Styles.pickupAccountNavLinkText} ${
                      currentPath.includes("logout") ? Styles.activeLink : ""
                    }`}
                  >
                    Logout
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <Outlet />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
const ConsumerSetting = Setting;

export default ConsumerSetting;
