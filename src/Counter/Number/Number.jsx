import React from "react";
import styles from "./Number.module.css";

class Number extends React.Component {

    render = () => {

        const currentValue = (this.props.currentValue === this.props.maxValue)
        || (this.props.startValue >= this.props.maxValue)
            ? styles.equalMax : "";

        return (
            <div className={styles.currentValue + " " + currentValue}>
                {this.props.currentValue}
            </div>
        );
    };
}

export default Number;
