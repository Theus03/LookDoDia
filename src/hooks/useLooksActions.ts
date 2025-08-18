import { useRecoilState } from "recoil";
import { lookListState } from "../atoms/lookListState";
import type { Look } from "../types/Look";

export function useLookActions() {
  const [_, setLooks] = useRecoilState(lookListState)

  const renameLook = (id: number, newName: string) => {
    setLooks(prev => prev.map(l => l.id === id ? { ...l, name: newName } : l))
  }

  const folderLook = (id: number, folder: string) => {
    setLooks(prev => prev.map(l => l.id === id ? { ...l, folder } : l))
  }

  const removeLook = (id: number) => {
    setLooks(prev => prev.filter(l => l.id !== id))
  }

    const loadLooks = (): Promise<void> => {
        return new Promise((resolve, reject) => {
        const req = indexedDB.open("LookDB", 1);

        req.onsuccess = (e) => {
            const db = (e.target as IDBOpenDBRequest).result;
            const tx = db.transaction("looks", "readonly");
            const store = tx.objectStore("looks");
            const getAllRequest = store.getAll() as IDBRequest<Look[]>;

            getAllRequest.onsuccess = () => {
            setLooks(getAllRequest.result);
            resolve();
            };

            getAllRequest.onerror = (ev) => reject((ev.target as IDBRequest).error);
        };

        req.onerror = (e) => reject((e.target as IDBOpenDBRequest).error);
        });
    };


  return { renameLook, folderLook, removeLook, loadLooks }
}
