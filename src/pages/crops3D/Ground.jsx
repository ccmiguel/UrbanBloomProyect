import { useMemo } from "react";

export default function Ground({ size = 20 }) {
  const tiles = useMemo(() => {
    const arr = [];
    const half = size / 2;
    for (let x = -half; x < half; x++) {
      for (let z = -half; z < half; z++) {
        arr.push([x, 0, z]);
      }
    }
    return arr;
  }, [size]);

  return (
    <group>
      {tiles.map((pos, i) => (
        <mesh key={i} position={pos} receiveShadow>
          <boxGeometry args={[1, 0.4, 1]} />
          <meshStandardMaterial color={i % 2 === 0 ? "#8B5A2B" : "#A67C52"} />
        </mesh>
      ))}
    </group>
  );
}
