import { GluegunCommand } from 'gluegun'
import { type ExtendedGluegunToolbox } from '../../types'

const command: GluegunCommand<ExtendedGluegunToolbox> = {
  name: 'boomerang',
  alias: ['boom'],
  run: async (toolbox) => {
    // ffmpeg -pattern_type glob -i "*.jpg" -filter_complex "[0]reverse[r];[0][r]concat,loop=5:250,setpts=N/25/TB,scale=1920:1080" -vcodec mpeg4 -q:v 1 output_looped.mp4
    // const { raw, argv, ...args } = parameters
    // print.info('Welcome to your meio CLI')
  },
}

module.exports = command
