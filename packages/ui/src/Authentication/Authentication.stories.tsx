import { Authentication } from "./Authentication";

export const PrimaryFooter = () => (
  <Authentication />
);

const AuthenticationProps = {
  title: "Authentication",
  component: Authentication,
  // parameters: {
  //   design: {
  //     type: "figma",
  //     url: "https://www.figma.com/file/qxzMxzEPoblvQiLRD7D34u/Sinatra-Library?node-id=172%3A562",
  //   },
  // },
}

export default AuthenticationProps