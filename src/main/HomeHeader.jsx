import React from "react";
import Styles from "../assets/css/HomeHeader.module.css"; // Updated to import as a module
import Form from "react-bootstrap/Form";
import Logo from "../assets/images/Logo-icon.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const HomeHeader = () => {
  const { isAuthenticated, role } = useSelector((state) =>state.auth );
  const baseUrl=role?.toLowerCase().replace(/_/g, '');

  return (
    <div className={Styles.homeHeader}>
      <nav className={Styles.nav}>
        <input type="checkbox" id={Styles.navCheck} />
        <div className={Styles.navHeader}>
          <Link to="/" className={Styles.homeHeaderLogoCard}>
            <img className={Styles.homeHeaderLogo} src={Logo} alt="logo" />
            <h4 className={Styles.homeHeaderCompanyName}>Rapidmate</h4>
          </Link>
        </div>
        <div className={Styles.navBtn}>
          <label htmlFor={Styles.navCheck}>
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
        <ul className={Styles.navList}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link>Product</Link>
          </li>
          <li>
            <Link>FAQ</Link>
          </li>
          <li>
            <Link>Blog</Link>
          </li>
          <li>
            <Link>About Us</Link>
          </li>
          <div className={Styles.loginNavList}>
            
            <li>
            {!isAuthenticated && !role ? (<Link to={`/login`}>Login</Link>) : (<Link to={`/${baseUrl}/dashboard`}>Dashboard</Link>)}
            </li>
            <li>
              <Link className={Styles.homeHeaderSignupLink} to="/profile-choose">Sign Up</Link>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default HomeHeader;
