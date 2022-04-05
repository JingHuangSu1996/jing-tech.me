import { lazy, memo } from 'react'
import CodeBlock from './CodeBlock'
// const CodeBlock = lazy(() => import('./CodeBlock'));

const FallbackComponent = ({ children }) => {
  return (
    <pre className="bg-wash dark:bg-gray-95 flex h-full w-full items-center overflow-hidden overflow-x-auto rounded-lg text-[13.6px] leading-6 shadow-lg">
      <div className="py-[18px] pl-5 font-normal ">
        <p className="sp-pre-placeholder overflow-hidden">{children}</p>
      </div>
    </pre>
  )
}

export default memo(function CodeBlockWrapper(props) {
  return (
    // <Suspense fallback={<FallbackComponent>{children}</FallbackComponent>}>
    <CodeBlock {...props} />
    // </Suspense>
  )
})
