import styles from "../../styles/ProductsPage/home.module.css";
import Patch from "../Patch";
import Filters from "./Filters";
import Products from "./Products";

function Home({products,categories,companies,colors,filters}){

return <div className={styles.productsPage}>
    <Patch prev="Home" current="Products" route="/" />
    <div className="container">
        <div className={styles.content}>
            <div className={styles.filters}>
                <Filters categories={categories} companies={companies} colors={colors}
                        filters={filters}
                />
            </div>

            <div className={styles.body}>
                <Products products={products} filters={filters} />
            </div>
        </div>
    </div>
</div>

}

export default Home;