import { Link, useLoaderData, useLocation, useNavigate } from "react-router-dom";

const ChinhTriPage = () => {
    const id = useLoaderData() as string;
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location);
    
const handleOnClick = () => {
    navigate("/chinh-tri/123");
}

    return ( 
        <div>
            <h2>{id.toString()}</h2>
            <button onClick={handleOnClick}>click me</button>
            <span className={`${location.pathname.includes("123") && "text-red-500"}`} >Chinh Tri Page</span>
        </div>
     );
}
 
export default ChinhTriPage;