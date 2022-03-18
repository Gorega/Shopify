import styles from "../../styles/contact/form.module.css";

function Form(){
return <div className={styles.form}>
    <h2>Get In Touch</h2>
    <p>We are here for you! How can we help?</p>
    <form>
        <div className={styles.formControl}>
            <input type="text" placeholder="Enter your name" />
        </div>

        <div className={styles.formControl}>
            <input type="text" placeholder="Enter your email address" />
        </div>

        <div className={styles.formControl}>
            <textarea placeholder="Go ahead, we are listening.."></textarea>
        </div>

        <button>Submit</button>
    </form>
    
</div>

}

export default Form;