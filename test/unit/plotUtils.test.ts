import {describe, expect, test} from '@jest/globals';
import {permuteArrays} from "../../app/utils/plotUtils";

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