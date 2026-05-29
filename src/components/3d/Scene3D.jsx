import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, TorusKnot, Float, Environment } from '@react-three/drei';
import { useRef } from 'react';
import ParticleField from './ParticleField';
import { useTheme } from '../../contexts/ThemeContext';

function Core() {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <TorusKnot ref={meshRef} args={[1.2, 0.3, 200, 32]} scale={1.5}>
        <meshStandardMaterial color="#8b5cf6" emissive="#4c1d95" emissiveIntensity={0.8} metalness={0.9} roughness={0.2} />
      </TorusKnot>
    </Float>
  );
}

function GlowingSphere() {
  return (
    <Sphere args={[0.8, 64, 64]}>
      <meshStandardMaterial color="#3b82f6" emissive="#1e3a8a" emissiveIntensity={1.2} metalness={0.7} roughness={0.1} />
    </Sphere>
  );
}

export default function Scene3D() {
  const { darkMode } = useTheme();
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <ambientLight intensity={darkMode ? 0.3 : 0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-5, -5, 5]} intensity={0.5} color="#8b5cf6" />
        <GlowingSphere />
        <Core />
        <ParticleField />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} enableDamping />
        <Environment preset="night" background={false} />
      </Canvas>
    </div>
  );
}