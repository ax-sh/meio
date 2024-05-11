import type { GluegunCommand } from 'gluegun'
type Options = 'mask'
const command: GluegunCommand = {
  name: 'rmbg',
  run: async (toolbox) => {
    const { print, system, parameters } = toolbox
    const { parseFilePath } = await import('../libs/parse-file-path')
    const inputFile = parseFilePath(parameters.first)

    const outputFile = inputFile.newFilePath('removed-bg')
    function parseOptions(option: Options) {
      switch (option) {
        case 'mask':
          return '-om'
        default:
          return ''
      }
    }
    const option = parseOptions(parameters.second as Options)

    try {
      const output = await system.run(
        `rembg i ${option} -m u2net_human_seg ${inputFile.path} ${outputFile}`,
      )
      print.info(output)
      print.info(`Done: ${inputFile.path}\n`)
      print.success(outputFile)
    } catch (e) {
      print.error(e)
      print.info(inputFile)
      print.info(`${inputFile.fileExt}, 'Check extention'`)
    }
  },
}

module.exports = command
