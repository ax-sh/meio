import { GluegunCommand } from 'gluegun'
import { type ExtendedGluegunToolbox } from '../../types'

const command: GluegunCommand<ExtendedGluegunToolbox> = {
  name: 'frames',
  alias: ['frame'],
  run: async (toolbox) => {
    const cmd = toolbox.media.video(toolbox.parameters.first)
    cmd.frames()
  },
}

module.exports = command
