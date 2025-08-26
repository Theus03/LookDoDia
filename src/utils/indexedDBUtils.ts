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
        idFolder: 0
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

export function updateLook(look: Look): Promise<Look> {

  return new Promise((resolve, reject) => {
    const req = indexedDB.open("LookDB", 1);

    req.onerror = (e) => console.error("Erro ao abrir o IndexedDB para atualizar dados do look: ", e);

    req.onsuccess = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      const tx = db.transaction("looks", "readwrite");
      const store = tx.objectStore("looks");

      const getRequest = store.get(look.id) as IDBRequest;

      getRequest.onsuccess = () => {
        const data = getRequest.result as Look;

        if (!data) {
          console.warn(`Look com ${look.id} não foi encontrado.`);
          return;
        }


        data.name = look.name;
        data.folder = look.folder;

        const updateRequest = store.put(data);

        updateRequest.onerror = (e) => console.error(`Problemas ao tentar atualizar o look. ${e}`);

        resolve(data);
      }

      getRequest.onerror = (e) => {
        console.error(`Problemas ao tentar fazer requisição de buscar o look. ${e}`);
        reject((e.target as IDBOpenDBRequest).error);
      } 

    }

  })
}

export function newFolder(nameFolder: string): Promise<Folder & { id: number }> {
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
        name: nameFolder,
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

export function getFolders(): Promise<Folder[]> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open("FolderDB", 1);
    req.onerror = (e) => console.error("Erro ao abrir o IndexedDB para listar as pastas: ", e);

    req.onsuccess = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      const tx = db.transaction("folders", "readwrite");
      const store = tx.objectStore("folders");

      const getRequest = store.getAll();

      getRequest.onsuccess = () => {
        const data = getRequest.result;

        if (!data) {
          console.warn(`Você não criou nenhuma pasta ainda...`);
          return;
        }
        
        resolve(data);
      }

      getRequest.onerror = (e) => {
        console.error(`Problemas ao tentar listar as pastas disponíveis.`);
        reject((e.target as IDBOpenDBRequest).error);
      } 

    }
  })
}

export function getFolderByName(folderName: string): Promise<Folder> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open("FolderDB", 1);
    req.onerror = (e) => console.error("Erro ao abrir o IndexedDB para conseguir obter a pasta: ", e);

    req.onsuccess = (e) => {
        const db = (e.target as IDBOpenDBRequest).result;
      const tx = db.transaction("folders", "readwrite");
      const store = tx.objectStore("folders");

      const getRequest = store.getAll();

      getRequest.onsuccess = () => {
        const data = getRequest.result.filter((d: Folder) => d.name.toLowerCase().trim() == folderName.toLowerCase().trim())[0];

        if (!data) {
          console.warn(`Você não criou nenhuma pasta ainda...`);
          return;
        }
        
        resolve(data);
      }

      getRequest.onerror = (e) => {
        console.error(`Problemas ao tentar listar as pastas disponíveis.`);
        reject((e.target as IDBOpenDBRequest).error);
      }  
    }
  })
}
