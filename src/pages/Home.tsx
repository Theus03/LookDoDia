import Breadcrumb from "../components/Breadcrumb";
import Camera from "../components/Camera";
import Menu from "../components/Menu";
import Navbar from "../components/Navbar";
import Preview from "../components/Preview";

export default function Home() {
    return(
        <div>
            <Navbar />
            <Breadcrumb />
            <Camera />
            <Preview />
            <Menu />
        </div>
    )
}