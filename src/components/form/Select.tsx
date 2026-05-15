"use client";

import { useFormContext } from "~/lib/useFormManager";

interface SelectProps<T extends Record<string, string>> {
  name: keyof T & string;
  label: string;
  type?: string;
  options: { value: string | number; label: string }[];
}

export function Select<T extends Record<string, string>>({
  name,
  label,
  options,
}: SelectProps<T>) {
  const { values, errors, handleChange } = useFormContext<T>();

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleChange(name)({
      target: { name, value: e.target.value },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        className="form-control"
        id={name}
        name={name}
        value={values[name]}
        onChange={handleSelectChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <br />
      {errors[name] && <p className="alert alert-danger">{errors[name]}</p>}
    </div>
  );
}
