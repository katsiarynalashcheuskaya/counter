import React, {useEffect, useState} from 'react';
import s from './Counter.module.css'
import Button from "../Button/Button";
import {PageStateType} from "../../App";


type CounterPropsType = {
    count: number
    MAX_VALUE: number
    START_VALUE: number
    increaseCount: (max_Value: number, count: number) => void
    resetCount: () => void
    changeState: (newState: PageStateType) => void
    pageState: PageStateType
}

    export const Counter = (props: CounterPropsType) => {

    const increaseCountHandler = () => {
         props.increaseCount(props.MAX_VALUE, props.count)
    }
    const resetCountHandler = () => {
        props.resetCount()
    }

    const spanSet = (props.pageState === 'counter') ? props.count
        : (props.pageState === 'settings') ? 'enter values and press "set"' : 'Incorrect value!'
        const spanClass = (props.pageState === 'counter') ? s.spanCounter + ((props.count === props.MAX_VALUE) ? ' ' + s.red : '')
                : (props.pageState === 'settings') ? s.spanSettings
                : (props.pageState === 'error'? s.redSpan
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
                            disabled={props.count === props.MAX_VALUE || (props.pageState === 'settings') || (props.pageState === 'error')}
                            onClick={increaseCountHandler}>inc</Button>
                </div>
                <div>
                    <Button id={'counter-reset-button'}
                            disabled={(props.pageState === 'settings' || (props.pageState === 'error'))}
                            onClick={resetCountHandler}>reset</Button>
                </div>

            </div>
        </div>
    );
};

