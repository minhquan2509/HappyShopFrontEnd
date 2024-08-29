import React, { ChangeEvent, useState } from "react";
import { Search } from "react-bootstrap-icons";
import { NavLink, Link, useNavigate } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";
import { CartProps } from "../merchandise/components/ProductProps";
import { CartWidget } from "../../admin/ShoppingCart/CartWidget";
import { useAuth } from "../utils/AuthContext";
import { isToken, logOut } from "../utils/JwtService";
import { useCartItem } from "../utils/UseCartItemContext";
interface navbarProps{
  keyword: string;
  setKeyword: (word: string) => void;
}

function Navbar({keyword , setKeyword}: navbarProps){
  const [wordstorage, setWordstorage] = useState('');
  const {totalCart , setTotalCart , setCartList} = useCartItem();
  const {setLoggedIn} = useAuth();
  const navigate = useNavigate(); 
  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWordstorage (e.target.value);
  }

  const handleSearch = () =>{
    setKeyword(wordstorage);
  }
//Tạo localstorage
const[cart,] = useLocalStorageState<CartProps>('cart',{})
const productCount: number = Object.keys(cart || {}).length
//==============================================================
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light" >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"><b><img src={require('./../utils/HappyStore.png')}  style={{width:"100px"}}/></b></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
  
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/"><b>Trang Chủ</b></Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown2" role="button" data-bs-toggle="dropdown" aria-expanded="false"><b>Mặt Hàng</b></Link> 
                
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown2">
                  <li><Link className="dropdown-item" to="/1">Đông Trùng Hạ Thảo</Link></li>
                  <li><Link className="dropdown-item" to="/3">Sữa</Link></li>
                  <li><Link className="dropdown-item" to="/2">Ngũ Cốc</Link></li>
                  <li><Link className="dropdown-item" to="/4">Thực Phẩm Chức Năng</Link></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#"><b>Liên hệ</b></a>
              </li>
            </ul>
          </div>
  
          {/* Tìm kiếm */}
          <div className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Tìm kiếm" aria-label="Search" onChange={onSearchInputChange} value={wordstorage}/>
            <button className="btn btn-outline-success" type="submit" onClick={handleSearch}><Search>ss</Search></button>
          </div>
  
          {/* Biểu tượng giỏ hàng */}
          <div className='d-flex align-items-center'>
					{/* <!-- Shopping Cart --> */}
					<Link className='text-reset me-3' to='/cart'>
						<i className='fas fa-shopping-cart'></i>
						<span className='badge rounded-pill badge-notification bg-danger'>
							{totalCart ? totalCart : ""}
						</span>
					</Link>
					{!isToken() && (
						<div>
							<Link to={"/login"}>
								<button className="btn btn-success">Đăng Nhập</button>
							</Link>
							<Link to={"/register"}>
              <button className="btn btn-success">Đăng Ký</button>
							</Link>
						</div>
					)}

					{isToken() && (
						<>
							{/* <!-- Notifications --> */}
							<div className='dropdown'>
								<a
									className='text-reset me-3 dropdown-toggle hidden-arrow'
									href='#'
									id='navbarDropdownMenuLink'
									role='button'
									data-mdb-toggle='dropdown'
									aria-expanded='false'
								>
									<i className='fas fa-bell'></i>
									<span className='badge rounded-pill badge-notification bg-danger'>
										1
									</span>
								</a>
								<ul
									className='dropdown-menu dropdown-menu-end'
									aria-labelledby='navbarDropdownMenuLink'
								>
									<li>
										<a className='dropdown-item' href='#'>
											Tin Tức Mới
										</a>
									</li>
									<li>
										<a className='dropdown-item' href='#'>
											Another news
										</a>
									</li>
									<li>
										<a className='dropdown-item' href='#'>
											Something else here
										</a>
									</li>
								</ul>
							</div>
							{/* <!-- Avatar --> */}
							<div className='dropdown'>
								<a
									className='dropdown-toggle d-flex align-items-center hidden-arrow'
									href='#'
									id='navbarDropdownMenuAvatar'
									role='button'
									data-mdb-toggle='dropdown'
									aria-expanded='false'
								>
								</a>
								<ul
									className='dropdown-menu dropdown-menu-end'
									aria-labelledby='navbarDropdownMenuAvatar'
								>
									<li>
										<Link to={"/profile"} className='dropdown-item'>
											Thông tin cá nhân
										</Link>
									</li>
									<li>
										<Link
											className='dropdown-item'
											to='/my-favorite-books'
										>
											Sách yêu thích của tôi
										</Link>
									</li>
									<li>
										<a
											className='dropdown-item'
											style={{ cursor: "pointer" }}
											onClick={() => {
												setTotalCart(0);
												logOut(navigate);
												setLoggedIn(false);
												setCartList([]);
											}}
										>
											Logout
										</a>
									</li>
								</ul>
							</div>
						</>
					)}
				</div>
  
          {/* Biểu tượng đăng nhập */}
          {/* <ul className="navbar-nav me-1">
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                <i className="fas fa-user"></i>
              </Link>
            </li>
          </ul> */}
        </div>
      </nav>
    );
}

export default Navbar;
