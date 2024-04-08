import { reverseVideoOrder } from './video-utils'
import { expect, vi } from 'vitest'
import jetpack = require('fs-jetpack')

describe('video utils', () => {
  it('should reverse order of video files', () => {
    const spy = vi.spyOn(jetpack, 'read')
    spy.mockReturnValue(
      'ffconcat version 1.0\n' +
        '\n' +
        'file video_0004.mp4\n' +
        'file video_0003.mp4\n' +
        'file video_0002.mp4\n' +
        'file video_0001.mp4\n' +
        'file video_0000.mp4\n',
    )

    const result = reverseVideoOrder('test.txt')
    expect(spy).toBeCalled()
    expect(result).toBe(
      'ffconcat version 1.0\n' +
        '\n' +
        'file video_0000.mp4\n' +
        'file video_0001.mp4\n' +
        'file video_0002.mp4\n' +
        'file video_0003.mp4\n' +
        'file video_0004.mp4' +
        '\n',
    )
  })
})
