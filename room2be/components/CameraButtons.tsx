'use client';

import { useViewStore } from '@/features/simulator/viewStore';

export default function CameraButtons() {
  const angle = useViewStore((s) => s.angle);
  const setAngle = useViewStore((s) => s.setAngle);

  return (
    <div className="absolute top-4 right-4 z-10 space-x-2 bg-black/90 text-white px-4 py-3 rounded-md shadow-lg">
      <button
        onClick={() => setAngle((angle + 45) % 360)}
        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded text-lg"
      >
        ↩ 회전
      </button>
      <button
        onClick={() => setAngle(-1)} // ✅ 진짜 탑뷰는 특별 값 -1
        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded text-lg"
      >
        🔼 탑 뷰
      </button>
      <button
        onClick={() => setAngle(0)}
        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded text-lg"
      >
        🎯 초기화
      </button>
    </div>
  );
}
