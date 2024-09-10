import React, { useState } from "react";
import Styles from "../../assets/css/home.module.css";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import SidebarImg from "../../assets/images/Pickup-Detail-SideImg.png";
import { Link } from "react-router-dom";
import CommonHeader from "../../common/CommonHeader";
import { UseFetch } from "../../utils/UseFetch";

const AddPickupDetails = () => {
  const user = UseFetch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phoneNumber: "",
    packageId: "",
    pickupNotes: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required";
    if (!/^\d+$/.test(formData.phoneNumber))
      newErrors.phoneNumber = "Phone number is invalid";
    if (!formData.packageId.trim())
      newErrors.packageId = "Package ID is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Proceed to the next step or submit the form
      console.log("Form submitted successfully");
    }
  };

  return (
    <>
      {/* Header Start Here  */}
      <CommonHeader userData={user} />
      {/* Header End Here  */}
      <section className={Styles.addPickupDetailsSec}>
        <div>
          <div className={`row ${Styles.manageRow}`}>
            <div className="col-md-4">
              <div className={Styles.addpickupDetailSidecardMain}>
                <img
                  className={Styles.addpickupDetailSidecardboxIcon}
                  src={SidebarImg}
                  alt="icon"
                />
              </div>
            </div>
            <div className="col-md-8">
              <div className={Styles.pickupAddpickupDetailsMaincard}>
                <div>
                  <h2 className={Styles.addPickupDetailsText}>
                    Add pickup details
                  </h2>
                  <p className={Styles.addPickupDetailsSubtext}>
                    You have entered pickup and drop-off addresses, time of
                    pickup, and vehicle type
                  </p>
                  <p className={Styles.pickupPersonalDetails}>
                    Personal details
                  </p>
                </div>
                <Form onSubmit={handleSubmit}>
                  <div className={`row ${Styles.manageRow}`}>
                    <div className="col-md-12">
                      <div className={Styles.addPickupDetailRadioCard}>
                        {["Myself", "Other"].map((label, index) => (
                          <div key={`radio-${index}`} className="mb-3">
                            <Form.Check
                              type="radio"
                              id={`radio-${index}`}
                              name="custom-radio-group"
                              label={label}
                              defaultChecked={label === "Myself"}
                              className={Styles.addPickupDetailRadioBtn}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <Form.Group
                        className="mb-1"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label
                          className={Styles.addPickupDetailFormLabels}
                        >
                          First name*
                        </Form.Label>
                        <Form.Control
                          className={Styles.addPickupDetailsInputs}
                          type="text"
                          placeholder="Type here.."
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          isInvalid={!!errors.firstName}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.firstName}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>

                    <div className="col-md-6">
                      <Form.Group
                        className="mb-1"
                        controlId="exampleForm.ControlInput2"
                      >
                        <Form.Label
                          className={Styles.addPickupDetailFormLabels}
                        >
                          Last name
                        </Form.Label>
                        <Form.Control
                          className={Styles.addPickupDetailsInputs}
                          type="text"
                          placeholder="Type here.."
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </div>

                    <div className="col-md-12">
                      <Form.Group
                        className="mb-1"
                        controlId="exampleForm.ControlInput3"
                      >
                        <Form.Label
                          className={Styles.addPickupDetailFormLabels}
                        >
                          Company
                        </Form.Label>
                        <Form.Control
                          className={Styles.addPickupDetailsInputs}
                          type="text"
                          placeholder="Type here.."
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </div>

                    <div className="col-md-6">
                      <Form.Group
                        className="mb-1"
                        controlId="exampleForm.ControlInput4"
                      >
                        <Form.Label
                          className={Styles.addPickupDetailFormLabels}
                        >
                          Email*
                        </Form.Label>
                        <Form.Control
                          className={Styles.addPickupDetailsInputs}
                          type="email"
                          placeholder="Type here.."
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>

                    <div className="col-md-6">
                      <Form.Group className="mb-1" controlId="formPlaintext1">
                        <Form.Label
                          className={Styles.addPickupDetailFormLabels}
                        >
                          Phone number*
                        </Form.Label>
                        <div className={Styles.pickupSignupContainer}>
                          <Form.Select
                            className={Styles.selectNumberByCountry}
                            aria-label="Default select example"
                            name="countryCode"
                            // You can add a state for countryCode if needed
                            onChange={handleInputChange}
                          >
                            <option value="+33">+33</option>
                            <option value="+91">+91</option>
                            <option value="+11">+11</option>
                          </Form.Select>
                          <Form.Control
                            className={`password-field ${Styles.signupUserName}`}
                            type="text"
                            placeholder="0 00 00 00 00"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            isInvalid={!!errors.phoneNumber}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.phoneNumber}
                          </Form.Control.Feedback>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                  <p className={Styles.pickupPersonalDetails}>
                    Package details
                  </p>

                  <div className={`row ${Styles.manageRow}`}>
                    <div className="col-md-12">
                      <Form.Group
                        className="mb-1"
                        controlId="exampleForm.ControlInput5"
                      >
                        <Form.Label
                          className={Styles.addPickupDetailFormLabels}
                        >
                          Package photo
                        </Form.Label>
                        <div>
                          <div className={Styles.addPickupUploadPhoto}>
                            <FontAwesomeIcon icon={faPaperclip} />
                            <p className={Styles.addPickupDragText}>
                              Drag or click to attach a photo
                            </p>
                            <input
                              type="file"
                              accept="image/*"
                              className={Styles.addPickupFileInput}
                              onChange={(e) => console.log(e.target.files[0])}
                            />
                          </div>
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-6">
                      <Form.Group
                        className="mb-1"
                        controlId="exampleForm.ControlInput6"
                      >
                        <Form.Label
                          className={Styles.addPickupDetailFormLabels}
                        >
                          Package ID*
                        </Form.Label>
                        <Form.Control
                          className={Styles.addPickupDetailsInputs}
                          type="text"
                          placeholder="Type here.."
                          name="packageId"
                          value={formData.packageId}
                          onChange={handleInputChange}
                          isInvalid={!!errors.packageId}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.packageId}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>

                    <div className="col-md-6">
                      <Form.Group
                        className="mb-1"
                        controlId="exampleForm.ControlInput7"
                      >
                        <Form.Label
                          className={Styles.addPickupDetailFormLabels}
                        >
                          Pickup notes
                        </Form.Label>
                        <Form.Control
                          className={Styles.addPickupDetailsInputs}
                          type="text"
                          placeholder="Type here.."
                          name="pickupNotes"
                          value={formData.pickupNotes}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className={Styles.addPickupDetailsBtnCard}>
                      <Link
                        className={Styles.addPickupDetailsCancelBTn}
                        style={{ color: "#000" }}
                        to="/consumer/dashboard"
                      >
                        Back
                      </Link>
                      <button
                       onClick={handleInputChange}
                        className={Styles.addPickupDetailsNextBtn}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddPickupDetails;
