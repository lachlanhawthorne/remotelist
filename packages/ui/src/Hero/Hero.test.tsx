import { Hero } from "./Hero";
import { render, screen } from "@testing-library/react";
import { assert, test, describe, expect, it } from "vitest";
import renderer from "react-test-renderer";

const testRenderer = renderer.create(
  <Hero />
);
// @vitest-environment happy-dom
describe("<Hero/>", () => {
  it("the title is visible", () => {
    expect(testRenderer.toJSON()).toMatchSnapshot();
    // render(<Hero variant="primary" />);
    // expect(screen.getByText(/hello/i)).toBeTruthy();
  });
});
