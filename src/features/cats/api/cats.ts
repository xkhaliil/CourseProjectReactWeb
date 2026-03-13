import useAsync from "../../../shared/useAsync"

export type Cat = {
  url: string
}

export async function getCat(): Promise<Cat> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const url = `https://cataas.com/cat?v=${Date.now()}`

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Cannot get cat. ${response.statusText}`)
  }

  return { url }
}

export function useCat(): [Cat | undefined, { refresh: () => void }] {
  return useAsync(getCat)
}