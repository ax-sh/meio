import { GluegunCommand } from 'gluegun'
import { ExtendedGluegunToolbox, KnownError } from '../../types'

const command: GluegunCommand<ExtendedGluegunToolbox> = {
  name: 'x265',
  run: async (toolbox) => {
    const { print, parameters, filesystem, system } = toolbox
    const input = parameters.first
    if (!input) throw new KnownError('filePath is empty')
    const { makeOutputPath } = await import('../../libs/make-output-path')
    const { outputPath, inputPath } = makeOutputPath(input)
    const timer = toolbox.system.startTimer()
    const cmd = `ffmpeg -hide_banner -hwaccel cuda -i "${inputPath}" -c:v libx265 -preset fast "${outputPath}"`

    console.log(`That just took ${timer()} ms.`)
    print.success(cmd)
  },
}

module.exports = command
