import { VideoInfo } from './video-info'
import { expect, vi } from 'vitest'
import jetpack = require('fs-jetpack')

vi.mock('fs-jetpack', async (importOriginal) => {
  const mod = await importOriginal<typeof import('fs-jetpack')>()
  // ...(await vi.importActual('fs-jetpack')),
  return {
    ...mod,
    __esModule: true,
    exists: vi.fn(() => 'file'),
    inspect: vi.fn(() => ({
      size: 10000,
    })),
  }
})

// const mockFS: vi.Mocked<typeof jetpack> = jetpack

describe('Media class', () => {
  it('should pass', async () => {
    console.log(jetpack.exists)
    expect(1).toBe(1)
  })
  it('should mock jetpack', async () => {
    const mockedJetpack =
      await vi.importMock<typeof import('fs-jetpack')>('fs-jetpack')
    const exists = mockedJetpack.exists('/path/to/file')
    expect(exists).toBe(false)
  })
  it('should initiate VideoInfo', async () => {
    // vi.mocked(jetpack.exists).mockReturnValue('mockData')

    const o = await vi.importMock<typeof import('fs-jetpack')>('fs-jetpack')
    // console.log(o.default.exists)
    vi.mocked(o.exists).mockReturnValue('directory')
    const v = new VideoInfo('v.ts')
    expect(v.videoPath).toBeDefined()
    expect(v.fileName).toBeDefined()
    expect(v.extension).toBeDefined()
    expect(v.dir).toBeDefined()
    expect(v.size()).toBe('10 kB')
  })
})
