import styles from "../styles/footer.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone,faAddressBook,faLocation } from '@fortawesome/free-solid-svg-icons'

function Footer(){
return <div className={styles.footer}>
    <div className="container">
        <div className={styles.content}>
            <div className={styles.prime}>
                <h1>Shopify</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet sapien ut est placerat condimentum quis sed odio. Nulla facilisi. Curabitur suscipit metus orci, at varius justo ornare a.</p>
            </div>

            <div className={styles.lista}>
                <div className={styles.contact}>
                    <h2>CONTACT US</h2>
                    <ul>
                        <li><FontAwesomeIcon icon={faPhone} /> 00970593686817</li>
                        <li><FontAwesomeIcon icon={faAddressBook} /> waelabuawad18@gmail.com</li>
                        <li><FontAwesomeIcon icon={faLocation} /> Palestine,Tulkarem</li>
                    </ul>
                </div>

                <div className={styles.contact}>
                    <h2>ABOUT</h2>
                    <ul>
                        <li>FAQ</li>
                        <li>Support</li>
                        <li>Privcy and Policy</li>
                    </ul>
                </div>
            </div>

        </div>
    </div>
</div>

}

export default Footer;