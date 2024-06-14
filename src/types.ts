import { GluegunToolbox } from 'gluegun'
import * as Ffmpeg from 'fluent-ffmpeg'
import * as Media from './libs/media'
import { OutputPathOptions, PathOutput } from './libs/make-output-path'

export class KnownError extends Error {}

export interface ExtendedGluegunToolbox extends GluegunToolbox {
  ffmpeg: typeof Ffmpeg
  media: typeof Media
  makeOutputPath: (options: OutputPathOptions) => PathOutput
}
