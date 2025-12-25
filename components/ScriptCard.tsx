
import React from 'react';
import { 
  Play, 
  Square, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  MoreVertical,
  ChevronRight,
  MonitorPlay,
  Calendar,
  ZapOff
} from 'lucide-react';
import { PythonScript } from '../types';

interface ScriptCardProps {
  script: PythonScript;
  onAction: () => void;
}

const getStatusStyles = (status: PythonScript['status']) => {
  switch (status) {
    case 'RUNNING': return { 
      bg: 'bg-emerald-500/10', 
      text: 'text-emerald-400', 
      border: 'border-emerald-500/30',
      dot: 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)]' 
    };
    case 'SCHEDULED': return { 
      bg: 'bg-indigo-500/10', 
      text: 'text-indigo-400', 
      border: 'border-indigo-500/30',
      dot: 'bg-indigo-500' 
    };
    case 'ERROR': return { 
      bg: 'bg-rose-500/10', 
      text: 'text-rose-400', 
      border: 'border-rose-500/30',
      dot: 'bg-rose-500' 
    };
    case 'INACTIVE': return { 
      bg: 'bg-zinc-500/10', 
      text: 'text-zinc-500', 
      border: 'border-zinc-800',
      dot: 'bg-zinc-700' 
    };
    default: return { 
      bg: 'bg-zinc-100/5', 
      text: 'text-zinc-400', 
      border: 'border-zinc-800',
      dot: 'bg-zinc-600' 
    };
  }
};

const ScriptCard: React.FC<ScriptCardProps> = ({ script, onAction }) => {
  const styles = getStatusStyles(script.status);
  
  return (
    <div className={`group relative bg-[#101012] border ${script.status === 'RUNNING' ? 'border-indigo-500/50' : 'border-zinc-800/80'} rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/5 hover:-translate-y-1 overflow-hidden`}>
      {/* Visual background glow for running scripts */}
      {script.status === 'RUNNING' && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[60px] rounded-full -mr-10 -mt-10 animate-pulse" />
      )}
      
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${styles.bg} ${styles.text}`}>
            {script.status === 'RUNNING' ? <MonitorPlay className="w-5 h-5" /> : <Terminal className="w-5 h-5" />}
          </div>
          <span className="text-[10px] font-black tracking-widest uppercase text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded-md border border-zinc-800/50">
            {script.area}
          </span>
        </div>
        <button className="text-zinc-600 hover:text-zinc-300 transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {/* Script Name & Path */}
      <div className="mb-6">
        <h3 className="text-base font-bold text-zinc-100 group-hover:text-indigo-400 transition-colors truncate mb-1" title={script.name}>
          {script.name}
        </h3>
        <p className="text-[11px] mono text-zinc-500 truncate opacity-60 group-hover:opacity-100 transition-opacity">
          {script.path}
        </p>
      </div>

      {/* Metrics / Status Area */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/50">
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-2 h-2 rounded-full ${styles.dot}`} />
            <span className={`text-[11px] font-bold uppercase tracking-wider ${styles.text}`}>
              {script.status}
            </span>
          </div>
          <div className="text-[12px] text-zinc-400 mono">
            {script.status === 'RUNNING' ? script.duration : 
             script.status === 'SCHEDULED' ? `Prox: ${script.nextRun}` : 
             script.lastRun ? `Fim: ${script.lastRun.split(' ')[1]}` : '--:--'}
          </div>
        </div>

        <button 
          onClick={onAction}
          className={`flex items-center justify-center w-12 h-12 rounded-xl border transition-all duration-300 group/btn ${
            script.status === 'RUNNING' 
              ? 'bg-rose-500 text-white border-rose-400/30 hover:bg-rose-600 shadow-lg shadow-rose-500/20' 
              : 'bg-indigo-600 text-white border-indigo-400/30 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20'
          }`}
        >
          {script.status === 'RUNNING' ? <Square className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
        </button>
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-zinc-800/50 flex items-center justify-between text-[11px] text-zinc-500">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3 h-3" />
          <span>Cron: {script.schedule ? `${script.schedule.length}x/dia` : 'Manual'}</span>
        </div>
        <div className="flex items-center gap-1 hover:text-indigo-400 cursor-pointer transition-colors group/link">
          Logs Detalhados
          <ChevronRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
};

export default ScriptCard;

// Helper component Terminal needs to be defined since used in ScriptCard
const Terminal = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);
