import type { IProject } from "@data/showcase"

export interface ICaseStudyModal {
  project: IProject | null
  isOpen: boolean
  onClose: () => void
  className?: string
}
