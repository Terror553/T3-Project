"use client";
import React, { useCallback, useRef, useState, useEffect, useId } from "react";

export interface ModalOptions {
  title?: string;
  content?: React.ReactNode;
  footer?: React.ReactNode; // Optional footer content
  size?: "sm" | "lg" | "xl"; // Bootstrap modal sizes
  staticBackdrop?: boolean; // Option for static backdrop
  onShow?: () => void;
  onHide?: () => void;
}

export interface UseModalResult {
  isVisible: boolean; // Reflects if the modal is currently shown via Bootstrap
  title: string;
  content: React.ReactNode;
  footer: React.ReactNode;
  show: (options?: ModalOptions) => void;
  hide: () => void;
  setTitle: (title: string) => void;
  setContent: (content: React.ReactNode) => void;
  setFooter: (footer: React.ReactNode) => void;
  Modal: React.FC; // The component to render the modal structure
}

export function useModal(initialOptions?: ModalOptions): UseModalResult {
  // State to track if Bootstrap considers the modal visible
  const [isVisible, setIsVisible] = useState(false);
  const [title, setTitle] = useState(initialOptions?.title ?? "");
  const [content, setContent] = useState<React.ReactNode>(
    initialOptions?.content ?? null,
  );
  const [footer, setFooter] = useState<React.ReactNode>(
    initialOptions?.footer ?? null,
  );
  const [size, setSize] = useState<string>(
    initialOptions?.size ? `modal-${initialOptions.size}` : "",
  );
  const [staticBackdrop, setStaticBackdrop] = useState<boolean>(
    initialOptions?.staticBackdrop ?? false,
  );

  // Refs for callbacks and Bootstrap instance
  const onShowRef = useRef<(() => void) | undefined>(initialOptions?.onShow);
  const onHideRef = useRef<(() => void) | undefined>(initialOptions?.onHide);
  const modalRef = useRef<HTMLDivElement>(null); // Ref for the modal DOM element
  const modalInstanceRef = useRef<any>(null); // Ref for the Bootstrap Modal instance

  // Generate a unique ID for accessibility and targeting
  const modalId = useId();
  const titleId = `${modalId}-title`;

  // Effect to initialize and manage the Bootstrap Modal instance and events
  useEffect(() => {
    if (modalRef.current && (window as any).bootstrap?.Modal) {
      // Initialize Bootstrap Modal instance if it doesn't exist
      if (!modalInstanceRef.current) {
        modalInstanceRef.current = new (window as any).bootstrap.Modal(
          modalRef.current,
          {
            // Pass options like keyboard, backdrop based on state/props
            keyboard: !staticBackdrop, // Allow closing with Esc unless static
            // backdrop: staticBackdrop ? 'static' : true // Handled by data-bs-backdrop
          },
        );
      }

      // --- Event Listeners for Synchronization ---
      const handleShown = () => {
        setIsVisible(true);
        onShowRef.current?.();
      };
      const handleHidden = () => {
        setIsVisible(false);
        onHideRef.current?.();
        // Optional: Clean up content/title/footer after hide if desired
        // setTitle(initialOptions?.title ?? "");
        // setContent(initialOptions?.content ?? null);
        // setFooter(initialOptions?.footer ?? null);
      };

      const modalElement = modalRef.current;
      modalElement.addEventListener("shown.bs.modal", handleShown);
      modalElement.addEventListener("hidden.bs.modal", handleHidden);

      // Cleanup function
      return () => {
        modalElement.removeEventListener("shown.bs.modal", handleShown);
        modalElement.removeEventListener("hidden.bs.modal", handleHidden);

        // Dispose of the Bootstrap instance when the hook unmounts
        // Check if dispose exists and is a function before calling
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
    // Intentionally empty dependency array to run only once for setup/cleanup
    // We manage show/hide imperatively via the instance ref
  }, [staticBackdrop]); // Re-run if staticBackdrop changes to update instance options (though BS might not support dynamic option changes well)

  const show = useCallback(
    (options?: ModalOptions) => {
      // Update state from options before showing
      if (options?.title !== undefined) setTitle(options.title);
      if (options?.content !== undefined) setContent(options.content);
      if (options?.footer !== undefined) setFooter(options.footer);
      if (options?.size !== undefined) setSize(`modal-${options.size}`);
      else setSize("");
      if (options?.staticBackdrop !== undefined)
        setStaticBackdrop(options.staticBackdrop);
      if (options?.onShow) onShowRef.current = options.onShow;
      if (options?.onHide) onHideRef.current = options.onHide;

      // Ensure instance exists (might be needed if effect hasn't run yet)
      if (
        modalRef.current &&
        !modalInstanceRef.current &&
        (window as any).bootstrap?.Modal
      ) {
        modalInstanceRef.current = new (window as any).bootstrap.Modal(
          modalRef.current,
          {
            keyboard: !(options?.staticBackdrop ?? staticBackdrop),
            // backdrop: (options?.staticBackdrop ?? staticBackdrop) ? 'static' : true
          },
        );
      }

      // Use Bootstrap API to show
      if (
        modalInstanceRef.current &&
        typeof modalInstanceRef.current.show === "function"
      ) {
        modalInstanceRef.current.show();
      } else {
        console.warn("Bootstrap Modal instance not available to show.");
        // Fallback or alternative logic if needed
        // setIsVisible(true); // Less ideal, doesn't use BS animation/features
      }
    },
    [staticBackdrop],
  ); // Include staticBackdrop if it affects instance creation options

  const hide = useCallback(() => {
    // Use Bootstrap API to hide
    if (
      modalInstanceRef.current &&
      typeof modalInstanceRef.current.hide === "function"
    ) {
      modalInstanceRef.current.hide();
    } else {
      console.warn("Bootstrap Modal instance not available to hide.");
      // Fallback or alternative logic if needed
      // setIsVisible(false); // Less ideal
    }
  }, []);

  // The Modal component now renders the Bootstrap structure
  const Modal: React.FC = useCallback(() => {
    // Render the modal structure always, Bootstrap controls visibility via JS/CSS
    return (
      <div
        className="modal fade" // Bootstrap classes
        ref={modalRef}
        id={modalId}
        tabIndex={-1}
        aria-labelledby={titleId}
        aria-hidden={!isVisible} // Reflect state for accessibility
        data-bs-backdrop={staticBackdrop ? "static" : undefined} // Control backdrop behavior
        data-bs-keyboard={staticBackdrop ? "false" : undefined} // Control keyboard behavior
      >
        <div className={`modal-dialog ${size}`}>
          {" "}
          {/* Apply size class */}
          <div className="modal-content">
            {" "}
            {/* Standard BS structure */}
            <div className="modal-header">
              <h5 className="modal-title" id={titleId}>
                {title}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal" // Standard BS dismiss attribute
                aria-label="Close"
                onClick={hide} // Also allow React state to trigger hide if needed
              ></button>
            </div>
            <div className="modal-body">{content}</div>
            {footer && <div className="modal-footer">{footer}</div>}{" "}
            {/* Conditionally render footer */}
          </div>
        </div>
        {/* Remove the <style jsx> block, rely on Bootstrap CSS */}
      </div>
    );
    // Dependencies for useCallback
  }, [
    title,
    content,
    footer,
    size,
    isVisible,
    hide,
    modalId,
    titleId,
    staticBackdrop,
  ]);

  return {
    isVisible,
    title,
    content,
    footer, // Expose footer state
    show,
    hide,
    setTitle,
    setContent,
    setFooter, // Expose setFooter
    Modal,
  };
}
