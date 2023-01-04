import React from 'react';
import s from './Counter.module.css'
import Button from "../Button/Button";


type CounterPropsType = {
    count: number
    MAX_VALUE: number
    START_VALUE: number
    increaseCount: (max_Value: number, count: number) => void
    resetCount: () => void
}

export const Counter = (props: CounterPropsType) => {

    const increaseCountHandler = () => {
        props.increaseCount(props.MAX_VALUE, props.count)
    }

    const resetCountHandler = () => {
        props.resetCount()
    }

    /*const finalSpanClassName = s.error
        + (spanClassName ? ' ' + spanClassName : '')*/

    return (
        <div className={s.container}>
            <div className={s.counter}>
                <span className={(props.count === props.MAX_VALUE) ? s.red : ''}>{props.count}</span>
            </div>
            <div className={s.wrapper}>
                <div>
                    <Button id={'counter-inc-button'}
                            disabled={props.count===props.MAX_VALUE}
                            onClick={increaseCountHandler}>inc</Button>
                </div>
                <div>
                    <Button id={'counter-reset-button'}
                            onClick={resetCountHandler}>reset</Button>
                </div>

            </div>
        </div>
    );
};

