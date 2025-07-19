'use client'

import React, { useState, useEffect } from 'react'
import { Dumbbell, LogOut } from 'lucide-react'
import WorkoutForm from './WorkoutForm'
import WorkoutHistory from './WorkoutHistory'
import { loadWorkouts, saveWorkouts } from '@/lib/storage'
import { useAuth } from '@/contexts/AuthContext'
import type { Workout } from '@/types/workout'

export default function GymTracker() {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { logout } = useAuth()

  useEffect(() => {
    const fetchWorkouts = async () => {
      const loaded = await loadWorkouts()
      setWorkouts(loaded)
      setIsLoading(false)
    }
    
    fetchWorkouts()
  }, [])

  const handleSaveWorkout = async (workout: Workout): Promise<void> => {
    const newWorkouts = [workout, ...workouts]
    setWorkouts(newWorkouts)
    await saveWorkouts(newWorkouts)
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Dumbbell className="w-8 h-8 text-blue-600" />
            Gym Routine Tracker
          </h1>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        <WorkoutForm onSave={handleSaveWorkout} />
        <WorkoutHistory workouts={workouts} />
      </div>
    </div>
  )
}