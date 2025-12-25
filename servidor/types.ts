
export type ScriptStatus = 'IDLE' | 'RUNNING' | 'SCHEDULED' | 'INACTIVE' | 'ERROR';

export interface PythonScript {
  id: string;
  name: string;
  path: string;
  area: string;
  status: ScriptStatus;
  lastRun?: string;
  duration?: string;
  nextRun?: string;
  schedule?: number[];
  isActive: boolean;
}
