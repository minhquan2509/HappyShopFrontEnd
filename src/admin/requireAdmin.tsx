import { useNavigate } from "react-router-dom";
import React , {useEffect} from "react"
import { jwtDecode } from "jwt-decode";
import ProductForm from "./ProductForm";
export interface JwtPayload{
    id: any;
    role: string;
    avatar: string;
    lastName: string;
    enabled: boolean;
}

const RequireAdmin = <P extends object>(
    WrappedComponent: React.ComponentType<P>
)=>{
    const WithAdminCheck: React.FC<P> = (props) =>{
        const navigate = useNavigate();

        useEffect(()=>{
            const token = localStorage.getItem("token");
//Neu chua dang nhap
            if(!token){
                navigate("/login");
                return;
            }

            //giai ma token
            const decodedToken = jwtDecode(token) as JwtPayload;

            //Lay thong tin tu token
            const role = decodedToken.role;

            //kiem tra quyen
            if(role !== "Admin"){
                navigate("/error-403")
            }
        }, [navigate]);
        return <WrappedComponent {...props} />
    };
    return WithAdminCheck || null;
};
export default RequireAdmin;