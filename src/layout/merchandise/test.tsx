import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { error } from "console";
import ProductModel from "../../model/productModel";
import { getProductWithId } from "../../API/productAPI";
import ProductPicture from "./components/ProductPicture";
import Evaluation from "./components/Evaluation";
import renderRating from "../utils/star";
import dinhdangso from "../utils/dinhdangso";
const ChiTietSanPham: React.FC = () => {
    // Lấy mã sách từ URL
    const { idProduct } = useParams();

    let idProductNumber = 0;
    try {
        idProductNumber = parseInt(idProduct + '');
        if (Number.isNaN(idProductNumber))
            idProductNumber = 0;
    } catch (error) {
        idProductNumber = 0;
        console.error("Error", error);
    }

    // Khai báo
    const [product, setProduct] = useState<ProductModel | null>(null);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);
    const [quanty, setQuanty] = useState(1);


    const increquanty = () => {
        const storage = (product && product.quantity ? product?.quantity : 0)
        if (quanty < storage)
            setQuanty(quanty + 1);
    }
    const decrequanty = () => {
        if (quanty >= 2) {
            setQuanty(quanty - 1);
        }

    }
    const handlequanty = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newquanty = parseInt(event.target.value);
        const storage = (product && product.quantity ? product?.quantity : 0);
        if (!isNaN(newquanty) && newquanty >= 1 && newquanty <= storage) {
            setQuanty(newquanty);
        }
    }
    const handleBuy = () => {

    }

    const handleAddCart = () => {

    }

    useEffect(() => {
        getProductWithId(idProductNumber)
            .then((product) => {
                setProduct(product);
                setDangTaiDuLieu(false);
            }
            )
            .catch((error) => {
                setBaoLoi(error.message);
                setDangTaiDuLieu(false);
            })
    }, [idProduct]
    )

    if (dangTaiDuLieu) {
        return (
            <div>
                <h1>Đang tải dữ liệu</h1>
            </div>
        );
    }

    if (baoLoi) {
        return (
            <div>
                <h1>Gặp lỗi: {baoLoi}</h1>
            </div>
        );
    }

    if (!product) {
        return (
            <div>
                <h1>Sách không tồn tại!</h1>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="row mt-4 mb-4">
                <div className="col-4">
                    <ProductPicture idProduct={idProductNumber} />
                </div>
                <div className="col-8">
                    <div className="row">
                        <div className="col-8">
                            <h1>
                                {product.nameProduct}
                            </h1>
                            <h4>
                                Xếp hạng: {renderRating(product.rank ? product.rank : 0)}
                            </h4>
                            <h4>
                                Giá: {dinhdangso(product.price)}đ
                            </h4>
                            <hr />
                            <div dangerouslySetInnerHTML={{ __html: (product.description + '') }} />
                            <hr />
                        </div>
                        <div className="col-4">
                            <div className="mb-2"><b>Số Lượng</b></div>
                            <div className="d-flex align-item-center">
                                <button className="btn-btn-outline-secondary me-2" onClick={decrequanty}>-</button>
                                <input
                                    className="form-control text-center"
                                    type="number"
                                    min={1}
                                    value={quanty}
                                    onChange={handlequanty}
                                />
                                <button className="btn-btn-outline-secondary me-2" onClick={increquanty}>+</button>
                            </div>
                            {
                                product.price && (
                                    <div className="mt-2 text-center">
                                        <b>Tổng Tiền:</b> <br />
                                        <h4>{dinhdangso(quanty * product.price)}đ</h4>
                                    </div>
                                )
                            }
                            <div className="d-grid gap-2">
                                <button type="button" className="btn btn-danger mt-3" onClick={handleBuy}><b>Mua Ngay</b></button>
                                <button type="button" className="btn btn-outline-seconday mt-2" onClick={handleAddCart}><b>Thêm vào giỏ hàng</b></button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
            <div className="row mt-4 mb-4">
                <Evaluation idProduct={idProductNumber} />
            </div>
        </div>
    );
}
export default ChiTietSanPham;