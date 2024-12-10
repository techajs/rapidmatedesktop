import { Controller } from "react-hook-form";

const RepeatEverySelect = ({ control, name, error, options = [1, 2, 3, 4, 5] }) => (
    <div className="me-2">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <select {...field} className="form-select" onChange={(e) => field.onChange(Number(e.target.value))}>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
      />
      {error && <p style={{ color: "red", fontSize: "13px" }}>{error.message}</p>}
    </div>
);
export default RepeatEverySelect

