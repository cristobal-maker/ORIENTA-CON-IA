import React from 'react';

interface BrandCompassLogoProps {
  size?: 'sm' | 'md';
  className?: string;
}

/**
 * Replica vectorial de alta precisión del logotipo oficial subido "BRUJULA.jpg"
 * (Brújula tridimensional azul marino con aguja roja, marco rectangular rojo y
 * tipografía "NOTEBOOKLM / ORIENTATOTAL"), escalable sin pérdida de nitidez.
 */
export const BrandCompassLogo: React.FC<BrandCompassLogoProps> = ({
  size = 'md',
  className = '',
}) => {
  const dimensions =
    size === 'sm'
      ? 'h-9 sm:h-10 w-auto'
      : 'h-10 sm:h-11 md:h-12 w-auto';

  return (
    <div
      className={`inline-flex items-center select-none shrink-0 ${className}`}
      title="NOTEBOOKLM · ORIENTATOTAL"
    >
      <svg
        viewBox="0 0 385 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${dimensions} rounded-xs shadow-2xs transition-transform duration-150 hover:scale-[1.02]`}
        role="img"
        aria-label="Logotipo NOTEBOOKLM ORIENTATOTAL con brújula"
      >
        {/* Fondo blanco y marco perimetral rojo exacto al diseño subido */}
        <rect
          x="1.5"
          y="1.5"
          width="382"
          height="127"
          rx="2"
          fill="#FFFFFF"
          stroke="#EE1D23"
          strokeWidth="3"
        />

        {/* Sombra elíptica suave bajo la brújula */}
        <ellipse cx="67" cy="112" rx="54" ry="11" fill="#DCE7EB" />

        {/* Puntas cardinales exteriores en azul marino (#213555) */}
        {/* Punta superior-izquierda */}
        <polygon points="36,30 22,12 47,20" fill="#213555" />
        {/* Punta superior-derecha */}
        <polygon points="80,22 95,14 91,34" fill="#213555" />
        {/* Punta inferior-izquierda */}
        <polygon points="31,96 22,122 44,107" fill="#213555" />
        {/* Punta inferior-derecha */}
        <polygon points="88,97 104,105 94,85" fill="#213555" />

        {/* Cuerpo exterior 3D del anillo de la brújula (#213555) */}
        <ellipse
          cx="60"
          cy="64"
          rx="41"
          ry="47"
          transform="rotate(-8 60 64)"
          fill="#213555"
        />

        {/* Esfera interior blanca desplazada para efecto de profundidad */}
        <ellipse
          cx="65"
          cy="64"
          rx="31"
          ry="37"
          transform="rotate(-8 65 64)"
          fill="#FFFFFF"
        />

        {/* Arco interior gris de relieve lateral derecho */}
        <path
          d="M 55 29 A 30 36 0 0 1 88 86"
          stroke="#95A2AA"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Aguja magnética roja inclinada con centro blanco */}
        <g transform="rotate(-29 64 65)">
          <polygon
            points="64,34 72,65 64,96 56,65"
            fill="#C92A2A"
          />
          <circle cx="64" cy="65" r="4.2" fill="#FFFFFF" />
        </g>

        {/* Texto principal: NOTEBOOKLM (Serif Bold Italic en azul marino) */}
        <text
          x="136"
          y="58"
          fill="#213555"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontWeight="900"
          fontStyle="italic"
          fontSize="31"
          letterSpacing="1.2"
        >
          NOTEBOOKLM
        </text>

        {/* Subtítulo: ORIENTATOTAL (Sans-serif Italic espaciado) */}
        <text
          x="135"
          y="102"
          fill="#2A3B56"
          fontFamily="'Plus Jakarta Sans', 'DM Sans', Arial, sans-serif"
          fontWeight="600"
          fontStyle="italic"
          fontSize="21"
          letterSpacing="4.5"
        >
          ORIENTATOTAL
        </text>
      </svg>
    </div>
  );
};
