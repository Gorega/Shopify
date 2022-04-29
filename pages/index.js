import Header from "../components/homePage/Header";
import Section from "../components/homePage/Section";
import Body from "../components/homePage/Body";
import axios from "axios"
import Head from "next/head";
import {server} from "../lib/config";

export default function Home({data}) {

  return <>
    <Head >
      <title>Shopify</title>
      <meta name="description" content="Shopify" />
    </Head>
    <Header products={data} />
    <Section products={data} />
    <Body products={data} />
</>
}

export async function getServerSideProps(){
  const response = await axios.get(`${server}/api/products`,{withCredentials:true});
  const data = await response.data;

  return{
    props:{
      data:data
    }
  }
}
