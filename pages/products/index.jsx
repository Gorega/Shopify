import ProductsPage from "../../components/ProductsPage/Home";
import axios from "axios"
import { useContext, useEffect } from "react";
import Head from "next/head"
import { AppContext } from "../../ContextApi";
import {server} from "../../lib/config";

function Index({products}){
  const {filteredProducts,setFilteredProducts} = useContext(AppContext)
  const companies = ["All",... new Set(products.map((product)=> product.company))]
  const categories = ["All",... new Set(products.map((product)=> product.category))]
  const colors = ["white",...new Set(products.map((product)=> product.colors[0]))]

  useEffect(()=>{
    setFilteredProducts(products)
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