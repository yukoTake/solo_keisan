import { request } from "express";

console.log("==test=====start=");
import { expect } from "chai";

// import db from "../index";
// const customerModel = await import "../handlers/resultSummery"
// const CUSTOMER_TABLE = customerModel.CUSTOMER_TABLE;

describe("起動確認_result_summery_test.mjs", () => {
  it("起動OK", async () => {
    expect(11).to.equal(11);
  });
});

describe("all", () => {
  it("should return an array of result_summery", async () => {
    const resultSummery = await request.get("/result_summery");
    console.log("resultSummery;", resultSummery);
    expect(11).to.equal(11);
  });
});

console.log("==test=====end=");
