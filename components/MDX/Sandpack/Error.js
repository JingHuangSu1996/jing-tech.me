/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import React from 'react'

export function Error({ error }) {
  const { message, title } = error

  return (
    <div className={'border-red-40 rounded-lg border-2 bg-white p-6'}>
      <h2 className="text-red-40 mb-4 text-xl">{title || 'Error'}</h2>
      <pre className="text-secondary whitespace-pre-wrap break-words">{message}</pre>
    </div>
  )
}
