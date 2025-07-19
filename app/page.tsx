'use client'

import GymTracker from '@/components/GymTracker'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function Home() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gray-50">
        <GymTracker />
      </main>
    </ProtectedRoute>
  )
}