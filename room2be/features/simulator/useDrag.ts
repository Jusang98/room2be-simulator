// 마우스 기반 드래그 처리
import { useEffect } from 'react';
import { Vector2, Raycaster, Plane, Vector3, Object3D } from 'three';
import { useThree } from '@react-three/fiber';
import { useFurnitureStore } from './usefurnitureStore';

export function useDrag(ref: React.RefObject<Object3D | null>, id: string) {
  const { camera, gl } = useThree();
  const mouse = new Vector2();
  const raycaster = new Raycaster();
  const plane = new Plane(new Vector3(0, 1, 0), 0);
  const intersection = new Vector3();

  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      if (!ref.current) return;

      const bounds = gl.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - bounds.left) / bounds.width) * 2 - 1;
      mouse.y = -((e.clientY - bounds.top) / bounds.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(ref.current);
      if (intersects.length > 0) {
        useFurnitureStore.getState().setSelectedId(id);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const store = useFurnitureStore.getState();
      if (store.selectedId !== id || !ref.current) return;

      const bounds = gl.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - bounds.left) / bounds.width) * 2 - 1;
      mouse.y = -((e.clientY - bounds.top) / bounds.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      raycaster.ray.intersectPlane(plane, intersection);

      // 벽 충돌 제한 (가구가 벽 안 뚫도록)
      const size = 1;
      const minX = -5 + size;
      const maxX = 5 - size;
      const minZ = -3 + size;
      const maxZ = 3 - size;

      const x = Math.min(Math.max(intersection.x, minX), maxX);
      const z = Math.min(Math.max(intersection.z, minZ), maxZ);
      const y = ref.current.position.y;

      ref.current.position.set(x, y, z);
      store.updatePosition(id, [x, y, z]);
    };

    const handlePointerUp = () => {
      useFurnitureStore.getState().setSelectedId(null);
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [ref]);
}
