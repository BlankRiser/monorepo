import React from "react";
import { cn } from "@workspace/ui/lib/utils";

interface BoxMeshBackgroundProps {
  className?: string;
}

/**
 * A subtle, architectural wireframe grid and delicate atmospheric lighting wash.
 * Uses pure CSS repeating-linear-gradients with a radial feather mask and radial gradients
 * on pseudo-elements (::before for atmospheric glow, ::after for box mesh) at negative z-index
 * so text content remains crisp, highly readable, and distraction-free.
 */
export function BoxMeshBackground({ className }: BoxMeshBackgroundProps = {}) {
  return (
    <div
      className={cn("box-mesh-background", className)}
      aria-hidden="true"
    />
  );
}
