import React, { useState } from "react";
import tw, { theme } from "twin.macro";

import { 
  GitHub,
  Sun,
  Moon,
  Settings,
  Code
} from "react-feather"

const Container = tw.footer`
  flex
  justify-center
  items-center
  m-0 
  font-size[large]
  border-top[1px solid]
  dark:bg-remotelist-dark
  border-gray-200
  dark:border-remotelist-60
`

const Content = tw.div`
  flex
  items-center
  width[100%]
  max-w-5xl
  flex
  py-6
  justify-between
`

const Row = tw.div`
  flex
  flex-row
`

const ThemeSelectContainer = tw.div`
  relative
  flex
  flex-row
  items-center
  stroke[white]
`

const ThemeSelect = tw.select`
  bg-transparent
  appearance-none
  px-[45px]
  
  text-white
  height[45px]
  border[1px solid]
  border-remotelist-60
  border-radius[0.3rem]
  font-size[inherit]
`

const ThemeIconContainer = tw.div`
  flex
  absolute
  px-4
  last:right[0]
  pointer-events[none]
`

const LinkListContainer = tw.div`
  flex
  flex-col
  space-y-6
  mb-6
`

type FooterLink = {
  title: string;
  href: string;
}


const LinkList = ({ title, links }: { title: string; links: FooterLink[]}) => {
  return (
    <LinkListContainer>
      <h6 tw="text-white text-sm font-medium m-0 uppercase text-remotelist-80">{title}</h6>
      <ul tw="list-style[none] m-0 p-0 space-y-3">
        {links.map(({ title, href }) => (
          <li key={href}>
            <a href={href} tw="text-white cursor-pointer hover:underline">{title}</a>
          </li>
        ))}
      </ul>
    </LinkListContainer>
  )
}

const ThemeSelector = () => {
  const [theme, setTheme] = useState("light");
  const Icon = theme === "system" ? Settings : theme === "light" ? Sun : Moon;

  return (
    <ThemeSelectContainer>
      <ThemeIconContainer>
        <Icon stroke="inherit" size={20} />
      </ThemeIconContainer>
      <ThemeSelect 
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </ThemeSelect>
      <ThemeIconContainer>
        <Code stroke="inherit" size={14} transform="rotate(90)" />
      </ThemeIconContainer>
    </ThemeSelectContainer>
  )
}
export function Footer() {
  return (
    <Container>
      <Content>
        <div tw="flex flex-col w-full">
          <div tw="my-8 pb-6 border-bottom[1px solid] border-remotelist-60">
            <div tw="grid grid-cols-4">
              <LinkList 
                title="Jobs" 
                links={[
                  { title: "Search jobs", href: "https://remotelist.com/industries/education" },
                  { title: "New listings", href: "https://remotelist.com/industries/education" },
                  { title: "Full time jobs", href: "https://remotelist.com/industries/automotive" },
                  { title: "Part time jobs", href: "https://remotelist.com/industries/construction" },
                  { title: "Contract jobs", href: "https://remotelist.com/industries/education" },
                ]} 
              />
              <LinkList 
                title="Industries" 
                links={[
                  { title: "Automotive", href: "https://remotelist.com/industries/automotive" },
                  { title: "Construction", href: "https://remotelist.com/industries/construction" },
                  { title: "Education", href: "https://remotelist.com/industries/education" },
                  { title: "Finance", href: "https://remotelist.com/industries/finance" },
                  { title: "Healthcare", href: "https://remotelist.com/industries/healthcare" },
                  { title: "Hospitality", href: "https://remotelist.com/industries/hospitality" },
                  
                ]} 
              />
              <LinkList 
                title="Locations" 
                links={[
                  { title: "Naarm", href: "/locations/naarm" },
                  { title: "Waarang", href: "/locations/waarang" },
                  { title: "Meanjin", href: "/locations/meanjin" },
                  { title: "Boorloo", href: "/locations/boorloo" },
                ]} 
              />
              <LinkList 
                title="Saved" 
                links={[
                  { title: "Saved jobs", href: "/locations/naarm" },
                  { title: "Saved searches", href: "/locations/waarang" },
                  { title: "Unread saved jobs", href: "/locations/naarm" },
                  { title: "Recent searches", href: "/locations/meanjin" },
                  { title: "Archive", href: "/locations/boorloo" },
                ]} 
              />
            </div>
          </div>
          <div tw="w-full flex flex-row justify-between items-center">
            <Row>
              <GitHub size={18} style={{ marginRight: "0.8rem" }} />
              View on GitHub
            </Row>
            <ThemeSelector />
          </div>
        </div>
      </Content>
    </Container>
  );
};