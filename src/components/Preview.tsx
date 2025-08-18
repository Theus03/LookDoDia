import { useRecoilValue } from "recoil";
import photoState from "../atoms/photoAtom";

export default function Preview() {
    const photo = useRecoilValue(photoState);
    console.log(photo);
  return (
    <div className="mt-8 card lg:card-side bg-base-100 shadow-sm flex flex-col items-center justify-center mb-16">
      <img
        id="preview"
        alt="Prévia do look"
        src={photo || "/file-image-fill.png"}
        className="mt-8 w-100"
      />
      <div className="card-body">
        <h2 className="card-title">Prévia do seu Look</h2>
        <div className="card-actions justify-center pt-2">
          <button className="btn btn-primary">Ir para Galeria</button>
        </div>
      </div>
    </div>
  );
}
