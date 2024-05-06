import { GluegunCommand } from 'gluegun'
import { type ExtendedGluegunToolbox } from '../../types'

const command: GluegunCommand<ExtendedGluegunToolbox> = {
  name: 'convert',
  run: async (toolbox) => {
    const { media, parameters, filesystem } = toolbox
    const videoPath = filesystem.path(parameters.first || '.')
    const path = require('path')
    if (filesystem.isDirectory(videoPath)) {
      const dirFiles = filesystem.list(videoPath)
      for (const i of dirFiles) {
        const info = path.basename(i)
        const ffmpegCMD = media.video(i)
        ffmpegCMD.convertFormat('mp4')
        console.log('File size', ffmpegCMD.videoSize, 'mb')
      }
    }
  },
}

module.exports = command
