// components/Room.tsx
export default function Room() {
  return (
    <>
      {/* 바닥 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 6]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>

      {/* 뒷벽 */}
      <mesh position={[0, 1.5, -3]} receiveShadow>
        <planeGeometry args={[10, 3]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>

      {/* 왼쪽 벽 */}
      <mesh position={[-5, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[6, 3]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
    </>
  );
}
