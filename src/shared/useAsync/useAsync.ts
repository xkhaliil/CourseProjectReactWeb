import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"

export default function useAsync<Type>(
  fn: () => Promise<Type>,
  deps: unknown[] = [],
): [Type | undefined, { refresh: () => void }] {
  const fnRef = useRef(fn)

  useLayoutEffect(() => {
    fnRef.current = fn
  })

  const [value, setValue] = useState<Type | undefined>(undefined)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    let cancelled = false
    fnRef.current().then((result) => {
      if (!cancelled) setValue(result)
    })
    return () => {
      cancelled = true
    }
  }, [tick, ...deps]) // eslint-disable-line react-hooks/exhaustive-deps

  const refresh = useCallback(() => {
    setValue(undefined)
    setTick((t) => t + 1)
  }, [])

  return [value, { refresh }]
}
