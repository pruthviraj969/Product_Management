export default function StatCard({ label, value, accentClass = 'bg-brand-lime' }) {
  return (
    <div className="stat-glow flex-1 min-w-[120px]">
      <div className={`absolute top-0 left-0 right-0 h-0.5 ${accentClass}`} />
      <p className="text-[10px] text-brand-muted tracking-[0.16em] uppercase">{label}</p>
      <p className="font-display text-3xl tracking-wider mt-0.5">{value}</p>
    </div>
  );
}