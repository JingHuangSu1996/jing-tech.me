import cn from 'classnames'

function InlineCode({ isLink, ...props }) {
  return (
    <code
      className={cn(
        'pink-500 text-secondary dark:text-secondary-dark inline rounded-md px-1 text-code font-bold no-underline',
        {
          'bg-gray-30 bg-opacity-10 py-px': !isLink,
          'bg-highlight dark:bg-highlight-dark py-0': isLink,
        }
      )}
      {...props}
    />
  )
}

InlineCode.displayName = 'InlineCode'

export default InlineCode
