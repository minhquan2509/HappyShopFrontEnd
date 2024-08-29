import React, { useState, useEffect } from "react";
import Picture from "../../../model/pictureModel";
import { getAllPicture } from "../../../API/pictureAPI";
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
interface ProductPicture {
    idProduct: number;
}
const ProductPicture: React.FC<ProductPicture> = (props) => {

    const idProduct: number = props.idProduct;

   
    const [listPicture, setListPicture] = useState<Picture[]>([]);
    const [loadingData, setLoadingData] = useState(true);
    const [bugs, setBugs] = useState(null);
    

    

    useEffect(() => {
        getAllPicture(idProduct).then(
            list => {
                setListPicture(list);
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
    return (
        <div className="row">
           
            <div className="col-12">
                <Carousel showArrows={true} showThumbs={false} showIndicators={true}>
                    {
                        listPicture.map((picture , index) =>(
                            <div key={index}>
                                <img src={picture.dataPicture} style={{maxWidth:"150pxpx"}}/>
                            </div>
                        ))
                        
                    }
                </Carousel>
                
            </div>
        </div>
    );
}

export default ProductPicture;