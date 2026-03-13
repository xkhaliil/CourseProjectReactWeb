import useAsync from "../../../shared/useAsync"

export type Dog = {
  url: string
}

export async function getDog(): Promise<Dog> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const url = `https://cataas.com/cat?v=${Date.now()}`

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Cannot get dog. ${response.statusText}`)
  }

  return { url }
}

export function useDog(): [Dog | undefined, { refresh: () => void }] {
  return useAsync(getDog)
}