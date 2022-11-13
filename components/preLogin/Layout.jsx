import styles from "../../styles/preLogin/layout.module.css";
import Register from "./Register";
import Login from "./Login"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useSelector,useDispatch } from "react-redux";
import { setShowLoginModal } from "../../features/displayStatesSlice";

function Layout({introData}){

    const dispatch = useDispatch();
    const showRegisterModal = useSelector((state)=> state.display.showRegisterModal);

return <div className={styles.layout}>
    <div className={styles.close} onClick={()=>dispatch(setShowLoginModal(false))}><FontAwesomeIcon icon={faTimes} /></div>
    <div className={styles.intro}>
        <div className={styles.content}>
            <h2>{introData.title}</h2>
            <p>{introData.msg}</p>
            <button onClick={introData.convertFunc}>{introData.button}</button>
        </div>
    </div>
    
    <div className={styles.log}>
        {showRegisterModal ? <Register /> : <Login />}
    </div>

</div>

}

export default Layout;