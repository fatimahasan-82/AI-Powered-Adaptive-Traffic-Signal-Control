
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatsCard = ({ title, value, icon, trend, unit }) => {
  const isPositiveTrend = trend === undefined || trend >= 0;
  
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-blue-500/50 transition-colors duration-300 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          {icon}
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            {value} {unit && <span className="text-xl text-muted-foreground">{unit}</span>}
          </div>
          {trend !== undefined && (
            <p className={`text-xs mt-1 ${isPositiveTrend ? 'text-green-400' : 'text-red-400'} flex items-center`}>
              {isPositiveTrend ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
              {Math.abs(trend)}{unit === '%' ? '%' : ''} vs last period
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatsCard;
  