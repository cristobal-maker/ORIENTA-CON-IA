import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Copy,
  Check,
  FolderKanban,
  FileText,
  CheckSquare,
  Square,
  ArrowUpRight,
  Sparkles,
  CalendarClock,
} from 'lucide-react';
import {
  ADMIN_WORKFLOWS_DATA,
  AdminWorkflowItem,
  OrientationCategory,
} from '../data/notebookData';

interface Module5AdministrativeTasksProps {
  onLoadInSimulator: (category: OrientationCategory) => void;
}

export const Module5AdministrativeTasks: React.FC<
  Module5AdministrativeTasksProps
> = ({ onLoadInSimulator }) => {
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string>(
    ADMIN_WORKFLOWS_DATA[0].id
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({
    [`${ADMIN_WORKFLOWS_DATA[0].id}-0`]: true,
  });

  const currentWorkflow: AdminWorkflowItem =
    ADMIN_WORKFLOWS_DATA.find((w) => w.id === selectedWorkflowId) ||
    ADMIN_WORKFLOWS_DATA[0];

  const handleCopyPrompt = (workflow: AdminWorkflowItem) => {
    navigator.clipboard.writeText(workflow.masterPrompt);
    setCopiedId(workflow.id);
    setTimeout(() => setCopiedId(null), 2200);
  };

  const toggleCheckStep = (workflowId: string, idx: number) => {
    const key = `${workflowId}-${idx}`;
    setCheckedSteps((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <section
      id="tareas-administrativas"
      className="py-12 md:py-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 transition-colors"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div className="max-w-3xl">
            <div className="text-xs font-medium text-[#0284C7] dark:text-sky-400 mb-2">
              04. Gestión Burocrática y Coordinación Institucional
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight text-balance mb-3">
              Módulo de Tareas Administrativas Generales del Departamento
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Reduce drásticamente la carga burocrática del orientador: utiliza NotebookLM para redactar la{' '}
              <strong className="font-semibold text-slate-900 dark:text-white">
                Memoria Anual cruzada con la PGA, actas de CCP y reuniones de ciclo, circulares de Becas NEAE e informes de derivación interinstitucional
              </strong>{' '}
              con trazabilidad documental completa.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onLoadInSimulator('administrativa')}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white dark:text-slate-950 bg-slate-900 dark:bg-sky-400 hover:bg-slate-800 dark:hover:bg-sky-300 rounded-lg transition-colors whitespace-nowrap shrink-0 self-start lg:self-auto cursor-pointer"
          >
            <span>Personalizar Tarea Administrativa en Simulador</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Administrative Workflows Selector Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {ADMIN_WORKFLOWS_DATA.map((wf, index) => {
            const isSelected = wf.id === selectedWorkflowId;
            return (
              <button
                key={wf.id}
                type="button"
                onClick={() => setSelectedWorkflowId(wf.id)}
                className={`text-left p-4 rounded-xl border transition-colors flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-[#F8FAFC] dark:bg-slate-800/90 border-[#0284C7] dark:border-sky-400 ring-1 ring-[#0284C7] dark:ring-sky-400'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                    <span className="font-mono font-semibold text-[#0284C7] dark:text-sky-400">
                      0{index + 1}. Gestión
                    </span>
                    <span className="font-mono tabular-nums text-emerald-700 dark:text-emerald-400 font-medium">
                      {wf.timeSaved}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-snug mb-2">
                    {wf.title}
                  </h3>
                </div>
                <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <CalendarClock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                  <span className="truncate">{wf.periodicity}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Administrative Workflow Workspace */}
        <div className="bg-[#F8FAFC] dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-colors">
          {/* Top Bar of Active Workflow */}
          <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-5 py-4 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
                <span className="font-semibold text-[#0284C7] dark:text-sky-400">
                  Flujo Administrativo Seleccionado
                </span>
                <span aria-hidden="true">·</span>
                <span>Periodicidad: {currentWorkflow.periodicity}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-emerald-700 dark:text-emerald-400 font-medium">
                  {currentWorkflow.timeSaved}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">
                {currentWorkflow.title}
              </h3>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleCopyPrompt(currentWorkflow)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-[#0284C7] hover:bg-[#0369A1] text-white rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {copiedId === currentWorkflow.id ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Prompt Administrativo Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Prompt Administrativo</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Two-Zone Sandbox Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-800">
            {/* Left Column (5 cols): Notebook Setup, Sources & Administrative Checklist */}
            <div className="lg:col-span-5 p-5 sm:p-6 space-y-5">
              <div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {currentWorkflow.description}
                </p>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3.5 mb-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    <FolderKanban className="w-4 h-4 text-[#0284C7] dark:text-sky-400 shrink-0" />
                    <span>Estructura de Cuaderno Recomendada:</span>
                  </div>
                  <div className="text-xs font-mono text-slate-700 dark:text-slate-300">
                    {currentWorkflow.notebookStructure}
                  </div>
                </div>
              </div>

              {/* Sources to Upload */}
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-slate-100 mb-2.5">
                  <FileText className="w-4 h-4 text-[#0284C7] dark:text-sky-400 shrink-0" />
                  <span>1. Documentos administrativos a cargar como fuente:</span>
                </div>
                <div className="space-y-2.5">
                  {currentWorkflow.sourcesToUpload.map((src, idx) => (
                    <div
                      key={idx}
                      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-mono font-semibold text-slate-900 dark:text-slate-100 truncate">
                          {src.name}
                        </span>
                        <span className="text-[11px] font-mono text-[#0284C7] dark:text-sky-400 shrink-0">
                          {src.format}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {src.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Checklist */}
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-slate-100 mb-2.5">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                  <span>2. Lista de control antes de ejecutar el prompt:</span>
                </div>
                <div className="space-y-2">
                  {currentWorkflow.checklistItems.map((item, idx) => {
                    const key = `${currentWorkflow.id}-${idx}`;
                    const isChecked = !!checkedSteps[key];
                    return (
                      <div
                        key={idx}
                        onClick={() => toggleCheckStep(currentWorkflow.id, idx)}
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 flex items-start gap-2.5 cursor-pointer hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                      >
                        <button
                          type="button"
                          aria-label={`Marcar paso ${item}`}
                          className="mt-0.5 text-[#0284C7] dark:text-sky-400 shrink-0 cursor-pointer"
                        >
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                          )}
                        </button>
                        <span
                          className={`text-xs leading-relaxed ${
                            isChecked
                              ? 'text-slate-900 dark:text-slate-100 font-medium'
                              : 'text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          {item}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column (7 cols): Master Administrative Prompt & Deliverable Preview */}
            <div className="lg:col-span-7 p-5 sm:p-6 flex flex-col justify-between space-y-5 bg-white dark:bg-slate-900">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                    3. Prompt Maestro para Gestión Documental y Administrativa
                  </span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    Lenguaje formal administrativo
                  </span>
                </div>

                <div className="bg-slate-900 dark:bg-slate-950 border border-transparent dark:border-slate-800 text-slate-100 rounded-xl p-4 sm:p-5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3">
                    <span className="text-xs font-mono text-sky-300">
                      Instrucción lista para pegar en NotebookLM
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyPrompt(currentWorkflow)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-white rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {copiedId === currentWorkflow.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copiar prompt</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="text-xs sm:text-sm font-mono text-slate-200 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                    {currentWorkflow.masterPrompt}
                  </pre>
                </div>
              </div>

              {/* Expected Administrative Deliverable Box */}
              <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  <Sparkles className="w-4 h-4 text-[#0284C7] dark:text-sky-400 shrink-0" />
                  <span>
                    Entregable Administrativo Obtenido:{' '}
                    {currentWorkflow.expectedDeliverable.title}
                  </span>
                </div>
                <ul className="space-y-1.5 mt-2">
                  {currentWorkflow.expectedDeliverable.highlights.map(
                    (hl, idx) => (
                      <li
                        key={idx}
                        className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2"
                      >
                        <span className="font-mono text-xs font-semibold text-[#0284C7] dark:text-sky-400 mt-0.5 shrink-0">
                          0{idx + 1}.
                        </span>
                        <span>{hl}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
