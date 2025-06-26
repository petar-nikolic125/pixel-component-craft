import { useState, useCallback, useRef } from 'react';
import { ComponentConfig } from '../pages/Editor';

export interface HistoryEntry {
  id: string;
  action: string;
  timestamp: number;
  components: ComponentConfig[];
  description: string;
}

export const useHistoryManager = (initialComponents: ComponentConfig[] = []) => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [components, setComponents] = useState<ComponentConfig[]>(initialComponents);
  const skipHistory = useRef(false);

  const addHistoryEntry = useCallback((action: string, newComponents: ComponentConfig[], description?: string) => {
    if (skipHistory.current) {
      skipHistory.current = false;
      return;
    }

    const entry: HistoryEntry = {
      id: Date.now().toString(),
      action,
      timestamp: Date.now(),
      components: JSON.parse(JSON.stringify(newComponents)), // Deep clone
      description: description || action
    };

    setHistory(prev => {
      // Remove any entries after current index (when undoing then making new changes)
      const newHistory = prev.slice(0, currentIndex + 1);
      newHistory.push(entry);
      
      // Limit history to 50 entries
      if (newHistory.length > 50) {
        newHistory.shift();
        return newHistory;
      }
      
      return newHistory;
    });

    setCurrentIndex(prev => {
      const newIndex = Math.min(prev + 1, 49);
      return newIndex;
    });

    setComponents(newComponents);
  }, [currentIndex]);

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      const targetEntry = history[newIndex];
      
      skipHistory.current = true;
      setComponents(JSON.parse(JSON.stringify(targetEntry.components)));
      setCurrentIndex(newIndex);
      
      return targetEntry;
    }
    return null;
  }, [currentIndex, history]);

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      const newIndex = currentIndex + 1;
      const targetEntry = history[newIndex];
      
      skipHistory.current = true;
      setComponents(JSON.parse(JSON.stringify(targetEntry.components)));
      setCurrentIndex(newIndex);
      
      return targetEntry;
    }
    return null;
  }, [currentIndex, history]);

  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;

  const updateComponents = useCallback((newComponents: ComponentConfig[], action: string, description?: string) => {
    addHistoryEntry(action, newComponents, description);
  }, [addHistoryEntry]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    setCurrentIndex(-1);
  }, []);

  return {
    components,
    history,
    currentIndex,
    canUndo,
    canRedo,
    undo,
    redo,
    updateComponents,
    clearHistory,
    addHistoryEntry
  };
};