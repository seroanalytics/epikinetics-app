import React, {useContext} from "react";
import {AppContext, Covariate, PlotConfig, RootContext} from "~/RootContext";
import {Col, Row} from "react-bootstrap";
import LocalPlot from "~/components/LocalPlot";
import useSelectedModel from "~/hooks/useSelectedModel";

interface Dat {
    [index: string]: string | number
}

interface Props {
    data: Dat[],
    facets: { [k: string]: string[] }
    traces: { [k: string]: string[] }
    covariate: Covariate
    value: string,
    parent: string,
    facetVariables: Covariate[],
    traceVariables: Covariate[],
    plot: PlotConfig
}

function Facet({
                   data,
                   facets,
                   traces,
                   covariate,
                   value,
                   parent,
                   facetVariables,
                   traceVariables,
                   plot
               }: Props) {
    const filteredData = data.filter(d => d[covariate.key] == value);
    const otherFacetVariables = facetVariables.filter(v => v.key != covariate.key);
    const nextFacetVariable = otherFacetVariables.pop();
    if (!nextFacetVariable) {
        return <Col><LocalPlot data={filteredData}
                               traceVariables={traceVariables}
                               traces={traces}
                               plot={plot}
                               value={value}
                               parent={parent}></LocalPlot></Col>
    } else {

        const facetValues = facets[nextFacetVariable.key];
        return facetValues.map(v => <Facet
            key={Math.random().toString(36).substring(2, 7)}
            plot={plot}
            data={filteredData}
            facets={facets}
            traces={traces}
            covariate={nextFacetVariable}
            value={v}
            parent={value}
            facetVariables={otherFacetVariables}
            traceVariables={traceVariables}></Facet>)
    }
}

interface ConfigurePlotProps {
    plot: PlotConfig
    data: Dat[]
}

export default function ConfiguredPlot({plot, data}: ConfigurePlotProps) {
    const {state} = useContext<AppContext>(RootContext);
    const [status, selected] = useSelectedModel();
    if (status == 404) {
        return <h1>404</h1>
    }

    if (!selected) {
        return null;
    }

    const {selectedModel, selectedRegressionModel} = selected;
    const variables = [selectedRegressionModel].concat(selectedModel.variables);

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
                                         parent={""}
                                         facetVariables={facetVariables}
                                         traceVariables={traceVariables}></Facet>)}
        </Row>
    } else {
        return <Row><Col><LocalPlot data={data}
                                    traceVariables={traceVariables}
                                    traces={traces}
                                    value={""}
                                    parent={""}
                                    plot={plot}></LocalPlot></Col></Row>
    }
}
