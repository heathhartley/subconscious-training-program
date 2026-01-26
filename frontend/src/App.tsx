import { useState, useEffect, useRef } from "react";
import { WorkoutPlan } from "./components/WorkoutPlan";
import { StravaIntegration } from "./components/StravaIntegration";
import { Card, CardHeader, CardTitle, CardContent } from "./components/ui/Card";
import { Button } from "./components/ui/Button";
import { Textarea } from "./components/ui/TextArea";
import { Badge } from "./components/ui/Badge";
import { motion } from "framer-motion";
import type { TrainingPlan } from "./types/workouts";


export default function App() {
  const [plan, setPlan] = useState<TrainingPlan | null>(null);
  const [connected, setConnected] = useState(false);
  const [instruction, setInstruction] = useState("");
  const [goal, setGoal] = useState("");
  const [loadingPlan, setLoadingPlan] = useState(false);
  const [runId, setRunId] = useState<string | null>(null);
  const pollCountRef = useRef(0);
  const EB_URL = "http://fastapi-docker-env.eba-x4kttb5c.us-east-1.elasticbeanstalk.com";

  const generatePlan = async () => {
    setLoadingPlan(true);

    const body = {
      goal: goal ?? "Build me a 10k plan",
      instructions: instruction ?? ""
    };

    try {
      const res = await fetch(`${EB_URL}/generate`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error(`Lambda request failed: ${res.status}`);
      }
      console.log("res");
      console.log(res);
      const data: { runId: string } = await res.json();
      console.log("Generated runId:", data.runId);

      console.log(data.runId);
      setRunId(data.runId);

    } catch (err) {
      console.error("Error starting plan generation:", err);
      setLoadingPlan(false);
    }
  }

  const pollPlan = async () => {
    pollCountRef.current += 1;

    if (pollCountRef.current >= 30) {
      console.error("Max polling attempts reached");
      setLoadingPlan(false);
      setRunId(null);
      return;
    }

    try {
      const res = await fetch(`${EB_URL}/poll`, {
        method: "POST",
        body: JSON.stringify({ runId }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error("Polling request failed");
      }

      const data: {
        status: "Pending" | "Completed" | "Failed";
        plan?: any;
        message?: string;
      } = await res.json();

      console.log("Polling response:", data);

      if (data.status === "Completed" && data.plan) {
        let parsedPlan: TrainingPlan | null = null;

        try {
          // In case the backend returned a string by mistake
          parsedPlan =
            typeof data.plan === "string" ? JSON.parse(data.plan) : data.plan;
        } catch (err) {
          console.error("Failed to parse plan JSON:", err);
          parsedPlan = null;
        }

        setPlan(parsedPlan); // if parsing failed, plan will be null
        setLoadingPlan(false);
        setRunId(null);
        return;
      }

      if (data.status === "Failed") {
        console.error("Plan generation failed", data.message);
        setLoadingPlan(false);
        setRunId(null);
        return;
      }
    } catch (err) {
      console.error("Polling error:", err);
      // optional: show a user-friendly message
      setLoadingPlan(false);
      setRunId(null);
    }
  };

  useEffect(() => {
    if (!runId) return;

    pollCountRef.current = 0;

    let intervalId: number;
    let timeoutId: number;

    timeoutId = window.setTimeout(() => {
      pollPlan(); // first poll after 10s
      intervalId = window.setInterval(pollPlan, 10_000);
    }, 10_000);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [runId]);



  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50  to-orange-50">
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
                  <CardTitle>Describe your ideal training plan</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <Textarea
                    className="min-h-[100px]"
                    placeholder="Example: I want to run a 10k in 8 weeks"
                    value={instruction}
                    onChange={(e) => setInstruction(e.target.value)}
                  />

                  {/* Preset Goals */}
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: "Hit a Goal", emoji: "🎯" },
                      { label: "Increase Speed", emoji: "🏃" },
                      { label: "Functional Fitness", emoji: "🤸" },
                      { label: "Strength training", emoji: "💪" },
                      { label: "Weight Loss", emoji: "🔥" },
                    ].map(({ label, emoji }) => (
                      <Badge
                        key={label}
                        onClick={() => setGoal(label)}
                        variant={goal === label ? "default" : "outline"} // ✅ highlight selected
                        // className="cursor-pointer"
                        className="cursor-pointer transition-all duration-150 hover:scale-105"
                      >
                        {emoji} {label}
                      </Badge>
                    ))}

                  </div>

                  <Button
                    onClick={generatePlan}
                    disabled={loadingPlan} // disable while loading
                    className={`w-full ${loadingPlan ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
                  >
                    {loadingPlan ? "Generating..." : "Generate Training Plan"}
                </Button>
              </CardContent>
            </Card>

            {/* Workout Plan */}
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                🏃‍♂️ Your Personalized Training Plan
              </CardTitle>
              <CardContent>
                We'll generate a plan tailored to your goals and current fitness level.
              </CardContent>
            </CardHeader>

            <CardContent className="space-y-4">
              {!plan && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-2 text-center"
            >
            {loadingPlan &&
              <> 
                <p className="text-gray-500 text-lg">
                  🎯 Plan will appear here once it's ready...
                </p>
                {/* Smaller spinning circle */}
                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                  <p className="text-gray-400 text-sm mt-2">
                    Hang tight, our AI coach is building your perfect schedule! It may take 1 - 2 minutes to generate.
                  </p>
                </>
              }
              
            
            </motion.div>
          )}

        {plan && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
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

              <Card>
                <CardHeader>
                  <CardTitle>Apple</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Apple integration coming soon.
                  </p>
                  <Button
                    disabled
                    variant="outline"
                    className="mt-3 w-full border-gray-300 text-gray-600 bg-white hover:bg-white"
                  >
                    Connect Apple Health
                </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
