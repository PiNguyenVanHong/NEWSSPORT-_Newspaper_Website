import { useLocation } from "react-router-dom";
import { ApiAlert } from "@/components/api-alert";

interface ApiListProps {
    entityName: string;
    entityIdName: string;
}

export const ApiList: React.FC<ApiListProps> = ({
    entityName,
    entityIdName
}) => {
    const location = useLocation();

    const baseUrl = `${window.location.protocol}//${window.location.hostname}/api${location.pathname}`;

    return  (
        <>
            <ApiAlert 
                title="GET"
                variant="public"
                description={`${baseUrl}/${entityName}`}
            />
            <ApiAlert 
                title="GET"
                variant="public"
                description={`${baseUrl}/${entityName}/${entityIdName}`}
            />
            <ApiAlert 
                title="POST"
                variant="admin"
                description={`${baseUrl}/${entityName}`}
            />
        </>
    )
}