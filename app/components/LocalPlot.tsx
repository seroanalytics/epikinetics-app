import {ClientOnly} from "remix-utils/client-only"
import LocalPlot from "./LocalPlot.client";

export default () => <ClientOnly>
    {() => (<LocalPlot/>)}
</ClientOnly>
