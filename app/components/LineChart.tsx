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
import {useEffect, useState} from "react";

interface Props {
    data: any[],
    history: string
    titre_type: string
}

export const useIsServerSide = () => {
    const [isServerSide, setIsServerSide] = useState(true);

    useEffect(() => {
        setIsServerSide(false);
    }, [setIsServerSide]);

    return isServerSide;
};

export default function LineChart({data, history, titre_type}: Props) {
    const subset = data.filter(entry => (entry.titre_type == titre_type && entry.infection_history == history))
        .map(entry => ({
            ...entry,
            range: [entry.hi, 100]
        }))
    const isServerSide = useIsServerSide();
    if (isServerSide) return null;
    return  <ResponsiveContainer height={200} minHeight={200} initialDimension={{width: 200, height: 200}}>
        <ComposedChart
            isAnimationActive={false}
            id={history + titre_type}
            margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 5,
            }}
        width={100}
        height={100}
        data={subset}>
        <XAxis allowDuplicatedCategory={false} ></XAxis>
        <YAxis></YAxis>
        <Legend/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Area
            type="monotone"
            dataKey="range"
            stroke="none"
            fill="#cccccc"
            connectNulls
            dot={false}
            activeDot={false}
        />
        <Line type="monotone" dot={false} dataKey="me" stroke="#ff00ff" connectNulls/>

        <Tooltip></Tooltip>
    </ComposedChart>
    </ResponsiveContainer>
}
