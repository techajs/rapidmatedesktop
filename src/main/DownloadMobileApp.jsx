import React from 'react';
import AppQR from "../assets/images/AppQr-Img.png";
import Phone from "../assets/images/Phones.png";
import AppStore from "../assets/images/AppStore-Btn.png";
import PlayStore from "../assets/images/PlayStore-Btn.png";
import { Link } from 'react-router-dom';
import Styles from "../assets/css/home.module.css"


const DownloadMobileApp = () => {
  return (
    <>
    <section className={Styles.HomeAppDownloadSec}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className={Styles.HomeAppDownloadCard}>
                <h4 className={Styles.HomeAppDownloadTitle}>Do more with the app!</h4>
                <p className={Styles.HomeAppDownloadDiscription}>
                  Download the Rapidmate mobile app and fulfill your delivery
                  needs anywhere any time..
                </p>
                <div className={Styles.HomeAppDownloadQrMainCard}>
                  <img
                    className={Styles.HomeAppDownloadQrImage}
                    src={AppQR}
                    alt="QR"
                  />
                  <p className={Styles.HomeAppDownloadTextFrench}>
                    Télécharger gratuitement
                  </p>
                  <div className={Styles.HomeAppDownloadImgBtns}>
                    <Link>
                      <img
                        className={Styles.HomeAppDownloadAppstoreImg}
                        src={AppStore}
                        alt="AppStore"
                      />
                    </Link>
                    <Link>
                      <img
                        className={Styles.HomeAppDownloadAppstoreImg}
                        src={PlayStore}
                        alt="AppStore"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-md-6'>
              <div className={Styles.HomeAppDownloadPhoneImgCard}>
                <img className={Styles.HomeAppDownloadPhoneImg} src={Phone} alt="img"/>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default DownloadMobileApp