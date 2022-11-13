import SearchPage from "../../components/search/Home";
import Patch from "../../components/Patch";
import Head from "next/head";

function index(){
return <>
    <Head>
        <title>Search</title>
    </Head>
    <Patch prev="Home" current="Search" route="/" />
    <SearchPage />
</>
}

export default index;