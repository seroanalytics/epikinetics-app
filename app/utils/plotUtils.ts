import {interpolateBlues, interpolateOranges, interpolatePurples, interpolateGreens} from "d3-scale-chromatic";
import {Covariate, Dict} from "~/types";

// @ts-expect-error this function doesn't lend itself well to typing
export function permuteArrays(first, next, ...rest) {
    if (!first) return [];
    if (!next) return first.map(a => [a]);
    if (rest.length) next = permuteArrays(next, ...rest);
    return first.flatMap(a => next.map(b => [a, b].flat()));
}

const colorFunctions = [
    interpolateBlues,
    interpolateOranges,
    interpolatePurples,
    interpolateGreens
]

function addOpacity(color: string) {
    return color.replace(')', ', 0.3)').replace('rgb', 'rgba');
}

export function getColors(traces: Dict<string[]>,
                          traceVariables: Covariate[],
                          index: number,
                          traceDefinition: string[],
                          numTraces: number) {
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
