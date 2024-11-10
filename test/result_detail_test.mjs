console.log("==test=detail====start=");

import axios from "axios";
import { expect } from "chai";

describe("起動確認_result_detail_test.mjs", () => {
  it("起動OK", async () => {
    expect(11).to.equal(11);
  });
});

describe("all", () => {
  it("should return an array of result_detail", async () => {
    const url = "http://localhost:7000/result_detail/1";
    const resData = await axios.get(url);

    console.log(resData);
    expect(resData.status).to.equal(200);
    expect(resData.data).to.be.an("array");
  });
});
console.log("==test=====end=");
