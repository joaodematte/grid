/**
 * {@type require('prettier').Config}
 */
module.exports = {
  plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
  tabWidth: 2,
  printWidth: 120,
  singleQuote: true,
  trailingComma: 'none',
  bracketSameLine: false,
  semi: true,
  quoteProps: 'consistent',
  importOrder: ['<THIRD_PARTY_MODULES>', '^@/', '^~/', '', '^[../]', '^[./]'],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '5.5.3'
};
