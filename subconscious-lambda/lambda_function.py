import os
import json
from subconscious import Subconscious

# Subconscious API key as environment variable
SUBCONSCIOUS_KEY = os.environ.get("SUBCONSCIOUS_KEY")


def lambda_handler(event, context):
    body = json.loads(event.get("body", "{}"))
    goal = body.get("goal", "Build me a 10k plan")
    instructions = body.get("instructions", "")

    # Construct prompt for Subconscious
    prompt = f"""
        System Goal: 
        Generate a training plan for your client based on their goals, users past data, and quality training progams on the web.

        Who you are:
        You are a professional fitness coach that focuses on running and strength. Your job is to generate **personalized training programs** for users. 

        User's goal:
        {goal}
        {instructions}

        Addional Details:
        - The users goal overrides any of these instructions of they specificlaly ask for it.
        - Provide the correct number of training weeks based in the users goals and if available past metrics.
        - Each week should have 3-5 workouts depending on the user goals and past experience.
        - Include realistic progression in intensity.
        - Use clear, concise language.
        - Days can be skipped for rest.

        Negative instructions:
        - DO NOT add explanations, commentary, or anything outside the JSON.
        - DO NOT include personal greetings or salutations.
        - DO NOT add HTML or markdown formatting.
        """

    client = Subconscious(api_key=SUBCONSCIOUS_KEY)

    
    run = client.run(
    engine="tim-small-preview",
    input={
        "instructions": prompt,
        "tools": [
            {"type": "platform", "id": "web_search"},
            {"type": "function", "id": "strava_stats"}
        ],
        "answerFormat": {
            "type": "object",
            "title": "TrainingPlan",
            "properties": {
                "name": {"type": "string"},
                "description": {"type": "string"},
                "goal": {"type": "string"},
                "level": {"type": "string", "enum": ["beginner", "intermediate", "advanced"]},
                "primary_focus": {"type": "string"},
                "total_weeks": {"type": "integer"},
                "weeks": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "week": {"type": "integer"},
                            "description": {"type": "string"},
                            "workouts": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "day": {"type": "string"},
                                        "type": {"type": "string", "enum": ["Run", "Strength", "Cross-Training", "Rest"]},
                                        "purpose": {"type": "string"},
                                        "miles": {"type": "number"},
                                        "duration": {"type": "string"},
                                        "description": {"type": "string"}
                                    },
                                    "required": ["day", "type", "purpose", "miles", "duration", "description"]
                                }
                            }
                        },
                        "required": ["week", "description", "workouts"]
                    }
                }
            },
            "required": ["name", "description", "goal", "level", "primary_focus", "total_weeks", "weeks"]
        }
    },
    options={"await_completion": True},
)

    print(run.result.answer)


    return {
        "statusCode": 200,
        "body": json.dumps({"plan": run.result.answer})
    }
