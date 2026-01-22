import type { TrainingPlan } from "./types/workouts";

export const fakePlans: TrainingPlan[] = [
  {
    name: "Beginner 5K",
    weeks: [
      {
        week: 1,
        description: "Build consistency with easy running",
        workouts: [
          {
            day: "Monday",
            type: "Easy Run",
            duration: "20 min",
            description: "Comfortable pace, focus on form",
          },
          {
            day: "Wednesday",
            type: "Run / Walk",
            duration: "25 min",
            description: "Alternate running and walking",
          },
          {
            day: "Saturday",
            type: "Long Easy Run",
            duration: "30 min",
            description: "Slow pace, build endurance",
          },
        ],
      },
    ],
  },
  {
    name: "10K Builder",
    weeks: [
      {
        week: 1,
        description: "Introduce structure and aerobic strength",
        workouts: [
          {
            day: "Tuesday",
            type: "Tempo",
            duration: "30 min",
            description: "Comfortably hard effort",
          },
          {
            day: "Thursday",
            type: "Easy Run",
            duration: "35 min",
            description: "Relaxed aerobic pace",
          },
          {
            day: "Sunday",
            type: "Long Run",
            duration: "50 min",
            description: "Steady endurance run",
          },
        ],
      },
    ],
  },
  {
    name: "Half Marathon Base",
    weeks: [
      {
        week: 1,
        description: "Build mileage safely",
        workouts: [
          {
            day: "Monday",
            type: "Recovery Run",
            duration: "30 min",
            description: "Very easy effort",
          },
          {
            day: "Wednesday",
            type: "Steady Run",
            duration: "45 min",
            description: "Moderate, controlled pace",
          },
          {
            day: "Saturday",
            type: "Long Run",
            duration: "75 min",
            description: "Slow, conversational pace",
          },
        ],
      },
    ],
  },
  {
    name: "Strength + Conditioning",
    weeks: [
      {
        week: 1,
        description: "Full-body strength foundation",
        workouts: [
          {
            day: "Monday",
            type: "Strength",
            duration: "45 min",
            description: "Squats, push-ups, core work",
          },
          {
            day: "Wednesday",
            type: "Mobility",
            duration: "30 min",
            description: "Stretching and movement prep",
          },
          {
            day: "Friday",
            type: "Strength",
            duration: "45 min",
            description: "Deadlifts, lunges, core",
          },
        ],
      },
    ],
  },
];
