import { useContext } from "react";
import CartPage from "../../components/cartPage/Home";
import { AppContext } from "../../ContextApi";
import Head from "next/head";

function Index(){
    const {savedProducts} = useContext(AppContext);

return <>
    <Head>
        <title>Your Shopping Cart</title>
    </Head>
    <CartPage products={savedProducts} />
</>
    
}

export default Index;