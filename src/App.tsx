import React, {useEffect, useState} from 'react';
import s from './App.module.css';
import {Counter} from "./components/Counter/Counter";
import {Settings} from "./components/Settings/Settings";

export type PageStateType = 'settings' | 'counter' | 'error'

function App() {
    const [count, setCount] = useState<number>(0);
    const [maxValue, setMaxValue] = useState<number>(10)
    const [startValue, setStartValue] = useState<number>(0)
    const [pageState, setPageState] = useState<PageStateType>('counter')

    const changeState = (state: PageStateType) => {
        setPageState(state);
    }

    useEffect(()=>{
        let countAsString = localStorage.getItem('counterValue')
        if (countAsString) {
            setCount(JSON.parse(countAsString))
        }

        let valueAsStringStart = localStorage.getItem('counterStart')
        if (valueAsStringStart) {
            setStartValue(JSON.parse(valueAsStringStart))
        }

        let valueAsStringMax = localStorage.getItem('counterMax')
        if (valueAsStringMax) {
            setMaxValue(JSON.parse(valueAsStringMax))
        }

    }, [])
    useEffect(()=>{
        localStorage.setItem('counterValue', JSON.stringify(count))
    }, [count])

    useEffect(()=>{
        localStorage.setItem('pageState', JSON.stringify(pageState))
    }, [pageState])

    const increaseCount = () => {
        if (count < maxValue && count >= startValue) {
            setCount(count + 1)
        }
    }
    const resetCount = () => setCount(startValue)
    const counterSettings = (newMaxValue: number, newStartValue: number) => {
        localStorage.setItem('counterMax', JSON.stringify(newMaxValue))
        localStorage.setItem('counterStart', JSON.stringify(newStartValue))
        setCount(newStartValue)
        setMaxValue(newMaxValue)
        setStartValue(newStartValue)
    }
  /*  const changeState = (newPageState: string) => {
        /!* localStorage.setItem('pageState', JSON.stringify(newPageState))*!/
        setPageState(newPageState)

    }*/

    return (
        <div className={s.App}>
            <Settings
                MAX_VALUE={maxValue}
                START_VALUE={startValue}
                counterSettings={counterSettings}
                changeState = {changeState}
                pageState = {pageState}
            />
            <Counter
                MAX_VALUE={maxValue}
                START_VALUE={startValue}
                count={count}
                increaseCount={increaseCount}
                resetCount={resetCount}
                changeState = {changeState}
                pageState = {pageState}
            />
        </div>

    );}

export default App;