import React, { useEffect, useState } from "react";
import ProductModel from "../../model/productModel";
import ProductProps from "./components/ProductProps";

import { Pagination } from "../utils/pagination";
import { getAllProduct, searchProduct } from "../../API/productAPI";

interface ListPropductProps {
    keyword: string;
    idCate: number;
}

function ListProduct({ keyword , idCate }: ListPropductProps) {
    const [listProduct, setListProduct] = useState<ProductModel[]>([]);
    const [loadingData, setLoadingData] = useState(true);
    const [bug, setBug] = useState(null);
    const [pagemoment, setPagemoment] = useState(1);
    const [totalpage, setTotalpage] = useState(0);
    const [totalproduct, setTotalproduct] = useState(0);

    useEffect(() => {
        if (keyword === '' && idCate==0) {
            getAllProduct(pagemoment - 1).then(
                rs => {
                    setListProduct(rs.result);
                    setTotalpage(rs.totalPage);
                    setLoadingData(false);
                }
            ).catch(
                bugs => {
                    setLoadingData(false);
                    setBug(bugs.message);
                }
            );
        } else {
            searchProduct(keyword, idCate).then(
                rs => {
                    setListProduct(rs.result);
                    setTotalpage(rs.totalPage);
                    setLoadingData(false);
                }
            ).catch(bugs => {
                setLoadingData(false);
                setBug(bugs.message);
            });
        }
    }, [pagemoment, keyword , idCate] // chi goi 1 lan
    );

    const paginationMethod = (page: number) => {
        setPagemoment(page);
    };



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

    if (listProduct.length === 0) {
        return (
            <div className="container">
                <div className="d-glex alighn-items-center justify-content-center">
                    <h1>The Product didn't exist</h1>
                </div>

            </div>
        );
    }

    return (

        <div className="container">
            <div className="row mt-4 mb-4">
                {
                    listProduct.map((product) => (
                        <ProductProps key={product.idProduct} product={product} />
                    )
                    )
                }
            </div>
            <div><Pagination pageMoment={1} totalPage={totalpage} pagination={paginationMethod} /></div>
        </div>
    );
}

export default ListProduct;