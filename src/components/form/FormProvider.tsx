"use client";
import type { ZodSchema } from "zod";
import { FormContext, useFormManager } from "~/lib/useFormManager";

export function FormProvider<T extends Record<string, any>>({
  schema,
  initialValues,
  onSubmit,
  children,
}: {
  schema: ZodSchema<T>;
  initialValues: T;
  onSubmit: (data: T) => void;
  children: React.ReactNode;
}) {
  const form = useFormManager({ schema, initialValues, onSubmit }); // This is NOT the context
  return (
    <FormContext.Provider value={form as any}>{children}</FormContext.Provider>
  );
}
