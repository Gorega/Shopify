import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const AppContext = React.createContext();

const AppProvider = ({children})=>{
    const {status} = useSession()
    const {status:cartStatus} = useSelector((state)=> state.cart)
    const [savedProducts,setSavedProducts] = useState([]);

    const getSavedProducts = ()=>{
        if(status === "authenticated"){
            axios.get(`/api/cart`)
            .then(res => setSavedProducts(res.data.result))
        }
    }

    const isProductSaved = (productName)=>{
        return savedProducts.some((product)=> product.product_name === productName)
    }

    useEffect(()=>{
        getSavedProducts();
    },[cartStatus,status])
    
    return <AppContext.Provider value={{
        isProductSaved,
        savedProducts,setSavedProducts,
    }}>
        {children}
    </AppContext.Provider>
}

export default AppProvider;