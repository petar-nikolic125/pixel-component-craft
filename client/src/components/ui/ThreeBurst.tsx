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
   Helper – material component that gently hue-shifts & pulses
────────────────────────────────────────────────────────────── */
function PulsingMaterial({ color }: { color: string }) {
    const materialRef = useRef<any>(null);
    
    useFrame(({ clock }) => {
        if (materialRef.current) {
            const t = clock.elapsedTime * 0.2;
            materialRef.current.color.offsetHSL(0.00025, 0, 0);
            materialRef.current.emissiveIntensity = 0.35 + Math.sin(t * 6) * 0.25;
        }
        invalidate(); // keep frameloop="demand" ticking
    });

    return (
        <meshStandardMaterial
            ref={materialRef}
            color={color}
            metalness={0.95}
            roughness={0.05}
            emissive={color}
            emissiveIntensity={0.4}
            toneMapped={false}
        />
    );
}

/* ────────────────────────────────────────────────────────────
   Invisible bright sphere that drives God-Rays
────────────────────────────────────────────────────────────── */
function SunLight() {
    return (
        <Sphere
            args={[1, 16, 16]}
            position={[0, 4, -6]}
            name="SunLight" // ← must be named so EffectComposer can find it
        >
            <meshStandardMaterial
                color="#ffffff"
                emissive="#ffffff"
                emissiveIntensity={5}
                transparent={true}
                opacity={0}
            />
        </Sphere>
    );
}

/* ────────────────────────────────────────────────────────────
   Constellation of juicy shapes
────────────────────────────────────────────────────────────── */
function Cluster() {
    return (
        <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.2}>
            {/* front trio */}
            <Icosahedron args={[1.8]} position={[-5, 3, -4]}>
                <PulsingMaterial color="#ff41ff" />
            </Icosahedron>
            <TorusKnot args={[1.2, 0.4, 256, 64]} position={[4.5, -2.5, -3]}>
                <PulsingMaterial color="#00e0ff" />
            </TorusKnot>
            <RoundedBox args={[2.3, 2.3, 0.5]} radius={0.25} position={[0, 1.5, -7]}>
                <PulsingMaterial color="#ffb300" />
            </RoundedBox>

            {/* rear swarm */}
            <group rotation-y={Math.PI / 6}>
                <Tetrahedron args={[1.1]} position={[7, 5, -11]}>
                    <PulsingMaterial color="#3aff9c" />
                </Tetrahedron>
                <Icosahedron args={[0.9]} position={[-6.5, -4.5, -10]}>
                    <PulsingMaterial color="#ff36a1" />
                </Icosahedron>
                <Cone args={[1.2, 2.4, 24]} position={[2, -6, -9]}>
                    <PulsingMaterial color="#00e0ff" />
                </Cone>
                <Cone args={[0.7, 1.4, 18]} position={[0, 6, -10]}>
                    <PulsingMaterial color="#ff41ff" />
                </Cone>
                <Sphere args={[0.8, 32, 32]} position={[-2, 1, -11]}>
                    <PulsingMaterial color="#3aff9c" />
                </Sphere>
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
