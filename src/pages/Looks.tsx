import { useEffect } from "react";
import Breadcrumb from "../components/Breadcrumb";
import Card from "../components/Card";
import Menu from "../components/Menu";
import Navbar from "../components/Navbar";
import { useLookActions } from "../hooks/useLooksActions";
import { useRecoilValue } from "recoil";
import { lookListState } from "../atoms/lookListState";

export default function Looks() {
    const looks = useRecoilValue(lookListState);

    const { loadLooks } = useLookActions();

    useEffect(() => {
        loadLooks();
    }, []);


    return (
        <div>
            <Navbar />
            <Breadcrumb />
                <div id="galeria" className="galeria-container grid grid-cols-2 gap-2 p-4 mb-6">
                    {looks.map(look => <Card key={look.id} look={look} />)}
                </div>
            <Menu />
        </div>
    )
}