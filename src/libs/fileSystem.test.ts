import jetpack = require('fs-jetpack')

vi.mock('fs-jetpack', async () => {
  const mod = await vi.importActual<typeof import('fs-jetpack')>('fs-jetpack')
  return {
    ...mod,
    exists: vi.fn(() => true), // Create a mock function for exists that returns true
  }
})

describe('fileSystem', () => {
  it('should test jetpack', () => {
    console.log(jetpack.exists('/foo')) // This will log true
  })
})
