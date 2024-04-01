import { forwardRef } from "react";

export const InputDateField = forwardRef<
  HTMLInputElement,
  {
    name: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    minDate?: string;
    maxDate?: string;
  }
>(
  (
    {
      name = "",
      label = "",
      value = "",
      onChange,
      disabled = false,
      minDate,
      maxDate,
    },
    ref
  ) => {
    return (
      <div className="input-field">
        <label className="input-field__input-label" htmlFor="inputField">
          {label}
        </label>
        <input
          className="input-field__input-area"
          ref={ref}
          name={name}
          type="date"
          value={value}
          min={minDate}
          max={maxDate}
          disabled={disabled}
          onChange={onChange}
        />
      </div>
    );
  }
);

export default InputDateField;
