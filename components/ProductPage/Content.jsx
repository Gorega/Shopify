import axios from "axios";
import { useSession } from "next-auth/react";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleCircleSquare, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { AppContext } from "../../ContextApi";
import styles from "../../styles/ProductPage/content.module.css";
import Rating from '@mui/material/Rating';

function Content({product}){
    const [counterValue,setCounterValue] = useState(1);
    const [colorIndex,setColorIndex] = useState(0);
    const {status} = useSession();
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState({status:false,msg:""})
    const {isProductSaved,setShowLog,removeFromCartHandler,removeFromCartLoading} = useContext(AppContext);
    
    const increseCounter = ()=>{
        if(counterValue >= 5){
            return counterValue;
        }else{
            setCounterValue((counterValue)=>{
                return counterValue+1
            })
        }
    }

    const decreseCounter = ()=>{
        if(counterValue <= 1){
            return counterValue;
        }else{
            setCounterValue((counterValue)=>{
                return counterValue-1
            })
        }
    }

    const addToCartHandler = ()=>{
        setLoading(true)
        setError({status:false})
        axios.post(`/api/cart/add`,{
            product_img:product.images[0].url,
            product_name:product.name,
            product_color:product.colors[colorIndex],
            product_price:product.price,
            product_quantity:counterValue
        }).then(res => {
            setLoading(false)
            setError({status:false})
        })
        .catch(err=> {
            setLoading(false)
            if(err.response.status === 422){
                setError({status:true,msg:err.response.data.msg})
            }
        })
    }

return <div className={styles.content}>
    <h2>{product.name}</h2>
    <div className={styles.rate}>
        <div className={styles.stars}>
           <span> <Rating /></span>
        </div>
        <h4>({product.reviews} customer reviews)</h4>
    </div>

    <div className={styles.price}>
        ${product.price && product.price.toLocaleString()}
    </div>

    <p>{product.description}</p>

    <div className={styles.details}>
        <div className={styles.sec}>
            <h4>Available:</h4>
            <span>{product.stock === 1 ? "In stock" : "Out of stock"}</span>
        </div>
        <div className={styles.sec}>
            <h4>SKU:</h4>
            <span>{product.id}</span>
        </div>
        <div className={styles.sec}>
            <h4>Brand:</h4>
            <span>{product.company}</span>
        </div>
    </div>

    <div className={styles.colors}>
        <h2>Colors:</h2>
        <ul>
            {product.colors.map((color,index)=>{
                return <li key={index} onClick={()=> setColorIndex(index)} style={{backgroundColor:color}} className={index === colorIndex && styles.active}></li>
            })}
        </ul>
    </div>

    <div className={styles.counter}>
        <span onClick={decreseCounter}>-</span>
        <h3>{counterValue}</h3>
        <span onClick={increseCounter}>+</span>
    </div>

    <div className={styles.add}>
        {status === "authenticated" && isProductSaved(product.name) ? <button onClick={()=>removeFromCartHandler(product.name)}>{removeFromCartLoading ? <FontAwesomeIcon icon={faSpinner} className="fa-spin" /> : "Remove from Cart"}</button> : <button onClick={()=>{
            if(status === "authenticated"){
                addToCartHandler()
            }else{
                setShowLog(true)
            }
        }}>{loading ? <FontAwesomeIcon className="fa-spin" icon={faSpinner} /> : "Add to Cart"}</button>}
        {error.status && <div className={styles.msg}><FontAwesomeIcon icon={faTriangleCircleSquare} /> {error.msg}</div>}
    </div>

</div>

}

export default Content;