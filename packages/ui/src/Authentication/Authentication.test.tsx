import { Authentication } from "./Authentication";
import { render, screen } from "@testing-library/react";
import { assert, test, describe, expect, it } from "vitest";
import renderer from "react-test-renderer";

const testRenderer = renderer.create(
  <Authentication />
);
// @vitest-environment happy-dom
describe("<Authentication/>", () => {
  it("the title is visible", () => {
    expect(testRenderer.toJSON()).toMatchSnapshot();
    // render(<Footer variant="primary" />);
    // expect(screen.getByText(/hello/i)).toBeTruthy();
  });
});
