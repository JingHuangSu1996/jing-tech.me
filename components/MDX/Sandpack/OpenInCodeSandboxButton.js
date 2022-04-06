/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import React from 'react'
import { UnstyledOpenInCodeSandboxButton } from '@codesandbox/sandpack-react'

export const OpenInCodeSandboxButton = () => {
  return (
    <UnstyledOpenInCodeSandboxButton
      className="text-primary dark:text-primary-dark hover:text-link mx-1 ml-3 inline-flex items-center text-sm transition duration-100 ease-in md:ml-1"
      title="Open in CodeSandbox"
    >
      <span className="hidden md:block">Fork</span>
    </UnstyledOpenInCodeSandboxButton>
  )
}
