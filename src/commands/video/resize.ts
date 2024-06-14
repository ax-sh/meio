import { GluegunCommand } from 'gluegun'
import { type ExtendedGluegunToolbox } from '../../types'
import * as ffmpeg from 'fluent-ffmpeg'
import { runFFMpegCmd } from '../../libs/FFMpeg-utils'

const command: GluegunCommand<ExtendedGluegunToolbox> = {
  name: 'resize',
  alias: ['scale'],
  run: async (toolbox) => {
    const filePath = toolbox.parameters.first.trim()
    const { inputPath, outputPath } = toolbox.makeOutputPath({
      filePath,
    })

    const cmd = ffmpeg(inputPath)
      .outputOption('-safe 0')
      .outputOption('-codec copy')
      .inputOption('-hide_banner')
      .inputOption('-hwaccel cuda')
      .outputOption('-c:v copy')
      .outputOption(`-filter:v "scale=width=1920:height=-2"`)
      .output(`"${outputPath.trim()}"`)
    console.log(ffmpeg.toString())
    await runFFMpegCmd(cmd, (progress) => {
      console.log(progress)
    })
  },
}

module.exports = command
