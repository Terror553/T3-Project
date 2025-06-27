"use client";
import { useNotification } from "~/client/notification";

export default function TestForm() {
  const { addNotification } = useNotification();

  return (
    <div className="max-w-md mx-auto mt-10">
      <button
        className="btn btn-primary"
        onClick={() => addNotification("Operation successful", "success")}
      >
        Submit
      </button>
    </div>
  );
}
