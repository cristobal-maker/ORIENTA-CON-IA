import React, { useState, useEffect } from 'react';
import {
  Copy,
  Check,
  FileCheck2,
  Sliders,
  Sparkles,
  RotateCcw,
  ShieldAlert,
  CheckSquare,
  Square,
} from 'lucide-react';
import {
  SIMULATOR_ROLES,
  OrientationCategory,
  SimulatorRoleTask,
} from '../data/notebookData';

interface Module4PromptSimulatorProps {
  preselectedCategory?: OrientationCategory | null;
}

const EDUCATIONAL_STAGES = [
  'Educación Infantil (3-6 años)',
  'Educación Primaria (6-12 años)',
  '1º y 2º de ESO',
  '3º y 4º de ESO',
  'Bachillerato y Ciclos Formativos (FP)',
];

const OUTPUT_FORMATS = [
  'Informe técnico estructurado con tablas operativas',
  'Guion práctico paso a paso para sesión o entrevista',
  'Matriz comparativa de doble entrada con citas',
  'Lista de pautas breves para entregar al claustro',
];

const TONE_OPTIONS = [
  'Riguroso, psicopedagógico y constructivo',
  'Cercano, empático y libre de tecnicismos (para familias)',
  'Directo, ejecutivo y orientado a acuerdos de aula',
];

export const Module4PromptSimulator: React.FC<Module4PromptSimulatorProps> = ({
  preselectedCategory,
}) => {
  const [selectedRoleId, setSelectedRoleId] = useState<string>(SIMULATOR_ROLES[0].id);
  const [stage, setStage] = useState<string>('1º y 2º de ESO');
  const [outputFormat, setOutputFormat] = useState<string>(OUTPUT_FORMATS[0]);
  const [tone, setTone] = useState<string>(TONE_OPTIONS[0]);
  const [specificFocus, setSpecificFocus] = useState<string>(
    SIMULATOR_ROLES[0].defaultFocus
  );
  const [checkedSources, setCheckedSources] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: true,
  });
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);

  // Sync when user clicks "Abrir en Simulador" from Module 3 or Module 5
  useEffect(() => {
    if (preselectedCategory) {
      const matchingRole = SIMULATOR_ROLES.find(
        (r) => r.category === preselectedCategory
      );
      if (matchingRole) {
        setSelectedRoleId(matchingRole.id);
        setSpecificFocus(matchingRole.defaultFocus);
        const initialChecks: Record<number, boolean> = {};
        matchingRole.requiredSources.forEach((_, idx) => {
          initialChecks[idx] = true;
        });
        setCheckedSources(initialChecks);
      }
    }
  }, [preselectedCategory]);

  const currentRole: SimulatorRoleTask =
    SIMULATOR_ROLES.find((r) => r.id === selectedRoleId) || SIMULATOR_ROLES[0];

  const handleRoleChange = (role: SimulatorRoleTask) => {
    setSelectedRoleId(role.id);
    setSpecificFocus(role.defaultFocus);
    const nextChecks: Record<number, boolean> = {};
    role.requiredSources.forEach((_, idx) => {
      nextChecks[idx] = true;
    });
    setCheckedSources(nextChecks);
  };

  const toggleSourceCheck = (idx: number) => {
    setCheckedSources((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const generatedMasterPrompt = currentRole.promptTemplate({
    stage,
    outputFormat,
    tone,
    specificFocus: specificFocus.trim() || currentRole.defaultFocus,
  });

  const handleCopyGeneratedPrompt = () => {
    navigator.clipboard.writeText(generatedMasterPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  const handleReset = () => {
    setStage('1º y 2º de ESO');
    setOutputFormat(OUTPUT_FORMATS[0]);
    setTone(TONE_OPTIONS[0]);
    setSpecificFocus(currentRole.defaultFocus);
  };

  const checkedCount = currentRole.requiredSources.filter(
    (_, idx) => checkedSources[idx]
  ).length;

  return (
    <section
      id="simulador-prompts"
      className="py-12 md:py-16 bg-[#F8FAFC] dark:bg-[#0B1120] border-b border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-medium text-[#0284C7] dark:text-sky-400 mb-2">
            05. Generador Interactivo de Prompts Maestros
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight text-balance mb-3">
            Simulador de Prompts y Lista de Fuentes para Orientadores
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Selecciona tu tarea orientadora, ajusta la etapa educativa y el enfoque del caso, y obtén al instante el{' '}
            <strong className="font-semibold text-slate-900 dark:text-white">
              Prompt Maestro optimizado para NotebookLM
            </strong>{' '}
            junto con la lista de verificación de documentos que debes subir como fuente.
          </p>
        </div>

        {/* Two-Zone Sandbox Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Zone (5 cols): Control & Task Configuration Deck */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 space-y-5 transition-colors">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#0284C7] dark:text-sky-400" />
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  1. Configura tu Tarea Orientadora
                </h3>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restablecer</span>
              </button>
            </div>

            {/* Step A: Select Role / Task */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-2">
                Tarea o función del Departamento de Orientación:
              </label>
              <div className="space-y-2">
                {SIMULATOR_ROLES.map((role) => {
                  const isSelected = role.id === selectedRoleId;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => handleRoleChange(role)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-sky-50/40 dark:bg-sky-950/40 border-[#0284C7] dark:border-sky-400 ring-1 ring-[#0284C7] dark:ring-sky-400'
                          : 'bg-slate-50/60 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                        {role.title}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {role.subtitle}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step B: Select Educational Stage */}
            <div>
              <label
                htmlFor="sim-stage"
                className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5"
              >
                Etapa educativa de referencia:
              </label>
              <select
                id="sim-stage"
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#0284C7] dark:focus:border-sky-400"
              >
                {EDUCATIONAL_STAGES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Step C: Select Output Format */}
            <div>
              <label
                htmlFor="sim-format"
                className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5"
              >
                Formato del entregable deseado:
              </label>
              <select
                id="sim-format"
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#0284C7] dark:focus:border-sky-400"
              >
                {OUTPUT_FORMATS.map((fmt) => (
                  <option key={fmt} value={fmt}>
                    {fmt}
                  </option>
                ))}
              </select>
            </div>

            {/* Step D: Select Tone */}
            <div>
              <label
                htmlFor="sim-tone"
                className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5"
              >
                Tono de comunicación y destinatario:
              </label>
              <select
                id="sim-tone"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#0284C7] dark:focus:border-sky-400"
              >
                {TONE_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Step E: Custom Specific Focus */}
            <div>
              <label
                htmlFor="sim-focus"
                className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5"
              >
                Foco específico de tu consulta o necesidad del caso:
              </label>
              <input
                id="sim-focus"
                type="text"
                value={specificFocus}
                onChange={(e) => setSpecificFocus(e.target.value)}
                placeholder="Ej. Dislexia, adaptación de exámenes, ciberacoso, FP Dual..."
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#0284C7] dark:focus:border-sky-400"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Puedes escribir cualquier detalle específico (sin datos personales) y el Prompt Maestro se actualizará en vivo.
              </p>
            </div>
          </div>

          {/* Right Zone (7 cols): Required Sources Checklist + Live Master Prompt Output */}
          <div className="lg:col-span-7 space-y-6">
            {/* Block 1: Checklist of Documents to Upload to NotebookLM */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3.5 mb-4">
                <div className="flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-[#0284C7] dark:text-sky-400 shrink-0" />
                  <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100">
                    2. Documentos que debes subir como fuente a NotebookLM
                  </h3>
                </div>
                <span className="text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400">
                  {checkedCount} de {currentRole.requiredSources.length} fuentes preparadas
                </span>
              </div>

              <div className="space-y-3 mb-4">
                {currentRole.requiredSources.map((src, idx) => {
                  const isChecked = !!checkedSources[idx];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleSourceCheck(idx)}
                      className={`p-3.5 rounded-lg border transition-colors cursor-pointer flex items-start gap-3 ${
                        isChecked
                          ? 'bg-sky-50/40 dark:bg-sky-950/30 border-sky-200 dark:border-sky-800/80'
                          : 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      <button
                        type="button"
                        aria-label={`Marcar fuente ${src.documentName}`}
                        className="mt-0.5 text-[#0284C7] dark:text-sky-400 shrink-0 cursor-pointer"
                      >
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100">
                            {src.documentName}
                          </span>
                          <span className="text-xs text-slate-400 dark:text-slate-600" aria-hidden="true">
                            ·
                          </span>
                          <span className="text-xs font-mono text-[#0284C7] dark:text-sky-400">
                            {src.format}
                          </span>
                          {src.essential && (
                            <>
                              <span className="text-xs text-slate-400 dark:text-slate-600" aria-hidden="true">
                                ·
                              </span>
                              <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                                Fuente principal
                              </span>
                            </>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 flex items-center gap-1.5">
                          <ShieldAlert className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                          <span>{src.anonymizationTip}</span>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Block 2: Generated Master Prompt */}
            <div className="bg-slate-900 dark:bg-slate-950 border border-transparent dark:border-slate-800 text-slate-100 rounded-xl p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-4">
                <div>
                  <div className="text-xs font-mono text-sky-400 mb-0.5">
                    3. Prompt Maestro Generado Automáticamente
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-white">
                    Listo para copiar y pegar en el chat de tu cuaderno NotebookLM
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={handleCopyGeneratedPrompt}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold bg-[#0284C7] hover:bg-[#0369A1] text-white rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {copiedPrompt ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>¡Prompt Maestro copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copiar Prompt Maestro</span>
                    </>
                  )}
                </button>
              </div>

              <div className="bg-slate-950/80 dark:bg-slate-900/90 border border-slate-800 rounded-lg p-4 mb-5">
                <pre className="text-xs sm:text-sm font-mono text-slate-200 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                  {generatedMasterPrompt}
                </pre>
              </div>

              {/* Expected Deliverables & Pro Tip */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-800 text-xs">
                <div>
                  <div className="font-semibold text-sky-300 mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 shrink-0" />
                    <span>Estructura que generará NotebookLM:</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-300">
                    {currentRole.expectedStructure.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="font-mono text-sky-400 shrink-0">
                          0{i + 1}.
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-800/70 dark:bg-slate-900 border border-slate-700/80 dark:border-slate-800 rounded-lg p-3.5 flex flex-col justify-between">
                  <div>
                    <div className="font-semibold text-amber-300 mb-1">
                      Consejo avanzado para el orientador/a:
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      {currentRole.proTip}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
