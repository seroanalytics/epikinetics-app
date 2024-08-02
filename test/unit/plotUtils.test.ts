import {describe, expect, test} from '@jest/globals';
import {addOpacity, getColors, permuteArrays} from "../../app/utils/plotUtils";
import {interpolateBlues, interpolateOranges, interpolatePurples, interpolateGreens} from "d3-scale-chromatic";

describe("permuteArrays", () => {

    test("Returns empty array if 0 variables", () => {
        expect(permuteArrays(undefined, undefined)).toEqual([]);
    });

    test("Can build matrix of 1 variable", () => {
        const varA = ["A", "B", "C"];
        expect(permuteArrays(varA, undefined)).toEqual([["A"], ["B"], ["C"]]);
    });

    test("Can build matrix of 2 variables", () => {
        const varA = ["A", "B", "C"];
        const varB = ["1", "2", "3", "4"];
        expect(permuteArrays(varA, varB)).toEqual([
            ["A", "1"],
            ["A", "2"],
            ["A", "3"],
            ["A", "4"],
            ["B", "1"],
            ["B", "2"],
            ["B", "3"],
            ["B", "4"],
            ["C", "1"],
            ["C", "2"],
            ["C", "3"],
            ["C", "4"],
        ]);
    });


    test("Can build matrix of 3 variables", () => {
        const varA = ["A", "B", "C"];
        const varB = ["1", "2"];
        const varC = ["X", "Y"];
        expect(permuteArrays(varA, varB, varC)).toEqual([
            ["A", "1", "X"],
            ["A", "1", "Y"],
            ["A", "2", "X"],
            ["A", "2", "Y"],
            ["B", "1", "X"],
            ["B", "1", "Y"],
            ["B", "2", "X"],
            ["B", "2", "Y"],
            ["C", "1", "X"],
            ["C", "1", "Y"],
            ["C", "2", "X"],
            ["C", "2", "Y"],
        ]);
    });
})

describe("getColors", () => {

    test("Can add opacity to rgb color", () => {
        const rgb = "rgb(1, 1, 1)"
        expect(addOpacity(rgb)).toBe("rgba(1, 1, 1, 0.3)")
    });

    test("If there are no trace variables, color is blue", () => {
        const color = getColors({}, [], 0, [], 1)
        expect(color.line).toBe(interpolateBlues(0.5));
    });

    test("Traces for a single variable all get different colour schemes", () => {
        const traceVariables = [{key: "a", displayName: "A"}];
        const traces = {"a": ["First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh"]};
        const firstColor = getColors(traces, traceVariables, 0, ["First"], 7)
        const secondColor = getColors(traces, traceVariables, 1, ["Second"], 7)
        const thirdColor = getColors(traces, traceVariables, 2, ["Third"], 7)

        const seventhColor = getColors(traces, traceVariables, 6, ["Seventh"], 7)

        expect(firstColor.line).toBe(interpolateBlues(0.2))
        expect(secondColor.line).toBe(interpolateOranges(0.2))
        expect(thirdColor.line).toBe(interpolatePurples(0.2))

        // there are 6 color functions and they get cycled, so here should be back to blue
        expect(seventhColor.line).toBe(interpolateBlues(0.4))
    });

    test("For two variables, traces for the same variable value share a color scheme", () => {
        const traceVariables = [{key: "a", displayName: "A"}, {key: "b", displayName : "B"}];
        const traces = {"a": ["First", "Second", "Third"], "b": ["X", "Y"]};

        // colors for traces where a = First should all be on blue scale
        let color = getColors(traces, traceVariables, 0, ["First", "X"], 6)
        expect(color.line).toBe(interpolateBlues(1/2)); // 1/2 because there are just 2 factor levels for b

        color = getColors(traces, traceVariables, 1, ["First", "Y"], 6)
        expect(color.line).toBe(interpolateBlues(1));

        // colors for traces where a = Second should all be on orange scale
        color = getColors(traces, traceVariables, 2, ["Second", "X"], 6)
        expect(color.line).toBe(interpolateOranges(1/2));

        color = getColors(traces, traceVariables, 3, ["Second", "Y"], 6)
        expect(color.line).toBe(interpolateOranges(1));

        // colors for traces where a = Third should all be on purple scale
        color = getColors(traces, traceVariables, 4, ["Third", "X"], 6)
        expect(color.line).toBe(interpolatePurples(1/2));

        color = getColors(traces, traceVariables, 5, ["Third", "Y"], 6)
        expect(color.line).toBe(interpolatePurples(1));
    });

    test("For three variables, all traces share a color scheme", () => {
        const traceVariables = [{key: "a", displayName: "A"}, {key: "b", displayName : "B"}, {key: "c", displayName: "C"}];
        const traces = {"a": ["First", "Second", "Third"], "b": ["X", "Y"], "c": ["1"]};

        let color = getColors(traces, traceVariables, 0, ["First", "X", "1"], 6)
        expect(color.line).toBe(interpolateBlues(1/6)); // 1/6 because there are 6 traces in total

        color = getColors(traces, traceVariables, 1, ["First", "Y", "1"], 6)
        expect(color.line).toBe(interpolateBlues(2/6));

        color = getColors(traces, traceVariables, 2, ["Second", "X", "1"], 6)
        expect(color.line).toBe(interpolateBlues(3/6));

        color = getColors(traces, traceVariables, 3, ["Second", "Y", "1"], 6)
        expect(color.line).toBe(interpolateBlues(4/6));

        color = getColors(traces, traceVariables, 4, ["Third", "X", "1"], 6)
        expect(color.line).toBe(interpolateBlues(5/6));

        color = getColors(traces, traceVariables, 5, ["Third", "Y", "1"], 6)
        expect(color.line).toBe(interpolateBlues(6/6));
    });
});
