import { useMemo, useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert'
import { useConfig } from './hooks/useConfig'
import { useNodes } from './hooks/useNodes'
import { Background } from './components/Background'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { NodeCard } from './components/NodeCard'
import { NodeTable } from './components/NodeTable'
import { NodeDetail } from './components/NodeDetail'
import type { View } from './types'

const DEFAULT_LOGO = 'https://nodeget-docs.pages.dev/logo.png'

export function App() {
  const { config, error: configError } = useConfig()
  const { nodes, errors, loading } = useNodes(config)

  const [view, setView] = useState<View>('cards')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<string | null>(null)

  const list = useMemo(() => {
    const arr = [...nodes.values()].filter(n => !n.meta?.hidden)
    const q = query.trim().toLowerCase()
    const filtered = q
      ? arr.filter(n => {
          const hay = [
            n.uuid,
            n.source,
            n.meta?.name,
            n.meta?.region,
            n.meta?.virtualization,
            n.static?.system?.system_host_name,
            n.static?.system?.system_name,
            ...(Array.isArray(n.meta?.tags) ? n.meta.tags : []),
          ]
            .filter(Boolean)
            .join(' ')
            .toLowerCase()
          return hay.includes(q)
        })
      : arr
    return filtered.sort((a, b) => {
      if (a.online !== b.online) return a.online ? -1 : 1
      const an = a.meta?.name || a.uuid
      const bn = b.meta?.name || b.uuid
      return an.localeCompare(bn)
    })
  }, [nodes, query])

  const selectedNode = selected ? nodes.get(selected) || null : null

  if (configError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <Alert variant="destructive" className="max-w-lg">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>加载 config.json 失败</AlertTitle>
          <AlertDescription>{String(configError.message || configError)}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        加载中…
      </div>
    )
  }

  const logo = config.site_logo || config.site_log || DEFAULT_LOGO
  const empty = list.length === 0
  const hasErrors = errors.length > 0

  return (
    <div className="min-h-screen flex flex-col">
      <Background />
      <Navbar
        siteName={config.site_name || '你没设置'}
        logo={logo}
        query={query}
        onQuery={setQuery}
        view={view}
        onView={setView}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 space-y-6">
        {empty && loading && (
          <div className="py-20 text-center text-muted-foreground">连接后端中…</div>
        )}
        {empty && !loading && !hasErrors && (
          <div className="py-20 text-center text-muted-foreground">暂无节点</div>
        )}

        {!empty && view === 'cards' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {list.map(n => (
              <NodeCard key={n.uuid} node={n} onOpen={setSelected} />
            ))}
          </div>
        )}
        {!empty && view === 'table' && <NodeTable nodes={list} onOpen={setSelected} />}

        {hasErrors && (
          <Alert variant="warning">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>{errors.length} 个后端错误</AlertTitle>
            <AlertDescription>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                {errors.map((e, i) => (
                  <li key={i}>
                    <b>{e.source}</b>：
                    {e.error instanceof Error ? e.error.message : String(e.error)}
                  </li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}
      </main>

      <Footer text={config.theme_config?.footer} />

      <NodeDetail node={selectedNode} onClose={() => setSelected(null)} />
    </div>
  )
}
