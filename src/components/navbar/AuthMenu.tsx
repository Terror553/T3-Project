"use client";

import Link from "next/link";

export const AuthMenu = () => {
  return (
    <>
      <li className="nav-item">
        <Link
          className="nav-link"
          href="#modal-login"
          data-bs-toggle="modal"
        >
          <div className="nav-link-icon">
            <i className="fas fa-key icon"></i>
          </div>
          <div className="nav-link-text">Einloggen</div>
        </Link>
      </li>
      <li className="nav-item">
        <Link
          href="/register"
          className="nav-link"
          data-request-modal="register"
        >
          <div className="nav-link-icon">
            <i className="fas fa-clipboard icon"></i>
          </div>
          <div className="nav-link-text">Sign up</div>
        </Link>
      </li>
    </>
  );
};