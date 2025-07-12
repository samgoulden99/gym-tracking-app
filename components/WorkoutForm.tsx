'use client'

import React, { useState } from 'react'
import { Calendar, Plus } from 'lucide-react'
import ExerciseInput from './ExerciseInput'
import type { CurrentWorkout, Exercise, Workout } from '@/types/workout'

interface WorkoutFormProps {
  onSave: (workout: Workout) => Promise<void>;
}

export default function WorkoutForm({ onSave }: WorkoutFormProps) {
  const [currentWorkout, setCurrentWorkout] = useState<CurrentWorkout>({
    date: new Date().toISOString().split('T')[0],
    exercises: []
  })

  const addExercise = (): void => {
    setCurrentWorkout({
      ...currentWorkout,
      exercises: [...currentWorkout.exercises, {
        id: Date.now(),
        name: '',
        sets: [{ weight: '', reps: '' }]
      }]
    })
  }

  const updateExercise = (exerciseId: number, updatedExercise: Exercise): void => {
    setCurrentWorkout({
      ...currentWorkout,
      exercises: currentWorkout.exercises.map(ex =>
        ex.id === exerciseId ? updatedExercise : ex
      )
    })
  }

  const removeExercise = (exerciseId: number): void => {
    setCurrentWorkout({
      ...currentWorkout,
      exercises: currentWorkout.exercises.filter(ex => ex.id !== exerciseId)
    })
  }

  const saveWorkout = (): void => {
    if (currentWorkout.exercises.length === 0) return
    
    const workoutToSave: Workout = {
      ...currentWorkout,
      id: Date.now(),
      exercises: currentWorkout.exercises.filter(ex => 
        ex.name && ex.sets.some(set => set.weight && set.reps)
      )
    }

    if (workoutToSave.exercises.length > 0) {
      onSave(workoutToSave)
      setCurrentWorkout({
        date: new Date().toISOString().split('T')[0],
        exercises: []
      })
    }
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Current Workout
        </h2>
        <input
          type="date"
          value={currentWorkout.date}
          onChange={(e) => setCurrentWorkout({ ...currentWorkout, date: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {currentWorkout.exercises.map((exercise) => (
        <ExerciseInput
          key={exercise.id}
          exercise={exercise}
          onUpdate={(updated) => updateExercise(exercise.id, updated)}
          onRemove={() => removeExercise(exercise.id)}
        />
      ))}

      <div className="flex gap-2">
        <button
          onClick={addExercise}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Exercise
        </button>
        {currentWorkout.exercises.length > 0 && (
          <button
            onClick={saveWorkout}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Save Workout
          </button>
        )}
      </div>
    </div>
  )
}