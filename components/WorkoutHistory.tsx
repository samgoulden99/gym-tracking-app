'use client'

import React, { useState } from 'react'
import { Clock, ChevronDown, ChevronUp } from 'lucide-react'
import type { Workout } from '@/types/workout'

interface WorkoutHistoryProps {
  workouts: Workout[];
}

export default function WorkoutHistory({ workouts }: WorkoutHistoryProps) {
  const [showHistory, setShowHistory] = useState<boolean>(false)
  const [expandedWorkouts, setExpandedWorkouts] = useState<Record<number, boolean>>({})

  const toggleWorkoutExpansion = (workoutId: number): void => {
    setExpandedWorkouts(prev => ({
      ...prev,
      [workoutId]: !prev[workoutId]
    }))
  }

  return (
    <div>
      <button
        onClick={() => setShowHistory(!showHistory)}
        className="w-full flex items-center justify-between p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors mb-4"
      >
        <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Workout History ({workouts.length})
        </h2>
        {showHistory ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>

      {showHistory && (
        <div className="space-y-4">
          {workouts.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No workouts logged yet</p>
          ) : (
            workouts.map((workout) => (
              <div key={workout.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleWorkoutExpansion(workout.id)}
                  className="w-full p-4 hover:bg-gray-50 transition-colors flex items-center justify-between"
                >
                  <div className="text-left">
                    <div className="font-semibold text-gray-800">
                      {new Date(workout.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="text-sm text-gray-600">
                      {workout.exercises.length} exercise{workout.exercises.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                  {expandedWorkouts[workout.id] ? 
                    <ChevronUp className="w-5 h-5 text-gray-400" /> : 
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  }
                </button>

                {expandedWorkouts[workout.id] && (
                  <div className="px-4 pb-4">
                    {workout.exercises.map((exercise, idx) => (
                      <div key={idx} className="mb-3 last:mb-0">
                        <h4 className="font-medium text-gray-700 mb-1">{exercise.name}</h4>
                        <div className="space-y-1">
                          {exercise.sets.map((set, setIdx) => (
                            <div key={setIdx} className="text-sm text-gray-600">
                              Set {setIdx + 1}: {set.weight} kg × {set.reps} reps
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}