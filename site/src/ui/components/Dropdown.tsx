'use client'
import { Button } from './Button'
import { Icon, IconName } from './Icon-component'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

type Props<T> = {
  ariaLabel: string
  selected: T
  options: readonly { label: string; value: T; icon: IconName }[]
  onSelect: (value: T) => void
  className?: string
}
export function Dropdown<T>(props: Props<T>) {
  const { ariaLabel, selected, options, onSelect } = props
  const selectedOption = options.find((o) => o.value === selected)!
  return (
    <DropdownMenu.Root>
      <style>
        {`
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
  
        .DropdownContent[data-state=closed] {
          animation: fadeOut 150ms ease-out;
        }
          `}
      </style>
      <DropdownMenu.Trigger asChild className={props.className}>
        <Button aria-label={ariaLabel} className="pl-3 pr-1">
          <Icon
            name={selectedOption.icon}
            width={16}
            height={16}
            className="mr-1.5 stroke-gray-600 dark:stroke-gray-400"
          />
          <span className="pr-1">{selectedOption.label}</span>
          <Icon
            name="chevron-down"
            width={16}
            height={16}
            className="mr-1 stroke-gray-600 dark:stroke-gray-400"
          />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={10}
          className={`DropdownContent bg-body rounded-lg border border-gray-300 p-1 text-sm dark:border-gray-800`}
        >
          {options.map((option, idx) => (
            <DropdownMenu.Item
              key={idx}
              className="flex flex-row items-center rounded stroke-gray-600 py-2 pl-2 pr-12 font-medium text-gray-700 hover:bg-gray-800 hover:stroke-gray-50 hover:text-gray-50 dark:stroke-gray-400 dark:text-gray-400 dark:hover:bg-gray-50 dark:hover:stroke-gray-800 dark:hover:text-gray-800"
              onSelect={() => onSelect(option.value)}
            >
              <Icon
                name={option.icon}
                width={24}
                height={24}
                className="mr-1 pr-1"
              />
              {option.label}
            </DropdownMenu.Item>
          ))}
          <DropdownMenu.Arrow className="fill-gray-200 dark:fill-gray-800" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
