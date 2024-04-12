import { GluegunCommand } from 'gluegun'
import { type ExtendedGluegunToolbox } from '../../types'

const command: GluegunCommand<ExtendedGluegunToolbox> = {
  name: 'merge-subs',
  alias: ['merge-subs'],
  run: async (toolbox) => {
    const { fillestystem, parameters, ffmpeg } = toolbox
    const dir = parameters.first
    const list = fillestystem.list(dir)
    // ffmpeg -i yourmkv.mkv -i yoursubtitles.sub -map 0 -map 1 -c copy youroutput.mkv
    console.log(dir)
  },
}

module.exports = command
