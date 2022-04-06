/* eslint-disable react/display-name */
import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import Image from './Image'
import CustomLink from './Link'
import TOCInline from './TOCInline'
import { BlogNewsletterForm } from './NewsletterForm'
import CodeBlock from './MDX/CodeBlock'
import Sandpack from './MDX/Sandpack'
import InlineCode from './MDX/InlineCode'

export const MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  inlineCode: InlineCode,
  pre: (p) => <div {...p} />,
  code: CodeBlock,
  BlogNewsletterForm: BlogNewsletterForm,
  wrapper: ({ components, layout, ...rest }) => {
    const Layout = require(`../layouts/${layout}`).default
    return <Layout {...rest} />
  },
  Sandpack: Sandpack,
}

export const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource])

  return <MDXLayout layout={layout} components={MDXComponents} {...rest} />
}
