import { GluegunToolbox } from 'gluegun'
import * as Ffmpeg from 'fluent-ffmpeg'

export class KnownError extends Error {}

export interface ExtendedGluegunToolbox extends GluegunToolbox {
  ffmpeg: Ffmpeg.FfmpegCommand
}
