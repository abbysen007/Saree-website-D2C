import React from "react";

interface HouseOfIraayaLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showTagline?: boolean;
  variant?: "transparent" | "chocolate";
}

/**
 * Iraaya 8-Petal Flower Emblem (Exact vector representation from brand photo)
 */
export function IraayaFlowerEmblem({ className = "w-10 h-10", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill={color}>
        {/* 8 teardrop petals radiating from center point (100, 100) */}
        {/* Petal 0° (Top) */}
        <path d="M 100 100 C 85 78, 74 48, 100 28 C 126 48, 115 78, 100 100 Z" />
        {/* Petal 45° (Top Right) */}
        <path d="M 100 100 C 85 78, 74 48, 100 28 C 126 48, 115 78, 100 100 Z" transform="rotate(45 100 100)" />
        {/* Petal 90° (Right) */}
        <path d="M 100 100 C 85 78, 74 48, 100 28 C 126 48, 115 78, 100 100 Z" transform="rotate(90 100 100)" />
        {/* Petal 135° (Bottom Right) */}
        <path d="M 100 100 C 85 78, 74 48, 100 28 C 126 48, 115 78, 100 100 Z" transform="rotate(135 100 100)" />
        {/* Petal 180° (Bottom) */}
        <path d="M 100 100 C 85 78, 74 48, 100 28 C 126 48, 115 78, 100 100 Z" transform="rotate(180 100 100)" />
        {/* Petal 225° (Bottom Left) */}
        <path d="M 100 100 C 85 78, 74 48, 100 28 C 126 48, 115 78, 100 100 Z" transform="rotate(225 100 100)" />
        {/* Petal 270° (Left) */}
        <path d="M 100 100 C 85 78, 74 48, 100 28 C 126 48, 115 78, 100 100 Z" transform="rotate(270 100 100)" />
        {/* Petal 315° (Top Left) */}
        <path d="M 100 100 C 85 78, 74 48, 100 28 C 126 48, 115 78, 100 100 Z" transform="rotate(315 100 100)" />
      </g>
    </svg>
  );
}

export function HouseOfIraayaLogo({
  className = "",
  size = "md",
  showTagline = true,
  variant = "transparent"
}: HouseOfIraayaLogoProps) {
  const sizeMap = {
    sm: { emblem: "w-8 h-8", text: "text-lg md:text-xl", tagline: "text-[10px]" },
    md: { emblem: "w-11 h-11", text: "text-2xl md:text-3xl", tagline: "text-xs" },
    lg: { emblem: "w-16 h-16", text: "text-3xl md:text-4xl", tagline: "text-sm" },
    xl: { emblem: "w-24 h-24", text: "text-5xl md:text-6xl", tagline: "text-lg" }
  };

  const selectedSize = sizeMap[size];

  if (variant === "chocolate") {
    return (
      <div className={`relative overflow-hidden bg-[#4A1E0B] text-[#FFF3CD] p-6 sm:p-8 rounded-lg shadow-xl flex items-center gap-5 sm:gap-8 ${className}`}>
        {/* Background Tiled Floral Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none grid grid-cols-4 gap-8 p-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="flex items-center justify-center">
              <IraayaFlowerEmblem className="w-16 h-16" color="#FFF3CD" />
            </div>
          ))}
        </div>

        {/* 8-Petal Emblem */}
        <div className="relative z-10 flex-shrink-0">
          <IraayaFlowerEmblem className={selectedSize.emblem} color="#FFF3CD" />
        </div>

        {/* Iraaya Title & Tagline */}
        <div className="relative z-10 flex flex-col text-left">
          <span className={`font-serif font-bold ${selectedSize.text} tracking-tight text-[#FFF3CD] leading-none`}>
            Iraaya
          </span>
          {showTagline && (
            <span className={`font-['Dancing_Script',cursive,'Playfair_Display',serif] text-[#FFF3CD]/90 italic mt-1.5 ${selectedSize.tagline} font-normal tracking-wide`}>
              Woven with Divine Elegance
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 sm:gap-4 ${className}`}>
      {/* 8-Petal Flower Emblem */}
      <div className="flex-shrink-0">
        <IraayaFlowerEmblem className={`${selectedSize.emblem} text-zari drop-shadow-sm`} color="currentColor" />
      </div>

      {/* Brand Text Block */}
      <div className="flex flex-col text-left select-none">
        <div className="flex items-center gap-1.5">
          <span className={`font-serif font-bold ${selectedSize.text} tracking-tight text-alta leading-tight`}>
            Iraaya
          </span>
        </div>
        
        {showTagline && (
          <span className={`font-['Dancing_Script',cursive,'Playfair_Display',serif] text-zari italic ${selectedSize.tagline} tracking-wide font-medium`}>
            Woven with Divine Elegance
          </span>
        )}
      </div>
    </div>
  );
}

// Backward compatibility alias exports
export const HouseOfAairaLogo = HouseOfIraayaLogo;
export const AvhoronLogo = HouseOfIraayaLogo;
export const IraayaLogo = HouseOfIraayaLogo;
