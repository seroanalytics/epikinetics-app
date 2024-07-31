import React, {useContext} from 'react';
import Plot from 'react-plotly.js';
import {Covariate, PlotConfig} from "~/RootContext";

interface Dat {
    t: number
    me: number
    lo: number
    hi: number
    [index: string]: any
}

interface Props {
    data: Dat[],
    traceVariables: Covariate[]
    traces: { [k: string]: string[] }
    value: string
    plot: PlotConfig
}

function showLegend(traces: Covariate[]) {
    return traces.length > 0
}

function permuteArrays(first, next, ...rest) {
    if (!first) return [];
    if (!next) next = [""];
    if (rest.length) next = permuteArrays(next, ...rest);
    return first.flatMap(a => next.map(b => [a, b].flat()));
}

export default function LocalPlot({data, traceVariables, traces, value, plot}: Props) {

    let traceDatasets = [data];
    let traceDefinitions = permuteArrays(...traceVariables.map(v => traces[v.key]))

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
        return [{
            x: times,
            y: dataset.map(d => d.lo),
            name: seriesName,
            line: {color: "transparent"},
            marker: {color: plot.lineColors[i]},
            showlegend: false,
            type: "scatter",
            mode: "lines"
        }, {
            y: dataset.map(d => d.me),
            x: times,
            name: seriesName,
            type: 'scatter',
            mode: 'lines',
            fill: "tonexty",
            fillcolor: plot.fillColors[i],
            showlegend: showLegend(traceVariables),
            marker: {color: plot.lineColors[i]},
        }, {
            x: times,
            y: dataset.map(d => d.hi),
            name: seriesName,
            line: {width: 0},
            showlegend: false,
            type: "scatter",
            mode: "lines",
            fill: "tonexty",
            fillcolor: plot.fillColors[i],
        }]
    }).flat();

    return <Plot
        data={subsets}
        layout={{
            title: `${value}`,
            legend: {xanchor: 'center', x: 0.5, orientation: 'h'},
            yaxis: {type: "log", dtick: Math.log10(2)}
        }}
        useResizeHandler={true}
        style={{width: "100%", height: "500"}}
    />
}
