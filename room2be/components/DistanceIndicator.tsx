'use client';

import { useFurnitureStore } from '@/features/simulator/usefurnitureStore';
import { Line, Text, Billboard } from '@react-three/drei';
import { Vector3 } from 'three';

export default function DistanceIndicators() {
  const { furniture, selectedId } = useFurnitureStore();

  if (!selectedId || !furniture[selectedId]) return null;

  const selected = furniture[selectedId];
  const {
    position: [x, y, z],
  } = selected;

  const lines = [];

  // ✅ 벽과의 거리
  const wallDistances = [
    { from: new Vector3(-5, y, z), to: new Vector3(x, y, z), label: '좌측' },
    { from: new Vector3(5, y, z), to: new Vector3(x, y, z), label: '우측' },
    { from: new Vector3(x, y, -3), to: new Vector3(x, y, z), label: '앞쪽' },
    { from: new Vector3(x, y, 3), to: new Vector3(x, y, z), label: '뒤쪽' },
  ];

  for (const { from, to, label } of wallDistances) {
    const distance = from.distanceTo(to);
    const mid = from.clone().lerp(to, 0.5);
    if (distance > 0.1 && distance < 10) {
      const color = distance < 1.5 ? 'red' : 'black';
      lines.push(
        <group key={`wall-${label}`}>
          <Line
            points={[from.toArray(), to.toArray()]}
            color={color}
            dashed
            dashSize={0.1} // ✅ 점의 길이
            gapSize={0.05} // ✅ 점 사이 간격 (작을수록 촘촘)
          />

          <Billboard>
            <Text
              position={[mid.x, mid.y + 0.15, mid.z]}
              fontSize={0.25} // ✅ 크기 약간 키움
              color={color}
              outlineColor='white' // ✅ 외곽선 추가
              outlineWidth={0.02}
              anchorX='center'
              anchorY='middle'
            >
              {Math.round(distance * 100)}cm
            </Text>
          </Billboard>
        </group>
      );
    }
  }

  // ✅ 다른 가구들과의 거리
  for (const [id, other] of Object.entries(furniture)) {
    if (id === selectedId) continue;
    const from = new Vector3(...other.position);
    const to = new Vector3(x, y, z);
    const distance = from.distanceTo(to);
    const mid = from.clone().lerp(to, 0.5);

    if (distance < 5) {
      const color = distance < 1.5 ? 'red' : 'black';
      lines.push(
        <group key={`to-${id}`}>
          <Line
            points={[from.toArray(), to.toArray()]}
            color={color}
            dashed
            dashSize={0.1} // ✅ 점의 길이
            gapSize={0.05} // ✅ 점 사이 간격 (작을수록 촘촘)
          />

          <Billboard>
            <Text
              position={[mid.x, mid.y + 0.15, mid.z]}
              fontSize={0.25}
              color={color}
              outlineColor='white'
              outlineWidth={0.02}
              anchorX='center'
              anchorY='middle'
            >
              {Math.round(distance * 100)}cm
            </Text>
          </Billboard>
        </group>
      );
    }
  }

  return <>{lines}</>;
}
