// мы задаём структуру нашего единственного объекта-состояния
import counterReducer from "./counterReducer";
import {combineReducers, legacy_createStore} from "redux";

const rootReducer = combineReducers({
    counter: counterReducer
})

export const store = legacy_createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>