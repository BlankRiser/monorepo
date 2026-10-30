import React from "react";

/**
 *
 * A subtle, architectural wireframe grid and atmospheric top lighting wash. 
 * Uses pure CSS repeating-linear-gradients and radial gradients on pseudo-elements 
 * (::before for atmospheric glow, ::after for box mesh) at negative z-index 
 * so content interactions remain unaffected.
 */
export function BoxMeshBackground() {
  return <div className="box-mesh-background" aria-hidden="true" />;
}
