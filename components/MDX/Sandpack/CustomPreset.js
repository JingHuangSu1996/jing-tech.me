/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import React from 'react'
// @ts-ignore
import { flushSync } from 'react-dom'
import {
  useSandpack,
  useActiveCode,
  SandpackCodeEditor,
  SandpackThemeProvider,
  SandpackReactDevTools,
} from '@codesandbox/sandpack-react'
import scrollIntoView from 'scroll-into-view-if-needed'

import cn from 'classnames'

// import { IconChevron } from 'components/Icon/IconChevron';
import { NavigationBar } from './NavigationBar'
import { Preview } from './Preview'
import { CustomTheme } from './Themes'

export function CustomPreset({ isSingleFile, showDevTools, onDevToolsLoad, devToolsLoaded }) {
  const lineCountRef = React.useRef({})
  const containerRef = React.useRef(null)
  const { sandpack } = useSandpack()
  const { code } = useActiveCode()
  const [isExpanded, setIsExpanded] = React.useState(false)

  const { activePath } = sandpack
  if (!lineCountRef.current[activePath]) {
    lineCountRef.current[activePath] = code.split('\n').length
  }
  const lineCount = lineCountRef.current[activePath]
  const isExpandable = lineCount > 16 || isExpanded

  return (
    <>
      <div className="dark:shadow-lg-dark rounded-lg shadow-lg" ref={containerRef}>
        <NavigationBar showDownload={isSingleFile} />
        <SandpackThemeProvider theme={CustomTheme}>
          <div
            ref={sandpack.lazyAnchorRef}
            className={cn(
              'sp-layout sp-custom-layout',
              showDevTools && devToolsLoaded && 'sp-layout-devtools',
              isExpanded && 'sp-layout-expanded'
            )}
          >
            <SandpackCodeEditor
              showLineNumbers
              showInlineErrors
              showTabs={false}
              showRunButton={false}
            />
            <Preview className="order-last xl:order-2" isExpanded={isExpanded} />
            {isExpandable && (
              <button
                translate="yes"
                className="bg-wash border-b-1 relative top-0 z-10 order-2 flex w-full items-center justify-between rounded-t-none p-1 text-base dark:border-card-dark dark:bg-card-dark xl:order-last"
                onClick={() => {
                  const nextIsExpanded = !isExpanded
                  flushSync(() => {
                    setIsExpanded(nextIsExpanded)
                  })
                  if (!nextIsExpanded && containerRef.current !== null) {
                    scrollIntoView(containerRef.current, {
                      scrollMode: 'if-needed',
                      block: 'nearest',
                      inline: 'nearest',
                    })
                  }
                }}
              >
                <span className="text-primary dark:text-primary-dark flex p-2 focus:outline-none">
                  {isExpanded ? 'Show less' : 'Show more'}
                </span>
              </button>
            )}
          </div>
          {showDevTools && <SandpackReactDevTools onLoadModule={onDevToolsLoad} />}
        </SandpackThemeProvider>
      </div>
    </>
  )
}
