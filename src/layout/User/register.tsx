import { count } from "console";
import React, { useState } from "react";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState('Nam');
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");


    const checkEmail = async (email: string) => {
        //endpoint;\
        const url = `http://localhost:8080/user/search/existsByEmail?email=${email}`;
        //call api
        try {
            const reaponse = await fetch(url);
            const data = await reaponse.text();
            if (data === "true") {
                setErrorEmail("Email Đã Tồn Tại!");
                return true;
            }
            return false;
        } catch (error) {

        }

    }
    //Password
    const checkPass =(password:string) => {
        const passwordRegex = /^(?=.*[!@#$^&*])[A-Za-z\d!@#$^&*]{8,}$/;
        if(!passwordRegex.test(password)){
            setErrorPass("Mật khẩu phải có 8 kí tự và có kí tự đặc biệt");//
            return true;
        }else{
            setErrorPass("")//mat khau hop le
            return false;

        }
    }
    const handlePassword =(e : React.ChangeEvent<HTMLInputElement>)=>{
        setPassword(e.target.value);
        setErrorPass("");

        return checkPass(e.target.value);
    }
    //REPASSWORD
    const handleRePassword =(e : React.ChangeEvent<HTMLInputElement>)=>{
        setRepassword(e.target.value);
        setErrorRepass("");

        return checkRePass(e.target.value);
    }
    const checkRePass =(repassword:string) => {
        if(repassword !== password){
            setErrorRepass("Mật khẩu không khớp");//
            return true;
        }else{
            setErrorRepass("")//mat khau hop le
            return false;

        }
    }

    //=================================================================================================
    //Kiem tra username
    const checkUsername = async (username: string) => {
        //endpoint kiem tra ten dang nhapj ton tai hay chua
        const url = `http://localhost:8080/user/search/existsByUsername?username=${username}`;
        //call api
        try {
            const response = await fetch(url);

            const data = await response.text();
            if (data === "true") {
                setErrorUsername("Tên đăng nhập đã tồn tại!");
                return true;
            }
            return false;
        } catch (error) {
            console.error("Server drop!", error);
            return false;//xay ra loi
        }
    }

    //Bao loi
    const [errorUsename, setErrorUsername] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPass, setErrorPass] = useState("");
    const [errorRePass, setErrorRepass] = useState("");
    const [notification, setNotification] = useState("");

    //xu ly form
    const handleSubmit = async (e: React.FormEvent) => {
        //clear any previous error message
        setErrorUsername('');
        setErrorPass('');
        setErrorRepass('');
        setErrorEmail('');
        //tránh click nhiều lần
        e.preventDefault();
        //Kiểm tra điều kiện rồi gán kết quả vào biến
        const isUsernameValid = !await checkUsername(username);
        const isEmailValid = !await checkEmail(email);
        const isPassValid = !checkPass(password);
        const isRepassValid = !checkRePass(repassword);
        //Kiem tra tat ca dieu kien
        if(isUsernameValid && isEmailValid && isPassValid && isRepassValid){
            try {
                const url= 'http://localhost:8080/account/register';

                const response = await fetch(url,{
                    method: 'POST',
                    headers: {
                        'Content-type' : 'application/json',
                    },
                    body: JSON.stringify({
                        username: username,
                        email: email,
                        password: password,
                        gender: gender,
                        firstName: firstName,
                        lastName: lastName,
                        phone: phone,
                        activeId: "",
                        active: 0
                    })
                 }
                );
                if(response.ok){
                    setNotification("Đăng Ký Thành Công, vui lòng kiểm tra email để kích hoạt!");
                }else{
                    console.log(response.text());
                    setNotification("Đã xảy ra lỗi trong quá trình đăng kí tài khoản");
                }
            } catch (error) {
                setNotification("Đã xảy ra lỗi trong quá trình đăng kí tài khoản");
            }
        }
    }

    const handleEmail = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setErrorEmail('');
        return checkEmail(e.target.value);
    }

    const hanldeUsername = async (e: React.ChangeEvent<HTMLInputElement>) => {
        //Thay doi gia tri
        setUsername(e.target.value);
        //xu li loi
        setErrorUsername('');
        //Kiem tra ten dang nhap
        return checkUsername(e.target.value);
    }

    return (
        <div className="container">
            <h1 className="mt-5 text-center">Đăng Ký</h1>
            <div className="mb-3 col-md-6 col-12 mx-auto">
                <form onSubmit={handleSubmit} className="form">
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label"><b>Tên đăng nhập:</b></label>
                        <input
                            type="text" name=""
                            id="username"
                            value={username}
                            className="form-control"
                            onChange={hanldeUsername}
                        />
                        <div style={{ color: "red" }}>{errorUsename}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label"><b>Email:</b></label>
                        <input
                            type="text" name=""
                            id="email"
                            value={email}
                            className="form-control"
                            onChange={handleEmail}
                        />
                        <div style={{ color: "red" }}>{errorEmail}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label"><b>Mật Khẩu:</b></label>
                        <input
                            type="password" name=""
                            id="email"
                            value={password}
                            className="form-control"
                            onChange={handlePassword}
                        />
                        <div style={{ color: "red" }}>{errorPass}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="repassword" className="form-label"><b>Nhập lại mật khẩu:</b></label>
                        <input
                            type="password" name=""
                            id="email"
                            value={repassword}
                            className="form-control"
                            onChange={handleRePassword}
                        />
                        <div style={{ color: "red" }}>{errorRePass}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label"><b>Họ:</b></label>
                        <input
                            type="text" name=""
                            id="firstName"
                            value={firstName}
                            className="form-control"
                            onChange={(e)=>setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label"><b>Tên:</b></label>
                        <input
                            type="text" name=""
                            id="lastName"
                            value={lastName}
                            className="form-control"
                            onChange={(e)=> setLastName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label"><b>Số Điện Thoại:</b></label>
                        <input
                            type="text" name=""
                            id="firstName"
                            value={phone}
                            className="form-control"
                            onChange={(e)=>setPhone(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label align-right"><b>Giới Tính:</b></label>
                        <input
                            type="text" name=""
                            id="gender"
                            value={gender}
                            className="form-control"
                            onChange={(e)=>setGender(e.target.value)}
                        />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary">Đăng Ký</button>
                        <div style={{ color: "green" }}>{notification}</div>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Register;