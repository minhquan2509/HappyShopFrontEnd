import React, { FunctionComponent } from "react";
import Banner from "./components/banner";
import Carousel from "./components/carousel";
import ListProduct from "../merchandise/listProduct";
import { useNavigate, useParams } from "react-router-dom";
import MenuLeft from "./components/menuLeft";

interface HomePageProps{
    keyword: string;
}

function HomePage({keyword}: HomePageProps){
//Lay ra id ma the loai tu url
const {idCate} = useParams();
let idCateNumber = 0;

try {
    idCateNumber = parseInt(idCate+'');
} catch (error) {
    idCateNumber = 0;
    console.error('Error: ', error);
}
if(Number.isNaN(idCateNumber)){
    idCateNumber = 0;
}

    return(
        <div>
            <Banner/>
            <Carousel/>
            <ListProduct keyword={keyword} idCate={idCateNumber}/>
        </div>
    );
}

export default HomePage;