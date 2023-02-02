export type StateType = {
    count: number,
    maxValue: number,
    startValue: number,
    page: PageType
}

type PageType = 'settings' | 'counter' | 'error'

export const initialState:StateType = {count: 0, maxValue: 10, startValue: 0, page: 'counter'}

const counterReducer = (state: StateType = initialState, action: ActionsType): StateType => {
switch (action.type) {
    case 'INC-COUNT':
        /*localStorage.setItem('counterValue', JSON.stringify({...state, count: state.count+1}))*/
        return (state.count < state.maxValue)? {...state, count: state.count + 1}:state
    case 'RESET-COUNT':
        return {...state, count: state.startValue}
    case 'CHANGE-START-VALUE':
        return (action.payload.start >= state.maxValue || action.payload.start < 0 || state.maxValue < 1)?
       {...state, startValue: action.payload.start, page: 'error'} : {...state, startValue: action.payload.start, page: 'settings'}
    case 'CHANGE-MAX-VALUE':
        return (action.payload.max <= state.startValue || action.payload.max < 1 || state.startValue < 0)?
            {...state, maxValue: action.payload.max, page: 'error'} : {...state, maxValue: action.payload.max, page: 'settings'}
    case 'COUNTER-SETTINGS':
        /*localStorage.setItem('counterState', JSON.stringify({
            startValue: state.startValue, maxValue: state.maxValue, count: state.startValue, page: 'counter'
        }))*/
        return {...state, count: state.startValue, page: 'counter'}
        default:
            return state

}}

export type ActionsType = ReturnType <typeof increaseCountAC> |
    ReturnType <typeof resetCountAC> |
    ReturnType <typeof changeStartValueAC> |
    ReturnType <typeof changeMaxValueAC> |
    ReturnType <typeof counterSettingsAC>

export const increaseCountAC = () => ({
    type: 'INC-COUNT'
}) as const
export const resetCountAC = () => ({
    type: 'RESET-COUNT'
}) as const
export const changeStartValueAC = (start: number) => ({
    type: 'CHANGE-START-VALUE',
    payload: {start}
}) as const
export const changeMaxValueAC = (max: number) => ({
    type: 'CHANGE-MAX-VALUE',
    payload: {max}
}) as const
export const counterSettingsAC = () => ({
    type: 'COUNTER-SETTINGS'
}) as const

export default counterReducer