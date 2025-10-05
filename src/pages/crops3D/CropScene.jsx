// npm install three @react-three/fiber @react-three/drei
// aqui tiene que comenzar todo

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Lighting from "./Lighting";
import PlantModal from "./PlantModal";
import { SAMPLE_PLANTS } from "./SAMPLE_PLANTS";

// Plantas (sin Lechuga)
import Ajo from "./plants/Ajo";
import Albahaca from "./plants/Albahaca";
import Cebolla from "./plants/Cebolla";
import Girasol from "./plants/Girasol";
import Naranjo from "./plants/Naranjo";
import Pimiento from "./plants/Pimiento";
import Sandia from "./plants/Sandia";
import Tomate from "./plants/Tomate";
import Zanahoria from "./plants/Zanahoria";

// --- Lista de componentes disponibles ---
const plantComponents = [
  Ajo,
  Albahaca,
  Cebolla,
  Girasol,
  Naranjo,
  Pimiento,
  Sandia,
  Tomate,
  Zanahoria,
];

// --- Suelo tipo ajedrez ---
function Ground({ size = 16 }) {
  const tiles = [];
  const half = size / 2;
  for (let x = -half; x < half; x++) {
    for (let z = -half; z < half; z++) {
      const isDark = (x + z) % 2 === 0;
      tiles.push(
        <mesh key={`${x}-${z}`} position={[x, -0.25, z]} receiveShadow>
          <boxGeometry args={[1, 0.4, 1]} />
          <meshStandardMaterial color={isDark ? "#8B5A2B" : "#A67C52"} />
        </mesh>
      );
    }
  }
  return <group>{tiles}</group>;
}

export default function CropScene() {
  const [selectedPlant, setSelectedPlant] = useState(null);

  const gridSize = 12;
  const thickness = 3;
  const spacing = 1;
  const half = gridSize / 2 - 0.5;

  const plantInstances = [];

  for (let x = -half; x <= half; x++) {
    for (let z = -half; z <= half; z++) {
      const inUShape =
        z >= half - (thickness - 1) ||
        x <= -half + (thickness - 1) ||
        (x >= half - (thickness - 1) && z <= half - 4);

      if (inUShape) {
        const Plant =
          plantComponents[Math.floor(Math.random() * plantComponents.length)];
        const randomPlant =
          SAMPLE_PLANTS[Math.floor(Math.random() * SAMPLE_PLANTS.length)];

        plantInstances.push(
          <Plant
            key={`${x}-${z}`}
            position={[x * spacing, 0.05, z * spacing]}
            scale={0.9}
            onClick={(r = randomPlant) => setSelectedPlant(r)}
          />
        );
      }
    }
  }

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Canvas camera={{ position: [10, 10, 14], fov: 55 }} shadows>
        {/* --- Luces --- */}
        <Lighting />
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1.1} castShadow />

        {/* --- Terreno --- */}
        <Ground size={gridSize + 2} />

        {/* --- Plantas en forma de U --- */}
        <group>{plantInstances}</group>

        {/* --- Cámara --- */}
        <OrbitControls
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minDistance={6}
          maxDistance={24}
        />
      </Canvas>

      {/* --- Modal con info --- */}
      <PlantModal
        plant={selectedPlant}
        onClose={() => setSelectedPlant(null)}
      />
    </div>
  );
}
