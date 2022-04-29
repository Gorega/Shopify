import { useRef, useState,useLayoutEffect, useContext } from "react";
import styles from "../../styles/ProductsPage/filters.module.css";
import axios from "axios";
import { AppContext } from "../../ContextApi";

function Filters({categories,companies,colors}){
    const {setProductsSpinner,setFilteredProducts} = useContext(AppContext);
    const checkBox = useRef();
    const firstRender = useRef(true)
    const [categryIndex,setCategoryIndex] = useState(0);
    const [colorIndex,setColorIndex] = useState(0);
    const [searchValue,setSearchValue] = useState("");
    const [categoryValue,setCategoryValue] = useState("");
    const [companyValue,setCompanyValue] = useState("");
    const [colorValue,setColorValue] = useState("");
    const [priceValue,setPriceValue] = useState(400000);
    const [freeShipping,setFreeShipping] = useState(false);

    useLayoutEffect(()=>{
        if(firstRender.current){
          firstRender.current = false;
          return;
        }
        const controller = new AbortController();
        setProductsSpinner(true)
        axios.get(`/api/products?name=${searchValue}&category=${categoryValue}&company=${companyValue}&price=${priceValue}&colors=${colorValue}&${freeShipping && `shipping=${freeShipping}`}`,{
          signal: controller.signal
        })
        .then(res => {
            setProductsSpinner(false)
            setFilteredProducts(res.data)
        })
        .catch(err => {
          if(controller.signal) return;
          console.log(err)
        })
        return()=>{
          controller.abort();
        }
      },[searchValue,companyValue,categoryValue,priceValue,colorValue,freeShipping])
    
      const searchHandler = (e)=>{
        setSearchValue(e.target.value)
        if(e.target.value === ""){
          setSearchValue("");
        }
      }
    
      const categoryHandler = (e,value)=>{
        setCategoryValue(value)
        if(value === "All"){
          setCategoryValue("")
        }
      }
    
      const companyHandler = (e,value)=>{
        setCompanyValue(e.target.value)
        if(value === "All"){
          setCompanyValue("")
        }
      }
    
      const colorsHandler = (color)=>{
        setColorValue(color.substring(1))
        if(color === "white"){
          setColorValue("")
        }
      }
    
      const priceHandler = (e)=>{
        setPriceValue(e.target.value)
      }
    
      const shippingHandler = (e)=>{
        if(e.target.checked){
          setFreeShipping(true);
        }else{
          setFreeShipping("");
        }
      }

return <div className={styles.filters}>
    <div className={styles.search}>
        <input type="serach" placeholder="Search" value={searchValue} onChange={searchHandler} />
    </div>
    
    <div className={styles.filter}>
        <h2>Category</h2>
        <ul className={styles.category}>
            {categories.map((category,index)=>{
                return <li key={index} onClick={(e)=>{
                    setCategoryIndex(index)
                    categoryHandler(e,category)
                }} className={index === categryIndex && styles.active}>{category}</li>
            })}
        </ul>
    </div>

    <div className={styles.filter}>
        <h2>Company</h2>
        <select onChange={(e)=>companyHandler(e,e.target.value)} value={companyValue}>
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
                    return <li style={{backgroundColor:color}}key={index} onClick={(e)=> {
                        setColorIndex(index)
                        colorsHandler(color)
                    }} className={index === colorIndex && styles.active}></li>
                })}
            </ul>
        </div>
    </div>

    <div className={styles.filter}>
        <h2>Price</h2>
        <label>${priceValue.toLocaleString()}</label>
        <input type="range" value={priceValue} onChange={priceHandler} max={400000} min={0}  />
    </div>

    <div className={styles.filter}>
        <span>Free Shipping</span>
        <input type="checkbox" onChange={shippingHandler} ref={checkBox} />
    </div>

    <div className={styles.clear}>
        <button onClick={()=>{
            if(checkBox.current.checked){
                checkBox.current.checked = false
            }
            setCategoryIndex(0)
            setColorIndex(0)
            setSearchValue("")
            setCompanyValue("")
            setCategoryValue("")
            setPriceValue(400000)
            setColorValue("");
        }}>Clear Filters</button>
    </div>

</div>

}

export default Filters;