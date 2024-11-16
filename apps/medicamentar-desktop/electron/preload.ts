import { contextBridge, ipcRenderer } from 'electron'

interface CustomIpcRenderer {
  on: (channel: string, func: (...args: any[]) => void) => void;
  once: (channel: string, func: (...args: any[]) => void) => void;
  send: (channel: string, ...args: any[]) => void;
  showNotification: (title: string, body: string) => void;
}

contextBridge.exposeInMainWorld('electron', {
  store: {
    get: (key: string) => ipcRenderer.invoke('electron-store-get', key),
    set: (key: string, value: string) => ipcRenderer.invoke('electron-store-set', key, value),
    delete: (key: string) => ipcRenderer.invoke('electron-store-delete', key)
  },
  ipcRenderer: {
    on: (channel, func) => ipcRenderer.on(channel, (_event, ...args) => func(...args)),
    once: (channel, func) => ipcRenderer.once(channel, (_event, ...args) => func(...args)),
    send: (channel, ...args) => ipcRenderer.send(channel, ...args),
    showNotification: (title, body) => ipcRenderer.send('show-notification', { title, body }),
  } as CustomIpcRenderer,
});
