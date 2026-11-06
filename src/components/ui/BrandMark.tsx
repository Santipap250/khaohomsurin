/**
 * Complementary graphic symbol for the website (a grain over a horizon line).
 * It is NOT the product's official label/logo. The real label appears only as the supplied photograph.
 */
export function BrandMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <circle cx="24" cy="24" r="22.5" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <path d="M6 31c8-6 14-6 18-2s10 4 18-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="24" cy="18" rx="4.2" ry="9" transform="rotate(18 24 18)" fill="#c8a13a" />
      <path d="M24 12.5v10" stroke="#163d2c" strokeWidth="1" strokeLinecap="round" transform="rotate(18 24 18)" opacity="0.45" />
    </svg>
  );
}
