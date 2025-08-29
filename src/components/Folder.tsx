import { useRecoilState } from "recoil";
import { folderListState } from "../atoms/folderListState";
import { modalState } from "../atoms/modalState";

export default function Folder() {
  const [folders, _] = useRecoilState(folderListState);
  const [modal, setModal] = useRecoilState(modalState);

  const handleSelectFolder = (folderName: string) => {
    setModal({ ...modal, placeholder: folderName });
  };

  return (
    <>
      {folders.map((folder) => (
        <div key={folder.id} className="folder flex items-center">
          <input
            type="radio"
            name="radio-8"
            className="radio radio-warning"
            checked={modal?.placeholder?.trim().toLowerCase() === folder.name.trim().toLowerCase()}
            onChange={() => handleSelectFolder(folder.name)}
          />
          <span className="nameFolder ml-2">{folder.name}</span>
        </div>
      ))}
    </>
  );
}
