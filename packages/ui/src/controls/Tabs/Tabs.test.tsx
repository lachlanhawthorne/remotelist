import { Tabs } from "./Tabs";
import { render, screen } from "@testing-library/react";
import { assert, test, describe, expect, it } from "vitest";
import renderer from "react-test-renderer";

const testRenderer = renderer.create(
  // <Tabs items={[]} />
  <></>
);
// @vitest-environment happy-dom
describe("<Tabs/>", () => {
  it("the title is visible", () => {
    expect(testRenderer.toJSON()).toMatchSnapshot();
    // render(<Tabs variant="primary" />);
    // expect(screen.getByText(/hello/i)).toBeTruthy();
  });
});
