import tw from 'twin.macro'
import { Fragment } from 'react'
import { Tab } from '@headlessui/react'
import { Select } from '../Select'

/**
 * HeadlessUI "Tabs"
 * Customized for twin.macro + typescript
 * https://headlessui.dev/react/tabs
 */

type TabItem = {
  id: number
  title: string
  date: string
  commentCount: number
  shareCount: number
}

type TabsProps = {
  title: string
  items: { [key: string]: TabItem[] }
  sidebar: boolean
  tabGroupProps?: {
    as?: React.ElementType
    defaultIndex?: number
    onChange?: () => void
    vertical?: boolean
    manual?: boolean
  }

}

export function Tabs({ title, items, tabGroupProps, sidebar }: TabsProps) {
  if (!items) return null

  return (
    <Tab.Group {...tabGroupProps}>
      <Tab.List tw="flex flex-row justify-between items-center mb-8 mt-5">
        <h1 tw="margin[0] padding[0] font-size[2.2rem]">{title}</h1>
        <div tw="flex space-x-2">
          {Object.keys(items).map(category => (
            <Tab as={Fragment} key={category}>
              {({ selected }) => (
                <button
                  css={[
                    tw`
                      appearnace[none]
                      border[1px solid transparent]
                      py-3
                      px-4
                      font-size[1.2rem]
                      leading-5 
                      font-medium 
                      rounded-lg
                      bg-transparent
                      text-white/75
                      font-weight[500]
                      cursor[pointer]
                      focus:(outline-none ring-2) (ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60)`,
                    selected
                      ? tw`bg-remotelist-60 text-white`
                      : tw`hover:border-remotelist-60`,
                  ]}
                >
                  {category}
                </button>
              )}
            </Tab>
          ))}
        </div>
        
      </Tab.List>
      <Tab.Panels tw="flex flex-row space-x-5 w-full mb-4 border-top[1px solid] border-remotelist-60 pt-5">
        {sidebar && (
          <div tw="flex flex-col text-remotelist-80 min-width[220px] my-4">
            {
              [
                'All',
                'Unread',
                'Upcoming',
                'Expired',
                'Notifications'
              ].map(category => (
                <div tw="font-size[1.2rem] mb-3.5">{category}</div>
              ))
            }
          </div>
        )}
        {Object.values(items).map((group, idx) => (
          <Tab.Panel
            key={idx}
            tw="flex[1] pt-0 focus:(outline-none ring-2) (ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60)"
          >
            <ul tw="list-style[none] m-0 p-0">{group.map(item)}</ul>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}

function item(item: TabItem) {
  return (
    <li key={item.id} className="group" tw="relative py-7 px-5 hover:bg-gray-100/5 border-bottom[1px solid] border-remotelist-60 last:border-bottom[0]">
      <h3 tw="font-size[1.2rem] font-medium leading-5 mt-0 mb-2 group-hover:underline">{item.title}</h3>

      <ul tw="flex mt-2 space-x-1 font-size[1.1rem] font-normal text-remotelist-80 ml-0 p-0 list-style[none]">
        <li>{item.date}</li>
        <li>&middot;</li>
        <li>{item.commentCount} comments</li>
        <li>&middot;</li>
        <li>{item.shareCount} shares</li>
      </ul>

      <a
        href="#"
        tw="absolute inset-0 rounded-md focus:(z-10 outline-none ring-2) ring-blue-400"
      />
    </li>
  )
}
