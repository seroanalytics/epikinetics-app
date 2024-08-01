import React from 'react';
import Plot from 'react-plotly.js';
import {Covariate, Dict} from "~/types";
import {getColors, permuteArrays} from "~/utils/plotUtils";

interface Dat {
    t: number
    me: number
    lo: number
    hi: number

    [index: string]: string | number
}

interface Props {
    data: Dat[],
    traceVariables: Covariate[]
    traces: Dict<string[]>
    value: string
    parent: string
}

function showLegend(traces: Covariate[]) {
    return traces.length > 0
}

export default function LinePlot({data, traceVariables, traces, value, parent}: Props) {

    let traceDatasets = [data];
    const traceDefinitions = permuteArrays(...traceVariables.map(v => traces[v.key]));

    if (traceDefinitions.length > 0) {
        traceDatasets = traceDefinitions.map(td =>
            data.filter(d => {
                let include = true;
                for (let i = 0; i < traceVariables.length; i++) {
                    if (d[traceVariables[i].key] != td[i]) {
                        include = false;
                        break;
                    }
                }
                return include
            })
        );
    }

    const subsets = traceDatasets.map((dataset, i) => {
        const times = dataset.map(d => d.t);
        const seriesName = traceDefinitions.length > 0 ? traceDefinitions[i].join(" ") : "";
        const color = getColors(traces, traceVariables, i, traceDefinitions[i], traceDatasets.length);
        return [{
            x: times,
            y: dataset.map(d => d.lo),
            name: seriesName,
            line: {color: "transparent"},
            marker: {color: color[0]},
            showlegend: false,
            legendgroup: i,
            type: "scatter",
            mode: "lines"
        }, {
            y: dataset.map(d => d.me),
            x: times,
            name: seriesName,
            legendgroup: i,
            type: 'scatter',
            mode: 'lines',
            fill: "tonexty",
            fillcolor: color[1],
            showlegend: showLegend(traceVariables),
            marker: {color: color[0]},
        }, {
            x: times,
            y: dataset.map(d => d.hi),
            name: seriesName,
            line: {width: 0},
            showlegend: false,
            legendgroup: i,
            type: "scatter",
            mode: "lines",
            fill: "tonexty",
            fillcolor: color[1],
        }]
    }).flat();

    return <Plot
        data={subsets}
        layout={{
            title: [parent, value].filter(x => x).join(" - "),
            legend: {xanchor: 'center', x: 0.5, orientation: 'h'},
            yaxis: {type: "log", dtick: Math.log10(2)}
        }}
        useResizeHandler={true}
        style={{minWidth: "400px", width: "100%", height: "500"}}
    />
}
