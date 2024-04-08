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
    const cmd = ffmpegCMD.makeChunks(30).outputPath(outputPath)
    cmd.run()
  },
}

module.exports = command
