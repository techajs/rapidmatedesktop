// DateAndTimePicker.js
import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import Styles from '../assets/css/home.module.css';

const DateAndTimePicker = ({ onDateTimeChange }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [value, setValue] = useState(new Date());

  // Handles the "Now" button click
  const handleNowClick = () => {
    setShowPicker(true);
  };

  // Handles date and time changes
  const handleDateTimeChange = (newValue) => {
    setValue(newValue);
    if (onDateTimeChange) {
      // Send the selected value to the parent component
      onDateTimeChange(newValue);
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
          <DateTimePicker
            onChange={handleDateTimeChange}
            value={value}
            format="dd/MM/yy HH:mm a" // Custom format
          />
        </div>
      )}
    </div>
  );
};

export default DateAndTimePicker;
