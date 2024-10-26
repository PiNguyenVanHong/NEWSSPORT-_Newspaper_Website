import { Link } from "react-router-dom";

const HomepageTemplate = () => {
    return ( 
        <div>
            <Link to={"/chinh-tri"}>click me</Link>
            Homepage
        </div>
     );
}
 
export default HomepageTemplate;