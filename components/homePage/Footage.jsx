import { useRouter } from "next/router";
import styles from "../../styles/homePage/body.module.css";

function Footage({backgroundColor,height,style,product,aos}){
    const router = useRouter();

return <div className={styles.footage} style={{backgroundColor,height}} data-aos={aos}>
    <div className={styles.image} style={style} onClick={()=> router.push(`/products/${product.id}`)}>
        <img src={product.image} alt=""/>
    </div>
    <div className={styles.cont}>
        <h2 style={style} onClick={()=> router.push(`/products/${product.id}`)}>{product.name}</h2>
        <button style={style} onClick={()=> router.push(`/products/${product.id}`)}>Details</button>
    </div>
</div>

}

export default Footage;