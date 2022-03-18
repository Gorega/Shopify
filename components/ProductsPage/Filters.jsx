import { useRef, useState } from "react";
import styles from "../../styles/ProductsPage/filters.module.css";

function Filters({categories,companies,colors,filters}){

    const checkBox = useRef();
    const [categryIndex,setCategoryIndex] = useState(0);
    const [colorIndex,setColorIndex] = useState(0);

return <div className={styles.filters}>
    <div className={styles.search}>
        <input type="serach" placeholder="Search" value={filters.searchValue} onChange={filters.searchHandler} />
    </div>
    
    <div className={styles.filter}>
        <h2>Category</h2>
        <ul className={styles.category}>
            {categories.map((category,index)=>{
                return <li key={index} onClick={(e)=>{
                    setCategoryIndex(index)
                    filters.categoryHandler(e,category)
                }} className={index === categryIndex && styles.active}>{category}</li>
            })}
        </ul>
    </div>

    <div className={styles.filter}>
        <h2>Company</h2>
        <select onChange={(e)=>filters.companyHandler(e,e.target.value)} value={filters.companyValue}>
            {companies.map((company,index)=>{
                return <option key={index} value={company}>{company}</option>
            })}
        </select>
    </div>

    <div className={styles.filter}>
        <h2>Colors</h2>
        <div className={styles.colorsList}>
            <ul>
                {colors.map((color,index)=>{
                    return <li style={{backgroundColor:color}} key={index} onClick={(e)=> {
                        setColorIndex(index)
                        filters.colorsHandler(e,color)
                    }} className={index === colorIndex && styles.active}></li>
                })}
            </ul>
        </div>
    </div>

    <div className={styles.filter}>
        <h2>Price</h2>
        <label>${filters.priceValue.toLocaleString()}</label>
        <input type="range" value={filters.priceValue} onChange={filters.priceHandler} max={309999} min={0}  />
    </div>

    <div className={styles.filter}>
        <span>Free Shipping</span>
        <input type="checkbox" onChange={filters.shippingHandler} ref={checkBox} />
    </div>

    <div className={styles.clear}>
        <button onClick={()=>{
            if(checkBox.current.checked){
                checkBox.current.checked = false
            }
            setCategoryIndex(0)
            setColorIndex(0)
            filters.clear()
        }}>Clear Filters</button>
    </div>

</div>

}

export default Filters;