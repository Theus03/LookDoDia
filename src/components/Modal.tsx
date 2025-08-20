import type { Modal } from "../types/Modal"

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
                                    <div className="folder">
                                        <input type="radio" name="radio-8" className="radio radio-warning" />
                                        <span className="nameFolder" contentEditable="true">Pasta Teste</span>
                                    </div>
                                </div>
                                <div className="modal-action">
                                    <span className={`btn btn-soft btn-warning`} id="btnAddFolderLook">Nova Pasta</span>
                                    <form method="dialog">
                                        <button className={`btn btn-soft btn-warning`} id="btnSalvarFolderLook">Salvar</button>
                                    </form>
                                </div>
                            </>
                        )
                    }
                    {
                        modal.type == "Rename" && (
                            <>
                                <div className="py-4">
                                    <input type="text" id="txtRenameImage" value={modal.value} contentEditable="true" className="input input-info" />
                                </div>
                                  <div className="modal-action">
                                    <form method="dialog">
                                        <button className={`btn btn-soft btn-success`} >Salvar</button>
                                    </form>
                                </div>
                            </>
                        )
                    }
                </div>
            </dialog>
    )
}