"use client";
import { useState, createContext, useContext } from "react";
import type { ZodSchema } from "zod";
import { sanitizeInput } from "./sanitize";
import type { ReactNode } from "react";

export interface FormContextValue<T extends Record<string, any>> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  handleChange: (field: keyof T) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  setValues: React.Dispatch<React.SetStateAction<T>>;
  setErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof T, string>>>>;
}

export const FormContext = createContext<FormContextValue<any> | undefined>(undefined);

export function useFormContext<T extends Record<string, any>>() {
  const context = useContext(FormContext);
  if (!context)
    throw new Error("useFormContext must be used within a <FormProvider>");
  return context as FormContextValue<T>;
}

export interface FormManagerProps<T extends Record<string, any>> {
  schema: ZodSchema<T>;
  initialValues: T;
  onSubmit: (data: T) => void;
}

export function useFormManager<T extends Record<string, any>>({
  schema,
  initialValues,
  onSubmit,
}: FormManagerProps<T>): FormContextValue<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange =
    (field: keyof T) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = sanitizeInput(e.target.value) as T[keyof T];
      setValues((prev) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(values);

    if (!result.success) {
      const zodErrors: Partial<Record<keyof T, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof T;
        zodErrors[field] = err.message;
      });
      setErrors(zodErrors);
    } else {
      setErrors({});
      onSubmit(result.data);
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    setValues,
    setErrors,
  };
}