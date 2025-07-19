import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import type { Workout } from '@/types/workout'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

// GET /api/workouts - Load all workouts
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('workouts')
      .select('*')
      .order('date', { ascending: false })
    
    if (error) {
      console.error('Error loading workouts:', error)
      return NextResponse.json({ error: 'Failed to load workouts' }, { status: 500 })
    }
    
    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/workouts - Save new workout
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { workouts } = body as { workouts: Workout[] }
    
    if (!workouts || workouts.length === 0) {
      return NextResponse.json({ error: 'No workouts provided' }, { status: 400 })
    }
    
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
      return NextResponse.json({ error: 'Failed to save workout' }, { status: 500 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/workouts - Clear all workouts
export async function DELETE() {
  try {
    const { error } = await supabase
      .from('workouts')
      .delete()
      .neq('id', 0) // Delete all records
    
    if (error) {
      console.error('Error clearing workouts:', error)
      return NextResponse.json({ error: 'Failed to clear workouts' }, { status: 500 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}