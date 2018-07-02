import { expect } from "chai";
import * as all from "./index";

describe("something", () => {
  it("some", () => {
    expect(all.hello()).to.be.equal("hello world");
  });
});
