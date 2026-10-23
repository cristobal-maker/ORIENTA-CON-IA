import { jsPDF } from 'jspdf';
import {
  STEP_BY_STEP_GUIDE,
  USE_CASES_DATA,
  ADMIN_WORKFLOWS_DATA,
} from '../data/notebookData';

export function downloadNotebookLMGuidePdf(): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 16;
  const contentWidth = pageWidth - marginX * 2;
  let cursorY = 20;

  const ensureSpace = (neededHeight: number) => {
    if (cursorY + neededHeight > pageHeight - 18) {
      doc.addPage();
      cursorY = 20;
    }
  };

  const addHeaderBanner = () => {
    doc.setFillColor(15, 23, 42); // Slate 900
    doc.rect(0, 0, pageWidth, 42, 'F');

    doc.setTextColor(56, 189, 248); // Sky 400
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(
      'MANUAL PRACTICO PARA DEPARTAMENTOS DE ORIENTACION EDUCATIVA',
      marginX,
      14
    );

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(17);
    doc.text(
      'Guia de Uso de NotebookLM en la Orientacion Educativa',
      marginX,
      24
    );

    doc.setTextColor(203, 213, 225); // Slate 300
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.text(
      'Fundamentos, protocolos de anonimizacion RGPD, casos practicos, gestion administrativa y prompts maestros.',
      marginX,
      33
    );

    cursorY = 52;
  };

  const addSectionTitle = (numberStr: string, title: string) => {
    ensureSpace(16);
    doc.setFillColor(241, 245, 249); // Slate 100
    doc.rect(marginX, cursorY - 5, contentWidth, 9, 'F');

    doc.setTextColor(2, 132, 199); // Sky 600
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(`${numberStr}. ${title}`, marginX + 3, cursorY + 1);
    cursorY += 10;
  };

  const addParagraph = (
    text: string,
    options?: { bold?: boolean; fontSize?: number; color?: [number, number, number]; indent?: number }
  ) => {
    const fontSize = options?.fontSize ?? 9.5;
    const indent = options?.indent ?? 0;
    const color = options?.color ?? [51, 65, 85];

    doc.setFont('helvetica', options?.bold ? 'bold' : 'normal');
    doc.setFontSize(fontSize);
    doc.setTextColor(color[0], color[1], color[2]);

    const cleanText = text
      .replace(/[«»]/g, '"')
      .replace(/•/g, '-')
      .replace(/→/g, '->')
      .replace(/↔/g, '<->');

    const lines = doc.splitTextToSize(cleanText, contentWidth - indent);
    const lineHeight = fontSize * 0.44;
    ensureSpace(lines.length * lineHeight + 3);

    doc.text(lines, marginX + indent, cursorY);
    cursorY += lines.length * lineHeight + 2.5;
  };

  // --- PORTADA / CABECERA ---
  addHeaderBanner();

  // --- SECCION 1: FUNDAMENTOS Y REGLA DE ORO RGPD ---
  addSectionTitle('01', 'Fundamentos de NotebookLM y Deontologia en Orientacion');
  addParagraph(
    'NotebookLM es un asistente de investigacion y sintesis basado en fuentes (Source Grounding). A diferencia de los modelos conversacionales abiertos, razona exclusivamente sobre los documentos que el orientador/a sube a cada cuaderno, citando el fragmento literal de cada hallazgo.'
  );
  addParagraph(
    '- Ecosistema Multimodal: Admite hasta 50 fuentes por cuaderno (PDFs normativos, Google Docs, presentaciones Slides, URLs oficiales, videos de YouTube y archivos de audio).\n- Trazabilidad Exacta: Cada respuesta incorpora citas numeradas [1], [2] para verificar el articulo del decreto o el apartado del informe original.\n- Resumenes de Audio (Podcasts en espanol): Permite transformar protocolos densos o pautas DUA en un dialogo sonoro de 3 a 5 minutos para sensibilizar a equipos docentes y familias.\n- Protocolo Estricto de Anonimizacion (RGPD): Nunca subas documentos con nombres reales, apellidos, DNI, telefonos o direcciones. Sustituye siempre los datos identificativos por codigos alfanumericos (ej. EXP_2ESO_04).',
    { indent: 2 }
  );

  cursorY += 3;

  // --- SECCION 2: GUIA PASO A PASO ---
  addSectionTitle('02', 'Guia Paso a Paso para Configurar tus Cuadernos');
  STEP_BY_STEP_GUIDE.forEach((step) => {
    ensureSpace(24);
    addParagraph(`Paso ${step.stepNumber}: ${step.title} (${step.duration})`, {
      bold: true,
      fontSize: 10,
      color: [15, 23, 42],
    });
    addParagraph(step.description, { fontSize: 9 });
    step.goodPractices.forEach((gp) => {
      addParagraph(`* Buena practica: ${gp}`, { fontSize: 8.8, indent: 4 });
    });
    addParagraph(
      `Instruccion personalizada recomendada: "${step.interactiveDemo.customInstructionExample}"`,
      { fontSize: 8.8, bold: true, color: [3, 105, 161], indent: 4 }
    );
    cursorY += 2;
  });

  // --- SECCION 3: CASOS DE USO POR FUNCION ORIENTADORA ---
  addSectionTitle(
    '03',
    'Aplicacion en Funciones del Orientador (Fuentes + Prompts Maestros)'
  );

  USE_CASES_DATA.forEach((uc, idx) => {
    ensureSpace(35);
    addParagraph(
      `Caso 3.${idx + 1} [${uc.categoryLabel}] - ${uc.title}`,
      { bold: true, fontSize: 10, color: [15, 23, 42] }
    );
    addParagraph(
      `Etapa: ${uc.educationalStage} | Impacto: ${uc.timeSavedMetric}`,
      { fontSize: 8.5, color: [5, 150, 105], bold: true }
    );
    addParagraph(uc.summary, { fontSize: 9 });

    const sourcesList = uc.suggestedSources
      .map((s) => `- ${s.title} (${s.format})`)
      .join('\n');
    addParagraph(`Fuentes sugeridas a subir al cuaderno:\n${sourcesList}`, {
      fontSize: 8.8,
      indent: 3,
    });

    addParagraph('Prompt Maestro recomendado para copiar en NotebookLM:', {
      fontSize: 8.8,
      bold: true,
      color: [2, 132, 199],
      indent: 3,
    });
    addParagraph(uc.recommendedPrompt, {
      fontSize: 8.3,
      color: [30, 41, 59],
      indent: 5,
    });
    cursorY += 3;
  });

  // --- SECCION 4: TAREAS ADMINISTRATIVAS GENERALES ---
  addSectionTitle(
    '04',
    'Flujos de Gestion Burocratica y Tareas Administrativas Generales'
  );

  ADMIN_WORKFLOWS_DATA.forEach((wf, idx) => {
    ensureSpace(32);
    addParagraph(
      `Flujo 4.${idx + 1}: ${wf.title} (${wf.periodicity} - ${wf.timeSaved})`,
      { bold: true, fontSize: 10, color: [15, 23, 42] }
    );
    addParagraph(wf.description, { fontSize: 9 });
    addParagraph(`Estructura sugerida: ${wf.notebookStructure}`, {
      fontSize: 8.8,
      bold: true,
      indent: 3,
    });
    addParagraph(wf.masterPrompt, {
      fontSize: 8.3,
      color: [30, 41, 59],
      indent: 5,
    });
    cursorY += 3;
  });

  // --- PIE DE PAGINA EN TODAS LAS PAGINAS ---
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setDrawColor(226, 232, 240);
    doc.line(marginX, pageHeight - 12, pageWidth - marginX, pageHeight - 12);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(
      'NotebookLM para la Orientacion Educativa y Profesional - Guia Practica de Referencia',
      marginX,
      pageHeight - 7
    );
    doc.text(
      `Pagina ${i} de ${totalPages}`,
      pageWidth - marginX - 22,
      pageHeight - 7
    );
  }

  doc.save('Guia_NotebookLM_Orientacion_Educativa.pdf');
}
