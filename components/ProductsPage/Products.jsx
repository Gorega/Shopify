import styles from "../../styles/ProductsPage/products.module.css";
import { useRouter } from "next/router";
import { useState } from "react";

function Products({products,filters}){
    const router = useRouter();
    const [showLists,setShowLists] = useState(false);

return <div className={styles.products}>
    <div className={styles.head}>
        <div className={styles.sec}>
            <span onClick={()=>setShowLists(false)} className={showLists || styles.active}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M1 2.5A1.5 1.5 0 012.5 1h3A1.5 1.5 0 017 2.5v3A1.5 1.5 0 015.5 7h-3A1.5 1.5 0 011 5.5v-3zm8 0A1.5 1.5 0 0110.5 1h3A1.5 1.5 0 0115 2.5v3A1.5 1.5 0 0113.5 7h-3A1.5 1.5 0 019 5.5v-3zm-8 8A1.5 1.5 0 012.5 9h3A1.5 1.5 0 017 10.5v3A1.5 1.5 0 015.5 15h-3A1.5 1.5 0 011 13.5v-3zm8 0A1.5 1.5 0 0110.5 9h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 019 13.5v-3z" clip-rule="evenodd"></path></svg></span>
            <span onClick={()=>setShowLists(true)} className={showLists && styles.active}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M2.5 11.5A.5.5 0 013 11h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0-4A.5.5 0 013 7h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0-4A.5.5 0 013 3h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5z" clip-rule="evenodd"></path></svg> </span>
        </div>

        <div className={styles.sec}>
            {products.length} Products Found
        </div>

        <div className={styles.line}>
        </div>

        <div className={styles.sec}>
            <span className={styles.sortLabel}>Sort By</span>
            <select onChange={filters.sortHandler} value={filters.sortValue}>
                <option value="lowest">Price (Lowest)</option>
                <option value="heighest">Price (Heighest)</option>
                <option value="a-z">Name (A-Z)</option>
                <option value="z-a">Name (Z-A)</option>
            </select>
        </div>
    </div>

    <div className={styles.body}>
        <div className={showLists ? styles.blocks : styles.lists}>
            {products.map((product,index)=>{
                return  <div className={styles.list} key={index}>
                <img src={product.image} alt="" onClick={()=> router.push(`/products/${product.id}`)} />
                <div className={styles.info}>
                    <h2 onClick={()=> router.push(`/products/${product.id}`)}>{product.name}</h2>
                    <span>${product.price.toLocaleString()}</span>
                    {showLists && <p>{`${product.description.substring(0,70)} ...`}</p>}
                    {showLists && <button onClick={()=> router.push(`/products/${product.id}`)}>Details</button>}
                </div>
                </div>
            })}
        </div>
    </div>

</div>

}

export default Products;