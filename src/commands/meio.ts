import { GluegunCommand } from 'gluegun'
import { ExtendedGluegunToolbox } from '../types'

const command: GluegunCommand<ExtendedGluegunToolbox> = {
  name: 'meio',
  run: async (toolbox) => {
    const { print, parameters } = toolbox
    const { raw, argv, ...args } = parameters
    print.info('Welcome to your meio CLI')
    console.log(args, toolbox.ffmpeg)
  },
}

module.exports = command
