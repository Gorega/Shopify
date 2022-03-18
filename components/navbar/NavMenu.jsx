import styles from "../../styles/navbar/navMenu.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown,faTimes,faUser,faHome,faSearch,faBarsStaggered,faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { useSession } from "next-auth/react";
import UserList from "./UserList";
import Router from "next/router"
import { useState } from "react";
import { useRouter } from "next/router";

function NavMenu({showNavMenu,closeNavMenu,showLog}){
    const {data:session,status} = useSession();
    const [showUserList,setShowUserList] = useState(false);
    const router = useRouter();
    Router.events.on("routeChangeComplete",closeNavMenu)

return <div className={`${styles.navMenu} ${showNavMenu && styles.show}`}>
        <div className={styles.close} onClick={closeNavMenu}><FontAwesomeIcon icon={faTimes} /></div>
    <div className={styles.body}>
        {status === "authenticated" ? <div className={styles.userProfile}>
            <img src={session.user.image} alt=""/>
            <div className={styles.user} onClick={()=>setShowUserList(!showUserList)}>
                <h3>{session.user.name}</h3>
                <span><FontAwesomeIcon icon={faSortDown} /></span>
            </div>
            {showUserList && <UserList />}
        </div> : <div className={styles.userProfile}>
            <div className={styles.sign} onClick={showLog}>
                <div className={styles.img}><FontAwesomeIcon icon={faUser} /></div>
                <h2>Login</h2>    
            </div>        
        </div>}
        <ul>
            <li onClick={()=>router.push("/")}><FontAwesomeIcon icon={faHome} /> Home</li>
            <li onClick={()=> router.push("/search")}><FontAwesomeIcon icon={faSearch} /> Search</li>
            <li onClick={()=>router.push("/products")}><FontAwesomeIcon icon={faBarsStaggered} /> Products</li>
            <li onClick={()=>router.push("/contact")}><FontAwesomeIcon icon={faEnvelope} /> Contact Us</li>
        </ul>
    </div>
</div>

}

export default NavMenu;