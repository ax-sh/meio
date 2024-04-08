import { GluegunCommand } from 'gluegun'
import { type ExtendedGluegunToolbox } from '../../types'

const command: GluegunCommand<ExtendedGluegunToolbox> = {
  name: 'reverse',
  alias: ['rev'],
  run: async (toolbox) => {
    const { media, parameters, filesystem } = toolbox
    const videoPath = parameters.first
    const ffmpegCMD = media.video(videoPath)
    console.log('File size', ffmpegCMD.videoSize, 'mb')
    const outputPath = filesystem.dir('output')
    const rev = await ffmpegCMD.reverseVideo(outputPath)
    console.log(rev)
  },
}

module.exports = command
