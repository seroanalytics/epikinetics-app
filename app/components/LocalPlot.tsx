import {ClientOnly} from "remix-utils/client-only"
import Plot from "./LocalPlot.client";
import {Covariate, PlotConfig} from "~/RootContext";

interface Dat {
    [index: string]: string | number
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
        {() => (<Plot {...props} />)}
    </ClientOnly>
}
