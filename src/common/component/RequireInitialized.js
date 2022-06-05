import { Navigate } from "react-router-dom";
import { useGetInitializedQuery } from "../../app/services/server";

export default function RequireInitialized({ children, redirectTo = "/" }) {
 const { data } = useGetInitializedQuery();
 console.log("initialized?", data);
 return data === false ? <Navigate to={redirectTo} replace /> : children;
}
