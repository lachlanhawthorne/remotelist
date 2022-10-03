import { useState } from "react";
import tw, { css } from "twin.macro";
import { Select } from "../controls/Select/Select";

type PageProps = {
  tabs: any[]
}

export function Page(
  { title, tabs, filters, controls } 
  : { title: string, tabs: any[], filters: boolean, controls?: React.ReactNode }
) {
  const [currentTab, setCurrentTab] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);

  return (
    <div>
      <div tw="flex flex-col border-remotelist-60 mt-4">
        <h1 tw="font-size[2rem] margin[0] pb-8 mb-8 border-bottom[1px solid] border-remotelist-60">{title}</h1>
        {
          filters || tabs.length > 1 ? (
            <div tw="flex flex-row mb-11 justify-between pb-8 border-bottom[1px solid] border-remotelist-60">
              {
                tabs.length > 1 && (
                  <div tw="flex flex-row space-x-4 items-center">
                {tabs.map((tab, i) => (
                  <label tw="flex flex-row items-center" htmlFor={`Tab${i}-${tab.title}`}>
                    <input 
                      type="radio" 
                      tw="hidden appearance[none]" 
                      name="hello" 
                      defaultChecked={i === 0} 
                      className="peer" 
                      id={`Tab${i}-${tab.title}`}
                      onChange={() => {
                        setCurrentSection(0);
                        setCurrentTab(i);
                      }}
                    />
                    <div 
                      tw="
                        appearnace[none]
                        border[1px solid transparent]
                        py-4
                        px-5
                        font-size[1.25rem]
                        text-white
                        leading-5 
                        font-medium 
                        rounded-lg
                        bg-transparent
                        font-weight[500]
                        cursor[pointer]
                        border[1px solid]
                        bg-remotelist-dark
                        focus:(outline-none ring-2) (ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60)
                      "
                      css={[
                        currentTab === i
                          ? tw` border-remotelist-60 bg-remotelist-60`
                          : tw`hover:border-white border-remotelist-60 text-white`
                          
                      ]}
                    >
                      {tab.title}
                    </div>
                  </label>
                  
                ))}
              </div>
                )
              }

              {
                filters && (
                  <Select
                    items={[
                      {
                        name: "All",
                      },
                      {
                        name: "Active",
                      }
                    ]}
                  />
                )
              }
            </div>

          ) : null
        }
      </div>
        

      <div tw="flex flex-row items-start space-x-12 mb-8">
        <div tw="sticky top-8 flex flex-col items-start justify-start font-size[1.3rem]">
          <div tw="pb-6">
            {tabs[currentTab].sections.map((section: any, i: number) => (
              <div 
                tw="w-full min-width[250px] text-remotelist-80 cursor-pointer hover:(text-white border-remotelist-80) border-left[1px solid] border-remotelist-60 pl-5 py-2" 
                onClick={() => setCurrentSection(i)}
                css={[
                  currentSection === i
                    ? tw`border-white text-white`
                    : tw`border-remotelist-60`
                ]}
              >
                {section.title}
              </div>
            ))}
          </div>
          {controls}
        </div>

        <div tw="flex[1]">
          {tabs[currentTab].sections[currentSection].content}
        </div>
      </div>
    </div>
  );
};