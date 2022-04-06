/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import React from 'react'

export const ResetButton = ({ onReset }) => {
  return (
    <button
      className="text-primary dark:text-primary-dark hover:text-link mx-1 inline-flex items-center text-sm transition duration-100 ease-in"
      onClick={onReset}
      title="Reset Sandbox"
      type="button"
    >
      Reset
    </button>
  )
}
