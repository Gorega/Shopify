import { useEffect, useState } from "react";
import styles from "../../styles/cartPage/orderCard.module.css";
import Checkout from "./Checkout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useContext } from "react";
import {AppContext} from "../../ContextApi";

function OrderCard(){
    const {subtotalLoading,selectedProducts} = useContext(AppContext);
    const [showCheckoutPage,setShowCheckoutPage] = useState(false);
    let shippingFee = 5.34
    const subtotal = selectedProducts.reduce((total,product)=>{
        return total += product.product_price * product.product_quantity
    },0)

    useEffect(()=>{
        if(showCheckoutPage){
            document.body.style.overflow = "hidden";
        }else{
            document.body.style.overflow = "auto";
        }
    },[showCheckoutPage])

return <>
<div className={styles.card}>
    <div className={styles.content}>
        <div className={styles.head}>
            <div className={styles.sec}>
            <h2>Subtotal :</h2>
            <span>{subtotalLoading ? <FontAwesomeIcon className="fa-spin" icon={faSpinner} /> : `$${subtotal.toLocaleString()}`}</span>  
            </div>
            <div className={styles.sec}>
                <h2>Shipping Fee :</h2>
                <span>${shippingFee.toLocaleString()}</span>
            </div>
        </div>

        <div className={styles.total}>
            <h2>Order Total :</h2>
            <span>{subtotalLoading ? <FontAwesomeIcon className="fa-spin" icon={faSpinner} /> : `$${(subtotal + shippingFee).toLocaleString()}`}</span>
        </div>
    </div>

    <button onClick={()=> setShowCheckoutPage(true)}>Checkout</button>
</div>

{showCheckoutPage && <Checkout subtotal={(subtotal + shippingFee).toLocaleString()} closeCheckoutpage={()=> setShowCheckoutPage(false)} />}
</>

}

export default OrderCard;