import React from 'react';
import Plot from 'react-plotly.js';
import {Covariate} from "~/RootContext";
import {interpolateBlues, interpolateOranges, interpolatePurples, interpolateGreens} from "d3-scale-chromatic";

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
    traces: { [k: string]: string[] }
    value: string
    parent: string
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

const colorFunctions = [
    interpolateBlues,
    interpolateOranges,
    interpolatePurples,
    interpolateGreens
]

function addOpacity(color) {
    return color.replace(')', ', 0.3)').replace('rgb', 'rgba');
}

function getColors(traces, traceVariables, index, traceDefinition, numTraces) {
    if (traceVariables.length == 0) {
        const color = interpolateOranges(0.5);
        return [color, addOpacity(color)]
    }
    if (traceVariables.length == 1) {
        const color = colorFunctions[index](0.5)
        return [color, addOpacity(color)]
    }
    if (traceVariables.length == 2) {
        const firstTraceVariable = traceDefinition[0];
        const levels = traces[traceVariables[0].key];
        const levelIndex = levels.indexOf(firstTraceVariable);

        const secondTraceVariable = traceDefinition[1];
        const secondLevels = traces[traceVariables[1].key];
        const secondLevelIndex = secondLevels.indexOf(secondTraceVariable);

        const color = colorFunctions[levelIndex]((secondLevelIndex + 1) / secondLevels.length);
        return [color, addOpacity(color)]
    }
    if (traceVariables.length > 2) {
        // at this point the graph becomes quite unreadable anyway, so just let all traces
        // be variations on a color scale
        const color = colorFunctions[0]((index + 1) / numTraces)
        return [color, addOpacity(color)]
    }
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
