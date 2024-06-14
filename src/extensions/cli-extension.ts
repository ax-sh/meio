import { ExtendedGluegunToolbox, KnownError } from '../types'

// add your CLI-specific functionality here, which will then be accessible to your commands
module.exports = async (toolbox: ExtendedGluegunToolbox) => {
  const ffmpegCli = toolbox.system.which('ffmpeg')
  if (!ffmpegCli) {
    throw new KnownError('FFMPEG not found')
  }

  toolbox.ffmpeg = await import('fluent-ffmpeg')
  toolbox.media = await import('../libs/media')
  const { makeOutputPath } = await import('../libs/make-output-path')
  toolbox.makeOutputPath = makeOutputPath
  // enable this if you want to read configuration in from
  // the current folder's package.json (in a "meio" property),
  // meio.config.json, etc.
  // toolbox.config = {
  //   ...toolbox.config,
  //   ...toolbox.config.loadConfig("meio", process.cwd())
  // }
}
