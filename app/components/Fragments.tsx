/* Small UI "fragments" used in the Noise → Clarity hero.
   Same pieces as the Figma components (Fragment/Stat, Chart, List …).
   They use the theme tokens, so they also work in dark mode. */

const card = "border border-hairline-strong bg-paper";

export function StatFragment() {
  return (
    <div className={`${card} w-[200px] p-[18px]`}>
      <p className="label-caps">Settled · Nov</p>
      <p className="mt-2 font-display text-[40px] leading-none text-ink">
        <span className="font-sans font-light">₹</span>4.2L
      </p>
      <p className="mt-2 text-sm text-muted">12 invoices · 0 on hold</p>
    </div>
  );
}

export function ChartFragment() {
  const bars = [40, 64, 52, 88, 72, 100, 60];
  return (
    <div className={`${card} flex h-[136px] items-end gap-2 p-[18px]`} aria-hidden="true">
      {bars.map((h, i) => (
        <span
          key={i}
          style={{ height: h }}
          className={`w-[22px] ${i === 5 ? "bg-accent" : "border border-hairline-strong"}`}
        />
      ))}
    </div>
  );
}

export function ListFragment() {
  const rows = [
    { name: "Acme Studio", status: "Settled", dot: "bg-accent" },
    { name: "Northwind", status: "In transit", dot: "bg-warning" },
    { name: "Lumen Labs", status: "On hold", dot: "bg-danger" },
  ];
  return (
    <ul className={`${card} w-[300px]`}>
      {rows.map((r) => (
        <li
          key={r.name}
          className="flex items-center gap-2.5 border-b border-hairline px-3.5 py-3 text-ink last:border-0"
        >
          <span aria-hidden="true" className={`h-2 w-2 ${r.dot}`} />
          <span className="flex-1">{r.name}</span>
          <span className="label-caps">{r.status}</span>
        </li>
      ))}
    </ul>
  );
}

export function InputFragment() {
  return (
    <div className={`${card} w-[280px] px-4 py-3.5`}>
      <p className="label-caps">Amount</p>
      <p className="mt-1.5 text-xl font-normal text-ink">₹ 83,500.00</p>
    </div>
  );
}

export function ToggleFragment() {
  return (
    <div className={`${card} flex items-center gap-6 px-[18px] py-3.5 text-ink`}>
      <span>Auto-lock FX rate</span>
      <span aria-hidden="true" className="flex h-6 w-[46px] items-center justify-end bg-accent p-[3px]">
        <span className="h-[18px] w-[18px] bg-ink" />
      </span>
    </div>
  );
}

export function ButtonFragment() {
  return (
    <div className="flex items-center gap-2.5 bg-accent px-[22px] py-3.5 text-[#023341]">
      <span className="text-[11px] font-medium uppercase tracking-[0.12em]">Pay invoice</span>
      <span aria-hidden="true">→</span>
    </div>
  );
}
