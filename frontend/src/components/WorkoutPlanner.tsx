import { useState } from "react";
import { WorkoutPlan } from "./WorkoutPlan";
import { StravaIntegration } from "./StravaIntegration";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/Card";
import { Button } from "./ui/Button";
import { Textarea } from "./ui/TextArea";
import { Badge } from "./ui/Badge";
import { motion } from "framer-motion";
import type { TrainingPlan } from "../types/workouts";
import { fakePlans } from "../fakePlans";


export function WorkoutPlanner() {
  const [plan, setPlan] = useState<TrainingPlan | null>(null);
  const [connected, setConnected] = useState(false);
  const [goalInput, setGoalInput] = useState("");

async function generatePlan(goal?: string) {
  // TODO: Replace this with Subconscious agent call
  // const res = await fetch(import.meta.env.VITE_AGENT_URL, {
  //   method: "POST",
  //   body: JSON.stringify({ goal: goal ?? goalInput ?? "Build me a 10k plan" }),
  // });
  // const data = await res.json();
  // setPlan(data.plan);

  // --- TEMP: hardcoded demo plan ---
  console.log(goal)
  const demoPlan = fakePlans[0]; // pick the first fake plan
  setPlan(demoPlan);
}


  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
          TrainSmart
        </h1>
        <p className="text-gray-600 mt-2">
          Personalized training programs to reach your goals
        </p>
      </motion.div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: Goal + Presets */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Describe your training goal</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <Textarea
                className="min-h-[100px]"
                placeholder="Example: I want to run a 10k in 8 weeks"
                value={goalInput}
                onChange={(e) => setGoalInput(e.target.value)}
              />

              {/* Preset Goals */}
              <div className="flex flex-wrap gap-2">
                <Badge onClick={() => generatePlan("Couch to 5k")} variant="outline">
                  🏃 Couch → 5K
                </Badge>
                <Badge onClick={() => generatePlan("Train for a 10k")} variant="outline">
                  🎯 10K Training
                </Badge>
                <Badge onClick={() => generatePlan("Half marathon plan")} variant="outline">
                  🏅 Half Marathon
                </Badge>
                <Badge onClick={() => generatePlan("Strength training")} variant="outline">
                  💪 Strength
                </Badge>
              </div>

              <Button
                onClick={() => generatePlan()}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Generate Training Plan
              </Button>
            </CardContent>
          </Card>


        {/* Workout Plan */}
        <Card>
            <CardHeader>
              <CardTitle>Describe your training goal</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
                {plan && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <WorkoutPlan plan={plan} />
                    </motion.div>
                )}
            </CardContent>
        </Card>
        </motion.div>

        {/* RIGHT: Integrations */}
        <div className="space-y-6">
          {/* Strava */}
          <StravaIntegration
            connected={connected}
            onConnect={() => setConnected(true)}
          />

          {/* Garmin (Dummy) */}
          <Card>
            <CardHeader>
              <CardTitle>Garmin</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Garmin integration coming soon.
              </p>
              <Button disabled className="mt-3 w-full">
                Connect Garmin
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>


    <Card>
        <CardHeader>
            <CardTitle>Predefined Training Plans</CardTitle>
        </CardHeader>

        <CardContent>
            {/* Predefined Plans (visual only) */}
            <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
            >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-80">
                {fakePlans.map((fakePlan) => (
                <WorkoutPlan key={fakePlan.name} plan={fakePlan} />
                ))}
            </div>

            <p className="text-xs text-gray-500">
                *These plans are examples and are not yet selectable.
            </p>
            </motion.div>
        </CardContent>
    </Card>


    </div>
  );
}
