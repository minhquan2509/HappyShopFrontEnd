import { my_request } from "./Request";
import CartItemModel from "../model/cartitemModel";
import { getIdUserByToken } from "../layout/utils/JwtService";
import { getProductByIdCartItem } from "./productAPI";

export async function getCartAllByIdUser(): Promise<CartItemModel[]> {
    const idUser = getIdUserByToken();
    const endpoint: string = `http://localhost:8080/user/${idUser}/listCartItem`;
    try {
        const cartResponse = await my_request(endpoint);
        if(cartResponse){
            const cartResponseList: CartItemModel[] = await Promise.all(cartResponse._embedded.cartItems.map(async (item:any)=>{
                const productResponse = await getProductByIdCartItem(item.idCart);
                return{...item, product: productResponse};
            }));
            return cartResponseList;
        }
    } catch (error) {
        console.error('Error' , error)
    }
   return []; 
}
