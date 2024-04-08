import { FfmpegCommand } from 'fluent-ffmpeg'
import jetpack = require('fs-jetpack')

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

export function reverseVideoOrder(result: string) {
  const [header, ...rest] = jetpack.read(result).split('\n')
  const reversed = [header, ...rest.reverse()]
  const text = reversed.join('\n')
  return text
}
