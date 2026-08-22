import type { IProject } from "@data/showcase"

export interface IShowcaseCard {
  project: IProject
  onSelect: (project: IProject) => void
  className?: string
}
