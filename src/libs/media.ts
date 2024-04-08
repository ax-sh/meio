import * as ffmpeg from 'fluent-ffmpeg'
import * as jetpack from 'fs-jetpack'
import { KnownError } from '../types'
import { FSJetpack, InspectResult } from 'fs-jetpack/types'

export class Video {
  private readonly videoPath: string
  public readonly videoSize: number
  private readonly videoFolder: string
  public readonly cmd: ffmpeg.FfmpegCommand
  constructor(video: InspectResult) {
    this.videoFolder = jetpack.path(video.absolutePath, '..')
    this.videoSize = +(video.size / 1024 ** 2).toFixed(2)
    this.cmd = ffmpeg(video.absolutePath)
  }

  public makeChunks(segmentTimeInSec: number) {
    const fileNamePrefix = 'video_'
    return {
      outputPath: (outputPath: FSJetpack, useCurrentDir = false) => {
        const filePattern = `${fileNamePrefix}%04d.mp4`
        const output = useCurrentDir
          ? outputPath
          : jetpack.dir(jetpack.path(this.videoFolder, 'segments'))

        const videoList = output.path('broken-video-chunks-list.txt')
        return this.cmd
          .outputOption('-map 0')
          .outputOption('-c copy')
          .outputOption('-f segment')
          .outputOption(`-segment_list ${videoList}`)
          .outputOption(`-segment_time ${segmentTimeInSec}`)
          .outputOption('-y')
          .output(output.path(filePattern))
      },
    }
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
