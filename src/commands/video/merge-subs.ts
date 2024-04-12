import { GluegunCommand } from 'gluegun'
import { type ExtendedGluegunToolbox, KnownError } from '../../types'
import { mergeVideoWithSubtitle } from '../../libs/merge-subs.utils'

const command: GluegunCommand<ExtendedGluegunToolbox> = {
  name: 'merge-subs',
  alias: ['merge-subs'],
  run: async (toolbox) => {
    const { filesystem, parameters, ffmpeg } = toolbox
    const dir = parameters.first
    if (filesystem.isNotDirectory(dir))
      throw new KnownError('only dir supported')
    const list = filesystem.list(dir)
    const mergeSubs = await import('../../libs/merge-subs.utils')
    const candidates = mergeSubs.findCandidates(list)

    const items = Object.entries(candidates)
    for await (const [_, item] of items) {
      const subtitlePath = filesystem.path(item.subtitle)
      const videoPath = filesystem.path(item.video)
      const outputPath = filesystem.dir('odoossso').path(item.outputPath)

      if (filesystem.isFile(subtitlePath) && filesystem.isFile(videoPath)) {
        await mergeSubs.mergeVideoWithSubtitle({
          videoPath,
          subtitlePath,
          outputPath,
        })
        console.log(item)
      }
    }
  },
}

module.exports = command
