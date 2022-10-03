import { TextInput } from "./TextInput";
import { render, screen } from "@testing-library/react";
import { assert, test, describe, expect, it } from "vitest";
import renderer from "react-test-renderer";

const testRenderer = renderer.create(
  <TextInput type="text" />
);
// @vitest-environment happy-dom
describe("<TextInput/>", () => {
  it("the title is visible", () => {
    expect(testRenderer.toJSON()).toMatchSnapshot();
    // render(<TextInput variant="primary" />);
    // expect(screen.getByText(/hello/i)).toBeTruthy();
  });
});
