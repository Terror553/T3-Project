"use client";

import { useModalManager } from "~/client/modalUtils";
import { PasswordChangeForm } from "~/components/changePasswordForm";

export default function ChangePasswordPage() {
  const { openModal, closeModal } = useModalManager();

  const handleOpenModal = () => {
    openModal({
      title: "Change Password",
      content: <PasswordChangeForm />,
      size: "xl",
      staticBackdrop: false,
    });
  };

  return (
    <div className="content">
      <h2>Change Password:</h2>

      <button className="btn btn-secondary " onClick={() => handleOpenModal()}>
        Here!1
      </button>
    </div>
  );
}
