import * as Ffmpeg from 'fluent-ffmpeg'

export function runFFMpegCmd(
  cmd: Ffmpeg.FfmpegCommand,
  progress: (option: { percent: number }) => void,
) {
  return new Promise((resolve, reject) => {
    cmd
      .on('start', (commandLine) => {
        console.log('[Spawned Ffmpeg with command: ]' + commandLine)
        console.log(' ')
      })
      .on('progress', progress)
      .on('end', () => resolve({ message: 'done' }))
      .on('error', (err) =>
        reject({ error: err, message: `ffmpeg failed: ${err.message}` }),
      )
    cmd.run()
  })
}
