import React from "react";
import ProductModel from "../model/productModel";
import { my_request } from "./Request";

interface ResultInterface {
    result : ProductModel[];
    totalPage: number;
    totalProduct: number;
}

async function getProduct(endpoint: string): Promise<ResultInterface> {
    const result: ProductModel[] = [];
    //goij cac phuong thuc
    const response = await my_request(endpoint);
    //Lay ra product
    const responseData = response._embedded.products;
    console.log(responseData);

    //Lay thong tin trang
    const totalPage:number = response.page.totalPages;
    const totalProduct: number = response.page.totalElements;

    for (const key in responseData) {
        result.push({
            idProduct: responseData[key].idProduct,
            nameProduct: responseData[key].nameProduct,
            dOm: responseData[key].dOm,
            expiry: responseData[key].expiry,
            origin: responseData[key].origin,
            description: responseData[key].description,
            quantity: responseData[key].quantity,
            price: responseData[key].price,
            rank: responseData[key].rank
        });
    }
    return{result: result , totalPage: totalPage, totalProduct: totalProduct};
}

export async function get3Productlatest(): Promise<ResultInterface> {
    const url: string = 'http://localhost:8080/product?sort=idProduct,desc&page=0&size=3';

    return getProduct(url);
}

export async function getAllProduct(page: number): Promise<ResultInterface> {
    //xac dinh endpoint
    const url: string = `http://localhost:8080/product?sort=idProduct,desc&size=4&page=${page}`;

    return getProduct(url);
}

export async function searchProduct(keyword:String, idCate:number) {
     //xac dinh endpoint
     let url: string = `http://localhost:8080/product?sort=idProduct,desc&size=4&page=0`;
    if(keyword !== '' && idCate==0){
        url = `http://localhost:8080/product/search/findByNameProductContaining?sort=idProduct,desc&size=4&page=0&nameProduct=${keyword}`;
    }else if(keyword === '' && idCate > 0){
        url = `http://localhost:8080/product/search/findByCategoriesList_IdCate?sort=idProduct,desc&size=4&page=0&idCate=${idCate}`;
    }else if(keyword !=='' && idCate >0){
        url = `http://localhost:8080/product/search/findByNameProductContainingAndCategoriesList_IdCate?sort=idProduct,desc&size=4&page=0&idCate=${idCate}&nameProduct=${keyword}`;
    }
     return getProduct(url);
}

export async function getProductWithId(idProduct:number):Promise<ProductModel | null> {
    const url = `http://localhost:8080/product/${idProduct}`;
    let result : ProductModel;
try {
    
    const response = await fetch(url);
    if(!response.ok){
        throw new Error('Have error from API getProduct');
    }
    const productData = await response.json();

    if(productData){
        return{
            idProduct: productData.idProduct,
            nameProduct: productData.nameProduct,
            dOm: productData.dOm,
            expiry: productData.expiry,
            origin: productData.origin,
            price: productData.price,
            description: productData.description,
            quantity: productData.quantity,
            rank: productData.rank
        }
    }else{
        throw new Error(`Product didn't exist`)
    }
    
} catch (error) {
    console.error("Error" , error);
    return null;
}
    
}
export async function getProductByIdCartItem(idCart:number) :Promise<ProductModel |null> {
   const url = `http://localhost:8080/cartItem/${idCart}/product`;
   try {
    //goi request
    const response = await my_request(url);
    //kiem tra du lieu endpoint tra ve dung ko
    if(response){
    //tra ve san pham
        return response;
    }else{
        throw new Error("Sản phẩm không tồn tại")
    }
   } catch (error) {
    console.error('Error: ' , error);
    return null;
   }
}
