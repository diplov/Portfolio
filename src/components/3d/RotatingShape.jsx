import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, TorusKnot } from '@react-three/drei';
import { useTheme } from '../../contexts/ThemeContext';

const RotatingShape = () => {
  const groupRef = useRef();
  const torusRef = useRef();
  const { darkMode } = useTheme();

  // Colors for dark and light mode
  const colors = darkMode
    ? {
        sphereColor: '#3B82F6',
        sphereEmissive: '#1E40AF',
        torusColor: '#8B5CF6',
        torusEmissive: '#6D28D9',
        particleColor: '#60A5FA',
      }
    : {
        sphereColor: '#0055cc',      // vibrant blue
        sphereEmissive: '#003380',   // darker for emissive
        torusColor: '#7700cc',       // bright purple
        torusEmissive: '#440088',
        particleColor: '#0088ff',
      };

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.2;
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x = clock.getElapsedTime() * 0.5;
      torusRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={darkMode ? 0.5 : 0.8} />
      <pointLight position={[10, 10, 10]} intensity={darkMode ? 1 : 1.5} />
      <pointLight position={[-10, -10, -10]} intensity={darkMode ? 0.5 : 0.8} color={darkMode ? '#3B82F6' : '#0055cc'} />

      {/* Central sphere */}
      <Sphere args={[1, 64, 64]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color={colors.sphereColor}
          emissive={colors.sphereEmissive}
          emissiveIntensity={darkMode ? 0.8 : 1.2}
          metalness={0.8}
          roughness={0.2}
        />
      </Sphere>

      {/* Rotating torus knot */}
      <TorusKnot ref={torusRef} args={[1.5, 0.3, 128, 32, 3, 4]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color={colors.torusColor}
          emissive={colors.torusEmissive}
          emissiveIntensity={darkMode ? 0.5 : 0.9}
          metalness={0.9}
          roughness={0.1}
        />
      </TorusKnot>

      {/* Floating particles */}
      {[...Array(50)].map((_, i) => {
        const angle = (i / 50) * Math.PI * 2;
        const radius = 2.5;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * radius, Math.sin(angle * 2) * 1.5, Math.sin(angle) * radius]}
          >
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial
              color={colors.particleColor}
              emissive={colors.particleColor}
              emissiveIntensity={darkMode ? 0.3 : 0.6}
            />
          </mesh>
        );
      })}
    </group>
  );
};

export default RotatingShape;