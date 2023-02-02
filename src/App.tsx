import React, {useEffect, useReducer} from 'react';
import s from './App.module.css';
import {Counter} from "./components/Counter/Counter";
import {Settings} from "./components/Settings/Settings";
import counterReducer, {
    changeMaxValueAC,
    changeStartValueAC, counterSettingsAC,
    increaseCountAC,
    initialState,
    resetCountAC
} from "./store/counterReducer";

function App() {
    const [state, stateDispatch] = useReducer(counterReducer,initialState)

    const increaseCount = () => {
        /*localStorage.setItem('counterValue', JSON.stringify({...state, count: state.count+1}))
        if (state.count < state.maxValue) {
            setState({...state, count: state.count + 1})

        }*/
        stateDispatch(increaseCountAC())
    }
    const resetCount = () => {stateDispatch(resetCountAC())
    /*setState({...state, count: state.startValue})*/}
    const changeStartValue = (start: number) => {stateDispatch(changeStartValueAC(start))
    /*{
        if (start >= state.maxValue || start < 0 || state.maxValue < 1) {
            setState({...state, startValue: start, page: 'error'})
        } else {
            setState({...state, startValue: start, page: 'settings'})
        }
    }*/}
    const changeMaxValue = (max: number) => {stateDispatch(changeMaxValueAC(max))
        /*if (max <= state.startValue || max < 1 || state.startValue < 0) {
            setState({...state, maxValue: max, page: 'error'})
        } else {
            setState({...state, maxValue: max, page: 'settings'})
        }*/

    }
    const counterSettings = () => { stateDispatch(counterSettingsAC())
        /*localStorage.setItem('counterState', JSON.stringify({
            startValue: state.startValue, maxValue: state.maxValue, count: state.startValue, page: 'counter'
        }))
        setState({...state, count: state.startValue, page: 'counter'})*/
    }

    /*useEffect(()=>{
        const localStorageCountValue = localStorage.getItem('counterValue')
        if(localStorageCountValue) {
            stateDispatch(JSON.parse(localStorageCountValue))
        }

        const localStorageData = localStorage.getItem('counterState')
        if(localStorageData) {
            stateDispatch(JSON.parse(localStorageData))
        }
    },[])*/

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