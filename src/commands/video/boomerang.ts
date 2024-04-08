import { GluegunCommand } from 'gluegun'
import { type ExtendedGluegunToolbox } from '../../types'
import { breakVideoToSegmentsCommand } from '../../libs/video-utils'

const command: GluegunCommand<ExtendedGluegunToolbox> = {
  name: 'boomerang',
  alias: ['boom'],
  run: async (toolbox) => {
    const { media, parameters, filesystem } = toolbox
    const videoPath = parameters.first
    const ffmpegCMD = media.video(videoPath)
    console.log('file size', ffmpegCMD.videoSize, 'mb')
    const outputPath = filesystem.dir('outpust')
    const cmd = ffmpegCMD.makeChunks(30).outputPath(outputPath)
    cmd.run()

    // ffmpeg -pattern_type glob -i "*.jpg" -filter_complex "[0]reverse[r];[0][r]concat,loop=5:250,setpts=N/25/TB,scale=1920:1080" -vcodec mpeg4 -q:v 1 output_looped.mp4
    // const { raw, argv, ...args } = parameters
    // print.info('Welcome to your meio CLI')
  },
}

module.exports = command
