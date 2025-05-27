
import React from 'react';
import { motion } from 'framer-motion';

const TrafficLight = ({ state, direction }) => {
  const lightVariants = {
    red: { backgroundColor: '#EF4444', boxShadow: "0 0 15px 3px #EF4444" },
    yellow: { backgroundColor: '#F59E0B', boxShadow: "0 0 15px 3px #F59E0B" },
    green: { backgroundColor: '#22C55E', boxShadow: "0 0 15px 3px #22C55E" },
    off: { backgroundColor: '#374151', opacity: 0.5 },
  };

  const getPositionClasses = () => {
    switch (direction) {
      case 'north': return 'top-0 left-1/2 -translate-x-1/2 -mt-4';
      case 'south': return 'bottom-0 left-1/2 -translate-x-1/2 -mb-4 rotate-180';
      case 'east': return 'top-1/2 right-0 -translate-y-1/2 -mr-4 -rotate-90';
      case 'west': return 'top-1/2 left-0 -translate-y-1/2 -ml-4 rotate-90';
      default: return '';
    }
  };

  return (
    <div className={`absolute ${getPositionClasses()} p-1.5 bg-neutral-800 rounded-lg shadow-md flex flex-col space-y-1.5 items-center`}>
       {direction === 'north' && <div className="w-0 h-0 border-l-[6px] border-l-transparent border-b-[8px] border-b-neutral-800 border-r-[6px] border-r-transparent absolute -top-[7px] left-1/2 -translate-x-1/2"></div>}
       {direction === 'south' && <div className="w-0 h-0 border-l-[6px] border-l-transparent border-t-[8px] border-t-neutral-800 border-r-[6px] border-r-transparent absolute -bottom-[7px] left-1/2 -translate-x-1/2"></div>}
       {direction === 'east' && <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[8px] border-l-neutral-800 border-b-[6px] border-b-transparent absolute -right-[7px] top-1/2 -translate-y-1/2"></div>}
       {direction === 'west' && <div className="w-0 h-0 border-t-[6px] border-t-transparent border-r-[8px] border-r-neutral-800 border-b-[6px] border-b-transparent absolute -left-[7px] top-1/2 -translate-y-1/2"></div>}
      
      <motion.div
        className="w-6 h-6 rounded-full"
        variants={lightVariants}
        animate={state === 'red' ? 'red' : 'off'}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="w-6 h-6 rounded-full"
        variants={lightVariants}
        animate={state === 'yellow' ? 'yellow' : 'off'}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="w-6 h-6 rounded-full"
        variants={lightVariants}
        animate={state === 'green' ? 'green' : 'off'}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
};

export default TrafficLight;
  