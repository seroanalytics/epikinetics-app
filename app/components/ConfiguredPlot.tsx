import {useContext} from "react";
import {AppContext, Covariate, PlotConfig, RootContext} from "~/RootContext";
import {Col, Row} from "react-bootstrap";
import LocalPlot from "~/components/LocalPlot";

function Facet({
                   data,
                   facets,
                   traces,
                   covariate,
                   value,
                   facetVariables,
                   traceVariables,
                   plot
               }: {
    data: any[],
    facets: { [k: string]: string[] }
    traces: { [k: string]: string[] }
    covariate: Covariate
    value: string,
    facetVariables: Covariate[],
    traceVariables: Covariate[],
    plot: PlotConfig
}) {
    const filteredData = data.filter(d => d[covariate.key] == value);
    const otherFacetVariables = facetVariables.filter(v => v.key != covariate.key);
    if (otherFacetVariables.length == 0) {
        return <Col><LocalPlot data={filteredData}
                               traceVariables={traceVariables}
                               traces={traces}
                               plot={plot}
                               value={value}></LocalPlot></Col>
    } else {
        const nextFacetVariable = otherFacetVariables.pop()!!;
        const facetValues = facets[nextFacetVariable.key];
        return facetValues.map(v => [<h5 className={"text-center"}
                                         key={Math.random().toString(36).substring(2, 7)}>{value}</h5>, <Facet
            key={Math.random().toString(36).substring(2, 7)}
            plot={plot}
            data={filteredData}
            facets={facets}
            traces={traces}
            covariate={nextFacetVariable}
            value={v}
            facetVariables={otherFacetVariables}
            traceVariables={traceVariables}></Facet>])
    }
}


export default function ConfiguredPlot({plot, data}) {
    const {state} = useContext<AppContext>(RootContext);
    const variables = [state.selectedRegressionModel].concat(state.selectedModel.variables);
    const settings = state.selectedPlotOptions[plot.key];

    const facetVariables = variables.filter(v => settings[v.key] == "facet");
    const traceVariables = variables.filter(v => settings[v.key] == "trace");

    const facets = Object.fromEntries(facetVariables.map(v => [v.key, [...new Set(data.map(entry => entry[v.key]))]]));
    const traces = Object.fromEntries(traceVariables.map(v => [v.key, [...new Set(data.map(entry => entry[v.key]))]]));

    if (facetVariables.length > 0) {
        const firstFacet = facetVariables[0];
        const facetValues = facets[firstFacet.key];

        return <Row>
            {facetValues.map(v => <Facet key={v}
                                         plot={plot}
                                         data={data}
                                         facets={facets}
                                         traces={traces}
                                         covariate={firstFacet}
                                         value={v}
                                         facetVariables={facetVariables}
                                         traceVariables={traceVariables}></Facet>)}
        </Row>
    } else {
        return <Row><Col><LocalPlot data={data}
                                    traceVariables={traceVariables}
                                    traces={traces} value={""}
                                    plot={plot}></LocalPlot></Col></Row>
    }
}
