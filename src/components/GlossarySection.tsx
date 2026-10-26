import React, { useState, useMemo } from 'react';
import {
  Search,
  BookMarked,
  Copy,
  Check,
  FileText,
  Sparkles,
  X,
  ExternalLink,
  Printer,
} from 'lucide-react';
import { GLOSSARY_TERMS, GLOSSARY_CATEGORIES, GlossaryTerm } from '../data/glossaryData';

interface GlossarySectionProps {
  onSelectPromptSnippet?: (snippet: string) => void;
}

export const GlossarySection: React.FC<GlossarySectionProps> = ({
  onSelectPromptSnippet,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      if (!searchQuery.trim()) return matchesCategory;

      const q = searchQuery.toLowerCase().trim();
      const inTerm = item.term.toLowerCase().includes(q);
      const inAcronym = item.acronym ? item.acronym.toLowerCase().includes(q) : false;
      const inDef = item.definition.toLowerCase().includes(q);
      const inApp = item.notebooklmApplication.toLowerCase().includes(q);
      const inSources = item.recommendedSources.some((src) => src.toLowerCase().includes(q));

      return matchesCategory && (inTerm || inAcronym || inDef || inApp || inSources);
    });
  }, [searchQuery, selectedCategory]);

  const handleCopySnippet = (item: GlossaryTerm) => {
    navigator.clipboard.writeText(item.suggestedPromptSnippet);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2200);

    if (onSelectPromptSnippet) {
      onSelectPromptSnippet(item.suggestedPromptSnippet);
    }
  };

  return (
    <section
      id="glosario-terminos"
      className="py-12 md:py-16 border-b border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0B1120] transition-colors"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-medium text-[#0284C7] dark:text-sky-400 mb-2">
              <BookMarked className="w-4 h-4" />
              <span>05. Marco Conceptual y Vocabulario Técnico</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight text-balance mb-3">
              Glosario de Términos en Psicopedagogía y Orientación
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Consulta rápida de conceptos clave (ACNS, DUA, DEA, NEAE, PAT, PGA, Pasarelas FP-Universidad). Cada término incluye su definición técnica, su aplicación específica en <strong className="font-semibold text-slate-900 dark:text-white">NotebookLM</strong> y un fragmento de prompt listo para copiar al simulador.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              document.body.classList.add('print-only-glosario');
              window.print();
              setTimeout(() => document.body.classList.remove('print-only-glosario'), 1000);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-[#0284C7] dark:hover:border-sky-400 hover:text-[#0284C7] dark:hover:text-sky-400 transition-colors shadow-2xs self-start print:hidden cursor-pointer"
            title="Imprimir el glosario de términos en formato limpio"
          >
            <Printer className="w-3.5 h-3.5 text-[#0284C7] dark:text-sky-400" />
            <span>Imprimir Glosario</span>
          </button>
        </div>

        {/* Search Bar & Category Filter Toolbar */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition-colors print:hidden">
          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            {GLOSSARY_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const count =
                cat.id === 'all'
                  ? GLOSSARY_TERMS.length
                  : GLOSSARY_TERMS.filter((t) => t.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 dark:bg-sky-500 text-white dark:text-slate-950 font-semibold'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat.label} ({count})
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
              placeholder="Buscar por DUA, ACNS, memoria, WISC..."
              aria-label="Buscar en el glosario psicopedagógico"
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

        {/* Empty State */}
        {filteredTerms.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-10 text-center max-w-md mx-auto">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">
              No se encontraron términos para esta búsqueda
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4">
              Prueba con términos como «DUA», «DEA», «ACNS», «PAT» o «Pasarelas», o restablece el filtro de categorías.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-medium bg-[#0284C7] text-white rounded-lg hover:bg-[#0369A1] transition-colors cursor-pointer"
            >
              Ver todos los términos ({GLOSSARY_TERMS.length})
            </button>
          </div>
        ) : (
          /* Glossary Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTerms.map((item) => {
              const isCopied = copiedId === item.id;

              return (
                <div
                  key={item.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-col justify-between transition-colors hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs print:break-inside-avoid print:mb-4"
                >
                  <div>
                    {/* Unboxed Metadata Line (anti-pill discipline) */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-2">
                      <span className="font-semibold text-[#0284C7] dark:text-sky-400">
                        {item.categoryLabel}
                      </span>
                      {item.acronym && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono font-medium text-slate-700 dark:text-slate-300">
                            {item.acronym}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Term Title */}
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 mb-2.5">
                      {item.term}
                    </h3>

                    {/* Definition */}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {item.definition}
                    </p>

                    {/* NotebookLM Specific Practical Application */}
                    <div className="bg-sky-50/70 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/60 rounded-lg p-3 mb-4">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0284C7] dark:text-sky-300 mb-1">
                        <Sparkles className="w-3.5 h-3.5 shrink-0" />
                        <span>Cómo usarlo en NotebookLM:</span>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        {item.notebooklmApplication}
                      </p>
                    </div>

                    {/* Recommended Sources to Upload */}
                    <div className="mb-4">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        <FileText className="w-3.5 h-3.5 text-slate-400" />
                        <span>Fuentes recomendadas a subir:</span>
                      </div>
                      <div className="space-y-1">
                        {item.recommendedSources.map((source, sIdx) => (
                          <div
                            key={sIdx}
                            className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1.5"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 shrink-0" />
                            <span className="truncate">{source}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Prompt Snippet Box (Print-optimized text + screen button) */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                    <div className="hidden print:block text-xs font-mono text-slate-800 bg-slate-50 border border-slate-200 p-2.5 rounded-md mb-1">
                      <span className="font-semibold text-slate-950 block mb-0.5">Prompt sugerido:</span>
                      «{item.suggestedPromptSnippet}»
                    </div>
                    <div className="flex items-center justify-between gap-2 print:hidden">
                      <span className="text-[11px] text-slate-400 dark:text-slate-500 truncate">
                        Snippet para el chat:
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopySnippet(item)}
                        title={item.suggestedPromptSnippet}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#0284C7] dark:text-sky-300 bg-sky-50 dark:bg-sky-950/70 border border-sky-200 dark:border-sky-800 rounded-md hover:bg-sky-100 dark:hover:bg-sky-900/80 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Copiado</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copiar snippet</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
