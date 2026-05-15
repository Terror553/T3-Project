"use client";

import { useFormContext } from "~/lib/useFormManager";
import { Editor } from "../editor";

interface TextAreaProps<T extends Record<string, string>> {
  name: keyof T & string;
  label: string;
  type?: string;
}

export function TextArea<T extends Record<string, string>>({
  name,
  label,
}: TextAreaProps<T>) {
  const { values, errors, setValues } = useFormContext<T>();

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Bypass default sanitizeInput in handleChange to allow raw HTML from TinyMCE
    setValues((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <Editor
        key={name}
        id={name}
        onChange={handleTextAreaChange}
        initialValue={values[name]}
      />
      <br />
      {errors[name] && <p className="alert alert-danger">{errors[name]}</p>}
    </div>
  );
}
