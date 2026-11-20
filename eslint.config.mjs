import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypeScript from 'eslint-config-next/typescript'

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypeScript,
  {
    ignores: [
      '.next/',
      'src/migrations/**',
      'src/payload-types.ts',
      'src/payload-generated-schema.ts',
      // The MSIT website, carried over as is (it runs on its own router, so the Next.js link and
      // image rules don't apply). Each part comes back under lint as it moves to CMS data.
      'src/website/**',
    ],
  },
]

export default eslintConfig
