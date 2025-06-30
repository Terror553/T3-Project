"use client";
import type { ZodSchema } from "zod";
import type { ReactNode } from "react";
import { FormContext, useFormManager, type FormContextValue } from "~/lib/useFormManager";

export interface FormProviderProps<T extends Record<string, any>> {
  schema: ZodSchema<T>;
  initialValues: T;
  onSubmit: (data: T) => void;
  children: ReactNode;
}

export function FormProvider<T extends Record<string, any>>({
  schema,
  initialValues,
  onSubmit,
  children,
}: FormProviderProps<T>) {
  const form = useFormManager<T>({ schema, initialValues, onSubmit });
  return (
    <FormContext.Provider value={form as FormContextValue<T>}>
      {children}
    </FormContext.Provider>
  );
}