import { useRouter } from "next/router";
import styles from "../styles/patch.module.css";

function Patch({prev,current,route}){
    const router = useRouter();
    
return <div className={styles.patch}>
    <div className="container">
        <h4 onClick={()=> router.push(route)}>{prev} / <span>{current}</span></h4>
    </div>
</div>

}

export default Patch;