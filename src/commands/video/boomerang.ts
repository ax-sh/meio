import { GluegunCommand } from 'gluegun'
import { ExtendedGluegunToolbox, KnownError } from '../../types'

const command: GluegunCommand<ExtendedGluegunToolbox> = {
  name: 'boomerang',
  alias: ['boom'],
  run: async (toolbox) => {
    const { ffmpeg, parameters, filesystem } = toolbox
    const videoPath = parameters.first
    if (!videoPath)
      throw new KnownError('Use a video file as a first param to run')
    const noFile = filesystem.isNotFile(videoPath)
    if (noFile) throw new KnownError('Not a video file')
    const stat = filesystem.inspect(videoPath, { absolutePath: true })
    const vid = ffmpeg(videoPath)
    console.log(stat, vid)

    // ffmpeg -pattern_type glob -i "*.jpg" -filter_complex "[0]reverse[r];[0][r]concat,loop=5:250,setpts=N/25/TB,scale=1920:1080" -vcodec mpeg4 -q:v 1 output_looped.mp4
    // const { raw, argv, ...args } = parameters
    // print.info('Welcome to your meio CLI')
  },
}

module.exports = command
