"use client";
// /components/TextInput.tsx

import { useFormContext } from "~/lib/useFormManager";

export function TextInput({
  name,
  label,
  type = "text",
}: {
  name: string;
  label: string;
  type?: string;
}) {
  const { values, errors, handleChange } = useFormContext<any>();

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
