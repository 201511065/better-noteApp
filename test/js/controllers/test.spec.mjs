import {solution} from "./test.mjs";
import assert from "assert";

const testCase = [
  { brown:10, yellow:2, expected_value:[4, 3] },
  { brown:8, yellow:1, expected_value:[3, 2] },
  { brown:24, yellow:24, expected_value:[8, 6] }
];

describe("test.js 알고리즘 실행 결과", () => {
  testCase.forEach(({brown, yellow, expected_value},index) => {
    const result = JSON.stringify(solution(brown, yellow));
    const expect = JSON.stringify(expected_value)
    const check = (result, expect)=>{
      assert.strictEqual(result, expect);
    }
    it("test_case "+index, () => {
      check(result,expect);
    })
  });
});
