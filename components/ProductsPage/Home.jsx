import styles from "../../styles/ProductsPage/home.module.css";
import Patch from "../Patch";
import Filters from "./Filters";
import Products from "./Products";

function Home({products,categories,companies,colors}){

return <div className={styles.productsPage}>
    <Patch prev="Home" current="Products" route="/" />
    <div className="container">
        <div className={styles.content}>
            <div className={styles.filters}>
                <Filters categories={categories} companies={companies} colors={colors} />
            </div>

            <div className={styles.body}>
                <Products products={products} />
            </div>
        </div>
    </div>
</div>

}

export default Home;