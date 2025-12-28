'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Desk Component
function Desk({ position }: { position: [number, number, number] }) {
    return (
        <group position={position}>
            {/* Desk top */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[3, 0.1, 1.5]} />
                <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.8} />
            </mesh>

            {/* Desk legs */}
            {[[-1.3, -0.4, 0.5], [1.3, -0.4, 0.5], [-1.3, -0.4, -0.5], [1.3, -0.4, -0.5]].map((pos, i) => (
                <mesh key={i} position={pos as [number, number, number]}>
                    <boxGeometry args={[0.1, 0.7, 0.1]} />
                    <meshStandardMaterial color="#0a0a0a" roughness={0.5} metalness={0.9} />
                </mesh>
            ))}

            {/* Monitor */}
            <group position={[0, 0.5, -0.3]}>
                <mesh>
                    <boxGeometry args={[1.2, 0.7, 0.05]} />
                    <meshStandardMaterial color="#050505" roughness={0.1} metalness={0.9} />
                </mesh>
                {/* Screen glow */}
                <mesh position={[0, 0, 0.03]}>
                    <planeGeometry args={[1.1, 0.6]} />
                    <meshBasicMaterial color="#101020" />
                </mesh>
                {/* Stand */}
                <mesh position={[0, -0.45, 0.2]}>
                    <boxGeometry args={[0.3, 0.1, 0.3]} />
                    <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.9} />
                </mesh>
            </group>

            {/* Keyboard */}
            <mesh position={[0, 0.08, 0.3]}>
                <boxGeometry args={[0.6, 0.03, 0.2]} />
                <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.7} />
            </mesh>
        </group>
    );
}

// Plant Component
function Plant({ position }: { position: [number, number, number] }) {
    return (
        <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.1}>
            <group position={position}>
                {/* Pot */}
                <mesh position={[0, -0.15, 0]}>
                    <cylinderGeometry args={[0.15, 0.12, 0.3, 16]} />
                    <meshStandardMaterial color="#2a2a2a" roughness={0.6} />
                </mesh>

                {/* Plant leaves */}
                {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                    <mesh
                        key={i}
                        position={[
                            Math.cos(angle * Math.PI / 180) * 0.1,
                            0.1 + i * 0.05,
                            Math.sin(angle * Math.PI / 180) * 0.1
                        ]}
                        rotation={[0.3, angle * Math.PI / 180, 0.2]}
                    >
                        <planeGeometry args={[0.15, 0.3]} />
                        <meshStandardMaterial
                            color="#1a3a1a"
                            roughness={0.8}
                            side={THREE.DoubleSide}
                        />
                    </mesh>
                ))}
            </group>
        </Float>
    );
}

// Floating Geometric Accent
function FloatingShape({ position, color = '#D4AF37' }: { position: [number, number, number]; color?: string }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
        }
    });

    return (
        <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5}>
            <mesh ref={meshRef} position={position}>
                <octahedronGeometry args={[0.2]} />
                <meshStandardMaterial
                    color={color}
                    roughness={0.2}
                    metalness={1}
                    emissive={color}
                    emissiveIntensity={0.1}
                />
            </mesh>
        </Float>
    );
}

// Window with light
function Window({ position }: { position: [number, number, number] }) {
    return (
        <group position={position}>
            {/* Window frame */}
            <mesh>
                <boxGeometry args={[2, 3, 0.1]} />
                <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
            </mesh>

            {/* Window glass (light source) */}
            <mesh position={[0, 0, -0.05]}>
                <planeGeometry args={[1.8, 2.8]} />
                <meshBasicMaterial color="#1a1a2a" />
            </mesh>

            {/* Window blinds effect */}
            {[-0.9, -0.3, 0.3, 0.9].map((y, i) => (
                <mesh key={i} position={[0, y, 0.06]}>
                    <boxGeometry args={[1.8, 0.02, 0.02]} />
                    <meshStandardMaterial color="#2a2a2a" />
                </mesh>
            ))}
        </group>
    );
}

// Mouse-controlled camera
function CameraController() {
    const { camera } = useThree();
    const mouse = useRef({ x: 0, y: 0 });
    const targetPosition = useRef({ x: 0, y: 1, z: 5 });

    useFrame(() => {
        // Smooth camera movement based on mouse position
        const targetX = mouse.current.x * 1.5;
        const targetY = 1 + mouse.current.y * 0.8;

        camera.position.x += (targetX - camera.position.x) * 0.05;
        camera.position.y += (targetY - camera.position.y) * 0.05;
        camera.lookAt(0, 0.5, 0);
    });

    // Update mouse position from window events
    if (typeof window !== 'undefined') {
        const handleMouseMove = (e: MouseEvent) => {
            mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
            mouse.current.y = (e.clientY / window.innerHeight - 0.5) * -2;
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('mousemove', handleMouseMove);
        }
    }

    return null;
}

// Main Office Scene
function OfficeScene() {
    return (
        <>
            {/* Lighting */}
            <ambientLight intensity={0.15} />
            <directionalLight position={[5, 5, 5]} intensity={0.4} castShadow />
            <pointLight position={[-3, 2, 2]} intensity={0.3} color="#D4AF37" />
            <spotLight
                position={[0, 4, 2]}
                angle={0.5}
                penumbra={1}
                intensity={0.5}
                castShadow
            />

            {/* Floor with reflection */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.75, 0]}>
                <planeGeometry args={[20, 20]} />
                <MeshReflectorMaterial
                    blur={[300, 100]}
                    resolution={1024}
                    mixBlur={1}
                    mixStrength={50}
                    roughness={1}
                    depthScale={1.2}
                    minDepthThreshold={0.4}
                    maxDepthThreshold={1.4}
                    color="#050505"
                    metalness={0.5}
                    mirror={0.5}
                />
            </mesh>

            {/* Back wall */}
            <mesh position={[0, 1.5, -4]}>
                <planeGeometry args={[12, 6]} />
                <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
            </mesh>

            {/* Desk setup */}
            <Desk position={[0, 0, 0]} />

            {/* Plants */}
            <Plant position={[-2, 0, 1]} />
            <Plant position={[2.5, 0, -1]} />

            {/* Window */}
            <Window position={[-4, 1.5, -2]} />

            {/* Floating accents */}
            <FloatingShape position={[2, 2, -1]} color="#D4AF37" />
            <FloatingShape position={[-2, 1.5, 1]} color="#FF3333" />
            <FloatingShape position={[3, 1, -2]} color="#E0E0E0" />

            {/* Camera controller */}
            <CameraController />
        </>
    );
}

// Office Scene Wrapper
export default function OfficeSceneComponent({ className }: { className?: string }) {
    return (
        <div className={className} style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <Canvas
                camera={{ position: [0, 1, 5], fov: 50 }}
                dpr={[1, 1.5]}
                shadows
                gl={{
                    antialias: true,
                    alpha: false,
                    powerPreference: 'high-performance',
                }}
                onCreated={({ gl }) => {
                    gl.setClearColor('#050505');
                }}
                style={{ background: '#050505' }}
            >
                <OfficeScene />
            </Canvas>
        </div>
    );
}
