import { Globe, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import Logo from "@/components/Logo";
import Particles from "@/components/Particles";

function Instagram({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Linkedin({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5A2.25 2.25 0 1 1 5 8a2.25 2.25 0 0 1-.02-4.5ZM3 9.5h4v11H3v-11Zm6.5 0h3.8v1.6h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.6 4.78 5.98v6.37h-4v-5.65c0-1.35-.03-3.08-1.9-3.08-1.9 0-2.2 1.46-2.2 2.98v5.75h-4v-11Z" />
    </svg>
  );
}

const CONTACT = {
  website: "enzolt.com",
  websiteUrl: "https://enzolt.com",
  phone: "+91 94440 41145",
  phoneUrl: "tel:+919444041145",
  email: "sales@enzolt.com",
  address:
    "No: 76/2, Padavattamman Koil Street, K K Thazhai, Bhaktavatsalam Nagar, Madhavaram, Chennai, Tamil Nadu 600068",
  addressUrl: "https://maps.app.goo.gl/KJwi6jDHY3MFCdPm6",
  instagram: "https://www.instagram.com/enzolt_energy?vrfl=MTNsaWlnemFsZzNnMQ==",
  linkedin: "https://www.linkedin.com/company/enzolt/",
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#080B09] pt-24 pb-12" aria-label="Footer">
      {/* Subtle particle field in footer */}
      <Particles density={0.06} intensity={0.5} maxCount={25} />

      {/* Dual ambient breathing aura */}
      <div
        className="flame-glow !top-[65%] h-[75vw] w-[75vw] md:h-[45vw] md:w-[45vw]"
        style={{
          background:
            "radial-gradient(circle, rgba(165,217,46,0.1) 0%, rgba(213,168,75,0.06) 35%, rgba(8,11,9,0) 70%)",
          animationDuration: "8s",
        }}
      />

      {/* Top Green Accent Line */}
      <div className="hairline-green absolute inset-x-0 top-0" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-12">
          {/* Brand info */}
          <div className="md:col-span-6 lg:col-span-7">
            <Logo size="lg" />
            <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-mist">
              Celebrating the festival of lights with a bolder vision for sustainable energy — intelligent, connected, and designed around you.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-enzolt/20 bg-[#151A17] px-3 py-1 text-[11px] font-medium text-enzolt">
              <Sparkles size={12} className="text-gold" />
              <span>Happy Diwali from Enzolt Energy</span>
            </div>
          </div>

          {/* Connect links */}
          <div className="md:col-span-6 lg:col-span-5">
            <p className="eyebrow mb-5 !text-[0.68rem]">Connect With Us</p>
            <ul className="space-y-3.5 font-body text-sm">
              <li>
                <a
                  href={CONTACT.phoneUrl}
                  className="group inline-flex items-center gap-3 text-white/85 transition-colors hover:text-enzolt"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#151A17] text-enzolt transition-colors group-hover:border-enzolt">
                    <Phone size={14} />
                  </span>
                  <span className="font-medium tracking-wide">{CONTACT.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="group inline-flex items-center gap-3 text-white/85 transition-colors hover:text-enzolt"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#151A17] text-enzolt transition-colors group-hover:border-enzolt">
                    <Mail size={14} />
                  </span>
                  <span>{CONTACT.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 text-white/85 transition-colors hover:text-enzolt"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#151A17] text-enzolt transition-colors group-hover:border-enzolt">
                    <Globe size={14} />
                  </span>
                  <span>{CONTACT.website}</span>
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.addressUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-start gap-3 text-white/85 transition-colors hover:text-enzolt"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#151A17] text-enzolt transition-colors group-hover:border-enzolt mt-0.5">
                    <MapPin size={14} />
                  </span>
                  <span className="text-xs leading-relaxed text-mist transition-colors group-hover:text-white">
                    {CONTACT.address}
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-3 pt-2">
                <a
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Enzolt Energy on Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#151A17] text-white/85 transition-all duration-300 hover:border-enzolt hover:bg-enzolt/10 hover:text-enzolt hover:shadow-[0_0_18px_rgba(165,217,46,0.35)]"
                >
                  <Instagram size={16} />
                </a>
                <a
                  href={CONTACT.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Enzolt Energy on LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#151A17] text-white/85 transition-all duration-300 hover:border-enzolt hover:bg-enzolt/10 hover:text-enzolt hover:shadow-[0_0_18px_rgba(165,217,46,0.35)]"
                >
                  <Linkedin size={16} />
                </a>
              </li>
            </ul>
          </div>
        </div>


        {/* Closing banner */}
        <div className="mt-20 border-t border-white/[0.08] pt-12 text-center">
          <p className="font-display text-2xl font-extrabold tracking-tight text-green-gradient sm:text-3xl md:text-4xl">
            POWERING A BRIGHTER TOMORROW.
          </p>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-6 font-body text-[10px] font-medium uppercase tracking-[0.25em] text-mist/60 md:flex-row">
          <span>© {new Date().getFullYear()} Enzolt Energy. All rights reserved.</span>
          <span>Happy Diwali · enzolt.com/diwali</span>
        </div>
      </div>
    </footer>
  );
}
