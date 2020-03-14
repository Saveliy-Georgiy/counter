import React from "react";
import styles from "./ValuesForCounter.module.css";

class ValuesForCounter extends React.Component {

    onChangeMaxValue = (e) => {
        this.props.changeMaxValue(Number(e.currentTarget.value));
    };

    onChangeStartValue = (e) => {
        this.props.changeStartValue(Number(e.currentTarget.value));
    };

    render = () => {

        const valueBlock = (this.props.startValue >= this.props.maxValue)
            ? styles.incorrectValues : "";

        return (
            <div className={styles.valueBlock}>
                <div>
                    max value: <input
                    className={styles.valueInput + " " + valueBlock}
                    type="number"
                    min="1"
                    value={this.props.maxValue}
                    onChange={this.onChangeMaxValue}
                />
                </div>
                <div>
                    start value: <input
                    className={styles.valueInput + " " + valueBlock}
                    type="number"
                    min="0"
                    value={this.props.startValue}
                    onChange={this.onChangeStartValue}
                />
                </div>
            </div>
        );
    };
}

export default ValuesForCounter;
