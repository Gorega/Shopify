import styles from "../../styles/navbar/userList.module.css";
import {signOut} from "next-auth/react";
import Link from "next/link"

function UserList(){
return <div className={styles.userList}>
    <ul>
        <li>Profile</li>
        <li>My Orders</li>
        <li>Message Center</li>
        <Link href="/cart"><li>Shopping Cart</li></Link>
        <li onClick={()=>signOut()}>Sign Out</li>
    </ul>
</div>

}

export default UserList;