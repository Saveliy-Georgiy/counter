import React from "react";
import styles from "./Button.module.css";

function Button(props) {
    return (
        <div>
            <button disabled={props.isDisable} onClick={props.callBack} id={props.id} className={styles.button}>
                {props.name}
            </button>
        </div>
    );
}

export default Button;