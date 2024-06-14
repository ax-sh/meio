import { GluegunCommand } from 'gluegun'
import { ExtendedGluegunToolbox } from '../types'

const command: GluegunCommand<ExtendedGluegunToolbox> = {
  name: 'downscale',
  alias: ['ds'],
  run: async (toolbox) => {
    const { print, parameters, system } = toolbox
    const { raw, argv, ...args } = parameters
    const input = parameters.first

    console.log(args, input)
  },
}

module.exports = command
