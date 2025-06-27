import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import ThreeBurst from "@/components/ui/ThreeBurst";

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
    const reduce =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small =
        typeof window !== "undefined" &&
        window.matchMedia("(max-width: 640px)").matches;

    if (reduce || small) {
        return (
            <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-br from-purple-900/40 via-sky-900/20 to-purple-900/40" />
        );
    }
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
        if (reduce || small) return;
        const layer = mount.current!;
        const move  = (e: MouseEvent) => {
            const { innerWidth:w, innerHeight:h } = window;
            const x = (e.clientX / w) * 2 - 1;
            const y = (e.clientY / h) * 2 - 1;
            layer.style.transform = `translate3d(${x * parallax}px,${y * parallax}px,0)`;
        };
        window.addEventListener("pointermove", move);
        return () => window.removeEventListener("pointermove", move);
    }, [parallax, reduce, small]);

    /* ── render ThreeBurst into the portal ─────────────────────────────────── */
    return createPortal(<ThreeBurst />, mount.current);
}
