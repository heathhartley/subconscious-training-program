import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';

// import { motion } from 'motion/react';
import { Activity, CheckCircle2, ExternalLink } from 'lucide-react';
// import { motion } from "framer-motion";

interface StravaIntegrationProps {
  connected: boolean;
  onConnect: () => void;
}

export function StravaIntegration({ connected, onConnect }: StravaIntegrationProps) {
  const [showDetails, setShowDetails] = useState(false);

  if (connected) {
    return (
      <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            Strava Connected
          </CardTitle>
          <CardDescription>Your latest activities are synced</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Last Week</span>
              <span className="font-semibold">3 runs</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Total Distance</span>
              <span className="font-semibold">28.4 km</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Avg Pace</span>
              <span className="font-semibold">5:18 /km</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Elevation Gain</span>
              <span className="font-semibold">342 m</span>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => setShowDetails(!showDetails)}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View on Strava
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Activity className="w-5 h-5 text-orange-600" />
          Connect Strava
        </CardTitle>
        <CardDescription>
          Sync your activities to get personalized recommendations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-gray-700">
            <strong>Why connect?</strong>
            <br />
            • Auto-sync your workouts
            <br />
            • Track progress over time
            <br />
            • Get AI-powered insights
          </p>
        </div>

        <Button 
          className="w-full bg-orange-600 hover:bg-orange-700"
          onClick={onConnect}
        >
          <Activity className="w-4 h-4 mr-2" />
          Connect with Strava
        </Button>

        <p className="text-xs text-gray-500 text-center">
          We'll never post to Strava without your permission
        </p>
      </CardContent>
    </Card>
  );
}
