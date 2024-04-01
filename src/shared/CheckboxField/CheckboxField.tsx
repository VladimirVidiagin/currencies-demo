import React, { forwardRef } from "react";

interface CheckboxProps {
  name: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckboxField: React.FC<CheckboxProps> = forwardRef<
  HTMLInputElement,
  CheckboxProps
>(({ name = "", label = "", checked = false, onChange }, ref) => {
  return (
    <div className="checkbox-field">
      <input
        className="checkbox-field__input-area"
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        ref={ref}
      />
      <label className="checkbox-field__input-label" htmlFor="inputField">
        {label}
      </label>
    </div>
  );
});
