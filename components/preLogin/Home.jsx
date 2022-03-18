import Layout from "./Layout";
import { useContext } from "react";
import {AppContext} from "../../ContextApi";

function Home(){
    const {showRegisterForm,setShowRegisterForm} = useContext(AppContext);
    
    const convertFunc = ()=>{
        setShowRegisterForm(!showRegisterForm)
    }

return <div className="log-page" style={{
    backgroundColor:"rgba(0,0,0,.8)",
    position:"fixed",
    top:0,
    left:0,
    width:"100%",
    height:"100%",
    zIndex:20
}}>

    <Layout introData={{
        title:showRegisterForm ? "Welcome Back" : "Sign Up",
        msg:showRegisterForm ? "To Keep connected with up please login with your personal info" : "Don't own an account sign in now to continue with us",
        button:showRegisterForm ? "Log In" : "Sign Up",
        convertFunc:convertFunc
    }} />
</div>

}

export default Home;