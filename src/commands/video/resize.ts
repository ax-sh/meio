import { GluegunCommand } from 'gluegun'
import { type ExtendedGluegunToolbox } from '../../types'
import * as ffmpeg from 'fluent-ffmpeg'

const command: GluegunCommand<ExtendedGluegunToolbox> = {
  name: 'resize',
  alias: ['scale'],
  run: async (toolbox) => {
    // ffmpeg -pattern_type glob -i "*.jpg" -filter_complex "[0]reverse[r];[0][r]concat,loop=5:250,setpts=N/25/TB,scale=1920:1080" -vcodec mpeg4 -q:v 1 output_looped.mp4
    // const { raw, argv, ...args } = parameters
    //   ffmpeg -i sample.mp4 -vf scale=1920:1080 sample.mp4

    const cmd = ffmpeg(inputPath)
      .inputOption('-hide_banner')
      .inputOption('-hwaccel cuda')
      .outputOption('-c:v libx265')
      .outputOption(`-preset fast`)
      .output(outputPath)

    //
    // -filter:v "scale=width=1920:height=-2"
  },
}

module.exports = command
