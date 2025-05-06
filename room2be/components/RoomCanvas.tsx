'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import CameraController from './CameraController';
import CameraButtons from './CameraButtons';
import Room from './Room';
import Furniture from './Furniture';
import DistanceIndicators from './DistanceIndicator';

export default function RoomCanvas() {
  return (
    <div className='relative w-full h-screen'>
      <Canvas shadows camera={{ position: [0, 5, 7], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={0.5} />

        <CameraController />

        <OrbitControls
          enableRotate={false}
          enableZoom={false}
          enablePan={false}
        />

        <Room />

        {/* 테스트용 가구 */}
        <Furniture id='bed-1' type='bed' position={[-2, 0.25, 1]} />
        <Furniture id='desk-1' type='desk' position={[2, 0.25, -1]} />
        <DistanceIndicators />
      </Canvas>

      <CameraButtons />
    </div>
  );
}
