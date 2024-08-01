import {createContext} from "react";

type PlotDisplay = "facet" | "trace"

export interface PlotOptions {
    [index: string]: PlotDisplay
}

export interface PlotConfig {
    key: string
    displayName: string
    type: string,
    lineColors?: any
    fillColors?: any
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
        {key: "last_exp_type", displayName: "Last exposure type"}
    ],
    plots: [{
        key: "pop_fits",
        displayName: "Population fits",
        type: "line",
        lineColors: [
            `rgba(204, 102, 119, 1)`,
            `rgba(221, 204, 119, 1)`,
            `rgba(136, 204, 238, 1)`,
            `rgba(136, 34, 85, 1)`,
            `rgba(68, 170, 153, 1)`,
            `rgba(226, 226, 226, 1)`]
        ,
        fillColors: [
            `rgba(204, 102, 119, 0.3)`,
            `rgba(221, 204, 119, 0.3)`,
            `rgba(136, 204, 238, 0.3)`,
            `rgba(136, 34, 85, 0.3)`,
            `rgba(68, 170, 153, 0.3)`,
            `rgba(226, 226, 226, 0.3)`

        ]
    }],
    variables: [{key: "titre_type", displayName: "Titre type"}]
}

export function initialState(): AppState {
    const models = [biomarkerModel];
    return {
        models: models,
        selectedPlotOptions: {}
    }
}

export const RootContext = createContext<AppContext>({
    state: initialState(),
    dispatch: () => null
})

export function rootReducer(oldState, newState): AppState {
    return {...newState}
}
