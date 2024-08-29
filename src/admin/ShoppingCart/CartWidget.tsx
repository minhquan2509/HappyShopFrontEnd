import { FunctionComponent } from "react"
import { useNavigate } from "react-router-dom"

interface Props{
    productCounts: number
}


export const CartWidget: FunctionComponent<Props> = ({productCounts}) =>{
    const navigate = useNavigate();
    const navigateToCart = () =>{
        navigate('/cart')
    }
    return(
        <div>
            <button className= "containercart" onClick={navigateToCart}>
                <span className="productsCount">{productCounts}</span>
                <i className="fas fa-shopping-cart"></i>
            </button>
        </div>
    )
}