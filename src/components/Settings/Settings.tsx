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
    const [newStartValue, setNewStartValue] = useState<number>(props.START_VALUE)

    const changeStatus = () => {
        props.changeState('settings')
    }

    const onChangeMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (newMaxValue <= newStartValue) {
            setNewMaxValue(JSON.parse(e.currentTarget.value))
            props.changeState('error')
            console.log(1)
        } else if (newMaxValue > newStartValue) {
            setNewMaxValue(JSON.parse(e.currentTarget.value))
            changeStatus();
            console.log(2)
        } else props.changeState('error')
    }

    const onChangeStartValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (newStartValue < newMaxValue) {
            setNewStartValue(JSON.parse(e.currentTarget.value))
            changeStatus();
        } else if (newStartValue < 0 || newStartValue >= newMaxValue) {
            setNewStartValue(JSON.parse(e.currentTarget.value))
            props.changeState('error')
        } else {setNewStartValue(JSON.parse(e.currentTarget.value))
        changeStatus();}
    }

    const setCountHandler = () => {
        props.counterSettings(newMaxValue, newStartValue)
        props.changeState('counter')

    }
    useEffect(() => {
        let valueAsStringMax = localStorage.getItem('counterStart')
        if (valueAsStringMax) {
            setNewStartValue(JSON.parse(valueAsStringMax))
        }

        let valueAsStringStart = localStorage.getItem('counterMax')
        if (valueAsStringStart) {
            setNewMaxValue(JSON.parse(valueAsStringStart))
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

