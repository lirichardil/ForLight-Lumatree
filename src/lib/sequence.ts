/**
 * Frame sequence manifest.
 *
 * Each entry describes a folder of numbered stills under
 * /public/media/sequences/<id>/. Scroll position maps to frame index, so
 * there is no frame rate: `frames` only controls smoothness.
 *
 * Placeholder frames are currently jpg at 1280x720. When the rendered WebP
 * frames arrive at 1600x900 per References/3D-Render-Brief-CN.md, change
 * `ext`, `width`, `height` and `frames` here. Nothing else needs to move.
 */
export type SequenceId =
  | "hero-ignition"
  | "lens-detail"
  | "hero-transform";

export type SequenceSpec = {
  id: SequenceId;
  /** Total frames in the folder, numbered from 1. */
  frames: number;
  ext: "jpg" | "webp" | "png";
  width: number;
  height: number;
  /** Human description, used as the canvas accessible label. */
  alt: string;
};

export const SEQUENCES: Record<SequenceId, SequenceSpec> = {
  "hero-ignition": {
    id: "hero-ignition",
    frames: 48,
    ext: "jpg",
    width: 1280,
    height: 720,
    alt: "A Lumatree bar on a dark set, warming from unlit to full output as its lenses light in sequence.",
  },
  "lens-detail": {
    id: "lens-detail",
    frames: 36,
    ext: "jpg",
    width: 1280,
    height: 720,
    alt: "The bar rotating to reveal deep-recessed circular optics along its face.",
  },
  "hero-transform": {
    id: "hero-transform",
    frames: 72,
    ext: "jpg",
    width: 1280,
    height: 720,
    alt: "One bar reconfiguring through all six Lumatree mounts.",
  },
};

/** Zero-padded frame path, matching the delivery spec handed to the 3D artist. */
export function framePath(spec: SequenceSpec, index: number): string {
  const n = String(index + 1).padStart(4, "0");
  return `/media/sequences/${spec.id}/frame-${n}.${spec.ext}`;
}

export function allFramePaths(spec: SequenceSpec): string[] {
  return Array.from({ length: spec.frames }, (_, i) => framePath(spec, i));
}
