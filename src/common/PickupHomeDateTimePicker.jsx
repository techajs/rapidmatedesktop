import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import Styles from '../assets/css/home.module.css'

const DateAndTimePicker = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [value, setValue] = useState(new Date());

  const handleNowClick = () => {
    setShowPicker(true);
  };

  const handleDateTimeChange = (newValue) => {
    setValue(newValue);
    // You can choose whether to close the picker or leave it open
    // setShowPicker(false); // Optionally close the picker here
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
          <p className={Styles.homepickupChooseTimeText}>Choose a date & time that suits you!</p>
          <DateTimePicker
            onChange={handleDateTimeChange}
            value={value}
            format="dd/MM/yy HH:mm a"
          />
        </div>
      )}
    </div>
  );
};

export default DateAndTimePicker;
