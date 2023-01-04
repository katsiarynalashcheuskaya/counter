import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './Settings.module.css'
import Button from "../Button/Button";
import Input from "../Input/Input";

type SettingsPropsType = {
    MAX_VALUE: number
    START_VALUE: number
    counterSettings: (newMaxValue: number, newStartValue: number) => void
}

export const Settings = (props: SettingsPropsType) => {
    const [newMaxValue, setNewMaxValue] = useState<number>(props.MAX_VALUE)
    const [newStartValue, setStartMaxValue] = useState<number>(props.START_VALUE)
    const [error, setError] = useState<string>('')

    const onChangeMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => setNewMaxValue(JSON.parse(e.currentTarget.value))
    const onChangeStartValueHandler = (e: ChangeEvent<HTMLInputElement>) => setStartMaxValue(JSON.parse(e.currentTarget.value))
    const setCountHandler = () => props.counterSettings(newMaxValue, newStartValue)
    useEffect(() => {
        let valueAsStringMax = localStorage.getItem('counterStart')
        if (valueAsStringMax) {
            setStartMaxValue(JSON.parse(valueAsStringMax))
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
                        /* error={error}*//>
                </div>
                <div>
                    <Input
                        id={'settings-start-value-input'}
                        value={newStartValue}
                        onChange={onChangeStartValueHandler}
                       /* error={error}*//>
                </div>
            </div>
            </div>
            <div className={s.wrapper}>
                <div>
                    <Button id={'set-counter-button'}
                            /*disabled={false}*/
                            onClick={setCountHandler}>set</Button>
                </div>
            </div>
        </div>
    );
};

