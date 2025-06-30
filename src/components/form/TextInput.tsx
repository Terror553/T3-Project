"use client";

import { useFormContext } from "~/lib/useFormManager";

interface TextInputProps<T extends Record<string, any>> {
  name: keyof T & string;
  label: string;
  type?: string;
}

export function TextInput<T extends Record<string, any>>({
  name,
  label,
  type = "text",
}: TextInputProps<T>) {
  const { values, errors, handleChange } = useFormContext<T>();

  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={values[name]}
        onChange={handleChange(name)}
        className="form-control"
      />
      <br />
      {errors[name] && <p className="alert alert-danger">{errors[name]}</p>}
    </div>
  );
}