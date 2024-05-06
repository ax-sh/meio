import { GluegunCommand } from 'gluegun'
import { type ExtendedGluegunToolbox } from '../../types'

const command: GluegunCommand<ExtendedGluegunToolbox> = {
  name: 'rotate',
  alias: ['rot'],
  run: async (toolbox) => {
    const { media, parameters, filesystem } = toolbox
    const videoPath = parameters.first
    const ffmpegCMD = media.video(videoPath)

    console.log('File size', ffmpegCMD.videoSize, 'mb')
    // const outputPath = filesystem.dir('output')
    // const rev = await ffmpegCMD.reverseVideo(outputPath)

    // ffmpeg -display_rotation 90 -i input.mp4 -codec copy output.mp4
    // console.log(rev)
  },
}

module.exports = command
