import { useState } from "react";
import styles from "../../styles/ProductPage/slider.module.css";

function Slider({product}){
    const [imageValue,setImageValue] = useState(0); 
return <div className={styles.slider}>
    <div className={styles.mainImg}>
        <img src={product.images[imageValue].url} alt="" />
    </div>

    <div className={styles.subImgs}>
        <ul>
           {product.images.map((image,index)=>{
               return  <li key={index} onClick={()=> setImageValue(index)}><img src={image.url} /></li>
           })}
        </ul>
    </div>

</div>

}

export default Slider;