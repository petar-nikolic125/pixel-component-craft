/* ===========================================================================
 *  ThreeBurst – OVERKILL Edition (stable)
 *  ---------------------------------------------------------------------------
 *  – 9-shape constellation with drifting HSL-shift & emissive pulse
 *  – Optional Bloom + God-Rays (?ENABLE_POST in URL)
 *  – Infinite holographic grid
 *  – Runs on-demand (frameloop = "demand" + invalidate)
 * ==========================================================================*/

import {
    Canvas,
    useThree,
    useFrame,
    invalidate,
} from "@react-three/fiber";
import {
    Environment,
    Float,
    RoundedBox,
    Icosahedron,
    TorusKnot,
    Sphere,
    Cone,
    Tetrahedron,
    Grid,
} from "@react-three/drei";
import { EffectComposer, Bloom, GodRays } from "@react-three/postprocessing";
import { MeshStandardMaterial, Color, Mesh } from "three";
import { useRef, useMemo, useState, Suspense } from "react";

/* ────────────────────────────────────────────────────────────
   Helper – material that gently hue-shifts & pulses
────────────────────────────────────────────────────────────── */
function usePulsingMaterial(base: string) {
    const mat = useMemo(
        () =>
            new MeshStandardMaterial({
                color: new Color(base),
                metalness: 0.95,
                roughness: 0.05,
                emissive: new Color(base),
                emissiveIntensity: 0.4,
                toneMapped: false,
            }),
        [base]
    );

    useFrame(({ clock }) => {
        const t = clock.elapsedTime * 0.2;
        mat.color.offsetHSL(0.00025, 0, 0);
        mat.emissiveIntensity = 0.35 + Math.sin(t * 6) * 0.25;
        invalidate(); // keep frameloop="demand" ticking
    });

    return mat;
}

/* ────────────────────────────────────────────────────────────
   Invisible bright sphere that drives God-Rays
────────────────────────────────────────────────────────────── */
function SunLight() {
    const mat = useMemo(
        () =>
            new MeshStandardMaterial({
                color: "#ffffff",
                emissive: "#ffffff",
                emissiveIntensity: 5,
                transparent: true,
                opacity: 0,
            }),
        []
    );

    return (
        <Sphere
            args={[1, 16, 16]}
            position={[0, 4, -6]}
            material={mat}
            name="SunLight" // ← must be named so EffectComposer can find it
        />
    );
}

/* ────────────────────────────────────────────────────────────
   Constellation of juicy shapes
────────────────────────────────────────────────────────────── */
function Cluster() {
    const pink    = usePulsingMaterial("#ff41ff");
    const cyan    = usePulsingMaterial("#00e0ff");
    const gold    = usePulsingMaterial("#ffb300");
    const emerald = usePulsingMaterial("#3aff9c");
    const magenta = usePulsingMaterial("#ff36a1");

    return (
        <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.2}>
            {/* front trio */}
            <Icosahedron  args={[1.8]}               material={pink}    position={[-5,  3, -4]} />
            <TorusKnot    args={[1.2, 0.4, 256, 64]} material={cyan}    position={[ 4.5,-2.5,-3]} />
            <RoundedBox   args={[2.3, 2.3, 0.5]}     radius={0.25}      material={gold}   position={[ 0, 1.5,-7]} />

            {/* rear swarm */}
            <group rotation-y={Math.PI / 6}>
                <Tetrahedron args={[1.1]}   material={emerald} position={[ 7,  5,-11]} />
                <Icosahedron args={[0.9]}   material={magenta} position={[-6.5,-4.5,-10]} />
                <Cone        args={[1.2,2.4,24]} material={cyan}    position={[ 2,-6,-9]} />
                <Cone        args={[0.7,1.4,18]} material={pink}    position={[ 0, 6,-10]} />
                <Sphere      args={[0.8,32,32]} material={emerald} position={[-2, 1,-11]} />
            </group>
        </Float>
    );
}

/* ────────────────────────────────────────────────────────────
   Post-processing wrapper
────────────────────────────────────────────────────────────── */
function Effects() {
    const { scene }  = useThree();
    const sun        = scene.getObjectByName("SunLight") as Mesh | undefined;
    const enablePost = new URLSearchParams(location.search).has("ENABLE_POST");

    if (!sun || !enablePost) return null;

    return (
        <EffectComposer multisampling={4}>
            <Bloom
                mipmapBlur
                intensity={0.9}
                luminanceThreshold={0.35}
                radius={0.85}
            />
            <GodRays
                sun={sun}
                samples={60}
                density={0.9}
                decay={0.96}
                weight={0.6}
                exposure={0.3}
                clampMax={0.95}
            />
        </EffectComposer>
    );
}

/* ────────────────────────────────────────────────────────────
   Main export
────────────────────────────────────────────────────────────── */
export default function ThreeBurst() {
    /* cap DPR to 2 for perf; still retina-ish */
    const [dpr] = useState(() => Math.min(window.devicePixelRatio, 2));

    return (
        <Canvas
            dpr={dpr}
            gl={{ preserveDrawingBuffer: true }}   // mitigates rare WebGL context loss
            frameloop="demand"
            camera={{ position: [0, 0, 18], fov: 45 }}
            className="fixed inset-0 pointer-events-none z-0 select-none"
        >
            <Suspense fallback={null}>
                <Environment preset="warehouse" />

                <Cluster />
                <SunLight />

                {/* ground-plane holographic grid */}
                <Grid
                    args={[60, 60]}
                    sectionColor="#222"
                    sectionThickness={0.6}
                    cellSize={1}
                    cellThickness={0.3}
                    cellColor="#181818"
                    position={[0, -8.01, 0]}
                    rotation={[Math.PI / 2, 0, 0]}
                    fadeDistance={30}
                    infiniteGrid
                />

                <Effects />
            </Suspense>
        </Canvas>
    );
}
