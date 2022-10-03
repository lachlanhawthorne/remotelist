import { Button, ButtonType } from "./Button";

export const PrimaryButton = () => (
  <Button variant={ButtonType.primary} label="primary"></Button>
);

export const SecondaryButton = () => (
  <Button variant={ButtonType.secondary} label="secondary"></Button>
);

const ButtonProps = {
  title: "Button",
  component: Button,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/qxzMxzEPoblvQiLRD7D34u/Sinatra-Library?node-id=172%3A562",
    },
  },
}

export default ButtonProps