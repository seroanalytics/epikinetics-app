type PlotDisplay = "facet" | "trace"

export interface Dict<T> {
    [index: string]: T
}

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
