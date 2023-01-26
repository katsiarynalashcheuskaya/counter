import React, {useEffect, useState} from 'react';
import s from './App.module.css';
import {Counter} from "./components/Counter/Counter";
import {Settings} from "./components/Settings/Settings";

export type StateType = {
    count: number,
    maxValue: number,
    startValue: number,
    page: PageType
}

export type PageType = 'settings' | 'counter' | 'error'

function App() {
    const [state, setState] = useState<StateType>({count: 0, maxValue: 10, startValue: 0, page: 'counter'})

    const increaseCount = () => {
        if (state.count < state.maxValue) {
            setState({...state, count: state.count + 1})
        }
    }
    const resetCount = () => setState({...state, count: state.startValue})
    const changeStartValue = (start: number) => {
        if (start >= state.maxValue || start < 0 || state.maxValue < 1) {
            setState({...state, startValue: start, page: 'error'})
        } else {
            setState({...state, startValue: start, page: 'settings'})
        }
    }
    const changeMaxValue = (max: number) => {
        if (max <= state.startValue || max < 1 || state.startValue < 0) {
            setState({...state, maxValue: max, page: 'error'})
        } else {
            setState({...state, maxValue: max, page: 'settings'})
        }
    }
    const counterSettings = () => {
        localStorage.setItem('counterState', JSON.stringify({
            startValue: state.startValue, maxValue: state.maxValue, count: state.startValue, page: 'counter'
        }))
        setState({...state, count: state.startValue, page: 'counter'})
    }

    useEffect(()=>{
        const localStorageData = localStorage.getItem('counterState')
        if(localStorageData) {
            setState(JSON.parse(localStorageData))
        }
    },[])

    return (
        <div className={s.App}>
            <Settings
                state={state}
                counterSettings={counterSettings}
                changeStartValue = {changeStartValue}
                changeMaxValue={changeMaxValue}
            />
            <Counter
                state={state}
                increaseCount={increaseCount}
                resetCount={resetCount}
            />
        </div>

    );}

export default App;