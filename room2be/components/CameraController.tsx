'use client';

import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { useViewStore } from '@/features/simulator/viewStore';

export default function CameraController() {
  const { camera } = useThree();
  const angle = useViewStore((s) => s.angle);

  useEffect(() => {
    if (angle === -1) {
      // ✅ 탑뷰: 위에서 내려다보는 시점
      camera.position.set(0, 10, 0.01); // z=0이면 lookAt이 안 먹어서 0.01
      camera.lookAt(0, 0, 0);
    } else {
      // ✅ 일반 회전 (수평 회전)
      const r = 7;
      const rad = (angle * Math.PI) / 180;
      camera.position.set(r * Math.sin(rad), 5, r * Math.cos(rad));
      camera.lookAt(0, 0, 0);
    }
  }, [angle]);

  return null;
}
