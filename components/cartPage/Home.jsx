import styles from "../../styles/cartPage/home.module.css";
import { useContext } from "react";
import { AppContext } from "../../ContextApi";
import Patch from "../Patch";
import Items from "./Items";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

function Home({products}){
    const {savedProducts} = useContext(AppContext);
    const {status} = useSession();
    const router = useRouter();
    
return <div className={styles.cart}>
    {(status === "authenticated" && savedProducts.length >= 1) ? <>
        <Patch current="Cart" prev="Home" route="/" />
        <div className="container" style={{padding:"50px 0"}}>
            <Items products={products} />
        </div>
    </> : <div className={styles.emptyCart}>
            <h1>Your cart is empty</h1>
            <button onClick={()=> router.push("/products")}>FILL IT</button>
        </div>}
</div>

}

export default Home;