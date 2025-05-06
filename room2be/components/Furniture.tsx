'use client';

import { useRef, useEffect } from 'react';
import { Mesh } from 'three';
import { useDrag } from '@/features/simulator/useDrag';
import { useFurnitureStore } from '@/features/simulator/usefurnitureStore';

type Props = {
  id: string;
  type: 'bed' | 'desk';
  position: [number, number, number];
};

export default function Furniture({ id, type, position }: Props) {
  const ref = useRef<Mesh>(null);
  const update = useFurnitureStore((s) => s.updatePosition);
  useDrag(ref, id);

  useEffect(() => {
    update(id, position);
  }, [id, position]);

  const size: [number, number, number] = type === 'bed' ? [2, 0.5, 1] : [1.5, 0.5, 0.8];
  const color = type === 'bed' ? '#a0c4ff' : '#ffafcc';

  return (
    <mesh ref={ref} position={position} castShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
