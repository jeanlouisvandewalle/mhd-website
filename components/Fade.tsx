/**
 * Zachte kleurovergang tussen twee secties (zwart ↔ kalkwit).
 * De overgang wordt in OKLab berekend, zodat het midden niet grauw wordt.
 */
const COLORS = { ink: "#0b0b0b", kalk: "#f2efe9" } as const;

export function Fade({ from, to }: { from: keyof typeof COLORS; to: keyof typeof COLORS }) {
  return (
    <div
      aria-hidden="true"
      className="h-[clamp(9rem,18vw,18rem)] -my-px relative"
      style={{ background: `linear-gradient(to bottom in oklab, ${COLORS[from]}, ${COLORS[to]})` }}
    />
  );
}
