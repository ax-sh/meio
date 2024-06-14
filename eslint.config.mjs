import pluginJs from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import eslintConfigPrettier from 'eslint-config-prettier'

const ignores = {
  ignores: ['.config/*', 'build/', '.xo-config.js', '.*.js'],
}
const eslintConfigs = [
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended,
  eslintConfigPrettier,
  ignores,
]
export default eslintConfigs
