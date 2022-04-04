import styles from "../../styles/cartPage/alertModel.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

function Alert({showModel,removeAction,closeModel,alertContent,alertTitle}){

return  <div className={`${styles.model} ${showModel && styles.active}`}>
    <div className={styles.content}>
        <h2>{alertTitle}</h2>
        <p>{alertContent}</p>
        <div className={styles.control}>
            <button onClick={removeAction}>Ok</button>
            <button onClick={closeModel}>Cancel</button>
        </div>
        <div className={styles.close} onClick={closeModel}>
            <FontAwesomeIcon icon={faTimes} />
        </div>
    </div>
</div>

}

export default Alert;