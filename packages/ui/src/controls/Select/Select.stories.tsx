import { Select } from "./Select";

export const PrimarySelect = () => (
  <Select items={[]} />
);

const SelectProps = {
  title: "Select",
  component: Select,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/qxzMxzEPoblvQiLRD7D34u/Sinatra-Library?node-id=172%3A562",
    },
  },
}

export default SelectProps