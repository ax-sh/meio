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
