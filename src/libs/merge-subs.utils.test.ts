import { filesystem } from 'gluegun'

describe('mergeSubs.utils.test', () => {
  it('should get candidates', async () => {
    const mergeSubs = await import('./merge-subs.utils')
    const list = filesystem.list(
      'C:/Users/USER/Desktop/video-with-external-subs',
    )
    const candidates = mergeSubs.findCandidates(list)
    expect(candidates).toBeDefined()
    console.log(candidates, 77)
  })
})
