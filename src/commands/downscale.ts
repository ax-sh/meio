import { GluegunCommand } from 'gluegun'
import { ExtendedGluegunToolbox } from '../types'

const command: GluegunCommand<ExtendedGluegunToolbox> = {
  name: 'downscale',

  run: async (toolbox) => {
    const { print, parameters } = toolbox
    const { raw, argv, ...args } = parameters

    console.log(args, toolbox.ffmpeg)
  },
}

module.exports = command
