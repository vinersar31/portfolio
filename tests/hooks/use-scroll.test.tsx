import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useScroll } from '@/hooks/use-scroll'

describe('useScroll hook', () => {
  let rafCallback: FrameRequestCallback | null = null
  let rafIdCounter = 0
  const activeRafs = new Map<number, FrameRequestCallback>()

  beforeEach(() => {
    rafCallback = null
    rafIdCounter = 0
    activeRafs.clear()

    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
      configurable: true,
    })

    // Mock requestAnimationFrame & cancelAnimationFrame
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      rafIdCounter += 1
      const id = rafIdCounter
      activeRafs.set(id, cb)
      rafCallback = cb
      return id
    })

    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation((id) => {
      activeRafs.delete(id)
      if (rafCallback && activeRafs.size === 0) {
        rafCallback = null
      }
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  function triggerRaf() {
    if (rafCallback) {
      const cb = rafCallback
      rafCallback = null
      cb(performance.now())
    }
  }

  it('returns false initially when scrollY is 0', () => {
    const { result } = renderHook(() => useScroll())

    act(() => {
      triggerRaf()
    })

    expect(result.current).toBe(false)
  })

  it('returns true when scrollY exceeds default threshold (20)', () => {
    const { result } = renderHook(() => useScroll())

    act(() => {
      window.scrollY = 25
      window.dispatchEvent(new Event('scroll'))
    })

    act(() => {
      triggerRaf()
    })

    expect(result.current).toBe(true)
  })

  it('updates state when scrolling back below threshold', () => {
    const { result } = renderHook(() => useScroll())

    // Scroll down past threshold
    act(() => {
      window.scrollY = 50
      window.dispatchEvent(new Event('scroll'))
    })
    act(() => {
      triggerRaf()
    })
    expect(result.current).toBe(true)

    // Scroll back up below threshold
    act(() => {
      window.scrollY = 10
      window.dispatchEvent(new Event('scroll'))
    })
    act(() => {
      triggerRaf()
    })
    expect(result.current).toBe(false)
  })

  it('respects custom threshold parameter', () => {
    const { result } = renderHook(() => useScroll(100))

    // Scroll to 50 (below custom threshold 100)
    act(() => {
      window.scrollY = 50
      window.dispatchEvent(new Event('scroll'))
    })
    act(() => {
      triggerRaf()
    })
    expect(result.current).toBe(false)

    // Scroll to 150 (exceeds custom threshold 100)
    act(() => {
      window.scrollY = 150
      window.dispatchEvent(new Event('scroll'))
    })
    act(() => {
      triggerRaf()
    })
    expect(result.current).toBe(true)
  })

  it('throttles multiple scroll events while a frame is pending', () => {
    const { result } = renderHook(() => useScroll())

    // Complete the initial mount animation frame call
    act(() => {
      triggerRaf()
    })
    expect(window.requestAnimationFrame).toBeCalledTimes(1)

    // Dispatch multiple rapid scroll events while ticking will be set to true on the first scroll event
    act(() => {
      window.scrollY = 30
      window.dispatchEvent(new Event('scroll'))
      window.dispatchEvent(new Event('scroll'))
      window.dispatchEvent(new Event('scroll'))
    })

    // requestAnimationFrame should only be called once more (total 2) for all 3 rapid scroll events
    expect(window.requestAnimationFrame).toBeCalledTimes(2)

    act(() => {
      triggerRaf()
    })

    expect(result.current).toBe(true)
  })

  it('cleans up event listeners and pending animation frame on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
    const cancelAnimationFrameSpy = vi.spyOn(window, 'cancelAnimationFrame')

    const { unmount } = renderHook(() => useScroll())

    // Trigger scroll to queue a RAF
    act(() => {
      window.scrollY = 40
      window.dispatchEvent(new Event('scroll'))
    })

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
    expect(cancelAnimationFrameSpy).toHaveBeenCalled()
  })
})
