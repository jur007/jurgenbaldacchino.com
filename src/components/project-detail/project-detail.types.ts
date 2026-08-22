import type { IProject } from "@data/showcase"

export interface IProjectDetail {
  project: IProject
  onBack: () => void
  className?: string
}
