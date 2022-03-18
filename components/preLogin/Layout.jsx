import styles from "../../styles/preLogin/layout.module.css";
import Register from "./Register";
import Login from "./Login"
import { useContext } from "react";
import { AppContext } from "../../ContextApi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

function Layout({introData}){

    const {showRegisterForm,setShowLog} = useContext(AppContext);

return <div className={styles.layout}>
    <div className={styles.close} onClick={()=>setShowLog(false)}><FontAwesomeIcon icon={faTimes} /></div>
    <div className={styles.intro}>
        <div className={styles.content}>
            <h2>{introData.title}</h2>
            <p>{introData.msg}</p>
            <button onClick={introData.convertFunc}>{introData.button}</button>
        </div>
    </div>
    
    <div className={styles.log}>
        {showRegisterForm ? <Register /> : <Login />}
    </div>

</div>

}

export default Layout;