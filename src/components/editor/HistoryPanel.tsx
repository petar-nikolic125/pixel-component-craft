
import React from 'react';
import { HistoryEntry } from '@/pages/Editor';
import { Button } from '@/components/ui/button';
import { Undo, Redo, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface HistoryPanelProps {
  history: HistoryEntry[];
  currentIndex: number;
  onRevert: (index: number) => void;
  onClear: () => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({
  history,
  currentIndex,
  onRevert,
  onClear
}) => {
  if (history.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center border border-white/10">
            <Undo className="w-8 h-8 text-slate-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-300 mb-2">No History</h3>
            <p className="text-sm text-slate-400 max-w-sm">
              Make changes to your components to see history entries here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-hidden">
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">History</h3>
          <p className="text-sm text-slate-400">{history.length} actions</p>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="text-slate-400 hover:text-red-400 hover:bg-red-500/10"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      <div className="h-[calc(100%-88px)] overflow-y-auto">
        <div className="p-2 space-y-1">
          {history.map((entry, index) => (
            <div
              key={entry.id}
              className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-purple-500/20 border border-purple-400/50'
                  : index > currentIndex
                  ? 'bg-slate-800/20 text-slate-500'
                  : 'bg-slate-800/30 hover:bg-slate-800/50'
              }`}
              onClick={() => onRevert(index)}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-slate-700 rounded border border-white/10 flex-shrink-0 flex items-center justify-center">
                  <span className="text-xs text-slate-300 font-mono">
                    {(history.length - index).toString().padStart(2, '0')}
                  </span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {entry.action}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {formatDistanceToNow(entry.timestamp, { addSuffix: true })}
                  </p>
                </div>

                {index === currentIndex && (
                  <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0 mt-2" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
