interface ElectronWindow {
  electron: {
    store: {
      get: (key: string) => Promise<any>;
      set: (key: string, value: any) => Promise<void>;
      delete: (key: string) => Promise<void>;
    };
    ipcRenderer: {
      on: (channel: string, func: (...args: any[]) => void) => void;
      once: (channel: string, func: (...args: any[]) => void) => void;
      send: (channel: string, ...args: any[]) => void;
    };
  };
}

declare global {
  interface Window extends ElectronWindow {}
}

export {}; 