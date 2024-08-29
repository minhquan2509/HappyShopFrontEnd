import {  jwtDecode } from "jwt-decode";
import { JwtPayload } from "../../admin/requireAdmin";

export function iSTokenExpired(token : string){
    const decodedToken = jwtDecode(token);

    if(!decodedToken.exp){
        return false;
    }

    const currentTime = Date.now() / 1000;

    return currentTime < decodedToken. exp;
}
export function isToken(){
    const token = localStorage.getItem('token');
    if(token){
        return true;
    }
    return false;
}

export function getIdUserByToken(){
    const token = localStorage.getItem('token');
    if(token){
        const decodeToken = jwtDecode(token) as JwtPayload;
        return decodeToken.id;
        console.log(decodeToken.id);
    }
}
export function logOut(navigate: any){
    navigate("/login");
    localStorage.removeItem('token');
    localStorage.removeItem('cart');

}
