import { VideoInfo } from './video-info'
import { expect, vi } from 'vitest'
import jetpack = require('fs-jetpack')

vi.mock('fs-jetpack', () => ({
  __esModule: true,
  default: { exists: () => 1 },
}))

describe('Media class', () => {
  test('your test case', async () => {
    const o = await vi.importMock<typeof import('fs-jetpack')>('fs-jetpack')
    expect(o.default.exists('1')).toBe(1)
  })
  it('should pass', async () => {
    expect(1).toBe(1)
  })
  it('should mock jetpack', async () => {
    await vi.importMock<typeof import('fs-jetpack')>('fs-jetpack')
    // vi.mock('fs-jetpack', async (importOriginal) => {
    //   const mod = await importOriginal<typeof import('fs-jetpack')>()
    //   return {
    //     ...mod,
    //     // replace some exports
    //     exists: mockedMethod,
    //   }
    // })
    const exists = jetpack.exists('/path/to/file')
    expect(exists).toBe('34')
  })
  it('should initiate VideoInfo', () => {
    const v = new VideoInfo('v.ts')
    expect(v.videoPath).toBeDefined()
    expect(v.fileName).toBeDefined()
    expect(v.extension).toBeDefined()
    expect(v.dir).toBeDefined()
    console.log(v.size())
  })
})
