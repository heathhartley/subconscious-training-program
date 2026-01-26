import json
from datetime import datetime, timedelta
import random

def lambda_handler(event, context):
    # try:
    #     body = json.loads(event.get("body", "{}"))
    # except json.JSONDecodeError:
    #     return {
    #         "statusCode": 400,
    #         "body": json.dumps({"error": "Invalid JSON"})
    #     }

    # Fake Strava activities (last 20 days)
    today = datetime.utcnow()
    activities = []

    for i in range(10):
        day = today - timedelta(days=i)

        # Randomly decide if it's a run (70% chance)
        is_run = random.random() < 0.7

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
