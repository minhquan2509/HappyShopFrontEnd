
import { ReactNode, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { jwtDecode } from "jwt-decode";
import CartItemModel from "../../model/cartitemModel";
import { JwtPayload } from "../../admin/requireAdmin";
import { getCartAllByIdUser } from "../../API/CartAPI";
import { getIdUserByToken } from "../utils/JwtService";
interface LoginPagesProps{
    setTotalCart: any;
}
const Login: React.FC<LoginPagesProps>=(props)=>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error , setError] = useState('');
    const navigation = useNavigate();
    const {isLoggedIn , setLoggedIn} = useAuth();
    
    useEffect(()=> {
        if(isLoggedIn){
            navigation("/");
        }
    })

    const handleLogin = () =>{
        const loginRequest = {
            username: username,
            password: password
        };

        fetch(
            'http://localhost:8080/account/login',{
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(loginRequest)
            }
        ).then(
            (response) =>{
                if(response.ok){
                    return response.json();
                }else{
                    throw new Error('Đăng nhập thất bại');
                }
            }
        ).then(
           async (data) =>{
                const {jwt} = data;
                const decodedToken = jwtDecode(jwt) as JwtPayload;

                
                localStorage.setItem('token' , jwt);
                setError('Đăng nhập thành công')
                setLoggedIn(true);
                getIdUserByToken();

                const cartData: string | null = localStorage.getItem("cart");
                let cart : CartItemModel[] = cartData ? JSON.parse(cartData) : [];
                //Truoc khi dang nhap ma da chon san pham thi se them san pham do vao database
                if(cart.length !== 0){
                    cart = cart.map((c) => ({...c, idUser: decodedToken.id}));

                    const endpoint = "http://localhost:8080/cart/cartItem";
                        fetch(endpoint , {
                            method: "POST",
                            headers:{
                                Authorization: `Bearer ${jwt}`,
                                "content-type": "application/json"
                            },
                            body: JSON.stringify(cart)
                        })
                        .then((response) => {
                            //lay gio hang cua user khi user dang nhap thanh cong
                            async function  getCart() {
                                const response = await getCartAllByIdUser();
                                //Xoa cart luc chua dang nhap
                                localStorage.removeItem("cart");
                                cart = response;
                                localStorage.setItem("cart" , JSON.stringify(cart));
                                props.setTotalCart(cart.length);
                                
                            }
                        })
                }

            }

        ).catch((errors)=>{
            console.error('Đăng nhập thất bại: ' , error);
            setError('Tài khoản hoặc Mật khẩu không chính xác');
        }) 

        

    }


    return(
        <div>
            <div className='container'>
            <div className="form-signin">
                <h1 className="h3 mb-3 font-weight-normal">Đăng nhập</h1>
                <label className="sr-only">Tên đăng nhập</label>
                <input type="username" id="username" className="form-control mb-2" placeholder="Email address"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label className="sr-only">Password</label>
                <input type="password" id="inputPassword" className="form-control mb-2" placeholder="Password" required
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                />
                <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me" /> Lưu Tài Khoản
                    </label>
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="button"
                   onClick={handleLogin}
                >Đăng nhập</button>
                {error&& <div style={{color: 'red'}}>{error}</div>}
            </div>
        </div>
        </div>
    )
}
export default Login