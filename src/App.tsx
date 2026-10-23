/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  Compass,
  FileDown,
  FileText,
  Layers,
  Moon,
  Sparkles,
  Sun,
} from 'lucide-react';
import { Module1Foundations } from './components/Module1Foundations';
import { Module2StepByStep } from './components/Module2StepByStep';
import { Module3UseCases } from './components/Module3UseCases';
import { Module4PromptSimulator } from './components/Module4PromptSimulator';
import { Module5AdministrativeTasks } from './components/Module5AdministrativeTasks';
import { OrientationCategory } from './data/notebookData';
import { downloadNotebookLMGuidePdf } from './utils/generatePdfGuide';

export default function App() {
  const [simulatorCategory, setSimulatorCategory] =
    useState<OrientationCategory | null>(null);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState<boolean>(false);
  const [logoLoadError, setLogoLoadError] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('notebooklm-orientacion-theme');
      if (saved === 'dark') return true;
      if (saved === 'light') return false;
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(
        'notebooklm-orientacion-theme',
        isDarkMode ? 'dark' : 'light'
      );
    } catch {
      // ignore storage errors in restricted environments
    }
  }, [isDarkMode]);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLoadInSimulator = (category: OrientationCategory) => {
    setSimulatorCategory(category);
    scrollToSection('simulador-prompts');
  };

  const handleDownloadPdf = () => {
    setIsDownloadingPdf(true);
    try {
      downloadNotebookLMGuidePdf();
    } finally {
      setTimeout(() => setIsDownloadingPdf(false), 2500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#0B1120] text-[#0F172A] dark:text-slate-100 transition-colors duration-200">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 h-16">
          {/* Zone 1: Brand mark with integrated Compass Logo */}
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('inicio');
            }}
            className="group inline-flex items-center gap-2.5 text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0"
          >
            <span className="relative w-9 h-9 rounded-lg overflow-hidden bg-sky-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 shadow-2xs group-hover:border-[#0284C7] dark:group-hover:border-sky-400 transition-colors">
              {!logoLoadError ? (
                <img
                  src="/src/assets/images/logo_compass_orientacion_1791656259004.jpg"
                  alt="Logotipo de brújula de NotebookLM Orientación"
                  referrerPolicy="no-referrer"
                  onError={() => setLogoLoadError(true)}
                  className="w-full h-full object-cover object-top scale-125 group-hover:rotate-6 transition-transform duration-200"
                />
              ) : (
                <svg
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-[#0284C7] dark:text-sky-400 group-hover:rotate-12 transition-transform duration-200"
                  aria-hidden="true"
                >
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                  <polygon
                    points="18,6 21.5,16.5 18,14.5 14.5,16.5"
                    fill="#0284C7"
                  />
                  <polygon
                    points="18,30 21.5,19.5 18,21.5 14.5,19.5"
                    fill="currentColor"
                    fillOpacity="0.45"
                  />
                  <circle cx="18" cy="18" r="2" fill="currentColor" />
                </svg>
              )}
            </span>
            <span>NotebookLM · Orientación</span>
          </a>

          {/* Zone 2: 5 concise single-line text navigation links */}
          <nav
            aria-label="Navegación principal"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300"
          >
            <a
              href="#fundamentos"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('fundamentos');
              }}
              className="hover:text-slate-900 dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Fundamentos
            </a>
            <a
              href="#guia-paso-a-paso"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('guia-paso-a-paso');
              }}
              className="hover:text-slate-900 dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Guía Paso a Paso
            </a>
            <a
              href="#funciones-orientador"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('funciones-orientador');
              }}
              className="hover:text-slate-900 dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Casos de Uso
            </a>
            <a
              href="#tareas-administrativas"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('tareas-administrativas');
              }}
              className="hover:text-slate-900 dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Gestión Administrativa
            </a>
            <a
              href="#simulador-prompts"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('simulador-prompts');
              }}
              className="hover:text-slate-900 dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Simulador
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => scrollToSection('simulador-prompts')}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#0284C7] rounded-lg hover:bg-[#0369A1] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Generar Prompt Maestro
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="inicio" className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-white dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 transition-colors">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Workspace Reading Comfort Toolbar (Below the header to honor 3-zone Top Bar Contract) */}
            <div className="mb-8 pb-4 border-b border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-[#0284C7] dark:text-sky-400">
                  Centro de Recursos Psicopedagógicos
                </span>
                <span aria-hidden="true">·</span>
                <span>Anclaje en Fuentes (Source Grounding)</span>
                <span aria-hidden="true">·</span>
                <span>100% Orientado a Práctica Real</span>
              </div>

              {/* High-Legibility Dark Mode Segmented Toggle */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">
                  Confort visual:
                </span>
                <div className="inline-flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setIsDarkMode(false)}
                    aria-pressed={!isDarkMode}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      !isDarkMode
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    <span>Modo Claro</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsDarkMode(true)}
                    aria-pressed={isDarkMode}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isDarkMode
                        ? 'bg-slate-800 text-sky-300 shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5 text-sky-400" />
                    <span>Tema Oscuro (Baja Fatiga)</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              {/* Left Column (7 cols): Value Proposition & Quick Actions */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-slate-900 dark:text-slate-50 tracking-tight leading-[1.15] text-balance mb-4">
                    NotebookLM aplicado a la Orientación Educativa y Profesional
                  </h1>

                  <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6 max-w-2xl">
                    Manual interactivo, banco de casos reales y simulador de prompts para transformar informes psicopedagógicos anonimizados, normativa de inclusión, planes de acción tutorial (PAT), catálogos de FP/Universidad y gestión administrativa en instrumentos rigurosos con citas exactas.
                  </p>
                </div>

                <div>
                  {/* Primary, Secondary & PDF Download Quick-Access Buttons */}
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <button
                      type="button"
                      onClick={() => scrollToSection('funciones-orientador')}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#0284C7] hover:bg-[#0369A1] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>Explorar los 5 Ámbitos de Orientación</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={handleDownloadPdf}
                      className="group inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-900 dark:hover:bg-sky-400 hover:text-white dark:hover:text-slate-950 hover:border-slate-900 dark:hover:border-sky-400 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {isDownloadingPdf ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 group-hover:text-emerald-400 dark:group-hover:text-slate-950 transition-transform duration-150" />
                          <span>¡Guía PDF descargada!</span>
                        </>
                      ) : (
                        <>
                          <FileDown className="w-4 h-4 text-[#0284C7] dark:text-sky-400 group-hover:text-sky-300 dark:group-hover:text-slate-950 group-hover:translate-y-0.5 transition-transform duration-150" />
                          <span>Descargar Guía de Uso (PDF)</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => scrollToSection('tareas-administrativas')}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-[#0284C7] dark:text-sky-400" />
                      <span>Módulo Tareas Administrativas</span>
                    </button>
                  </div>

                  {/* Quick Jump Itinerary Links */}
                  <div className="pt-5 border-t border-slate-200 dark:border-slate-800">
                    <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2.5">
                      Acceso directo por función del Departamento de Orientación:
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                      <button
                        type="button"
                        onClick={() => handleLoadInSimulator('evaluacion')}
                        className="text-left px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-[#0284C7] dark:hover:border-sky-400 bg-[#F8FAFC] dark:bg-slate-950/70 transition-colors cursor-pointer"
                      >
                        <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                          01. Evaluación DEA
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          Informes y ACNS
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleLoadInSimulator('asesoramiento')}
                        className="text-left px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-[#0284C7] dark:hover:border-sky-400 bg-[#F8FAFC] dark:bg-slate-950/70 transition-colors cursor-pointer"
                      >
                        <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                          02. Pautas DUA
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          Programaciones
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleLoadInSimulator('tutoria')}
                        className="text-left px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-[#0284C7] dark:hover:border-sky-400 bg-[#F8FAFC] dark:bg-slate-950/70 transition-colors cursor-pointer"
                      >
                        <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                          03. Acción Tutorial
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          Talleres PAT y Clima
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleLoadInSimulator('academica')}
                        className="text-left px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-[#0284C7] dark:hover:border-sky-400 bg-[#F8FAFC] dark:bg-slate-950/70 transition-colors cursor-pointer"
                      >
                        <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                          04. Vocacional FP/Uni
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          Matrices e Itinerarios
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => scrollToSection('tareas-administrativas')}
                        className="text-left px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-[#0284C7] dark:hover:border-sky-400 bg-[#F8FAFC] dark:bg-slate-950/70 transition-colors cursor-pointer col-span-2 sm:col-span-1"
                      >
                        <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                          05. Administración
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          Memoria, PGA y Becas
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column (5 cols): Visual Architecture Workflow Card */}
              <div className="lg:col-span-5 bg-[#F8FAFC] dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 mb-4">
                    <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                      Flujo de Trabajo del Orientador en NotebookLM
                    </span>
                    <span className="text-xs font-mono text-[#0284C7] dark:text-sky-400">
                      Entorno Cerrado
                    </span>
                  </div>

                  <div className="space-y-3.5">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3.5">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-slate-100 mb-1">
                        <FileText className="w-4 h-4 text-[#0284C7] dark:text-sky-400 shrink-0" />
                        <span>Paso A · Fuentes verificadas y anonimizadas</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        Sube Decretos autonómicos, PGA, actas, PAT, programaciones o informes psicopedagógicos codificados (sin nombres ni datos sensibles).
                      </p>
                    </div>

                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3.5">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-slate-100 mb-1">
                        <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>Paso B · Triangulación con citas exactas [1], [2]</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        Cruza evidencias entre pruebas psicométricas y observación de aula, o contrasta objetivos de la PGA con las actas del curso.
                      </p>
                    </div>

                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3.5">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-slate-100 mb-1">
                        <Compass className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                        <span>Paso C · Entregables y Resúmenes de Audio</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        Obtén tablas ACNS, rúbricas DUA, talleres de tutoría, borradores de Memoria Anual o podcasts formativos para el claustro.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Sin alucinaciones fuera de tus documentos</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => scrollToSection('fundamentos')}
                    className="font-semibold text-[#0284C7] dark:text-sky-400 hover:text-[#0369A1] dark:hover:text-sky-300 cursor-pointer"
                  >
                    Ver demostración →
                  </button>
                </div>
              </div>
            </div>

            {/* Full-Width 4-Column Quantitative Summary Strip */}
            <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#F8FAFC] dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
                <div className="text-xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-50">
                  5 Ámbitos
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  Evaluación, Asesoramiento DUA, Acción Tutorial, Vocacional y Gestión Administrativa.
                </div>
              </div>

              <div className="bg-[#F8FAFC] dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
                <div className="text-xl font-bold font-mono tabular-nums text-[#0284C7] dark:text-sky-400">
                  10 Casos + 4 Flujos
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  Con fuentes sugeridas, prompts maestros copiables y flujos de gestión burocrática.
                </div>
              </div>

              <div className="bg-[#F8FAFC] dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
                <div className="text-xl font-bold font-mono tabular-nums text-emerald-700 dark:text-emerald-400">
                  100% Trazable
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  Respuestas vinculadas mediante citas numeradas al artículo normativo, acta o informe original.
                </div>
              </div>

              <div className="bg-[#F8FAFC] dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
                <div className="text-xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-50">
                  Protocolo RGPD
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  Pautas de anonimización integradas en cada lista de fuentes antes de subir archivos.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Module 1: Fundamentos y Funcionamiento de NotebookLM */}
        <Module1Foundations
          onJumpToUseCases={() => scrollToSection('funciones-orientador')}
        />

        {/* Module 2: Guía Paso a Paso (Creación y Personalización) */}
        <Module2StepByStep />

        {/* Module 3: Aplicación en Funciones Específicas del Orientador */}
        <Module3UseCases onLoadInSimulator={handleLoadInSimulator} />

        {/* Module 5 (Section 04): Tareas Administrativas Generales */}
        <Module5AdministrativeTasks onLoadInSimulator={handleLoadInSimulator} />

        {/* Module 4 (Section 05): Simulador Interactivo de Prompts para Orientadores */}
        <Module4PromptSimulator preselectedCategory={simulatorCategory} />
      </main>

      {/* Quiet, Functional Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 transition-colors">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#0284C7] dark:text-sky-400" />
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              NotebookLM para la Orientación Educativa y Profesional
            </span>
            <span aria-hidden="true">·</span>
            <span>Centro de Recursos Prácticos</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#fundamentos"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('fundamentos');
              }}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Fundamentos
            </a>
            <a
              href="#guia-paso-a-paso"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('guia-paso-a-paso');
              }}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Guía Paso a Paso
            </a>
            <a
              href="#funciones-orientador"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('funciones-orientador');
              }}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Casos por Función
            </a>
            <a
              href="#tareas-administrativas"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('tareas-administrativas');
              }}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Tareas Administrativas
            </a>
            <a
              href="#simulador-prompts"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('simulador-prompts');
              }}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Simulador de Prompts
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
