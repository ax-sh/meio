import jetpack = require('fs-jetpack')
import { vi } from 'vitest'
import { jetpackExists } from './video-utils'

vi.mock('fs-jetpack', async () => {
  const mod = await vi.importActual<typeof import('fs-jetpack')>('fs-jetpack')
  return {
    ...mod,
    exists: vi.fn(() => 'roooo'), // Create a mock function for exists that returns true
  }
})

describe('fileSystem', () => {
  it('should test jetpack', () => {
    expect(jetpackExists('/foo')).toBe(true)
  })

  it('should test jetpack mock', async () => {
    const jetpackMock = await vi.importMock<{
      default: typeof import('fs-jetpack')
    }>('fs-jetpack')
    // @ts-ignore
    jetpackMock.default.exists.mockReturnValue('moo')

    expect(jetpackMock.default.exists('/foo')).toBe('moo')
  })
})
