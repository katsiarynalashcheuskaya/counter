import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './Settings.module.css'
import Button from "../Button/Button";
import Input from "../Input/Input";


type SettingsPropsType = {
    MAX_VALUE: number
    START_VALUE: number
    counterMaxValue: (MAX_VALUE: number)=>void
    counterStartValue: (START_VALUE: number)=>void
    counterSettings: () => void
}

export const Settings = (props: SettingsPropsType) => {
    const [error, setError] = useState<string>('')

    const onChangeMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.counterMaxValue(JSON.parse(e.currentTarget.value))
    }

    const onChangeStartValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.counterStartValue(JSON.parse(e.currentTarget.value))
    }

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
                        value={props.MAX_VALUE}
                        onChange={onChangeMaxValueHandler}
                    />
                </div>
                <div>
                    <Input
                        id={'settings-start-value-input'}
                        value={props.START_VALUE}
                        onChange={onChangeStartValueHandler}
                     /*   error={error}*/
                    />
                </div>
            </div>
            </div>
            <div className={s.wrapper}>
                <div>
                    <Button id={'set-counter-button'}
                            disabled={false}
                            onClick={setCountHandler}>set</Button>
                </div>
            </div>
        </div>
    );
};

