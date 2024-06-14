import { makeOutputPath } from './make-output-path'
import * as jetpack from 'fs-jetpack'
import { FSJetpack } from 'fs-jetpack/types'

// vi.mock('fs-jetpack', async (importOriginal) => {
//   const mod = await importOriginal<FSJetpack>()
//   // ...(await vi.importActual('fs-jetpack')),
//   return {
//     ...mod,
//     __esModule: true,
//     path: vi.fn((path) => `D:/${path}`),
//     exists: vi.fn(() => 'file'),
//     inspect: vi.fn(() => ({
//       size: 10000,
//     })),
//   }
// })

describe.only('make-output-path', () => {
  const filePath = 'CLOxDMIx3DMagic_Webinar.mp4'
  // const filePath = 'D:/Archives/CLOxDMIx3DMagic_Webinar.mp4'
  // it('should parse relative file path', () => {
  //   const o = makeOutputPath('m.mp4')
  // })
  // it('should take relative path', () => {
  //   const o = makeOutputPath('m.mp4')
  //   expect(o.outputName).toBe('CLOxDMIx3DMagic_Webinar.out.mp4')
  //   expect(o.outputPath).toBe(
  //     jetpack.path('D:/Archives/CLOxDMIx3DMagic_Webinar.out.mp4'),
  //   )
  // })
  it('should take input path', () => {
    const o = makeOutputPath(filePath)
    expect(o.outputPath).toBe(
      jetpack.path('D:/Archives/CLOxDMIx3DMagic_Webinar.out.mp4'),
    )
  })
  it.fails('should raise error on file not found', () => {
    makeOutputPath('m.mp4')
  })
})
