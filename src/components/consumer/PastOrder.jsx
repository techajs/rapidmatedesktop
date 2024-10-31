import React, { useEffect, useState } from "react";
import Styles from "../../assets/css/home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faMagnifyingGlass,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import CommonHeader from "../../common/CommonHeader";
import { UseFetch } from "../../utils/UseFetch";
import RenderItem from "./common/RenderItem";
import { getLocations } from "../../data_manager/dataManage";
import { getOrderList } from "../../utils/getOrderList";

const PastOrder = () => {
  const { user } = UseFetch();
  const navigate=useNavigate()
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("tab1");
  const [orderList, setOrderList] = useState([]);
  const [pastOrderList, setPastOrderList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [loading, setLoading] = useState([]);
  const goBack = () => {
    navigate(-1);  // Navigate back to the previous page
  };
  useEffect(() => {
    getLocationsData();
    getOrder("current");
    getOrder("past");
  }, []);
  const getOrder = async (status) => {
    const userExtId = user.userDetails.ext_id;
    const orders = await getOrderList(userExtId, status);
    if (status === "current") {
      setOrderList(orders);
    } else if (status === "past") {
      setPastOrderList(orders);
    }
  };
  const getLocationsData = () => {
    setLoading(true);
    setLocationList([]);
    getLocations(
      null,
      (successResponse) => {
        if (successResponse[0]._success) {
          let tempOrderList = successResponse[0]._response;
          setLocationList(tempOrderList);
        }
        setLoading(false);
      },
      (errorResponse) => {
        setLoading(false);
        if (errorResponse[0]._errors.message) {
          setLocationList([]);
        }
      }
    );
  };
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTabChange = (event) => {
    setSelectedTab(event.target.id); // Set the selected tab based on the clicked tab's ID
  };
  return (
    <>
      {/* Header Start Here  */}
      <CommonHeader userData={user} />
      {/* Header End Here  */}
      <section className={Styles.pickupHistorySec}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div>
                <div className={Styles.pickupHistoryHeaderCard}>
                  <div className={Styles.pickupHistoryTitleHeaderCard}>
                    <Link to="#" onClick={goBack}>
                      <FontAwesomeIcon
                        className={Styles.pickupHistoryBackspaceButton}
                        icon={faArrowLeft}
                      />
                    </Link>
                    <h4 className={Styles.pickupHistoryHeaderTitle}>History</h4>
                  </div>
                  <div className={Styles.pickupHistorySearchFillterCard}>
                    <div className={Styles.pickupHistorySearchCard}>
                      <FontAwesomeIcon
                        className={Styles.pickupHistorySearchIcon}
                        icon={faMagnifyingGlass}
                      />
                      <input
                        className={Styles.pickupHistorySearchInput}
                        type="text"
                        placeholder="Search your deliveries"
                        value={searchTerm}
                        onChange={handleInputChange}
                      />
                    </div>
                    <button className={Styles.pickupHistoryFillterIcon}>
                      <FontAwesomeIcon icon={faFilter} />
                    </button>
                  </div>
                </div>

                <div className="tabs">
                  <input
                    type="radio"
                    id="tab1"
                    name="tab-control"
                    checked={selectedTab === "tab1"}
                    onChange={handleTabChange}
                  />
                  <input
                    type="radio"
                    id="tab2"
                    name="tab-control"
                    checked={selectedTab === "tab2"}
                    onChange={handleTabChange}
                  />
                  <ul>
                    <li title="Ongoing order">
                      <label htmlFor="tab1" role="button" className="tab-label">
                        <span>Ongoing</span>
                      </label>
                    </li>
                    <li title="Past order ">
                      <label htmlFor="tab2" role="button" className="tab-label">
                        <span>Past</span>
                      </label>
                    </li>
                  </ul>
                  <div className="content">
                    {/* Ongoing Start Here  */}
                    <RenderItem status="current" locationList={locationList} orderList={orderList} />

                    {/* Past Orders Start Here  */}
                    <RenderItem status="current" locationList={locationList} orderList={pastOrderList} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PastOrder;
