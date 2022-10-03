import { Hero } from "./Hero";

export const PrimaryHero = () => (
  <Hero />
);

const HeroProps = {
  title: "Hero",
  component: Hero,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/qxzMxzEPoblvQiLRD7D34u/Sinatra-Library?node-id=172%3A562",
    },
  },
}

export default HeroProps