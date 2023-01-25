import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './Settings.module.css'
import Button from "../Button/Button";
import Input from "../Input/Input";
import {PageStateType} from "../../App";

type SettingsPropsType = {
    MAX_VALUE: number
    START_VALUE: number
    counterSettings: (newMaxValue: number, newStartValue: number) => void
    changeState: (newState: PageStateType) => void
    pageState: PageStateType
}

export const Settings = (props: SettingsPropsType) => {
    const [newMaxValue, setNewMaxValue] = useState<number>(props.MAX_VALUE)
    const [newStartValue, setStartValue] = useState<number>(props.START_VALUE)
    const [error, setError] = useState<string>('')


    const changeStatus = () => {
        props.changeState('settings')
    }

    const onChangeMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (newMaxValue <= newStartValue) {
            props.changeState('error')}
        else {
            setNewMaxValue(JSON.parse(e.currentTarget.value))
            changeStatus();}
    }

    const onChangeStartValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (newStartValue < 0 || newStartValue >= newMaxValue) {
            props.changeState('error')
        } else {
            setStartValue(JSON.parse(e.currentTarget.value))
            changeStatus();}
    }

    const setCountHandler = () => {
        props.counterSettings(newMaxValue, newStartValue)
        props.changeState('counter')

    }
    useEffect(() => {
        let valueAsStringMax = localStorage.getItem('counterStart')
        if (valueAsStringMax) {
            setStartValue(JSON.parse(valueAsStringMax))
        }

        let valueAsStringString = localStorage.getItem('counterMax')
        if (valueAsStringString) {
            setNewMaxValue(JSON.parse(valueAsStringString))
        }

    }, [])

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
                            value={newMaxValue}
                            onChange={onChangeMaxValueHandler}
                            error={(newMaxValue <= 0) || (newMaxValue <= newStartValue)}/>
                    </div>
                    <div>
                        <Input
                            id={'settings-start-value-input'}
                            value={newStartValue}
                            onChange={onChangeStartValueHandler}
                            error={(newStartValue < 0) || (newStartValue >= newMaxValue)}/>
                    </div>
                </div>
            </div>
            <div className={s.wrapper}>
                <div>
                    <Button id={'set-counter-button'}
                            disabled={(props.pageState === 'counter' || props.pageState === 'error')}
                            onClick={setCountHandler}>set</Button>
                </div>
            </div>
        </div>
    );
};

