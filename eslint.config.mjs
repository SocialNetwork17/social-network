import pluginQuery from '@tanstack/eslint-plugin-query'
import nextVitals from 'eslint-config-next/core-web-vitals.js'
import nextTs from 'eslint-config-next/typescript.js'

export default [
  ...pluginQuery.configs['flat/recommended'],
  nextVitals,
  nextTs,
  {
    ignores: ['.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
  },
]
