//  Stai usando il nuovo formato ESLint Flat Config 
// (eslint.config.js o eslint.config.mjs) con FlatCompat per Next.js.

import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
    baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'public/**',
      'build/**',
      // aggiungi altre cartelle o file da ignorare
    ],
    rules: {
      // Trasforma in un semplice warning l'errore sulle variabili non usate
     'no-unused-vars': 'warn',
      // disattiva duplicati
      '@typescript-eslint/no-unused-vars': 'off',     
    },
  },
]

export default eslintConfig
