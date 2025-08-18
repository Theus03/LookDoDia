import { useLookActions } from "../hooks/useLooksActions"
import type { Look } from "../types/Look"

interface CardProps {
    look: Look
}

export default function Card({ look }: CardProps) {
    const {  folderLook, removeLook } = useLookActions()

    function handleRename(id: number, name: string) {
        console.log(id, name);
        const modal = document.getElementById("modal") as HTMLDialogElement;
        modal.showModal();
    }


    return (
        <div className="card bg-base-100 shadow-sm look-card">
            <figure>
              <img src={look.imagem} alt="Look Image" />
            </figure>
            <span className="card-title p-2">${look.name}</span>
            {
              (look.folder != "" && look.folder != undefined) ? `<div className='badge badge-soft badge-warning m-2'>${look.folder}</div>` : ``
            }
            <div className="p-2 pb-6 flex gap-1 w-48">
              <button className="btn btn-xs btn-soft btn-info p-2 w-12" title="Editar" onClick={() => handleRename(look.id, look.name)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#3b85fc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
              </button>
              <button className="btn btn-xs btn-soft btn-warning p-2 w-12" title="Adicionar" onClick={() => folderLook(look.id, look.folder)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#fec158" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 10v6"/><path d="M9 13h6"/><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
              </button>
              <button className="btn btn-xs btn-soft btn-error p-2 w-12" title="Remover" onClick={() => removeLook(look.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#fc3b3b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </button>
            </div>
          </div>
    )
}