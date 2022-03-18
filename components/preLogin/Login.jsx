import styles from "../../styles/preLogin/login.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faSpinner,faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import {signIn} from "next-auth/react";
import { useState } from "react";

function Login(){
    const [emailValue,setEmailValue] = useState(null);
    const [passwordValue,setPasswordValue] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState({status:false,msg:""});
    const [successLoginStatus,setSucessLoginStatus] = useState(false)

    const loginHandler = async (e)=>{
        e.preventDefault();
        setLoading(true)
        setError({status:false});
        const result = await signIn("credentials",{
            redirect:false,
            email:emailValue,
            password:passwordValue
        })

        if(result.error){
            setLoading(false)
            setError({status:true,msg:result.error});
        }
        if(!result.error){
            setLoading(false)
            setError({status:false})
            setSucessLoginStatus(true)
            window.location.replace("/")
        }
    }
    
return <div className={styles.login}>
    <h2>Sign In</h2>
    <div className={styles.googleLogin} onClick={()=> signIn("google")}>
        <img src="https://freesvg.org/img/1534129544.png"/>
        <button>Sign in with Google</button>
    </div>

    <div className={styles.form}>
        <h4>Or use your email for sign in</h4>

        <form onSubmit={loginHandler}>
            <div className={styles.formControl}>
                <input type="email" placeholder="Email" value={emailValue} onChange={(e)=> setEmailValue(e.target.value)} />
            </div>

            <div className={styles.formControl}>
                <input type="Password" placeholder="Password" value={passwordValue} onChange={(e)=> setPasswordValue(e.target.value)} />
            </div>
            {error.status && <div className={styles.msg}><FontAwesomeIcon icon={faTriangleExclamation} /> {error.msg}</div>}
            <button>{loading ? <FontAwesomeIcon className="fa-spin" icon={faSpinner} /> : successLoginStatus ? <FontAwesomeIcon icon={faCheck} /> : "Sign in"}</button>
        </form>
    </div>

</div>

}

export default Login;