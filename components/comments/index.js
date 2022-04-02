import siteMetadata from '@/data/siteMetadata'
import dynamic from 'next/dynamic'

const OPEN_TOGGLE = false

const UtterancesComponent = dynamic(
  () => {
    return import('@/components/comments/Utterances')
  },
  { ssr: false }
)
const GiscusComponent = dynamic(
  () => {
    return import('@/components/comments/Giscus')
  },
  { ssr: false }
)
const DisqusComponent = dynamic(
  () => {
    return import('@/components/comments/Disqus')
  },
  { ssr: false }
)

const Comments = ({ frontMatter }) => {
  let term
  const comment = siteMetadata?.comment

  if (!OPEN_TOGGLE) {
    return null
  }

  if (!comment || Object.keys(comment).length === 0) return <></>
  switch (
    siteMetadata.comment.giscusConfig.mapping ||
    siteMetadata.comment.utterancesConfig.issueTerm
  ) {
    case 'pathname':
      term = frontMatter.slug
      break
    case 'url':
      term = window.location.href
      break
    case 'title':
      term = frontMatter.title
      break
  }
  return (
    <div id="comment">
      {OPEN_TOGGLE ? (
        <>
          {siteMetadata.comment && siteMetadata.comment.provider === 'giscus' && (
            <GiscusComponent mapping={term} />
          )}
          {siteMetadata.comment && siteMetadata.comment.provider === 'utterances' && (
            <UtterancesComponent issueTerm={term} />
          )}
          {siteMetadata.comment && siteMetadata.comment.provider === 'disqus' && (
            <DisqusComponent frontMatter={frontMatter} />
          )}
        </>
      ) : null}
    </div>
  )
}

export default Comments
