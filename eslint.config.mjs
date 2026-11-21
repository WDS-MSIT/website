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
    ],
  },
  {
    // The MSIT website runs on its own client-side router, not the Next.js App Router. It uses
    // plain <img> elements for CMS media and legacy image URLs, and its animation-heavy pages
    // predate the React Compiler lint rules. Keep TypeScript and correctness rules enabled.
    files: ['src/website/**/*.{ts,tsx}'],
    rules: {
      '@next/next/no-html-link-for-pages': 'off',
      '@next/next/no-img-element': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'react/no-unescaped-entities': 'off',
      'react-hooks/purity': 'off',
      'react-hooks/refs': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/static-components': 'off',
    },
  },
]

export default eslintConfig
