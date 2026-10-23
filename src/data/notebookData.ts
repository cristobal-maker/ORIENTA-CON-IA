export type OrientationCategory =
  | 'evaluacion'
  | 'asesoramiento'
  | 'tutoria'
  | 'academica'
  | 'administrativa';

export interface AdminWorkflowItem {
  id: string;
  title: string;
  periodicity: string;
  timeSaved: string;
  description: string;
  notebookStructure: string;
  sourcesToUpload: {
    name: string;
    format: string;
    detail: string;
  }[];
  masterPrompt: string;
  expectedDeliverable: {
    title: string;
    highlights: string[];
  };
  checklistItems: string[];
}

export interface CitationFragment {
  id: string;
  sourceName: string;
  pageOrTimestamp: string;
  quote: string;
  relevanceNote: string;
}

export interface GroundingSimulation {
  id: string;
  title: string;
  context: string;
  userQuery: string;
  sourcesLoaded: {
    name: string;
    type: 'PDF' | 'Documento' | 'Audio' | 'Web' | 'YouTube';
    pages: string;
  }[];
  synthesizedResponse: {
    paragraph: string;
    citationIds: string[];
  }[];
  citations: Record<string, CitationFragment>;
  audioOverviewSample: {
    duration: string;
    hostA: string;
    hostB: string;
    keyTakeaway: string;
  };
}

export interface StepGuideItem {
  stepNumber: string;
  title: string;
  subtitle: string;
  duration: string;
  description: string;
  goodPractices: string[];
  avoidPractices: string[];
  interactiveDemo: {
    notebookTitle: string;
    folderStructure: {
      folderName: string;
      files: string[];
    }[];
    pinnedNoteExample: string;
    customInstructionExample: string;
  };
}

export interface UseCaseItem {
  id: string;
  category: OrientationCategory;
  categoryLabel: string;
  title: string;
  educationalStage: string;
  timeSavedMetric: string;
  summary: string;
  suggestedSources: {
    title: string;
    format: string;
    description: string;
  }[];
  recommendedPrompt: string;
  expectedOutput: {
    formatType: string;
    previewTitle: string;
    sections: {
      heading: string;
      content: string;
    }[];
    citationsIncluded: string[];
  };
  tags: string[];
}

export interface SimulatorRoleTask {
  id: string;
  category: OrientationCategory;
  title: string;
  subtitle: string;
  defaultFocus: string;
  requiredSources: {
    documentName: string;
    format: string;
    anonymizationTip: string;
    essential: boolean;
  }[];
  promptTemplate: (params: {
    stage: string;
    outputFormat: string;
    tone: string;
    specificFocus: string;
  }) => string;
  expectedStructure: string[];
  proTip: string;
}

export const CATEGORY_META: Record<
  OrientationCategory,
  {
    label: string;
    shortLabel: string;
    description: string;
    accentColor: string;
  }
> = {
  evaluacion: {
    label: 'Evaluación Psicopedagógica',
    shortLabel: 'Evaluación Psicopedagógica',
    description:
      'Síntesis de informes clínicos, pruebas psicométricas, registros de observación y detección de patrones de Dificultades Específicas de Aprendizaje (DEA).',
    accentColor: '#0284C7',
  },
  asesoramiento: {
    label: 'Asesoramiento en Enseñanza y Aprendizaje',
    shortLabel: 'Enseñanza y DUA',
    description:
      'Apoyo al claustro docente en el diseño de Metodologías Inclusivas, Diseño Universal para el Aprendizaje (DUA) y adaptaciones curriculares.',
    accentColor: '#059669',
  },
  tutoria: {
    label: 'Acción Tutorial y Convivencia',
    shortLabel: 'Acción Tutorial',
    description:
      'Planificación de sesiones del PAT, dinámicas de cohesión grupal, mediación escolar, prevención del acoso y preparación de entrevistas familiares.',
    accentColor: '#D97706',
  },
  academica: {
    label: 'Orientación Académica y Profesional',
    shortLabel: 'Orientación Académica',
    description:
      'Construcción de itinerarios formativos personalizados, comparativas entre FP y Universidad, notas de corte y transición al mundo laboral.',
    accentColor: '#4F46E5',
  },
  administrativa: {
    label: 'Gestión y Tareas Administrativas Generales',
    shortLabel: 'Tareas Administrativas',
    description:
      'Automatización documental de Memorias Anuales, Programación General Anual (PGA), actas de CCP y departamento, informes para Inspección y tramitación de becas NEAE.',
    accentColor: '#0F172A',
  },
};

export const GROUNDING_SIMULATIONS: GroundingSimulation[] = [
  {
    id: 'sim-dea',
    title: 'Triangulación de Informes en Evaluación Psicopedagógica',
    context: 'Alumno de 4º de Primaria con sospecha de Dislexia y TDAH inatento (Datos anonimizados)',
    userQuery:
      '¿Qué patrones comunes aparecen entre el informe logopédico externo, las escalas WISC-V y la observación de la tutora en lectoescritura?',
    sourcesLoaded: [
      { name: '01_Informe_Clinico_Logopedia_Anon.pdf', type: 'PDF', pages: '6 págs.' },
      { name: '02_Resultados_Bateria_WISC_V_PROLEC.pdf', type: 'PDF', pages: '4 págs.' },
      { name: '03_Registro_Observacion_Aula_Tutora.docx', type: 'Documento', pages: '3 págs.' },
    ],
    synthesizedResponse: [
      {
        paragraph:
          'Existe una convergencia directa en el déficit de velocidad de procesamiento léxico y memoria de trabajo verbal. Mientras la capacidad intelectual general se sitúa en el promedio normativo, la ruta fonológica presenta errores sistemáticos de inversión y omisión en pseudopalabras.',
        citationIds: ['cit-1', 'cit-2'],
      },
      {
        paragraph:
          'En el contexto de aula, esta dificultad se manifiesta como fatiga cognitiva aguda tras los primeros 20 minutos de lectura silenciosa o copiado de pizarra, provocando desconexión atencional secundaria que no ocurre en tareas manipulativas u orales.',
        citationIds: ['cit-3'],
      },
      {
        paragraph:
          'Se recomienda priorizar adaptaciones de acceso: fragmentación de enunciados extensos, evaluación oral complementaria, uso de tipografía sin serifa con interlineado 1.5 y eliminación de lectura en voz alta no preparada.',
        citationIds: ['cit-1', 'cit-3'],
      },
    ],
    citations: {
      'cit-1': {
        id: 'cit-1',
        sourceName: '01_Informe_Clinico_Logopedia_Anon.pdf',
        pageOrTimestamp: 'Página 4, apartado 3.2',
        quote:
          '«En la lectura de pseudopalabras se observa una latencia superior a 2 desviaciones típicas respecto a su grupo normativo, con lexicalizaciones frecuentes cuando intenta compensar por vía visual.»',
        relevanceNote: 'Evidencia clínica del déficit fonológico que justifica tiempo adicional en pruebas escritas.',
      },
      'cit-2': {
        id: 'cit-2',
        sourceName: '02_Resultados_Bateria_WISC_V_PROLEC.pdf',
        pageOrTimestamp: 'Página 2, Tabla de Índices Primarios',
        quote:
          '«Índice de Comprensión Verbal (ICV): 108 · Índice de Memoria de Trabajo (IMT): 81 · Índice de Velocidad de Procesamiento (IVP): 84. Discrepancia estadísticamente significativa entre razonamiento verbal y retención operativa.»',
        relevanceNote: 'Demuestra que la baja ejecución escrita no responde a falta de comprensión conceptual.',
      },
      'cit-3': {
        id: 'cit-3',
        sourceName: '03_Registro_Observacion_Aula_Tutora.docx',
        pageOrTimestamp: 'Página 1, Observación sistemática (15-28 Octubre)',
        quote:
          '«Participa activamente y con vocabulario rico en debates orales de Ciencias, pero abandona la tarea cuando debe copiar más de tres líneas del proyector o leer enunciados de más de dos oraciones.»',
        relevanceNote: 'Conecta el perfil psicométrico con la conducta observable real en el aula.',
      },
    },
    audioOverviewSample: {
      duration: '04:18 min',
      hostA:
        '«Si cruzamos los tres documentos del cuaderno, lo más revelador para el equipo docente es que el alumno comprende perfectamente los conceptos cuando los escucha, pero su memoria de trabajo se satura al decodificar el texto escrito.»',
      hostB:
        '«Exacto. Por eso la tutora nota que en debates de Ciencias brilla, pero al copiar de la pizarra desconecta a los veinte minutos. El resumen de audio ayuda a que todo el claustro entienda el porqué antes de la junta de evaluación.»',
      keyTakeaway:
        'Ideal para compartir un resumen sonoro de 4 minutos con el equipo docente sobre las medidas de acceso al currículo sin que tengan que leer 13 páginas técnicas.',
    },
  },
  {
    id: 'sim-normativa',
    title: 'Consulta de Normativa Autonómica de Atención a la Diversidad',
    context: 'Revisión de Decreto de Inclusión y Orden de Evaluación para cambio de medidas educativas',
    userQuery:
      '¿Qué requisitos normativos y plazos exige la orden vigente para autorizar una Adaptación Curricular Significativa (ACS) en Educación Secundaria?',
    sourcesLoaded: [
      { name: 'Decreto_Inclusiva_Atencion_Diversidad.pdf', type: 'PDF', pages: '48 págs.' },
      { name: 'Orden_Evaluacion_Promocion_ESO.pdf', type: 'PDF', pages: '32 págs.' },
      { name: 'Instrucciones_Inspeccion_Educativa_2025.pdf', type: 'PDF', pages: '14 págs.' },
    ],
    synthesizedResponse: [
      {
        paragraph:
          'Para tramitar una Adaptación Curricular Significativa (ACS) en ESO es preceptivo que el alumno presente Necesidades Educativas Especiales (NEE) acreditadas mediante Informe Psicopedagógico actualizado y un desfase curricular de al menos dos cursos respecto al nivel en que está escolarizado.',
        citationIds: ['cit-4'],
      },
      {
        paragraph:
          'El procedimiento administrativo debe completarse antes de finalizar el primer trimestre del curso escolar, requiriendo audiencia previa firmada por la familia o representantes legales, dictamen del Departamento de Orientación y visado del Servicio de Inspección Educativa.',
        citationIds: ['cit-5', 'cit-6'],
      },
    ],
    citations: {
      'cit-4': {
        id: 'cit-4',
        sourceName: 'Decreto_Inclusiva_Atencion_Diversidad.pdf',
        pageOrTimestamp: 'Artículo 24.3, Página 19',
        quote:
          '«Las adaptaciones curriculares significativas irán dirigidas exclusivamente al alumnado con necesidades educativas especiales que presente un desfase curricular igual o superior a dos cursos académicos.»',
        relevanceNote: 'Evita errores administrativos al diferenciar alumnado NEE de alumnado con DEA o NEAE.',
      },
      'cit-5': {
        id: 'cit-5',
        sourceName: 'Orden_Evaluacion_Promocion_ESO.pdf',
        pageOrTimestamp: 'Artículo 11.2, Página 8',
        quote:
          '«La evaluación de las materias con adaptación significativa tomará como referente los criterios de evaluación fijados en la propia adaptación, consignándose en los documentos oficiales de evaluación con asterisco (*).»',
        relevanceNote: 'Aclara el impacto en actas de evaluación y criterios de titulación en 4º de ESO.',
      },
      'cit-6': {
        id: 'cit-6',
        sourceName: 'Instrucciones_Inspeccion_Educativa_2025.pdf',
        pageOrTimestamp: 'Instrucción Sexta, Página 7',
        quote:
          '«El plazo ordinario de registro en el sistema de gestión autonómico finalizará el último día lectivo del mes de noviembre, adjuntando documento de conformidad o enterado de los tutores legales.»',
        relevanceNote: 'Proporciona seguridad jurídica inmediata sobre fechas límite ante la Inspección.',
      },
    },
    audioOverviewSample: {
      duration: '03:45 min',
      hostA:
        '«Hemos sintetizado las 94 páginas del marco normativo en una guía rápida para jefatura de estudios y orientación: la clave está en acreditar el desfase de dos cursos y cerrar el expediente antes de final de noviembre.»',
      hostB:
        '«Además, el documento de Inspección recalca que sin el trámite de audiencia familiar firmado no se puede activar la casilla de evaluación adaptada en el aplicativo oficial.»',
      keyTakeaway:
        'Permite convertir boletines oficiales densos en cápsulas formativas de 3 minutos para nuevos tutores del centro.',
    },
  },
];

export const STEP_BY_STEP_GUIDE: StepGuideItem[] = [
  {
    stepNumber: '01',
    title: 'Creación de Cuadernos Temáticos (Notebooks)',
    subtitle: 'Un espacio de trabajo estanco por ámbito de intervención orientadora',
    duration: '3 min de configuración inicial',
    description:
      'En lugar de mezclar todos los documentos del curso en un único chat, diseña cuadernos temáticos independientes en NotebookLM. Cada cuaderno actúa como un entorno cerrado donde la inteligencia artificial solo razona sobre la documentación específica que has depositado en él.',
    goodPractices: [
      'Crear un cuaderno permanente para "Marco Normativo y Protocolos Autonómicos" (convivencia, absentismo, atención a la diversidad).',
      'Crear un cuaderno por cada proyecto transversal: "Plan de Acción Tutorial (PAT) ESO", "Orientación Vocacional 4º ESO y Bachillerato" o "Banco de Pautas DUA".',
      'Anonimizar siempre nombres, apellidos, DNI y datos médicos sensibles usando códigos alfanuméricos (ej. ALUMNO_2ESO_B04) antes de subir cualquier archivo.',
    ],
    avoidPractices: [
      'Subir expedientes con nombres reales, teléfonos familiares o datos clínicos identificables sin anonimización previa.',
      'Mezclar normativas de distintas etapas educativas (ej. Infantil y Bachillerato) sin etiquetar claramente el título del documento fuente.',
    ],
    interactiveDemo: {
      notebookTitle: 'Cuaderno: Departamento de Orientación · Protocolos y DUA 2025-2026',
      folderStructure: [
        {
          folderName: 'Bloque A · Normativa y Documentos Institucionales',
          files: [
            '01_PEC_Proyecto_Educativo_Centro.pdf',
            '02_PAT_Plan_Accion_Tutorial_Anual.pdf',
            '03_Plan_Atencion_Diversidad_PAD.pdf',
          ],
        },
        {
          folderName: 'Bloque B · Guías Metodológicas e Inclusión',
          files: [
            '04_Pautas_DUA_CAST_Ver_3.0_Espanol.pdf',
            '05_Guia_Intervencion_TDAH_Dislexia_Aula.pdf',
          ],
        },
      ],
      pinnedNoteExample:
        'NOTA FIJA DE CONTEXTO: Centro público de Educación Secundaria (650 alumnos). Líneas prioritarias del curso: lectura comprensiva interdisciplinar, bienestar emocional en 1º-2º ESO y transición postobligatoria.',
      customInstructionExample:
        'Responde siempre con enfoque psicopedagógico constructivo, citando el artículo o página exacta de las fuentes subidas y proponiendo medidas aplicables en aulas ordinarias con ratios de 28 alumnos.',
    },
  },
  {
    stepNumber: '02',
    title: 'Gestión de Colecciones de Fuentes y Selección Activa',
    subtitle: 'Control granular de hasta 50 fuentes simultáneas por cuaderno',
    duration: '1 min por consulta focalizada',
    description:
      'NotebookLM permite cargar PDFs, documentos de Google Docs, presentaciones de Slides, enlaces web institucionales, vídeos formativos de YouTube y archivos de audio. La función más potente para el orientador es activar o desactivar casillas de verificación (checkboxes) en el panel izquierdo para cruzar únicamente los documentos que interesan en cada consulta.',
    goodPractices: [
      'Usar nomenclatura estandarizada al nombrar los archivos: [Etapa]_[Tipo]_[Tema] (ej. "2ESO_Programacion_Matematicas.pdf").',
      'Marcar solo 2 o 3 fuentes específicas cuando quieras comparar una programación didáctica concreta frente a las pautas DUA.',
      'Marcar todas las fuentes del cuaderno cuando busques una visión transversal o un patrón global de centro.',
    ],
    avoidPractices: [
      'Subir PDFs escaneados como imagen sin capa de texto reconocible (OCR), ya que dificultan la extracción precisa de citas.',
      'Dejar marcadas 40 fuentes irrelevantes cuando solo necesitas redactar el acta de una reunión específica.',
    ],
    interactiveDemo: {
      notebookTitle: 'Cuaderno: Evaluación y Seguimiento Psicopedagógico (Caso Anonimizado EXP_09)',
      folderStructure: [
        {
          folderName: 'Fuentes Marcadas Activas [✓] para Triangulación',
          files: [
            '[✓] EXP09_Informe_Previo_Primaria_Anon.pdf',
            '[✓] EXP09_Cuestionario_Conners_Profesorado.pdf',
            '[✓] EXP09_Observacion_Aula_Octubre.docx',
          ],
        },
        {
          folderName: 'Fuentes Desactivadas [ ] en esta consulta',
          files: [
            '[ ] Guia_General_Adaptaciones_Acceso_Consejeria.pdf',
            '[ ] Banco_Rubricas_Funciones_Ejecutivas.pdf',
          ],
        },
      ],
      pinnedNoteExample:
        'PERFIL SINTÉTICO EXP_09: Alumno de 1º ESO. Fortalezas en razonamiento espacial, expresión oral y trabajo cooperativo. Barreras detectadas en planificación temporal de exámenes y memoria operativa.',
      customInstructionExample:
        'Sintetiza únicamente las evidencias convergentes entre los tres documentos marcados [✓], diferenciando entre indicadores cognitivos, conductuales y emocionales.',
    },
  },
  {
    stepNumber: '03',
    title: 'Personalización: Notas Fijas, Guía del Cuaderno y Audio Overviews',
    subtitle: 'Transformación del análisis en materiales listos para claustro, tutoría y familias',
    duration: '2 min para generar entregables',
    description:
      'Toda respuesta valiosa generada en el chat puede guardarse como una Nota Fija (Pinned Note) en el tablón del cuaderno. Posteriormente, puedes seleccionar varias notas fijas y pedir a NotebookLM que construya un informe estructurado, una guía de estudio, un documento de preguntas frecuentes para familias o un Resumen de Audio (Podcast a dos voces en español).',
    goodPractices: [
      'Fijar una nota inicial con el "Perfil del Grupo-Clase" (fortalezas, barreras, medidas previas) y mantenerla como referencia permanente.',
      'Convertir tus propias notas fijas en fuente adicional ("Convertir todas las notas en fuente") para consolidar el seguimiento trimestral.',
      'Generar un Audio Overview con instrucciones personalizadas ("Céntrate en pautas prácticas para los profesores de guardia y especialistas") para facilitar la escucha.',
    ],
    avoidPractices: [
      'Copiar y pegar la primera respuesta sin verificar los números de cita [1], [2] para confirmar el matiz exacto del documento original.',
      'Usar tecnicismos clínicos complejos en documentos destinados a la devolución de información a las familias.',
    ],
    interactiveDemo: {
      notebookTitle: 'Cuaderno: Orientación Académica y Vocacional · 4º ESO y 2º Bachillerato',
      folderStructure: [
        {
          folderName: 'Fuentes Oficiales Cargadas',
          files: [
            'Oferta_Ciclos_FP_Grado_Medio_Superior_2026.pdf',
            'Ponderaciones_PAU_Universidades_Publicas_2026.pdf',
            'Informe_Insercion_Laboral_Titulados_FP_SEPE.pdf',
          ],
        },
        {
          folderName: 'Notas Fijas en el Panel de Estudio (Studio)',
          files: [
            'Nota Fija 1: Tabla de pasarelas desde Grado Medio a Grado Superior y Universidad',
            'Nota Fija 2: Preguntas frecuentes para la reunión de familias de 4º ESO',
            'Audio Overview (05:12): "Mitos y realidades sobre la FP Dual frente al Bachillerato"',
          ],
        },
      ],
      pinnedNoteExample:
        'ACUERDO DE DEPARTAMENTO: Priorizar la presentación de itinerarios reversibles (pasarelas FP ↔ Universidad) para reducir la ansiedad vocacional en las familias de 4º de ESO.',
      customInstructionExample:
        'Adopta un tono cercano, motivador y riguroso. Evita jerga burocrática y organiza siempre las opciones formativas en tablas comparativas claras con requisitos de acceso y salidas.',
    },
  },
];

export const USE_CASES_DATA: UseCaseItem[] = [
  // 1. EVALUACIÓN PSICOPEDAGÓGICA
  {
    id: 'uc-eval-1',
    category: 'evaluacion',
    categoryLabel: 'Evaluación Psicopedagógica',
    title: 'Síntesis de Informes para Detección de Patrones de DEA y Adaptaciones No Significativas',
    educationalStage: 'Educación Primaria y ESO',
    timeSavedMetric: 'Ahorra ~2,5 h por expediente',
    summary:
      'Analiza simultáneamente informes previos, resultados de pruebas psicométricas y registros de observación del profesorado para extraer patrones comunes de Dificultades Específicas de Aprendizaje (dislexia, discalculia, TDAH) y proponer adaptaciones curriculares no significativas.',
    suggestedSources: [
      {
        title: 'Informe de evaluación psicopedagógica anterior (Anonimizado)',
        format: 'PDF / Google Doc',
        description: 'Historial evolutivo y escolar sin datos identificativos personales.',
      },
      {
        title: 'Resumen de puntuaciones psicométricas (WISC-V, PROLEC-R / PROESC, ENFEN)',
        format: 'PDF / Tabla',
        description: 'Puntuaciones compuestas, percentiles y observaciones cualitativas durante la prueba.',
      },
      {
        title: 'Cuestionario de observación de aula cumplimentado por el equipo docente',
        format: 'Documento de texto',
        description: 'Indicadores de rendimiento en áreas instrumentales, atención, fatiga y socialización.',
      },
    ],
    recommendedPrompt: `Actúa como orientador educativo especialista en psicopedagogía. Analiza exclusivamente los 3 documentos de evaluación cargados en este cuaderno y elabora una síntesis técnica estructurada en cuatro bloques:

1. CONVERGENCIA DE EVIDENCIAS (PATRONES COMUNES):
Identifica qué indicadores coinciden entre las pruebas psicométricas y las observaciones de aula en relación con las Dificultades Específicas de Aprendizaje (DEA). Cita explícitamente la fuente en cada hallazgo.

2. PERFIL DE FORTALEZAS Y PUNTOS DE APOYO:
Extrae las capacidades preservadas o destacadas del alumno (comprensión oral, razonamiento no verbal, motivación en tareas concretas) sobre las que apoyar la intervención.

3. BARRERAS EN EL ACCESO AL CURRÍCULO:
Describe qué demandas habituales del aula (copiado, exámenes con límite estricto de tiempo, textos densos) están penalizando su rendimiento real.

4. PROPUESTA DE ADAPTACIONES CURRICULARES NO SIGNIFICATIVAS (ACNS):
Diseña una tabla práctica para el equipo docente dividida en:
- Adaptaciones metodológicas y de materiales en el aula.
- Adaptaciones en los procedimientos e instrumentos de evaluación (formato de examen, tiempos, apoyo oral).
- Pautas de organización y funciones ejecutivas.`,
    expectedOutput: {
      formatType: 'Informe de Síntesis Psicopedagógica + Tabla ACNS',
      previewTitle: 'Síntesis de Triangulación Psicopedagógica (Caso DEA · Lectoescritura)',
      sections: [
        {
          heading: '1. Patrones Comunes Detectados [Citas 1, 2, 3]',
          content:
            'Se confirma discrepancia entre el Índice de Comprensión Verbal (PC 75) y los procesos de decodificación grafema-fonema y velocidad lectora (PC 10 en PROLEC-R). En aula se traduce en comprensión óptima de explicaciones orales pero bloqueo ante enunciados escritos largos.',
        },
        {
          heading: '2. Fortalezas para Anclar el Aprendizaje [Cita 3]',
          content:
            'Alto nivel de vocabulario expresivo, excelente razonamiento lógico cuando el problema se verbaliza y liderazgo positivo en trabajo cooperativo de laboratorio.',
        },
        {
          heading: '3. Matriz de Adaptaciones No Significativas Recomendadas',
          content:
            '• Evaluación: Incremento del 35% de tiempo en pruebas escritas; lectura guiada de enunciados al inicio del examen; fuente Arial/Verdana 12pt con interlineado 1.5; priorizar preguntas de respuesta corta o mapas conceptuales frente a redacción extensa.\n• Aula: Entrega anticipada de esquemas; eximir de lectura en voz alta sin preparación previa; no penalizar faltas de ortografía arbitraria fuera de dictados específicos trabajados.',
        },
      ],
      citationsIncluded: [
        '[1] Informe_Previo_Anon.pdf (pág. 3)',
        '[2] Bateria_PROLEC_WISC.pdf (pág. 2)',
        '[3] Observacion_Equipo_Docente.docx (pág. 1)',
      ],
    },
    tags: ['DEA', 'Dislexia', 'Adaptaciones No Significativas', 'WISC-V', 'Triangulación'],
  },
  {
    id: 'uc-eval-2',
    category: 'evaluacion',
    categoryLabel: 'Evaluación Psicopedagógica',
    title: 'Traducción de Informe Clínico y Psicopedagógico a Lenguaje Claro para Entrevista Familiar',
    educationalStage: 'Infantil, Primaria y Secundaria',
    timeSavedMetric: 'Ahorra ~1,5 h de preparación',
    summary:
      'Transforma un informe técnico de evaluación psicopedagógica o neuropediátrico en un guion de devolución empático, comprensible y orientado a la colaboración con las familias, evitando jerga clínica intimidante.',
    suggestedSources: [
      {
        title: 'Borrador del Informe Psicopedagógico (Anonimizado)',
        format: 'PDF / Doc',
        description: 'Documento técnico elaborado por el Departamento de Orientación o EOEP.',
      },
      {
        title: 'Informe externo de Neuropediatría o Salud Mental (Anonimizado)',
        format: 'PDF',
        description: 'Valoración clínica aportada por la familia.',
      },
    ],
    recommendedPrompt: `Basándote únicamente en los informes técnicos subidos a este cuaderno, prepara un guion estructurado para la entrevista de devolución de información con la familia del alumno.

Sigue estas directrices de comunicación orientadora:
1. Comienza destacando 4 fortalezas reales y concretas del alumno documentadas en las fuentes.
2. Explica las necesidades detectadas traduciendo cada término técnico (ej. "funciones ejecutivas", "memoria de trabajo", "conciencia fonológica") a ejemplos cotidianos que la familia pueda observar en casa y en el colegio.
3. Resume con claridad qué medidas concretas va a aplicar el centro educativo a partir de esta semana.
4. Propón 4 pautas prácticas y realistas de acompañamiento en el hogar (rutinas, tiempos de estudio, refuerzo emocional) que no conviertan a los padres en profesores particulares.
5. Incluye 3 preguntas abiertas para recoger la visión y preocupaciones de la familia durante la entrevista.`,
    expectedOutput: {
      formatType: 'Guion de Entrevista Familiar y Hoja de Ruta Compartida',
      previewTitle: 'Guion de Devolución Familiar: Comprender para Acompañar',
      sections: [
        {
          heading: '1. Lo que vuestro hijo/a hace muy bien (Fortalezas)',
          content:
            'Destaca por su curiosidad científica, su capacidad para resolver problemas visuales y su empatía con los compañeros de grupo [1].',
        },
        {
          heading: '2. Traducción de conclusiones técnicas a la vida diaria',
          content:
            '• Memoria de trabajo verbal → Es como tener una "mesa de escritorio mental" pequeña: comprende perfectamente cada instrucción por separado, pero si le damos 4 órdenes seguidas mientras guarda el material, las últimas se caen de la mesa [2].',
        },
        {
          heading: '3. Acuerdos Centro-Familia',
          content:
            'En el centro fragmentaremos las tareas largas en pasos cortos con listas de verificación visuales. En casa, recomendamos bloques de 20 minutos con descansos activos y uso de temporizador visual.',
        },
      ],
      citationsIncluded: [
        '[1] Informe_Psicopedagogico_Borrador.pdf (pág. 2)',
        '[2] Valoracion_Neuropsicologica.pdf (pág. 5)',
      ],
    },
    tags: ['Entrevista Familiar', 'Devolución', 'Lenguaje Claro', 'Funciones Ejecutivas', 'Familias'],
  },

  // 2. ASESORAMIENTO EN PROCESOS DE ENSEÑANZA Y APRENDIZAJE
  {
    id: 'uc-ases-1',
    category: 'asesoramiento',
    categoryLabel: 'Asesoramiento en Enseñanza y Aprendizaje',
    title: 'Auditoría de Programación Didáctica y Generación de Pautas DUA para el Grupo-Clase',
    educationalStage: 'Primaria, ESO y Bachillerato',
    timeSavedMetric: 'Ahorra ~3 h de diseño curricular',
    summary:
      'Cruza la programación didáctica o situación de aprendizaje de un departamento con el perfil real de barreras del grupo-clase para ofrecer al docente ajustes DUA concretos en representación, acción/expresión e implicación.',
    suggestedSources: [
      {
        title: 'Programación Didáctica o Situación de Aprendizaje de la materia',
        format: 'PDF / Google Doc',
        description: 'Unidad didáctica, saberes básicos, actividades previstas y criterios de evaluación.',
      },
      {
        title: 'Perfil psicopedagógico del grupo-clase (Acta de Evaluación Inicial)',
        format: 'PDF / Doc',
        description: 'Descripción de la diversidad del aula (ej. 2 alumnos con dislexia, 1 TDAH, 3 incorporación tardía al sistema educativo).',
      },
      {
        title: 'Marco de Pautas DUA (Diseño Universal para el Aprendizaje - CAST)',
        format: 'PDF',
        description: 'Guía de referencia de los tres principios DUA.',
      },
    ],
    recommendedPrompt: `Actúa como asesor psicopedagógico colaborando con el profesorado de la materia cuya programación didáctica está cargada en las fuentes. Teniendo en cuenta el "Perfil del Grupo-Clase" subido:

1. IDENTIFICACIÓN DE BARRERAS CURRICULARES:
Analiza las actividades y pruebas de evaluación planteadas en la unidad didáctica y señala qué barreras involuntarias presentan para el alumnado descrito en el perfil del grupo (citas exactas de la programación).

2. REDISEÑO CON PAUTAS DUA (3 PRINCIPIOS):
Para cada actividad clave de la unidad, propón ajustes concretos y viables en un aula ordinaria siguiendo los tres principios del DUA:
- Múltiples formas de Implicación (el porqué del aprendizaje: autorregulación, relevancia, trabajo cooperativo).
- Múltiples formas de Representación (el qué del aprendizaje: vocabulario previo, apoyos visuales, organizadores gráficos).
- Múltiples formas de Acción y Expresión (el cómo del aprendizaje: opciones para demostrar lo aprendido más allá del examen tradicional escrito).

3. RÚBRICA MULTINIVEL VINCULADA A CRITERIOS:
Genera una propuesta de instrumento de evaluación multinivel que evalúe exactamente los mismos criterios de evaluación oficiales pero permitiendo dos vías de expresión (escrita guiada y exposición/proyecto visual).`,
    expectedOutput: {
      formatType: 'Dosier de Asesoramiento DUA + Rúbrica Multinivel',
      previewTitle: 'Propuesta de Enriquecimiento DUA · Unidad Didáctica de Biología y Geología (3º ESO)',
      sections: [
        {
          heading: '1. Barreras Detectadas en la Unidad Original [Cita 1]',
          content:
            'La actividad central exige resumir un artículo científico de 4 páginas sin glosario previo y la evaluación recae en un 80% en una prueba escrita de desarrollo de 50 minutos, penalizando al alumnado con DEA y barrera idiomática [1, 2].',
        },
        {
          heading: '2. Ajustes DUA de Aplicación Inmediata [Cita 3]',
          content:
            '• Representación: Incorporar organizador gráfico hexagonal de conceptos clave y glosario visual bilingüe previo a la lectura.\n• Acción y Expresión: Permitir que la evidencia del criterio 3.2 se entregue como infografía comentada en audio de 2 minutos o esquema estructurado con banco de conectores.\n• Implicación: Roles rotativos en equipos base de 4 alumnos (coordinador, sintetizador visual, portavoz, verificador).',
        },
      ],
      citationsIncluded: [
        '[1] Programacion_Biologia_3ESO.pdf (pág. 14)',
        '[2] Acta_Evaluacion_Inicial_3ESO_B.pdf (pág. 2)',
        '[3] Pautas_DUA_CAST_Espanol.pdf (pág. 8)',
      ],
    },
    tags: ['DUA', 'Metodologías Inclusivas', 'Programación Didáctica', 'Evaluación Multinivel', 'Claustro'],
  },
  {
    id: 'uc-ases-2',
    category: 'asesoramiento',
    categoryLabel: 'Asesoramiento en Enseñanza y Aprendizaje',
    title: 'Diseño de Programa de Refuerzo y Funciones Ejecutivas en el Aula Ordinaria',
    educationalStage: 'Educación Primaria y 1º-2º ESO',
    timeSavedMetric: 'Ahorra ~2 h por equipo docente',
    summary:
      'Elabora pautas de andamiaje cognitivo, gestión del tiempo y autorregulación integradas en las asignaturas troncales para grupos con alta dispersión atencional.',
    suggestedSources: [
      {
        title: 'Acta de junta de evaluación o informe de seguimiento del grupo',
        format: 'PDF / Doc',
        description: 'Observaciones del equipo docente sobre dificultades de organización, entrega de tareas y atención.',
      },
      {
        title: 'Guía de intervención en Funciones Ejecutivas en contexto escolar',
        format: 'PDF',
        description: 'Documento de referencia del departamento de orientación.',
      },
    ],
    recommendedPrompt: `A partir del acta de seguimiento del grupo y de la guía de funciones ejecutivas cargadas en el cuaderno, diseña un "Protocolo Unificado de Aula para el Entrenamiento de Funciones Ejecutivas" que todo el equipo docente pueda aplicar de forma coherente durante el trimestre.

Estructura la respuesta en:
1. Rutina de inicio de sesión (primeros 5 minutos): activación atencional y anticipación de la estructura de la clase.
2. Estrategias de inhibición y flexibilidad cognitiva durante las explicaciones y el trabajo autónomo.
3. Rutina de cierre (últimos 5 minutos): autoinstrucciones para el registro en agenda/plataforma y planificación de entregas.
4. Lista de comprobación (checklist) para el alumno antes de entregar un examen o tarea.`,
    expectedOutput: {
      formatType: 'Protocolo Docente de Coherencia Metodológica',
      previewTitle: 'Acuerdo Metodológico de Equipo Docente · Andamiaje de Funciones Ejecutivas',
      sections: [
        {
          heading: '1. Estructura Predecible de Sesión (5 min iniciales)',
          content:
            'Escribir siempre en el margen superior derecho de la pizarra la "Ruta de Hoy" en 3 pasos visibles: 1) Qué vamos a aprender, 2) Qué tarea haremos, 3) Cómo sabremos que está terminada [1].',
        },
        {
          heading: '2. Checklist de Autoverificación para el Alumnado [Cita 2]',
          content:
            'Tarjeta plastificada en el pupitre con 4 preguntas de parada cognitiva: ¿He leído las dos partes de la pregunta? ¿He subrayado el verbo de acción? ¿He respondido con datos del tema? ¿He revisado unidades/ortografía?',
        },
      ],
      citationsIncluded: [
        '[1] Acta_Seguimiento_1ESO_C.pdf (pág. 2)',
        '[2] Guia_Funciones_Ejecutivas_Escuela.pdf (pág. 19)',
      ],
    },
    tags: ['Funciones Ejecutivas', 'TDAH', 'Atención', 'Andamiaje', 'Equipo Docente'],
  },

  // 3. ACCIÓN TUTORIAL
  {
    id: 'uc-tut-1',
    category: 'tutoria',
    categoryLabel: 'Acción Tutorial y Convivencia',
    title: 'Diseño de Talleres Dinámicos de Resolución de Conflictos y Convivencia a partir del PAT',
    educationalStage: '2º de ESO (Adaptable a Primaria y Secundaria)',
    timeSavedMetric: 'Ahorra ~3,5 h de diseño de sesiones',
    summary:
      'Sube el Plan de Acción Tutorial (PAT) y el Plan de Convivencia del centro para generar una secuencia completa de talleres participativos de 50 minutos con dinámicas de rol, guion para el tutor y ficha de reflexión grupal.',
    suggestedSources: [
      {
        title: 'Plan de Acción Tutorial (PAT) del Centro',
        format: 'PDF',
        description: 'Objetivos generales y bloques temáticos programados por trimestre para 2º de ESO.',
      },
      {
        title: 'Plan de Convivencia / Diagnóstico sociométrico o de clima de aula',
        format: 'PDF / Doc',
        description: 'Necesidades detectadas (ej. rumores en redes sociales, exclusión en trabajos de grupo, impulsividad verbal).',
      },
    ],
    recommendedPrompt: `Actúa como orientador educativo coordinador del Plan de Acción Tutorial (PAT). Basándote en el PAT y en el diagnóstico de convivencia subidos a este cuaderno, diseña una secuencia de 2 talleres dinámicos de 50 minutos cada uno sobre "Resolución Constructiva de Conflictos y Prevención del Ciberacoso" para 2º de ESO.

Para cada sesión de tutoría incluye obligatoriamente:
1. Objetivo específico vinculado literalmente al PAT del centro (con cita de página).
2. Cronograma minuto a minuto (50 min totales):
   - Dinámica rompehielos / activación (10 min).
   - Caso práctico o Role-Playing basado en situaciones reales de adolescentes de 13-14 años (25 min).
   - Puesta en común guiada y compromisos concretos de aula (15 min).
3. Guion literal de preguntas que el tutor/a puede formular para conducir el debate sin moralizar ni sermonear.
4. Materiales necesarios de bajo coste y criterios de observación para evaluar el impacto de la sesión.`,
    expectedOutput: {
      formatType: 'Secuencia Didáctica de Tutoría Lista para el Aula',
      previewTitle: 'Taller PAT 2º ESO: Del Conflicto en el Grupo de WhatsApp al Acuerdo en el Aula',
      sections: [
        {
          heading: 'Sesión 1: El Efecto Espectador y los Rumores Digitales (50 min) [Cita 1]',
          content:
            '• 00-10 min (Activación): Dinámica "El termómetro de la broma" (línea imaginaria en el suelo donde el alumnado se posiciona ante 5 situaciones cotidianas).\n• 10-35 min (Role-Playing): Análisis en pequeños grupos del caso "La captura reenviada" desde tres perspectivas: quien envía, quien recibe y los 20 espectadores silenciosos del grupo [2].\n• 35-50 min (Cierre): Redacción del "Pacto de Espectadores Activos" de 2º ESO.',
        },
        {
          heading: 'Preguntas Clave para el Tutor/a (Guion Facilitador)',
          content:
            '1. "¿Qué diferencia hay entre reírse con alguien y reírse de alguien cuando hay una pantalla de por medio?"\n2. "¿Qué coste tiene para un compañero el silencio del resto del grupo cuando circula un montaje?"\n3. "¿Qué acción concreta de 10 segundos puede frenar una cadena sin exponerte en solitario?"',
        },
      ],
      citationsIncluded: [
        '[1] PAT_Secundaria_2025.pdf (Bloque Convivencia 2º ESO, pág. 22)',
        '[2] Plan_Convivencia_Diagnostico.pdf (Apartado 4.1, pág. 11)',
      ],
    },
    tags: ['PAT', 'Acción Tutorial', 'Resolución de Conflictos', 'Convivencia', '2º ESO', 'Ciberacoso'],
  },
  {
    id: 'uc-tut-2',
    category: 'tutoria',
    categoryLabel: 'Acción Tutorial y Convivencia',
    title: 'Preparación de Junta de Evaluación y Guion de Cohesión Grupal tras Sociograma',
    educationalStage: 'Educación Primaria y ESO',
    timeSavedMetric: 'Ahorra ~2 h por grupo',
    summary:
      'Sintetiza las conclusiones de un sociograma de aula y los informes de los profesores de materia para proponer agrupamientos estratégicos y dinámicas de integración de alumnado aislado.',
    suggestedSources: [
      {
        title: 'Informe de resultados del test sociométrico (Códigos de alumno anonimizados)',
        format: 'PDF / Tabla',
        description: 'Índices de aceptación, rechazo, líderes positivos y alumnado en situación de aislamiento.',
      },
      {
        title: 'Observaciones pre-evaluación de los docentes de la junta',
        format: 'Documento',
        description: 'Clima de trabajo en distintas materias y dinámicas de relación detectadas.',
      },
    ],
    recommendedPrompt: `Analiza los datos anonimizados del sociograma de aula y las observaciones del equipo docente cargadas en el cuaderno. Elabora un informe operativo para el tutor/a con:

1. Radiografía relacional del grupo: subgrupos cerrados, alumnado puente (líderes prosociales) y códigos de alumnos en riesgo de aislamiento o rechazo activo.
2. Propuesta de reestructuración de equipos cooperativos de 4 miembros: explica qué perfiles combinar para favorecer la inclusión de los alumnos aislados apoyándose en los compañeros prosociales.
3. Dos dinámicas breves de cohesión grupal (20 minutos) integrables en tutoría para romper etiquetas dentro del aula.`,
    expectedOutput: {
      formatType: 'Informe Sociométrico Operativo y Mapa de Agrupamientos',
      previewTitle: 'Estrategia de Cohesión y Agrupamientos de Aula · Tutoría',
      sections: [
        {
          heading: '1. Nodos Relacionales Clave [Cita 1]',
          content:
            'Los perfiles A-04 y A-12 actúan como figuras puente de alta empatía (elegidos recíprocamente por tres subgrupos distintos). Los perfiles A-09 y A-21 presentan índice de elección nulo (invisibilidad relacional), no rechazo activo.',
        },
        {
          heading: '2. Criterio de Diseño de Equipos Base [Cita 2]',
          content:
            'Vincular a A-09 con A-04 en tareas estructuradas por roles donde A-09 asuma la función técnica visual (su fortaleza académica documentada en Plástica y Tecnología).',
        },
      ],
      citationsIncluded: [
        '[1] Informe_Sociometrico_Anon.pdf (Tabla de reciprocidades, pág. 3)',
        '[2] Observaciones_PreEvaluacion_Docentes.docx (pág. 2)',
      ],
    },
    tags: ['Sociograma', 'Cohesión Grupal', 'Junta de Evaluación', 'Acoso Escolar', 'Agrupamientos'],
  },

  // 4. ORIENTACIÓN ACADÉMICA Y PROFESIONAL
  {
    id: 'uc-acad-1',
    category: 'academica',
    categoryLabel: 'Orientación Académica y Profesional',
    title: 'Matriz Comparativa entre Grados Universitarios y Ciclos Formativos de Grado Superior según Perfil',
    educationalStage: '4º de ESO, Bachillerato y FP',
    timeSavedMetric: 'Ahorra ~2,5 h por consejo orientador',
    summary:
      'Cruza la oferta oficial de Grados Universitarios, Ciclos Formativos de Grado Superior (CFGS), tablas de ponderaciones y el perfil vocacional del estudiante para construir una matriz comparativa rigurosa con pasarelas de conexión.',
    suggestedSources: [
      {
        title: 'Catálogo Oficial de Ciclos Formativos de Grado Superior y Familias Profesionales',
        format: 'PDF / Web Oficial',
        description: 'Requisitos de acceso, módulos profesionales, duración de FP Dual y salidas.',
      },
      {
        title: 'Guía de Grados Universitarios, Notas de Corte y Ponderaciones PAU',
        format: 'PDF',
        description: 'Planes de estudio universitarios y parámetros de admisión.',
      },
      {
        title: 'Cuestionario de intereses vocacionales y perfil académico del alumno (Anonimizado)',
        format: 'Documento',
        description: 'Preferencias profesionales, estilo de aprendizaje (práctico vs teórico), nota media actual y expectativas.',
      },
    ],
    recommendedPrompt: `Actúa como orientador académico y profesional. Basándote exclusivamente en los catálogos oficiales de FP y Universidad subidos y en el documento de "Perfil Vocacional del Alumno":

1. ANÁLISIS DE AJUSTE VOCACIONAL:
Resume en un párrafo cómo se alinean los intereses del alumno (interés biosanitario y tecnológico, preferencia por aprendizaje práctico a corto plazo y nota media actual de 7,6 en Bachillerato de Ciencias) con las opciones disponibles en las fuentes.

2. MATRIZ COMPARATIVA: GRADOS UNIVERSITARIOS vs. CICLOS DE GRADO SUPERIOR (CFGS):
Construye una tabla comparativa detallada enfrentando las 2 mejores opciones de Grado Universitario frente a las 2 mejores opciones de CFGS para este perfil. Incluye las columnas:
- Titulación exacta (según documento fuente).
- Vía de acceso y nota de corte orientativa / requisito.
- Enfoque metodológico (% carga práctica y horas de formación en empresa Dual).
- Principales salidas profesionales e inserción laboral documentada.

3. ITINERARIOS CONECTADOS Y PASARELAS (PLAN A Y PLAN B):
Diseña dos rutas formativas completas mostrando cómo el alumno puede cursar primero un CFGS de 2 años, acceder posteriormente al Grado Universitario con reconocimiento de créditos ECTS y presentarse únicamente a la fase específica para subir nota si lo necesita.`,
    expectedOutput: {
      formatType: 'Matriz Comparativa Vocacional + Mapa de Pasarelas FP-Universidad',
      previewTitle: 'Informe de Itinerarios Formativos Personalizados · Ámbito Biosanitario y Tecnológico',
      sections: [
        {
          heading: '1. Matriz Comparativa: Universidad vs. FP Grado Superior [Citas 1, 2]',
          content:
            '• Grado en Ingeniería Biomédica / Enfermería (4 años, 240 ECTS): Nota de corte 11,84 - 12,40. Alta carga teórica los 2 primeros cursos; prácticas clínicas concentradas en 3º y 4º [2].\n• CFGS en Laboratorio Clínico y Biomédico / Imagen para el Diagnóstico (2 años, 2.000 h): Acceso directo desde Bachillerato de Ciencias (corte 7,2). Enfoque práctico de laboratorio desde el primer trimestre y estancia en empresa bajo modalidad FP Dual [1].',
        },
        {
          heading: '2. Ruta Estratégica con Pasarela Directa [Citas 1, 3]',
          content:
            'Dado que la nota media actual del alumno (7,6) podría quedar ajustada para el acceso directo a Enfermería en primera convocatoria, el itinerario CFGS Laboratorio Clínico → Acceso a Grado Universitario permite: obtener título oficial de Técnico Superior en 2 años, recalcular la nota de admisión sobre la media del ciclo (+ hasta 4 puntos en fase específica con Biología y Química) y convalidar entre 18 y 30 créditos ECTS según convenio universitario [1, 2].',
        },
      ],
      citationsIncluded: [
        '[1] Catalogo_CFGS_Sanidad_FP_Dual.pdf (págs. 12-15)',
        '[2] Guia_Grados_Ponderaciones_PAU_2026.pdf (pág. 9)',
        '[3] Perfil_Vocacional_Alumno_2BACH.docx (pág. 1)',
      ],
    },
    tags: ['Orientación Vocacional', 'FP Grado Superior', 'Universidad', 'Matriz Comparativa', 'Pasarelas', 'Bachillerato'],
  },
  {
    id: 'uc-acad-2',
    category: 'academica',
    categoryLabel: 'Orientación Académica y Profesional',
    title: 'Elaboración de Consejo Orientador en 4º de ESO e Itinerarios Personalizados post-ESO',
    educationalStage: '3º y 4º de ESO',
    timeSavedMetric: 'Ahorra ~2 h en campaña de orientación',
    summary:
      'Genera un dossier claro para el alumno y su familia explicando todas las opciones al finalizar 4º de ESO (Bachilleratos, Ciclos de Grado Medio, FP Básica/Grado D y conexiones futuras) adaptado a las competencias del estudiante.',
    suggestedSources: [
      {
        title: 'Oferta Educativa Comarcal / Provincial de Bachilleratos y Ciclos de Grado Medio',
        format: 'PDF',
        description: 'Centros educativos de la zona, modalidades de Bachillerato y familias profesionales de Grado Medio.',
      },
      {
        title: 'Ficha de intereses y evolución académica del alumno de 4º ESO (Anonimizada)',
        format: 'Documento',
        description: 'Materias con mejor rendimiento, intereses expresados y dudas de la familia.',
      },
    ],
    recommendedPrompt: `Con base en la oferta educativa comarcal y la ficha del alumno de 4º de ESO cargadas en este cuaderno, redacta una propuesta fundamentada para el "Consejo Orientador" y una hoja informativa para la familia:

1. Síntesis competencial positiva del alumno basada en su trayectoria en 3º y 4º de ESO.
2. Comparativa de los 2 itinerarios más recomendables para el próximo curso (ej. Bachillerato de Ciencias y Tecnología vs. Ciclo Formativo de Grado Medio en Sistemas Microinformáticos y Redes), indicando en qué centros de la comarca se imparten según el PDF.
3. Explicación clara para la familia de que ninguna opción cierra puertas: detalla la pasarela Grado Medio → Grado Superior → Universidad.
4. Calendario de plazos de preinscripción y matrícula recogido en la convocatoria oficial subida.`,
    expectedOutput: {
      formatType: 'Propuesta de Consejo Orientador + Guía Familiar Comarcal',
      previewTitle: 'Hoja de Ruta al Finalizar 4º de ESO · Opciones Reales en la Comarca',
      sections: [
        {
          heading: '1. Fundamentación del Consejo Orientador [Cita 2]',
          content:
            'El alumno muestra alta competencia digital, resolución práctica de problemas tecnológicos y preferencia por entornos de aprendizaje aplicados frente a asignaturas puramente memorísticas [2].',
        },
        {
          heading: '2. Opciones en Centros Próximos y Pasarelas [Cita 1]',
          content:
            '• Opción 1: CFGM Sistemas Microinformáticos y Redes (IES Tecnológico a 4 km). Titulación oficial en 2 cursos y acceso directo a CFGS Desarrollo de Aplicaciones Web.\n• Opción 2: Bachillerato General o de Ciencias y Tecnología con optativa de Programación y Computación [1].',
        },
      ],
      citationsIncluded: [
        '[1] Oferta_Comarcal_FP_Bachillerato_2026.pdf (pág. 6)',
        '[2] Ficha_Tutoria_Vocacional_4ESO.docx (pág. 1)',
      ],
    },
    tags: ['Consejo Orientador', '4º ESO', 'Grado Medio', 'Itinerarios', 'Familias'],
  },

  // 5. GESTIÓN Y TAREAS ADMINISTRATIVAS GENERALES
  {
    id: 'uc-admin-1',
    category: 'administrativa',
    categoryLabel: 'Gestión y Tareas Administrativas Generales',
    title: 'Elaboración de la Memoria Anual del Departamento y Propuestas de Mejora para la PGA',
    educationalStage: 'Todas las Etapas (Gestión de Departamento)',
    timeSavedMetric: 'Ahorra ~6 h al cierre de curso',
    summary:
      'Cruza la Programación General Anual (PGA) inicial con todas las actas de reunión del Departamento de Orientación y la estadística agregada de intervenciones para redactar la Memoria Final y las propuestas de mejora del curso siguiente.',
    suggestedSources: [
      {
        title: 'Programación Inicial del Departamento de Orientación (PGA)',
        format: 'PDF / Google Doc',
        description: 'Objetivos, criterios de evaluación del plan y cronograma aprobados en octubre.',
      },
      {
        title: 'Compendio de actas de reuniones del Departamento de Orientación y CCP',
        format: 'PDF / Doc',
        description: 'Seguimiento mensual de actuaciones realizadas e incidencias organizativas.',
      },
      {
        title: 'Resumen estadístico anonimizado de actuaciones del curso',
        format: 'PDF / Tabla',
        description: 'Totales agregados de evaluaciones psicopedagógicas, dictámenes, becas NEAE y derivaciones.',
      },
    ],
    recommendedPrompt: `Actúa como Jefe/a del Departamento de Orientación redactando la Memoria Final de curso. Basándote exclusivamente en la Programación Inicial (PGA), las actas del departamento y la tabla estadística subidas al cuaderno:

1. TABLA DE GRADO DE CONSECUCIÓN DE OBJETIVOS:
Compara cada objetivo anual programado en la PGA con las actuaciones efectivamente registradas en las actas. Indica el grado de logro, las evidencias documentales (con cita a la fecha del acta) y las acciones que quedaron pendientes.

2. BALANCE EJECUTIVO DE LOS 3 PLANES:
Redacta la valoración técnica de: a) Plan de Atención a la Diversidad, b) Plan de Acción Tutorial (PAT), y c) Plan de Orientación Académica y Profesional (POAP), integrando los datos numéricos de la tabla estadística.

3. PROPUESTAS DE MEJORA VINCULANTES PARA LA PRÓXIMA PGA:
Transforma las dificultades organizativas o de coordinación detectadas en las actas en 5 propuestas de mejora concretas, medibles y calendarizadas para el próximo curso escolar.`,
    expectedOutput: {
      formatType: 'Borrador Oficial de Memoria Anual + Propuestas PGA',
      previewTitle: 'Memoria Anual del Departamento de Orientación · Balance y Mejora Continua',
      sections: [
        {
          heading: '1. Consecución de Objetivos Programados en la PGA [Citas 1, 2]',
          content:
            '• Objetivo 1 (Digitalización de protocolos de detección temprana): Grado de logro 100%. Completado según Acta DO n.º 4 (14 de noviembre) con implantación en los equipos docentes de 1º y 2º ESO [1, 2].\n• Objetivo 2 (Talleres de prevención de acoso): Grado de logro 85%. Pendiente sesión de refuerzo en 3º ESO C por coincidencia con salidas extraescolares [2].',
        },
        {
          heading: '2. Propuestas de Mejora para la PGA 2026-2027 [Citas 2, 3]',
          content:
            '1. Fijar calendario cerrado de reuniones de seguimiento con PT y AL en la primera quincena de cada trimestre.\n2. Adelantar al mes deabril la pre-evaluación de candidatos a Ciclos de Grado Básico para agilizar el trámite de audiencia familiar [3].',
        },
      ],
      citationsIncluded: [
        '[1] PGA_Departamento_Orientacion.pdf (págs. 4-7)',
        '[2] Compendio_Actas_DO_Curso.docx (págs. 6, 14)',
        '[3] Estadistica_Actuaciones_Anon.pdf (pág. 1)',
      ],
    },
    tags: ['Memoria Anual', 'PGA', 'Actas', 'Jefatura de Departamento', 'Inspección', 'Administración'],
  },
  {
    id: 'uc-admin-2',
    category: 'administrativa',
    categoryLabel: 'Gestión y Tareas Administrativas Generales',
    title: 'Tramitación de Becas NEAE, Extracto de BOE y Circulares para Familias',
    educationalStage: 'Infantil, Primaria, ESO, Bachillerato y FP',
    timeSavedMetric: 'Ahorra ~4 h en campaña anual',
    summary:
      'Sintetiza la resolución anual de Becas y Ayudas para alumnado NEAE publicada en el BOE para extraer requisitos por tipología, comprobar qué informes debe firmar el orientador y redactar comunicados claros para las familias.',
    suggestedSources: [
      {
        title: 'Resolución oficial en BOE de la convocatoria anual de Becas y Ayudas NEAE',
        format: 'PDF Oficial',
        description: 'Texto íntegro de la convocatoria ministerial o autonómica con umbrales y requisitos.',
      },
      {
        title: 'Protocolo interno de Secretaría y Orientación del centro',
        format: 'Documento / PDF',
        description: 'Calendario interno de recogida de solicitudes y documentación acreditativa.',
      },
    ],
    recommendedPrompt: `Analiza la Resolución Oficial de la convocatoria de Becas y Ayudas para alumnado con Necesidad Específica de Apoyo Educativo (NEAE) cargada en el cuaderno y genera tres herramientas administrativas:

1. TABLA DE REQUISITOS TÉCNICOS POR PERFIL DE ALUMNADO:
Detalla para cada perfil (Discapacidad/NEE, TEA, TDAH/Trastorno Grave de Conducta, DEA, Altas Capacidades) qué certificado o informe psicopedagógico exige exactamente la convocatoria (cita los artículos y páginas del BOE) y qué subsidios o ayudas directas contempla.

2. LISTA DE COMPROBACIÓN PARA EL DEPARTAMENTO DE ORIENTACIÓN:
Enumera los puntos críticos que el orientador/a debe verificar antes de firmar el anexo de necesidad de reeducación pedagógica o audición y lenguaje para evitar requerimientos de subsanación.

3. CIRCULAR INFORMATIVA PARA LAS FAMILIAS:
Redacta un comunicado claro, cercano y estructurado por pasos para enviar a las familias a través de la plataforma del centro con fechas límite y documentación a aportar.`,
    expectedOutput: {
      formatType: 'Guía Administrativa de Becas NEAE + Circular Oficial',
      previewTitle: 'Protocolo de Campaña de Becas y Ayudas NEAE · Resumen Normativo y Circular',
      sections: [
        {
          heading: '1. Requisitos Documentales por Tipología [Cita 1]',
          content:
            'Para las ayudas de Reeducación Pedagógica y del Lenguaje es preceptivo que el Informe Psicopedagógico certifique explícitamente que el centro no dispone de recursos suficientes para cubrir la totalidad de las horas de apoyo específico requeridas por el alumno [1].',
        },
        {
          heading: '2. Circular Lista para Envío a Familias [Citas 1, 2]',
          content:
            'Incluye calendario de solicitud telemática, relación de documentos médicos/administrativos necesarios y horario de atención en Secretaría y Orientación para entrega de resguardos [2].',
        },
      ],
      citationsIncluded: [
        '[1] Resolucion_BOE_Becas_NEAE_2026.pdf (Arts. 4 y 12, págs. 5, 11)',
        '[2] Protocolo_Interno_Secretaria.pdf (pág. 2)',
      ],
    },
    tags: ['Becas NEAE', 'BOE', 'Secretaría', 'Circulares', 'Familias', 'Trámites Administrativos'],
  },
];

export const SIMULATOR_ROLES: SimulatorRoleTask[] = [
  {
    id: 'role-eval-dea',
    category: 'evaluacion',
    title: 'Sintetizar informes para detectar DEA y proponer adaptaciones',
    subtitle: 'Evaluación Psicopedagógica · Cruce de informes clínicos, pruebas y observación de aula',
    defaultFocus: 'Dislexia, velocidad de procesamiento y adaptaciones de acceso en exámenes',
    requiredSources: [
      {
        documentName: 'Informe psicopedagógico previo o informe externo (logopedia/neuropsicología)',
        format: 'PDF (Anonimizado)',
        anonymizationTip: 'Sustituye nombre y apellidos por un código (ej. ALUMNO_04) antes de subir el PDF.',
        essential: true,
      },
      {
        documentName: 'Hoja de puntuaciones de baterías aplicadas (WISC-V, PROLEC-R, ENFEN, etc.)',
        format: 'PDF / Documento',
        anonymizationTip: 'Mantén únicamente edad cronológica en años/meses, curso e índices compuestos.',
        essential: true,
      },
      {
        documentName: 'Registro de observación sistemática del tutor/a y equipo docente',
        format: 'Google Doc / Word',
        anonymizationTip: 'Incluye evidencias concretas de rendimiento en tareas orales vs. escritas.',
        essential: true,
      },
      {
        documentName: 'Normativa autonómica de medidas de atención a la diversidad',
        format: 'PDF Oficial',
        anonymizationTip: 'Documento público oficial para alinear la nomenclatura de las medidas.',
        essential: false,
      },
    ],
    promptTemplate: ({ stage, outputFormat, tone, specificFocus }) =>
      `Actúa como orientador educativo especialista en Evaluación Psicopedagógica en la etapa de ${stage}. Analiza exclusivamente los documentos de evaluación cargados en este cuaderno sobre el caso centrándote especialmente en: "${specificFocus}".

Redacta la respuesta con un tono ${tone.toLowerCase()} y preséntala en formato de ${outputFormat.toLowerCase()} incluyendo estos apartados:

1. TRIANGULACIÓN Y PATRONES COMUNES:
Cruza los resultados psicométricos/clínicos con las observaciones reales de aula. Señala qué evidencias coinciden (incluyendo citas textuales y páginas de cada fuente) y qué discrepancias aparecen entre su potencial comprensivo y su ejecución escrita.

2. PERFIL DE FORTALEZAS E INTERESES:
Identifica los puntos fuertes cognitivos, motivacionales y relacionales del alumno documentados en las fuentes para anclar sobre ellos el plan de apoyo.

3. PROPUESTA DE ADAPTACIONES CURRICULARES NO SIGNIFICATIVAS (ACNS):
Elabora un cuadro operativo para el equipo docente de ${stage} dividido en:
- Medidas de acceso y presentación de la información en clase.
- Adaptaciones específicas en el diseño, formato y tiempo de las pruebas de evaluación.
- Recomendaciones de apoyo emocional y funciones ejecutivas.

4. INDICADORES DE SEGUIMIENTO TRIMESTRAL:
Define 3 indicadores observables para valorar en la próxima junta de evaluación si las adaptaciones están funcionando.`,
    expectedStructure: [
      'Tabla de convergencia entre pruebas psicométricas y conducta en el aula con citas [1], [2].',
      'Mapa de fortalezas del estudiante para evitar informes centrados solo en el déficit.',
      'Listado accionable de Adaptaciones No Significativas listas para entregar al equipo docente.',
      'Indicadores objetivos de revisión trimestral.',
    ],
    proTip:
      'Una vez generado este informe en NotebookLM, haz clic en "Guardar en nota" y usa el botón "Resumen de Audio" para crear una cápsula sonora de 3 minutos que explique al equipo docente cómo adaptar sus exámenes.',
  },
  {
    id: 'role-ases-dua',
    category: 'asesoramiento',
    title: 'Adaptar una programación didáctica al marco DUA para un grupo-clase',
    subtitle: 'Asesoramiento Docente · Metodologías inclusivas y evaluación multinivel',
    defaultFocus: 'Diversificar actividades y pruebas escritas para alumnado con DEA y ritmos diversos',
    requiredSources: [
      {
        documentName: 'Programación Didáctica o Situación de Aprendizaje de la asignatura',
        format: 'PDF / Google Doc',
        anonymizationTip: 'Documento curricular del departamento didáctico con criterios de evaluación.',
        essential: true,
      },
      {
        documentName: 'Perfil del grupo-clase (Acta de Evaluación Inicial anonimizada)',
        format: 'Documento de texto',
        anonymizationTip: 'Describe el número de alumnos con NEAE/DEA y barreras del grupo sin nombres propios.',
        essential: true,
      },
      {
        documentName: 'Guía de Pautas DUA (Diseño Universal para el Aprendizaje)',
        format: 'PDF de referencia',
        anonymizationTip: 'Rueda DUA o documento de pautas CAST en español.',
        essential: false,
      },
    ],
    promptTemplate: ({ stage, outputFormat, tone, specificFocus }) =>
      `Actúa como asesor psicopedagógico colaborando con un departamento didáctico de ${stage}. Analiza la Programación Didáctica / Situación de Aprendizaje subida a este cuaderno y crúzala con el documento "Perfil del Grupo-Clase", prestando especial atención a: "${specificFocus}".

Adopta un tono ${tone.toLowerCase()} y genera un ${outputFormat.toLowerCase()} con la siguiente estructura:

1. DETECCIÓN DE BARRERAS EN LA UNIDAD ORIGINAL:
Identifica qué actividades, textos o instrumentos de evaluación de la programación subida pueden generar barreras de acceso para el perfil de alumnado de este grupo (cita las páginas exactas de la programación).

2. PROPUESTA DE REDISEÑO DUA (APLICABLE EN AULA ORDINARIA):
Ofrece mejoras concretas y realistas organizadas en los 3 principios del Diseño Universal para el Aprendizaje:
- Múltiples formas de Representación (cómo presentar los conceptos con apoyos visuales, glosarios previos y organizadores gráficos).
- Múltiples formas de Acción y Expresión (alternativas multinivel para que el alumnado demuestre el mismo criterio de evaluación mediante formato escrito guiado, oral o visual).
- Múltiples formas de Implicación (estructuras cooperativas y autorregulación).

3. ADAPTACIÓN DE LA PRUEBA DE EVALUACIÓN Y RÚBRICA:
Reescribe o adapta la actividad principal de evaluación de la unidad para que sea accesible a todo el grupo manteniendo el rigor de los criterios de evaluación oficiales.`,
    expectedStructure: [
      'Análisis respetuoso de barreras curriculares vinculadas a páginas concretas de la programación.',
      'Matriz de mejoras DUA en Representación, Acción/Expresión e Implicación.',
      'Modelo de actividad o examen rediseñado con criterios de evaluación intactos.',
    ],
    proTip:
      'En NotebookLM puedes cargar simultáneamente 3 unidades didácticas de distintos departamentos y pedirle que diseñe una rúbrica interdisciplinar común.',
  },
  {
    id: 'role-tut-pat',
    category: 'tutoria',
    title: 'Diseñar sesión o taller de Acción Tutorial (PAT) y convivencia',
    subtitle: 'Acción Tutorial · Dinámicas de grupo, prevención de acoso y gestión emocional',
    defaultFocus: 'Resolución pacífica de conflictos, prevención de ciberacoso y cohesión de grupo',
    requiredSources: [
      {
        documentName: 'Plan de Acción Tutorial (PAT) del centro educativo',
        format: 'PDF',
        anonymizationTip: 'Documento institucional del centro.',
        essential: true,
      },
      {
        documentName: 'Plan de Convivencia o breve nota de diagnóstico del grupo-clase',
        format: 'PDF / Nota en el cuaderno',
        anonymizationTip: 'Describe la situación o conflicto grupal de forma genérica sin identificar alumnos.',
        essential: true,
      },
    ],
    promptTemplate: ({ stage, outputFormat, tone, specificFocus }) =>
      `Actúa como orientador educativo diseñando materiales prácticos para los tutores de ${stage}. Basándote en el Plan de Acción Tutorial (PAT) y el Plan de Convivencia cargados en el cuaderno, diseña una sesión completa de tutoría de 50 minutos centrada en: "${specificFocus}".

Utiliza un tono ${tone.toLowerCase()} y entrega el resultado en formato de ${outputFormat.toLowerCase()} con estos elementos listos para llevar al aula:

1. VINCULACIÓN CON EL PAT DEL CENTRO:
Indica a qué objetivo y bloque del PAT responde esta sesión (incluye cita exacta del documento del centro).

2. ESCALETA TEMPORAL DE LA SESIÓN (50 MINUTOS):
- Fase 1 · Dinámica inicial de activación (10 min): breve, participativa y sin exposición incómoda.
- Fase 2 · Actividad nuclear / Estudio de caso o Role-Playing (25 min): redacta el caso práctico completo con diálogos o situación realista para alumnado de ${stage}.
- Fase 3 · Debate guiado y cierre con compromiso de aula (15 min).

3. GUION DEL TUTOR/A (PREGUNTAS FACILITADORAS):
Escribe 5 preguntas literales que el tutor puede lanzar al grupo para fomentar la reflexión crítica y la empatía, evitando el tono de sermón.

4. FICHA O DINÁMICA DE EVALUACIÓN DE LA TUTORÍA:
Un mecanismo rápido de cierre (semáforo, tarjeta de salida o acuerdo visible en el aula) para medir el impacto de la sesión.`,
    expectedStructure: [
      'Justificación directa con cita al Plan de Acción Tutorial del centro.',
      'Cronograma minuto a minuto (10 + 25 + 15 min) realista para una hora lectiva.',
      'Caso práctico redactado íntegramente listo para proyectar o imprimir.',
      'Batería de preguntas abiertas para facilitar la conducción del tutor.',
    ],
    proTip:
      'Si un tutor tiene poco tiempo para preparar la sesión, genera un Resumen de Audio en NotebookLM con esta escaleta para que pueda escucharlo de camino al instituto.',
  },
  {
    id: 'role-tut-familia',
    category: 'tutoria',
    title: 'Preparar informe y guion para entrevista con familias o tutoría individual',
    subtitle: 'Acción Tutorial y Familias · Comunicación empática, acuerdos y seguimiento',
    defaultFocus: 'Devolución de evolución trimestral, hábitos de estudio y corresponsabilidad familiar',
    requiredSources: [
      {
        documentName: 'Recopilación de observaciones de los profesores del equipo docente',
        format: 'Documento / PDF (Anonimizado)',
        anonymizationTip: 'Reúne los comentarios de las distintas materias usando iniciales o código.',
        essential: true,
      },
      {
        documentName: 'Acuerdos de entrevistas previas o boletín de seguimiento',
        format: 'PDF / Nota',
        anonymizationTip: 'Permite verificar qué compromisos anteriores han funcionado.',
        essential: true,
      },
    ],
    promptTemplate: ({ stage, outputFormat, tone, specificFocus }) =>
      `Actúa como orientador educativo asesorando una entrevista familiar en ${stage}. Analiza los informes de seguimiento de los profesores y las notas previas cargadas en el cuaderno, enfocándote en: "${specificFocus}".

Redacta la propuesta con un tono ${tone.toLowerCase()} en formato de ${outputFormat.toLowerCase()} siguiendo esta estructura:

1. APERTURA POSITIVA Y FORTALEZAS OBSERVADAS:
Extrae de las observaciones de los profesores todos los aspectos positivos, avances y áreas donde el alumno muestra mayor implicación (cita las materias o fuentes).

2. SÍNTESIS CLARA DE DIFICULTADES (SIN TECNICISMOS):
Agrupa los comentarios del equipo docente en 2 o 3 núcleos comprensibles para la familia (ej. gestión del tiempo, comprensión de enunciados, constancia), evitando una lista abrumadora de quejas por asignatura.

3. PROPUESTA DE ACUERDOS TRILATERALES (CENTRO · FAMILIA · ALUMNO):
Diseña una tabla de compromisos concretos, medibles y realistas para las próximas 4 semanas:
- Qué hará el centro / profesorado.
- Qué supervisará la familia en casa (máximo 2 pautas sostenibles).
- Qué compromiso asume el propio estudiante.

4. PREGUNTAS PARA ESCUCHAR A LA FAMILIA:
Propone 3 preguntas abiertas para explorar cómo vive el alumno el estudio en casa y validar las emociones de la familia.`,
    expectedStructure: [
      'Bloque inicial de validación de fortalezas basado en evidencias del claustro.',
      'Traducción constructiva de las dificultades académicas o conductuales.',
      'Tabla de compromisos a 3 bandas (Centro - Familia - Alumno) lista para firmar en el acta.',
    ],
    proTip:
      'Este prompt evita el efecto "lista de quejas por asignaturas" en las tutorías familiares y transforma los comentarios dispersos del claustro en un plan de acción conjunto.',
  },
  {
    id: 'role-acad-itinerarios',
    category: 'academica',
    title: 'Construir matriz comparativa de itinerarios (FP vs. Universidad) y Consejo Orientador',
    subtitle: 'Orientación Académica y Profesional · Toma de decisiones vocacionales fundamentada',
    defaultFocus: 'Comparar Grados Universitarios y Ciclos de Grado Superior con pasarelas de acceso',
    requiredSources: [
      {
        documentName: 'Catálogo oficial de Ciclos Formativos de FP (Grado Medio / Superior) de la Comunidad',
        format: 'PDF / Enlace Web',
        anonymizationTip: 'Documento público oficial de oferta formativa.',
        essential: true,
      },
      {
        documentName: 'Guía de Grados Universitarios, notas de corte y tabla de ponderaciones PAU',
        format: 'PDF Oficial',
        anonymizationTip: 'Tablas públicas de las universidades de referencia.',
        essential: true,
      },
      {
        documentName: 'Perfil vocacional e intereses del estudiante (Cuestionario anonimizado)',
        format: 'Documento / Nota',
        anonymizationTip: 'Nota media aproximada, materias afines, intereses y estilo de aprendizaje.',
        essential: true,
      },
    ],
    promptTemplate: ({ stage, outputFormat, tone, specificFocus }) =>
      `Actúa como orientador especialista en Orientación Académica y Profesional para alumnado de ${stage}. Utilizando exclusivamente los catálogos oficiales de FP y Universidad subidos y el documento de perfil vocacional del alumno, elabora un estudio de itinerarios centrado en: "${specificFocus}".

Redacta la respuesta con un tono ${tone.toLowerCase()} en formato de ${outputFormat.toLowerCase()} incluyendo:

1. SÍNTESIS DEL PERFIL VOCACIONAL Y COMPETENCIAL:
Conecta las fortalezas, intereses y preferencias de aprendizaje del alumno con las familias profesionales y ramas de conocimiento disponibles en las fuentes.

2. MATRIZ COMPARATIVA (UNIVERSIDAD vs. FORMACIÓN PROFESIONAL):
Construye una tabla comparativa rigurosa con citas a los documentos oficiales que compare al menos 2 opciones universitarias y 2 ciclos formativos afines, detallando:
- Denominación oficial de la titulación y duración.
- Requisitos de acceso, modalidad de Bachillerato/prueba y nota de corte orientativa.
- Metodología (porcentaje práctico, proyectos, estancia en empresa FP Dual).
- Salidas profesionales directas y perspectivas de inserción.

3. DISEÑO DE ITINERARIOS CON PASARELAS (PLAN A Y PLAN B):
Explica paso a paso cómo funcionan las pasarelas oficiales entre FP y Universidad (reconocimiento de créditos ECTS, acceso desde CFGS a Grado Universitario y fase específica) para que el alumno y su familia comprueben que existen caminos alternativos seguros.

4. PRÓXIMOS PASOS Y CALENDARIO:
Lista de verificación de fechas clave de admisión, becas y jornadas de puertas abiertas según la documentación subida.`,
    expectedStructure: [
      'Matriz comparativa lado a lado (Grados Universitarios vs. Ciclos Formativos de FP).',
      'Diagrama explicativo de pasarelas reversibles (Plan A directo y Plan B vía CFGS).',
      'Citas exactas a notas de corte, ponderaciones y módulos profesionales oficiales.',
    ],
    proTip:
      'Puedes subir los PDFs de los planes de estudio de dos titulaciones que el alumno confunde (ej. Ingeniería Informática vs. CFGS Desarrollo de Aplicaciones Multiplataforma) y pedir a NotebookLM que compare asignatura por asignatura.',
  },
  {
    id: 'role-admin-gestion',
    category: 'administrativa',
    title: 'Redactar Memoria Anual, actas de coordinación (CCP/ETCP) o informes para Inspección',
    subtitle: 'Tareas Administrativas Generales · Gestión documental del Departamento de Orientación',
    defaultFocus: 'Síntesis de actuaciones trimestrales, indicadores de logro y propuestas de mejora para la PGA',
    requiredSources: [
      {
        documentName: 'Programación del Departamento de Orientación (PGA) o Plan Anual de Actuación',
        format: 'PDF / Google Doc',
        anonymizationTip: 'Documento institucional de planificación inicial del curso.',
        essential: true,
      },
      {
        documentName: 'Borrador de actas de reuniones del Departamento, CCP/ETCP o juntas de ciclo',
        format: 'Documento / PDF',
        anonymizationTip: 'Sustituye nombres propios de alumnos por referencias genéricas a curso/grupo.',
        essential: true,
      },
      {
        documentName: 'Estadística anonimizada de intervenciones (nº evaluaciones, becas NEAE, derivaciones)',
        format: 'Tabla / Hoja de cálculo en PDF',
        anonymizationTip: 'Usa exclusivamente totales numéricos agregados por etapa y tipología.',
        essential: false,
      },
    ],
    promptTemplate: ({ stage, outputFormat, tone, specificFocus }) =>
      `Actúa como Jefe/a del Departamento de Orientación redactando documentación administrativa oficial para ${stage}. Analiza exclusivamente los documentos institucionales, actas y registros estadísticos subidos a este cuaderno, centrándote en: "${specificFocus}".

Utiliza un tono ${tone.toLowerCase()} y genera el documento en formato de ${outputFormat.toLowerCase()} estructurado en los siguientes bloques oficiales:

1. GRADO DE CONSECUCIÓN DE LOS OBJETIVOS PROGRAMADOS:
Cruza los objetivos previstos en la Programación Inicial (PGA) con las actuaciones realmente registradas en las actas del departamento. Cita las fechas o páginas de las actas que evidencian cada actuación completada.

2. BALANCE CUANTITATIVO Y CUALITATIVO DE INTERVENCIONES:
Sintetiza en una tabla clara las actuaciones realizadas en:
- Atención a la diversidad y evaluaciones psicopedagógicas.
- Coordinación con tutores (PAT) y asesoramiento a equipos docentes (CCP/ETCP).
- Coordinación con servicios externos (Salud Mental, Servicios Sociales, EOEP, Inspección).

3. ANÁLISIS DE DIFICULTADES ORGANIZATIVAS DETECTADAS:
Identifica qué cuellos de botella administrativos, horarios o de coordinación han dificultado el cumplimiento del plan según consta en las fuentes.

4. PROPUESTAS DE MEJORA VINCULANTES PARA LA PRÓXIMA PGA:
Redacta 4 propuestas de mejora concretas, evaluables y realistas para incorporar directamente en la Programación General Anual del próximo curso escolar.`,
    expectedStructure: [
      'Tabla comparativa entre lo planificado en la PGA y lo ejecutado según las actas.',
      'Resumen ejecutivo formal listo para incorporar a la Memoria Final o presentar ante Inspección.',
      'Listado de acuerdos y propuestas de mejora trazables para el curso siguiente.',
    ],
    proTip:
      'Si mantienes un cuaderno anual llamado "Gestión Administrativa DO" donde subes las actas mensuales, en junio podrás generar la Memoria Final completa en menos de 10 minutos.',
  },
];

export const ADMIN_WORKFLOWS_DATA: AdminWorkflowItem[] = [
  {
    id: 'admin-memoria-pga',
    title: 'Redacción de la Memoria Final del Departamento y Propuestas para la PGA',
    periodicity: 'Trimestral / Fin de Curso (Junio)',
    timeSaved: 'Ahorra ~6 h de redacción administrativa',
    description:
      'Cruza la Programación General Anual (PGA) de septiembre con las actas mensuales del Departamento de Orientación y la estadística agregada de atenciones para redactar automáticamente el balance de consecución de objetivos y las propuestas de mejora del curso siguiente.',
    notebookStructure: 'Cuaderno: "Gestión Institucional DO · PGA y Memoria 2025-2026"',
    sourcesToUpload: [
      {
        name: '01_Programacion_Inicial_Departamento_Orientacion_PGA.pdf',
        format: 'PDF Oficial',
        detail: 'Objetivos, indicadores de logro y cronograma aprobados al inicio del curso.',
      },
      {
        name: '02_Compendio_Actas_Reuniones_DO_Sept_Junio.docx',
        format: 'Documento',
        detail: 'Actas semanales o mensuales con el seguimiento real de programas y acuerdos.',
      },
      {
        name: '03_Estadistica_Anonimizada_Actuaciones_NEAE_Becas.pdf',
        format: 'Tabla PDF',
        detail: 'Recuento numérico de informes emitidos, becas tramitadas y derivaciones externas.',
      },
    ],
    masterPrompt: `Actúa como Jefe/a del Departamento de Orientación. Analizando la Programación Inicial (PGA), el compendio de actas del curso y la tabla estadística de actuaciones subidas a este cuaderno, redacta el borrador oficial de la Memoria Final del Departamento estructurado en:

1. GRADO DE CUMPLIMIENTO DE LA PROGRAMACIÓN (PGA vs. REALIDAD):
Construye una tabla que enfrente cada objetivo anual de la PGA con las actuaciones efectivamente realizadas según las actas (incluye citas a las fechas de las actas) y el porcentaje estimado de consecución.

2. SÍNTESIS DE ACTUACIONES POR ÁMBITO:
Resume de forma ejecutiva los logros e indicadores cuantitativos en: a) Plan de Atención a la Diversidad, b) Plan de Acción Tutorial (PAT), y c) Plan de Orientación Académica y Profesional (POAP).

3. DIFICULTADES ENCONTRADAS Y PROPUESTAS DE MEJORA PARA EL PRÓXIMO CURSO:
Extrae las dificultades recurrentes mencionadas en las actas y transfórmalas en 5 propuestas de mejora operativas para la PGA del próximo curso escolar.`,
    expectedDeliverable: {
      title: 'Borrador Oficial de Memoria Anual del Departamento de Orientación',
      highlights: [
        'Tabla trazable: Objetivo PGA → Evidencia en Actas [Cita] → Grado de logro.',
        'Resumen estadístico redactado en prosa administrativa formal.',
        '5 propuestas de mejora justificadas en evidencias reales del curso.',
      ],
    },
    checklistItems: [
      'Exportar las actas del curso en un único documento o PDF.',
      'Verificar que las tablas estadísticas solo contengan totales numéricos (sin nombres).',
      'Subir la plantilla o índice oficial de Memoria exigido por Jefatura de Estudios.',
    ],
  },
  {
    id: 'admin-actas-ccp',
    title: 'Síntesis de Acuerdos de CCP / ETCP, Reuniones de Ciclo y Coordinación con Tutores',
    periodicity: 'Semanal / Mensual',
    timeSaved: 'Ahorra ~1,5 h por semana',
    description:
      'Convierte notas rápidas tomadas durante la Comisión de Coordinación Pedagógica (CCP/ETCP), reuniones de tutores o equipos docentes en actas formales con tabla de acuerdos, responsables y plazos de revisión.',
    notebookStructure: 'Cuaderno: "Actas de Coordinación Pedagógica y Equipos Docentes"',
    sourcesToUpload: [
      {
        name: '01_Notas_Brutas_Reunion_CCP_o_Tutores.docx',
        format: 'Texto / Notas',
        detail: 'Apuntes rápidos tomados en directo durante la sesión de coordinación.',
      },
      {
        name: '02_Orden_Del_Dia_Y_Acta_Anterior.pdf',
        format: 'PDF',
        detail: 'Convocatoria oficial con los puntos tratados y compromisos pendientes de la sesión previa.',
      },
    ],
    masterPrompt: `A partir del Orden del Día, el acta anterior y las notas en bruto de la reunión de hoy cargadas en el cuaderno, redacta el Acta Oficial de la sesión de coordinación siguiendo el estilo administrativo docente:

1. ENCABEZADO Y REVISIÓN DE ACUERDOS PREVIOS:
Indica qué tareas pendientes del acta anterior han quedado cerradas según las notas de hoy.

2. DESARROLLO DE LOS PUNTOS DEL ORDEN DEL DÍA:
Sintetiza las intervenciones y debates de forma objetiva, institucional y constructiva, organizándolos exactamente según los epígrafes del Orden del Día.

3. TABLA EJECUTIVA DE ACUERDOS Y COMPROMISOS:
Genera una tabla final con cuatro columnas:
- Acuerdo adoptado.
- Departamento / Cargo responsable (Orientación, Jefatura, Tutores de nivel).
- Fecha límite de ejecución.
- Indicador de verificación para la próxima reunión.`,
    expectedDeliverable: {
      title: 'Acta Institucional de CCP / Reunión de Tutores + Tabla de Seguimiento',
      highlights: [
        'Redacción formal lista para firma y archivo en el libro de actas.',
        'Separación nítida entre deliberaciones y acuerdos vinculantes.',
        'Control automático de tareas pendientes entre una reunión y la siguiente.',
      ],
    },
    checklistItems: [
      'Anotar durante la reunión palabras clave por punto del orden del día.',
      'Incluir el acta anterior para que NotebookLM detecte temas pendientes.',
      'Guardar la tabla de acuerdos como Nota Fija en el cuaderno para el mes siguiente.',
    ],
  },
  {
    id: 'admin-becas-neae',
    title: 'Auditoría de Convocatorias de Becas NEAE, Plazos Administrativos y Comunicaciones a Familias',
    periodicity: 'Anual (Campaña Mayo - Septiembre)',
    timeSaved: 'Ahorra ~4 h en campaña de becas',
    description:
      'Procesa el boletín oficial de la convocatoria anual de Becas y Ayudas para alumnado con Necesidad Específica de Apoyo Educativo (NEAE) para extraer umbrales, requisitos documentales por perfil (TEA, TDAH, DEA, Altas Capacidades) y generar circulares claras para las familias.',
    notebookStructure: 'Cuaderno: "Tramitación de Becas y Ayudas NEAE · Convocatoria Oficial"',
    sourcesToUpload: [
      {
        name: '01_Resolucion_BOE_Convocatoria_Becas_NEAE_Vigente.pdf',
        format: 'PDF BOE / BOJA / DOGV',
        detail: 'Texto íntegro de la resolución anual del Ministerio o Consejería.',
      },
      {
        name: '02_Instrucciones_Internas_Secretaria_Orientacion.pdf',
        format: 'PDF',
        detail: 'Protocolo interno del centro para la recogida de certificados y firma de informes.',
      },
    ],
    masterPrompt: `Basándote exclusivamente en la Resolución Oficial de la convocatoria de Becas y Ayudas NEAE subida a este cuaderno, elabora un kit administrativo para el Departamento de Orientación y la Secretaría del centro que contenga:

1. CUADRO RESUMEN DE REQUISITOS Y CUANTÍAS POR PERFIL (CON CITAS AL BOE):
Detalla en una tabla qué perfiles tienen derecho a ayuda (NEE/Discapacidad, TEA, Trastorno Grave de Conducta/TDAH, DEA, Altas Capacidades), qué documentación acreditativa exige exactamente la convocatoria para cada uno y qué conceptos subvenciona (enseñanza, transporte, comedor, reeducación pedagógica o del lenguaje).

2. LISTA DE VERIFICACIÓN (CHECKLIST) PARA EL ORIENTADOR/A:
Enumera qué apartados del certificado técnico debe cumplimentar el Departamento de Orientación y qué errores formales suelen ser motivo de denegación según las bases.

3. CIRCULAR INFORMATIVA EN LENGUAJE CLARO PARA LAS FAMILIAS:
Redacta una carta breve y comprensible para enviar por la plataforma del centro a las familias potencialmente beneficiarias, indicando plazos exactos, enlace de solicitud y documentos que deben traer al centro.`,
    expectedDeliverable: {
      title: 'Dosier Operativo de Becas NEAE + Circular para Familias',
      highlights: [
        'Tabla de requisitos exactos con cita al artículo de la convocatoria.',
        'Checklist de control documental para evitar subsanaciones en Secretaría.',
        'Circular lista para publicar en la app de comunicación con familias.',
      ],
    },
    checklistItems: [
      'Subir el PDF oficial de la convocatoria anual vigente.',
      'Verificar mediante las citas [1], [2] las fechas límite de presentación en sede electrónica.',
      'Generar un Audio Overview de 3 minutos en español para explicar los pasos a las familias con barrera lectora.',
    ],
  },
  {
    id: 'admin-redes-externas',
    title: 'Coordinación Interinstitucional: Derivaciones a Salud Mental, Servicios Sociales e Inspección',
    periodicity: 'Continuo según protocolos',
    timeSaved: 'Ahorra ~2 h por expediente de derivación',
    description:
      'Asegura el cumplimiento estricto de los protocolos autonómicos de coordinación externa (Salud Mental Infanto-Juvenil / USMIJ, Atención Temprana, Servicios Sociales, Absentismo o Inspección Educativa) verificando plazos, anexos obligatorios y trazabilidad de actuaciones previas del centro.',
    notebookStructure: 'Cuaderno: "Protocolos de Derivación Externa e Inspección Educativa"',
    sourcesToUpload: [
      {
        name: '01_Protocolo_Coordinacion_Educacion_Sanidad_ServiciosSociales.pdf',
        format: 'PDF Oficial',
        detail: 'Protocolo autonómico vigente de derivación y hojas de notificación.',
      },
      {
        name: '02_Cronologia_Actuaciones_Centro_Caso_Anonimizado.docx',
        format: 'Documento',
        detail: 'Registro fechado de tutorías con la familia, medidas ordinarias aplicadas y seguimiento.',
      },
    ],
    masterPrompt: `Actúa como orientador educativo preparando un informe administrativo de derivación o comunicación oficial. Cruzando el Protocolo Oficial de Coordinación y la Cronología de Actuaciones del Centro cargadas en el cuaderno:

1. AUDITORÍA DE REQUISITOS PREVIOS DEL PROTOCOLO:
Verifica si las actuaciones realizadas por el centro cumplen todos los pasos previos que exige el protocolo antes de derivar (cita la página del protocolo y qué anexos u hojas de derivación deben adjuntarse).

2. REDACCIÓN DEL INFORME DE DERIVACIÓN / COMUNICACIÓN INSTITUCIONAL:
Redacta el texto técnico-administrativo de derivación ordenado cronológicamente:
- Motivo de la derivación o consulta en términos objetivos y observables.
- Historial de medidas educativas ordinarias y específicas adoptadas por el centro y su respuesta.
- Síntesis de las entrevistas mantenidas con la familia y grado de colaboración.
- Solicitud concreta de coordinación o valoración al servicio externo.`,
    expectedDeliverable: {
      title: 'Informe Administrativo de Derivación Externa + Verificación de Anexos',
      highlights: [
        'Comprobación previa de requisitos normativos y firmas de autorización familiar.',
        'Cronología formal de actuaciones del centro lista para el anexo oficial.',
        'Lenguaje objetivo, neutro y ajustado a requerimiento de Inspección o Sanidad.',
      ],
    },
    checklistItems: [
      'Anonimizar cualquier nombre propio usando iniciales o código de expediente.',
      'Comprobar que consta la fecha de firma del consentimiento informado familiar.',
      'Revisar las citas al protocolo autonómico para adjuntar el Anexo exacto.',
    ],
  },
];

