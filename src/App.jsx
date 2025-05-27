
import React from 'react';
import DashboardPage from '@/pages/DashboardPage';
import { Toaster } from '@/components/ui/toaster';
import { motion } from 'framer-motion';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-foreground p-4 sm:p-6 md:p-8">
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 py-2">
          AI-Powered Adaptive Traffic Signal Control
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">Real-time Visualization Dashboard</p>
      </motion.header>
      <main>
        <DashboardPage />
      </main>
      <Toaster />
      <footer className="text-center mt-12 py-4 border-t border-slate-700">
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} AI Traffic Systems. All rights reserved.</p>
        <p className="text-xs text-slate-600 mt-1">Powered by Hostinger Horizons</p>
      </footer>
    </div>
  );
}

export default App;
  