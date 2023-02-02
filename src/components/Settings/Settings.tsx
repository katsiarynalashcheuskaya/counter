import React, {ChangeEvent} from 'react';
import s from './Settings.module.css'
import Button from "../Button/Button";
import Input from "../Input/Input";
import {StateType} from "../../store/counterReducer";

type SettingsPropsType = {
   state: StateType
    counterSettings: () => void
    changeMaxValue: (max: number) => void
    changeStartValue: (start: number) => void
}

export const Settings = (props: SettingsPropsType) => {

    const onChangeMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length <= 5) {
            props.changeMaxValue(parseInt(e.currentTarget.value,10));
        } else {
            return;
    }}
    const onChangeStartValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length <= 5) {
            props.changeStartValue(Math.round(+e.currentTarget.value));
        } else {
            return;
        }}
    const setCountHandler = () => {
        props.counterSettings()
    }

    return (
        <div className={s.container}>
            <div className={s.settings}>
                <div className={s.spans}>
                    <span>max value:</span>
                    <span>start value:</span>
                </div>
                <div className={s.inputs}>
                    <div>
                        <Input
                            id={'settings-max-value-input'}
                            value={props.state.maxValue}
                            onChange={onChangeMaxValueHandler}
                            error={(props.state.maxValue <= 0) || (props.state.maxValue <= props.state.startValue)}

                        />
                    </div>
                    <div>
                        <Input
                            id={'settings-start-value-input'}
                            value={props.state.startValue}
                            onChange={onChangeStartValueHandler}
                            error={(props.state.startValue < 0) || (props.state.startValue >= props.state.maxValue)}
                            />
                    </div>
                </div>
            </div>
            <div className={s.wrapper}>
                <div>
                    <Button id={'set-counter-button'}
                            disabled={(props.state.page === 'counter' || props.state.page === 'error')}
                            onClick={setCountHandler}>set</Button>
                </div>
            </div>
        </div>
    );
};

