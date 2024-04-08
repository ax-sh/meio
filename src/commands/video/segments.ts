import { GluegunCommand } from 'gluegun'
import { type ExtendedGluegunToolbox } from '../../types'

const command: GluegunCommand<ExtendedGluegunToolbox> = {
  name: 'segments',
  alias: ['seg', 'chunks'],
  run: async (toolbox) => {
    const { media, parameters, filesystem } = toolbox
    const videoPath = parameters.first
    const ffmpegCMD = media.video(videoPath)
    console.log('File size', ffmpegCMD.videoSize, 'mb')
    const outputPath = filesystem.dir('output')
    const result = await ffmpegCMD.videoChunks(outputPath)
    console.log(result)
  },
}

module.exports = command
