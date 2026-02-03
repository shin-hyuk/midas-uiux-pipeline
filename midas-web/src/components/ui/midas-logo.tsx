import { cn } from "@/lib/utils"

interface MidasLogoProps {
  variant?: "primary" | "secondary" | "white" | "tertiary"
  size?: "sm" | "md" | "lg" | "xl"
  showText?: boolean
  className?: string
}

const sizeMap = {
  sm: { icon: 24, text: "text-lg" },
  md: { icon: 32, text: "text-xl" },
  lg: { icon: 40, text: "text-2xl" },
  xl: { icon: 48, text: "text-3xl" },
}

const colorMap = {
  primary: "#2D1B4E",
  secondary: "#C9A962",
  white: "#FFFFFF",
  tertiary: "#6B5B7A",
}

export function MidasLogo({
  variant = "secondary",
  size = "md",
  showText = false,
  className,
}: MidasLogoProps) {
  const { icon: iconSize, text: textClass } = sizeMap[size]
  const color = colorMap[variant]

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <MidasSymbol variant={variant} size={iconSize} />
      {showText && (
        <span
          className={cn("font-light tracking-[0.2em]", textClass)}
          style={{ color }}
        >
          MIDAS
        </span>
      )}
    </div>
  )
}

export function MidasSymbol({
  variant = "secondary",
  size = 32,
  className,
}: {
  variant?: "primary" | "secondary" | "white" | "tertiary"
  size?: number
  className?: string
}) {
  const color = colorMap[variant]
  const strokeWidth = size < 28 ? "1" : "1.2"

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Icosahedron - 3D polyhedron logo matching Figma design */}
      {/* Outer hexagonal frame */}
      <path
        d="M50 5 L90 27 L90 73 L50 95 L10 73 L10 27 Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        fill="none"
      />
      {/* Top triangular faces */}
      <path
        d="M50 5 L10 27 L50 50"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M50 5 L90 27 L50 50"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        fill="none"
      />
      {/* Middle horizontal edges */}
      <path
        d="M10 27 L50 50 L90 27"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M10 73 L50 50 L90 73"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        fill="none"
      />
      {/* Side vertical edges */}
      <path
        d="M10 27 L10 73"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <path
        d="M90 27 L90 73"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
      />
      {/* Diagonal internal edges for 3D depth */}
      <path
        d="M10 27 L50 50"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M90 27 L50 50"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M10 73 L50 50"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M90 73 L50 50"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        fill="none"
      />
      {/* Bottom triangular faces */}
      <path
        d="M50 95 L10 73 L50 50"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M50 95 L90 73 L50 50"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        fill="none"
      />
      {/* Center vertical axis for depth */}
      <path
        d="M50 5 L50 95"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        opacity="0.5"
      />
      {/* Inner pentagon edges for icosahedron detail */}
      <path
        d="M30 18 L70 18"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M30 82 L70 82"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        fill="none"
        opacity="0.6"
      />
    </svg>
  )
}
