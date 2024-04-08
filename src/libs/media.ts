import * as ffmpeg from 'fluent-ffmpeg'
import * as jetpack from 'fs-jetpack'
import * as path from 'path'
import { KnownError } from '../types'
import { FSJetpack, InspectResult } from 'fs-jetpack/types'
import { reverseVideoOrder } from './video-utils'

export class Video {
  public readonly videoSize: number
  private readonly videoFolder: string
  public readonly cmd: ffmpeg.FfmpegCommand
  public readonly file: path.ParsedPath
  constructor(video: InspectResult) {
    this.videoFolder = jetpack.path(video.absolutePath, '..')
    this.videoSize = +(video.size / 1024 ** 2).toFixed(2)
    this.cmd = ffmpeg(video.absolutePath)
    this.file = path.parse(video.absolutePath)
  }
  public getRelativeFolder(folder: string) {
    return jetpack.dir(jetpack.path(this.videoFolder, folder))
  }
  joinChunks() {
    // "-safe 0" - to accept file names with spaces.
    return this.cmd.outputOption('-safe 0').outputOption('-codec copy')
  }
  makeChunks(segmentTimeInSec: number) {
    const fileNamePrefix = 'video_'
    return {
      outputPath: (outputPath?: FSJetpack) => {
        const output = outputPath
          ? outputPath
          : this.getRelativeFolder('segments')
        const filePattern = `chunk-${fileNamePrefix}%04d.mp4`
        const videoList = output.path('broken-video-chunks-list.ffcat')
        const cmd = this.cmd
          .outputOption('-map 0')
          .outputOption('-c copy')
          .outputOption('-f segment')
          .outputOption(`-segment_list ${videoList}`)
          .outputOption(`-segment_time ${segmentTimeInSec}`)
          .outputOption('-y')
          .output(output.path(filePattern))
        return { cmd, videoList }
      },
    }
  }

  async videoChunks(outputPath?: FSJetpack) {
    return new Promise<string>((resolve, reject) => {
      const { cmd, videoList } = this.makeChunks(20).outputPath(outputPath)

      cmd
        .on('end', () => resolve(videoList))
        .on('error', () => reject('error'))
        .run()
    })
  }
  async reverseVideo(outputPath?: FSJetpack) {
    const ffconcatFilePath = await this.videoChunks(outputPath)
    const reversed = reverseVideoOrder(ffconcatFilePath)
    const { dir, base } = path.parse(ffconcatFilePath)
    const newPath = jetpack.path(dir, `reversed-${base}`)
    jetpack.write(newPath, reversed)
  }

  frames(outputFolder?: FSJetpack) {
    const outputPath = outputFolder
      ? outputFolder
      : this.getRelativeFolder(`${this.file.name}-frames`)

    const path = outputPath.path('frame-%d.png')

    return this.cmd.outputOption(`-c:v png`).output(path)
  }
}

export function video(videoPath: string) {
  if (!videoPath)
    throw new KnownError('Use a video file as a first param to run')
  const noFile = jetpack.exists(videoPath)
  if (noFile !== 'file') throw new KnownError('Not a video file')
  const stat = jetpack.inspect(videoPath, { absolutePath: true })
  if (stat.type !== 'file') throw new KnownError('Provided arg is not a file')
  return new Video(stat)
}
