export type BootstrapModalInstance = {
  show: () => void;
  hide: () => void;
  dispose?: () => void;
};

export type BootstrapModalConstructor = {
  new (
    element: HTMLElement,
    options?: { keyboard?: boolean; backdrop?: boolean | "static" },
  ): BootstrapModalInstance;
  getInstance: (element: HTMLElement) => BootstrapModalInstance | null;
};

export type BootstrapWindow = Window & {
  bootstrap?: {
    Modal: BootstrapModalConstructor;
  };
};
