import ProductsPage from "../../components/ProductsPage/Home";
import axios from "axios"
import { useEffect, useState } from "react";
import Head from "next/head"

function Index({products}){
  const companies = ["All",... new Set(products.map((product)=> product.company))]
  const categories = ["All",... new Set(products.map((product)=> product.category))]
  const colors = ["All",...new Set(products.map((product)=> product.colors[0]))]
  const [searchValue,setSearchValue] = useState(null);
  const [categoryValue,setCategoryValue] = useState(null);
  const [companyValue,setCompanyValue] = useState(null);
  const [priceValue,setPriceValue] = useState(309999);
  const [sortValue,setSortValue] = useState("lowest")
  const [finalProducts,setFinalProducts] = useState(products)
  const [filteredProducts,setFilteredProducts] = useState([]);

  const searchHandler = (e)=>{
      setSearchValue(e.target.value)
      let searchedProducts = products.filter((product)=> product.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1)
      setFinalProducts(searchedProducts)
      setFilteredProducts(searchedProducts);
  }

  const categoryHandler = (e,value)=>{
    setCategoryValue(e.target.value)
    if(filteredProducts.length >= 1){
      let searchedProducts = filteredProducts.filter((product)=> product.category.toLowerCase() === value.toLowerCase())
        setFinalProducts(searchedProducts)
    }else{
      if(value === "All"){
        setFinalProducts(filteredProducts)
      }else{
        let searchedProducts = products.filter((product)=> product.category.toLowerCase() === value.toLowerCase())
        setFinalProducts(searchedProducts)
      }
    }
  }

  const companyHandler = (e,value)=>{
    setCompanyValue(e.target.value)
    if(filteredProducts.length >=1){
        let searchedProducts = filteredProducts.filter((product)=> product.company.toLowerCase() === value.toLowerCase())
        setFinalProducts(searchedProducts)
    }else{
      if(value === "All"){
        setFinalProducts(filteredProducts)
      }else{
        let searchedProducts = products.filter((product)=> product.company.toLowerCase() === value.toLowerCase())
        setFinalProducts(searchedProducts)
      }
    }
  }

  const colorsHandler = (e,color)=>{
    if(e.target.textContent === "All"){
      setFinalProducts(finalProducts)
    }
    let searchedProducts = filteredProducts.filter((product)=> product.colors.includes(color))
      setFinalProducts(searchedProducts)
  }

  const priceHandler = (e)=>{
    setPriceValue(e.target.value)
    let searchedProducts = filteredProducts.filter((product)=> product.price < priceValue)
    setFinalProducts(searchedProducts)
  }

  const shippingHandler = (e)=>{
    if(e.target.checked){
      let searchedProducts = filteredProducts.filter((product)=> product.shipping === true)
      setFinalProducts(searchedProducts)
    }else{
      setFinalProducts(filteredProducts)
    }
  }

  const sortHandler = (e)=>{
    setSortValue(e.target.value)
    if(e.target.value === "lowest"){
      const sortedProducts = filteredProducts.sort((a, b) => a.price - b.price)
      setFinalProducts(sortedProducts)
    }
    if(e.target.value === "heighest"){
      const sortedProducts = filteredProducts.sort((a, b) => b.price - a.price)
      setFinalProducts(sortedProducts)
    }
    if(e.target.value === "a-z"){
      const sortedProducts = filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
      setFinalProducts(sortedProducts)
    }
    if(e.target.value === "z-a"){
      const sortedProducts = filteredProducts.sort((a, b) => b.name.localeCompare(a.name))
      setFinalProducts(sortedProducts)
    }
  }

  useEffect(()=>{
    console.log(filteredProducts)
  },[filteredProducts])

return <>
  <Head>
    <title>Products</title>
  </Head>
  <ProductsPage 
        products={finalProducts}
        categories={categories}
        companies={companies}
        colors={colors}
        searchHandler={searchHandler}
        searchValue={searchValue}
        filters={{
          searchValue,
          searchHandler,
          categoryValue,
          categoryHandler,
          companyValue,
          companyHandler,
          colorsHandler,
          priceValue,
          priceHandler, 
          shippingHandler,
          clear:()=>{
            setSearchValue("")
            setPriceValue(309999)
            setFinalProducts(products)
          },
          sortHandler,
          sortValue
        }}
        />

</>
}

export async function getServerSideProps(){
    const response = await axios.get(`https://course-api.com/react-store-products`);
    const data = await response.data;
    return{
      props:{
        products:data
      }
    }
  }

export default Index;