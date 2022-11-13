import axios from "axios";
import ProductPage from "../../components/ProductPage/Home";
import Head from "next/head"

function Product({product}){
return <>
    <Head>
        <title>{product.name}</title>
    </Head>
    <ProductPage product={{...product}} />
</>

}

export async function getServerSideProps(context){
    const {productId} = context.query;
    const response = await axios.get(`https://course-api.com/react-store-single-product?id=${productId}`);
    const data = await response.data;
    return{
        props:{
            product:data
        }
    }
}

export default Product;