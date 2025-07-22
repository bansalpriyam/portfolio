import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, MeshDistortMaterial, Sphere, Box, Torus } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.3;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 100, 200]} scale={2}>
        <MeshDistortMaterial
          color="#3B82F6"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.4}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
};

const MorphingInitials = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <Text
          font="/fonts/inter-bold.woff"
          fontSize={0.8}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          position={[-1, 0, 0]}
        >
          P
        </Text>
        <Text
          font="/fonts/inter-bold.woff"
          fontSize={0.8}
          color="#8B5CF6"
          anchorX="center"
          anchorY="middle"
          position={[1, 0, 0]}
        >
          B
        </Text>
      </Float>
    </group>
  );
};

const RotatingObjects = () => {
  const torusRef = useRef<THREE.Mesh>(null);
  const boxRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (torusRef.current) {
      torusRef.current.rotation.x += 0.01;
      torusRef.current.rotation.y += 0.02;
      torusRef.current.position.x = Math.sin(state.clock.elapsedTime) * 3;
    }
    if (boxRef.current) {
      boxRef.current.rotation.x += 0.02;
      boxRef.current.rotation.z += 0.01;
      boxRef.current.position.x = Math.cos(state.clock.elapsedTime) * -3;
    }
  });

  return (
    <>
      <Torus ref={torusRef} args={[0.5, 0.2, 16, 100]} position={[3, 1, -2]}>
        <meshStandardMaterial color="#10B981" wireframe />
      </Torus>
      <Box ref={boxRef} args={[0.8, 0.8, 0.8]} position={[-3, -1, -2]}>
        <meshStandardMaterial color="#F59E0B" />
      </Box>
    </>
  );
};

export const ThreeHero: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8B5CF6" />
        <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.5} />
        
        <AnimatedSphere />
        <MorphingInitials />
        <RotatingObjects />
      </Canvas>
    </div>
  );
};