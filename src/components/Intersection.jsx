
import React from 'react';
import TrafficLight from '@/components/TrafficLight';
import { Car } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Intersection = ({ trafficData }) => {
  const roadBaseClasses = "absolute bg-gradient-to-br from-slate-600 to-slate-700 shadow-inner";
  const markings = "absolute bg-yellow-400";

  const VehicleCount = ({ count, direction }) => {
    let positionClasses = '';
    let alignmentClasses = 'items-center';
    switch (direction) {
      case 'north': positionClasses = 'top-8 left-1/2 -translate-x-1/2'; alignmentClasses='items-center'; break;
      case 'south': positionClasses = 'bottom-8 left-1/2 -translate-x-1/2'; alignmentClasses='items-center'; break;
      case 'east': positionClasses = 'top-1/2 right-8 -translate-y-1/2'; alignmentClasses='items-end'; break;
      case 'west': positionClasses = 'top-1/2 left-8 -translate-y-1/2'; alignmentClasses='items-start'; break;
      default: break;
    }

    return (
      <motion.div 
        className={`absolute z-20 flex flex-col ${alignmentClasses} ${positionClasses} p-2 bg-black/50 rounded-md shadow-lg`}
        key={count}
        initial={{ opacity: 0.8, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <Car className="w-5 h-5 text-sky-300 mb-1" />
        <span className="text-xl font-bold text-white">{count}</span>
      </motion.div>
    );
  };
  
  return (
    <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] bg-slate-700 rounded-lg shadow-2xl overflow-hidden border-4 border-slate-800">
      {/* Roads */}
      <div className={`${roadBaseClasses} w-1/3 h-full left-1/3 top-0`}> {/* Vertical road */}
        <div className={`${markings} w-1 h-full left-1/2 -translate-x-1/2 opacity-50`}></div> {/* Center line */}
      </div>
      <div className={`${roadBaseClasses} h-1/3 w-full top-1/3 left-0`}> {/* Horizontal road */}
         <div className={`${markings} h-1 w-full top-1/2 -translate-y-1/2 opacity-50`}></div> {/* Center line */}
      </div>

      {/* Intersection Center (slightly darker) */}
      <div className="absolute w-1/3 h-1/3 top-1/3 left-1/3 bg-slate-750 z-10"></div>

      {/* Traffic Lights */}
      <TrafficLight state={trafficData.north.light} direction="north" />
      <TrafficLight state={trafficData.south.light} direction="south" />
      <TrafficLight state={trafficData.east.light} direction="east" />
      <TrafficLight state={trafficData.west.light} direction="west" />

      {/* Vehicle Counts */}
      <AnimatePresence mode="popLayout">
        <VehicleCount count={trafficData.north.count} direction="north" />
        <VehicleCount count={trafficData.south.count} direction="south" />
        <VehicleCount count={trafficData.east.count} direction="east" />
        <VehicleCount count={trafficData.west.count} direction="west" />
      </AnimatePresence>
    </div>
  );
};

export default Intersection;
  