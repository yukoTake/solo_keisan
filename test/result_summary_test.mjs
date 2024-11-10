console.log("==test=summary====start=");
// import { request } from "express";
// import { expect } from "chai";
//
// describe("起動確認_result_summery_test.mjs", () => {
//   it("起動OK", async () => {
//     expect(11).to.equal(11);
//   });
// });
//
// describe("all", () => {
//   it("should return an array of result_summery", async () => {
//     const resData = await request.get("/result_summary/1");
//     console.log("resData;", resData);
//     expect(resData).to.have.status(200);
//     expect(resData).to.be.an("array");
//   });
// });

import axios from "axios";
import { expect } from "chai";

describe("起動確認_result_summery_test.mjs", () => {
  it("起動OK", async () => {
    expect(11).to.equal(11);
  });
});

describe("all", () => {
  it("should return an array of result_summery", async () => {
    const url = "http://localhost:7000/result_summary/1";
    const resData = await axios.get(url);

    // console.log(resData);
    expect(resData.status).to.equal(200);
    expect(resData.data).to.be.an("array");
  });
});
console.log("==test=====end=");
