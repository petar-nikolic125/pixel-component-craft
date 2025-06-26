import { Canvas } from "@react-three/fiber";
import { Environment, Float, Icosahedron, TorusKnot, RoundedBox } from "@react-three/drei";

export default function ThreeBurst() {
    return (
        <Canvas
            frameloop="demand"
            camera={{ position: [0, 0, 12], fov: 45 }}
            className="fixed inset-0 pointer-events-none z-0"
        >
            {/* soft HDRI for nice reflections */}
            <Environment preset="city" />

            {/* group the shapes and let drei <Float> give subtle drift & rotation */}
            <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                <Icosahedron args={[1.8]} position={[-5, 3, -4]}>
                    <meshStandardMaterial color="#ff00ff" roughness={0.15} metalness={0.8} toneMapped={false} />
                </Icosahedron>

                <TorusKnot args={[1.2, 0.4, 128, 32]} position={[4.5, -2.5, -3]}>
                    <meshStandardMaterial color="#00e0ff" roughness={0.05} metalness={0.9} toneMapped={false} />
                </TorusKnot>

                <RoundedBox args={[2.3, 2.3, 0.5]} radius={0.25} position={[0, 1.5, -6]}>
                    <meshStandardMaterial color="#ffaa00" roughness={0.1} metalness={0.85} toneMapped={false} />
                </RoundedBox>
            </Float>

            {/* a giant faint grid gives “depth” */}
            <gridHelper args={[60, 60, "#222", "#222"]} position={[0, -8, 0]} rotation={[Math.PI / 2, 0, 0]} />
        </Canvas>
    );
}
