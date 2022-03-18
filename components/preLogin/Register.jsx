import { faCheck, faSpinner,faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import styles from "../../styles/preLogin/register.module.css";
import {signIn} from "next-auth/react"
import {config} from "../../lib/config";

function Register(){
    const [username,setUsername] = useState(null);
    const [emailValue,setEmailValue] = useState(null);
    const [passwordValue,setPasswordValue] = useState(null);
    const [confirmPass,setConfirmPass] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState({status:false,msg:""});
    const [successRegisterStatus,setSuccessRegisterStatus] = useState(false);

    const registerHandler = (e)=>{
        e.preventDefault();
        setError({status:false})
        setLoading(true)
        axios.post(`${config}/api/auth/register`,{
            username,
            email:emailValue,
            password:passwordValue,
            confirmPassword:confirmPass
        }).then(res => {
            setLoading(false)
            setError({status:false})
            setSuccessRegisterStatus(true)
            signIn("credentials",{
                redirect:true,
                email:emailValue,
                password:passwordValue
            })
        })
        .catch(err => {
            setLoading(false)
            setError({status:true,msg:err.response.data.msg})
        });
    }

return <div className={styles.register}>
    <h2>Create Account</h2>

    <div className={styles.googleLogin} onClick={()=> signIn("google")}>
        <img src="https://freesvg.org/img/1534129544.png"/>
        <button>Sign up with Google</button>
    </div>

    <div className={styles.form}>
        <form onSubmit={registerHandler}>
            <h4>Or use your email for registeration</h4>
            <div className={styles.formControl}>
                <input type="text" placeholder="Name" value={username} onChange={(e)=> setUsername(e.target.value)} />
            </div>

            <div className={styles.formControl}>
                <input type="email" placeholder="Email" value={emailValue} onChange={(e)=> setEmailValue(e.target.value)} />
            </div>

            <div className={styles.formControl}>
                <input type="Password" placeholder="Password" value={passwordValue} onChange={(e)=> setPasswordValue(e.target.value)} />
            </div>

            <div className={styles.formControl}>
                <input type="Password" placeholder="Confirm Password" value={confirmPass} onChange={(e)=> setConfirmPass(e.target.value)} />
            </div>
            {error.status && <div className={styles.msg}><FontAwesomeIcon icon={faTriangleExclamation} /> {error.msg}</div>}
            <button>{loading ? <FontAwesomeIcon className="fa-spin" icon={faSpinner} /> : successRegisterStatus ? <FontAwesomeIcon icon={faCheck} /> : "Sign Up"}</button>
        </form>
    </div>

</div>

}

export default Register;