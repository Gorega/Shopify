import styles from "../../styles/navbar/nav.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart,faSearch,faUser,faSortDown, faBars } from '@fortawesome/free-solid-svg-icons'
import { useContext, useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link"
import LogPage from "../preLogin/Home";
import { AppContext } from "../../ContextApi"
import {useSession} from "next-auth/react";
import NavMenu from "./NavMenu";
import UserList from "./UserList";

function Nav(){
    const router = useRouter();
    const navRef = useRef();
    const {showLog,setShowLog,savedProducts} = useContext(AppContext);
    const [showUserList,setShowUserList] = useState(false);
    const [currentIndex,setCurrentIndex] = useState(0);
    const [showNavMenu,setShowNavMenu] = useState(false);
    const {data:session,status} = useSession();

    const setActiveLiTouch = ()=>{
        switch(router.pathname){
            case "/":
                setCurrentIndex(0)
            break;
            case "/products":
                setCurrentIndex(1)
            break;
            case "/contact":
                setCurrentIndex(2)
            break;
            default:
                setCurrentIndex(4)
        }
    }
        
    useLayoutEffect(()=>{
        const fixedNav = window.addEventListener("scroll",()=>{
            if(window.pageYOffset >= 50){
                navRef.current.classList.add(styles.fixed)
            }else{
                navRef.current.classList.remove(styles.fixed)
            }
        })
        if(showNavMenu){
            document.body.style.overflow = "hidden";
        }else{
            document.body.style.overflow = "auto"
            setActiveLiTouch();
        }        
        return(()=>{
            window.removeEventListener("scroll",fixedNav);
        })
    },[router,showNavMenu])
    
return <>
<div className={styles.nav} ref={navRef}>
    <div className="container">
        <div className={styles.content}>
            <div className={styles.logo}>
                <Link href="/"><h1>Shopify</h1></Link>
            </div>

        <div className={`${styles.list}`}>
                <ul>
                    <li onClick={()=>router.push("/")} className={currentIndex === 0 && styles.active}>Home</li>
                    <li onClick={()=>router.push("/products")} className={currentIndex === 1 && styles.active}>Products</li>
                    <li onClick={()=>router.push("/contact")} className={currentIndex === 2 && styles.active}>Contact Us</li>
                </ul>
        </div>

        <div className={styles.end}>
            <ul>
                <li onClick={()=> router.push("/search")}><FontAwesomeIcon icon={faSearch} /></li>
                <li onClick={()=> router.push("/cart")}>
                    <FontAwesomeIcon icon={faShoppingCart} />
                    {(status === "authenticated" && savedProducts.length >= 1) && <div className={styles.patch}>{savedProducts.length}</div>}
                </li>
                {status === "authenticated" ? <li onMouseEnter={()=> setShowUserList(true)} onMouseLeave={()=> setShowUserList(false)}><div className={styles.user}>
                    <div className={styles.userImg}>
                        <img src={session.user.image} alt="" />
                    </div>    
                    <span><FontAwesomeIcon icon={faSortDown} /></span>
                    <div className={`${styles.userList} ${showUserList && styles.show}`}>
                        <UserList />
                    </div>
                </div>
                </li> : <li onClick={()=> setShowLog(true)}><FontAwesomeIcon icon={faUser} /></li>}
             </ul>
            <div className={styles.bar} onClick={()=> setShowNavMenu(true)}>
                <FontAwesomeIcon icon={faBars} />
            </div>
        </div>
        </div>
    </div>
</div>

{showLog && <LogPage />}
<NavMenu showNavMenu={showNavMenu}
        closeNavMenu={()=>setShowNavMenu(false)}
        showLog={()=> {
            setShowLog(true)
            setShowNavMenu(false)
        }}
/>

</>

}

export default Nav;