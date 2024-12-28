import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faCheck } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import {
  faUser,
  faEnvelope,
  faEye,
  faEyeSlash,
  faBuilding,
} from "@fortawesome/free-regular-svg-icons";
import Styles from "../../assets/css/home.module.css";
import Logo from "../../assets/images/Logo-icon.png";
import SignupBanner from "../../assets/images/Pickup-Signup-Banner.png";
import { Link, useNavigate } from "react-router-dom";
import { getCountryList, signUpUser } from "../../data_manager/dataManage";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { ToastContainer } from "react-toastify";
import { showErrorToast } from "../../utils/Toastify";
const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters long"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d+$/, "Phone number should contain only digits")
    .min(7, "Phone number must be at least 7 digits"),
  country: yup
    .object({
      value: yup.string().required("Country is required"),
    })
    .required("Country is required"),
});
const PickupSignup = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedAccountType, setSelectedAccountType] = useState("Individual");
  const [ermessage, setErmessage] = useState("");
  const [hitButton, setHitButton] = useState(false);
  const [failedError, setFailedError] = useState(false);
  const [masterCountryList, setMasterCountryList] = useState(null);
  const [countryList, setCountryList] = useState([]);

  const handleSelection = (type) => {
    setSelectedAccountType(type);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
  }, []);

  const {control,handleSubmit,formState: { errors },} = useForm({resolver: yupResolver(schema),});
  const onSubmit = (data) => {
    // console.log("Form Data:", data);
    setHitButton(true);
    let params = {
      info: {
        userName: data.email,
        email: data.email,
        phoneNumber: "+" + data.phoneNumber,
        password: data.password,
        userrole: "CONSUMER",
        firstName: data.name,
        lastName: "",
        country: data.country?.value.toString(),
      },
    };
    signUpUser(
      params,
      (successResponse) => {
        if (successResponse[0]._success) {
          console.log(successResponse[0]);
          if (successResponse[0]._response) {
            if (successResponse[0]._response.name == "NotAuthorizedException") {
              showErrorToast(successResponse[0]._response.name);
              setErmessage(false)
              setFailedError(false)
              setHitButton(false);
            } else {
              setHitButton(false);
              navigate("/signup-verify", {
                state: {
                  user: {
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                    password: data.password,
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
        showErrorToast(err)
        setErmessage(false)
        setFailedError(false)
        setHitButton(false);
      }
    );
  };
  
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
                      Pickup & Drop-off signup
                    </h2>
                    <p className={Styles.chooseProfileSubheading}>
                      Let’s create your profile so you can have complete
                      experience of the app
                    </p>
                  </div>
                </div>
                <div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <div className={Styles.pickupSignupContainer}>
                          <FontAwesomeIcon
                            className={Styles.pickupSignupFieldsIcons}
                            icon={faUser}
                          />
                          <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <input
                                {...field}
                                type="text"
                                placeholder="Name"
                                style={{ width: "100%", padding: "5px" }}
                                className={Styles.signupUserName}
                              />
                            )}
                          />
                        </div>
                        {errors.name && (
                          <p style={{ color: "red", fontSize: "13px" }}>{errors.name.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <div className={Styles.pickupSignupContainer}>
                          <FontAwesomeIcon
                            className={Styles.pickupSignupFieldsIcons}
                            icon={faEnvelope}
                          />
                          <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <input
                                {...field}
                                type="text"
                                placeholder="Email"
                                style={{ width: "100%", padding: "5px" }}
                                className={Styles.signupUserName}
                              />
                            )}
                          />
                        </div>
                        {errors.email && (
                          <p style={{ color: "red", fontSize: "13px" }}>{errors.email.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <div className={Styles.pickupSignupContainer}>
                          <FontAwesomeIcon
                            className={Styles.pickupSignupFieldsIcons}
                            icon={faLock}
                          />
                          <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <input
                                {...field}
                                type={showPassword ? "text" : "password"}
                                placeholder="Password..."
                                style={{ width: "100%", padding: "5px" }}
                                className={Styles.signupUserName}
                              />
                            )}
                          />
                          <FontAwesomeIcon
                            icon={showPassword ? faEye : faEyeSlash}
                            onClick={togglePasswordVisibility}
                            className={Styles.signupPasswordEyeIcon}
                          />
                        </div>
                        {errors.password && (
                          <p style={{ color: "red", fontSize: "13px" }}>
                            {errors.password.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <div className={Styles.pickupSignupContainer}>
                          <FontAwesomeIcon
                            className={Styles.pickupSignupFieldsIcons}
                            icon={faLock}
                          />
                          <Controller
                            name="confirmPassword"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <input
                                {...field}
                                type={showPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                style={{ width: "100%", padding: "5px" }}
                                className={Styles.signupUserName}
                              />
                            )}
                          />
                          <FontAwesomeIcon
                            icon={showPassword ? faEye : faEyeSlash}
                            onClick={togglePasswordVisibility}
                            className={Styles.signupPasswordEyeIcon}
                          />
                        </div>
                        {errors.confirmPassword && (
                          <p style={{ color: "red", fontSize: "13px" }}>
                            {errors.confirmPassword.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <Controller
                          name="phoneNumber"
                          control={control}
                          defaultValue=""
                          render={({ field: { onChange, value } }) => (
                            <PhoneInput
                              country={"fr"}
                              value={value}
                              countryCodeEditable={false}
                              onChange={onChange}
                              inputStyle={{
                                width: "100%",
                                paddingLeft: "42px",
                              }}
                              dropdownStyle={{ borderColor: "#ccc" }}
                              enableSearch
                              searchPlaceholder="Search country"
                              specialLabel=""
                            />
                          )}
                        />
                        {errors.phoneNumber && (
                          <p style={{ color: "red", fontSize: "13px" }}>
                            {errors.phoneNumber.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <Controller
                          name="country"
                          control={control}
                          defaultValue={null}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={countryList}
                              placeholder="Select your country"
                              styles={customSelectStyles}
                            />
                          )}
                        />
                        {errors.country && (
                          <p style={{ color: "red", fontSize: "13px" }}>{errors.country.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <p className={Styles.pickupSingupAccountType}>
                      Create account as:
                    </p>
                    <div className="col-md-6">
                      <div
                        className={`${Styles.pickupSignupTypeOfAc} ${
                          selectedAccountType === "Individual"
                            ? Styles.selected
                            : ""
                        }`}
                        onClick={() => handleSelection("Individual")}
                      >
                        <FontAwesomeIcon
                          className={Styles.pickupSignupFieldsIcons}
                          icon={faUser}
                        />
                        <p className={Styles.acNamesType}>Individual</p>
                        <div
                          className={`${Styles.pickupSignupAcCircle} ${
                            selectedAccountType === "Individual"
                              ? Styles.selected
                              : ""
                          }`}
                        >
                          {selectedAccountType === "Individual" && (
                            <FontAwesomeIcon
                              className={Styles.selectedCheck}
                              icon={faCheck}
                            />
                          )}
                        </div>
                      </div>
                      <p
                        className={`${Styles.chooseProfileSubheading} ${
                          errors.selectedAccountType
                            ? Styles.forgotPassword
                            : ""
                        } `}
                      >
                        {errors.selectedAccountType !== undefined &&
                        errors.selectedAccountType !== null
                          ? errors.selectedAccountType
                          : ""}
                      </p>
                    </div>

                    <div className="col-md-6">
                      <div
                        className={`${Styles.pickupSignupTypeOfAc} ${
                          selectedAccountType === "Company"
                            ? Styles.selected
                            : ""
                        }`}
                        onClick={() => handleSelection("Company")}
                      >
                        <FontAwesomeIcon
                          className={Styles.pickupSignupFieldsIcons}
                          icon={faBuilding}
                        />
                        <p className={Styles.acNamesType}>Company</p>
                        <div
                          className={`${Styles.pickupSignupAcCircle} ${
                            selectedAccountType === "Company"
                              ? Styles.selected
                              : ""
                          }`}
                        >
                          {selectedAccountType === "Company" && (
                            <FontAwesomeIcon
                              className={Styles.selectedCheck}
                              icon={faCheck}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    {failedError && (
                      <div className={Styles.checkText}>
                        <p className={Styles.termsCheck}>{ermessage}</p>
                      </div>
                    )}

                    <Link
                      to="#"
                      className={`mt-5 ${Styles.pickupSignupContinueBtn}`}
                      type="button"
                      onClick={handleSubmit(onSubmit)}
                      disabled={hitButton}
                    >
                      {hitButton ? "Loading ..." : t("continue")}
                    </Link>
                    <p className={Styles.pickupSignupAcLoginText}>
                      {t("already_have_an_account")}{" "}
                      <Link to="/login" className={Styles.loginTextSignup}>
                        {t("login")}
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
                  className={Styles.PickupSignupBanner}
                  src={SignupBanner}
                  alt="banner"
                />
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />

      </section>
    </>
  );
};

const customSelectStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "#fff",
    width: "100%",
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isSelected ? "#ffc72b" : isFocused ? "#f8f9fa" : "#fff",
    color: "#333",
  }),
};
export default PickupSignup;
