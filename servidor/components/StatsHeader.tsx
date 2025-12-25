
import React from 'react';
import { Activity, Clock, AlertCircle, Database } from 'lucide-react';
import { PythonScript } from '../types';

interface StatsHeaderProps {
  scripts: PythonScript[];
}

const StatsHeader: React.FC<StatsHeaderProps> = ({ scripts }) => {
  const total = scripts.length;
  const running = scripts.filter(s => s.status === 'RUNNING').length;
  const scheduled = scripts.filter(s => s.status === 'SCHEDULED').length;
  const errors = scripts.filter(s => s.status === 'ERROR').length;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-[#101012] border border-zinc-800 rounded-2xl p-5 flex items-center gap-4">
        <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400"><Database className="w-6 h-6" /></div>
        <div><p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Total Scripts</p><span className="text-2xl font-black">{total}</span></div>
      </div>
      <div className="bg-[#101012] border border-zinc-800 rounded-2xl p-5 flex items-center gap-4">
        <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400"><Activity className="w-6 h-6" /></div>
        <div><p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Em Execução</p><span className="text-2xl font-black">{running}</span></div>
      </div>
      <div className="bg-[#101012] border border-zinc-800 rounded-2xl p-5 flex items-center gap-4">
        <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-400"><Clock className="w-6 h-6" /></div>
        <div><p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Agendados</p><span className="text-2xl font-black">{scheduled}</span></div>
      </div>
      <div className="bg-[#101012] border border-zinc-800 rounded-2xl p-5 flex items-center gap-4">
        <div className="w-12 h-12 bg-rose-500/10 rounded-xl flex items-center justify-center text-rose-400"><AlertCircle className="w-6 h-6" /></div>
        <div><p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Erros</p><span className="text-2xl font-black">{errors}</span></div>
      </div>
    </div>
  );
};

export default StatsHeader;
