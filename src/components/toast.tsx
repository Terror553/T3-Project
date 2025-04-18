"use client";

import { useTheme } from "~/client/theme";

export function Toast() {
  return (
    <>
      <div id="toast-container" className="toast-top-right">
        <div className="toast toast-success" aria-live="polite">
          <div className="toast-message">Kopiert!!!</div>
        </div>
        <div className="toast toast-warning dismissable" aria-live="polite">
          <div className="toast-message">Kopiert!!!</div>
        </div>
        <div className="toast toast-danger" aria-live="polite">
          <div className="toast-message">Kopiert!!!</div>
        </div>
      </div>
    </>
  );
}

export function Client() {
  const { showLoadingBar, hideLoadingBar, copy } = useTheme();
  return (
    <>
      <button onClick={() => showLoadingBar("loadingBarName")}>
        Show loading
      </button>
      <button onClick={() => hideLoadingBar("loadingBarName")}>
        Hide loading
      </button>
      <button onClick={() => copy("#test")}>Copy!</button>
    </>
  );
}
