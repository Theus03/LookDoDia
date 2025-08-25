import { useRecoilValue } from "recoil";
import { folderListState } from "../atoms/folderListState";

export default function Folder() {
    const folders = useRecoilValue(folderListState);
    
    return (
        folders.map(folder => (
            <div key={folder.id} className="folder flex items-center">
                <input type="radio" name="radio-8" className="radio radio-warning" />
                <span className="nameFolder ml-2">{folder.name}</span>
            </div>
        ))
    )
}