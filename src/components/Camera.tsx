import { useState, useEffect } from "react";
import { useCamera } from "../hooks/useCamera";
import { capturePhoto } from "../utils/cameraUtils";
import { saveLook } from "../utils/indexedDBUtils";
import { useSetRecoilState } from "recoil";
import photoState from "../atoms/photoAtom";
import toast from "react-hot-toast";

export default function Camera() {
  const [switchCamera, setSwitchCamera] = useState(false);
  const setPhoto = useSetRecoilState(photoState);

  useEffect(() => {
    useCamera(switchCamera);
  }, [switchCamera]);

  const handleCapture = async () => {
    const photo = capturePhoto("video");
    if (photo) {
      await saveLook(photo);
      setPhoto(photo);
      toast.success("Captura realizada com sucesso.", { icon: '✅' })
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      })
    }
  };

  return (
    <div className="card lg:card-side bg-base-100 shadow-sm flex flex-col items-center justify-center">
      <figure>
        <video id="video" autoPlay playsInline></video>
      </figure>
      <div className="card-body">
        <h2 className="card-title">Tire uma foto</h2>
        <p className="text-start">
          Clique no botão "Tirar Foto" abaixo para tirar a foto do seu look. Se preferir pode
          trocar a câmera também.
        </p>
        <div className="card-actions justify-between pt-2">
          <button onClick={() => setSwitchCamera(!switchCamera)} className="btn w-50">
            Trocar Câmera
          </button>
          <button onClick={handleCapture} className="btn btn-primary w-50">
            Tirar Foto
          </button>
        </div>
      </div>
    </div>
  );
}
