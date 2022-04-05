import Pre from '@/components/Pre'
import React from 'react'
import {
  Sandpack,
  SandpackCodeViewer,
  SandpackProvider,
  SandpackThemeProvider,
} from '@codesandbox/sandpack-react'

const CodeBlock = function CodeBlock(props) {
  const { className = '', children, live } = props
  const language = className.substring(9)
  const filename = '/index.' + language
  let codeSnippets = React.Children.toArray(children)
  console.log(live)

  if (live) {
    return (
      <div
        translate="no"
        className="bg-wash dark:bg-gray-95 flex h-full w-full items-center overflow-x-auto rounded-lg shadow-lg"
      >
        <SandpackProvider
          customSetup={{
            entry: filename,
            files: {
              [filename]: {
                code: children?.toString(),
              },
            },
          }}
        >
          <SandpackThemeProvider>
            <SandpackCodeViewer key={String(children).trimEnd()} showLineNumbers={false} />
          </SandpackThemeProvider>
        </SandpackProvider>
      </div>
    )
  }
  return <Pre {...props} />
}

export default CodeBlock
