import { Select } from "./Select";
import { render, screen } from "@testing-library/react";
import { assert, test, describe, expect, it } from "vitest";
import renderer from "react-test-renderer";

const testRenderer = renderer.create(
  <Select items={[]} />
);
// @vitest-environment happy-dom
describe("<Select/>", () => {
  it("the title is visible", () => {
    expect(testRenderer.toJSON()).toMatchSnapshot();
    // render(<Select variant="primary" />);
    // expect(screen.getByText(/hello/i)).toBeTruthy();
  });
});
