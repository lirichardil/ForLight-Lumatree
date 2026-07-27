export default function FixtureSilhouette({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 260"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <line x1="110" y1="0" x2="110" y2="92" stroke="currentColor" strokeWidth="1" />
      <path
        d="M110 92 C 66 100, 44 64, 22 42"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M110 92 C 154 100, 176 64, 198 42"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M110 92 C 90 118, 90 150, 96 182"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle cx="22" cy="42" r="7" stroke="currentColor" strokeWidth="1" />
      <circle cx="198" cy="42" r="7" stroke="currentColor" strokeWidth="1" />
      <circle cx="96" cy="196" r="9" stroke="currentColor" strokeWidth="1" />
      <circle
        id="lumatree-canopy-node"
        cx="110"
        cy="112"
        r="22"
        stroke="currentColor"
        strokeWidth="1.25"
      />
    </svg>
  );
}
