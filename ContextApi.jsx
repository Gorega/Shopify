import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export const AppContext = React.createContext();

const AppProvider = ({children})=>{
    const [sliderValue,setSliderValue] = useState(0)
    const [showRegisterForm,setShowRegisterForm] = useState(false);
    const {status} = useSession()
    const [addToCartLoading,setAddToCartLoading] = useState(false);
    const [removeFromCartLoading,setRemoveFromCartLoading] = useState(false)
    const [savedProducts,setSavedProducts] = useState([]);
    const [subtotalLoading,setSubtotalLoading] = useState(false);
    const [showLog,setShowLog] = useState(false);
    const [selectedProducts,setSelectedProducts] = useState([]);


    const getSavedProducts = ()=>{
        if(status === "authenticated"){
            axios.get(`/api/cart`)
            .then(res => setSavedProducts(res.data.result))
            .catch(err => console.log(err))
        }
  }

    const addToCartHandler = (item)=>{
        setAddToCartLoading(true)
        axios.post(`/api/cart/add`,item)
        .then(res => setAddToCartLoading(false))
        .catch(err=> setAddToCartLoading(false))
    }

    const removeFromCartHandler = (productName)=>{
        setRemoveFromCartLoading(true)
        axios.delete(`/api/cart/delete/${productName}`)
        .then(res => setRemoveFromCartLoading(false))
        .catch(err=> setRemoveFromCartLoading(false))
    }

    const isProductSaved = (productName)=>{
        return savedProducts.some((product)=> product.product_name === productName)
    }

    useEffect(()=>{
        getSavedProducts();
    },[addToCartHandler,removeFromCartHandler])
    
    return <AppContext.Provider value={{
        sliderValue,
        setSliderValue,
        showRegisterForm,
        setShowRegisterForm,
        showLog,
        setShowLog,
        isProductSaved,
        removeFromCartHandler,
        addToCartHandler,
        addToCartLoading,
        removeFromCartLoading,
        savedProducts,setSavedProducts,
        subtotalLoading,setSubtotalLoading,
        selectedProducts,setSelectedProducts
    }}>
        {children}
    </AppContext.Provider>
}

export default AppProvider;