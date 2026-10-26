import React, { useState } from 'react';
import {
  History,
  RotateCcw,
  Copy,
  Check,
  Trash2,
  Sparkles,
  Clock,
  ArrowUpRight,
} from 'lucide-react';
import { RecentPromptItem } from '../utils/recentPromptsStorage';

interface RecentPromptHistoryProps {
  history: RecentPromptItem[];
  onRestorePrompt: (item: RecentPromptItem) => void;
  onClearHistory: () => void;
  isStorageSupported: boolean;
}

export const RecentPromptHistory: React.FC<RecentPromptHistoryProps> = ({
  history,
  onRestorePrompt,
  onClearHistory,
  isStorageSupported,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (item: RecentPromptItem) => {
    navigator.clipboard.writeText(item.promptText);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatTimestamp = (ts: number): string => {
    try {
      const date = new Date(ts);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return 'Reciente';
    }
  };

  if (!isStorageSupported) {
    return (
      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-xl p-4 text-xs text-amber-800 dark:text-amber-300">
        <span className="font-semibold">Aviso de almacenamiento local:</span> El almacenamiento de tu navegador (localStorage) no está disponible o está bloqueado en este entorno. El simulador seguirá funcionando con normalidad, pero el historial no se conservará entre recargas.
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 text-center">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto mb-2">
          <History className="w-4 h-4" />
        </div>
        <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200">
          Sin prompts en el historial
        </h4>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
          Al copiar o generar un Prompt Maestro en el simulador, se guardarán aquí automáticamente tus últimos 3 prompts para recuperarlos con un solo clic.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4 transition-colors shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-[#0284C7] dark:text-sky-400" />
          <h4 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100">
            Historial Reciente (Últimos {history.length} de 3 prompts)
          </h4>
        </div>
        <button
          type="button"
          onClick={onClearHistory}
          className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors cursor-pointer"
          title="Borrar historial local"
        >
          <Trash2 className="w-3 h-3" />
          <span>Limpiar</span>
        </button>
      </div>

      {/* Cards list */}
      <div className="space-y-3">
        {history.map((item, index) => {
          const isCopied = copiedId === item.id;
          return (
            <div
              key={item.id}
              className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-lg p-3.5 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                    {index + 1}. {item.roleTitle}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 shrink-0">
                    <Clock className="w-3 h-3" />
                    <span>{formatTimestamp(item.timestamp)}</span>
                  </div>
                </div>

                {/* Metadata pills / line */}
                <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 mb-2">
                  <span className="font-medium text-[#0284C7] dark:text-sky-400">
                    {item.stage}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="truncate max-w-[200px]">
                    {item.specificFocus}
                  </span>
                </div>

                {/* Prompt snippet preview */}
                <p className="text-xs font-mono text-slate-600 dark:text-slate-300 line-clamp-2 bg-white dark:bg-slate-900 p-2 rounded border border-slate-200/70 dark:border-slate-800 mb-3">
                  {item.promptText}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-800 text-xs">
                <button
                  type="button"
                  onClick={() => onRestorePrompt(item)}
                  className="inline-flex items-center gap-1.5 font-medium text-[#0284C7] dark:text-sky-400 hover:text-[#0369A1] dark:hover:text-sky-300 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Cargar en simulador</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCopy(item)}
                  className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded cursor-pointer transition-colors"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-500" />
                      <span>Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
