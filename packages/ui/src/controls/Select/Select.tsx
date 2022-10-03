import tw, { theme } from 'twin.macro'
import React, { Fragment, useState } from 'react'
import { Listbox } from '@headlessui/react'
import { Transition } from '../../Transition/'
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri'
// import { CheckIcon } from '@heroicons/react/solid';

/**
 * HeadlessUI "Listbox (Select)"
 * Customized for twin.macro + typescript
 * https://headlessui.dev/react/listbox
 */

type ListboxOption = { name: string }

type SelectProps = {
  items: ListboxOption[]
  listboxProps?: {
    as?: React.ElementType
    disabled?: boolean
    value?: string
    onChange?: () => void
    horizontal?: boolean
  }
  listboxOptionsProps?: {
    as?: React.ElementType
    static?: boolean
    unmount?: undefined
  }
}

type OptionProps = {
  label: string
  active: boolean
  selected: boolean
}

export function Select({
  items,
  listboxProps,
  listboxOptionsProps,
}: SelectProps) {
  const [selected, setSelected] = useState(items[0])

  if (items.length === 0) return null

  return (
    <Listbox
      value={selected}
      tw="focus-within:z-10 relative m-0 height[100%]"
      onChange={setSelected}
      {...listboxProps}
    >
      {({ open }) => (
        <div>
          <Label text={selected?.name} open={open} />
          <Transition {...transitionProps}>
            {items.length > 0 && (
              <Listbox.Options
                tw="
                  absolute 
                  w-full 
                  py-2 
                  mt-3
                  pl-0
                  overflow-auto 
                  text-base 
                  bg-remotelist-base
                  rounded-md 
                  shadow-lg 
                  max-h-72
                  ring-1 
                  ring-black 
                  ring-opacity-5 
                  focus:outline-none 
                  sm:text-sm
                  border[1px solid]
                  border-remotelist-80
                "
                {...listboxOptionsProps}
              >
                {items.map(ListboxOption)}
              </Listbox.Options>
            )}
          </Transition>
        </div>
      )}
    </Listbox>
  )
}

function ListboxOption(item: ListboxOption, index: number) {
  return (
    <Listbox.Option as={Fragment} key={index} value={item}>
      {props => <Option label={item.name} {...props} />}
    </Listbox.Option>
  )
}

function Label({ text, open }: { text: string; open: boolean }) {
  return (
    <Listbox.Button 
      style={{
        borderColor: open ? 'white' : theme`colors.remotelist.60`
      }}
      tw="
        relative 
        w-full 
        height[100%]
        pl-4 
        pr-10 
        text-left
        text-white
        bg-remotelist-dark
        border[1px solid]
        rounded-lg 
        shadow-md 
        cursor-default 
        focus:outline-none 
        focus-visible:(
          ring-2 
          ring-opacity-75 
          ring-white 
          ring-offset-orange-300 
          ring-offset-2 
          border-indigo-500
        ) 
      "
    >
      <span tw="block truncate font-size[1rem]">{text}</span>
      <span tw="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        {
          !open ? (
            <RiArrowDownSLine
        css={[
          tw`ml-2 h-5 w-5 text-gray-300 group-hover:text-opacity-80 transition ease-in-out duration-150`,
        ]}
        aria-hidden="true"
      />
          ) : (
            <RiArrowUpSLine
            css={[
              tw`ml-2 h-5 w-5 text-gray-300 group-hover:text-opacity-80 transition ease-in-out duration-150`,
            ]}
            aria-hidden="true"
          />
          )
        }
      </span>
    </Listbox.Button>
  )
}

function Option({ label, active, selected, ...rest }: OptionProps) {
  return (
    <div
      css={[
        tw`cursor-pointer select-none relative py-2 pl-5 pr-4`,
        active && tw`bg-remotelist-60`,
        selected && tw`bg-white text-black`,
      ]}
      {...rest}
    >
      <span
        css={[tw`block truncate text-base `, selected ? tw`font-medium` : tw`font-normal`]}
      >
        {label}
      </span>
      {
      // selected && (
      //   <span
      //     css={[
      //       tw`absolute inset-y-0 left-0 flex items-center pl-3`,
      //       active ? tw`text-amber-600` : tw`text-amber-600`,
      //     ]}
      //   >
      //     {/* <CheckIcon tw="w-5 h-5" aria-hidden="true" /> */}
      //   </span>
      // )
      }
    </div>
  )
}

const transitionProps = {
  leave: tw`transition ease-in duration-100`,
  leaveFrom: tw`opacity-100`,
  leaveTo: tw`opacity-0`,
}
