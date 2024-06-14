import * as jetpack from 'fs-jetpack'
import { KnownError } from '../types'
import * as path from 'path'

type PathOutput = {
  outputName: string
  inputPath: string
  outputPath: string
  name: string
}
export function makeOutputPath(filePath: string, prefix = '.out'): PathOutput {
  const videoPath = jetpack.path(filePath)
  const isFile = jetpack.exists(videoPath) == 'file'
  if (!isFile) throw new KnownError('Not a File')

  const inspect = jetpack.inspect(videoPath, { absolutePath: true })

  const { name, ext, dir } = path.parse(inspect.absolutePath)
  const outputName = [name, ext].join(prefix)

  const outputPath = jetpack.path(dir, outputName)
  const inputPath = inspect.absolutePath
  return { outputPath, outputName, inputPath, name }
}
