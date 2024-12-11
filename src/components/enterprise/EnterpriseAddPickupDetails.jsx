import React, { useState } from "react";
import Styles from "../../assets/css/home.module.css";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faRepeat } from "@fortawesome/free-solid-svg-icons";
import SidebarImg from "../../assets/images/Pickup-Detail-SideImg.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CommonHeader from "../../common/CommonHeader";
import { faCircle, faCircleDot } from "@fortawesome/free-regular-svg-icons";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { showErrorToast } from "../../utils/Toastify";
import { ToastContainer } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TimePicker } from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import { useSelector } from "react-redux";
import moment from "moment";
import RepeatEverySelect from "./common/RepeatEverySelect";
import DatePickerField from "../../common/DatePickerField";
import WeekDaysSelect from "./common/WeekDaysSelect";
import DaysSelect from "./common/DaysSelect";
import TextInput from "../../common/TextInput";

const EnterpriseAddPickupDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const { order } = location.state || {};
console.log('order',order)
  const [selectCheckOption, setSelectedCheckOption] = useState("custom");
  const [repeatOrder, setRepeatOrder] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Daily");
  const [selectedDays, setSelectedDays] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });

  const handleDaySelect = (day) => {
    setSelectedDays((prevState) => ({
      ...prevState,
      [day]: !prevState[day],
    }));
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const FILE_SIZE = 2 * 1024 * 1024; // 2MB
  const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "application/pdf"];
  const schema = yup.object().shape({
    company: yup.string().required("Company name is required"),
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
    pickupDate: yup.date().nullable(),
    pickupTime: yup
      .string()
      .matches(/^([0-9]{2}):([0-9]{2})$/, "Please enter a valid time (HH:MM)"),
    repeatOrder: yup.boolean().default(false),
    selectedOption: yup.string(),
    days: yup.string().when("selectedOption", {
      is: (value) => ["Weekly", "Monthly"].includes(value),
      then: yup.number().required("Day is required."),
    }),
    repeatEvery: yup
      .string() // Treat it as a string because `<select>` returns a string
      .nullable(),
    until: yup.date().required("Date is required").typeError("Invalid date format"),

    selectedDays: yup
      .object()
      .shape({
        Monday: yup.boolean(),
        Tuesday: yup.boolean(),
        Wednesday: yup.boolean(),
        Thursday: yup.boolean(),
        Friday: yup.boolean(),
        Saturday: yup.boolean(),
        Sunday: yup.boolean(),
      }),
    onDay: yup
      .string()
      .nullable(),
    onThe: yup
      .string()
      .nullable(),
  });
  const handleCheckboxChange = (event) => {
    const seletedValue = event.target.value;
    setSelectedCheckOption(seletedValue);
    setValue("selectCheckOption", seletedValue);
  };

  const defaultEmail = user?.userDetails?.email || "";
  const defaultCompany = user?.userDetails?.company_name || "";
  const defaultPhone = user?.userDetails?.phone.replace("+", "") || "";
  const [imagePreview, setImagePreview] = useState(null);
  const [time, setTime] = useState("10:00");
  const [untilDate, setUntilDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      selectCheckOption: "",
      repeatEvery:1,
      pickupDate: new Date(),
      until: new Date(),
    },
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
        phone: data?.dphoneNumber,
        email: data?.demail,
        company: data?.dcompany,
        dropoff_note: data?.dropoff_note,
      };
      setValue("dropoffdetail", true);
    } else {
      setValue("dropoffdetail", false);
    }

    console.log("data", data);

    navigate("/enterprise/order-preview", {
      state: {
        order: order,
        orderCustomerDetails: data,
      },
    });
  };

  const handleRepeatOrder = (event) => {
    setRepeatOrder(event.target.checked);
    setValue("repeatOrder", event.target.checked);
  };

  const handleUntilChange = (date) => {
    setUntilDate(moment(date).format("YYYY-MM-DD"));
    // setValue("until", date); // Update the form value dynamically
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
                    <div className={Styles.addPickupDetailsInputs}>
                      <label
                        htmlFor="company"
                        className={Styles.addPickupDetailFormLabels}
                      >
                        Company :
                      </label>
                      <TextInput control={control} name="company"  placeholder="Company" error={errors.company}  defaultValue={defaultCompany}/>

                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className={Styles.addPickupDetailsInputs}>
                      <label
                        htmlFor="email"
                        className={Styles.addPickupDetailFormLabels}
                      >
                        Email:
                      </label>
                      <TextInput control={control} name="email"  placeholder="Email" error={errors.email}  defaultValue={defaultEmail}/>

                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className={Styles.addPickupDetailsInputs}>
                      <label
                        htmlFor="phoneNumber"
                        className={Styles.addPickupDetailFormLabels}
                      >
                        Phone Number:
                      </label>
                      <Controller
                        name="phoneNumber"
                        control={control}
                        defaultValue={defaultPhone}
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
                    <div className={Styles.addPickupDetailsInputs}>
                      <label
                        htmlFor="packageId"
                        className={Styles.addPickupDetailFormLabels}
                      >
                        Package ID
                      </label>
                     
                      <TextInput control={control} name="packageId"  placeholder="Package Id ..." error={errors.packageId}  defaultValue=""/>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className={Styles.addPickupDetailsInputs}>
                      <label
                        htmlFor="pickupnote"
                        className={Styles.addPickupDetailFormLabels}
                      >
                        Pickup notes
                      </label>
                      <TextInput control={control} name="pickupnote"  placeholder="type here ..." error={errors.pickupnote}  defaultValue=""/>

                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className={Styles.addPickupDetailsInputs}>
                      <label
                        htmlFor="pickupDate"
                        className={Styles.enterpriseSelectServicePickupDate}
                      >
                        Pickup Date:
                      </label>
                      <Controller
                        name="pickupDate"
                        control={control}
                        render={({ field }) => (
                          <DatePicker
                            {...field}
                            selected={field.value}
                            onChange={field.onChange}
                            dateFormat="dd/MM/yyyy"
                            className={Styles.enterpriseSelectServiceDateCard}
                            placeholderText="Select date"
                          />
                        )}
                      />
                      {errors.pickupDate && (
                        <p style={{ color: "red", fontSize: "13px" }}>
                          {errors.pickupDate.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className={Styles.addPickupDetailsInputs}>
                      <label
                        htmlFor="pickupTime"
                        className={Styles.addPickupDetailFormLabels}
                      >
                        Pickup Time:
                      </label>
                      <Controller
                        name="pickupTime"
                        control={control}
                        render={({ field }) => (
                          <TimePicker
                            {...field}
                            value={time}
                            onChange={(newTime) => {
                              setTime(newTime);
                              field.onChange(newTime);
                            }}
                            className={Styles.timePicker}
                            disableClock={true}
                          />
                        )}
                      />
                      {errors.pickupTime && (
                        <p style={{ color: "red", fontSize: "13px" }}>
                          {errors.pickupTime.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div
                  className={Styles.enterpriseSelectServiceRepeatOrderMainCard}
                >
                  <div
                    className={Styles.enterpriseSelectServiceRepeatOrderCard}
                  >
                    <p
                      className={Styles.enterpriseSelectServiceRepeatOrderText}
                    >
                      Repeat this order
                      {console.log("error", errors)}
                    </p>

                    <Form.Check
                      type="switch"
                      id="repeat-switch"
                      checked={repeatOrder}
                      onChange={handleRepeatOrder}
                      className={repeatOrder ? "repeat-switch" : ""}
                    />
                  </div>

                  {repeatOrder && (
                    <>
                      <div
                        className={Styles.enterpriseSelectServiceDayilyCardMain}
                      >
                        <div
                          className={`${
                            Styles.enterpriseSelectServiceDayilyCard
                          } ${selectedOption === "Daily" ? "selected" : ""}`}
                          onClick={() => handleSelect("Daily")}
                        >
                          <FontAwesomeIcon
                            className={`${
                              Styles.enterpriseSelectServiceRepeatCircle
                            } ${
                              selectedOption === "Daily"
                                ? "Service-selected-icon"
                                : ""
                            }`}
                            icon={
                              selectedOption === "Daily"
                                ? faCircleDot
                                : faCircle
                            }
                          />
                          <p
                            className={Styles.enterpriseSelectServiceDayilyText}
                          >
                            Daily
                          </p>
                        </div>

                        <div
                          className={`${
                            Styles.enterpriseSelectServiceDayilyCard
                          } ${selectedOption === "Weekly" ? "selected" : ""}`}
                          onClick={() => handleSelect("Weekly")}
                        >
                          <FontAwesomeIcon
                            className={`${
                              Styles.enterpriseSelectServiceRepeatCircle
                            } ${
                              selectedOption === "Weekly"
                                ? "Service-selected-icon"
                                : ""
                            }`}
                            icon={
                              selectedOption === "Weekly"
                                ? faCircleDot
                                : faCircle
                            }
                          />
                          <p
                            className={Styles.enterpriseSelectServiceDayilyText}
                          >
                            Weekly
                          </p>
                        </div>

                        <div
                          className={`${
                            Styles.enterpriseSelectServiceDayilyCard
                          } ${selectedOption === "Monthly" ? "selected" : ""}`}
                          onClick={() => handleSelect("Monthly")}
                        >
                          <FontAwesomeIcon
                            className={`${
                              Styles.enterpriseSelectServiceRepeatCircle
                            } ${
                              selectedOption === "Monthly"
                                ? "Service-selected-icon"
                                : ""
                            }`}
                            icon={
                              selectedOption === "Monthly"
                                ? faCircleDot
                                : faCircle
                            }
                          />
                          <p
                            className={Styles.enterpriseSelectServiceDayilyText}
                          >
                            Monthly
                          </p>
                        </div>
                      </div>

                      {selectedOption === "Daily" && (
                        <div className={Styles.enterpriseSelectServiceRepeatEveryCard}>
                          <div className={Styles.enterpriseSelectServiceDayilyCard}>
                            <FontAwesomeIcon className={Styles.enterpriseSelectServiceRepeatCircle} icon={faRepeat} />
                            <p  className={Styles.enterpriseSelectServiceRepeatEveryText}>Repeat every</p>
                          </div>
                          <RepeatEverySelect control={control} name="repeatEvery" error={errors.repeatEvery} />
                          <div className={Styles.enterpriseSelectServiceUntilCard}>
                            <p className={Styles.enterpriseSelectServiceUntilText}>until</p>
                            <DatePickerField control={control} name="until" selectedDate={untilDate} error={errors.until} />
                          </div>

                          <div>
                            <p className={Styles.enterpriseSelectServiceOccursday}> {" "} Occurs every day until{" "}
                              <span  className={Styles.enterpriseSelectServiceOccursSpan}>{untilDate}</span>
                            </p>
                          </div>
                        </div>
                      )}
                      {selectedOption === "Weekly" && (
                        <div>
                          <div className={Styles.enterpriseSelectServiceRepeatEveryCard}>
                            <div className={Styles.enterpriseSelectServiceDayilyCard}>
                              <FontAwesomeIcon className={Styles.enterpriseSelectServiceRepeatCircle} icon={faRepeat} />
                              <p  className={Styles.enterpriseSelectServiceRepeatEveryText}>Repeat every</p>
                            </div>
                            <RepeatEverySelect control={control} name="repeatEvery" error={errors.repeatEvery} />
                           
                            <DaysSelect control={control} error={errors.days} /> 

                            <div className={Styles.enterpriseSelectServiceUntilCard}>
                              <p className={Styles.enterpriseSelectServiceUntilText}>until</p>
                              <DatePickerField control={control} name="until" selectedDate={untilDate} onChange={handleUntilChange} error={errors.until} />
                            </div>
                            <div>
                              <p className={Styles.enterpriseSelectServiceOccursday}>
                                Occurs every day until{" "}
                                <span className={Styles.enterpriseSelectServiceOccursSpan}>{untilDate}</span>
                              </p>
                            </div>
                          </div>
                          <WeekDaysSelect control={control} selectedDays={selectedDays} />
                        </div>
                      )}

                      {selectedOption === "Monthly" && (
                        <div>
                          <div className={Styles.enterpriseSelectServiceRepeatEveryCard}>
                            <div className={Styles.enterpriseSelectServiceDayilyCard}>
                              <FontAwesomeIcon className={Styles.enterpriseSelectServiceRepeatCircle} icon={faRepeat} />
                              <p className={Styles.enterpriseSelectServiceRepeatEveryText}>Repeat every</p>
                            </div>
                            <RepeatEverySelect control={control} name="repeatEvery" error={errors.repeatEvery} />
                           
                            <DaysSelect control={control} error={errors.days} /> 

                            <div className={Styles.enterpriseSelectServiceDayilyCard}>
                              <p className={Styles.enterpriseSelectServiceRepeatEveryText}>On Day</p>
                            </div>
                            <div className="me-2">
                              <Controller
                                name="onDay"
                                control={control}
                                render={({ field }) => (
                                  <select
                                    {...field}
                                    id="onDay"
                                    className="form-select"
                                    onChange={(e) =>
                                      field.onChange(Number(e.target.value))
                                    }
                                  >
                                    {/* <option value="">Select</option> */}
                                    {Array.from({ length: 31 }, (_, i) => (
                                      <option key={i + 1} value={i + 1}>
                                        {i + 1}
                                      </option>
                                    ))}
                                  </select>
                                )}
                              />
                              {errors.onDay && (
                                <p className="text-danger">
                                  {errors.onDay.message}
                                </p>
                              )}
                            </div>
                            <div className={Styles.enterpriseSelectServiceDayilyCard}>
                              <p className={Styles.enterpriseSelectServiceRepeatEveryText}>On the</p>
                            </div>
                            <div className="me-2">
                              <Controller
                                name="onThe"
                                control={control}
                                render={({ field }) => (
                                  <select
                                    {...field}
                                    id="onThe"
                                    className="form-select"
                                  >
                                    <option value="">Select</option>
                                    <option value="First">First</option>
                                    <option value="Second">Second</option>
                                    <option value="Third">Third</option>
                                    <option value="Fourth">Fourth</option>
                                    <option value="Last">Last</option>
                                  </select>
                                )}
                              />
                              {errors.onThe && (
                                <p className="text-danger">
                                  {errors.onThe.message}
                                </p>
                              )}
                            </div>
                            <div className={Styles.enterpriseSelectServiceUntilCard}>
                              <p className={Styles.enterpriseSelectServiceUntilText}>until</p>
                              <DatePickerField control={control} name="until" selectedDate={untilDate} onChange={handleUntilChange} error={errors.until} />
                            </div>

                            <div>
                              <p className={Styles.enterpriseSelectServiceOccursday}> {" "} Occurs every day until{" "}
                                <span  className={Styles.enterpriseSelectServiceOccursSpan}>{untilDate}</span>
                              </p>
                            </div>
                          </div>
                          <WeekDaysSelect control={control} selectedDays={selectedDays} />
                          

                        </div>
                      )}
                    </>
                  )}
                </div>

                <p className={Styles.pickupPersonalDetails}>Drorpoff details</p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-start",
                  }}
                ></div>
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
                        <TextInput control={control} name="dname" placeholder="First name" error={errors.dname} defaultValue=""/>

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
                          <TextInput control={control} name="dlastname" placeholder="Last name" error={errors.dlastname} defaultValue=""/>
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
                        <TextInput control={control} name="dcompany" placeholder="Company name" error={errors.dcompany} defaultValue=""/>

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
                        <TextInput control={control} name="demail" placeholder="email" error={errors.demail} defaultValue=""/>

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
                        <TextInput control={control} name="dropoffnote" placeholder="Type here ..." error={errors.dropoffnote} defaultValue=""/>

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

export default EnterpriseAddPickupDetails;
