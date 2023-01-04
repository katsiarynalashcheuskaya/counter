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
    }, [])

    useEffect(()=>{
        localStorage.setItem('counterValue', JSON.stringify(count))
    }, [count])

    useEffect(() => {
        let valueAsString = localStorage.getItem('counterMax')
        if (valueAsString) {
            setMaxValue(JSON.parse(valueAsString))
        }
    }, [])

    useEffect(() => {
        let valueAsString = localStorage.getItem('counterStart')
        if (valueAsString) {
            setStartValue(JSON.parse(valueAsString))
        }
    }, [])


    const increaseCount = () => {
        if (count < maxValue && count >= startValue) {
            setCount(count + 1)
        }
    }
    const resetCount = () => {
        setCount(startValue)
    }

    const counterMaxValue = (newMaxValue: number) => {
        setMaxValue(newMaxValue)
    }
    const counterStartValue = (newStartValue: number) => {
        setStartValue(newStartValue)
    }
    const counterSettings = () => {
        localStorage.setItem('counterMax', JSON.stringify(maxValue))
         localStorage.setItem('counterStart', JSON.stringify(startValue))
    }

    return (
        <div className={s.App}>
            <Settings
                MAX_VALUE={maxValue}
                START_VALUE={startValue}
                counterMaxValue={counterMaxValue}
                counterStartValue={counterStartValue}
                counterSettings={counterSettings}
            />
            <Counter
                MAX_VALUE={maxValue}
                START_VALUE={startValue}
                count={count}
                increaseCount={increaseCount}
                resetCount={resetCount}/>
        </div>

    );
}

export default App;