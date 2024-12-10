import React from "react";
import { Controller } from "react-hook-form";
import Styles from "../../../assets/css/home.module.css";

const DaysSelect = ({ control, error }) => (
  <div className="me-2">
    <Controller
      name="days"
      control={control}
      className={Styles.enterpriseSelectServiceRepeatDateSelect}
      render={({ field }) => (
        <select {...field} className="form-select">
          <option value="day">Day</option>
          <option value="week">Week</option>
        </select>
      )}
    />
    {error && <p style={{ color: "red", fontSize: "13px" }}>{error.message}</p>}
  </div>
);

export default DaysSelect;
