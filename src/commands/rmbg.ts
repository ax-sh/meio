import type { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'rmbg',
  run: async (toolbox) => {
    const { print, system, parameters } = toolbox
    const { parseFilePath } = await import('../libs/parse-file-path')
    const inputFile = parseFilePath(parameters.first)
    const outputFile = inputFile.newFilePath('removed-bg')

    try {
      const output = await system.run(
        `rembg i -m u2net_human_seg ${inputFile.path} ${outputFile}`,
      )
      print.info(output)
      print.info(`rembg Done: ${inputFile.path}\n`)
      print.success(outputFile)
    } catch (e) {
      print.error(e)
      print.info(inputFile)
      print.info(`${inputFile.fileExt}, 'rembg: Check extention'`)
    }
  },
}

module.exports = command
