import React from "react";
import { my_request } from "./Request";
import Picture from "../model/pictureModel";

async function getPicture(url: string): Promise<Picture[]> {
    const result: Picture[] = [];
    //goi request
    const response = await my_request(url);

    //lay ra toan bo hinh anh cua product
    const responseData = response._embedded.pictures;

    for (const key in responseData) {
        result.push({
            idPicture: responseData[key].idPicture,
            namePicture: responseData[key].namePicture,
            icon: responseData[key].icon,
            link: responseData[key].link,
            dataPicture: responseData[key].dataPicture
        });
    }
    return result;
}
export async function getAllPicture(idProduct: number): Promise<Picture[]> {
   

    //xac dinh endpoint
    const endpoint: string = `http://localhost:8080/product/${idProduct}/pictureList`;

    
    return getPicture(endpoint);
}

export async function get1PictureOf1Product(idProduct: number): Promise<Picture[]> {
   

    //xac dinh endpoint
    const endpoint: string = `http://localhost:8080/product/${idProduct}/pictureList?sort=idPicture,asc&page=0&size=1`;

    
    return getPicture(endpoint);
}