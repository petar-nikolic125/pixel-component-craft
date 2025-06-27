import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";

/**
 *  <HeroFX anchor={sectionRef}/>
 *  ──────────────────────────────────────────────────────────────────────────
 *  Creates a fixed layer (z = 5) that:
 *    • mirrors the hero’s bounding-box via CSS `clip-path`
 *    • fades out when its anchor scrolls away
 *    • adds a gentle parallax shift
 */
export default function HeroFX({
                                   anchor,
                                   parallax = 12,
                               }: {
    anchor: React.RefObject<HTMLElement>;
    parallax?: number;
}) {
    /* ── create once ─────────────────────────────────────────────────────── */
    const mount = useRef<HTMLDivElement | null>(null);
    if (!mount.current) {
        const el           = document.createElement("div");
        el.style.cssText   =
            "position:fixed;inset:0;pointer-events:none;z-index:5;\
             transition:opacity .3s ease;opacity:0;";
        mount.current      = el;
        document.body.appendChild(el);
    }

    /* ── 1. keep layer clipped & positioned over hero ─────────────────────── */
    useEffect(() => {
        const update = () => {
            const hero = anchor.current;
            if (!hero) return;
            const { top, left, width, height } = hero.getBoundingClientRect();
            /* convert viewport rect → clip-path (faster than resizing canvas) */
            mount.current!.style.clipPath =
                `inset(${Math.max(top,0)}px calc(100vw - ${left + width}px) \
               calc(100vh - ${top + height}px) ${Math.max(left,0)}px)`;
        };
        update();                                           // initial
        window.addEventListener("scroll", update,  { passive: true });
        window.addEventListener("resize", update, { passive: true });
        return () => {
            window.removeEventListener("scroll",  update);
            window.removeEventListener("resize", update);
        };
    }, [anchor]);

    /* ── 2. fade layer in/out with intersection observer ──────────────────── */
    useEffect(() => {
        const hero = anchor.current;
        if (!hero) return;
        const io = new IntersectionObserver(
            ([e]) => (mount.current!.style.opacity = e.isIntersecting ? "1" : "0"),
            { threshold: 0 }
        );
        io.observe(hero);
        return () => io.disconnect();
    }, [anchor]);

    /* ── 3. parallax shift on pointermove (optional) ───────────────────────── */
    useEffect(() => {
        const layer = mount.current!;
        const move  = (e: MouseEvent) => {
            const { innerWidth:w, innerHeight:h } = window;
            const x = (e.clientX / w) * 2 - 1;
            const y = (e.clientY / h) * 2 - 1;
            layer.style.transform = `translate3d(${x * parallax}px,${y * parallax}px,0)`;
        };
        window.addEventListener("pointermove", move);
        return () => window.removeEventListener("pointermove", move);
    }, [parallax]);

    /* ── render gradient background into the portal ─────────────────────────────────── */
    return createPortal(
        <div className="w-full h-full bg-gradient-to-br from-purple-900/20 via-blue-900/30 to-teal-900/20 animate-pulse" />, 
        mount.current
    );
}
