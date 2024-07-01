import {createContext} from "react";

export interface State {
    history: string
    titre_type: string
}

export interface ContextValue {
    state: State
    dispatch: () => void
}

export const initialState = {history: "Facet", titre_type: "Trace"}
export const RootContext = createContext<ContextValue>({state: initialState, dispatch: () => null})

export function rootReducer(oldState, newState): State {
    return {...newState}
}
