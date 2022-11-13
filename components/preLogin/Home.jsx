import Layout from "./Layout";
import { useSelector,useDispatch } from "react-redux";
import { setShowRegisterModal } from "../../features/displayStatesSlice";

function Home(){
    const dispatch = useDispatch();
    const showRegisterModal = useSelector((state)=> state.display.showRegisterModal);
    
    const convertFunc = ()=>{
        dispatch(setShowRegisterModal(!showRegisterModal));
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
        title:showRegisterModal ? "Welcome Back" : "Sign Up",
        msg:showRegisterModal ? "To Keep connected with up please login with your personal info" : "Don't own an account sign in now to continue with us",
        button:showRegisterModal ? "Log In" : "Sign Up",
        convertFunc:convertFunc
    }} />
</div>

}

export default Home;