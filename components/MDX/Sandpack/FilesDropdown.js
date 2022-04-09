/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import React from 'react'
import cn from 'classnames'
import { useSandpack } from '@codesandbox/sandpack-react'
import { Listbox } from '@headlessui/react'

const getFileName = (filePath) => {
  const lastIndexOfSlash = filePath.lastIndexOf('/')
  return filePath.slice(lastIndexOfSlash + 1)
}

export function FilesDropdown() {
  const { sandpack } = useSandpack()
  const { openPaths, setActiveFile, activePath } = sandpack
  return (
    <Listbox value={activePath} onChange={setActiveFile}>
      <Listbox.Button>
        {({ open }) => (
          <span
            className={cn(
              'text-link dark:text-link-dark border-link dark:border-link-dark text-md mt-px -mb-px flex h-full items-center truncate border-b-2 py-2 px-1 leading-tight'
            )}
            style={{ maxWidth: '160px' }}
          >
            {getFileName(activePath)}
          </span>
        )}
      </Listbox.Button>
      <Listbox.Options className="bg-card border-1 border-border dark:border-border-dark absolute left-0 right-0 mx-0 mt-0.5 rounded-sm rounded-b-lg px-2 shadow-md dark:bg-card-dark">
        {openPaths.map((filePath) => (
          <Listbox.Option
            key={filePath}
            value={filePath}
            className={cn(
              'text-md mx-2 my-4 cursor-pointer',
              filePath === activePath && 'text-link dark:text-link-dark'
            )}
          >
            {getFileName(filePath)}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  )
}
