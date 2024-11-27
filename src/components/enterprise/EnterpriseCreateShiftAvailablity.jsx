import React, { useState } from "react";
import Styles from "../../assets/css/home.module.css"; 
import Track from "../../assets/images/Track-Order-availability.png";
import CreateShift from "../../assets/images/CreateShift-Calender.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faX,
  faClock,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-bootstrap";
import Calendar from "react-calendar";
import { Link } from "react-router-dom";
import CommonHeader from "../../common/CommonHeader";
import CalenderEvent from "./setting/CalenderEvent";

const EnterpriseCreateShiftAvailablity = () => {
  const [value, setValue] = useState(new Date());
  const [rows, setRows] = useState([{ from: "", to: "" }]);

  const handleAddRow = () => {
    setRows([...rows, { from: "", to: "" }]);
  };

  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const handleDeleteRow = (index) => {
    if (rows.length > 1) {
      const updatedRows = rows.filter((_, i) => i !== index);
      setRows(updatedRows);
    }
  };

  const dateStyles = [
    { date: new Date(2024, 6, 15), color: "orange" },
    { date: new Date(2024, 6, 20), color: "mediumaquamarine" },
    { date: new Date(2024, 6, 25), color: "steelblue" },
    { date: new Date(2024, 6, 28), color: "mediumpurple" },
  ];

  const tileClassName = ({ date }) => {
    const style = dateStyles.find(
      (d) =>
        date.getDate() === d.date.getDate() &&
        date.getMonth() === d.date.getMonth() &&
        date.getFullYear() === d.date.getFullYear()
    );
    return style ? `marked-date-${style.color}` : null;
  };

  return (
    <>
      <CommonHeader />
      <section className={Styles.enterprisenewScheduleSec}>
        <div>
          <div className={`row ${Styles.manageRow}`}>
            <div className="col-md-4">
              <div className={Styles.enterpriseNewScheduleTitleCard}>
                <div>
                  <h4 className={Styles.enterpriseNewScheduleText}>
                    Create shift
                  </h4>
                  <img
                    className={Styles.enterpriseCreateShiftTrackImg}
                    src={Track}
                    alt="img"
                  />
                </div>
                <div>
                  <img
                    className={Styles.enterpriseCreateShiftImg}
                    src={CreateShift}
                    alt="Img"
                  />
                </div>
              </div>
            </div>

            <div className="col-md-8">
              <div
                className={
                  Styles.enterpriseCreateShiftSetavailabilityActionBtnCard
                }
              >
                <h4 className={Styles.enterpriseNewScheduleSelectType}>
                  Set availability
                </h4>
                <div>
                  <button
                    className={
                      Styles.enterpriseCreateShiftSetavailabilitycancelBtn
                    }
                  >
                    Cancel
                  </button>
                  <button
                    className={
                      Styles.enterpriseCreateShiftSetavailabilitySaveBtn
                    }
                  >
                    Save
                  </button>
                </div>
              </div>
              <div className={`row ${Styles.manageRow}`}>
                <div className="col-md-8">
                  <div
                    className={
                      Styles.enterpriseCreateShiftSetavailabilityMainCard
                    }
                  >
                    <div className={Styles.enterprisePlanningCalenderMain}>
                      <CalenderEvent />
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div
                    className={Styles.enterpriseCreateShiftAvailabilityMainCard}
                  >
                    <div
                      className={Styles.enterpriseCreateShiftAvailabilityHeader}
                    >
                      <div>
                        <p
                          className={
                            Styles.enterpriseCreateShiftAvailabilityText
                          }
                        >
                          Set availability of
                        </p>
                        <h4
                          className={
                            Styles.enterpriseCreateShiftAvailabilityDate
                          }
                        >
                          June 5, 2024
                        </h4>
                      </div>
                      <button className={Styles.enterprisePlannigDateCloseIcon}>
                        <FontAwesomeIcon icon={faX} />
                      </button>
                    </div>
                    <div
                      className={
                        Styles.enterpriseCreateShiftAvailabilitySlotsMainCard
                      }
                    >
                      <div>
                        <button
                          className={
                            Styles.enterpriseCreateShiftAvailabilityPasteSlot
                          }
                        >
                          Paste time slots
                        </button>
                        <button
                          className={
                            Styles.enterpriseCreateShiftAvailabilityCopySlot
                          }
                        >
                          Copy time slots
                        </button>
                      </div>
                      <div>
                        {rows.map((row, index) => (
                          <div
                            key={index}
                            className={
                              Styles.enterpriseCreateShiftAvailabilityAddrowCard
                            }
                          >
                            <Form
                              className={
                                Styles.enterpriseCreateShiftAvailabilityFromCard
                              }
                            >
                              <Form.Control
                                className={
                                  Styles.enterpriseCreateShiftAvailabilityFromInput
                                }
                                type="text"
                                placeholder="From HH:MM"
                                value={row.from}
                                onChange={(e) =>
                                  handleChange(index, "from", e.target.value)
                                }
                              />
                              <FontAwesomeIcon
                                className={
                                  Styles.enterpriseCreateShiftAvailabilityEnableClock
                                }
                                icon={faClock}
                                style={{
                                  color:
                                    index === rows.length - 1
                                      ? "#FF0058"
                                      : "#ccc",
                                }}
                              />
                            </Form>

                            <Form
                              className={
                                Styles.enterpriseCreateShiftAvailabilityFromCard
                              }
                            >
                              <Form.Control
                                className={
                                  Styles.enterpriseCreateShiftAvailabilityFromInput
                                }
                                type="text"
                                placeholder="To HH:MM"
                                value={row.to}
                                onChange={(e) =>
                                  handleChange(index, "to", e.target.value)
                                }
                              />
                              <FontAwesomeIcon
                                className={
                                  Styles.enterpriseCreateShiftAvailabilityEnableClock
                                }
                                icon={faClock}
                                style={{
                                  color:
                                    index === rows.length - 1
                                      ? "#FF0058"
                                      : "#ccc",
                                }}
                              />
                            </Form>

                            {index !== rows.length - 1 && (
                              <button
                                className={
                                  Styles.enterpriseCreateShiftAvailabilityDeleteBtn
                                }
                                onClick={() => handleDeleteRow(index)}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            )}

                            {index === rows.length - 1 && (
                              <button
                                className={
                                  Styles.enterpriseCreateShiftAvailabilityPlusBtn
                                }
                                onClick={handleAddRow}
                              >
                                <FontAwesomeIcon icon={faPlus} />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={Styles.enterpriseCreateShiftAvailabilityFinishCard}
              >
                <Link
                  to="/enterprises-createshift-requestapproved"
                  className={Styles.enterpriseCreateShiftAvailabilityFinish}
                >
                  Finish
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EnterpriseCreateShiftAvailablity;
