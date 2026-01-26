import os
import json

from subconscious import Subconscious

def lambda_handler(event, context):
    body = json.loads(event.get("body", "{}"))
    run_id = body.get("runId")

    if run_id:
        print("Polling run:", run_id)
        return poll_subconsious(run_id)
    
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
    - Your output should be pure JSON.

    ---


    """
    # Give your final response formatted in markdown.

    # client = Subconscious(api_key="sk-c7004c25a318b3b00082fc44245c4f7b06f01f3042d74afc2859346cb9bb9212")


    # run = client.run(
    #     engine="tim-gpt",
    #     input={
    #         "instructions": prompt,
    #         "tools": [{"type": "platform", "id": "strava_information"}],
    #     },
    #     options={"await_completion": False},
    # )

    # print(run)

    

    new_run_id = "abc-123"  # generate this properly

    return {
        "statusCode": 200,
        "body": json.dumps({
            "runId": new_run_id
        })
    }


        
def poll_subconsious(run_id):
    if not run_id:
        return {
        "statusCode": 200,
        "body": json.dumps({
            "status": "Failed",
        })
    }

    example_json = {
        "name": "Sample Training Plan",
        "description": "A personalized program to improve running performance",
        "total_weeks": 1,
        "weeks": [
            {
                "week": 1,
                "description": "Base endurance week",
                "workouts": [
                    {"day": "Monday", "type": "Run", "miles": 3, "duration": "30 min", "description": "Easy run to build base"},
                    {"day": "Tuesday", "type": "Rest", "miles": 0, "duration": "0 min", "description": "Rest"},
                    {"day": "Wednesday", "type": "Run", "miles": 4, "duration": "35 min", "description": "Steady run to build endurance"},
                    {"day": "Thursday", "type": "Workout", "miles": 0, "duration": "1 hr", "description": "Chest workout"},
                    {"day": "Friday", "type": "Run", "miles": 2, "duration": "20 min", "description": "Short recovery run"},
                    {"day": "Saturday", "type": "Rest", "miles": 0, "duration": "0 min", "description": "Rest"},
                    {"day": "Sunday", "type": "Rest", "miles": 0, "duration": "0 min", "description": "Rest"}
                ]
            },
            {
                "week": 2,
                "description": "Base endurance week",
                "workouts": [
                    {"day": "Monday", "type": "Run", "miles": 3, "duration": "30 min", "description": "Easy run to build base"},
                    {"day": "Tuesday", "type": "Rest", "miles": 0, "duration": "0 min", "description": "Rest"},
                    {"day": "Wednesday", "type": "Run", "miles": 4, "duration": "35 min", "description": "Steady run to build endurance"},
                    {"day": "Thursday", "type": "Workout", "miles": 0, "duration": "1 hr", "description": "Chest workout"},
                    {"day": "Friday", "type": "Run", "miles": 2, "duration": "20 min", "description": "Short recovery run"},
                    {"day": "Saturday", "type": "Rest", "miles": 0, "duration": "0 min", "description": "Rest"},
                    {"day": "Sunday", "type": "Rest", "miles": 0, "duration": "0 min", "description": "Rest"}
                ]
            },
            {
                "week": 3,
                "description": "Base endurance week",
                "workouts": [
                    {"day": "Monday", "type": "Run", "miles": 3, "duration": "30 min", "description": "Easy run to build base"},
                    {"day": "Tuesday", "type": "Rest", "miles": 0, "duration": "0 min", "description": "Rest"},
                    {"day": "Wednesday", "type": "Run", "miles": 4, "duration": "35 min", "description": "Steady run to build endurance"},
                    {"day": "Thursday", "type": "Workout", "miles": 0, "duration": "1 hr", "description": "Chest workout"},
                    {"day": "Friday", "type": "Run", "miles": 2, "duration": "20 min", "description": "Short recovery run"},
                    {"day": "Saturday", "type": "Rest", "miles": 0, "duration": "0 min", "description": "Rest"},
                    {"day": "Sunday", "type": "Rest", "miles": 0, "duration": "0 min", "description": "Rest"}
                ]
            },
            {
                "week": 4,
                "description": "Base endurance week",
                "workouts": [
                    {"day": "Monday", "type": "Run", "miles": 3, "duration": "30 min", "description": "Easy run to build base"},
                    {"day": "Tuesday", "type": "Rest", "miles": 0, "duration": "0 min", "description": "Rest"},
                    {"day": "Wednesday", "type": "Run", "miles": 4, "duration": "35 min", "description": "Steady run to build endurance"},
                    {"day": "Thursday", "type": "Workout", "miles": 0, "duration": "1 hr", "description": "Chest workout"},
                    {"day": "Friday", "type": "Run", "miles": 2, "duration": "20 min", "description": "Short recovery run"},
                    {"day": "Saturday", "type": "Rest", "miles": 0, "duration": "0 min", "description": "Rest"},
                    {"day": "Sunday", "type": "Rest", "miles": 0, "duration": "0 min", "description": "Rest"}
                ]
            },
            {
                "week": 5,
                "description": "Race week",
                "workouts": [
                    {"day": "Monday", "type": "Run", "miles": 3, "duration": "30 min", "description": "Easy run to build base"},
                    {"day": "Tuesday", "type": "Lift", "miles": 0, "duration": "0 min", "description": "Rest"},
                    {"day": "Wednesday", "type": "Run", "miles": 0, "duration": "35 min", "description": "Get Big"},
                    {"day": "Thursday", "type": "Rest", "miles": 0, "duration": "1 hr", "description": "Chest workout"},
                    {"day": "Friday", "type": "Run", "miles": 2, "duration": "20 min", "description": "Short recovery run"},
                    {"day": "Saturday", "type": "Rest", "miles": 0, "duration": "0 min", "description": "Rest"},
                    {"day": "Sunday", "type": "Rest", "miles": 0, "duration": "0 min", "description": "Rest"}
                ]
            }
        ]
    }

    return {
        "statusCode": 200,
        "body": json.dumps({
            "status": "Completed",
            "plan": example_json
        })
    }


