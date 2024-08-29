import { isUndefined } from "util";

function dinhdangso(x: number|undefined){
    if(x===undefined){
        return 0;
    }
    if(isNaN(x)){
        return 0;
    }
    //ssu dung tolocalstring de dinh dang so
    return x.toLocaleString("vi-VN");
}
export default dinhdangso;