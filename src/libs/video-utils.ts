import { FfmpegCommand } from 'fluent-ffmpeg'

import { FSJetpack } from 'fs-jetpack/types'

export function FFMPEGLogger(ffmpegCMD: FfmpegCommand) {
  ffmpegCMD
    .on('start', function (commandLine) {
      // console.log("Start trimFFmpeg:", videoURL/);
    })
    .on('error', function (err) {
      // rej(handleErrorMessage(`trimFFmpeg() ${errId} ${err}`));
    })
    .on('end', function () {
      // console.log("End trimFFmpeg:", tempFile);
      // res(tempFile);
    })
    .on('exit', () => {
      console.trace('onExit()')
    })
    .on('close', () => {
      console.trace('onExit()')
    })
}

export function breakVideoToSegmentsCommand(
  ffmpegCMD: FfmpegCommand,
  segments: number,
  outputPath: FSJetpack,
) {
  const fileNamePrefix = 'video_'
  const path = outputPath.path(`${fileNamePrefix}%04d.mp4`)
  // `-segment_list ${outputPath}/tmp.ffcat`,
  const command = ffmpegCMD
    .outputOption('-map 0')
    .outputOption('-c copy')
    .outputOption('-f segment')
    .outputOption(`-segment_time ${segments}`)
    .outputOption('-y')
    .output(path)
  return command
}
