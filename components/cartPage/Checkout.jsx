import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import styles from "../../styles/cartPage/checkout.module.css";
import { useSelector } from "react-redux";

function Checkout({subtotal,closeCheckoutpage}){
    const showTotalAmountSpinner = useSelector((state)=> state.cart.showTotalAmountSpinner);

return <div className={styles.checkout}>
        {showTotalAmountSpinner ?  <div className={styles.layout}> <FontAwesomeIcon className="fa-spin" icon={faSpinner} /></div> : <div className={styles.layout}>
            <h2>Checkout</h2>
            <form  autoComplete="nope">
                <div className={styles.formControl}>
                    <label>Card number</label>
                    <input type="text" placeholder="0000 0000 0000 0000" maxLength={16} autoComplete="nope" autoSave="off" />
                </div>

                <div className={styles.formControl}>
                    <label>Expiry date</label>
                    <div className={styles.sec}>
                    <input type="number" placeholder="08" maxLength={2} autoComplete="nope" autoSave="off" />
                    <input type="number" placeholder="27" maxLength={2} autoComplete="nope" autoSave="off" />
                    </div>
                </div>

                <div className={styles.formControl}>
                    <div className={styles.sec}>
                    <label>CVC</label>
                    <input type="password" placeholder="***" maxLength={3} autoComplete="nope" autoSave="off" />
                    </div>
                    <div className={styles.sec}>
                    <label>ZIP code</label>
                    <input type="number" placeholder="06325" maxLength={6} autoComplete="nope" autoSave="off" />
                    </div>
                </div>

                <p>Notice that after pressing the pay button the total price will be substracted from you credit cart and you will be charged automatically.</p>
                <button>Pay ${subtotal}</button>
                <button onClick={closeCheckoutpage}>Cancel</button>
            </form>
            <div className={styles.patch}>${subtotal}</div>
        </div>}
    </div>

}

export default Checkout;