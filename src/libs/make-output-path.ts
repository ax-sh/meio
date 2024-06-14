import * as jetpack from 'fs-jetpack'
import { KnownError } from '../types'
import * as path from 'path'

export function makeOutputPath(
  inputPath: string,
  prefix = '.out',
): { outputPath: string; outputName: string } {
  const videoPath = jetpack.path(inputPath)
  console.log(videoPath)
  const isFile = jetpack.exists(videoPath) == 'file'
  if (!isFile) throw new KnownError('Not a File')

  const inspect = jetpack.inspect(videoPath, { absolutePath: true })

  const { name, ext, dir } = path.parse(inspect.absolutePath)
  console.log(name, ext, dir)
  const outputName = [name, ext].join(prefix)

  const outputPath = jetpack.path(dir, outputName)
  return { outputPath, outputName }
}
