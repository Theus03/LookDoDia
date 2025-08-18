import { useEffect } from "react";
import Breadcrumb from "../components/Breadcrumb";
import Card from "../components/Card";
import Menu from "../components/Menu";
import Navbar from "../components/Navbar";
import ModalComponent from "../components/Modal";
import { useLookActions } from "../hooks/useLooksActions";
import { useRecoilValue } from "recoil";
import { lookListState } from "../atoms/lookListState";
import { modalState } from "../atoms/modalState";

export default function Looks() {
    const looks = useRecoilValue(lookListState);
    const modalProps = useRecoilValue(modalState);

    const { loadLooks } = useLookActions();

    useEffect(() => {
        loadLooks();
    }, []);


    return (
        <div>
            <Navbar />
            <ModalComponent modal={modalProps} />
            <Breadcrumb />
                <div id="galeria" className="galeria-container grid grid-cols-2 gap-2 p-4 mb-6">
                    {looks.map(look => <Card key={look.id} look={look} />)}
                </div>
            <Menu />
        </div>
    )
}