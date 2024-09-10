import React from 'react';
import Styles from "../assets/css/home.module.css"

const HomeAboutus = () => {
  return (
    <>
     <section className={Styles.HomeAboutSec}>
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div>
                <h4 className={Styles.HomeAboutTitleText}>About us</h4>
                <p className={Styles.HomeAboutDiscriptionText}>
                  Lorem ipsum dolor sit amet consectetur. Laoreet quisque
                  faucibus quis laoreet ultricies eget auctor. Viverra sed
                  pretium libero aliquam purus magna ultrices. Risus blandit
                  quis lorem suspendisse senectus libero non amet ultrices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomeAboutus