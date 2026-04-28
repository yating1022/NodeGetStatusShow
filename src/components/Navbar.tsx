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
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2.5">
          {logo && <img src={logo} alt="" className="w-6 h-6 rounded" />}
          <span className="font-semibold tracking-wide">{siteName}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Search value={query} onChange={onQuery} />
          <ViewToggle value={view} onChange={onView} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
