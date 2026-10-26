export interface GlossaryTerm {
  id: string;
  term: string;
  acronym?: string;
  category: 'evaluacion' | 'inclusion_dua' | 'normativa' | 'organizacion' | 'vocacional';
  categoryLabel: string;
  definition: string;
  notebooklmApplication: string;
  recommendedSources: string[];
  suggestedPromptSnippet: string;
}

export const GLOSSARY_CATEGORIES = [
  { id: 'all', label: 'Todos los términos' },
  { id: 'evaluacion', label: 'Evaluación y Diagnóstico' },
  { id: 'inclusion_dua', label: 'Inclusión y DUA' },
  { id: 'normativa', label: 'Normativa y Medidas' },
  { id: 'organizacion', label: 'Organización y Planes' },
  { id: 'vocacional', label: 'Orientación Vocacional' },
] as const;

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'acns',
    term: 'Adaptación Curricular No Significativa',
    acronym: 'ACNS',
    category: 'normativa',
    categoryLabel: 'Normativa y Medidas',
    definition:
      'Ajustes en los tiempos, metodologías, actividades y formatos de evaluación que no modifican los objetivos, saberes básicos ni criterios de evaluación preceptivos del curso.',
    notebooklmApplication:
      'NotebookLM puede cruzar el informe psicopedagógico y la programación de aula para proponer una tabla operativa de adaptaciones metodológicas y de examen sin alterar los criterios oficiales.',
    recommendedSources: ['Informe psicopedagógico anonimizado', 'Programación didáctica de la materia'],
    suggestedPromptSnippet:
      'Propón adaptaciones curriculares no significativas (ACNS) centradas en formato de prueba y apoyos visuales sin rebajar los criterios de evaluación.',
  },
  {
    id: 'acs',
    term: 'Adaptación Curricular Significativa',
    acronym: 'ACS',
    category: 'normativa',
    categoryLabel: 'Normativa y Medidas',
    definition:
      'Medida extraordinaria de atención a la diversidad dirigida a alumnado con NEE que supone la modificación sustancial de los objetivos, saberes básicos y criterios de evaluación respecto al nivel del curso.',
    notebooklmApplication:
      'Verifica plazos de tramitación administrativa y desfase curricular (mínimo 2 cursos) citando el decreto autonómico de atención a la diversidad correspondiente.',
    recommendedSources: ['Decreto autonómico de inclusión', 'Informe de evaluación psicopedagógica'],
    suggestedPromptSnippet:
      'Verifica en las fuentes normativas si el desfase acreditado justifica formalmente la propuesta de Adaptación Curricular Significativa (ACS).',
  },
  {
    id: 'dua',
    term: 'Diseño Universal para el Aprendizaje',
    acronym: 'DUA',
    category: 'inclusion_dua',
    categoryLabel: 'Inclusión y DUA',
    definition:
      'Marco educativo basado en la neurociencia que busca minimizar barreras y maximizar el aprendizaje ofreciendo múltiples formas de implicación (el porqué), representación (el qué) y acción y expresión (el cómo).',
    notebooklmApplication:
      'NotebookLM analiza una unidad o situación de aprendizaje tradicional e identifica barreras involuntarias, proponiendo opciones multinivel para cada uno de los 3 principios del DUA.',
    recommendedSources: ['Pautas DUA CAST v3.0', 'Programación didáctica / Situación de aprendizaje'],
    suggestedPromptSnippet:
      'Analiza la unidad didáctica y rediseña las 3 actividades centrales aplicando los 3 principios DUA para un aula heterogénea.',
  },
  {
    id: 'dea',
    term: 'Dificultades Específicas de Aprendizaje',
    acronym: 'DEA',
    category: 'evaluacion',
    categoryLabel: 'Evaluación y Diagnóstico',
    definition:
      'Alteraciones neurobiológicas que afectan a la adquisición y uso eficiente de habilidades instrumentales básicas como la lectura (dislexia), la escritura (disgrafía/disortografía) o el cálculo (discalculia), con CI dentro del promedio normativo.',
    notebooklmApplication:
      'Triangula puntuaciones de baterías psicométricas (WISC-V, PROLEC, PROESC) con las observaciones de aula del tutor para evidenciar discrepancias cognitivas.',
    recommendedSources: ['Batería psicométrica anonimizada', 'Registro de observación del tutor'],
    suggestedPromptSnippet:
      'Identifica los patrones convergentes de DEA entre los resultados psicométricos y las observaciones de lectoescritura en aula.',
  },
  {
    id: 'neae',
    term: 'Necesidad Específica de Apoyo Educativo',
    acronym: 'NEAE',
    category: 'normativa',
    categoryLabel: 'Normativa y Medidas',
    definition:
      'Término paraguas que engloba al alumnado que requiere una atención educativa diferente a la ordinaria: NEE, retraso madurativo, dificultades de desarrollo, DEA, desconocimiento del idioma, vulnerabilidad socioeducativa o altas capacidades.',
    notebooklmApplication:
      'Facilita la clasificación precisa de expedientes y la comprobación de requisitos en convocatorias anuales de Becas y Ayudas del Ministerio y Consejerías.',
    recommendedSources: ['Resolución BOE de Becas NEAE', 'Plan de Atención a la Diversidad del centro'],
    suggestedPromptSnippet:
      'Clasifica el perfil en la tipología NEAE correspondiente según la orden de atención a la diversidad y resume los requisitos para la solicitud de beca.',
  },
  {
    id: 'nee',
    term: 'Necesidades Educativas Especiales',
    acronym: 'NEE',
    category: 'normativa',
    categoryLabel: 'Normativa y Medidas',
    definition:
      'Subgrupo dentro de las NEAE referido a estudiantes que afrontan barreras que limitan su acceso, presencia o aprendizaje derivadas de discapacidad (sensorial, física, intelectual) o trastornos graves de conducta.',
    notebooklmApplication:
      'Compara dictámenes de escolarización con los recursos de apoyo asignados (PT, AL, fisioterapia, educador) en el centro para emitir informes actualizados.',
    recommendedSources: ['Dictamen de escolarización', 'Informe de inspección educativa'],
    suggestedPromptSnippet:
      'Verifica en el dictamen los recursos personales especializados prescritos y su grado de continuidad en el centro escolar.',
  },
  {
    id: 'funciones_ejecutivas',
    term: 'Funciones Ejecutivas',
    category: 'evaluacion',
    categoryLabel: 'Evaluación y Diagnóstico',
    definition:
      'Conjunto de procesos cognitivos superiores (memoria de trabajo, control inhibitorio, flexibilidad cognitiva, planificación y monitorización) necesarios para gestionar metas y regular la conducta hacia el aprendizaje.',
    notebooklmApplication:
      'Transforma las observaciones conductuales dispersas del equipo docente en pautas de andamiaje cognitivo aplicables en la dinámica de 50 minutos de clase.',
    recommendedSources: ['Escala BRIEF / ENFEN anonimizada', 'Acta de seguimiento de equipo docente'],
    suggestedPromptSnippet:
      'Diseña una rutina de inicio y cierre de clase que andamie la memoria de trabajo y la planificación de entregas del grupo.',
  },
  {
    id: 'pat',
    term: 'Plan de Acción Tutorial',
    acronym: 'PAT',
    category: 'organizacion',
    categoryLabel: 'Organización y Planes',
    definition:
      'Documento institucional marco donde se especifican los objetivos, contenidos, dinámicas grupales y líneas pedagógicas de la tutoría para cada nivel y etapa del centro educativo.',
    notebooklmApplication:
      'Convierte los objetivos teóricos del PAT en escaletas de sesiones de 50 minutos con dinámicas de rol, preguntas facilitadoras para el tutor y fichas de evaluación.',
    recommendedSources: ['Documento PAT del centro', 'Plan de convivencia'],
    suggestedPromptSnippet:
      'Basándote en el Bloque II del PAT, diseña un taller participativo de resolución de conflictos para 2º de ESO con cronograma minuto a minuto.',
  },
  {
    id: 'pga',
    term: 'Programación General Anual',
    acronym: 'PGA',
    category: 'organizacion',
    categoryLabel: 'Organización y Planes',
    definition:
      'Documento institucional de planificación general aprobado anualmente por el Consejo Escolar que concreta para cada curso escolar las metas, proyectos y actuaciones de todos los departamentos.',
    notebooklmApplication:
      'Permite contrastar los objetivos fijados en octubre con las actas trimestrales del departamento de orientación para redactar la Memoria Anual con porcentajes de logro reales.',
    recommendedSources: ['PGA aprobada del curso', 'Compendio de actas del Departamento de Orientación'],
    suggestedPromptSnippet:
      'Cruza los objetivos del departamento previstos en la PGA con las actas de reunión y genera la tabla de grado de consecución para la Memoria Final.',
  },
  {
    id: 'ccp',
    term: 'Comisión de Coordinación Pedagógica',
    acronym: 'CCP / ETCP',
    category: 'organizacion',
    categoryLabel: 'Organización y Planes',
    definition:
      'Órgano colegiado del centro escolar (integrado por el equipo directivo, jefaturas de departamento/coordinadores de ciclo y orientación) encargado de coordinar los asuntos curriculares y de orientación.',
    notebooklmApplication:
      'Sintetiza las notas rápidas tomadas durante la sesión y genera el acta formal con acuerdos adoptados, responsables y plazos de ejecución.',
    recommendedSources: ['Orden del día de la CCP', 'Notas en bruto de la sesión'],
    suggestedPromptSnippet:
      'Convierte las notas de la reunión en un acta institucional formal estructurada por puntos del orden del día y tabla de acuerdos.',
  },
  {
    id: 'itinerarios_fp_uni',
    term: 'Pasarelas Formativas (FP - Universidad)',
    category: 'vocacional',
    categoryLabel: 'Orientación Vocacional',
    definition:
      'Vías normativas que permiten la transición fluida y el reconocimiento de créditos (ECTS) entre Ciclos Formativos de Grado Superior (CFGS) y Grados Universitarios afines sin perder convocatorias.',
    notebooklmApplication:
      'Cruza los catálogos de FP de la comunidad autónoma con las tablas de ponderaciones de la PAU para armar matrices comparativas de itinerarios (Plan A y Plan B).',
    recommendedSources: ['Catálogo oficial de Ciclos Formativos', 'Tablas de ponderación PAU universitarias'],
    suggestedPromptSnippet:
      'Genera una matriz comparativa entre el CFGS afín y el Grado Universitario, explicando el cálculo de nota y convalidación de créditos ECTS.',
  },
  {
    id: 'consejo_orientador',
    term: 'Consejo Orientador',
    category: 'vocacional',
    categoryLabel: 'Orientación Vocacional',
    definition:
      'Informe oficial preceptivo que el equipo docente y el departamento de orientación entregan al alumnado al finalizar cursos clave de ESO (especialmente 2º y 4º) con una propuesta razonada sobre la opción académica o formativa más conveniente.',
    notebooklmApplication:
      'Combina el historial académico y las fortalezas del estudiante con la oferta educativa de la comarca para redactar un consejo motivador y realista.',
    recommendedSources: ['Ficha de intereses y evolución académica', 'Oferta formativa de Bachillerato y FP'],
    suggestedPromptSnippet:
      'Redacta un borrador de Consejo Orientador motivador y fundamentado que plantee dos opciones formativas viables y con salidas laborales.',
  },
];
