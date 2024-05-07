import * as jetpack from 'fs-jetpack'

vi.mock('fs-jetpack', async () => {
  const mod = await vi.importActual<typeof import('fs-jetpack')>('fs-jetpack')
  return {
    ...mod,
    __esModule: true,
    exists: vi.fn(() => 'roooo'), // Create a mock function for exists that returns true
  }
})

describe('fileSystem', () => {
  it('should test jetpack', () => {
    expect(jetpack.exists('/foo')).toBe('roooo')
  })
  it('should test jetpack with mocked return value', () => {
    const mockedAxios = vi.mocked(jetpack, true)
    mockedAxios.exists.mockReturnValue('file')
    expect(jetpack.exists('/foo')).toBe('file')
  })
  // the below works but the top level mock needs to be removed
  it.todo('should test jetpack mock', async () => {
    const jetpackMock = await vi.importMock<{
      default: typeof import('fs-jetpack')
    }>('fs-jetpack')
    // @ts-ignore
    jetpackMock.default.exists.mockReturnValue('moo')

    expect(jetpackMock.default.exists('/foo')).toBe('moo')
  })
})
