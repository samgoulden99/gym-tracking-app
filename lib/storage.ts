import { createClient } from '@supabase/supabase-js'
import type { Workout } from '@/types/workout'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

export async function loadWorkouts(): Promise<Workout[]> {
  const { data, error } = await supabase
    .from('workouts')
    .select('*')
    .order('date', { ascending: false })
  
  if (error) {
    console.error('Error loading workouts:', error)
    throw error
  }
  
  return data || []
}

export async function saveWorkouts(workouts: Workout[]): Promise<void> {
  if (workouts.length === 0) return
  
  // Save only the most recent workout (the first one)
  const latestWorkout = workouts[0]
  
  const { error } = await supabase
    .from('workouts')
    .insert([{
      date: latestWorkout.date,
      exercises: latestWorkout.exercises
    }])
  
  if (error) {
    console.error('Error saving to Supabase:', error)
    throw error
  }
}

export async function clearWorkouts(): Promise<void> {
  const { error } = await supabase
    .from('workouts')
    .delete()
    .neq('id', 0) // Delete all records
  
  if (error) {
    console.error('Error clearing workouts:', error)
    throw error
  }
}