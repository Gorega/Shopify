import styles from "../../styles/search/home.module.css";
import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Home(){
    const router = useRouter();
    const [searchValue,setSearchValue] = useState(null);
    const [error,setError] = useState({status:false,msg:""})
    const [loading,setLoading] = useState(false);
    const [data,setData] = useState([]);

    const searchHandler = (e)=>{
        setLoading(true)
        e.preventDefault();
        axios.get(`/api/search/products?query=${searchValue}`,{withCredentials:true})
        .then(res => {
            setLoading(false)
            setData(res.data.Products)
        })
        .catch(err => {
            setLoading(false)
            setError({status:true,msg:err.data.response.msg})
        });
    }

    useEffect(()=>{
        if(!searchValue){
            setSearchValue(null)
        }
    },[searchValue])

return <div className={styles.searchPage}>
   <div className="container">
    <div className={styles.search}>
            <form onSubmit={searchHandler}>
                <input type="search" placeholder="Search" onChange={(e)=> setSearchValue(e.target.value)} />
                <span type="submit"><FontAwesomeIcon icon={faSearch} /></span>
            </form>
        </div>
        <div className={styles.content}>
            <h2>Products Found ({data.length})</h2>
            {loading ? <FontAwesomeIcon className="fa-spin" icon={faSpinner} /> : data.length >= 1 ? data.map((product,index)=>{
                return <div className={styles.sec} key={index} onClick={()=>router.push(`/products/${product.id}`)}>
                <img src={product.image} alt="" />
                <div className={styles.info}>
                    <h3>{product.name}</h3>
                    <p>{product.description && `${product.description.substring(0,300)} ....`}</p>
                    <span>${product.price}</span>
                </div>
                </div>
            }) : "No products found"}
        </div>
   </div>
</div>
}

export default Home;