import React, { useState, useEffect } from "react";
import ProductModel from "../../../model/productModel";
import Picture from "../../../model/pictureModel";
import { get1PictureOf1Product, getAllPicture } from "../../../API/pictureAPI";
import { error } from "console";
interface CarouselItemInterface {
    product: ProductModel;
}
const CarouselItem: React.FC<CarouselItemInterface> = (props) => {

    const idProduct: number = props.product.idProduct;

    const [listPicture, setListPicture] = useState<Picture[]>([]);
    const [loadingData, setLoadingData] = useState(true);
    const [bugs, setBugs] = useState(null);

    useEffect(() => {
        get1PictureOf1Product(idProduct).then(
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
    },[]
    )


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
    let pictureData: string ="";
    if(listPicture[0] && listPicture[0].dataPicture){
        pictureData = listPicture[0].dataPicture;
    }

    return (
        <div className="row align-items-center">
                            <div className="col-5 text-center">
                                <img src={pictureData} className="float-end" style={{width:'300px'}} />
                            </div>
                            <div className="col-7">
                                <h5>Sản Phẩm: {props.product.nameProduct}</h5>
                                <p>{props.product.description}</p>
                            </div>
                        </div>
    );
}

export default CarouselItem;