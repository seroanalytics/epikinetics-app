import {createContext} from "react";

type PlotDisplay = "facet" | "trace"

export interface PlotOptions {
    [index: string]: PlotDisplay
}

export interface PlotConfig {
    key: string
    displayName: string
    type: string
}

export interface Model {
    key: string
    displayName: string
    datasets: Dataset[]
    regressionModels: Covariate[]
    plots: PlotConfig[]
    variables: Covariate[]
}

export interface Dataset {
    key: string
    displayName: string
}

export interface Covariate {
    displayName: string
    key: string
}

export interface AppState {
    models: Model[]
    selectedPlotOptions: { [index: string]: PlotOptions }
}

export interface AppContext {
    state: AppState
    dispatch: () => void
}

const biomarkerModel: Model = {
    displayName: "Biomarker Kinetics",
    key: "biomarker",
    datasets: [{
        key: "legacy",
        displayName: "SARS-CoV2-legacy"
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
