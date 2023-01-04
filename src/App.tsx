import React, {useEffect, useState} from 'react';
import s from './App.module.css';
import {Counter} from "./components/Counter/Counter";
import {Settings} from "./components/Settings/Settings";

function App() {
    const [count, setCount] = useState<number>(0);
    const [maxValue, setMaxValue] = useState<number>(10)
    const [startValue, setStartValue] = useState<number>(0)
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

    return (
        <div className={s.App}>
            <Settings
                MAX_VALUE={maxValue}
                START_VALUE={startValue}
                counterSettings={counterSettings}
            />
            <Counter
                MAX_VALUE={maxValue}
                START_VALUE={startValue}
                count={count}
                increaseCount={increaseCount}
                resetCount={resetCount}/>
        </div>

    );}

export default App;