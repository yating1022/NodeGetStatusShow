import { LayoutGrid, Table } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs'
import type { View } from '../types'

export function ViewToggle({ value, onChange }: { value: View; onChange: (v: View) => void }) {
  return (
    <Tabs value={value} onValueChange={v => onChange(v as View)}>
      <TabsList>
        <TabsTrigger value="cards">
          <LayoutGrid className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">卡片</span>
        </TabsTrigger>
        <TabsTrigger value="table">
          <Table className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">表格</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
