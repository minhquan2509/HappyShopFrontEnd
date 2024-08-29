import { useEffect, useState } from "react";

function ActiveAccount(){
    const[email, setEmail] = useState("");
    const[activeId, setActiveId]= useState("");
    const[activated, setActivated]= useState(false);
    const[notifcation, setNotification] = useState("");
    useEffect(()=>{
        const searchParam = new URLSearchParams(window.location.search);
        const emailParam =searchParam.get("email");
        const activeIdParam = searchParam.get("activeId");

        if(emailParam && activeIdParam){
            setEmail(emailParam);
            setActiveId(activeIdParam);
            handelActivation();
        }
    }, []);

    const handelActivation = async() =>{
        try {
            const url:string =`http://localhost:8080/account/activate?email=${email}&activeId=${activeId}`;
            const response = await fetch(url,{method:"GET"});
            if(response.ok){
                setActivated(true);
            }else{
                setNotification(response.text + "");
            }
        } catch (error) {
            
        }
    }
    return(
        <div>
            <h1>Kích Hoạt Tài Khoản</h1>
            {activated===true?(<p>Tài khoản đã kích hoạt thành công!</p>):(<p>{notifcation}</p>)}
        </div>
    )
}
export default ActiveAccount;