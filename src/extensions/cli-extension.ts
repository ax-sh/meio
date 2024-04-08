import { ExtendedGluegunToolbox, KnownError } from '../types'

// add your CLI-specific functionality here, which will then be accessible to your commands
module.exports = (toolbox: ExtendedGluegunToolbox) => {
  toolbox.foo = () => {
    toolbox.print.info('called foo extension')
  }
  const ffmpegCli = toolbox.system.which('ffmpeg')
  if (!ffmpegCli) {
    throw new KnownError('FFMPEG not found')
  }
  const ffmpeg = require('fluent-ffmpeg')
  toolbox.ffmpeg = ffmpeg

  // enable this if you want to read configuration in from
  // the current folder's package.json (in a "meio" property),
  // meio.config.json, etc.
  // toolbox.config = {
  //   ...toolbox.config,
  //   ...toolbox.config.loadConfig("meio", process.cwd())
  // }
}
