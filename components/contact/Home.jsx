import styles from "../../styles/contact/home.module.css";
import Form from "./Form";
import Patch from "../../components/Patch";

function Home(){
return <div className={styles.contactPage}>
    <Patch prev="Home" current="Contact Us" route="/" />
    <div className="container">
        <div className={styles.form}>
                <Form />   
        </div>
    </div>
</div>

}

export default Home;