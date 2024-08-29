import React, { FormEvent, useState } from 'react';
import RequireAdmin from './requireAdmin';


const ProductForm: React.FC = () => {
    const [product, setProduct] = useState({
        idProduct: 0,
        nameProduct: '',
        price: 0,
        description: '',
        quantity: 0,
        origin: '',
    })

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        fetch(  'http://localhost:8080/product',
            {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(product)
            }
        ).then((reponse)=>{
            if(reponse.ok){
                alert("Đã thêm sản phẩm thành công!");
                setProduct({
                    idProduct: 0,
                    nameProduct: '',
                    price: 0,
                    description: '',
                    quantity: 0,
                    origin: '',
                })
            }else{
                alert("Gặp lỗi trong quá trình thêm sản phẩm!");
            }
        })
    }

    return (
        <div className='container row d-flex align-items-center justify-content-center'>
            <div className=''>
                <h1>THÊM SẢN PHẨM</h1>
                <form onSubmit={handleSubmit} className='form'>
                    <input
                        type='hidden'
                        id='idProduct'
                        value={product.idProduct}
                    />

                    <label htmlFor='nameProduct'>Tên Sản Phẩm</label>
                    <input
                        className='form-control'
                        type='text'
                        value={product.nameProduct}
                        onChange={(e) => setProduct({ ...product, nameProduct: e.target.value })}
                        required
                    />

                    <label htmlFor='price'>Giá bán</label>
                    <input
                        className='form-control'
                        type='number'
                        value={product.price}
                        onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
                        required
                    />

                    <label htmlFor='quantity'>Số Lượng</label>
                    <input
                        className='form-control'
                        type='number'
                        value={product.quantity}
                        onChange={(e) => setProduct({ ...product, quantity: parseInt(e.target.value) })}
                        required
                    />

                    <label htmlFor='description'>Mô tả</label>
                    <input
                        className='form-control'
                        type='text'
                        value={product.description}
                        onChange={(e) => setProduct({ ...product, description: e.target.value })}
                        required
                    />
                    <label htmlFor='origin'>Xuất Xứ</label>
                    <input
                        className='form-control'
                        type='text'
                        value={product.origin}
                        onChange={(e) => setProduct({ ...product, origin: e.target.value })}
                        required
                    />
                    <button type='submit' className='btn btn-success mt-2'>Đăng Bán</button>
                </form>
            </div>
        </div>
    )
}
const ProductForm_Admin = RequireAdmin(ProductForm);

export default ProductForm_Admin;