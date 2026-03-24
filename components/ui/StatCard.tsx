import React from 'react';
import GlassPanel from './GlassPanel';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export default function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <GlassPanel className="p-4 flex items-center space-x-4">
      <div className="p-3 bg-white/10 rounded-full text-blue-400">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-400 font-medium">{label}</p>
        <p className="text-xl font-semibold text-white">{value}</p>
      </div>
    </GlassPanel>
  );
}
