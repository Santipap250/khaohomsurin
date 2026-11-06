import type { AnchorHTMLAttributes } from "react";

/** External links always open safely in a new tab. */
export function ExternalLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}
