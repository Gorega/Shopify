import styles from "../../styles/cartPage/item.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../../ContextApi";
import AlertModel from "./AlertModel";
import axios from "axios";

function Item({product}){

    const [counterValue,setCounterValue] = useState(product.product_quantity);
    const {removeFromCartHandler,setSubtotalLoading,selectedProducts,setSelectedProducts} = useContext(AppContext);
    const [showModel,setShowModel] = useState(false);

    // update selected product quantity
    const updateSelectedProductQuantity = (result)=>{
        if(selectedProducts.length >= 1){
            const selectedProductQuantity = selectedProducts.find((item)=> item.product_name === product.product_name);
            return selectedProductQuantity.product_quantity = result;
        }
    }

    const increseCounter = ()=>{
        if(counterValue >= 5){
            return counterValue;
        }else{
            setCounterValue((counterValue)=>{
                updateSelectedProductQuantity(counterValue+1)
                return counterValue+1
            })
        }
    }

    const decreseCounter = ()=>{
        if(counterValue <= 1){
            return counterValue;
        }else{
            setCounterValue((counterValue)=>{
                updateSelectedProductQuantity(counterValue-1)
                return counterValue-1
            })
        }
    }

    useEffect(()=>{
        const check = selectedProducts.find((item)=> item.product_name === product.product_name);
        if(check){
            setSubtotalLoading(true)
        }
        axios.patch(`/api/cart/update/quantity`,{quantity:counterValue,productName:product.product_name})
        .then(res=> setSubtotalLoading(false))
        .catch(err=> setSubtotalLoading(false));
    },[selectedProducts,counterValue])


return <div className={styles.item}>
    <div className={styles.content}>
        <div className={styles.select}>
            <input type="checkbox" onChange={(e)=>{
                if(e.target.checked){
                    setSelectedProducts((products)=>{
                        return products.concat({
                            product_name:product.product_name,
                            product_price:product.product_price,
                            product_quantity:counterValue
                        })
                    })
                }else{
                    setSelectedProducts((products)=>{
                        return products.filter((item)=> item.product_name !== product.product_name)
                    })
                }
            }} />
        </div>
        <div className={styles.img}>
            <img src={product.product_img} alt="" />
        </div>
        <div className={styles.info}>
            <h4>{product.product_name}</h4>
            <span>Color: <p style={{backgroundColor:product.product_color}}></p></span>
        </div>
    </div>

    <div className={styles.price}>
        ${product.product_price.toLocaleString()}
    </div>

    <div className={styles.counter}>
        <span onClick={decreseCounter}>-</span>
        <h4>{counterValue}</h4>
        <span onClick={increseCounter}>+</span>
    </div>

    <div className={styles.total}>
        ${(product.product_price * counterValue).toLocaleString()}
    </div>

    <div className={styles.remove}>
        <FontAwesomeIcon icon={faTrashCan} onClick={()=> setShowModel(true)} />
        <AlertModel showModel={showModel}
                    removeAction={()=> {
                    removeFromCartHandler(product.product_name)
                    setShowModel(false)
                    }}
                    closeModel={()=>setShowModel(false)}
                    alertContent="This action will remove this item from your shopping cart."
        />
    </div>

</div>

}

export default Item;