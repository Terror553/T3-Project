"use client";

import { useFormContext } from "~/lib/useFormManager";

interface TextAreaProps<T extends Record<string, string>> {
  name: keyof T & string;
  label: string;
  type?: string;
}

export function TextArea<T extends Record<string, string>>({
  name,
  label,
}: TextAreaProps<T>) {
  const { values, errors, handleChange } = useFormContext<T>();

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleChange(name)({
      target: { name, value: e.target.value },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={values[name]}
        onChange={handleTextAreaChange}
        className="form-control"
      />
      <br />
      {errors[name] && <p className="alert alert-danger">{errors[name]}</p>}
    </div>
  );
}
