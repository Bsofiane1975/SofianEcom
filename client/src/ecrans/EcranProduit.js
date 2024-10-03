import { useParams } from "react-router-dom";

function EcranProduit() {
    const params =useParams();
    const {slug} = params;
    return (
        <div>
           <h1>{ slug }</h1> 
        </div>
    );
}

export default EcranProduit;