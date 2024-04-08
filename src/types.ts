import { GluegunToolbox } from 'gluegun'
import * as Ffmpeg from 'fluent-ffmpeg'
import * as Media from './libs/media'

export class KnownError extends Error {}

export interface ExtendedGluegunToolbox extends GluegunToolbox {
  ffmpeg: typeof Ffmpeg
  media: typeof Media
}
