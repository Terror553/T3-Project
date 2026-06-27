"use client";
import { useState, createContext, useContext } from "react";
import type { ZodSchema } from "zod";
import { sanitizeInput } from "./sanitize";

export interface FormContextValue<T extends Record<string, unknown>> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  handleChange: (
    field: keyof T,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFieldValue: <K extends keyof T>(field: K, value: T[K]) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  setValues: React.Dispatch<React.SetStateAction<T>>;
  setErrors: React.Dispatch<
    React.SetStateAction<Partial<Record<keyof T, string>>>
  >;
}

export const FormContext = createContext<
  FormContextValue<Record<string, unknown>> | undefined
>(undefined);

export function useFormContext<T extends Record<string, unknown>>() {
  const context = useContext(FormContext);
  if (!context)
    throw new Error("useFormContext must be used within a <FormProvider>");
  return context as FormContextValue<T>;
}

export interface FormManagerProps<T extends Record<string, unknown>> {
  schema: ZodSchema<T>;
  initialValues: T;
  onSubmit: (data: T) => void;
}

export function useFormManager<T extends Record<string, unknown>>({
  schema,
  initialValues,
  onSubmit,
}: FormManagerProps<T>): FormContextValue<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const setFieldValue = <K extends keyof T>(field: K, value: T[K]) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleChange =
    (field: keyof T) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = sanitizeInput(e.target.value) as T[keyof T];
      setFieldValue(field, value);
    };

  const handleSubmit = async (e: React.FormEvent) => {
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
      await Promise.resolve(onSubmit(result.data));
    }
  };

  return {
    values,
    errors,
    handleChange,
    setFieldValue,
    handleSubmit,
    setValues,
    setErrors,
  };
}
