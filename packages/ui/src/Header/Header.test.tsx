import { Header } from "./Header";
import { render, screen } from "@testing-library/react";
import { assert, test, describe, expect, it } from "vitest";
import renderer from "react-test-renderer";

const testRenderer = renderer.create(
  <Header />
);
// @vitest-environment happy-dom
describe("<Header/>", () => {
  it("the title is visible", () => {
    expect(testRenderer.toJSON()).toMatchSnapshot();
    // render(<Header variant="primary" />);
    // expect(screen.getByText(/hello/i)).toBeTruthy();
  });
});
