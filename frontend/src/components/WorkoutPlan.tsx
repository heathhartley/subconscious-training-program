import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Circle, Calendar, Timer } from "lucide-react";

export interface Workout {
  day: string;
  type: string;
  duration: string;
  description: string;
  miles?: number;
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

interface WorkoutPlanProps {
  plan: TrainingPlan;
}

export function WorkoutPlan({ plan }: WorkoutPlanProps) {
  const [activeWeek, setActiveWeek] = React.useState(0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Calendar className="w-6 h-6 text-blue-600" />
          {plan.name} - Training Plan
        </CardTitle>
        <CardDescription>Your personalized weekly workout schedule</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Week selector */}
        <div className="flex gap-2 mb-4">
          {plan.weeks.map((week, idx) => (
            <button
              key={idx}
              className={`px-3 py-1 rounded ${
                activeWeek === idx ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setActiveWeek(idx)}
            >
              Week {week.week}
            </button>
          ))}
        </div>

        {/* Show active week content */}
        {plan.weeks.map((week, idx) => {
          if (idx !== activeWeek) return null; // only render active week

          return (
            <div key={idx}>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-blue-900 mb-1">Week {week.week} Focus</h3>
                <p className="text-sm text-blue-700">{week.description}</p>
              </div>

              <div className="space-y-3 mb-4">
                {week.workouts.map((workout, workoutIdx) => (
                  <Card key={workoutIdx} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4 flex items-start gap-4">
                      <div className="flex items-center gap-2 min-w-[100px]">
                        <Circle className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-gray-900">{workout.day}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="secondary">{workout.type}</Badge>
                          <span className="text-sm text-gray-600 flex items-center gap-1">
                            <Timer className="w-3 h-3" />
                            {workout.duration}
                          </span>
                          {workout.miles !== undefined && (
                            <span className="text-sm text-gray-600 flex items-center gap-1">
                              {workout.miles} mi
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-700">{workout.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}