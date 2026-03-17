import { describe, it, expect, vi } from "vitest"
import { renderHook, act, waitFor } from "@testing-library/react"
import useAsync from "./useAsync"

describe("useAsync", () => {
  it("resolves and returns the value", async () => {
    const fn = vi.fn().mockResolvedValue("hello")
    const { result } = renderHook(() => useAsync(fn))

    await waitFor(() => {
      expect(result.current[0]).toBe("hello")
    })
  })

  it("calls fn exactly once on mount", async () => {
    const fn = vi.fn().mockResolvedValue("data")
    const { result } = renderHook(() => useAsync(fn))

    await waitFor(() => {
      expect(result.current[0]).toBe("data")
    })
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it("re-fetches when refresh is called", async () => {
    let callCount = 0
    const fn = vi.fn().mockImplementation(() => {
      callCount++
      return Promise.resolve(`call-${callCount}`)
    })

    const { result } = renderHook(() => useAsync(fn))

    await waitFor(() => {
      expect(result.current[0]).toBe("call-1")
    })

    act(() => {
      result.current[1].refresh()
    })

    await waitFor(() => {
      expect(result.current[0]).toBe("call-2")
    })

    expect(fn).toHaveBeenCalledTimes(2)
  })
})
