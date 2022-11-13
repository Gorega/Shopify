import styles from "../../styles/homePage/header.module.css";
import { useRouter } from "next/router";
import Slider from "./Slider";
import { useSelector } from "react-redux";

function Header({products}){
    const sliderValue = useSelector((state)=> state.slider.sliderValue);
    const router = useRouter();

return <>
<div className="container">
    <div className={styles.header}>
        <Slider backgroundColor={"#D2E9E3"}
                control={true}
                image={true}
                button={true}
                text={true}
                product={{...products[sliderValue]}}        
        />

        <div className={styles.sub} data-aos="fade-right">
           {products.slice(0,2).map((product,index)=>{
               return  <section key={index}>
                    <h2 onClick={()=> router.push(`/products/${product.id}`)}>{product.name}</h2>
                    <p>{product.description && `${product.description.substring(0,100)} ...`}</p>
                    <button onClick={()=> router.push(`/products/${product.id}`)}>View more</button>
                    <div className={styles.image} onClick={()=> router.push(`/products/${product.id}`)}>
                        <img src={product.image} alt="" />
                    </div>
                </section>
           })}

        </div>
    </div>
</div>
</>

}

export default Header;