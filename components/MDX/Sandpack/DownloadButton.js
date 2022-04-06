/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import React from 'react'
import { useSandpack } from '@codesandbox/sandpack-react'
// import { IconArrowSmall } from '../../Icon/IconArrowSmall';

let initialIsSupported = false

export const DownloadButton = () => {
  const { sandpack } = useSandpack()
  const [supported, setSupported] = React.useState(initialIsSupported)
  React.useEffect(() => {
    // This detection will work in Chrome 97+
    // if (
    //   !supported &&
    //   (HTMLScriptElement as any).supports &&
    //   (HTMLScriptElement as any).supports('importmap')
    // ) {
    //   setSupported(true);
    //   initialIsSupported = true;
    // }
  }, [supported])

  if (!supported) {
    return null
  }

  const downloadHTML = () => {
    const css = sandpack.files['/styles.css']?.code ?? ''
    const code = sandpack.files['/App.js']?.code ?? ''
    const blob = new Blob([
      `<!DOCTYPE html>
<html>
<body>
  <div id="root"></div>
</body>
<!-- This setup is not suitable for production. -->
<!-- Only use it in development! -->
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script type="importmap">
{
  "imports": {
    "react": "https://cdn.skypack.dev/react",
    "react-dom": "https://cdn.skypack.dev/react-dom"
  }
}
</script>
<script type="text/babel" data-type="module">
import React from 'react';
import * as ReactDOM from 'react-dom';

${code.replace('export default ', 'let Root = ')}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
</script>
<style>
${css}
</style>
</html>`,
    ])
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    a.download = 'sandbox.html'
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <button
      className="text-primary dark:text-primary-dark hover:text-link mx-1 inline-flex items-center text-sm transition duration-100 ease-in"
      onClick={downloadHTML}
      title="Download Sandbox"
      type="button"
    >
      Download
    </button>
  )
}
