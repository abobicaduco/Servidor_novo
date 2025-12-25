
import React, { useState, useEffect, useMemo } from 'react';
import { Terminal, Search, Activity, RefreshCcw } from 'lucide-react';
import { PythonScript, ScriptStatus } from './types';
import Sidebar from './components/Sidebar';
import ScriptCard from './components/ScriptCard';
import StatsHeader from './components/StatsHeader';

const App: React.FC = () => {
  const [scripts, setScripts] = useState<PythonScript[]>([]);
  const [activeArea, setActiveArea] = useState<string>('MONITOR');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchScripts = async () => {
    try {
      const response = await fetch('/api/scripts');
      if (!response.ok) throw new Error('Erro ao conectar com o servidor');
      const data = await response.json();
      setScripts(data);
      setError(null);
    } catch (err) {
      setError('Servidor Python Offline');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchScripts();
    const interval = setInterval(fetchScripts, 2000);
    return () => clearInterval(interval);
  }, []);

  const areas = useMemo(() => {
    const uniqueAreas = Array.from(new Set(scripts.map(s => s.area)));
    return ['MONITOR', 'TODOS', ...uniqueAreas];
  }, [scripts]);

  const filteredScripts = useMemo(() => {
    let result = scripts;
    if (activeArea !== 'MONITOR' && activeArea !== 'TODOS') {
      result = result.filter(s => s.area === activeArea);
    } else if (activeArea === 'MONITOR') {
      result = result.filter(s => s.status === 'RUNNING' || s.status === 'SCHEDULED');
    }
    if (searchQuery) {
      result = result.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        s.path.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return result;
  }, [scripts, activeArea, searchQuery]);

  const toggleScript = async (path: string, currentStatus: ScriptStatus) => {
    const endpoint = currentStatus === 'RUNNING' ? '/api/stop' : '/api/run';
    try {
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path })
      });
      fetchScripts();
    } catch (err) {
      console.error('Erro ao controlar script:', err);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#09090b] text-zinc-100 selection:bg-indigo-500/30">
      <Sidebar areas={areas} activeArea={activeArea} onAreaSelect={setActiveArea} />
      <main className="flex-1 flex flex-col min-w-0 relative">
        {error && <div className="bg-rose-500/20 text-rose-400 py-1 text-center text-xs font-bold border-b border-rose-500/30">{error}</div>}
        <header className="h-20 border-b border-zinc-800/50 bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-8">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">{activeArea}</h1>
            <div className="h-4 w-[1px] bg-zinc-700 mx-2" />
            <span className="text-sm font-medium text-zinc-500">{filteredScripts.length} automações</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-indigo-400" />
              <input type="text" placeholder="Pesquisar..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-zinc-900/50 border border-zinc-800 rounded-lg py-2 pl-10 pr-4 w-72 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
            </div>
            <button onClick={() => { setIsRefreshing(true); fetchScripts().then(() => setIsRefreshing(false)); }} className={`p-2 rounded-lg border border-zinc-800 hover:bg-zinc-800/50 transition-all ${isRefreshing ? 'animate-spin text-indigo-400 border-indigo-500/30' : 'text-zinc-400'}`}>
              <RefreshCcw className="w-5 h-5" />
            </button>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-8">
          <StatsHeader scripts={scripts} />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 pb-20">
            {filteredScripts.map((script) => (
              <ScriptCard key={script.id} script={script} onAction={() => toggleScript(script.path, script.status)} />
            ))}
            {filteredScripts.length === 0 && (
              <div className="col-span-full py-20 flex flex-col items-center justify-center text-zinc-500 border-2 border-dashed border-zinc-800 rounded-2xl">
                <Terminal className="w-12 h-12 mb-4 opacity-20" />
                <p className="text-lg font-medium">Nenhum script encontrado</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
