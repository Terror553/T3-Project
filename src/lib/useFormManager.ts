"use client";
import { useState, createContext, useContext } from "react";
import { ZodSchema } from "zod";
import { sanitizeInput } from "./sanitize";
import React from "react";

type FormContextType<T extends Record<string, any>> = ReturnType<
  typeof useFormManager<T>
>;

export const FormContext = React.createContext<
  FormContextType<any> | undefined
>(undefined); // ✅ THIS is the real FormContext

export function useFormContext<T extends Record<string, any>>() {
  const context = useContext(FormContext);
  if (!context)
    throw new Error("useFormContext must be used within a <FormProvider>");
  return context as FormContextType<T>;
}

export function useFormManager<T extends Record<string, any>>({
  schema,
  initialValues,
  onSubmit,
}: {
  schema: ZodSchema<T>;
  initialValues: T;
  onSubmit: (data: T) => void;
}) {
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
