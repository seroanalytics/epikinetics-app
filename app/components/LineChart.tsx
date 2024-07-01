import {
    Area,
    CartesianGrid,
    ComposedChart,
    Legend,
    Line,
    XAxis,
    YAxis,
    Tooltip, ResponsiveContainer
} from "recharts";
import React, {useContext, useEffect, useReducer, useState} from "react";
import {ContextValue, RootContext, rootReducer, State} from "../RootContext";

interface Props {
    data: any[],
    history: string
    titre_type: string
}

const colors = {
    "ancestral": "#CC6677",
    "alpha": "#DDCC77",
    "delta": "#88CCEE"
}
// "#882255",
// "#44AA99",
// "#e2e2e2",
// "#D95F02",
// "#66A61E"


export const useIsServerSide = () => {
    const [isServerSide, setIsServerSide] = useState(true);

    useEffect(() => {
        setIsServerSide(false);
    }, [setIsServerSide]);

    return isServerSide;
};

export default function LineChart({data, history, titre_type}: Props) {
    const {state} = useContext<ContextValue>(RootContext);
    const allData = data.filter(entry =>
        (state.history == "Trace" || entry.infection_history == history) && (state.titre_type == "Trace" || entry.titre_type == titre_type)
    ).map(entry => ({
        ...entry,
        range: [entry.hi, entry.lo]
    }));

    const xLim = Math.max.apply(null, allData.map(d => d.t))

    const titre_types = [...new Set(allData.map(entry => entry.titre_type))]
    const histories = [...new Set(allData.map(entry => entry.infection_history))]

    const subsets = titre_types.flatMap(t =>
        histories.map(h => ({idx: [t, h], data: allData.filter(d => (d.titre_type == t && d.infection_history == h))})))
    const isServerSide = useIsServerSide();
    if (isServerSide) return null;
    return [<h5 key={"title" + history + titre_type}>{history} {titre_type}</h5>,
        <ResponsiveContainer key={"graph" + history + titre_type} height={200} minHeight={200}
                             initialDimension={{
                                 width: 200,
                                 height: 200
                             }}><ComposedChart
            isAnimationActive={false}
            id={history + titre_type}
            margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 5,
            }}
            width={100}
            height={100}>
            <YAxis></YAxis>
            <Legend/>
            <CartesianGrid strokeDasharray="3 3"/>
            {
                subsets.map(({idx, data}, num) => [
                    <XAxis key={idx.join("x")} dataKey="t"
                           allowDuplicatedCategory={false}
                           xAxisId={idx.join("x")} hide={num > 0}></XAxis>,
                    <Area
                        xAxisId={idx.join("x")}
                        key={idx.join("area")}
                        type="monotone"
                        dataKey="range"
                        stroke="none"
                        fill={colors[idx[0].toLowerCase()]}
                        fillOpacity={0.3}
                        connectNulls
                        dot={false}
                        activeDot={false}
                        data={data}
                    />,
                    <Line key={idx.join("line")}
                          xAxisId={idx.join("x")}
                          type="monotone"
                          dot={false}
                          dataKey="me"
                          data={data}
                          stroke={colors[idx[0].toLowerCase()]}
                          connectNulls/>])
            }
            <Tooltip></Tooltip>
        </ComposedChart>
        </ResponsiveContainer>]

}
