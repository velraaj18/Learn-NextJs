'use client'

import { Menubar } from 'primereact/menubar'
import { useRouter } from 'next/navigation'

export default function TopBar() {
  const router = useRouter()

  const start = (
    <span className="text-lg font-bold">💰 Money Manager</span>
  )

  const end = (
    <button
      onClick={() => router.push('/login')}
      className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100 transition"
    >
      Logout
    </button>
  )

  return (
    <Menubar start={start} end={end} className="!rounded-none bg-blue-600 border-none" />
  )
}
