import React from "react";
import Styles from "../assets/css/home.module.css"
import Subway from "../assets/images/Subway-Slider.png";
import Levis from "../assets/images/Levis-Slider.png";
import MacD from "../assets/images/Macd-Slider.png";
import CocaCola from "../assets/images/CocaCola-Slider.png";
import Airbnb from "../assets/images/Airbnb-Slider.png";

const LogoSlider = () => {
  return (
    <>
      <div className={Styles.slider}>
        <div className={Styles.HomeourServicesTitleMainCard}>
          <h2 className={Styles.HomeourServicesTitle}>Our clients</h2>
        </div>
        <div className={Styles.slidetrack}>
          <div className={Styles.slide}>
            <img src={Subway} alt="Subway" />
          </div>
          <div className={Styles.slide}>
            <img src={Levis} alt="Levis" />
          </div>
          <div className={Styles.slide}>
            <img src={MacD} alt="MacD" />
          </div>
          <div className={Styles.slide}>
            <img src={CocaCola} alt="CocaCola" />
          </div>
          <div className={Styles.slide}>
            <img src={Airbnb} alt="Airbnb" />
          </div>
          <div className={Styles.slide}>
            <img src={Subway} alt="Subway" />
          </div>
          <div className={Styles.slide}>
            <img src={Levis} alt="Levis" />
          </div>
          <div className={Styles.slide}>
            <img src={MacD} alt="MacD" />
          </div>
          <div className={Styles.slide}>
            <img src={CocaCola} alt="CocaCola" />
          </div>
          <div className={Styles.slide}>
            <img src={Airbnb} alt="Airbnb" />
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoSlider;
