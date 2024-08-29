import React, { useEffect, useState } from "react";
import ProductModel from "../../../model/productModel";
import { get3Productlatest } from "../../../API/productAPI";
import CarouselItem from "./carouselItem";
import { start } from "repl";

const Carousel: React.FC = () => {
    const [listProduct, setListProduct] = useState<ProductModel[]>([]);
    const [loadingData, setLoadingData] = useState(true);
    const [bug, setBug] = useState(null);

    useEffect(() => {
        get3Productlatest().then(
            rs => {
                setListProduct(rs.result);
                setLoadingData(false);
            }
        ).catch(
            bugs => {
                setLoadingData(false);
                setBug(bugs.message);
            }
        );
    }, [] // chi goi 1 lan
    )

    if (loadingData) {
        return (
            <div>
                <h1>Loading Data....</h1>
            </div>
        );
    }
    if (bug) {
        return (
            <div>
                <h1>Error: {bug}</h1>
            </div>
        );
    }
    return (
        // <div>
        //     <div id="carouselExampleDark" classNameName="carousel carousel-light slide">
        //         <div classNameName="carousel-inner">
        //             <div classNameName="carousel-item active" data-bs-interval="10000">
        //                 <CarouselItem key={0} product={listProduct[0]} />
        //             </div>
        //             <div classNameName="carousel-item" data-bs-interval="10000">
        //                 <CarouselItem key={1} product={listProduct[1]} />
        //             </div>
        //             <div classNameName="carousel-item" data-bs-interval="10000">
        //                 <CarouselItem key={2} product={listProduct[2]} />
        //             </div>
        //         </div>
        //         <button classNameName="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
        //             <span classNameName="carousel-control-prev-icon"></span>
        //             <span classNameName="visually-hidden">Previous</span>
        //         </button>
        //         <button classNameName="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
        //             <span classNameName="carousel-control-next-icon"></span>
        //             <span classNameName="visually-hidden">Next</span>
        //         </button>
        //     </div>
        // </div>
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <CarouselItem key={0} product={listProduct[0]}  />
                      </div>
                      <div className="carousel-item">
                        < CarouselItem key={1} product={listProduct[1]} />
                      </div>
                      <div className="carousel-item">
                        <CarouselItem key={2} product={listProduct[2]} />
                      </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
    );
}
export default Carousel;