'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Model2 from '@/components/Model/Model2';

const Scene2: React.FC = () => {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 75 }}
        onCreated={({ camera }) => {
          camera.lookAt(0, 0, 0);
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />

        <Suspense fallback={null}>
          <Model2 />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene2;
