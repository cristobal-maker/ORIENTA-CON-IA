import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  FolderOpen,
  FileCheck,
  Pin,
  Sliders,
  Check,
  Copy,
  AlertTriangle,
  Printer,
} from 'lucide-react';
import { STEP_BY_STEP_GUIDE } from '../data/notebookData';

export const Module2StepByStep: React.FC = () => {
  const [openStepIndex, setOpenStepIndex] = useState<number>(0);
  const [copiedInstructionIndex, setCopiedInstructionIndex] = useState<number | null>(null);

  const handleCopyInstruction = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedInstructionIndex(idx);
    setTimeout(() => setCopiedInstructionIndex(null), 2000);
  };

  return (
    <section
      id="guia-paso-a-paso"
      className="py-12 md:py-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 transition-colors"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div className="max-w-3xl">
            <div className="text-xs font-medium text-[#0284C7] dark:text-sky-400 mb-2">
              02. Metodología de Trabajo y Organización
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight text-balance mb-3">
              Guía Paso a Paso: Creación, Colecciones de Fuentes y Personalización
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Aprende a estructurar tus cuadernos por ámbito de intervención orientadora, organizar colecciones documentales por alumno o aula y configurar notas fijas para obtener respuestas rigurosas en segundos.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-start print:hidden">
            <button
              type="button"
              onClick={() => {
                document.body.classList.add('print-only-guia');
                window.print();
                setTimeout(() => document.body.classList.remove('print-only-guia'), 1000);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-[#0284C7] dark:hover:border-sky-400 hover:text-[#0284C7] dark:hover:text-sky-400 transition-colors shadow-2xs cursor-pointer"
              title="Imprimir la Guía Paso a Paso en formato limpio"
            >
              <Printer className="w-3.5 h-3.5 text-[#0284C7] dark:text-sky-400" />
              <span>Imprimir Guía</span>
            </button>

            {/* Quick Step Switcher Pills (Interactive Segmented Control) */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg">
              {STEP_BY_STEP_GUIDE.map((step, idx) => (
                <button
                  key={step.stepNumber}
                  type="button"
                  onClick={() => setOpenStepIndex(idx)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    openStepIndex === idx
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  Paso {step.stepNumber}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Accordions */}
        <div className="space-y-4">
          {STEP_BY_STEP_GUIDE.map((step, index) => {
            const isOpen = openStepIndex === index;

            return (
              <div
                key={step.stepNumber}
                className={`border rounded-xl transition-colors ${
                  isOpen
                    ? 'border-slate-300 dark:border-slate-700 bg-[#F8FAFC] dark:bg-slate-950/60'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {/* Accordion Header */}
                <button
                  type="button"
                  onClick={() => setOpenStepIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  className="w-full px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <span
                      className={`w-9 h-9 rounded-lg font-mono text-sm font-semibold flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? 'bg-[#0284C7] text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {step.stepNumber}
                    </span>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100">
                        {step.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        <span>{step.subtitle}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums text-slate-600 dark:text-slate-300">
                          {step.duration}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-300 shrink-0 print:hidden">
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {/* Accordion Body - Always visible on print */}
                <div
                  className={`px-5 pb-6 sm:px-6 sm:pb-6 pt-2 border-t border-slate-200/80 dark:border-slate-800 ${
                    isOpen ? 'block' : 'hidden print:block'
                  }`}
                >
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-6 max-w-4xl">
                      {step.description}
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      {/* Left Column (6 cols): Best Practices & Protocol Warnings */}
                      <div className="lg:col-span-6 space-y-5">
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
                          <h4 className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 mb-3 flex items-center gap-2">
                            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                            <span>Buenas Prácticas Recomendadas en Orientación</span>
                          </h4>
                          <ul className="space-y-2.5">
                            {step.goodPractices.map((practice, i) => (
                              <li
                                key={i}
                                className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed flex items-start gap-2.5"
                              >
                                <span className="font-mono text-xs text-emerald-700 dark:text-emerald-400 font-semibold mt-0.5 shrink-0">
                                  0{i + 1}.
                                </span>
                                <span>{practice}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
                          <h4 className="text-xs font-semibold text-amber-800 dark:text-amber-400 mb-3 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                            <span>Errores Frecuentes que Debes Evitar</span>
                          </h4>
                          <ul className="space-y-2">
                            {step.avoidPractices.map((avoid, i) => (
                              <li
                                key={i}
                                className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed flex items-start gap-2.5"
                              >
                                <span className="font-mono text-xs text-amber-700 dark:text-amber-400 font-semibold mt-0.5 shrink-0">
                                  !
                                </span>
                                <span>{avoid}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Right Column (6 cols): Visual Blueprint of the Notebook Setup */}
                      <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
                            <div className="flex items-center gap-2">
                              <FolderOpen className="w-4 h-4 text-[#0284C7] dark:text-sky-400 shrink-0" />
                              <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100">
                                {step.interactiveDemo.notebookTitle}
                              </span>
                            </div>
                            <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                              Esquema Modelo
                            </span>
                          </div>

                          {/* Folder & Source Hierarchy */}
                          <div className="space-y-3 mb-5">
                            {step.interactiveDemo.folderStructure.map((folder, fIdx) => (
                              <div
                                key={fIdx}
                                className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 rounded-lg p-3"
                              >
                                <div className="text-xs font-semibold text-slate-700 dark:text-slate-200 mb-2">
                                  {folder.folderName}
                                </div>
                                <div className="space-y-1.5">
                                  {folder.files.map((file, fileIdx) => (
                                    <div
                                      key={fileIdx}
                                      className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-300"
                                    >
                                      <FileCheck className="w-3.5 h-3.5 text-[#0284C7] dark:text-sky-400 shrink-0" />
                                      <span className="truncate">{file}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Pinned Note Example */}
                          <div className="bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 rounded-lg p-3.5 mb-4">
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-900 dark:text-amber-300 mb-1">
                              <Pin className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 shrink-0" />
                              <span>Ejemplo de Nota Fija (Pinned Note) en el Tablón:</span>
                            </div>
                            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                              {step.interactiveDemo.pinnedNoteExample}
                            </p>
                          </div>
                        </div>

                        {/* Custom Instruction Box with Copy Button */}
                        <div className="bg-slate-900 dark:bg-slate-950 border border-transparent dark:border-slate-800 text-slate-100 rounded-lg p-3.5">
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <span className="text-xs font-medium text-sky-300 flex items-center gap-1.5">
                              <Sliders className="w-3.5 h-3.5 shrink-0" />
                              <span>Instrucción de Personalización para este Cuaderno:</span>
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                handleCopyInstruction(
                                  step.interactiveDemo.customInstructionExample,
                                  index
                                )
                              }
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-white rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer print:hidden"
                            >
                              {copiedInstructionIndex === index ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                  <span>Copiado</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Copiar instrucción</span>
                                </>
                              )}
                            </button>
                          </div>
                          <p className="text-xs text-slate-300 font-mono leading-relaxed">
                            «{step.interactiveDemo.customInstructionExample}»
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
