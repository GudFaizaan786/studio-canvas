import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import { Float, Icosahedron, Torus } from "@react-three/drei";
import * as THREE from "three";

/** Detects small screens / reduced motion once per render tree. */
export const useLowPower = () => {
  return useMemo(() => {
    if (typeof window === "undefined") return true;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 768px)").matches;
    return reduced || small;
  }, []);
};

const GREEN = "#8ce838";
const CYAN = "#28d3e8";

function Particles({ count, radius }: { count: number; radius: number }) {
  const ref = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = radius * (0.75 + Math.random() * 0.65);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.cos(phi) * 0.75;
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return geo;
  }, [count, radius]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.06;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
  });

  return (
    <points ref={ref} geometry={geometry}>

      <pointsMaterial
        size={0.035}
        color={GREEN}
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function CoreObject({ lowPower, scale = 1 }: { lowPower: boolean; scale?: number }) {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.18;
    if (!lowPower) {
      const { x, y } = state.pointer;
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, y * 0.25, 0.05);
      group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, x * 0.35, 0.05);
    }
    if (shell.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 0.9) * 0.02;
      shell.current.scale.setScalar(s);
    }
  });

  const ringProps: ThreeElements["mesh"][] = [
    { rotation: [Math.PI / 2.2, 0, 0] },
    { rotation: [Math.PI / 1.7, Math.PI / 3, 0] },
    { rotation: [Math.PI / 2.8, -Math.PI / 2.4, 0] },
  ];

  return (
    <group ref={group} scale={scale}>
      {/* inner energy core */}
      <Icosahedron args={[0.85, 1]}>
        <meshStandardMaterial
          color={GREEN}
          emissive={GREEN}
          emissiveIntensity={1.1}
          roughness={0.25}
          metalness={0.1}
          flatShading
        />
      </Icosahedron>

      {/* molecular shell */}
      <Icosahedron ref={shell} args={[1.5, lowPower ? 1 : 2]}>
        <meshBasicMaterial color={GREEN} wireframe transparent opacity={0.35} />
      </Icosahedron>

      {/* leaf-like outer lattice */}
      <Icosahedron args={[2.15, 1]}>
        <meshBasicMaterial color={CYAN} wireframe transparent opacity={0.16} />
      </Icosahedron>

      {/* circular data rings */}
      {ringProps.map((p, i) => (
        <Torus key={i} args={[2.5 + i * 0.28, 0.008, 8, 96]} {...p}>
          <meshBasicMaterial color={i === 1 ? CYAN : GREEN} transparent opacity={0.5} />
        </Torus>
      ))}

      {/* orbiting nodes */}
      {!lowPower &&
        Array.from({ length: 6 }).map((_, i) => {
          const a = (i / 6) * Math.PI * 2;
          return (
            <Float key={i} speed={1.4} floatIntensity={0.6} rotationIntensity={0.4}>
              <mesh position={[Math.cos(a) * 2.6, Math.sin(a * 1.7) * 0.9, Math.sin(a) * 2.6]}>
                <sphereGeometry args={[0.055, 12, 12]} />
                <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={2} />
              </mesh>
            </Float>
          );
        })}

      <Particles count={lowPower ? 220 : 700} radius={3.4} />
    </group>
  );
}

type Props = {
  className?: string;
  scale?: number;
  /** Visual density preset */
  compact?: boolean;
};

/**
 * THE GRASS CORE — the recurring brand motif.
 * Organic geometry + neural lattice + circular data rings + particles.
 */
const GrassCore = ({ className, scale = 1, compact = false }: Props) => {
  const lowPower = useLowPower();

  return (
    <div className={className} aria-hidden="true">
      <Canvas
        dpr={lowPower ? [1, 1.25] : [1, 1.8]}
        camera={{ position: [0, 0, compact ? 8 : 7.2], fov: 45 }}
        gl={{ antialias: !lowPower, powerPreference: "high-performance" }}
        frameloop={lowPower ? "demand" : "always"}
      >
        <color attach="background" args={["#0a0f0c"]} />
        <fog attach="fog" args={["#0a0f0c", 8, 16]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[4, 4, 6]} intensity={40} color={GREEN} />
        <pointLight position={[-5, -3, -4]} intensity={25} color={CYAN} />
        <Suspense fallback={null}>
          <CoreObject lowPower={lowPower} scale={scale} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default GrassCore;
