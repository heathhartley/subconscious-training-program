export interface Workout {
  day: string;
  type: string;
  duration: string;
  description: string;
}

export interface TrainingWeek {
  week: number;
  description: string;
  workouts: Workout[];
}

export interface TrainingPlan {
  name: string;
  weeks: TrainingWeek[];
}
