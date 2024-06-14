import * as jetpack from 'fs-jetpack'
import { KnownError } from '../types'
import * as path from 'path'

export type PathOutput = {
  outputName: string
  inputPath: string
  outputPath: string
  name: string
}

export type OutputPathOptions = {
  filePath: string
  prefix?: string
  mode?: 'relative' | 'none'
}

export function makeOutputPath({
  filePath,
  prefix = '.out',
  mode = 'none',
}: OutputPathOptions): PathOutput {
  const videoPath = jetpack.path(filePath)
  const isFile = jetpack.exists(videoPath) == 'file'
  if (!isFile) throw new KnownError('Not a File')

  const inspect = jetpack.inspect(videoPath, { absolutePath: true })

  const { name, ext, dir } = path.parse(inspect.absolutePath)
  const outputName = [name, ext].join(prefix)

  const outputPath =
    mode === 'relative' ? outputName : jetpack.path(dir, outputName)
  const inputPath = inspect.absolutePath
  return { outputPath, outputName, inputPath, name }
}
