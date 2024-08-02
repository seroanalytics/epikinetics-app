import {createContext} from "react";
import {AppState, Model} from "~/types";

export interface AppContext {
    state: AppState
    dispatch: () => void
}

const biomarkerModel: Model = {
    displayName: "Biomarker Kinetics",
    key: "biomarker",
    datasets: [{
        key: "legacy",
        displayName: "SARS-CoV-2 Legacy Study, Delta Wave"
    }],
    regressionModels: [
        {key: "infection_history", displayName: "Infection history"},
        {key: "last_vax_type", displayName: "Last vaccination type"}
    ],
    plots: [{
        key: "pop_fits",
        displayName: "Population fits",
        type: "line"
    }],
    variables: [{key: "titre_type", displayName: "Titre type"}]
}

export const initialState: AppState = {
    models: [biomarkerModel],
    selectedPlotOptions: {}
}

export const RootContext = createContext<AppContext>({
    state: initialState,
    dispatch: () => null
})

export function rootReducer(oldState: AppState, newState: AppState): AppState {
    return {...newState}
}

export type AppReducer = ReturnType<typeof rootReducer>;
