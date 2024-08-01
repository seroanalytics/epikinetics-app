import {ClientOnly} from "remix-utils/client-only"
import {Covariate, PlotConfig} from "~/RootContext";
import LinePlot from "./LinePlot.client";
import {createElement} from "react";

interface Dat {
    [index: string]: string | number
}

function PlotByType(type: string, props: Props) {
    if (type == "line") {
        return createElement(LinePlot, props)
    }
}

interface Props {
    data: Dat[],
    traceVariables: Covariate[]
    value: string
    parent: string
    traces:  { [k: string]: string[] }
    plot: PlotConfig
}

export default function LocalPlot(props: Props) {
    return <ClientOnly>
        {() => PlotByType(props.plot.type, props)}
    </ClientOnly>
}
