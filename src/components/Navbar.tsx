import { Search } from './Search'
import { ViewToggle } from './ViewToggle'
import { ThemeToggle } from './ThemeToggle'
import type { View } from '../types'

interface Props {
  siteName: string
  logo?: string
  query: string
  onQuery: (v: string) => void
  view: View
  onView: (v: View) => void
}

export function Navbar({ siteName, logo, query, onQuery, view, onView }: Props) {
  return (
    <header className="sticky top-0 z-10 backdrop-blur bg-background/80 border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 px-4 sm:px-6 py-3">
        <div className="flex items-center gap-2 min-w-0 shrink-0">
          {logo && <img src={logo} alt="" className="w-6 h-6 rounded shrink-0" />}
          <span className="font-semibold tracking-wide truncate">{siteName}</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <Search value={query} onChange={onQuery} />
          <ViewToggle value={view} onChange={onView} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
