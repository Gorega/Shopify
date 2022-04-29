import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const AppContext = React.createContext();

const AppProvider = ({children})=>{
    const {status:cartStatus} = useSelector((state)=> state.cart)
    const {status} = useSession()
    const [sliderValue,setSliderValue] = useState(0)
    const [showRegisterForm,setShowRegisterForm] = useState(false);
    const [savedProducts,setSavedProducts] = useState([]);
    const [showLog,setShowLog] = useState(false);
    const [subtotalLoading,setSubtotalLoading] = useState(false);
    const [selectedProducts,setSelectedProducts] = useState([]);
    const [productsSpinner,setProductsSpinner] = useState(false);
    const [filteredProducts,setFilteredProducts] = useState([]);

        const getSavedProducts = ()=>{
            if(status === "authenticated"){
                axios.get(`/api/cart`)
                .then(res => setSavedProducts(res.data.result))
                .catch(err => console.log(err))
            }
    }

    const isProductSaved = (productName)=>{
        return savedProducts.some((product)=> product.product_name === productName)
    }

    useEffect(()=>{
        getSavedProducts();
    },[cartStatus,status])
    
    return <AppContext.Provider value={{
        sliderValue,
        setSliderValue,
        showRegisterForm,
        setShowRegisterForm,
        showLog,
        setShowLog,
        isProductSaved,
        savedProducts,setSavedProducts,
        subtotalLoading,setSubtotalLoading,
        selectedProducts,setSelectedProducts,
        productsSpinner,setProductsSpinner,
        filteredProducts,setFilteredProducts
    }}>
        {children}
    </AppContext.Provider>
}

export default AppProvider;