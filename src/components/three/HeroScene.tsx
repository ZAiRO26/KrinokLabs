'use client';

import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, Preload } from '@react-three/drei';
import * as THREE from 'three';

// Floating Sphere Component
function FloatingSphere({
    position,
    scale = 1,
    color = '#050505',
    speed = 1
}: {
    position: [number, number, number];
    scale?: number;
    color?: string;
    speed?: number;
}) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.2;
            meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.1;
        }
    });

    return (
        <Float
            speed={speed}
            rotationIntensity={0.5}
            floatIntensity={0.5}
            floatingRange={[-0.1, 0.1]}
        >
            <mesh ref={meshRef} position={position} scale={scale}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial
                    color={color}
                    roughness={0.1}
                    metalness={0.9}
                    envMapIntensity={1}
                />
            </mesh>
        </Float>
    );
}

// Gold Accent Ring
function GoldRing({
    position,
    rotation = [0, 0, 0],
    scale = 1
}: {
    position: [number, number, number];
    rotation?: [number, number, number];
    scale?: number;
}) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
        }
    });

    return (
        <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
            <torusGeometry args={[1, 0.02, 16, 64]} />
            <meshStandardMaterial
                color="#D4AF37"
                roughness={0.3}
                metalness={1}
                emissive="#D4AF37"
                emissiveIntensity={0.3}
            />
        </mesh>
    );
}

// Particles for depth
function Particles({ count = 100 }: { count?: number }) {
    const points = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
        }
        return positions;
    }, [count]);

    const pointsRef = useRef<THREE.Points>(null);

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[points, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                color="#D4AF37"
                transparent
                opacity={0.8}
                sizeAttenuation
            />
        </points>
    );
}

// Mouse-reactive camera
function CameraController() {
    const { camera } = useThree();
    const mouse = useRef({ x: 0, y: 0 });

    useFrame(() => {
        // Subtle camera movement based on stored mouse position
        camera.position.x += (mouse.current.x * 0.5 - camera.position.x) * 0.05;
        camera.position.y += (mouse.current.y * 0.3 - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);
    });

    return null;
}

// Main Scene
function Scene() {
    return (
        <>
            {/* Lighting */}
            <ambientLight intensity={0.2} />
            <directionalLight position={[5, 5, 5]} intensity={0.6} />
            <pointLight position={[-5, -5, -5]} intensity={0.4} color="#D4AF37" />

            {/* Simple environment - no preset to avoid loading issues */}
            <color attach="background" args={['#050505']} />

            {/* Dark Spheres */}
            <FloatingSphere position={[-3, 1, -2]} scale={1.5} speed={0.8} />
            <FloatingSphere position={[4, -1, -3]} scale={2} speed={0.6} />
            <FloatingSphere position={[0, 2, -4]} scale={1} speed={1} />
            <FloatingSphere position={[-2, -2, -2]} scale={0.8} speed={1.2} />
            <FloatingSphere position={[3, 1.5, -5]} scale={1.2} speed={0.7} />

            {/* Gold Accent Rings */}
            <GoldRing position={[-4, 0, -3]} scale={2} rotation={[Math.PI / 4, 0, 0]} />
            <GoldRing position={[5, 2, -4]} scale={1.5} rotation={[0, Math.PI / 3, Math.PI / 6]} />
            <GoldRing position={[0, -2, -2]} scale={1} rotation={[Math.PI / 2, 0, 0]} />

            {/* Particles */}
            <Particles count={100} />

            {/* Camera controller */}
            <CameraController />
        </>
    );
}

// Fallback component
function Fallback() {
    return (
        <mesh>
            <planeGeometry args={[20, 20]} />
            <meshBasicMaterial color="#050505" />
        </mesh>
    );
}

// Hero Scene Wrapper with error handling
export default function HeroScene({ className }: { className?: string }) {
    return (
        <div className={className} style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 60 }}
                dpr={[1, 1.5]}
                gl={{
                    antialias: true,
                    alpha: false,
                    powerPreference: 'high-performance',
                    failIfMajorPerformanceCaveat: false,
                }}
                onCreated={({ gl }) => {
                    gl.setClearColor('#050505');
                }}
                style={{ background: '#050505' }}
            >
                <Suspense fallback={<Fallback />}>
                    <Scene />
                    <Preload all />
                </Suspense>
            </Canvas>
        </div>
    );
}
