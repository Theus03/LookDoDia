import toast from "react-hot-toast"

type PropsCamera = {
    useFront: boolean
    currentStream?: object
}

type PropsMedia = {
    video: object
    audio: boolean
}

export function useCamera() {
    const videoElement = document.getElementById("video") as HTMLVideoElement;

    const propsCamera: PropsCamera = {
        useFront: true
    }

    const propsMedia: PropsMedia = {
        video: {
            facingMode: propsCamera.useFront ? "user" : { exact: "environment" }
        },
        audio: false
    }

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