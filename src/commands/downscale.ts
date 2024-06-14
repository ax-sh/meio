import { GluegunCommand } from 'gluegun'
import { ExtendedGluegunToolbox, KnownError } from '../types'

const command: GluegunCommand<ExtendedGluegunToolbox> = {
  name: 'downscale',
  alias: ['ds'],
  run: async (toolbox) => {
    const { print, parameters, filesystem, system } = toolbox
    const input = parameters.first
    const { makeOutputPath } = await import('../libs/make-output-path')
    const { outputPath, inputPath } = makeOutputPath({ filePath: input })
    const timer = toolbox.system.startTimer()
    const cmd = `ffmpeg -hwaccel cuda -i "${inputPath}" -c:v libx265 -preset fast "${outputPath}"`
    print.success(cmd)

    const spinner = print.spin('making h265 encode using cuda')

    const out = await system.exec(cmd, (err, stdout, stderr) => {
      if (err) {
        console.error(err)
        return
      }
      console.log(stdout)
    })
    spinner.succeed(out)
    console.log(`that just took ${timer()} ms.`)
  },
}

module.exports = command
