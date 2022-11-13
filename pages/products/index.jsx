import ProductsPage from "../../components/ProductsPage/Home";
import axios from "axios"
import { useEffect } from "react";
import Head from "next/head"
import {server} from "../../lib/config";
import { useDispatch,useSelector } from "react-redux";
import {setFilteredProducts} from "../../features/filterSlice";

function Index({products}){
  const dispatch = useDispatch();
  const {filteredProducts} = useSelector((state)=> state.filter);
  const companies = ["All",... new Set(products.map((product)=> product.company))]
  const categories = ["All",... new Set(products.map((product)=> product.category))]
  const colors = ["white",...new Set(products.map((product)=> product.colors[0]))]

  useEffect(()=>{
    dispatch(setFilteredProducts(products));
  },[])

return <>
    <Head>
      <title>Products</title>
    </Head>
    <ProductsPage 
          products={filteredProducts}
          categories={categories}
          companies={companies}
          colors={colors}
      />

</>
}

export async function getServerSideProps(){
    const response = await axios.get(`${server}/api/products`,{withCredentials:true});
    const data = await response.data;
    return{
      props:{
        products:data
      }
    }
  }

export default Index;