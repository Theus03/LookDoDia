import { useRecoilState,  useSetRecoilState } from "recoil"
import { useLookActions } from "../hooks/useLooksActions"
import type { Look } from "../types/Look"
import { modalState } from "../atoms/modalState"
import type { Modal } from "../types/Modal"
import toast from "react-hot-toast"
import { getFolderByName, getFolders, newFolder, updateLook } from "../utils/indexedDBUtils"
import { folderListState } from "../atoms/folderListState"
import type { Folder } from "../types/Folder"

interface CardProps {
    look: Look
}

export default function Card({ look }: CardProps) {
    const { folderLook, removeLook, renameLook, loadLooks } = useLookActions()
    const modalProps = useSetRecoilState(modalState);
    const [folders, setFolders] = useRecoilState(folderListState);

    function handleRename(id: number, name: string) {
      const modal = document.getElementById("modal") as HTMLDialogElement;
      modalProps({
        type: "Rename",
        title: "Renomear Imagem",
        placeholder: name
      } as Modal);

      modal.showModal();

      setTimeout(() => {
        const modalBox = document.querySelector(".modal-box");
        const modalAction = modalBox?.querySelector(".modal-action");
        const btnSaveRenameLook = modalAction?.querySelector("#btnSaveRenameLook") as HTMLButtonElement;
        
        if (btnSaveRenameLook) {
          btnSaveRenameLook.onclick = async () => {
            await saveRenameLook(id);
            modal.close();
          };
        }
      });
    }

    async function saveRenameLook(id: number) {
      console.log(id);
      const txtRenameImage = document.getElementById("txtRenameImage") as HTMLInputElement;
      renameLook(id, txtRenameImage.value);
      const lookUpdater: Look = {
        id: id,
        data: look.data,
        folder: look.folder,
        imagem: look.imagem,
        name: txtRenameImage.value,
        idFolder: look.idFolder
      }
      await updateLook(lookUpdater);
      loadLooks();
    }

    async function handleFolder(id: number, folder: string) {
      const modal = document.getElementById("modal") as HTMLDialogElement;
      
      modalProps({
        type: "Folder",
        title: "Adicionar na Pasta",
        placeholder: folder
      } as Modal)
      modal.showModal();


      const allFolders: Folder[] = await getFolders();;

      if (allFolders.length == 0) {
        const arrFolders = folders
        arrFolders.forEach((f: Folder) => allFolders.push(f));
        setFolders(allFolders);
      }

        setTimeout(() => {
          const modalBox = document.querySelector(".modal-box");
          const modalAction = modalBox?.querySelector(".modal-action");
          const btnAddFolderLook = modalAction?.querySelector("#btnAddFolderLook") as HTMLButtonElement;
          if (btnAddFolderLook) {
            btnAddFolderLook.onclick = async () => {
              await handleAddFolder(folder);
            }
          }
          const btnSaveFolderLook = modalAction?.querySelector("#btnSaveFolderLook") as HTMLButtonElement;
          if (btnSaveFolderLook) {
              btnSaveFolderLook.onclick = async () => {
                await saveLookInFolder(id);
                modal.close();
              };
          }
        })        
    }

    async function handleAddFolder(folderName: string) {
      const containerFolder = document.getElementById("containerFolder") as HTMLDivElement;
      let folder: string = ``;
      folder = `<div class="folder flex items-center">
                <input type="radio" name="radio-8" class="radio radio-warning" checked="${folderName == "" ? `false` : `true`}" />
                <span class="nameFolder ml-2" contenteditable="true">${folderName == "" ? `` : folderName}</span>
            </div>`    
        containerFolder.innerHTML += folder;
      
      let els = document.querySelectorAll(".nameFolder");
      const el = els[els.length - 1] as HTMLSpanElement;
      el.focus();
    }

    async function saveLookInFolder(id: number) {
        const selectedRadio = document.querySelector(".folder input[type='radio']:checked") as HTMLInputElement;
        if (selectedRadio) {
        const folderDiv = selectedRadio.closest('.folder');
          const folderName: string = folderDiv?.querySelector('.nameFolder')?.textContent?.trim() || "";
          folderLook(id, folderName);
          await newFolder(folderName)

          const lookUpdater: Look = {
            id: id,
            data: look.data,
            folder: folderName,
            imagem: look.imagem,
            name: look.name,
            idFolder: (await getFolderByName(folderName)).id ?? 0
          }
            
            await updateLook(lookUpdater);
            loadLooks();
          }
    }

    function handleRemove(id: number) {
      removeLook(id);
      toast.success("Look excluído com sucesso!", { "icon": "✅" })
    }


    return (
        <div className="card bg-base-100 shadow-sm look-card overflow-auto">
            <figure className="max-[580px]:w-50 max-[450px]:w-75">
              <img  src={look.imagem} alt="Look Image" />
            </figure>
            <span className="card-title p-2 max-[400px]:text-base">{look.name}</span>
            {
              (look.folder != "" && look.folder != undefined) ? <div className='badge badge-soft badge-warning m-2'>{look.folder}</div> : ``
            }
            <div className="p-2 pb-6 flex flex-wrap gap-1 max-[580px]:w-30 max-[580px]:gap-4 max-[400px]:p-0">
              <button className="btn btn-xs btn-soft btn-info p-4 w-30 max-[580px]:w-full max-[450px]:w-70 max-[400px]:w-18" title="Editar" onClick={() => handleRename(look.id, look.name)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#3b85fc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
              </button>
              <button className="btn btn-xs btn-soft btn-warning p-4 w-30 max-[580px]:w-full max-[450px]:w-70 max-[400px]:w-18" title="Adicionar" onClick={() => handleFolder(look.id, look.folder)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#fec158" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 10v6"/><path d="M9 13h6"/><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
              </button>
              <button className="btn btn-xs btn-soft btn-error p-4 w-30 max-[580px]:w-full max-[450px]:w-70 max-[400px]:w-18" title="Remover" onClick={() => handleRemove(look.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#fc3b3b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </button>
            </div>
          </div>
    )
}