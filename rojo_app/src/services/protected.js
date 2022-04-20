import { UsuarioAutenticado } from "./auth";
import { Navigate, Outlet} from "react-router-dom";

function PrivateRoute (){
        return UsuarioAutenticado ? < Navigate to ="/"/> : <Navigate to="/"/>;
}

export default PrivateRoute;