import React, {useContext} from 'react';
import Plot from 'react-plotly.js';
import {ContextValue, RootContext, State} from "~/RootContext";

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

const colors = (alpha: string) => [{
    "ancestral": `rgba(204, 102, 119, ${alpha})`,
    "alpha": `rgba(221, 204, 119, ${alpha})`,
    "delta": `rgba(136, 204, 238, ${alpha})`
}, {
    "ancestral": `rgba(136, 34, 85, ${alpha})`,
    "alpha": `rgba(68, 170, 153, ${alpha})`,
    "delta": `rgba(226, 226, 226, ${alpha})`
}]

const colorsSolid = colors("1")
const colorsAlpha = colors("0.3")

function legend(state: State, titre_type: string, history: string) {
    let legendName = "median";
    if (state.titre_type == "Trace") {
        legendName += " " + titre_type.toLowerCase()
    }
    if (state.history == "Trace") {
        legendName += " " + history.toLowerCase()
    }
    return legendName
}

function showLegend(state: State) {
    return state.history == "Trace" || state.history == "Trace"
}

export default function LocalPlot({data, history, titre_type}: Props) {
    const {state} = useContext<ContextValue>(RootContext);


    const allData = data.filter(entry =>
        (state.history == "Trace" || entry.infection_history == history) && (state.titre_type == "Trace" || entry.titre_type == titre_type)
    ).map(entry => ({
        ...entry,
        CI: [entry.hi, entry.lo]
    }));

    const titre_types = [...new Set(allData.map(entry => entry.titre_type))]
    const histories = [...new Set(allData.map(entry => entry.infection_history))]

    const subsets = titre_types.flatMap(t =>
        histories.map(h => {
            const dat = allData.filter(d => (d.titre_type == t && d.infection_history == h))
            const times = dat.map(d => d.t);

            return [{
                x: times,
                y: dat.map(d => d.lo),
                name: legend(state, t, h),
                line: {color: "transparent"},
                marker: {color: colorsSolid[histories.indexOf(h)][t.toLowerCase()]},
                showlegend: false,
                type: "scatter",
                mode: "lines"
            }, {
                y: dat.map(d => d.me),
                x: times,
                name: legend(state, t, h),
                type: 'scatter',
                mode: 'lines',
                fill: "tonexty",
                fillcolor: colorsAlpha[histories.indexOf(h)][t.toLowerCase()],
                showlegend: showLegend(state),
                marker: {color: colorsSolid[histories.indexOf(h)][t.toLowerCase()]},
            }, {
                x: times,
                y: dat.map(d => d.hi),
                name: legend(state, t, h),
                line: {width: 0},
                showlegend: false,
                type: "scatter",
                mode: "lines",
                fill: "tonexty",
                fillcolor: colorsAlpha[histories.indexOf(h)][t.toLowerCase()],
            }]
        })).flat()

    return <Plot
        data={subsets}
        layout={{
            title: `${history} ${titre_type}`,
            legend: {xanchor: 'center', x: 0.5, orientation: 'h'},
            yaxis: {type: "log", dtick: Math.log10(2)}
        }}
        useResizeHandler={true}
        style={{width: "100%", height: "500"}}
    />
}
