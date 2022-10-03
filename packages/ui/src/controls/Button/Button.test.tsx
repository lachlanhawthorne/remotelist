import { Button } from "./Button";
import { render, screen } from "@testing-library/react";
import { assert, test, describe, expect, it } from "vitest";
import renderer from "react-test-renderer";

const testRenderer = renderer.create(
  <Button variant="primary" />
);
// @vitest-environment happy-dom
describe("<Button/>", () => {
  it("the title is visible", () => {
    expect(testRenderer.toJSON()).toMatchSnapshot();
    // render(<Button variant="primary" />);
    // expect(screen.getByText(/hello/i)).toBeTruthy();
  });
});
