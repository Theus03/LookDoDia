import type { Look } from "../types/Look";
import type { Folder } from "../types/Folder";

export function saveLook(base64Image: string): Promise<Look> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open("LookDB", 1);

    req.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains("looks")) {
        db.createObjectStore("looks", { keyPath: "id", autoIncrement: true });
      }
    };

    req.onsuccess = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      const tx = db.transaction("looks", "readwrite");
      const store = tx.objectStore("looks");

      const lookData: Omit<Look, "id"> = {
        name: "Image.jpg",
        imagem: base64Image,
        data: new Date().toISOString(),
        folder: "",
      };

      const addRequest = store.add(lookData) as IDBRequest<number>;

      addRequest.onsuccess = (ev) => {
        const generatedId = (ev.target as IDBRequest<number>).result;
        const lookWithId: Look = { id: generatedId, ...lookData };
        resolve(lookWithId);
      };

      addRequest.onerror = (ev) => reject((ev.target as IDBRequest).error);
    };

    req.onerror = (e) => reject((e.target as IDBOpenDBRequest).error);
  });
}

export function newFolder(): Promise<Folder & { id: number }> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open("FolderDB", 1);

    req.onupgradeneeded = (e: IDBVersionChangeEvent) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains("folders")) {
        db.createObjectStore("folders", { keyPath: "id", autoIncrement: true });
      }
    };

    req.onsuccess = (e: Event) => {
      const db = (e.target as IDBOpenDBRequest).result;
      const tx = db.transaction("folders", "readwrite");
      const store = tx.objectStore("folders");

      const folderData: Omit<Folder, "id"> = {
        name: "Nova Pasta",
      };

      const addRequest = store.add(folderData) as IDBRequest<number>;

      addRequest.onsuccess = (ev) => {
        const generatedId = (ev.target as IDBRequest<number>).result;
        resolve({ id: generatedId, ...folderData });
      };

      addRequest.onerror = (ev) => reject((ev.target as IDBRequest).error);
    };

    req.onerror = (e) => reject((e.target as IDBOpenDBRequest).error);
  });
}
