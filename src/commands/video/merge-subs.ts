import { GluegunCommand } from 'gluegun'
import { type ExtendedGluegunToolbox, KnownError } from '../../types'

const command: GluegunCommand<ExtendedGluegunToolbox> = {
  name: 'merge-subs',
  alias: ['merge-subs'],
  run: async (toolbox) => {
    const { filesystem, parameters } = toolbox
    const dir = parameters.first
    if (filesystem.isNotDirectory(dir))
      throw new KnownError('Only dir supported')
    const list = filesystem.list(dir)
    const mergeSubs = await import('../../libs/merge-subs.utils')
    const candidates = mergeSubs.findCandidates(list)

    const items = Object.entries(candidates)
    for await (const [_, item] of items) {
      const subtitlePath = filesystem.path(item.subtitle)
      const videoPath = filesystem.path(item.video)
      const outputPath = filesystem.dir('merged__output').path(item.outputPath)

      if (filesystem.isFile(subtitlePath) && filesystem.isFile(videoPath)) {
        await mergeSubs.mergeVideoWithSubtitle({
          videoPath,
          subtitlePath,
          outputPath,
        })
        console.log('DONE MERGE:', item)
      }
    }
  },
}

module.exports = command
