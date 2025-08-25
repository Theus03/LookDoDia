import type { Modal } from "../types/Modal"
import Folder from "./Folder";

interface ModalProps {
    modal: Modal
}

export default function Modal({ modal }: ModalProps) {    
    return (
            <dialog id="modal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="text-lg font-bold">{modal.title}</h3>
                    {
                        modal.type == "Folder" && (
                            <>
                                <div className="py-4 flex gap-2 flex-col" id={`container${modal.type}`}>
                                    {<Folder />}
                                </div>
                                <div className="modal-action">
                                    <span className={`btn btn-soft btn-warning`} id="btnAddFolderLook">Nova Pasta</span>
                                    <form method="dialog">
                                        <button className={`btn btn-soft btn-success`} id="btnSaveFolderLook">Salvar</button>
                                    </form>
                                </div>
                            </>
                        )
                    }
                    {
                        modal.type == "Rename" && (
                            <>
                                <div className="py-4">
                                    <input type="text" id="txtRenameImage" placeholder={modal.placeholder} contentEditable="true" className="input input-info" />
                                </div>
                                  <div className="modal-action">
                                    <form method="dialog">
                                        <button className={`btn btn-soft btn-success`} id="btnSaveRenameLook" >Salvar</button>
                                    </form>
                                </div>
                            </>
                        )
                    }
                </div>
            </dialog>
    )
}