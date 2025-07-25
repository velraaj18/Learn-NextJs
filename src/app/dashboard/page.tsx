'use client'

import { Card } from 'primereact/card'

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      <Card title="Recent Transactions" className="shadow-md">
        <p className="m-0 text-gray-700">+ ₹5,000 • - ₹1,200</p>
      </Card>

      <Card title="Total Expenses" className="shadow-md">
        <p className="m-0 text-red-600 font-bold text-lg">₹12,345</p>
      </Card>

      <Card title="Accounts" className="shadow-md">
        <p className="m-0 text-gray-700">2 Bank Accounts</p>
      </Card>

      <Card title="Stats" className="shadow-md">
        <p className="m-0 text-green-600 font-bold text-lg">+ ₹8,250 Net</p>
      </Card>
    </div>
  )
}
