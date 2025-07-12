'use client'

import React from 'react'
import { X, Plus } from 'lucide-react'
import type { Exercise, Set } from '@/types/workout'

interface ExerciseInputProps {
  exercise: Exercise;
  onUpdate: (exercise: Exercise) => void;
  onRemove: () => void;
}

export default function ExerciseInput({ exercise, onUpdate, onRemove }: ExerciseInputProps) {
  const updateName = (name: string): void => {
    onUpdate({ ...exercise, name })
  }

  const addSet = (): void => {
    onUpdate({
      ...exercise,
      sets: [...exercise.sets, { weight: '', reps: '' }]
    })
  }

  const updateSet = (setIndex: number, field: keyof Set, value: string): void => {
    const newSets = exercise.sets.map((set, idx) =>
      idx === setIndex ? { ...set, [field]: value } : set
    )
    onUpdate({ ...exercise, sets: newSets })
  }

  const removeSet = (setIndex: number): void => {
    const newSets = exercise.sets.filter((_, idx) => idx !== setIndex)
    onUpdate({ ...exercise, sets: newSets })
  }

  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200">
      <div className="flex items-center gap-2 mb-3">
        <input
          type="text"
          placeholder="Exercise name"
          value={exercise.name}
          onChange={(e) => updateName(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={onRemove}
          className="text-red-500 hover:text-red-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-2">
        {exercise.sets.map((set, setIndex) => (
          <div key={setIndex} className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600 w-16">
              Set {setIndex + 1}
            </span>
            <input
              type="number"
              placeholder="Weight"
              value={set.weight}
              onChange={(e) => updateSet(setIndex, 'weight', e.target.value)}
              className="w-24 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-gray-500">kg</span>
            <input
              type="number"
              placeholder="Reps"
              value={set.reps}
              onChange={(e) => updateSet(setIndex, 'reps', e.target.value)}
              className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-gray-500">reps</span>
            {exercise.sets.length > 1 && (
              <button
                onClick={() => removeSet(setIndex)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={addSet}
        className="mt-2 text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
      >
        <Plus className="w-4 h-4" />
        Add Set
      </button>
    </div>
  )
}