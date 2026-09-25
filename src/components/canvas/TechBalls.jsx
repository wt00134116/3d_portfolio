import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Decal, Float, Preload, useTexture } from '@react-three/drei';

import CanvasLoader from '../Loader';

// เบราว์เซอร์จำกัด WebGL context ไว้ราว 16 ตัวต่อหน้า และตัวที่เก่าที่สุดจะถูกตัดทิ้งเมื่อเกิน
// เดิมลูกบอลแต่ละลูกใช้ canvas ของตัวเอง พอเพิ่มเทคโนโลยีจนเกินเพดาน โมเดลใน Hero จึงหายไป
// จึงรวมลูกบอลทั้งหมดไว้ใน canvas เดียว เพิ่มเทคโนโลยีได้โดยไม่กระทบส่วนอื่น
const SPACING = 3.2; // ระยะห่างระหว่างลูกบอล (world units)
const ZOOM = 42; // 1 world unit ≈ 42px

const Ball = ({ imgUrl, position }) => {
  const [decal] = useTexture([imgUrl]);

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2} position={position}>
      <mesh castShadow receiveShadow scale={1.35}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#fff8ed" polygonOffset polygonOffsetFactor={-5} flatShading />
        <Decal position={[0, 0, 1]} rotation={[2 * Math.PI, 0, 6.25]} map={decal} />
      </mesh>
    </Float>
  );
};

const useColumns = (count) => {
  const columnsFor = (width) => Math.max(2, Math.min(count, Math.floor(width / 130) || 2));
  const [columns, setColumns] = useState(() =>
    typeof window === 'undefined' ? Math.min(count, 7) : columnsFor(window.innerWidth - 80),
  );

  useEffect(() => {
    const onResize = () => setColumns(columnsFor(window.innerWidth - 80));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  });

  return columns;
};

const TechBalls = ({ technologies }) => {
  const columns = useColumns(technologies.length);
  const rows = Math.ceil(technologies.length / columns);

  return (
    <div className="w-full" style={{ height: rows * SPACING * ZOOM }}>
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
    </div>
  );
};

export default TechBalls;
