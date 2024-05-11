import { filesystem } from 'gluegun';
import * as path from 'path';

import { KnownError } from '../types';

export function parseFilePath(filePath: string) {
  if (filesystem.isNotFile(filePath)) throw new KnownError('File not found');
  const absoluteFilePath = filesystem.path(filePath);
  const {
    dir: relativeDir,
    ext: fileExt,
    name: fileName,
    base: fullName
  } = path.parse(absoluteFilePath);
  const { size, type } = filesystem.inspect(filePath);
  const relativeDirJoin = (...args: string[]) => filesystem.path(relativeDir, ...args);
  const newFilePath = (suffix: string, ext = fileExt) =>
    relativeDirJoin(`${fileName}---${suffix}${ext}`);
  return {
    path: absoluteFilePath,
    relativeDir,
    relativeDirJoin,
    newFilePath,
    fileName,
    size,
    type,
    fileExt,
    fullName
  };
}
