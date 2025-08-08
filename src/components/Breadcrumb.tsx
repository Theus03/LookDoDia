export default function Breadcrumb() {

    function textPage() {

        if (window.location.pathname == "/"){
            return { 'prev': 'Home' , 'curr': 'Novo Look' }
        } else if (window.location.pathname == "/looks") {
            return { 'prev': 'Home' , 'curr': 'Galeria' }
        } else {
            return { 'prev': 'Home' , 'curr': 'Configuração' }
        }
    }

    return (
        <div className="breadcrumbs text-sm">
            <ul>
            {textPage().prev}
            <li><a></a></li>
            <li className="font-medium">{textPage().curr}</li>
            </ul>
        </div>
    )
}