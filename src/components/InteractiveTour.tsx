import React from 'react';
import {
  Joyride,
  Step,
  TooltipRenderProps,
  EVENTS,
  STATUS,
  EventData,
} from 'react-joyride';
import {
  ChevronRight,
  ChevronLeft,
  X,
  Compass,
  Check,
  Sparkles,
} from 'lucide-react';
import { setTourCompleted } from '../utils/tourStorage';

interface InteractiveTourProps {
  run: boolean;
  onTourEnd: () => void;
  isDarkMode: boolean;
}

export const TOUR_STEPS: Step[] = [
  {
    target: '#tour-bienvenida',
    title: '¡Te damos la bienvenida al Centro de Orientación con NotebookLM!',
    content:
      'Esta plataforma está concebida exclusivamente para orientadores y orientadoras educativas. Aprende a convertir informes psicopedagógicos, normativa de inclusión, PAT y orientación académica en respuestas precisas con citas exactas y cero alucinaciones.',
    placement: 'bottom',
    skipBeacon: true,
  },
  {
    target: '#tour-comfort-toolbar',
    title: 'Confort Visual y Descarga de Guía PDF Oficial',
    content:
      'Alterna con un solo clic entre el Modo Claro y el Tema Oscuro de baja fatiga visual para jornadas intensas de lectura de informes, o pulsa "Descargar Guía de Uso (PDF)" para obtener un manual completo para tu departamento.',
    placement: 'bottom',
    skipBeacon: true,
  },
  {
    target: '#fundamentos',
    title: 'Módulo 1: Fundamentos y Privacidad de Fuentes',
    content:
      'Comprende el anclaje estricto en fuentes (source grounding) de NotebookLM, la verificación de citas exactas y las pautas éticas para la anonimización de informes según el RGPD.',
    placement: 'top',
    skipBeacon: true,
  },
  {
    target: '#guia-paso-a-paso',
    title: 'Módulo 2: Metodología Práctica y Creación de Cuadernos',
    content:
      'Sigue la guía paso a paso para crear cuadernos temáticos por alumno, nivel o centro, subir documentos variados (PDFs, grabaciones, enlaces, actas) y configurar notas guía fijas.',
    placement: 'top',
    skipBeacon: true,
  },
  {
    target: '#funciones-orientador',
    title: 'Módulo 3: Casos Reales en los 4 Ámbitos Centrales',
    content:
      'Casos aplicados listos para usar: Evaluación Psicopedagógica (DEA, ACI), Metodologías Inclusivas y DUA, Acción Tutorial y Orientación Académica/Profesional. Cada caso incluye fuentes a subir, prompt recomendado y resultado esperado.',
    placement: 'top',
    skipBeacon: true,
  },
  {
    target: '#tareas-administrativas',
    title: 'Módulo 5: Gestión Administrativa y de Departamento',
    content:
      'Optimiza tareas recurrentes del departamento: redacción de actas de Comisión de Coordinación Pedagógica (CCP), memorias anuales, coordinación con agentes externos y protocolos oficiales con listas de verificación interactivas.',
    placement: 'top',
    skipBeacon: true,
  },
  {
    target: '#glosario-terminos',
    title: 'Glosario Psicopedagógico con Búsqueda Rápida',
    content:
      'Accede a definiciones especializadas (DUA, ACNEAE, NEE, Adaptaciones Curriculares) con buscador en vivo y botones para enviar fragmentos de prompt directamente al simulador.',
    placement: 'top',
    skipBeacon: true,
  },
  {
    target: '#simulador-prompts',
    title: 'Módulo 4: Simulador de Prompts Maestros e Historial',
    content:
      'Configura tu tarea orientadora, etapa educativa y enfoque personalizado para obtener tu Prompt Maestro listo para NotebookLM. Además, el Historial Reciente almacena localmente tus últimos 3 prompts para recuperarlos cuando desees.',
    placement: 'top',
    skipBeacon: true,
  },
];

const CustomTourTooltip: React.FC<TooltipRenderProps> = ({
  index,
  step,
  backProps,
  closeProps,
  primaryProps,
  skipProps,
  tooltipProps,
  size,
  isLastStep,
}) => {
  return (
    <div
      {...tooltipProps}
      className="max-w-[430px] w-[92vw] sm:w-[430px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl p-5 text-slate-800 dark:text-slate-100 transition-colors z-[1000] text-left font-sans"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3 border-b border-slate-100 dark:border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-sky-100 dark:bg-sky-950 text-[#0284C7] dark:text-sky-400 text-xs font-bold font-mono">
            0{index + 1}
          </span>
          <span className="text-[11px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Paso {index + 1} de {size} · Tour Guiado
          </span>
        </div>
        <button
          {...closeProps}
          type="button"
          aria-label="Cerrar tour interactivo"
          className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1 rounded-md transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Title */}
      {step.title && (
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
          {step.title}
        </h3>
      )}

      {/* Body Content */}
      <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
        {step.content}
      </div>

      {/* Footer Navigation Controls */}
      <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
        <div>
          {!isLastStep && (
            <button
              {...skipProps}
              type="button"
              className="text-xs text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors cursor-pointer px-1 py-1"
            >
              Saltar tour
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {index > 0 && (
            <button
              {...backProps}
              type="button"
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Atrás</span>
            </button>
          )}

          <button
            {...primaryProps}
            type="button"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0284C7] hover:bg-[#0369A1] rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            {isLastStep ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span>Finalizar tour</span>
              </>
            ) : (
              <>
                <span>Siguiente</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export const InteractiveTour: React.FC<InteractiveTourProps> = ({
  run,
  onTourEnd,
  isDarkMode,
}) => {
  const handleJoyrideCallback = (data: EventData) => {
    const { status, type } = data;

    if (
      status === STATUS.FINISHED ||
      status === STATUS.SKIPPED ||
      type === EVENTS.TOUR_END
    ) {
      setTourCompleted();
      onTourEnd();
    }
  };

  return (
    <Joyride
      run={run}
      steps={TOUR_STEPS}
      continuous={true}
      scrollToFirstStep={true}
      tooltipComponent={CustomTourTooltip}
      onEvent={handleJoyrideCallback}
      options={{
        arrowColor: isDarkMode ? '#0f172a' : '#ffffff',
        overlayColor: isDarkMode
          ? 'rgba(2, 6, 23, 0.78)'
          : 'rgba(15, 23, 42, 0.55)',
        spotlightRadius: 10,
        zIndex: 1000,
        scrollDuration: 400,
      }}
    />
  );
};
