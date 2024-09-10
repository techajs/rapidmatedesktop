import React from "react";
import Blog1 from "../assets/images/Blog-1.png";
import Blog2 from "../assets/images/Blog-2.png";
import Blog3 from "../assets/images/Blog-3.png";
import BlogAdmin from "../assets/images/Blog-Admin.jpeg";
import Styles from "../assets/css/home.module.css"

const HomeBlog = () => {
  return (
    <>
      <section className={Styles.HomeLatestBlogSec}>
        <div className="container">
          <div className="row">
            <div className={Styles.HomeourServicesTitleMainCard}>
              <h2 className={Styles.HomeourServicesTitle}>Latest blogs</h2>
            </div>
            <div className="col-md-4">
              <div className={Styles.HomeLatestBlogCard}>
                <div>
                  <img
                    className={Styles.HomeLatestBlogImages}
                    src={Blog1}
                    alt="Blog-img"
                  />
                </div>
                <button className={Styles.HomeLatestBlogTypeText}>Technology</button>
                <h4 className={Styles.HomeLatestBlogTitle}>
                  Lorem ipsum dolor sit amet consectetur. Eget viverra volutpat
                  a pellentesque.
                </h4>
                <div className={Styles.HomeLatestBlogAdminMaincard}>
                  <div className={Styles.HomeLatestBlogAdminInfoCard}>
                    <img
                      className={Styles.HomeLatestBlogAdminImg}
                      src={BlogAdmin}
                      alt="admin"
                    />
                    <p className={Styles.HomeLatestBlogAdminName}>Tracey Wilson</p>
                  </div>
                  <p className={Styles.HomeLatestBlogAdminName}>August 20, 2022</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className={Styles.HomeLatestBlogCard}>
                <div>
                  <img
                    className={Styles.HomeLatestBlogImages}
                    src={Blog2}
                    alt="Blog-img"
                  />
                </div>
                <button className={Styles.HomeLatestBlogTypeText}>Technology</button>
                <h4 className={Styles.HomeLatestBlogTitle}>
                  Lorem ipsum dolor sit amet consectetur. Eget viverra volutpat
                  a pellentesque.
                </h4>
                <div className={Styles.HomeLatestBlogAdminMaincard}>
                  <div className={Styles.HomeLatestBlogAdminInfoCard}>
                    <img
                      className={Styles.HomeLatestBlogAdminImg}
                      src={BlogAdmin}
                      alt="admin"
                    />
                    <p className={Styles.HomeLatestBlogAdminName}>Tracey Wilson</p>
                  </div>
                  <p className={Styles.HomeLatestBlogAdminName}>August 20, 2022</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className={Styles.HomeLatestBlogCard}>
                <div>
                  <img
                    className={Styles.HomeLatestBlogImages}
                    src={Blog3}
                    alt="Blog-img"
                  />
                </div>
                <button className={Styles.HomeLatestBlogTypeText}>Technology</button>
                <h4 className={Styles.HomeLatestBlogTitle}>
                  Lorem ipsum dolor sit amet consectetur. Eget viverra volutpat
                  a pellentesque.
                </h4>
                <div className={Styles.HomeLatestBlogAdminMaincard}>
                  <div className={Styles.HomeLatestBlogAdminInfoCard}>
                    <img
                      className={Styles.HomeLatestBlogAdminImg}
                      src={BlogAdmin}
                      alt="admin"
                    />
                    <p className={Styles.HomeLatestBlogAdminName}>Tracey Wilson</p>
                  </div>
                  <p className={Styles.HomeLatestBlogAdminName}>August 20, 2022</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeBlog;
