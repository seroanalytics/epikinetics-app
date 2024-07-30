import {ClientOnly} from "remix-utils/client-only"
import Plot from "./LocalPlot.client";

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
    history: string
    titre_type: string
}

export default function LocalPlot(props: Props) {
    return <ClientOnly>
        {() => (<Plot {...props} />)}
    </ClientOnly>
}
