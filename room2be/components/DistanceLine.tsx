// components/DistanceLine.tsx
'use client';

import { Line, Text } from '@react-three/drei';
import { Vector3 } from 'three';

type Props = {
  from: [number, number, number];
  to: [number, number, number];
};

export default function DistanceLine({ from, to }: Props) {
  const start = new Vector3(...from);
  const end = new Vector3(...to);
  const distance = start.distanceTo(end);
  const mid = start.clone().lerp(end, 0.5);

  return (
    <>
      <Line points={[from, to]} color='black' lineWidth={1} dashed />
      <Text
        position={[mid.x, mid.y + 0.2, mid.z]}
        fontSize={0.2}
        color='black'
        anchorX='center'
        anchorY='middle'
      >
        {Math.round(distance * 100)}cm
      </Text>
    </>
  );
}
