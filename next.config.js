const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

// You might need to insert additional domains in script-src if you are using external services
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' giscus.app www.google-analytics.com vitals.vercel-insights.com www.googletagmanager.com;
  style-src 'self' 'unsafe-inline';
  img-src * blob: data:;
  media-src 'none';
  connect-src * www.google-analytics.com vitals.vercel-insights.com www.googletagmanager.com; 
  font-src 'self';
  frame-src giscus.app open.spotify.com button.like.co like.co 0-18-0-sandpack.codesandbox.io;
`

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  eslint: {
    dirs: ['pages', 'components', 'lib', 'layouts', 'scripts'],
  },
  async redirects() {
    return [
      {
        source: '/2021_interview_learning',
        destination: '/blog/2021_frontend_interview/',
        permanent: true,
      },
      {
        source: '/curry',
        destination: '/blog/curry/',
        permanent: true,
      },
      {
        source: '/function-composition',
        destination: '/blog/function-composition/',
        permanent: true,
      },
      {
        source: '/career-1',
        destination: '/blog/career-1/',
        permanent: true,
      },
      {
        source: '/lenses',
        destination: '/blog/lenses/',
        permanent: true,
      },
      {
        source: '/transduce',
        destination: '/blog/transduce/',
        permanent: true,
      },
      {
        source: '/transduce-2',
        destination: '/blog/transduce-2/',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
  webpack: (config, { dev, isServer }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    if (!dev && !isServer) {
      // Replace React with Preact only in client production build
      Object.assign(config.resolve.alias, {
        'react/jsx-runtime.js': 'preact/compat/jsx-runtime',
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      })
    }

    return config
  },
})
