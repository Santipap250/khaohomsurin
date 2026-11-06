export function Pending({ children = "รอข้อมูลจากเจ้าของแบรนด์", dark = false }: { children?: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
        dark ? "border-gold/60 text-gold-soft" : "border-earth/40 bg-ivory-deep text-earth"
      }`}
    >
      {children}
    </span>
  );
}
