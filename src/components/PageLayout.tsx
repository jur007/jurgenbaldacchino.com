import type { ReactNode } from 'react'

type PageLayoutProps = {
  children: ReactNode
}

function PageLayout({ children }: PageLayoutProps) {
  return <div className="page-layout">{children}</div>
}

export default PageLayout
