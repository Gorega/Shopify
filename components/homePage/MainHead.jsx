import styles from "../../styles/homePage/MainHead.module.css";
import { useContext } from "react";
import { AppContext } from "../../ContextApi";
import { useRouter } from "next/router";

function MainHead({backgroundColor,control,image,button,text,subsucibe,product}){
    const {sliderValue,setSliderValue} = useContext(AppContext);
    const router = useRouter();
    let slides = ["","","",""];

return <div className={styles.main} style={{backgroundColor}} data-aos="zoom-in">
    <div className={styles.sec}>
        <h2 onClick={()=> router.push(`products/${product.id}`)}>{product.name}</h2>
        {text && <p> {product.description && `${product.description.substring(0,200)}.`}</p>}
        {button && <button onClick={()=> router.push(`products/${product.id}`)}>View more</button>}
        {control && <div className={styles.control}>
            <ul>
                {slides.map((_,index)=>{
                    return <li key={index} onClick={()=> setSliderValue(index)} className={index === sliderValue && styles.active}></li>
                })}
            </ul>
        </div>}
    </div>

    <div className={styles.sec}>
        {image && <div className={styles.image} onClick={()=> router.push(`products/${product.id}`)}>
            <img src={product.image} alt="" />
        </div>}
        {subsucibe && <div className={styles.subscribe}>
            <input type="email" placeholder="Email Address" />
            <button>Subscribe</button> 
        </div>}
    </div>
</div>

}

export default MainHead;