import { Mail, MapPin, MessageCircle, Phone, Clock, Globe } from "lucide-react";
import { site } from "@/config/site";
import { isLineUrl } from "@/lib/format";
import { CopyButton } from "@/components/ui/CopyButton";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Pending } from "@/components/ui/Pending";

type Props = { dark?: boolean };

/** One row per channel. Unconfigured channels show "waiting for setup" and never render a link. */
export function ContactRows({ dark = false }: Props) {
  const c = site.contact;
  const linkCls = dark ? "text-gold-soft underline underline-offset-4" : "text-forest underline underline-offset-4";
  const labelCls = dark ? "text-ivory/70" : "text-earth";
  const iconCls = dark ? "text-gold" : "text-earth";

  const row = (icon: React.ReactNode, label: string, body: React.ReactNode) => (
    <li className="flex gap-3 py-3">
      <span className={`mt-1 ${iconCls}`}>{icon}</span>
      <div className="min-w-0 flex-1">
        <p className={`text-sm ${labelCls}`}>{label}</p>
        <div className="mt-0.5 break-words">{body}</div>
      </div>
    </li>
  );

  return (
    <ul className={`divide-y ${dark ? "divide-ivory/15" : "divide-earth/20"}`}>
      {row(
        <MessageCircle className="h-5 w-5" aria-hidden />,
        "LINE Official Account",
        isLineUrl(c.lineUrl) ? (
          <ExternalLink href={c.lineUrl} className={linkCls}>
            เปิดแชต LINE
          </ExternalLink>
        ) : (
          <Pending dark={dark}>รอการตั้งค่า LINE</Pending>
        ),
      )}
      {row(
        <Phone className="h-5 w-5" aria-hidden />,
        "โทรศัพท์",
        c.phone.verified ? (
          <a href={`tel:${c.phone.number}`} className={linkCls}>
            {c.phone.number}
          </a>
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            <span>{c.phone.number}</span>
            <Pending dark={dark}>อ่านจากฉลาก ยังไม่ยืนยัน</Pending>
            <CopyButton text={c.phone.number} label="คัดลอกเบอร์" className={dark ? "text-ivory" : "text-forest"} />
          </div>
        ),
      )}
      {row(
        <Globe className="h-5 w-5" aria-hidden />,
        "Facebook",
        c.facebookUrl ? (
          <ExternalLink href={c.facebookUrl} className={linkCls}>
            เปิดเพจ Facebook
          </ExternalLink>
        ) : (
          <Pending dark={dark}>รอการตั้งค่า</Pending>
        ),
      )}
      {row(
        <Mail className="h-5 w-5" aria-hidden />,
        "อีเมล",
        c.email ? (
          <a href={`mailto:${c.email}`} className={linkCls}>
            {c.email}
          </a>
        ) : (
          <Pending dark={dark}>รอการตั้งค่า</Pending>
        ),
      )}
      {row(
        <MapPin className="h-5 w-5" aria-hidden />,
        "ที่อยู่",
        c.address ? (
          <span>
            {c.address}
            {c.mapUrl && (
              <>
                {" "}
                <ExternalLink href={c.mapUrl} className={linkCls}>
                  ดูแผนที่
                </ExternalLink>
              </>
            )}
          </span>
        ) : (
          <Pending dark={dark}>รอการตั้งค่า</Pending>
        ),
      )}
      {row(
        <Clock className="h-5 w-5" aria-hidden />,
        "เวลาทำการ",
        c.openingHours ? <span>{c.openingHours}</span> : <Pending dark={dark}>รอการตั้งค่า</Pending>,
      )}
    </ul>
  );
}
