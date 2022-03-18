import styles from "../../styles/ProductPage/home.module.css";
import Slider from "./Slider";
import Content from "./Content";
import Patch from "../Patch";
import { useRouter } from "next/router";

function Home({product}){
    const router = useRouter();

return <div className={styles.productPage}>
    <Patch prev="Products" current={product.name} route="/products" />
    <div className="container">
        <button onClick={()=> router.push("/products")}>Back to Products</button>
        <div className={styles.content}>
            <div className={styles.slider}>
                <Slider product={product} />
            </div>

            <div className={styles.body}>
                <Content product={product} />
            </div>
        </div>
    </div>

</div>
}

export default Home;