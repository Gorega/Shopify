import Item from "./Item";
import OrderCard from "./OrderCard";
import styles from "../../styles/cartPage/items.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import AlertModel from "./AlertModel";
import { useState } from "react";

function Items({products}){
    const router = useRouter();
    const [showModel,setShowModel] = useState(false);
    const clearHandler = ()=>{
        axios.delete(`/api/cart/delete/clear`)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
    
return <div className={styles.items}>
    <div className={styles.head}>
        <h2>Shopping Cart ({products.length})</h2>
        <ul>
            <li>Item</li>
            <li>Price</li>
            <li>Quantity</li>
            <li>Subtotal</li>
        </ul>
    </div>

    <div className={styles.in}>
        {products.map((product,index)=>{
            return <Item product={{...product}} key={index} />
        })}
    </div>

    <div className={styles.control}>
        <button onClick={()=> router.push("/products")}>Continue Shopping</button>
        <button onClick={()=> setShowModel(true)} style={{backgroundColor:"var(--alt-background)"}}>Clear Shopping Cart</button>
        <AlertModel showModel={showModel}
                    removeAction={()=>{
                        clearHandler()
                        setShowModel(false)
                    }}
                    closeModel={()=> setShowModel(false)}
                    alertContent="This action will remove all items from your shopping cart."
        />
    </div>

    <div className={styles.order}>
        <OrderCard />
    </div>

</div>

}

export default Items;