// import { FunctionComponent, useEffect, useState } from "react";
// import useLocalStorageState from "use-local-storage-state";
// import ProductProps, { CartProps } from "./ProductProps";
// import { useLocation } from "react-router-dom";
// import ProductModel from "../../../model/productModel";
// import { Operation, Quantifier } from "../../utils/quantifier";
// import { TotalPrice } from "../../utils/total";
// import renderRating from "../../utils/star";
// import { produce } from "immer";
// interface ProductPropsInterface {
//     product: ProductModel;
// }
// export const Cart : FunctionComponent<CartProps> = () => {
//     const[cart , setCart] = useLocalStorageState<CartProps>('cart' , {})
//     const location = useLocation()

//     useEffect(() => {
//         window.scrollTo(0 , 0)
//     } , [location])

//     const handleRemoveProduct = (productId: number): void =>{
//         setCart((prevcart) =>{
//             const updatedCart = {...prevcart}
//             delete updatedCart[productId]
//             return updatedCart
//         })
//     }

//     // const handleUpdateQuantity = (productId: number, operation: Operation) =>{
//     //     setCart((prevcart) =>{
//     //         const updatedCart = {...prevcart}
//     //         const storage = 
//     //         if(updatedCart[productId]){
//     //             if(operation === 'increase'){
//     //                 updatedCart[productId] = {...updatedCart[productId] , quantity: updatedCart[productId]?.quantity +1}
//     //             }else{
//     //                  updatedCart[productId] = {...updatedCart[productId] , quantity: updatedCart[productId].quantity -1}
//     //             }
//     //         }
//     //         return updatedCart;
//     //     })
//     // }

//     const handleUpdateQuantity = (productId: number, operation: Operation) => {
//         setCart((prevCart) => {
//           const updatedCart = { ...prevCart };
//           const productToUpdate = updatedCart[productId];


//           if (productToUpdate) {
//             if (operation === 'increase') {
//               updatedCart[productId] = { ...productToUpdate, quantity: (productToUpdate.quantity || 0) + 1 };
//             } else {
//               updatedCart[productId] = { ...productToUpdate, quantity: (productToUpdate.quantity || 0) - 1 };
//             }
//           }

//           return updatedCart;
//         });
//       };

//     }
//     const getProducts = () => Object.values(Cart || {})
//     const totalPrice = getProducts().reduce((accumulator , product) => accumulator + (product.price * product.quantity) , 0)

//     const deleteCart = () =>{

//     }

//     return(
//         <div>
//             <div><h1><b>Giỏ Hàng</b></h1></div> 
//             <div className="row">
//             {getProducts().map(product => (
//                  <div key={product.idProduct}>
//                  <div className="col-4">
//                     <h4>{product.nameProduct}</h4> <br />
//                     {product.description} <br />
//                     {product.origin} <br />
//                     {renderRating(product.rank)} <br />
//                     </div>
//                     <div className="col-4"><Quantifier
//                    removeProductCallback={() => handleRemoveProduct(product.id)}
//                    productId={product.id}
//                    handleUpdateQuantity={handleUpdateQuantity} /></div>
//                    <div className="col-3"><b>Giá Tiền: {product.price}</b></div>
//                  </div>

//             ))}
//             <hr />
//         </div>
//         <TotalPrice amount={totalPrice} />
//         <button className="btn btn-danger" onClick={handleClearCart}>Xóa Giỏ Hàng</button>
//         </div>


//     )
//             }
import { Dispatch, FunctionComponent, SetStateAction, useEffect, useState } from 'react'
import useLocalStorageState from 'use-local-storage-state'

import classes from './cart.module.scss'
import { useLocation } from 'react-router-dom'
import { CartProps } from './ProductProps'
import { Operation, Quantifier } from '../../utils/quantifier'
import { TotalPrice } from '../../utils/total'
import renderRating from '../../utils/star'
import ProductModel from '../../../model/productModel'
import { Props } from 'react-responsive-carousel/lib/ts/components/Thumbs'
import { type } from 'os'
import dinhdangso from '../../utils/dinhdangso'
import { getProductWithId } from '../../../API/productAPI'
import calculateItemTotal from '../../utils/Tinhtien'


export const Cart: FunctionComponent = () => {
  const [cart, setCart] = useLocalStorageState<CartProps>('cart', {})
  const location = useLocation()


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  const handleRemoveProduct = (productId: number): void => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart }
      delete updatedCart[productId]
      return updatedCart
    })
  }
  const handleClearCart = () => {
    setCart([]);
  }
  const handleUpdateQuantity = (productId: number, operation: Operation) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart }
      if (updatedCart[productId]) {
        if (operation === 'increase') {
          updatedCart[productId] = { ...updatedCart[productId], quantity: (updatedCart[productId].quantity || 0) + 1 }
        } else {
          updatedCart[productId] = { ...updatedCart[productId], quantity: (updatedCart[productId].quantity || 0) - 1 }
        }
      }
      return updatedCart
    })
  }
  const getProducts = () => Object.values(cart || {})

  const totalCart = getProducts().reduce((accumulator, product) => accumulator + (product.price * product.quantity), 0)

  return (
    <section >
      <h1 style={{textAlign: 'left'}}>Giỏ Hàng</h1>
<hr />
      <div className='row'>
        {getProducts().map(product => (
          <div className='row' key={product.idProduct}>
            <div className='col-4'><h3>
              {product.nameProduct}</h3><br />
              {product.description} <br />
              {product.description}  <br />
              {product.origin} <br />
              {renderRating(product.rank)} <br />
            </div>
            <div className='col-2'> <b><h4>Giá: {dinhdangso(product.price)}đ</h4></b><br /></div>
            <div className='col-3'><Quantifier
              removeProductCallback={() => handleRemoveProduct(product.idProduct)}
              productId={product.idProduct}
              handleUpdateQuantity={handleUpdateQuantity} /> <br /></div>
            <div className='col-1'><button className='btn btn-danger' onClick={() => handleRemoveProduct(product.idProduct)}>XÓA SẢN PHẨM</button></div>
          </div>

        ))}
      </div>
      <hr />
      <b><TotalPrice amount={totalCart} /></b>
      <button className="btn btn-danger" onClick={handleClearCart}>Xóa Giỏ Hàng</button>
    </section>
  )
}