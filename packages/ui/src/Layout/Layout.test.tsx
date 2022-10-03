import { Layout } from "./Layout";
import { render, screen } from "@testing-library/react";
import { assert, test, describe, expect, it } from "vitest";
import renderer from "react-test-renderer";

const testRenderer = renderer.create(
  <Layout />
);
// @vitest-environment happy-dom
describe("<Layout/>", () => {
  it("the title is visible", () => {
    expect(testRenderer.toJSON()).toMatchSnapshot();
    // render(<Layout variant="primary" />);
    // expect(screen.getByText(/hello/i)).toBeTruthy();
  });
});
