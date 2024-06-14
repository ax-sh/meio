import { GluegunCommand } from 'gluegun'
import { ExtendedGluegunToolbox, KnownError } from '../types'

const command: GluegunCommand<ExtendedGluegunToolbox> = {
  name: 'downscale',
  alias: ['ds'],
  run: async (toolbox) => {
    const { print, parameters, filesystem, system } = toolbox
    const input = parameters.first
    const { makeOutputPath } = await import('../libs/make-output-path')
    const { outputPath } = makeOutputPath(input)

    // const out = await system.run(
    //   `ffmpeg -hwaccel cuda -i ${inputPath} -c:v libx265 -preset fast ${outputPath}`,
    // )
    console.log(outputPath)
  },
}

module.exports = command
