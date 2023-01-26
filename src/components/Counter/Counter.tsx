import React from 'react';
import s from './Counter.module.css'
import Button from "../Button/Button";
import {StateType} from "../../App";


type CounterPropsType = {
    state: StateType
    increaseCount: () => void
    resetCount: () => void
}

    export const Counter = (props: CounterPropsType) => {

    const increaseCountHandler = () => {
         props.increaseCount()
    }
    const resetCountHandler = () => {
        props.resetCount()
    }
    const spanSet = (props.state.page === 'counter') ? props.state.count
        : (props.state.page === 'settings') ? 'enter values and press "set"' : 'Incorrect value!'
        const spanClass = (props.state.page === 'counter') ? s.spanCounter + ((props.state.count === props.state.maxValue) ? ' ' + s.red : '')
                : (props.state.page === 'settings') ? s.spanSettings
                : (props.state.page === 'error'? s.redSpan
                        : '')

    return (
        <div className={s.container}>
            <div className={s.counter}>
                <span className={spanClass}>
                    {spanSet}
                </span>
            </div>
            <div className={s.wrapper}>
                <div>
                    <Button id={'counter-inc-button'}
                            disabled={(props.state.count === props.state.maxValue || props.state.page === 'settings' || props.state.page === 'error') }
                            onClick={increaseCountHandler}>inc</Button>
                </div>
                <div>
                    <Button id={'counter-reset-button'}
                            disabled={props.state.page === 'settings' || props.state.page === 'error'}
                            onClick={resetCountHandler}>reset</Button>
                </div>

            </div>
        </div>
    );
};

