/* ========================================================================
 *  Landing – Index.tsx   ( Overkill² + HeroFX restored )
 *  -----------------------------------------------------------------------
 *   • Background star-grid  (z-0)
 *   • <HeroFX> portal canvas (z-5)  ← BACK AGAIN 💫
 *   • Foreground content     (hero z-20, rest z-10)
 *   • Motion-safe, a11y skip-link, full routing
 * ===================================================================== */

import { useEffect, useRef } from "react";
import { Link }              from "react-router-dom";

import { Navigation }        from "@/components/layout/Navigation";
import HeroFX                from "@/components/ui/HeroFX";
import { FeatureSection }    from "@/components/landing/FeatureSection";
import { PricingSection }    from "@/components/landing/PricingSection";

import { Button }            from "@/components/ui/button";
import { Card }              from "@/components/ui/card";
import {
    ArrowRight, Palette, Code,
    Sparkles, ShieldCheck, Hexagon,
} from "lucide-react";

/* — star-dot coords — */
const dots = [
    { x: " 6%", y: "12%", s: 1 },
    { x: "18%", y: "82%", s: 2 },
    { x: "34%", y: "28%", s: 1 },
    { x: "57%", y: "63%", s: 1 },
    { x: "72%", y: "20%", s: 2 },
    { x: "86%", y: "76%", s: 1 },
];

/* — tilt utility — */
function useTilt(el: React.RefObject<HTMLElement>, max = 15) {
    useEffect(() => {
        if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const onScroll = () => {
            if (!el.current) return;
            const { top } = el.current.getBoundingClientRect();
            const tilt = Math.min(Math.max(top / 120, -max), max);
            el.current.style.transform = `rotateY(${tilt}deg)`;
        };
        onScroll();
        addEventListener("scroll", onScroll, { passive: true });
        return () => removeEventListener("scroll", onScroll);
    }, [el, max]);
}

/* =====================================================================
 *  MAIN PAGE
 * =================================================================== */
export default function Index() {
    const heroSec = useRef<HTMLElement>(null);
    const heroTxt = useRef<HTMLDivElement>(null);
    useTilt(heroTxt);

    return (
        <>
            {/* Skip-link ------------------------------------------------------ */}
            <a
                href="#main"
                className="sr-only focus:not-sr-only fixed top-2 left-2 z-[999]
                   px-4 py-2 rounded bg-indigo-700 text-white"
            >
                Skip to content
            </a>

            {/* Star grid background ------------------------------------------ */}
            <StarGrid />

            {/* Top navigation ------------------------------------------------- */}
            <Navigation />

            {/* Three-JS burst (portal layer z-5) ------------------------------ */}
            <HeroFX anchor={heroSec} />

            {/* ================= HERO ======================================== */}
            <section
                ref={heroSec}
                id="main"
                aria-labelledby="hero-heading"
                className="relative isolate pt-44 pb-40 overflow-hidden z-20"
            >
                {/* soft vignette so 3-D stays behind content */}
                <div
                    aria-hidden
                    className="absolute inset-0 backdrop-blur-[3px]
                     bg-gradient-to-b from-black/30 via-black/10 to-black/40"
                />

                {/* neon frame */}
                <div
                    aria-hidden
                    className="absolute inset-8 rounded-[2.5rem] pointer-events-none
                     ring-1 ring-white/10
                     before:absolute before:inset-0 before:rounded-[2.5rem]
                     before:bg-[conic-gradient(from_180deg_at_50%_50%,#6366f1_0%,#ec4899_25%,#06b6d4_50%,#6366f1_100%)]
                     before:opacity-30 before:blur-[6px]"
                />

                {/* content ------------------------------------------------------- */}
                <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-14">
                    {/* headline */}
                    <header ref={heroTxt} className="will-change-transform motion-reduce:transform-none">
                        <h1
                            id="hero-heading"
                            className="text-[2.8rem] sm:text-6xl md:text-7xl lg:text-8xl
                         font-extrabold leading-tight tracking-tight
                         bg-gradient-to-r from-white via-gray-100 to-white
                         bg-clip-text text-transparent
                         drop-shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
                            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.12)" }}
                        >
                            Craft&nbsp;Your&nbsp;Digital
                            <br />
                            <span
                                className="relative inline-block text-transparent
                           bg-[conic-gradient(from_180deg_at_50%_50%,#e879f9_0%,#38bdf8_50%,#e879f9_100%)]
                           bg-clip-text animate-[spin_20s_linear_infinite]
                           motion-reduce:animate-none"
                            >
                Masterpiece
              </span>
                        </h1>

                        <p className="mt-10 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto text-gray-200/90">
                            Drag, drop and deploy in seconds with a canvas that feels alive.
                        </p>
                    </header>

                    {/* CTA glass-bar */}
                    <div
                        className="relative mx-auto flex w-max gap-6 px-10 py-6 rounded-full
                       bg-white/5 backdrop-blur-md border border-white/10
                       shadow-[0_12px_45px_rgba(0,0,0,0.35)]
                       after:absolute after:inset-0 after:rounded-full
                       after:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18)_0%,transparent_70%)]"
                    >
                        <CtaButton
                            to="/editor"
                            icon={<Palette className="w-5 h-5" />}
                            text="Try the Editor"
                            gradient="from-fuchsia-500 to-sky-500"
                        />
                        <CtaButton
                            to="/docs"
                            icon={<Code className="w-5 h-5" />}
                            text="View Docs"
                            gradient="from-slate-900 to-slate-900"
                            outline
                        />
                    </div>

                    {/* features */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-2 mt-28">
                        {features.map((f) => (
                            <FeatureCard key={f.title} {...f} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CONTENT SECTIONS ---------------------------------------------- */}
            <FeatureSection />
            <PricingSection />

            {/* FOOTER --------------------------------------------------------- */}
            <Footer />
        </>
    );
}

/* =====================================================================
 *  Helper Components
 * =================================================================== */
function StarGrid() {
    return (
        <div className="fixed inset-0 -z-10">
            <div
                className="absolute inset-0 opacity-[0.05]
                   bg-[radial-gradient(#ffffff_1px,transparent_1px)]
                   bg-[length:4px_4px]"
            />
            {dots.map(({ x, y, s }, i) => (
                <span
                    key={i}
                    className="absolute block rounded-full bg-white animate-ping"
                    style={{
                        width: s,
                        height: s,
                        left: x,
                        top: y,
                        animationDuration: `${4 + Math.random() * 4}s`,
                        animationDelay: `-${Math.random() * 4}s`,
                    }}
                />
            ))}
        </div>
    );
}

/* CTA glass-button */
function CtaButton({
                       to,
                       icon,
                       text,
                       gradient,
                       outline,
                   }: {
    to: string;
    icon: JSX.Element;
    text: string;
    gradient: string;
    outline?: boolean;
}) {
    return (
        <Link
            to={to}
            className="relative overflow-hidden px-9 py-4 rounded-full font-semibold
                 flex items-center gap-3 transition-transform active:scale-95"
        >
      <span
          className={`absolute inset-0 rounded-full ${
              outline
                  ? "border border-white/20 bg-white/5 hover:bg-white/10"
                  : `bg-gradient-to-br ${gradient} hover:brightness-110`
          }`}
      />
            <span className="relative z-10">{icon}</span>
            <span className="relative z-10 whitespace-nowrap">{text}</span>
            <span
                aria-hidden
                className="absolute inset-0 -translate-x-full
                   bg-gradient-to-r from-transparent via-white/60 to-transparent
                   rotate-12 blur-md animate-[slide_2.8s_linear_infinite]
                   motion-reduce:hidden"
            />
        </Link>
    );
}

/* orbit-icon feature card */
function FeatureCard({
                         icon: Icon,
                         color,
                         title,
                         desc,
                     }: {
    icon: any;
    color: string;
    title: string;
    desc: string;
}) {
    return (
        <Card
            className="relative h-[190px] backdrop-blur-md bg-white/3
                 border border-white/10 overflow-hidden
                 shadow-lg shadow-black/40 group"
        >
            <div
                aria-hidden
                className="absolute inset-0 grid place-content-center pointer-events-none"
            >
                <Icon
                    className={`w-16 h-16 ${color} opacity-15 animate-spin-slow
                      group-hover:opacity-30`}
                />
            </div>

            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
                <Icon className={`w-12 h-12 mb-4 ${color}`} />
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm text-gray-400 mt-1">{desc}</p>
            </div>
        </Card>
    );
}

/* feature list */
const features = [
    {
        icon: Sparkles,
        color: "text-fuchsia-400",
        title: "Lightning Fast",
        desc: "Build in minutes—never hours.",
    },
    {
        icon: ShieldCheck,
        color: "text-sky-400",
        title: "Production Ready",
        desc: "Export clean, optimised code instantly.",
    },
    {
        icon: Hexagon,
        color: "text-amber-400",
        title: "Premium Quality",
        desc: "Pixel-perfect, professional-grade UI.",
    },
];

/* ================= FOOTER ============================================ */
function Footer() {
    return (
        <footer className="relative border-t border-white/10 mt-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid gap-10
                      grid-cols-2 md:grid-cols-4 text-sm text-gray-300">
                <div className="col-span-2 space-y-4">
                    <h2 className="text-lg font-semibold bg-gradient-to-r
                         from-purple-400 to-sky-400 bg-clip-text text-transparent">
                        ComponentForge
                    </h2>
                    <p>
                        The ultimate drag-and-drop editor for creating jaw-dropping landing
                        pages. Build, customise and deploy with ease.
                    </p>
                </div>

                <FooterNav
                    label="Product"
                    links={[
                        ["/editor", "Editor"],
                        ["/features", "Features"],
                        ["/pricing", "Pricing"],
                        ["/templates", "Templates"],
                        ["/docs", "Documentation"],
                    ]}
                />

                <FooterNav
                    label="Company"
                    links={[
                        ["/about", "About"],
                        ["/blog", "Blog"],
                        ["/contact", "Contact"],
                        ["/support", "Support"],
                    ]}
                />
            </div>

            <Seal />

            <p className="text-center text-gray-400 pt-10 pb-14 text-xs">
                © 2025 ComponentForge. All rights reserved.
            </p>
        </footer>
    );
}

function FooterNav({
                       label,
                       links,
                   }: {
    label: string;
    links: [string, string][];
}) {
    return (
        <nav aria-label={label} className="space-y-2">
            <h3 className="font-semibold text-white mb-1">{label}</h3>
            {links.map(([href, txt]) => (
                <FooterLink key={href} to={href}>
                    {txt}
                </FooterLink>
            ))}
        </nav>
    );
}

function FooterLink({ to, children }: { to: string; children: string }) {
    return (
        <Link
            to={to}
            className="block hover:text-white transition-colors
                 focus-visible:outline-none focus-visible:ring focus-visible:ring-violet-400 rounded-sm"
        >
            {children}
        </Link>
    );
}

/* metallic seal */
function Seal() {
    return (
        <div className="flex justify-center">
            <div className="relative w-[460px] max-w-full rounded-md overflow-hidden
                      shadow-[0_8px_38px_rgba(0,0,0,0.4)]">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,#3b3b3b_0_2px,#2f2f2f_2px_4px)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.28)_0%,transparent_70%)]
                        mix-blend-screen" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/45" />
                <div className="absolute inset-0 rounded-md ring-1 ring-white/15" />

                <div className="relative z-10 px-8 py-10 text-center font-serif tracking-wide">
                    <p className="text-xl italic text-gray-100">Designed by</p>
                    <h3 className="mt-1 text-4xl md:text-5xl font-light text-gray-200">
                        Petar Nikolić
                    </h3>
                    <p className="mt-4 text-sm uppercase tracking-[0.35em] font-semibold text-gray-300">
                        Engineering Software
                    </p>
                </div>

                <span
                    aria-hidden
                    className="absolute -left-1/2 top-0 w-1/2 h-full
                     bg-[conic-gradient(from_0deg_at_50%_50%,#ff00ff,#00ffff,#ffff00,#ff00ff)]
                     opacity-20 blur-[6px] animate-[slide_6s_linear_infinite]
                     motion-reduce:hidden"
                />
            </div>
        </div>
    );
}
