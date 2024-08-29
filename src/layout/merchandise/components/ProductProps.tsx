import React, { useState, useEffect } from "react";
import ProductModel from "../../../model/productModel";
import Picture from "../../../model/pictureModel";
import { getAllPicture } from "../../../API/pictureAPI";
import { error } from "console";
import { Link } from "react-router-dom";
import { text } from "stream/consumers";
import renderRating from "../../utils/star";
import dinhdangso from "../../utils/dinhdangso";
import useLocalStorageState from "use-local-storage-state"

interface ProductPropsInterface {
    product: ProductModel;
}
export interface CartProps {
    [productId: number]: ProductModel
  }
  
const ProductProps: React.FC<ProductPropsInterface> = (props) => {

    const idProduct: number = props.product.idProduct;
    const [cart, setCart] = useLocalStorageState<CartProps>('cart', {})
    const [listPicture, setListPicture] = useState<Picture[]>([]);
    const [loadingData, setLoadingData] = useState(true);
    const [bugs, setBugs] = useState(null);

    useEffect(() => {
        getAllPicture(idProduct).then(
            pictureData => {
                setListPicture(pictureData);
                setLoadingData(false);
            }
        ).catch(
            error => {
                setLoadingData(false);
                setBugs(error.message);
            }
        )
    }, []
    )
    //Thêm sản phẩm vào giỏ hàng
    const addToCart = (product: ProductModel): void =>{
        product.quantity = 1
        setCart((prevCart) => ({
                ...prevCart,
                [product.idProduct]: product,
        }))
    }
    //Kiểm tra sản phẩm có trong giỏ hàng chưa
    const isInCart =(productId: number):boolean => Object.keys(cart || {}).includes(productId.toString());

    if (loadingData) {
        return (
            <div>
                <h1>Loading Data....</h1>
            </div>
        );
    }
    if (bugs) {
        return (
            <div>
                <h1>Error: {bugs}</h1>
            </div>
        );
    }
    let pictureData: string = "";
    if (listPicture[0] && listPicture[0].dataPicture) {
        pictureData = listPicture[0].dataPicture;
    }


    return (
        <div className="col-md-3 mt-2">
            <div className="card">
                <Link to={`/product/${props.product.idProduct}`}>
                    <img
                        src={pictureData}
                        className="card-img-top"
                        alt={props.product.nameProduct}
                        style={{ height: '350px' }}
                    />
                </Link>

                <div className="card-body">
                    <Link to={`/product/${props.product.idProduct}`} style={{ textDecoration: `none` }}>

                        <h5 className="card-title">{props.product.nameProduct}</h5>
                        <p className="card-text">{props.product.description}</p>
                    </Link>
                    <div className="price ml-2">
                        Giá:
                        {/* <span className="original-price">
                            <del> {props.product.price} </del>
                        </span> */}

                        <span className="discounted-price col-6 text-end">
                            <strong>{dinhdangso(props.product.price)}đ</strong>
                        </span>
                    </div>
                    <div className="row mt-2" role="group">
                        <div className="col-6">
                        {renderRating(props.product.rank?props.product.rank:0)}
                        </div>
                        <div className="col-6">
                            <a href="#" className="btn btn-secondary btn-block me-2">
                                <i className="fas fa-heart"></i>
                            </a>
                            <button className="btn btn-danger btn-block" disabled={isInCart(props.product.idProduct)} onClick={()=>addToCart(props.product)}>
                                <i className="fas fa-shopping-cart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductProps;