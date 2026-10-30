import React from "react";
import { cn } from "@workspace/ui/lib/utils";

interface BoxMeshBackgroundProps {
  className?: string;
}

/**
 * A subtle, architectural wireframe grid and atmospheric top lighting wash.
 *
 * Architecture:
 * - `.box-mesh-grid`: Fixed to the viewport (`100vw` x `100vh`) using a tiled `linear-gradient` with explicit `background-size`.
 *   This ensures crisp 1px strokes that NEVER blur, stretch, or downsample, regardless of how tall a blog post is.
 * - `.box-mesh-glow`: Positioned at the top of the document (`position: absolute; height: 600px`).
 *   Provides the top hero atmospheric wash without inflating GPU layers or distorting on long content.
 */
export function BoxMeshBackground({ className }: BoxMeshBackgroundProps = {}) {
  return (
    <div
      className={cn("box-mesh-background", className)}
      aria-hidden="true"
    >
      <div className="box-mesh-grid" />
      <div className="box-mesh-glow" />
    </div>
  );
}
