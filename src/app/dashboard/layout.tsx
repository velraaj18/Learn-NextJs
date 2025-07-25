'use client'

import { Menubar } from 'primereact/menubar'
import { PanelMenu } from 'primereact/panelmenu'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import TopBar from '@/components/TopBar'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter()

  const sidebarItems = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      command: () => router.push('/dashboard'),
    },
    {
      label: 'Accounts',
      icon: 'pi pi-wallet',
      command: () => router.push('/dashboard/accounts'),
    },
    {
      label: 'Transactions',
      icon: 'pi pi-list',
      command: () => router.push('/dashboard/transactions'),
    },
    {
      label: 'Stats',
      icon: 'pi pi-chart-line',
      command: () => router.push('/dashboard/stats'),
    },
  ]

  return (
    <div className="h-screen flex flex-col">
      <TopBar/>
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-gray-50 p-3 overflow-y-auto border-r">
          <PanelMenu model={sidebarItems} className="w-full" />
        </div>
        <main className="flex-1 p-6 overflow-auto bg-gray-50">{children}</main>
      </div>
    </div>
  )
}
