import * as path from 'path'
import * as ffmpeg from 'fluent-ffmpeg'
import { filesystem } from 'gluegun'

const SUBTITLE_FILES = ['.srt', '.sub']
const VIDEO_FILES = ['.mp4', '.mkv', '.ts']

type CandidatesValue = { video: string; subtitle: string; outputPath: string }
type CandidatesType = Record<string, CandidatesValue>

export function findCandidates(list: string[]) {
  const fileNameSuffix = '.merged-subs'
  const candidates: CandidatesType = {}
  for (const file of list) {
    const { name, ext, base, ...rest } = path.parse(file)
    if (filesystem.isDirectory(file)) continue
    if (name.endsWith(fileNameSuffix)) continue
    const hasKey = name in candidates
    if (!hasKey) {
      candidates[name] = { video: null, subtitle: null, outputPath: null }
    }

    if (SUBTITLE_FILES.includes(ext)) candidates[name].subtitle = base
    if (VIDEO_FILES.includes(ext)) {
      candidates[name].video = base
      candidates[name].outputPath = `${name}${fileNameSuffix}.mkv`
    }
  }
  return candidates
}

type VideoWithSubtitleArgs = {
  videoPath: string
  subtitlePath: string
  outputPath: string
}
export async function mergeVideoWithSubtitle({
  videoPath,
  subtitlePath,
  outputPath,
}: VideoWithSubtitleArgs) {
  // const out = await system.run(
  //   `ffmpeg -y -hide_banner -i "${videoPath}" -i "${subtitlePath}"  -map 0 -map 1 -c copy "${outputPath}"`,
  // )
  // return out
  return new Promise(async (resolve, reject) => {
    console.log()

    const cmd = ffmpeg()
      .mergeAdd(videoPath)
      .mergeAdd(subtitlePath)
      .addOutputOption('-map 0')
      .addOutputOption('-map 1')
      .addOutputOptions('-c copy')
      .output(outputPath)

    cmd
      .on('error', (err) => reject({ error: err, outputPath, videoPath }))
      .on('end', () => resolve({ videoPath, subtitlePath }))

    cmd.run()
  })
}
