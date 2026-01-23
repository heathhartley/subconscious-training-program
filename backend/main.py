import os
import random
from datetime import datetime, timedelta
from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from subconscious import Subconscious
import json

from subconscious import Subconscious
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app = FastAPI(title="Training Plan API")
# Allow all origins (development only)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 🔥 This allows requests from ANY origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Secure in Elastic BeanStalk - no need for secrets manager
SUBCONSCIOUS_API_KEY = os.environ.get("SUBCONSCIOUS_API_KEY") 

@app.get("/")
def root():
    return {"status": "ok"}

@app.post("/generate")
async def generate_endpoint(request: Request):
    body = await request.json()
    goal = body.get("goal", "Build me a 10k plan")
    instructions = body.get("instructions", "")
    print("goal")
    print(goal)
    print("instructions")
    print(instructions)

    # Construct prompt for Subconscious
    prompt = f"""
    System Goal:
    Generate a training plan for your client based on their goals, instructions, and past data. Give the plan in a json format as describe below.

    Who you are:
    You are a professional fitness coach that focuses on creating personalized fitness plans based on your customers wants. Focus on the users instruction and goals to create the personalized plan. 
    You may use past history from strava to better understand your clients fitness journey. 

    User's goal:
    {goal}
    User's instructions for training plan:
    {instructions}

    Example json output (your output should follow this structure, but the number of weeks, workouts per week, and distances can vary based on the user’s goals and experience):

    {{
        "name": "Sample Training Plan",
        "description": "A personalized program to improve running performance",
        "total_weeks": 1,
        "weeks": [
            {{
                "week": 1,
                "description": "Base endurance week",
                "workouts": [
                    {{"day": "Monday", "type": "Run", "miles": 3, "duration": "30 min", "description": "Easy run to build base"}},
                    {{"day": "Tuesday", "type": "Rest", "miles": 0, "duration": "0 min", "description": "Rest"}},
                    {{"day": "Wednesday", "type": "Run", "miles": 4, "duration": "35 min", "description": "Steady run to build endurance"}},
                    {{"day": "Thursday", "type": "Workout", "miles": 0, "duration": "1 hr", "description": "Chest workout"}},
                    {{"day": "Friday", "type": "Run", "miles": 2, "duration": "20 min", "description": "Short recovery run"}},
                    {{"day": "Saturday", "type": "Rest", "miles": 0, "duration": "0 min", "description": "Rest"}},
                    {{"day": "Sunday", "type": "Rest", "miles": 0, "duration": "0 min", "description": "Rest"}}
                ]
            }}
        ]
    }}

    Additional Details:
    - The user's goal overrides any of these instructions if they specifically ask for it.
    - Provide the correct number of training weeks based on the user's goals and past metrics.
    - Each week should have 3-5 workouts depending on user goals and past experience.
    - Include realistic progression in intensity.
    - Use clear, concise language.
    - Days can be skipped for rest.

    Negative instructions:
    - DO NOT add explanations, commentary, or anything outside the JSON.
    - DO NOT include personal greetings or salutations.
    - DO NOT add HTML or markdown formatting.
    - DO NOT add unescaped double quotes (") in any JSON value. Use escaped quotes (\") if needed.
    - Output **valid JSON only**, no additional commentary or formatting.
    - Your output should be pure JSON.

    ---


    """
    # Give your final response formatted in markdown.

    client = Subconscious(api_key=SUBCONSCIOUS_API_KEY)


    run = client.run(
        engine="tim-gpt",
        input={
            "instructions": prompt,
            "tools": [{"type": "platform", "id": "strava_information"}],
        },
        options={"await_completion": False},  
    )

    return {"runId": run.run_id}

@app.post("/poll")
async def poll_endpoint(request: Request):
    body = await request.json()
    run_id = body.get("runId")

    if not run_id:
        return {"status": "Failed", "message": "Missing runId"}
    client = Subconscious(api_key=SUBCONSCIOUS_API_KEY)


    # Get current run status from Subconscious
    result = client.get(run_id)  # 'queued' | 'running' | 'succeeded' | 'failed'

    if result.status == "succeeded":
        try:
            # Parse the JSON string from the AI
            plan_json = json.loads(result.result.answer)
            return {"status": "Completed", "plan": plan_json}
        except Exception as e:
            print("Failed to parse plan JSON:", e)
            return {"status": "Failed", "message": "Invalid JSON from AI"}

    elif result.status == "failed":
        return {"status": "Failed"}
    else:
        return {"status": "Pending"}


@app.get("/strava")
def get_strava_stats(request: Request):
    today = datetime.utcnow()
    activities = []

    for i in range(20):
        day = today - timedelta(days=i)

        # Randomly decide if it's a run (60% chance)
        is_run = random.random() < 0.6

        if is_run:
            # Random distance between 3 and 10 miles
            distance_miles = round(random.uniform(3, 10), 1)
            # Random pace between 6:00 and 9:00 minutes per mile
            pace_min = random.randint(6, 9)
            pace_sec = random.randint(0, 59)
            total_minutes = round(distance_miles * (pace_min + pace_sec / 60))

            avg_pace = f"{pace_min}:{pace_sec:02d}/mi"
        else:
            distance_miles = 0
            total_minutes = 0
            avg_pace = None

        activities.append({
            "id": 1000 + i,
            "date": day.strftime("%Y-%m-%d"),
            "type": "Run" if is_run else "Rest",
            "distance_miles": distance_miles,
            "duration_min": total_minutes,
            "avg_pace": avg_pace,
        })

    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps({
            "athlete": {
                "id": "demo-user-123",
                "name": "Demo Runner"
            },
            "activities_last_10_days": activities
        })
    }


