import React from "react";
import styles from "./Counter.module.css";
import Number from "./Number/Number";
import ValuesForCounter from "./ValuesForCounter/ValuesForCounter";
import Button from "./Buttons/Button";

class Counter extends React.Component {

    state = {
        startValue: 0,
        maxValue: 5,
        currentValue: 0,
        isSetDisabled: true,
        isIncDisabled: false,
        isResetDisabled: true,
    };

    componentDidMount() {
        this.restoreState();
    }

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem("our-state", stateAsString);
    };

    restoreState = () => {
        //объявляем наш стартовый стейт
        let state = {
            startValue: 0,
            maxValue: 5,
            currentValue: 0,
            isSetDisabled: true,
            isIncDisabled: false,
            isResetDisabled: true,
        };

        let stateAsString = localStorage.getItem("our-state");
        if (stateAsString != null) {
            state = JSON.parse(stateAsString);
        }
        //устанавливаем стейт (либо пустой, либо востановленный) в стейт
        this.setState(state);
    };

    inc = () => {
        if (this.state.currentValue < this.state.maxValue) {
            this.setState({
                currentValue: this.state.currentValue + 1,
                isResetDisabled: false,
            }, () => {
                this.isIncDisabled();
                this.saveState();
            });
        }
    };

    isIncDisabled = () => {
        if (this.state.currentValue === this.state.maxValue) {
            this.setState({
                isIncDisabled: true,
            }, () => {
                this.saveState();
            });
        }
    };

    reset = () => {
        this.setState({
            currentValue: this.state.startValue,
            isResetDisabled: true,
            isIncDisabled: false,
        }, () => {
            this.saveState();
        });
    };

    set = () => {
        this.setState({
            currentValue: this.state.startValue,
            isSetDisabled: true,
            isIncDisabled: false,
        }, () => {
            this.saveState();
        });
    };

    isSetDisabled = () => {
        this.setState({
            isSetDisabled: false,
        }, () => {
            this.saveState();
        });
    };

    enterValuesAndPressSet = () => {
        this.setState({
            isResetDisabled: true,
            isIncDisabled: true,
            currentValue: "Enter values and press 'set'"
        }, () => {
            this.saveState();
        });
    };

    incorrectValue = () => {
        if (this.state.startValue >= this.state.maxValue)
            this.setState({
                isSetDisabled: true,
                currentValue: "Incorrect value!"
            }, () => {
                this.saveState();
            });
    };

    callMethodsOnValueChanged = () => {
        this.isSetDisabled();
        this.enterValuesAndPressSet();
        this.incorrectValue();
        this.saveState();
    };

    changeMaxValue = (value) => {
        this.setState({
            maxValue: value,
        }, () => {
            this.callMethodsOnValueChanged();
        });
    };

    changeStartValue = (value) => {
        this.setState({
            startValue: value,
        }, () => {
            this.callMethodsOnValueChanged();
        });
    };

    render = () => {

        return (
            <div className={styles.blockForFlex}>
                <div className={styles.mainBlocks}>
                    <ValuesForCounter
                        maxValue={this.state.maxValue}
                        startValue={this.state.startValue}
                        changeMaxValue={this.changeMaxValue}
                        changeStartValue={this.changeStartValue}
                    />
                    <div className={styles.buttonsContainer}>
                        <Button
                            name="set"
                            callBack={this.set}
                            isDisable={this.state.isSetDisabled}/>
                    </div>
                </div>
                <div className={styles.mainBlocks}>
                    <Number
                        startValue={this.state.startValue}
                        currentValue={this.state.currentValue}
                        maxValue={this.state.maxValue}/>
                    <div className={styles.buttonsContainer}>
                        <Button
                            name="inc"
                            callBack={this.inc}
                            isDisable={this.state.isIncDisabled}/>
                        <Button
                            name="reset"
                            callBack={this.reset}
                            isDisable={this.state.isResetDisabled}/>
                    </div>
                </div>
            </div>
        );
    };
}

export default Counter;
