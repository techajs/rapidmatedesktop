import React, { useState } from "react";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import Styles from "../assets/css/home.module.css";

const DateAndTimePicker = ({ onDateTimeChange }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // Handles the "Now" button click
  const handleNowClick = () => {
    const now = new Date();
    const formattedDate = now.toISOString().split("T")[0];
    const formattedTime = now.toTimeString().split(" ")[0].slice(0, 5);
    setSelectedDate(formattedDate);
    setSelectedTime(formattedTime);
    setShowPicker(true);

    // Notify parent component of the current time
    if (onDateTimeChange) {
      onDateTimeChange(now);
    }
  };

  // Handles date and time changes
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    updateParent(e.target.value, selectedTime);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
    updateParent(selectedDate, e.target.value);
  };

  const updateParent = (date, time) => {
    if (date && time && onDateTimeChange) {
      const combinedDateTime = new Date(`${date}T${time}`);
      onDateTimeChange(combinedDateTime);
    }
  };

  return (
    <div className={Styles.homepickupScheduleRequestCardMain}>
      <div className={Styles.pickupHomeScheduleselectCard}>
        <FontAwesomeIcon
          className={Styles.pickupHomeCalenderIcon}
          icon={faCalendarDays}
        />
        <p className={Styles.pickupHomeWhenNeedText}>When do you need it?</p>
        <p className={Styles.pickupHomeNowText} onClick={handleNowClick}>
          Now
        </p>
      </div>

      {showPicker && (
        <div>
          <p className={Styles.homepickupChooseTimeText}>
            Choose a date & time that suits you!
          </p>
          <input
            type="date"
            value={selectedDate}
            placeholder="mm/dd/yyyy"
            onChange={handleDateChange}
            style={{ marginRight: "10px" }}
          />
          <input
            type="time"
            value={selectedTime}
            onChange={handleTimeChange}
            style={{
              width: "150px",
              marginRight: "10px",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DateAndTimePicker;
