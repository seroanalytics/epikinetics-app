import {ClientOnly} from "remix-utils/client-only"
import Plot from "./LocalPlot.client";
import {Covariate, PlotConfig} from "~/RootContext";

interface Dat {
    t: number
    me: number
    lo: number
    hi: number
    titre_type: string
    infection_history: string
}

interface Props {
    data: Dat[],
    traceVariables: Covariate[]
    value: string
    traces:  { [k: string]: string[] }
    plot: PlotConfig
}

export default function LocalPlot(props: Props) {
    return <ClientOnly>
        {() => (<Plot {...props} />)}
    </ClientOnly>
}
