import * as path from 'path'
import * as jetpack from 'fs-jetpack'
import prettyBytes from 'pretty-bytes'
import { KnownError } from '../types'

interface IVideoInfo {
  isFile: () => boolean
  size: () => string
}
export class VideoInfo implements IVideoInfo {
  public readonly videoPath: string
  public readonly fileName: string
  public readonly extension: string
  public readonly videoDir: string
  public readonly file: path.ParsedPath

  constructor(videoPath: string) {
    this.videoPath = videoPath
    const videoPathParsed = path.parse(videoPath)
    this.fileName = videoPathParsed.base
    this.extension = videoPathParsed.ext
    this.videoDir = videoPathParsed.dir
  }
  isFile() {
    const result = jetpack.exists(this.videoPath)
    return result === 'file'
  }

  size(): string {
    if (!this.isFile()) throw new KnownError('No file found')
    const result = jetpack.inspect(this.videoPath)
    return prettyBytes(result.size)
  }
}
