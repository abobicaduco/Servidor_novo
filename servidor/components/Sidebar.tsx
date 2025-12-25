
import React from 'react';
import { LayoutDashboard, Terminal, Activity, Settings, Zap, ShieldCheck, Package, Cpu } from 'lucide-react';

interface SidebarProps {
  areas: string[];
  activeArea: string;
  onAreaSelect: (area: string) => void;
}

const getAreaIcon = (area: string) => {
  switch (area.toUpperCase()) {
    case 'MONITOR': return <Activity className="w-4 h-4" />;
    case 'TODOS': return <LayoutDashboard className="w-4 h-4" />;
    case 'FINANÇAS': return <ShieldCheck className="w-4 h-4" />;
    case 'CARGAS': return <Package className="w-4 h-4" />;
    case 'ERP': return <Cpu className="w-4 h-4" />;
    default: return <Terminal className="w-4 h-4" />;
  }
};

const Sidebar: React.FC<SidebarProps> = ({ areas, activeArea, onAreaSelect }) => {
  return (
    <aside className="w-72 bg-[#09090b] border-r border-zinc-800/50 flex flex-col h-full z-40">
      <div className="p-8 pb-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold leading-tight tracking-tight">C6 RPA</h2>
            <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Cron Server</p>
          </div>
        </div>
        <nav className="space-y-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-600 mb-4 ml-2">Principal</p>
            <div className="space-y-1">
              {areas.slice(0, 2).map((area) => (
                <button key={area} onClick={() => onAreaSelect(area)} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${activeArea === area ? 'bg-zinc-800/50 text-indigo-400 ring-1 ring-zinc-700' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/30'}`}>
                  {getAreaIcon(area)}
                  {area}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-600 mb-4 ml-2">Departamentos</p>
            <div className="space-y-1 max-h-[300px] overflow-y-auto custom-scrollbar">
              {areas.slice(2).map((area) => (
                <button key={area} onClick={() => onAreaSelect(area)} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${activeArea === area ? 'bg-zinc-800/50 text-indigo-400 ring-1 ring-zinc-700' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/30'}`}>
                  {getAreaIcon(area)}
                  {area}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </div>
      <div className="mt-auto p-6 border-t border-zinc-800/50">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/30">
          <Settings className="w-4 h-4" /> Configurações
        </button>
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Server Status</span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          </div>
          <div className="text-[12px] mono text-zinc-400">v10.1.2-stable</div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
