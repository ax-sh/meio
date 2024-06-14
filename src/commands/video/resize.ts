import { GluegunCommand } from 'gluegun'
import { type ExtendedGluegunToolbox } from '../../types'
import * as ffmpeg from 'fluent-ffmpeg'
import { runFFMpegCmd } from '../../libs/FFMpeg-utils'

const command: GluegunCommand<ExtendedGluegunToolbox> = {
  name: 'resize',
  alias: ['scale'],
  run: async (toolbox) => {
    const { parameters, system, print } = toolbox
    const filePath = parameters.first.trim()
    const width = Number(parameters.second) || 1920
    const { inputPath, outputPath } = toolbox.makeOutputPath({
      filePath,
    })
    const spinner = print.spin(`Resizing with height ${width}`)

    // const cmd = `ffmpeg -hide_banner -i "${inputPath}" -c:v libx265 -vtag hvc1 -vf scale=1920:1080 -crf 20 -c:a copy -filter:v "scale=width=${width}:height=-2" "${outputPath}"`
    // const out = await system.run(cmd)
    //
    // spinner.succeed()

    // console.log(out)

    const cmd = ffmpeg(inputPath)
      .videoCodec('libx265')
      .inputOption('-hwaccel cuda')
      .outputOption('-safe 0')
      .outputOptions(['-vtag hvc1', '-crf 20'])
      .outputOption('-y')
      .audioCodec('copy')
      .videoFilter(`scale=width=${width}:height=-2`)

      .save(outputPath)
    spinner.succeed()
    spinner.stop()

    await runFFMpegCmd(cmd, (progress) => {
      console.table(progress)
    })
  },
}

module.exports = command
