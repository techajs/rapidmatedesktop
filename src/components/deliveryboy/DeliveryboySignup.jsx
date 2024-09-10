import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faCheck,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import {
  faUser,
  faEnvelope,
  faEye,
  faEyeSlash,
  faBuilding,
} from "@fortawesome/free-regular-svg-icons";
import Styles from "../../assets/css/home.module.css";
import Logo from "../../assets/images/Logo-icon.png";
import Flag from "../../assets/images/numberFlag.png";
import Banner from "../../assets/images/Deliveryboy-Signup-Banner.png";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import localforage from "localforage";
import { validateDeliveryboyForm } from "../../utils/Validation";
import {
  getCityList,
  getCountryList,
  getStateList,
  signUpUser,
} from "../../data_manager/dataManage";
const DeliveryboySignup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const checkboxTypes = ["checkbox"];
  const [errors, setErrors] = useState({});
  const [masterCountryList, setMasterCountryList] = useState(null);
  const [masterStateList, setMasterStateList] = useState(null);
  const [masterCityList, setMasterCityList] = useState(null);
  const [ermessage, setErmessage] = useState("");
  const [hitButton, setHitButton] = useState(false);
  const [failedError, setFailedError] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    code: "+33",
    number: "",
    country: "",
    state: "",
    city: "",
    dropdownCountryValue: "",
    dropdownStateValue: "",
    dropdownCityValue: "",
    siret: "",
    termone: "",
  });
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const validationErrors = validateDeliveryboyForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // console.log(formData);
    let params = {
      info: {
        userName: formData.email,
        email: formData.email,
        phoneNumber: formData.code + formData.number,
        password: formData.password,
        userrole: "DELIVERY_BOY",
        firstName: formData.name,
        lastName: formData.lastName,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        siretNo: formData.siret,
        termone: formData.termone,
      },
    };
   
    setHitButton(true);
    signUpUser(
      params,
      (successResponse) => {
        if (successResponse[0]._success) {
          if (successResponse[0]._response) {
            if (successResponse[0]._response.name == "NotAuthorizedException") {
              setErmessage(successResponse[0]._response.name);
              setFailedError(true);
              setHitButton(false);
            } else if (successResponse[0]._httpsStatusCode == 200) {
              navigate("/signup-verify", {
                state: {
                  user: {
                    email: formData.email,
                    phoneNumber: formData.number,
                    password: formData.password,
                  },
                },
              });
            }
          }
        }
      },
      (errorResponse) => {
        let err = "";
        if (errorResponse.errors) {
          err = errorResponse.errors.msg[0].msg;
        } else {
          err = errorResponse[0]._errors.message;
        }
        setErmessage(err);
        setFailedError(true);
        setHitButton(false);
      }
    );
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: "" });
    if (name === "termone") {
      const term = e.target.checked ? 1 : 0;
      setFormData({ ...formData, [name]: term });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  //get country value and set state
  const handleCountryChange = (selectedCountry) => {
    setFormData({
      ...formData,
      ["dropdownCountryValue"]: selectedCountry,
      ["country"]: selectedCountry.value,
      ["state"]: "",
      ["city"]: "",
      ["dropdownCityValue"]: "",
      ["dropdownStateValue"]: "",
    });
    const filteredStates = masterStateList
      .filter((state) => state.country_id === selectedCountry.value)
      .map((state) => ({ label: state.state_name, value: state.id }));
    setStateList(filteredStates);
    setErrors({ ...errors, ["dropdownCountryValue"]: "" });
  };
  const handleStateChange = (selectedState) => {
    setErrors({ ...errors, ["dropdownStateValue"]: "" });
    setFormData({
      ...formData,
      ["dropdownStateValue"]: selectedState,
      ["state"]: selectedState.value,
      ["city"]: "",
      ["dropdownCityValue"]: "",
    });
    const filteredCities = masterCityList
      .filter((city) => city.state_id === selectedState.value)
      .map((city) => ({ label: city.city_name, value: city.id }));
    setCityList(filteredCities);
  };
  const handleCityChange = (selectedCity) => {
    setErrors({ ...errors, ["dropdownCityValue"]: "" });
    setFormData({
      ...formData,
      ["dropdownCityValue"]: selectedCity,
      ["city"]: selectedCity.value,
    });
  };
  useEffect(() => {
    let param = {};
    getCountryList(
      param,
      (successResponse) => {
        if (successResponse[0]._success) {
          if (successResponse[0]._response) {
            if (successResponse[0]._response.name == "NotAuthorizedException") {
              setErmessage(successResponse[0]._response.name);
            } else {
              setMasterCountryList(successResponse[0]._response);
              var formattedCountryList = [];
              successResponse[0]._response.forEach((element) => {
                formattedCountryList.push({
                  label: element.country_name,
                  value: element.id,
                });
              });
              setCountryList(formattedCountryList);
            }
          }
        }
      },
      (errorResponse) => {
        console.log("errorResponse", errorResponse[0]._errors.message);
        setErmessage(errorResponse[0]._errors.message);
      }
    );

    getStateList(
      (param = {}),
      (successResponse) => {
        if (successResponse[0]._success) {
          if (successResponse[0]._response) {
            if (successResponse[0]._response.name == "NotAuthorizedException") {
              setErmessage(successResponse[0]._response.name);
            } else {
              setMasterStateList(successResponse[0]._response);
            }
          }
        }
      },
      (errorResponse) => {
        console.log("errorResponse", errorResponse[0]._errors.message);
        setErmessage(errorResponse[0]._errors.message);
      }
    );

    getCityList(
      null,
      (successResponse) => {
        if (successResponse[0]._success) {
          if (successResponse[0]._response) {
            if (successResponse[0]._response.name == "NotAuthorizedException") {
              setErmessage(successResponse[0]._response.name);
            } else {
              setMasterCityList(successResponse[0]._response);
            }
          }
        }
      },
      (errorResponse) => {
        console.log("errorResponse", errorResponse[0]._errors.message);
        setErmessage(errorResponse[0]._errors.message);
      }
    );
  }, []);

  return (
    <>
      <section className={Styles.profileChooseSec}>
        <div className="container">
          <div>
            <Link className={Styles.logoCard} to="/">
              <img className={Styles.logo} src={Logo} alt="logo" />
              <h2 className={Styles.companyName}>Rapidmate</h2>
            </Link>
          </div>
          <div className="row">
            <div className="col-md-8">
              <div className={Styles.pickupSignupFormMainCard}>
                <div className={Styles.chooseMainCard}>
                  <div className={Styles.chooseProfileCard}>
                    <h2 className={Styles.chooseProfileHeading}>
                      Delivery Boy signup
                    </h2>
                    <p className={Styles.chooseProfileSubheading}>
                      Let’s create your profile so you can have complete
                      experience of the app.
                    </p>
                  </div>
                </div>
                <div>
                  <Form>
                    <div className="row">
                      <div className="col-md-6">
                        <Form.Group className="mb-3" controlId="formPlaintext1">
                          <div className={Styles.pickupSignupContainer}>
                            <FontAwesomeIcon
                              className={Styles.pickupSignupFieldsIcons}
                              icon={faUser}
                            />
                            <Form.Control
                              className={Styles.signupUserName}
                              type="text"
                              placeholder="First Name"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                            />
                          </div>
                        </Form.Group>
                        {errors.name && (
                          <p
                            className="text-danger lh-1"
                            style={{ fontSize: "0.820em" }}
                          >
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div className="col-md-6">
                        <Form.Group className="mb-3" controlId="formPlaintext2">
                          <div className={Styles.pickupSignupContainer}>
                            <FontAwesomeIcon
                              className={Styles.pickupSignupFieldsIcons}
                              icon={faUser}
                            />
                            <Form.Control
                              className={Styles.signupUserName}
                              type="text"
                              placeholder="Last Name"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                            />
                          </div>
                        </Form.Group>
                      </div>

                      <div className="col-md-12">
                        <Form.Group className="mb-3" controlId="formPlaintext3">
                          <div className={Styles.pickupSignupContainer}>
                            <FontAwesomeIcon
                              className={Styles.pickupSignupFieldsIcons}
                              icon={faEnvelope}
                            />
                            <Form.Control
                              className={Styles.signupUserName}
                              type="text"
                              placeholder="Email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                            />
                          </div>
                        </Form.Group>
                        {errors.email && (
                          <p
                            className="text-danger lh-1"
                            style={{ fontSize: "0.820em" }}
                          >
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div className="col-md-6">
                        <Form.Group className="mb-3" controlId="formPlaintext4">
                          <div className={Styles.pickupSignupContainer}>
                            <FontAwesomeIcon
                              className={Styles.pickupSignupFieldsIcons}
                              icon={faLock}
                            />
                            <Form.Control
                              className={`password-field ${Styles.signupUserName}`}
                              type={showPassword ? "text" : "password"}
                              placeholder="Password"
                              name="password"
                              value={formData.password}
                              onChange={handleInputChange}
                            />
                            <FontAwesomeIcon
                              icon={showPassword ? faEye : faEyeSlash}
                              onClick={togglePasswordVisibility}
                              className={Styles.signupPasswordEyeIcon}
                            />
                          </div>
                        </Form.Group>
                        {errors.password && (
                          <p
                            className="text-danger lh-1"
                            style={{ fontSize: "0.820em" }}
                          >
                            {errors.password}
                          </p>
                        )}
                      </div>

                      <div className="col-md-6">
                        <Form.Group className="mb-3" controlId="formPlaintext5">
                          <div className={Styles.pickupSignupContainer}>
                            <FontAwesomeIcon
                              className={Styles.pickupSignupFieldsIcons}
                              icon={faLock}
                            />
                            <Form.Control
                              className={`password-field ${Styles.signupUserName}`}
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirm password"
                              name="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleInputChange}
                            />
                            <FontAwesomeIcon
                              icon={showConfirmPassword ? faEye : faEyeSlash}
                              onClick={toggleConfirmPasswordVisibility}
                              className={Styles.signupPasswordEyeIcon}
                            />
                          </div>
                        </Form.Group>
                        {errors.confirmPassword && (
                          <p
                            className="text-danger lh-1"
                            style={{ fontSize: "0.820em" }}
                          >
                            {errors.confirmPassword}
                          </p>
                        )}
                      </div>

                      <div className="col-md-6">
                        <Form.Group className="mb-3">
                          <div className={Styles.pickupSignupContainer}>
                            <Form.Select
                              className={Styles.selectNumberByCountry}
                              aria-label="Default select example"
                              name="code"
                              value={formData.code}
                              onChange={handleInputChange}
                            >
                              <option value="+33">+33</option>
                              <option value="+91">+91</option>
                            </Form.Select>
                            <Form.Control
                              className={`password-field ${Styles.signupUserName}`}
                              type="text"
                              placeholder="0 00 00 00 00"
                              name="number"
                              onChange={handleInputChange}
                            />
                          </div>
                        </Form.Group>
                        {errors.number && (
                          <p
                            className="text-danger lh-1"
                            style={{ fontSize: "0.820em" }}
                          >
                            {errors.number}
                          </p>
                        )}
                      </div>

                      <div className="col-md-6">
                        <Form.Group className="mb-3" controlId="formPlaintext">
                          <Select
                            value={formData.dropdownCountryValue}
                            onChange={handleCountryChange}
                            options={countryList}
                            placeholder="Select a country"
                            isSearchable
                            className={
                              !!errors.dropdownCountryValue ? "is-invalid" : ""
                            }
                          />
                        </Form.Group>
                        {errors.dropdownCountryValue && (
                          <p
                            className="text-danger lh-1"
                            style={{ fontSize: "0.820em" }}
                          >
                            {errors.dropdownCountryValue}
                          </p>
                        )}
                      </div>

                      <div className="col-md-6">
                        <Form.Group className="mb-3" controlId="formPlaintext7">
                          <Select
                            value={formData.dropdownStateValue}
                            name="state"
                            options={stateList}
                            placeholder="Ain"
                            isSearchable={true}
                            onChange={handleStateChange}
                            className={
                              !!errors.dropdownStateValue ? "is-invalid" : ""
                            }
                          />
                        </Form.Group>
                        {errors.dropdownStateValue && (
                          <p
                            className="text-danger lh-1"
                            style={{ fontSize: "0.820em" }}
                          >
                            {errors.dropdownStateValue}
                          </p>
                        )}
                      </div>

                      <div className="col-md-6">
                        <Form.Group className="mb-3" controlId="formPlaintext8">
                          <Select
                            value={formData.dropdownCityValue}
                            name="city"
                            options={cityList}
                            placeholder="ambérieu-e..."
                            isSearchable={true}
                            onChange={handleCityChange}
                            className={
                              !!errors.dropdownCityValue ? "is-invalid" : ""
                            }
                          />
                        </Form.Group>
                        {errors.dropdownCityValue && (
                          <p
                            className="text-danger lh-1"
                            style={{ fontSize: "0.820em" }}
                          >
                            {errors.dropdownCityValue}
                          </p>
                        )}
                      </div>

                      <div className="col-md-12">
                        <Form.Group className="mb-3" controlId="formPlaintext9">
                          <div className={Styles.pickupSignupContainer}>
                            <FontAwesomeIcon
                              className={Styles.pickupSignupFieldsIcons}
                              icon={faLocationDot}
                            />
                            <Form.Control
                              className={Styles.signupUserName}
                              type="text"
                              placeholder="Siret"
                              name="siret"
                              value={formData.siret}
                              onChange={handleInputChange}
                            />
                          </div>
                        </Form.Group>
                        {errors.siret && (
                          <p
                            className="text-danger lh-1"
                            style={{ fontSize: "0.820em" }}
                          >
                            {errors.siret}
                          </p>
                        )}
                      </div>

                      <div className="col-md-12">
                        {checkboxTypes.map((type) => (
                          <div
                            key={`default-${type}`}
                            className={`mb-3 ${Styles.deliveryBoySignupCheckboxCard}`}
                          >
                            <Form.Check
                              type={type}
                              id={`default-${type}`}
                              label={null}
                              className={Styles.DeliveryboySignupCustomcheckbox}
                              name="termone"
                              value={formData.termone}
                              onChange={handleInputChange}
                              isInvalid={!!errors.termone}
                            />
                            <p className={Styles.checkText}>
                              We collect this data for the purposes of
                              processing your application to become a courier.
                              By clicking this box, you acknowledge that you
                              have read and understood the{" "}
                              <Link
                                className={Styles.deliverySignupPolicyCheck}
                                to="#"
                              >
                                Privacy Policy
                              </Link>
                            </p>
                          </div>
                        ))}
                        {errors.termone && (
                          <p
                            className="text-danger lh-1"
                            style={{ fontSize: "0.820em" }}
                          >
                            {errors.termone}
                          </p>
                        )}
                      </div>
                    </div>
                  </Form>

                  <div>
                    {failedError && (
                      <div className={Styles.checkText}>
                        <p className={Styles.termsCheck}>{ermessage}</p>
                      </div>
                    )}
                    <Link
                      to="#"
                      className={Styles.pickupSignupContinueBtn}
                      type="button"
                      onClick={submitHandler}
                      disabled={hitButton}
                    >
                      {hitButton ? "Loading ..." : "Continue"}
                    </Link>
                    <p className={Styles.pickupSignupAcLoginText}>
                      Already have an account?{" "}
                      <Link to="/login" className={Styles.loginTextSignup}>
                        Login
                      </Link>
                    </p>
                    <p className={Styles.pickupSignupAcLoginText}>
                      By signing up you agree to{" "}
                      <Link className={Styles.loginTextSignup} to="#">
                        Privacy policy
                      </Link>{" "}
                      &{" "}
                      <Link className={Styles.loginTextSignup} to="#">
                        Terms
                      </Link>{" "}
                      of RapidMate{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className={Styles.profileChooseBannerCard}>
                <img
                  className={Styles.deliveryboySignupbanner}
                  src={Banner}
                  alt="banner"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DeliveryboySignup;
