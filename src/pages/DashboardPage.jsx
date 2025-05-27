
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Clock, Zap, Lightbulb, AlertTriangle, Info, Users, CloudRain,ShieldCheck } from 'lucide-react';
import StatsCard from '@/components/StatsCard';
import Intersection from '@/components/Intersection';

const initialTrafficData = {
  north: { count: 10, light: 'red' },
  south: { count: 5, light: 'red' },
  east: { count: 12, light: 'green' },
  west: { count: 8, light: 'red' },
};

const cycleOrder = ['north', 'east', 'south', 'west']; 
const greenDuration = 8000; // 8 seconds
const yellowDuration = 2000; // 2 seconds

const DashboardPage = () => {
  const { toast } = useToast();
  const [trafficData, setTrafficData] = useState(initialTrafficData);
  const [currentGreen, setCurrentGreen] = useState('east');
  const [isEmergency, setIsEmergency] = useState(false);
  const [cycleIndex, setCycleIndex] = useState(cycleOrder.indexOf('east'));

  useEffect(() => {
    const simulateTraffic = setInterval(() => {
      setTrafficData(prev => {
        const newData = { ...prev };
        for (const dir in newData) {
          let change = Math.floor(Math.random() * 5) - 2; // -2 to +2
          if (newData[dir].light === 'green') change += Math.floor(Math.random() * 3); // More cars pass on green
          else change -= Math.floor(Math.random() * 1); // Fewer cars arrive on red (net)
          newData[dir].count = Math.max(0, newData[dir].count + change);
        }
        return newData;
      });
    }, 2000); // Update vehicle counts every 2 seconds

    return () => clearInterval(simulateTraffic);
  }, []);

  useEffect(() => {
    if (isEmergency) return; // Pause normal cycling during emergency

    const handleSignalChange = () => {
      setTrafficData(prev => {
        const newLights = { ...prev };
        // Current green turns yellow
        newLights[currentGreen].light = 'yellow';
        return newLights;
      });

      setTimeout(() => {
        setTrafficData(prev => {
          const newLights = { ...prev };
          // Previous yellow turns red
          newLights[currentGreen].light = 'red';
          
          // Next light in cycle turns green
          const nextIndex = (cycleIndex + 1) % cycleOrder.length;
          const nextGreen = cycleOrder[nextIndex];
          newLights[nextGreen].light = 'green';
          
          setCurrentGreen(nextGreen);
          setCycleIndex(nextIndex);
          return newLights;
        });
      }, yellowDuration);
    };

    const timer = setTimeout(handleSignalChange, greenDuration);
    return () => clearTimeout(timer);
  }, [currentGreen, cycleIndex, isEmergency]);

  const triggerEmergency = () => {
    setIsEmergency(true);
    const priorityDirection = cycleOrder[Math.floor(Math.random() * cycleOrder.length)];
    
    toast({
      title: '🚨 Emergency Vehicle Approaching!',
      description: `Prioritizing ${priorityDirection.toUpperCase()} direction. Other lights will turn red.`,
      variant: 'destructive',
      duration: 7000,
    });

    setTrafficData(prev => {
      const emergencyLights = { ...prev };
      for (const dir in emergencyLights) {
        emergencyLights[dir].light = (dir === priorityDirection) ? 'green' : 'red';
      }
      return emergencyLights;
    });
    
    // Simulate emergency duration
    setTimeout(() => {
      setIsEmergency(false);
      toast({
        title: '✅ Emergency Cleared',
        description: 'Normal traffic flow resuming.',
      });
      // Reset to a known state, e.g., North green or resume cycle
      const newCycleIndex = 0; // cycleOrder.indexOf(currentGreen) when emergency ends?
      const newGreen = cycleOrder[newCycleIndex];

      setTrafficData(prev => {
        const resetLights = {...initialTrafficData}; // Reset counts too or just lights?
        for(const dir in resetLights) resetLights[dir].light = 'red';
        resetLights[newGreen].light = 'green';
        return resetLights;
      });
      setCurrentGreen(newGreen);
      setCycleIndex(newCycleIndex);

    }, 6000); // Emergency priority for 6 seconds
  };
  
  const totalVehicles = Object.values(trafficData).reduce((sum, dir) => sum + dir.count, 0);
  const avgWaitTime = Math.round(totalVehicles * 0.3 + Math.random() * 5); // mock calculation

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-8"
    >
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Vehicles" value={totalVehicles} icon={<Car className="w-8 h-8 text-blue-400" />} trend={Math.floor(Math.random()*10-5)} unit="vehicles" />
        <StatsCard title="Avg. Wait Time" value={avgWaitTime} icon={<Clock className="w-8 h-8 text-yellow-400" />} trend={Math.floor(Math.random()*5-2)} unit="sec" />
        <StatsCard title="Emissions Reduced" value={`${Math.round(totalVehicles * 0.05 + Math.random()*2)}%`} icon={<Zap className="w-8 h-8 text-green-400" />} trend={Math.floor(Math.random()*3)} unit="%" />
        <StatsCard title="Intersections Online" value="1 / 1" icon={<Lightbulb className="w-8 h-8 text-purple-400" />} />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="h-full bg-slate-800/50 backdrop-blur-sm border-purple-500/30 shadow-2xl shadow-purple-500/10">
            <CardHeader>
              <CardTitle>Intersection Control Panel</CardTitle>
              <CardDescription>Live traffic flow and signal status for Primary Intersection Alpha.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-4 sm:p-6 min-h-[400px]">
              <Intersection trafficData={trafficData} />
              <Button onClick={triggerEmergency} variant="destructive" className="mt-8 shadow-lg hover:shadow-red-500/50 transition-shadow">
                <AlertTriangle className="mr-2 h-5 w-5" /> Simulate Emergency
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="bg-slate-800/50 backdrop-blur-sm border-blue-500/30 shadow-xl shadow-blue-500/10">
            <CardHeader>
              <CardTitle><Info className="inline mr-2 h-6 w-6 text-blue-400" />Project Snapshot</CardTitle>
              <CardDescription>Key aspects of the AI Traffic System.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-sky-300 mb-1">Problem Context:</h4>
                <p className="text-sm text-muted-foreground">Traditional signals cause delays, emissions, and frustration. This system aims to dynamically adapt.</p>
              </div>
              <div>
                <h4 className="font-semibold text-sky-300 mb-1">Objective:</h4>
                <p className="text-sm text-muted-foreground">Dynamically adjust signal timings based on real vehicle flow to reduce wait times and improve efficiency.</p>
              </div>
              <div>
                <h4 className="font-semibold text-sky-300 mb-1">Core Technologies (Conceptual):</h4>
                <p className="text-sm text-muted-foreground">Computer Vision for vehicle detection, Reinforcement Learning for optimal timing.</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-slate-800/30 backdrop-blur-sm border-green-500/20">
          <CardHeader>
            <CardTitle><Users className="inline mr-2 h-6 w-6 text-green-400" />Pedestrian Integration</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Future Goal: Integrate adaptive pedestrian crossing signals based on demand.</p>
            <Progress value={20} className="mt-3 h-2" indicatorClassName="bg-gradient-to-r from-green-500 to-teal-400" />
          </CardContent>
        </Card>
        <Card className="bg-slate-800/30 backdrop-blur-sm border-yellow-500/20">
          <CardHeader>
            <CardTitle><CloudRain className="inline mr-2 h-6 w-6 text-yellow-400" />Weather & Event Adaptation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Future Goal: Adjust signal logic based on weather conditions or detected incidents.</p>
            <Progress value={10} className="mt-3 h-2" indicatorClassName="bg-gradient-to-r from-yellow-500 to-orange-400" />
          </CardContent>
        </Card>
        <Card className="bg-slate-800/30 backdrop-blur-sm border-red-500/20">
          <CardHeader>
            <CardTitle><ShieldCheck className="inline mr-2 h-6 w-6 text-red-400" />Multi-Intersection Sync</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Future Goal: Coordinate multiple intersections for optimized traffic corridors.</p>
            <Progress value={5} className="mt-3 h-2" indicatorClassName="bg-gradient-to-r from-red-500 to-pink-500" />
          </CardContent>
        </Card>
      </section>

    </motion.div>
  );
};

export default DashboardPage;
  