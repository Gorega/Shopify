import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export const AppContext = React.createContext();

const AppProvider = ({children})=>{
    const [sliderValue,setSliderValue] = useState(0)
    const [showRegisterForm,setShowRegisterForm] = useState(false);
    const {status} = useSession()
    const [removeFromCartLoading,setRemoveFromCartLoading] = useState(false)
    const [savedProducts,setSavedProducts] = useState([]);
    const [subtotalLoading,setSubtotalLoading] = useState(false);
    const [showLog,setShowLog] = useState(false);
    const [selectedProducts,setSelectedProducts] = useState([]);


    const getSavedProducts = ()=>{
        if(status === "authenticated"){
            axios.get(`http://localhost:3000/api/cart`)
            .then(res => setSavedProducts(res.data.result))
            .catch(err => console.log(err))
        }
  }

    const removeFromCartHandler = (productName,action)=>{
        setRemoveFromCartLoading(true)
        axios.delete(`http://localhost:3000/api/cart/delete/${productName}`)
        .then(res => setRemoveFromCartLoading(false))
        .catch(err=> setRemoveFromCartLoading(false))
    }

    const isProductSaved = (productName)=>{
        return savedProducts.some((product)=> product.product_name === productName)
    }

    useEffect(()=>{
        getSavedProducts();
    },[status,savedProducts])
    
    return <AppContext.Provider value={{
        sliderValue,
        setSliderValue,
        showRegisterForm,
        setShowRegisterForm,
        showLog,
        setShowLog,
        isProductSaved,
        removeFromCartHandler,
        removeFromCartLoading,
        savedProducts,setSavedProducts,
        subtotalLoading,setSubtotalLoading,
        selectedProducts,setSelectedProducts
    }}>
        {children}
    </AppContext.Provider>
}

export default AppProvider;