import React, { useCallback, useEffect, useState } from "react";
import Styles from "../../assets/css/home.module.css";
import Form from "react-bootstrap/Form";
import "react-calendar/dist/Calendar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faCircle,
  faLocationDot,
  faLocationCrosshairs,
} from "@fortawesome/free-solid-svg-icons";
import ActiveBooking from "../../assets/images/Active-bookings.png";
import ScheduledBooking from "../../assets/images/Scheduled-bookings.png";
import AllBooking from "../../assets/images/All-booking.png";
import Home from "../../assets/images/home-icon.png";
import Package from "../../assets/images/Package.png";
import Calender from "../../assets/images/Calender-withBg.png";
import { useDispatch, useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import EnterpriseHomeCalender from "./setting/EnterpriseHomeCalender";
import { Bar } from "react-chartjs-2";
import {
  getEnterpriseDashboardInfo,
  getEnterpriseOrders,
} from "../../data_manager/dataManage";
import { ToastContainer } from "react-toastify";
import { showErrorToast } from "../../utils/Toastify";
import { setBookings, setBranches } from "../../redux/enterpriseSlice";
function CommonDashboard() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { bookings, branches } = useSelector((state) => state.enterprise);
  const [laoding, setLoading] = useState(false);

  const data = {
    labels: ["January", "February", "March", "April", "May"], // X-axis labels
    datasets: [
      {
        label: "Hours booked",
        data: [1, 2, 4, 2, 7], // Data points for Series 1
        backgroundColor: "rgba(255, 0, 88, 1)",
        borderColor: "rgba(255, 0, 88, 1)",
        borderWidth: 1,
      },
      {
        label: "Hours used",
        data: [3, 1, 5, 6, 4], // Data points for Series 2
        backgroundColor: "rgba(255, 199, 43, 1)",
        borderColor: "rgba(255, 199, 43, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y;
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const dropdownData2 = [{ label: "This week", value: "This week" }];

  const getOrderList = () => {
    getEnterpriseOrders(
      user.userDetails.ext_id,
      (successResponse) => {
        setLoading(false);
        if (successResponse[0]._response.length > 0) {
          console.log(successResponse[0]._response);
        }
      },
      (errorResponse) => {
        let err = "";
        if (errorResponse.errors) {
          err = errorResponse.errors.msg[0].msg;
        } else {
          err = errorResponse[0]._errors.message;
        }
        showErrorToast(err);
        setLoading(false);
      }
    );
  };

  const getBookingList = () => {
    setLoading(true);
    getEnterpriseDashboardInfo(
      user.userDetails.ext_id,
      (successResponse) => {
        setLoading(false);
        if (successResponse[0]._response.length > 0) {
          dispatch(
            setBookings(successResponse[0]._response[0]?.dashboard.bookings)
          );
          dispatch(
            setBranches(successResponse[0]._response[0]?.dashboard.branch)
          );
        }
      },
      (errorResponse) => {
        let err = "";
        if (errorResponse.errors) {
          err = errorResponse.errors.msg[0].msg;
        } else {
          err = errorResponse[0]._errors.message;
        }
        showErrorToast(err);
        setLoading(false);
      }
    );
  };
  useEffect(() => {
    if (!bookings || bookings === "") {
      getBookingList();
    }
    getOrderList()
  }, [user]);

  return (
    <>
      <section className={Styles.enterpriseHomeSec}>
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div>
                <p className={Styles.enterprisesHomeUserWelcomeText}>
                  Welcome{" "}
                  <b>
                    {user?.userDetails?.first_name +
                      " " +
                      user?.userDetails?.last_name}
                    !
                  </b>
                </p>
                <p className={Styles.enterprisesHomeDashbordDiscription}>
                  This is your Rapidmate enterprise dashboard!
                </p>
                <div className="row">
                  <div className="col-md-4">
                    <div className={Styles.enterpriseHomeActiveBookingCard}>
                      <button className={Styles.enterpriseHomeInfoButton}>
                        <FontAwesomeIcon icon={faCircleInfo} />
                      </button>
                      <p className={Styles.enterpriseHomeActiveBookingText}>
                        Active bookings
                      </p>
                      <div className={Styles.enterpriseBookingCountCard}>
                        <h4
                          className={Styles.enterprisesHomeActiveBookingCount}
                        >
                          {bookings?.active}
                        </h4>
                        <img
                          className={Styles.enterpriseHomeCheckIcon}
                          src={ActiveBooking}
                          alt="Icon"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className={Styles.enterpriseHomeActiveBookingCard}>
                      <button className={Styles.enterpriseHomeInfoButton}>
                        <FontAwesomeIcon icon={faCircleInfo} />
                      </button>
                      <p className={Styles.enterpriseHomeActiveBookingText}>
                        Scheduled bookings
                      </p>
                      <div className={Styles.enterpriseBookingCountCard}>
                        <h4
                          className={Styles.enterprisesHomeActiveBookingCount}
                        >
                          {bookings?.scheduled}
                        </h4>
                        <img
                          className={Styles.enterpriseHomeCheckIcon}
                          src={ScheduledBooking}
                          alt="Icon"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className={Styles.enterpriseHomeActiveBookingCard}>
                      <button className={Styles.enterpriseHomeInfoButton}>
                        <FontAwesomeIcon icon={faCircleInfo} />
                      </button>
                      <p className={Styles.enterpriseHomeActiveBookingText}>
                        All bookings
                      </p>
                      <div className={Styles.enterpriseBookingCountCard}>
                        <h4 className="enterprisesHome-ActiveBookingCount">
                          {bookings?.all}
                        </h4>
                        <img
                          className={Styles.enterpriseHomeCheckIcon}
                          src={AllBooking}
                          alt="Icon"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className={Styles.enterprisesHomeGraphCard}>
                  <div className={Styles.enterpriseHomeWithoutGraphCard}>
                    <div>
                      <h4 className={Styles.enterpriseHomeHoursText}>
                        Hours booked
                      </h4>
                      <div className={Styles.enterpriseHomeLocationSelectCard}>
                        <Form.Group className="mb-3" controlId="formPlaintext1">
                          <Form.Select
                            className={Styles.enterpriseHomeFranchiseSelect}
                            aria-label="Default select example"
                          >
                            <option>North Street Franchise</option>
                            <option value="1">South Street Franchise</option>
                            <option value="2">West Street Franchise</option>
                            <option value="3">East Street Franchise</option>
                          </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPlaintext2">
                          <Form.Select
                            className={Styles.enterpriseHomeFranchiseSelect}
                            aria-label="Default select example"
                          >
                            <option>This week</option>
                            <option value="1">This month</option>
                            <option value="2">This year</option>
                          </Form.Select>
                        </Form.Group>
                      </div>
                    </div>

                    <div className={Styles.enterpriseHomeTotalHourseCard}>
                      <div className={Styles.enterpriseHomeBookedCard}>
                        <FontAwesomeIcon
                          className={Styles.enterpriseHomeHoursCircleIcon}
                          icon={faCircle}
                        />
                        <p className={Styles.enterpriseHomeHoursBookedText}>
                          Hours booked
                        </p>
                      </div>

                      <div className={Styles.enterpriseHomeBookedCard}>
                        <FontAwesomeIcon
                          className={Styles.enterpriseHomeHoursusedCircleIcon}
                          icon={faCircle}
                        />
                        <p className={Styles.enterpriseHomeHoursBookedText}>
                          Hours used
                        </p>
                      </div>

                      <h4 className={Styles.enterpriseHomeTotalHoursText}>
                        32
                      </h4>
                    </div>
                  </div>
                  <div>
                    <div className="chart-container">
                      <Bar data={data} options={options} />
                    </div>
                  </div>
                </div>
                <p className={Styles.enterpriseCompanyLocationsText}>
                  Company locations
                </p>
                {branches.map((company, index) => (
                  <div
                    key={index}
                    className={Styles.enterpriseHomeCompanyLocCard}
                  >
                    <img
                      className={Styles.enterpriseHomeHomeIcon}
                      src={Home}
                      alt="home-icon"
                    />
                    <div>
                      <h4 className={Styles.enterpriseHomeCompanyName}>
                        {company.branch_name}
                      </h4>
                      <div className={Styles.enterpriseHomeAddressCard}>
                        <FontAwesomeIcon
                          className={Styles.enterpriseHomeLocDotIcon}
                          icon={faLocationDot}
                        />
                        <p className={Styles.enterpriseHomeCompanyAddress}>
                          {company.address} {company?.city} {company?.state}{" "}
                          {company?.postal_code} {company?.country}
                        </p>
                      </div>
                    </div>

                    <div className={Styles.enterpriseHomeLocSpentCard}>
                      <div className={Styles.enterpriseHomeHrsBookedCard}>
                        <p className={Styles.enterpriseHomeLocHsbooked}>
                          Hours booked
                        </p>
                        <h4>{company?.bookinghr || 0}</h4>
                      </div>

                      <div className={Styles.enterpriseHomeHrsBookedCard}>
                        <p className={Styles.enterpriseHomeLocHsbooked}>
                          Hours spent
                        </p>
                        <h4>{company?.spenthr || 0}</h4>
                      </div>

                      <div className={Styles.enterpriseHomeHrsBookedCard}>
                        <p className={Styles.enterpriseHomeLocHsbooked}>
                          Bookings
                        </p>
                        <h4>{company?.bookings || 0}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-4">
              <div className={Styles.enterpriseHomeCalenderMainCard}>
                {/* Calender Start Here  */}
                <EnterpriseHomeCalender />
                {/* Calender End Here  */}
                <div className={Styles.enterprisesHomeEnterpriesNameCard}>
                  <div className={Styles.enterpriseHomeResturntCard}>
                    <FontAwesomeIcon
                      className={Styles.enterpriseHomeResturentCircle}
                      icon={faCircle}
                    />
                    <p className={Styles.enerpriseHomeResturentText}>
                      Restaurant
                    </p>
                  </div>

                  <div className={Styles.enterpriseHomeResturntCard}>
                    <FontAwesomeIcon
                      className={Styles.enterpriseHomeSupermarketsCircle}
                      icon={faCircle}
                    />
                    <p className={Styles.enerpriseHomeResturentText}>
                      Supermarkets
                    </p>
                  </div>

                  <div className={Styles.enterpriseHomeResturntCard}>
                    <FontAwesomeIcon
                      className={Styles.enterpriseHomeEcommerceCircle}
                      icon={faCircle}
                    />
                    <p className={Styles.enerpriseHomeResturentText}>
                      E-Commerce
                    </p>
                  </div>
                </div>
                <div className={Styles.enterpriseHomeResturntCard}>
                  <FontAwesomeIcon
                    className={Styles.enterpriseHomeMoversCircle}
                    icon={faCircle}
                  />
                  <p className={Styles.enerpriseHomeResturentText}>
                    Packers & Movers
                  </p>
                </div>

                <div>
                  <div className={Styles.enterpriseHomeDeliveryHistoryCard}>
                    <div>
                      <div
                        className={Styles.enterpriseHomePackagedeliveryInfoCard}
                      >
                        <div className={Styles.enterpriseHomePackageImgCard}>
                          <img
                            className={Styles.enterpriseHomePackage}
                            src={Package}
                            alt="Icon"
                          />
                          <FontAwesomeIcon
                            className={Styles.enterpriseHomeDotCircleResturent}
                            icon={faCircle}
                          />
                        </div>

                        <p className={Styles.enterpriseHomePickupTimeinfo}>
                          Pickup on Apr 19, 2024 at 11:30 AM
                        </p>
                      </div>

                      <div className={Styles.enterpriseHomeAddressFromCard}>
                        <FontAwesomeIcon
                          className={Styles.enterpriseHomeAddresslocDotIcon}
                          icon={faLocationDot}
                        />
                        <p className={Styles.enterpriseHomeAddressText}>
                          From <b>North Street, ABC</b>
                        </p>
                      </div>

                      <div className={Styles.enterpriseHomeAddressToCard}>
                        <FontAwesomeIcon
                          className={Styles.enterpriseHomeAddresslocDotIcon}
                          icon={faLocationCrosshairs}
                        />
                        <p className={Styles.enterpriseHomeAddressText}>
                          To <b>5th Avenue, XYZ</b>
                        </p>
                      </div>

                      <div className={Styles.enterpriseHomeOrderidCard}>
                        <p className={Styles.enterpriseHomeOrderIdText}>
                          Order ID: <span>98237469</span>
                        </p>

                        <p className={Styles.enterpriseHomeOrderIdText}>
                          Pickup Truck
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={Styles.enterpriseHomeDeliveryHistoryCard}>
                    <div>
                      <div
                        className={Styles.enterpriseHomePackagedeliveryInfoCard}
                      >
                        <div className={Styles.enterpriseHomePackageImgCard}>
                          <img
                            className={Styles.enterpriseHomePackage}
                            src={Calender}
                            alt="Icon"
                          />
                          <FontAwesomeIcon
                            className={Styles.enterpriseHomeDotCircleResturent}
                            icon={faCircle}
                          />
                        </div>

                        <div className={Styles.enterpriseHomeShiftHeaderCard}>
                          <p className={Styles.enterpriseHomePickupTimeinfo}>
                            11 AM to 04 PM
                          </p>

                          <p className={Styles.enterpriseHomePickupTimeinfo}>
                            5 hours shift
                          </p>
                        </div>
                      </div>

                      <div className={Styles.enterpriseHomeAddressFromCard}>
                        <FontAwesomeIcon
                          className={Styles.enterpriseHomeAddresslocDotIcon}
                          icon={faLocationDot}
                        />
                        <p className={Styles.enterpriseHomeAddressText}>
                          <b>North Franchise</b>
                        </p>
                      </div>

                      <div className={Styles.enterpriseHomeOrderidCard}>
                        <p className={Styles.enterpriseHomeOrderIdText}>
                          Order ID: <span>98237469</span>
                        </p>

                        <p className={Styles.enterpriseHomeOrderIdText}>
                          Motor Bike
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={Styles.enterpriseHomeDeliveryHistoryCard}>
                    <div>
                      <div
                        className={Styles.enterpriseHomePackagedeliveryInfoCard}
                      >
                        <div className={Styles.enterpriseHomePackageImgCard}>
                          <img
                            className={Styles.enterpriseHomePackage}
                            src={Package}
                            alt="Icon"
                          />
                          <FontAwesomeIcon
                            className={Styles.enterpriseHomeDotCircleEcommerce}
                            icon={faCircle}
                          />
                        </div>

                        <p className={Styles.enterpriseHomePickupTimeinfo}>
                          Pickup on Apr 19, 2024 at 11:30 AM
                        </p>
                      </div>

                      <div className={Styles.enterpriseHomeAddressFromCard}>
                        <FontAwesomeIcon
                          className={Styles.enterpriseHomeAddresslocDotIcon}
                          icon={faLocationDot}
                        />
                        <p className={Styles.enterpriseHomeAddressText}>
                          From <b>North Street, ABC</b>
                        </p>
                      </div>

                      <div className={Styles.enterpriseHomeAddressToCard}>
                        <FontAwesomeIcon
                          className={Styles.enterpriseHomeAddresslocDotIcon}
                          icon={faLocationCrosshairs}
                        />
                        <p className={Styles.enterpriseHomeAddressText}>
                          To <b>5th Avenue, XYZ</b>
                        </p>
                      </div>

                      <div className={Styles.enterpriseHomeOrderidCard}>
                        <p className={Styles.enterpriseHomeOrderIdText}>
                          Order ID: <span>98237469</span>
                        </p>

                        <p className={Styles.enterpriseHomeOrderIdText}>
                          Pickup Truck
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={Styles.enterpriseHomeDeliveryHistoryCard}>
                    <div>
                      <div
                        className={Styles.enterpriseHomePackagedeliveryInfoCard}
                      >
                        <div className={Styles.enterpriseHomePackageImgCard}>
                          <img
                            className={Styles.enterpriseHomePackage}
                            src={Package}
                            alt="Icon"
                          />
                          <FontAwesomeIcon
                            className={Styles.enterpriseHomeDotCircleMovers}
                            icon={faCircle}
                          />
                        </div>

                        <p className={Styles.enterpriseHomePickupTimeinfo}>
                          Pickup on Apr 19, 2024 at 11:30 AM
                        </p>
                      </div>

                      <div className={Styles.enterpriseHomeAddressFromCard}>
                        <FontAwesomeIcon
                          className={Styles.enterpriseHomeAddresslocDotIcon}
                          icon={faLocationDot}
                        />
                        <p className={Styles.enterpriseHomeAddressText}>
                          From <b>North Street, ABC</b>
                        </p>
                      </div>

                      <div className={Styles.enterpriseHomeAddressToCard}>
                        <FontAwesomeIcon
                          className={Styles.enterpriseHomeAddresslocDotIcon}
                          icon={faLocationCrosshairs}
                        />
                        <p className={Styles.enterpriseHomeAddressText}>
                          To <b>5th Avenue, XYZ</b>
                        </p>
                      </div>

                      <div className={Styles.enterpriseHomeOrderidCard}>
                        <p className={Styles.enterpriseHomeOrderIdText}>
                          Order ID: <span>98237469</span>
                        </p>

                        <p className={Styles.enterpriseHomeOrderIdText}>
                          Pickup Truck
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  );
}

export default CommonDashboard;
