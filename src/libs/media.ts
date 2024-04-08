import * as ffmpeg from 'fluent-ffmpeg'

export class Video {
  private readonly videoPath: string
  private readonly cmd: ffmpeg.FfmpegCommand
  constructor(videoPath: string) {
    this.videoPath = videoPath
    this.cmd = ffmpeg(this.videoPath)
  }
  public makeChunks(outputPath: string, segments: number) {
    return this.cmd
      .outputOption('-map 0')
      .outputOption('-c copy')
      .outputOption('-f segment')
      .outputOption(`-segment_time ${segments}`)
      .outputOption('-y')
      .output(outputPath)
  }
}

export function video(videoPath: string) {
  return new Video(videoPath)
}
