import { ipcRenderer, contextBridge } from 'electron'

declare global {
  interface Window {
    electron: {
      store: {
        get: (key: string) => void;
        set: (key: string, val: string) => void;
        delete: (key: string) => void;
      };
    };
  }
}

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },

  // You can expose other APTs you need here.
  // ...
})

contextBridge.exposeInMainWorld('electron', {
  store: {
    get: (key: string) => ipcRenderer.invoke('electron-store-get', key),
    set: (key: string, value: string) => ipcRenderer.invoke('electron-store-set', key, value),
    delete: (key: string) => ipcRenderer.invoke('electron-store-delete', key)
  },
});
