/**
 * Scale silhouette of each mount, drawn from the catalogue dimensions and
 * normalised against a common field so the six can be compared directly.
 * Floor Wash really is three times the height of Table Wash, and the diagram
 * says so.
 *
 * This is a dimensioned drawing, not decoration and not a stand-in for
 * photography. When rendered stills arrive it sits alongside them.
 */

const FIELD = 1700; // mm of vertical field the viewBox represents

type Geometry = {
  /** Emitting bar in mm. `len` runs along the emitting axis, `thick` across it. */
  len: number;
  thick: number;
  vertical: boolean;
  stemH?: number;
  baseW?: number;
  cableH?: number;
  /** Height of the underside of the bar above the floor line, for hung mounts. */
  liftFromFloor?: number;
};

const GEOMETRY: Record<string, Geometry> = {
  pendant: { len: 1500, thick: 42, vertical: false, cableH: 620, liftFromFloor: 760 },
  wall: { len: 360, thick: 38, vertical: false, liftFromFloor: 820 },
  "floor-task": { len: 425, thick: 35, vertical: false, stemH: 960, baseW: 250 },
  "table-task": { len: 425, thick: 35, vertical: false, stemH: 410, baseW: 180 },
  "floor-wash": { len: 1025, thick: 35, vertical: true, stemH: 480, baseW: 250 },
  "table-wash": { len: 360, thick: 35, vertical: true, stemH: 90, baseW: 150 },
};

export default function FixtureDiagram({
  slug,
  className = "",
}: {
  slug: string;
  className?: string;
}) {
  const g = GEOMETRY[slug];
  if (!g) return null;

  const VB_W = 1000;
  const VB_H = 1000;
  const k = VB_H / FIELD; // mm to viewBox units
  const cx = VB_W / 2;
  const floor = VB_H * 0.94;

  // Along-axis and across-axis extents, kept separate so a vertical bar never
  // borrows its length where its thickness is meant.
  const lenPx = g.len * k;
  const thickPx = Math.max(3, g.thick * k);
  const stemH = (g.stemH ?? 0) * k;
  const baseW = (g.baseW ?? 0) * k;
  const cableH = (g.cableH ?? 0) * k;
  const lift = (g.liftFromFloor ?? 0) * k;

  const barW = g.vertical ? thickPx : lenPx;
  const barH = g.vertical ? lenPx : thickPx;

  // Bar sits on its stem, or hangs at its lift height.
  const barBottom = lift > 0 ? floor - lift : floor - stemH;
  const barTop = barBottom - barH;
  const barLeft = cx - barW / 2;

  const lensCount = Math.max(3, Math.min(16, Math.round(g.len / 95)));
  const lensR = Math.max(1.8, thickPx * 0.2);

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className={className}
      role="img"
      aria-label={`Scale drawing of the Lumatree ${slug.replace(/-/g, " ")}`}
    >
      {/* Shared floor reference, so scale reads as comparable across the range */}
      <line
        x1={VB_W * 0.1}
        y1={floor}
        x2={VB_W * 0.9}
        y2={floor}
        stroke="currentColor"
        strokeWidth={1.5}
        opacity={0.2}
      />

      {cableH > 0 && (
        <>
          <line
            x1={barLeft + barW * 0.12}
            y1={Math.max(4, barTop - cableH)}
            x2={barLeft + barW * 0.12}
            y2={barTop}
            stroke="currentColor"
            strokeWidth={1.2}
            opacity={0.35}
          />
          <line
            x1={barLeft + barW * 0.88}
            y1={Math.max(4, barTop - cableH)}
            x2={barLeft + barW * 0.88}
            y2={barTop}
            stroke="currentColor"
            strokeWidth={1.2}
            opacity={0.35}
          />
        </>
      )}

      {stemH > 0 && (
        <rect
          x={g.vertical ? cx - 3 : barLeft + barW - 6}
          y={floor - stemH}
          width={6}
          height={stemH}
          fill="currentColor"
          opacity={0.5}
        />
      )}

      {baseW > 0 && (
        <rect
          x={cx - baseW / 2}
          y={floor - 9}
          width={baseW}
          height={9}
          rx={2}
          fill="currentColor"
          opacity={0.75}
        />
      )}

      {/* The bar. The one component every mount shares. */}
      <rect
        x={barLeft}
        y={barTop}
        width={barW}
        height={barH}
        rx={2}
        fill="currentColor"
        opacity={0.9}
      />

      {/* Lens apertures along the emitting face */}
      {Array.from({ length: lensCount }, (_, i) => {
        const t = (i + 0.5) / lensCount;
        return (
          <circle
            key={i}
            cx={g.vertical ? cx : barLeft + barW * t}
            cy={g.vertical ? barTop + barH * t : barTop + barH / 2}
            r={lensR}
            fill="var(--color-gallery)"
            opacity={0.9}
          />
        );
      })}
    </svg>
  );
}
