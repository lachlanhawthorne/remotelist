import { Popover } from "./Popover";
import { render, screen } from "@testing-library/react";
import { assert, test, describe, expect, it } from "vitest";
import renderer from "react-test-renderer";

const testRenderer = renderer.create(
  <Popover items={[]} label="" />
);
// @vitest-environment happy-dom
describe("<Popover/>", () => {
  it("the title is visible", () => {
    expect(testRenderer.toJSON()).toMatchSnapshot();
    // render(<Popover variant="primary" />);
    // expect(screen.getByText(/hello/i)).toBeTruthy();
  });
});
