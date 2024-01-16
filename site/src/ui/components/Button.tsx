import React from 'react'

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
>((props, ref) => (
  <button
    {...props}
    ref={ref}
    className={
      `flex flex-row items-center rounded border border-gray-300
            px-3 py-2 text-sm font-semibold tracking-wide text-gray-600
            hover:bg-gray-200 active:border-gray-400 active:bg-gray-300 disabled:bg-gray-200 disabled:text-gray-400 dark:border-gray-700 dark:text-gray-400
            dark:hover:bg-gray-800 dark:active:border-gray-600 active:dark:bg-gray-700 
            dark:disabled:bg-gray-800 dark:disabled:text-gray-600 ` +
      props.className
    }
  />
))
