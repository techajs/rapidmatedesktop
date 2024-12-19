import React, { useState } from "react";
import Styles from "../../assets/css/home.module.css";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import SidebarImg from "../../assets/images/Pickup-Detail-SideImg.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CommonHeader from "../../common/CommonHeader";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { showErrorToast } from "../../utils/Toastify";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

const AddPickupDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state)=>state.auth.user)
  const { order } = location.state || {};

  const [selectedOption, setSelectedOption] = useState("Myself");
  const [selectCheckOption, setSelectedCheckOption] = useState("custom");
  const handleRadioChange = (event) => {
    const seletedValue = event.target.value;
    setSelectedOption(seletedValue);
  };
  const FILE_SIZE = 2 * 1024 * 1024; // 2MB
  const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "application/pdf"];
  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters long"),
    lastname: yup
      .string()
      .required("Last name is required")
      .min(2, "Last name must be at least 2 characters long"),
    company: yup.string(),
    packageId: yup
      .string()
      .required("Package id is required")
      .min(3, "Package id must be at least 3 characters long"),
    pickupnote: yup.string(),
    email: yup
      .string()
      .required("Email is required")
      .email("Please enter a valid email"),
    phoneNumber: yup
      .string()
      .required("Phone number is required")
      .matches(/^\d+$/, "Phone number should contain only digits")
      .min(8, "Phone number must be at least 8 digits"),
    file: yup
      .mixed()
      .required("A file is required")
      .test("fileSize", "File size is too large", (value) => {
        return value && value[0] && value[0].size <= FILE_SIZE;
      })
      .test("fileType", "Unsupported file type", (value) => {
        return value && value[0] && SUPPORTED_FORMATS.includes(value[0].type);
      }),
    dropoffnote: yup.string(),
    dcompany: yup.string(),
    dname: yup
      .string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters long"),
    dlastname: yup
      .string()
      .required("Last name is required")
      .min(2, "Last name must be at least 2 characters long"),
    demail: yup
      .string()
      .required("Email is required")
      .email("Please enter a valid email"),
    dphoneNumber: yup
      .string()
      .required("Phone number is required")
      .matches(/^\d+$/, "Phone number should contain only digits")
      .min(8, "Phone number must be at least 8 digits"),
  });
  const handleCheckboxChange = (event) => {
    const seletedValue = event.target.value;
    setSelectedCheckOption(seletedValue);
    setValue("selectCheckOption", seletedValue);
  };

  const defaultFirstName = user?.userDetails?.first_name || "";
  const defaultLastName = user?.userDetails?.last_name || "";
  const defaultEmail = user?.userDetails?.email || "";
  const defaultPhone = user?.userDetails?.phone.replace("+", "") || "";
  const [imagePreview, setImagePreview] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { selectCheckOption: "" },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Set image preview URL
      setValue("file", [file]); // Pass the file array to the form
    }
  };
  const onSubmit = (data) => {
    setValue("imageView", imagePreview);
    setValue("selectedOption", selectedOption);
    let dropoffDetail = "";
    if (selectCheckOption == "" || selectCheckOption == undefined) {
      showErrorToast("Select dropoff location detail.");
      return;
    }
    if (selectCheckOption == "custom") {
      dropoffDetail = {
        first_name: data?.dname,
        last_name: data?.dlastname,
        phone: data?.dphoneNumber,
        email: data?.demail,
        company: data?.dcompany,
        dropoff_note: data?.dropoffnote,
      };
      setValue("dropoffdetail", true);
    } else {
      setValue("dropoffdetail", false);
    }

    navigate("/consumer/order-preview", {
      state: {
        order: order,
        orderCustomerDetails: data,
        dropoffDetail,
      },
    });
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

                <div className={`row ${Styles.manageRow}`}>
                  <div className="col-md-12">
                    <div className={Styles.addPickupDetailRadioCard}>
                      {["Myself", "Other"].map((label, index) => (
                        <div key={`radio-${index}`} className="mb-3">
                          <input
                            type="radio"
                            id={`radio-${index}`}
                            name="custom-radio-group"
                            value={label}
                            checked={selectedOption === label}
                            onChange={handleRadioChange}
                            className={Styles.addPickupDetailRadioBtn}
                          />
                          <label
                            htmlFor={`radio-${index}`}
                            style={{ paddingLeft: "8px" }}
                          >
                            {label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className={`mb-1 ${Styles.addPickupDetailsInputs}`}>
                      <label
                        htmlFor="name"
                        className={Styles.addPickupDetailFormLabels}
                      >
                        First name:
                      </label>
                      <Controller
                        name="name"
                        control={control}
                        defaultValue={
                          selectedOption === "Myself" ? defaultFirstName : " "
                        }
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            placeholder="First name"
                            style={{ width: "100%", padding: "5px" }}
                          />
                        )}
                      />
                      {errors.name && (
                        <p style={{ color: "red", fontSize: "13px" }}>
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className={`mb-1 ${Styles.addPickupDetailsInputs}`}>
                      <label
                        htmlFor="lastname"
                        className={Styles.addPickupDetailFormLabels}
                      >
                        Last name:
                      </label>
                      <Controller
                        name="lastname"
                        control={control}
                        defaultValue={
                          selectedOption === "Myself" ? defaultLastName : " "
                        }
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            placeholder="Last name"
                            style={{ width: "100%", padding: "5px" }}
                          />
                        )}
                      />
                      {errors.lastname && (
                        <p style={{ color: "red", fontSize: "13px" }}>
                          {errors.lastname.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className={`mb-1 ${Styles.addPickupDetailsInputs}`}>
                      <label
                        htmlFor="company"
                        className={Styles.addPickupDetailFormLabels}
                      >
                        Company :
                      </label>
                      <Controller
                        name="company"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            placeholder="Company"
                            style={{ width: "100%", padding: "5px" }}
                          />
                        )}
                      />
                      {errors.company && (
                        <p style={{ color: "red", fontSize: "13px" }}>
                          {errors.company.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className={`mb-1 ${Styles.addPickupDetailsInputs}`}>
                      <label
                        htmlFor="email"
                        className={Styles.addPickupDetailFormLabels}
                      >
                        Email:
                      </label>
                      <Controller
                        name="email"
                        control={control}
                        defaultValue={
                          selectedOption === "Myself" ? defaultEmail : " "
                        }
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            placeholder="Email"
                            style={{ width: "100%", padding: "5px" }}
                          />
                        )}
                      />
                      {errors.email && (
                        <p style={{ color: "red", fontSize: "13px" }}>
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className={`mb-1 ${Styles.addPickupDetailsInputs}`}>
                      <label
                        htmlFor="phoneNumber"
                        className={Styles.addPickupDetailFormLabels}
                      >
                        Phone Number:
                      </label>
                      <Controller
                        name="phoneNumber"
                        control={control}
                        defaultValue={
                          selectedOption === "Myself" ? defaultPhone : " "
                        }
                        render={({ field: { onChange, value } }) => (
                          <PhoneInput
                            country={"fr"}
                            value={value}
                            // onlyCountries={["fr", "in"]}
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
                </div>

                <p className={Styles.pickupPersonalDetails}>Package details</p>

                <div className={`row ${Styles.manageRow}`}>
                  <div className="col-md-12">
                    <label
                      htmlFor="file"
                      className={Styles.addPickupDetailFormLabels}
                    >
                      Package photo
                    </label>

                    {imagePreview ? (
                      // Show only the package preview if an image has been uploaded
                      <div className="mt-2">
                        <p>Image Preview:</p>
                        <img
                          src={imagePreview}
                          alt="Preview"
                          style={{
                            width: "auto",
                            height: "150px",
                            objectFit: "contain",
                          }}
                        />
                      </div>
                    ) : (
                      // Show the upload UI when no image has been uploaded
                      <div className={Styles.addPickupUploadPhoto}>
                        <FontAwesomeIcon icon={faPaperclip} />
                        <p className={Styles.addPickupDragText}>
                          Drag or click to attach a photo
                        </p>
                        <Controller
                          name="file"
                          control={control}
                          defaultValue=""
                          render={({ field: { onChange, ref } }) => (
                            <input
                              ref={ref} // Ensure correct ref assignment
                              type="file"
                              className={Styles.addPickupFileInput}
                              style={{ width: "100%", padding: "5px" }}
                              onChange={(e) => {
                                // Pass the selected files to the react-hook-form
                                onChange(e.target.files);
                                handleImageChange(e);
                              }}
                            />
                          )}
                        />
                      </div>
                    )}

                    {errors.file && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "13px",
                          textAlign: "center",
                        }}
                      >
                        {errors.file.message}
                      </p>
                    )}
                  </div>

                  <div className="col-md-6">
                    <div className={`mb-1 ${Styles.addPickupDetailsInputs}`}>
                      <label
                        htmlFor="packageId"
                        className={Styles.addPickupDetailFormLabels}
                      >
                        Package ID
                      </label>
                      <Controller
                        name="packageId"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            placeholder="Package Id ..."
                            style={{ width: "100%", padding: "5px" }}
                          />
                        )}
                      />
                      {errors.packageId && (
                        <p style={{ color: "red", fontSize: "13px" }}>
                          {errors.packageId.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className={`mb-1 ${Styles.addPickupDetailsInputs}`}>
                      <label
                        htmlFor="pickupnote"
                        className={Styles.addPickupDetailFormLabels}
                      >
                        Pickup notes
                      </label>
                      <Controller
                        name="pickupnote"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            placeholder="Type here..."
                            style={{ width: "100%", padding: "5px" }}
                          />
                        )}
                      />
                      {errors.pickupnote && (
                        <p style={{ color: "red", fontSize: "13px" }}>
                          {errors.pickupnote.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <p className={Styles.pickupPersonalDetails}>Drorpoff details</p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-start",
                  }}
                >
                </div>
                {selectCheckOption == "custom" && (
                  <div className={`row ${Styles.manageRow}`}>
                    <div className="col-md-6">
                      <div className={`mb-1 ${Styles.addPickupDetailsInputs}`}>
                        <label
                          htmlFor="dname"
                          className={Styles.addPickupDetailFormLabels}
                        >
                          First name:
                        </label>
                        <Controller
                          name="dname"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <input
                              {...field}
                              type="text"
                              placeholder="First name"
                              style={{ width: "100%", padding: "5px" }}
                            />
                          )}
                        />
                        {errors.dname && (
                          <p style={{ color: "red", fontSize: "13px" }}>
                            {errors.dname.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className={`mb-1 ${Styles.addPickupDetailsInputs}`}>
                        <label
                          htmlFor="dlastname"
                          className={Styles.addPickupDetailFormLabels}
                        >
                          Last name:
                        </label>
                        <Controller
                          name="dlastname"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <input
                              {...field}
                              type="text"
                              placeholder="Last name"
                              style={{ width: "100%", padding: "5px" }}
                            />
                          )}
                        />
                        {errors.dlastname && (
                          <p style={{ color: "red", fontSize: "13px" }}>
                            {errors.dlastname.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className={`mb-1 ${Styles.addPickupDetailsInputs}`}>
                        <label
                          htmlFor="dcompany"
                          className={Styles.addPickupDetailFormLabels}
                        >
                          Company :
                        </label>
                        <Controller
                          name="dcompany"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <input
                              {...field}
                              type="text"
                              placeholder="Company"
                              style={{ width: "100%", padding: "5px" }}
                            />
                          )}
                        />
                        {errors.dcompany && (
                          <p style={{ color: "red", fontSize: "13px" }}>
                            {errors.dcompany.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className={`mb-1 ${Styles.addPickupDetailsInputs}`}>
                        <label
                          htmlFor="demail"
                          className={Styles.addPickupDetailFormLabels}
                        >
                          Email:
                        </label>
                        <Controller
                          name="demail"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <input
                              {...field}
                              type="text"
                              placeholder="Email"
                              style={{ width: "100%", padding: "5px" }}
                            />
                          )}
                        />
                        {errors.demail && (
                          <p style={{ color: "red", fontSize: "13px" }}>
                            {errors.demail.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className={`mb-1 ${Styles.addPickupDetailsInputs}`}>
                        <label
                          htmlFor="dphoneNumber"
                          className={Styles.addPickupDetailFormLabels}
                        >
                          Phone Number:
                        </label>
                        <Controller
                          name="dphoneNumber"
                          control={control}
                          defaultValue=""
                          render={({ field: { onChange, value } }) => (
                            <PhoneInput
                              country={"fr"}
                              value={value}
                              // onlyCountries={["fr", "in"]}
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
                        {errors.dphoneNumber && (
                          <p style={{ color: "red", fontSize: "13px" }}>
                            {errors.dphoneNumber.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className={`mb-1 ${Styles.addPickupDetailsInputs}`}>
                        <label
                          htmlFor="dropoffnote"
                          className={Styles.addPickupDetailFormLabels}
                        >
                          Dropoff notes
                        </label>
                        <Controller
                          name="dropoffnote"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <input
                              {...field}
                              type="text"
                              placeholder="Type here..."
                              style={{ width: "100%", padding: "5px" }}
                            />
                          )}
                        />
                        {errors.dropnote && (
                          <p style={{ color: "red", fontSize: "13px" }}>
                            {errors.dropnote.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                <div className={`row ${Styles.manageRow}`}>
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
                        type="submit"
                        onClick={handleSubmit(onSubmit)}
                        className={Styles.addPickupDetailsNextBtn}
                      >
                        Next
                      </button>
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
};

export default AddPickupDetails;
