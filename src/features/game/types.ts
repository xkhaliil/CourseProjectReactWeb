import type { ComponentType, LazyExoticComponent } from "react"

export type Game = {
  title: string
  Play: LazyExoticComponent<ComponentType>
}