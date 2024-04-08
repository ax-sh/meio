import { GluegunToolbox } from 'gluegun'
import { KnownError } from '../types'

// add your CLI-specific functionality here, which will then be accessible

// to your commands
module.exports = (toolbox: GluegunToolbox) => {
  toolbox.foo = () => {
    toolbox.print.info('called foo extension')
  }
  const ffmpeg = toolbox.system.which('ffmpeg')
  if (!ffmpeg) {
    throw new KnownError('FFMPEG not found')
  }

  // enable this if you want to read configuration in from
  // the current folder's package.json (in a "meio" property),
  // meio.config.json, etc.
  // toolbox.config = {
  //   ...toolbox.config,
  //   ...toolbox.config.loadConfig("meio", process.cwd())
  // }
}
