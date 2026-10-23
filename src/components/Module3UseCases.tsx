import React, { useState, useMemo } from 'react';
import {
  Search,
  Copy,
  Check,
  FileText,
  Sparkles,
  CheckCircle2,
  X,
  ArrowUpRight,
} from 'lucide-react';
import {
  USE_CASES_DATA,
  CATEGORY_META,
  OrientationCategory,
  UseCaseItem,
} from '../data/notebookData';

interface Module3UseCasesProps {
  onLoadInSimulator: (category: OrientationCategory) => void;
}

export const Module3UseCases: React.FC<Module3UseCasesProps> = ({
  onLoadInSimulator,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | OrientationCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTabByCard, setActiveTabByCard] = useState<Record<string, 'prompt' | 'output'>>({});

  const filteredUseCases = useMemo(() => {
    return USE_CASES_DATA.filter((item) => {
      const matchesCat =
        selectedCategory === 'all' || item.category === selectedCategory;

      if (!searchQuery.trim()) return matchesCat;

      const q = searchQuery.toLowerCase();
      const inTitle = item.title.toLowerCase().includes(q);
      const inSummary = item.summary.toLowerCase().includes(q);
      const inStage = item.educationalStage.toLowerCase().includes(q);
      const inTags = item.tags.some((t) => t.toLowerCase().includes(q));
      const inPrompt = item.recommendedPrompt.toLowerCase().includes(q);
      const inSources = item.suggestedSources.some((s) =>
        s.title.toLowerCase().includes(q)
      );

      return (
        matchesCat &&
        (inTitle || inSummary || inStage || inTags || inPrompt || inSources)
      );
    });
  }, [selectedCategory, searchQuery]);

  const handleCopyPrompt = (useCase: UseCaseItem) => {
    navigator.clipboard.writeText(useCase.recommendedPrompt);
    setCopiedId(useCase.id);
    setTimeout(() => setCopiedId(null), 2200);
  };

  const getCardTab = (id: string): 'prompt' | 'output' => {
    return activeTabByCard[id] || 'prompt';
  };

  const setCardTab = (id: string, tab: 'prompt' | 'output') => {
    setActiveTabByCard((prev) => ({ ...prev, [id]: tab }));
  };

  return (
    <section
      id="funciones-orientador"
      className="py-12 md:py-16 border-b border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0B1120] transition-colors"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="text-xs font-medium text-[#0284C7] dark:text-sky-400 mb-2">
            03. Aplicación en Funciones Específicas del Orientador
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight text-balance mb-3">
            Catálogo de Casos Prácticos por Ámbito de Intervención
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Filtra por función orientadora o utiliza el buscador para encontrar qué documentos subir a tu cuaderno, el Prompt Maestro listo para copiar y el resultado estructurado que obtendrás en NotebookLM.
          </p>
        </div>

        {/* Interactive Filter & Live Search Toolbar */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition-colors">
          {/* Category Segmented Controls */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 dark:bg-sky-500 text-white dark:text-slate-950 font-semibold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-slate-700'
              }`}
            >
              Todas las Funciones ({USE_CASES_DATA.length})
            </button>

            {(Object.keys(CATEGORY_META) as OrientationCategory[]).map((catKey) => {
              const meta = CATEGORY_META[catKey];
              const count = USE_CASES_DATA.filter((u) => u.category === catKey).length;
              const isSelected = selectedCategory === catKey;

              return (
                <button
                  key={catKey}
                  type="button"
                  onClick={() => setSelectedCategory(catKey)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#0284C7] dark:bg-sky-500 text-white dark:text-slate-950 font-semibold'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-slate-700'
                  }`}
                >
                  {meta.shortLabel} ({count})
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-80 shrink-0">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por DEA, DUA, PAT, PGA, FP..."
              aria-label="Buscar casos de uso de orientación educativa"
              className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#0284C7] dark:focus:border-sky-400 focus:bg-white dark:focus:bg-slate-900 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Limpiar búsqueda"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Description Banner when a specific function is active */}
        {selectedCategory !== 'all' && (
          <div className="mb-6 px-5 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-semibold text-[#0284C7] dark:text-sky-400">
                {CATEGORY_META[selectedCategory].label}:
              </span>{' '}
              <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                {CATEGORY_META[selectedCategory].description}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onLoadInSimulator(selectedCategory)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0284C7] dark:text-sky-400 hover:text-[#0369A1] dark:hover:text-sky-300 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Personalizar en el Simulador</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Empty State if no matches */}
        {filteredUseCases.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-10 text-center max-w-lg mx-auto">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">
              No se encontraron casos con ese criterio de búsqueda
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4">
              Prueba con términos como «Dislexia», «DUA», «PAT», «Conflictos», «FP», «Memoria» o «Familias», o restablece los filtros activos.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-medium bg-[#0284C7] text-white rounded-lg hover:bg-[#0369A1] transition-colors cursor-pointer"
            >
              Mostrar todos los casos ({USE_CASES_DATA.length})
            </button>
          </div>
        ) : (
          /* Use Case Cards List */
          <div className="space-y-6">
            {filteredUseCases.map((useCase) => {
              const activeTab = getCardTab(useCase.id);
              const isCopied = copiedId === useCase.id;

              return (
                <article
                  key={useCase.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-colors"
                >
                  {/* Card Top Header */}
                  <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800">
                    {/* Zero-Pill Metadata Line */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                      <span className="font-semibold text-[#0284C7] dark:text-sky-400">
                        {useCase.categoryLabel}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>Etapa: {useCase.educationalStage}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums text-emerald-700 dark:text-emerald-400 font-medium">
                        {useCase.timeSavedMetric}
                      </span>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      <div className="max-w-3xl">
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                          {useCase.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          {useCase.summary}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-start">
                        <button
                          type="button"
                          onClick={() => handleCopyPrompt(useCase)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-[#0284C7] hover:bg-[#0369A1] text-white rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Prompt copiado</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copiar Prompt</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => onLoadInSimulator(useCase.category)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <span>Abrir en Simulador</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Clean Unboxed Tags */}
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">
                        Palabras clave:
                      </span>
                      {useCase.tags.map((tag, idx) => (
                        <React.Fragment key={tag}>
                          {idx > 0 && <span aria-hidden="true">·</span>}
                          <span className="text-slate-600 dark:text-slate-300">{tag}</span>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Card 2-Column Body: Suggested Sources + Prompt / Expected Result */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-800">
                    {/* Left Column (4 cols): Fuentes Sugeridas a Subir */}
                    <div className="lg:col-span-4 p-5 sm:p-6 bg-slate-50/60 dark:bg-slate-950/40">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-slate-100 mb-3">
                        <FileText className="w-4 h-4 text-[#0284C7] dark:text-sky-400 shrink-0" />
                        <span>1. Fuentes sugeridas a subir al cuaderno</span>
                      </div>
                      <div className="space-y-3">
                        {useCase.suggestedSources.map((src, sIdx) => (
                          <div
                            key={sIdx}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3.5"
                          >
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                                {src.title}
                              </span>
                            </div>
                            <div className="text-xs font-mono text-[#0284C7] dark:text-sky-400 mb-1.5">
                              Formato: {src.format}
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                              {src.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Column (8 cols): Prompt Recomendado + Resultado Esperado */}
                    <div className="lg:col-span-8 p-5 sm:p-6 flex flex-col justify-between">
                      <div>
                        {/* Segmented Switcher between Recommended Prompt & Expected Output */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg self-start">
                            <button
                              type="button"
                              onClick={() => setCardTab(useCase.id, 'prompt')}
                              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                                activeTab === 'prompt'
                                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                              }`}
                            >
                              2. Prompt Recomendado
                            </button>
                            <button
                              type="button"
                              onClick={() => setCardTab(useCase.id, 'output')}
                              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                                activeTab === 'output'
                                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                              }`}
                            >
                              3. Resultado Esperado en NotebookLM
                            </button>
                          </div>

                          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                            Entregable: {useCase.expectedOutput.formatType}
                          </span>
                        </div>

                        {activeTab === 'prompt' ? (
                          <div className="bg-slate-900 dark:bg-slate-950 border border-transparent dark:border-slate-800 text-slate-100 rounded-xl p-4 sm:p-5">
                            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3">
                              <span className="text-xs font-mono text-sky-300">
                                Prompt optimizado para copiar y pegar en el chat de NotebookLM
                              </span>
                              <button
                                type="button"
                                onClick={() => handleCopyPrompt(useCase)}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-white rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                              >
                                {isCopied ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                    <span>Copiado al portapapeles</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5" />
                                    <span>Copiar texto</span>
                                  </>
                                )}
                              </button>
                            </div>
                            <pre className="text-xs sm:text-sm font-mono text-slate-200 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                              {useCase.recommendedPrompt}
                            </pre>
                          </div>
                        ) : (
                          <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 space-y-4">
                            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                              <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-[#0284C7] dark:text-sky-400 shrink-0" />
                                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                  {useCase.expectedOutput.previewTitle}
                                </h4>
                              </div>
                              <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400">
                                Vista Previa de Respuesta
                              </span>
                            </div>

                            <div className="space-y-3">
                              {useCase.expectedOutput.sections.map((sec, idx) => (
                                <div
                                  key={idx}
                                  className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-lg p-3.5"
                                >
                                  <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 mb-1">
                                    {sec.heading}
                                  </div>
                                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                                    {sec.content}
                                  </p>
                                </div>
                              ))}
                            </div>

                            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                              <span className="font-semibold text-slate-700 dark:text-slate-300">
                                Citas verificadas en el resultado:
                              </span>
                              {useCase.expectedOutput.citationsIncluded.map((cit, cIdx) => (
                                <span
                                  key={cIdx}
                                  className="inline-flex items-center gap-1 font-mono text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded px-2 py-0.5 text-slate-700 dark:text-slate-300"
                                >
                                  <CheckCircle2 className="w-3 h-3 text-[#0284C7] dark:text-sky-400" />
                                  {cit}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Bottom Switch Helper */}
                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                        <span>
                          {activeTab === 'prompt'
                            ? '¿Quieres ver cómo responde NotebookLM a este prompt?'
                            : '¿Listo para probarlo en tu propio cuaderno?'}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setCardTab(
                              useCase.id,
                              activeTab === 'prompt' ? 'output' : 'prompt'
                            )
                          }
                          className="font-semibold text-[#0284C7] dark:text-sky-400 hover:text-[#0369A1] dark:hover:text-sky-300 transition-colors cursor-pointer"
                        >
                          {activeTab === 'prompt'
                            ? 'Ver resultado esperado →'
                            : '← Volver al prompt recomendado'}
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
