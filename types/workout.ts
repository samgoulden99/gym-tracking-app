export interface Set {
  weight: string;
  reps: string;
}

export interface Exercise {
  id: number;
  name: string;
  sets: Set[];
}

export interface Workout {
  id: number;
  date: string;
  exercises: Exercise[];
}

export interface CurrentWorkout {
  date: string;
  exercises: Exercise[];
}