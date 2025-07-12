import type { Workout } from '@/types/workout'

export async function loadWorkouts(): Promise<Workout[]> {
  try {
    const response = await fetch('/api/workouts')
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error loading workouts:', error)
    throw error
  }
}

export async function saveWorkouts(workouts: Workout[]): Promise<void> {
  if (workouts.length === 0) return
  
  try {
    const response = await fetch('/api/workouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ workouts }),
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error saving workouts:', error)
    throw error
  }
}

export async function clearWorkouts(): Promise<void> {
  try {
    const response = await fetch('/api/workouts', {
      method: 'DELETE',
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error clearing workouts:', error)
    throw error
  }
}