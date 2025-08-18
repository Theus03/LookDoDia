import toast from "react-hot-toast"

type PropsCamera = {
    useFront: boolean
    currentStream?: object
}

type PropsMedia = {
    video: object
    audio: boolean
}

export function useCamera(switchCamera: boolean) {
    const videoElement = document.getElementById("video") as HTMLVideoElement;

    if (videoElement.srcObject) {
        const oldStream = videoElement.srcObject as MediaStream;
        oldStream.getTracks().forEach(track => track.stop());
    }

    const propsCamera: PropsCamera = {
        useFront: switchCamera
    }

    
    const propsMedia: PropsMedia = {
        video: {
            facingMode: propsCamera.useFront ? "user" :  "environment"
        },
        audio: false
    }
    console.log(propsCamera);
    console.log(propsMedia);

    navigator.mediaDevices.getUserMedia(propsMedia)
        .then(stream => {
            propsCamera.currentStream = stream;
            videoElement.srcObject = stream;
        })
        .catch(err => {
            console.error("Erro ao acessar a câmera: ", err);
            toast.error("Permita o uso da câmera para continuar.", { icon: '⚠️' })
        })

}