import { GluegunCommand } from 'gluegun'
import { ExtendedGluegunToolbox, KnownError } from '../../types'
import * as ffmpeg from 'fluent-ffmpeg'

const command: GluegunCommand<ExtendedGluegunToolbox> = {
  name: 'mod',
  alias: ['modify'],
  run: async (toolbox) => {
    const { print, parameters, filesystem, system } = toolbox
    const input = parameters.first
    if (!input) throw new KnownError('filePath is empty')
    const { makeOutputPath } = await import('../../libs/make-output-path')
    const { runFFMpegCmd } = await import('../../libs/FFMpeg-utils')
    const { outputPath, inputPath } = makeOutputPath(input)
    const timer = toolbox.system.startTimer()
    // const cmd = `ffmpeg -hide_banner -hwaccel cuda -i "${inputPath}" -c:v libx265 -preset fast "${outputPath}"`
    const cmd = ffmpeg(inputPath)
      .inputOption('-hide_banner')
      .inputOption('-hwaccel cuda')
      .outputOption('-c:v libx265')
      .outputOption(`-preset fast`)
      .output(outputPath)

    await runFFMpegCmd(cmd, (progress) => {
      const complete = +progress.percent
      const percent = complete * 100

      console.log(percent.toFixed(2), '%', outputPath)
    })

    console.log(`That just took ${timer()} ms.`)
    console.log({ outputPath, inputPath })
  },
}

module.exports = command
