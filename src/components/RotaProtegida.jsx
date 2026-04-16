import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export function RotaProtegida({ children }) {
    const { logado } = useContext(AuthContext);

    if (!logado) {
        return <Navigate to="/" replace/>;
    }

    return children;
}