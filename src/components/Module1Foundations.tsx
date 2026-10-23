import React, { useState } from 'react';
import {
  FileText,
  Headphones,
  Quote,
  ShieldCheck,
  Search,
  BookOpen,
  Play,
  Pause,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { GROUNDING_SIMULATIONS, CitationFragment } from '../data/notebookData';

interface Module1FoundationsProps {
  onJumpToUseCases: () => void;
}

export const Module1Foundations: React.FC<Module1FoundationsProps> = ({
  onJumpToUseCases,
}) => {
  const [activeSimIndex, setActiveSimIndex] = useState<number>(0);
  const [selectedCitationId, setSelectedCitationId] = useState<string>('cit-1');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const currentSim = GROUNDING_SIMULATIONS[activeSimIndex];
  const activeCitation: CitationFragment | undefined =
    currentSim.citations[selectedCitationId] ||
    Object.values(currentSim.citations)[0];

  const handleSelectSim = (index: number) => {
    setActiveSimIndex(index);
    const firstCitKey = Object.keys(GROUNDING_SIMULATIONS[index].citations)[0];
    setSelectedCitationId(firstCitKey);
    setIsPlayingAudio(false);
  };

  return (
    <section
      id="fundamentos"
      className="py-12 md:py-16 border-b border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0B1120] transition-colors"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-medium text-[#0284C7] dark:text-sky-400 mb-2">
            01. Fundamentos y Arquitectura Basada en Fuentes
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight text-balance mb-3">
            ¿Por qué NotebookLM transforma el trabajo del Departamento de Orientación?
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            A diferencia de los chatbots generalistas que responden desde su memoria de entrenamiento en internet,{' '}
            <strong className="font-semibold text-slate-900 dark:text-white">
              NotebookLM opera bajo anclaje estricto en fuentes (Source Grounding)
            </strong>
            : razona exclusivamente sobre los documentos normativos, informes anonimizados y programaciones que tú cargas en cada cuaderno, incluyendo citas verificables a cada fragmento original.
          </p>
        </div>

        {/* 4 Key Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-col justify-between transition-colors">
            <div>
              <div className="w-9 h-9 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-[#0284C7] dark:text-sky-400 flex items-center justify-center mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-2">
                01. Ecosistema Multimodal de Fuentes
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Admite simultáneamente PDFs normativos, Google Docs, presentaciones Slides, páginas web oficiales, vídeos formativos de YouTube y grabaciones de audio.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums">
              Hasta 50 fuentes · 500.000 palabras/fuente
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-col justify-between transition-colors">
            <div>
              <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-4">
                <Quote className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-2">
                02. Cita Exacta y Trazabilidad
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Cada afirmación incluye referencias numeradas interactivas. Al pulsarlas, NotebookLM abre y resalta el párrafo literal del informe o decreto del que procede el dato.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums">
              Riesgo mínimo de alucinación normativa
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-col justify-between transition-colors">
            <div>
              <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center mb-4">
                <Headphones className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-2">
                03. Resúmenes de Audio (Podcasts)
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Convierte protocolos densos, planes de convivencia o pautas DUA en una conversación en español entre dos presentadores para sensibilizar al claustro o a las familias.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums">
              Audio Overviews personalizables en español
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-col justify-between transition-colors">
            <div>
              <div className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-2">
                04. Privacidad y Deontología
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Los datos subidos no se utilizan para entrenar modelos globales. Aun así, la regla de oro en orientación es anonimizar siempre mediante códigos antes de cargar documentos.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums">
              Protección Workspace Education + Anonimización
            </div>
          </div>
        </div>

        {/* Interactive Grounding & Citation Sandbox */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-colors">
          {/* Sandbox Top Toolbar */}
          <div className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 px-5 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-0.5">
                Simulador Interactivo de Trazabilidad (Grounding)
              </div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                Explora cómo NotebookLM triangula documentos y verifica citas en tiempo real
              </h3>
            </div>

            {/* Scenario Switcher */}
            <div className="flex items-center gap-1 p-1 bg-slate-200/70 dark:bg-slate-950/70 rounded-lg self-start md:self-auto">
              {GROUNDING_SIMULATIONS.map((sim, idx) => (
                <button
                  key={sim.id}
                  type="button"
                  onClick={() => handleSelectSim(idx)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeSimIndex === idx
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {idx === 0 ? 'Caso 1: Triangulación DEA' : 'Caso 2: Normativa Inclusión'}
                </button>
              ))}
            </div>
          </div>

          {/* Two-Zone Sandbox Layout (Education Reference Standard) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-800">
            {/* Left Zone (7 cols): NotebookLM Synthesis & Clickable Citations */}
            <div className="lg:col-span-7 p-5 sm:p-6 flex flex-col justify-between">
              <div>
                {/* Loaded Sources Row */}
                <div className="mb-5">
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                    Fuentes seleccionadas en el cuaderno ({currentSim.sourcesLoaded.length} activas):
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                    {currentSim.sourcesLoaded.map((src, i) => (
                      <React.Fragment key={src.name}>
                        {i > 0 && (
                          <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">
                            ·
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1.5 font-mono text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded px-2 py-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0284C7] dark:text-sky-400 shrink-0" />
                          <span>{src.name}</span>
                          <span className="text-slate-400 dark:text-slate-500">({src.pages})</span>
                        </span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* User Prompt Box */}
                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-lg p-3.5 mb-5">
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                    Consulta del orientador/a en el chat del cuaderno:
                  </div>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    «{currentSim.userQuery}»
                  </p>
                </div>

                {/* Synthesized Response with Interactive Citation Buttons */}
                <div className="space-y-3.5 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Respuesta sintetizada por NotebookLM (Pulsa cualquier número de cita para inspeccionar la fuente):
                    </span>
                  </div>

                  {currentSim.synthesizedResponse.map((item, idx) => (
                    <p key={idx} className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {item.paragraph}{' '}
                      <span className="inline-flex items-center gap-1 ml-1 align-baseline">
                        {item.citationIds.map((citId) => {
                          const citNumber = citId.replace('cit-', '');
                          const isSelected = selectedCitationId === citId;
                          return (
                            <button
                              key={citId}
                              type="button"
                              onClick={() => setSelectedCitationId(citId)}
                              aria-label={`Ver cita ${citNumber}`}
                              className={`inline-flex items-center justify-center px-2 py-0.5 text-xs font-mono font-semibold rounded transition-colors cursor-pointer ${
                                isSelected
                                  ? 'bg-[#0284C7] text-white'
                                  : 'bg-sky-50 dark:bg-sky-950/70 text-[#0284C7] dark:text-sky-300 hover:bg-sky-100 dark:hover:bg-sky-900/80 border border-sky-200 dark:border-sky-800'
                              }`}
                            >
                              [{citNumber}]
                            </button>
                          );
                        })}
                      </span>
                    </p>
                  ))}
                </div>
              </div>

              {/* Audio Overview Simulation Bar */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-lg p-3.5">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                      className="w-9 h-9 rounded-lg bg-[#0284C7] text-white flex items-center justify-center hover:bg-[#0369A1] transition-colors shrink-0 cursor-pointer"
                      aria-label={
                        isPlayingAudio
                          ? 'Pausar demostración de resumen de audio'
                          : 'Escuchar demostración de resumen de audio'
                      }
                    >
                      {isPlayingAudio ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4 ml-0.5" />
                      )}
                    </button>
                    <div>
                      <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                        Resumen de Audio (Podcast de Síntesis para el Equipo Docente)
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums">
                        Duración estimada: {currentSim.audioOverviewSample.duration} · Español (2 voces)
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="px-3 py-1.5 text-xs font-medium text-[#0284C7] dark:text-sky-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {isPlayingAudio ? 'Ocultar transcripción' : 'Ver transcripción del podcast'}
                  </button>
                </div>

                {isPlayingAudio && (
                  <div className="mt-3 p-4 bg-sky-50/60 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/80 rounded-lg space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <div className="font-semibold text-slate-900 dark:text-slate-100">
                      Extracto del diálogo generado automáticamente a partir de las fuentes:
                    </div>
                    <p>
                      <strong className="text-[#0284C7] dark:text-sky-400">Voz Orientador A:</strong>{' '}
                      {currentSim.audioOverviewSample.hostA}
                    </p>
                    <p>
                      <strong className="text-emerald-700 dark:text-emerald-400">Voz Orientadora B:</strong>{' '}
                      {currentSim.audioOverviewSample.hostB}
                    </p>
                    <div className="pt-2 border-t border-sky-200/70 dark:border-sky-800/60 text-slate-600 dark:text-slate-300">
                      <strong className="text-slate-800 dark:text-slate-100">Utilidad práctica:</strong>{' '}
                      {currentSim.audioOverviewSample.keyTakeaway}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Zone (5 cols): Source Inspector Deck */}
            <div className="lg:col-span-5 p-5 sm:p-6 bg-slate-50/50 dark:bg-slate-950/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    <Search className="w-4 h-4 text-[#0284C7] dark:text-sky-400" />
                    Inspector de Fuente Original Verificada
                  </span>
                  <span className="text-xs font-mono text-[#0284C7] dark:text-sky-400 font-medium">
                    Cita activa [{selectedCitationId.replace('cit-', '')}]
                  </span>
                </div>

                {/* Citation Selector Tabs */}
                <div className="flex items-center gap-1.5 mb-4">
                  {Object.keys(currentSim.citations).map((citKey) => {
                    const num = citKey.replace('cit-', '');
                    const active = selectedCitationId === citKey;
                    return (
                      <button
                        key={citKey}
                        type="button"
                        onClick={() => setSelectedCitationId(citKey)}
                        className={`px-3 py-1.5 text-xs font-mono font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          active
                            ? 'bg-[#0284C7] text-white'
                            : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        Cita [{num}]
                      </button>
                    );
                  })}
                </div>

                {activeCitation && (
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-4">
                    <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                      <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                        Documento fuente en el cuaderno:
                      </div>
                      <div className="text-sm font-mono font-semibold text-slate-900 dark:text-slate-100 break-all">
                        {activeCitation.sourceName}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Ubicación exacta:{' '}
                        <span className="font-medium text-slate-700 dark:text-slate-200">
                          {activeCitation.pageOrTimestamp}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                        Pasaje literal resaltado por NotebookLM:
                      </div>
                      <blockquote className="p-3 bg-sky-50/70 dark:bg-sky-950/50 border border-sky-100 dark:border-sky-900/80 rounded-lg text-xs sm:text-sm text-slate-800 dark:text-slate-100 leading-relaxed font-normal">
                        {activeCitation.quote}
                      </blockquote>
                    </div>

                    <div className="pt-2">
                      <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                        Valor para la toma de decisiones del orientador:
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        {activeCitation.relevanceNote}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
                  <span>5 ámbitos de orientación documentados</span>
                </div>
                <button
                  type="button"
                  onClick={onJumpToUseCases}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0284C7] dark:text-sky-400 hover:text-[#0369A1] dark:hover:text-sky-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Ver casos prácticos</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
