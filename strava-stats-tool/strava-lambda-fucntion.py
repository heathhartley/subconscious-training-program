import json
from datetime import datetime, timedelta

def lambda_handler(event, context):
    try:
        body = json.loads(event.get("body", "{}"))
    except json.JSONDecodeError:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "Invalid JSON"})
        }

    # Fake Strava activities (last 20 days)
    today = datetime.utcnow()
    activities = []

    for i in range(20):
        day = today - timedelta(days=i)
        activities.append({
            "id": 1000 + i,
            "date": day.strftime("%Y-%m-%d"),
            "type": "Run" if i % 2 == 0 else "Rest",
            "distance_km": round(5 + i * 0.7, 1) if i % 2 == 0 else 0,
            "duration_min": 30 + i * 4 if i % 2 == 0 else 0,
            "avg_pace": "5:10/km" if i % 2 == 0 else None,
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
