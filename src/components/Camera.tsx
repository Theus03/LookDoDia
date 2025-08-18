import { useEffect, useState } from "react";
import { useCamera } from "../hooks/useCamera";

export default function Camera() {    

    const [switchCamera, setSwitchCamera] = useState<boolean>(false);

    useEffect(() => {
        useCamera(switchCamera);
    }, [switchCamera])

    return(
        <div className="card lg:card-side bg-base-100 shadow-sm flex flex-col items-center justify-center">
        <figure>
          <video id="video" autoPlay playsInline></video>
        </figure>
        <div className="card-body">
          <h2 className="card-title">Tire uma foto</h2>
          <p>Clique no botão "Tirar Foto" abaixo para tirar a foto do seu look. Se preferir pode trocar a câmera também, alternando entre frontal e traseira.</p>
          <div className="card-actions justify-between pt-2">
            <button onClick={() => setSwitchCamera(!switchCamera)} className="btn" id="trocarCamera">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-rotate-ccw-icon lucide-rotate-ccw"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              Trocar Câmera
            </button>
            <button className="btn btn-primary" id="btnCapturar">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-camera-icon lucide-camera"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
              Tirar Foto
            </button>
          </div>
        </div>
      </div>
    )
}