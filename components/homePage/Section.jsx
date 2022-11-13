import { useRouter } from "next/router";
import styles from "../../styles/homePage/section.module.css";
import Card from "./Card";

function Section({products}){
    const router = useRouter();
return <>
<div className="container">
     <div className={styles.section}>
        <h2>All Products</h2>
        <div className={styles.list}>
            {products.slice(0,8).map((product,index)=>{
                return <Card product={{...product}} key={index} aos={"zoom-in"} />
            })}
        </div>

        <div className={styles.more}>
            <button onClick={()=> router.push("/products")}>SHOP NOW</button>
        </div>
    </div>
</div>
</>

}

export default Section;