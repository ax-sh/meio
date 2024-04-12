describe('mergeSubs.utils.test', () => {
  it('should get candidates', async () => {
    const mergeSubs = await import('./merge-subs.utils')
    const list = ['video.srt', 'video.mp4']
    const candidates = mergeSubs.findCandidates(list)
    expect(candidates).toBeDefined()
    const expectedShape = {
      video: {
        video: expect.any(String),
        subtitle: expect.any(String),
        outputPath: expect.any(String),
      },
    }
    expect(candidates).toMatchObject(expectedShape)
  })
  it('should ignore merged candidates', async () => {
    const mergeSubs = await import('./merge-subs.utils')
    const list = ['video.srt', 'video.mp4', 'video.merged-subs.mp4']
    const candidates = mergeSubs.findCandidates(list)
    expect(candidates).toBeDefined()
    const expectedShape = {
      video: {
        video: expect.any(String),
        subtitle: expect.any(String),
        outputPath: expect.any(String),
      },
    }
    console.log(candidates)
    expect(candidates).toMatchObject(expectedShape)
    expect(candidates).toEqual(expectedShape)
  })
})
