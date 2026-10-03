import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Decal, Float, Preload, useTexture } from '@react-three/drei';

import CanvasLoader from '../Loader';

// เบราว์เซอร์จำกัด WebGL context ไว้ราว 16 ตัวต่อหน้า และตัวที่เก่าที่สุดจะถูกตัดทิ้งเมื่อเกิน
// เดิมลูกบอลแต่ละลูกใช้ canvas ของตัวเอง พอเพิ่มเทคโนโลยีจนเกินเพดาน โมเดลใน Hero จึงหายไป
// จึงรวมลูกบอลทั้งหมดไว้ใน canvas เดียว เพิ่มเทคโนโลยีได้โดยไม่กระทบส่วนอื่น
const SPACING = 3.2; // ระยะห่างระหว่างลูกบอล (world units)
const ZOOM = 42; // 1 world unit ≈ 42px

// ลากหมุนได้ทีละลูกเหมือนเดิม (ของเดิมใช้ OrbitControls ต่อลูก ซึ่งต้องมี canvas ต่อลูกด้วย)
const Ball = ({ imgUrl, position }) => {
  const [decal] = useTexture([imgUrl]);
  const spin = useRef();
  const last = useRef(null);

  const onPointerMove = useCallback((e) => {
    if (!last.current || !spin.current) return;
    spin.current.rotation.y += (e.clientX - last.current.x) * 0.01;
    spin.current.rotation.x += (e.clientY - last.current.y) * 0.01;
    last.current = { x: e.clientX, y: e.clientY };
  }, []);

  const endDrag = useCallback(() => {
    last.current = null;
    document.body.style.cursor = 'auto';
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', endDrag);
  }, [onPointerMove]);

  const startDrag = (e) => {
    e.stopPropagation(); // ลากลูกที่กดเท่านั้น ไม่ลามไปลูกที่อยู่ข้างหลัง
    last.current = { x: e.clientX, y: e.clientY };
    document.body.style.cursor = 'grabbing';
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', endDrag);
  };

  useEffect(() => endDrag, [endDrag]);

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2} position={position}>
      <group
        ref={spin}
        onPointerDown={startDrag}
        onPointerOver={() => { if (!last.current) document.body.style.cursor = 'grab'; }}
        onPointerOut={() => { if (!last.current) document.body.style.cursor = 'auto'; }}
      >
        <mesh castShadow receiveShadow scale={1.35}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial color="#fff8ed" polygonOffset polygonOffsetFactor={-5} flatShading />
          <Decal position={[0, 0, 1]} rotation={[2 * Math.PI, 0, 6.25]} map={decal} />
        </mesh>
      </group>
    </Float>
  );
};

// วัดความกว้างจริงของกรอบ (ไม่ใช่ของหน้าต่าง) เพราะ canvas ถูกจำกัดความกว้างตามการจัดหน้า
// ถ้าคำนวณจากหน้าต่าง ลูกบอลจะล้นออกนอก canvas แล้วถูกตัดขอบบนจอกว้าง
const useContainerWidth = () => {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const update = () => setWidth(el.clientWidth);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, width];
};

const TechBalls = ({ technologies }) => {
  const [wrapperRef, width] = useContainerWidth();
  const slot = SPACING * ZOOM; // ความกว้างต่อ 1 ลูก (px)
  const columns = Math.max(2, Math.min(technologies.length, Math.floor(width / slot) || 2));
  const rows = Math.ceil(technologies.length / columns);

  return (
    <div ref={wrapperRef} className="w-full" style={{ height: rows * slot }}>
      {width > 0 && (
      <Canvas frameloop="always" orthographic camera={{ position: [0, 0, 10], zoom: ZOOM }} gl={{ preserveDrawingBuffer: true }}>
        <ambientLight intensity={0.25} />
        <directionalLight position={[0, 0, 0.05]} />
        <Suspense fallback={<CanvasLoader />}>
          {technologies.map((technology, index) => {
            const row = Math.floor(index / columns);
            const itemsInRow = Math.min(columns, technologies.length - row * columns);
            const col = index % columns;
            const x = (col - (itemsInRow - 1) / 2) * SPACING;
            const y = ((rows - 1) / 2 - row) * SPACING;
            return <Ball key={technology.name} imgUrl={technology.icon} position={[x, y, 0]} />;
          })}
        </Suspense>
        <Preload all />
      </Canvas>
      )}
    </div>
  );
};

export default TechBalls;
