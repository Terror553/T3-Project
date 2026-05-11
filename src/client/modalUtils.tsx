"use client";
import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
  useId,
} from "react";

export interface ModalOptions {
  title?: string;
  content: React.ReactNode;
  footer?: React.ReactNode; // Optional footer content
  size?: "sm" | "lg" | "xl"; // Bootstrap modal sizes
  staticBackdrop?: boolean; // Option for static backdrop
  onShow?: () => void;
  onHide?: () => void;
}

interface ModalContextType {
  openModal: (options: ModalOptions) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModalManager = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalManager must be used within a ModalProvider");
  }
  return context;
};

interface ModalProviderProps {
  children: React.ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modalConfig, setModalConfig] = useState<ModalOptions | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const modalInstanceRef = useRef<any>(null);

  const onShowRef = useRef<(() => void) | undefined>(undefined);
  const onHideRef = useRef<(() => void) | undefined>(undefined);

  // Generate a unique ID for accessibility
  const modalId = useId();
  const titleId = `${modalId}-title`;

  // Initialize Bootstrap Modal instance and events
  useEffect(() => {
    const modalElement = modalRef.current;

    if (
      modalElement &&
      typeof window !== "undefined" &&
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).bootstrap?.Modal
    ) {
      if (!modalInstanceRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        modalInstanceRef.current = new (window as any).bootstrap.Modal(
          modalElement,
          {
            keyboard: true,
          },
        );
      }

      const handleShown = () => {
        onShowRef.current?.();
      };
      const handleHidden = () => {
        onHideRef.current?.();
        // Clear the config so content is unmounted
        setModalConfig(null);
      };

      modalElement.addEventListener("shown.bs.modal", handleShown);
      modalElement.addEventListener("hidden.bs.modal", handleHidden);

      // Cleanup
      return () => {
        modalElement.removeEventListener("shown.bs.modal", handleShown);
        modalElement.removeEventListener("hidden.bs.modal", handleHidden);

        if (
          modalInstanceRef.current &&
          typeof modalInstanceRef.current.dispose === "function"
        ) {
          try {
            modalInstanceRef.current.dispose();
          } catch (e) {
            console.error("Error disposing Bootstrap modal instance:", e);
          }
        }
        modalInstanceRef.current = null;
      };
    }
  }, []);

  const openModal = useCallback((options: ModalOptions) => {
    setModalConfig(options);
    onShowRef.current = options.onShow;
    onHideRef.current = options.onHide;

    // Use a small timeout to allow React to render the new content before showing
    setTimeout(() => {
      // Fallback initialization if useEffect missed it (e.g. late Bootstrap load)
      const modalElement = modalRef.current;
      if (
        !modalInstanceRef.current &&
        modalElement &&
        typeof window !== "undefined" &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).bootstrap?.Modal
      ) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        modalInstanceRef.current = new (window as any).bootstrap.Modal(
          modalElement,
          { keyboard: true },
        );
      }

      if (
        modalInstanceRef.current &&
        typeof modalInstanceRef.current.show === "function"
      ) {
        modalInstanceRef.current.show();
      } else {
        console.warn("Bootstrap Modal instance not available to show.");
      }
    }, 50); // Slightly increased timeout to ensure DOM finishes updating
  }, []);

  const closeModal = useCallback(() => {
    if (
      modalInstanceRef.current &&
      typeof modalInstanceRef.current.hide === "function"
    ) {
      modalInstanceRef.current.hide();
    } else {
      console.warn("Bootstrap Modal instance not available to hide.");
    }
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {/* Global single modal DOM shell */}
      <div
        className="modal fade"
        ref={modalRef}
        id={modalId}
        tabIndex={-1}
        aria-labelledby={titleId}
        aria-hidden="true"
        data-bs-backdrop={modalConfig?.staticBackdrop ? "static" : undefined}
        data-bs-keyboard={modalConfig?.staticBackdrop ? "false" : undefined}
      >
        <div
          className={`modal-dialog ${modalConfig?.size ? `modal-${modalConfig.size}` : ""}`}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={titleId}>
                {modalConfig?.title ?? ""}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">{modalConfig?.content}</div>
            {modalConfig?.footer && (
              <div className="modal-footer">{modalConfig.footer}</div>
            )}
          </div>
        </div>
      </div>
    </ModalContext.Provider>
  );
};
