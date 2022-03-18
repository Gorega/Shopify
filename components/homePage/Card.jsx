import { useRouter } from "next/router";
import styles from "../../styles/homePage/card.module.css";

function Card({product,aos}){
    const router = useRouter();
return <div className={styles.card} data-aos={aos}>
    <div className={styles.image} onClick={()=> router.push(`/products/${product.id}`)}>
        <img src={product.image} />
    </div>
    <h3 onClick={()=> router.push(`/products/${product.id}`)}>{product.name}</h3>
    <span>${product.price.toLocaleString()}</span>
</div>

}

export default Card;