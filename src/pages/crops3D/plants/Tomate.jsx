import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

/**
 * 🍅 Tomate estilo voxel — con panel informativo interactivo
 * Estructura:
 *  - Tallo verde
 *  - Fruto cúbico (voxel tipo esfera)
 *  - Hojas superiores
 *  - Animación tipo viento
 */
export default function Tomate({ position = [0, 0, 0], scale = 1 }) {
  const ref = useRef();
  const [showInfo, setShowInfo] = useState(false);

  // Datos del tomate
  const info = {
    name: "Tomate",
    taxonomy: "C",
    type: "E",
    Vcmax: 61.2,
    Jmax: 130.4,
    N: 2.5,
    P: 0.27,
    location: { lat: -16.516, lon: -68.119 },
    altitude: 3640,
  };

  // 🌬️ Animación de balanceo leve
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) ref.current.rotation.y = Math.sin(t * 0.4) * 0.1;
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      {/* --- Tallo --- */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[0.15, 0.7, 0.15]} />
        <meshStandardMaterial color="#2E7D32" />
      </mesh>

      {/* --- Hojas superiores --- */}
      <Leaf position={[0.2, 0.75, 0]} color="#388E3C" />
      <Leaf position={[-0.2, 0.75, 0]} color="#388E3C" />
      <Leaf position={[0, 0.75, 0.2]} color="#4CAF50" />
      <Leaf position={[0, 0.75, -0.2]} color="#4CAF50" />

      {/* --- Fruto --- */}
      <TomatoVoxel position={[0, 0.45, 0]} />

      {/* --- Panel informativo --- */}
      <Html position={[0, 1.4, 0]} center>
        {showInfo ? (
          <div
            style={{
              background: "#1E293B",
              color: "white",
              padding: "12px 16px",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
              width: "220px",
              fontSize: "12px",
              lineHeight: "1.5em",
              textAlign: "left",
              fontFamily: "Inter, sans-serif",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <b>🍅 {info.name}</b>
              <button
                onClick={() => setShowInfo(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                ✖
              </button>
            </div>
            <p>
              <b>Taxonomía:</b> {info.taxonomy} <br />
              <b>Tipo:</b> {info.type}
            </p>
            <p>
              <b>Vcmax:</b> {info.Vcmax} &nbsp;&nbsp;
              <b>Jmax:</b> {info.Jmax}
            </p>
            <p>
              <b>N:</b> {info.N}% &nbsp;&nbsp; <b>P:</b> {info.P}%
            </p>
            <p>
              <b>Ubicación:</b> {info.location.lat.toFixed(3)}°,{" "}
              {info.location.lon.toFixed(3)}° <br />
              <b>Altitud:</b> {info.altitude} m
            </p>
          </div>
        ) : (
          <div
            onClick={() => setShowInfo(true)}
            style={{
              //background: "rgba(255,255,255,0.9)",
              padding: "10px 10px",
              borderRadius: "6px",
              fontSize: "12px",
              //color: "#333",
              fontWeight: "600",
              //boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            
          </div>
        )}
      </Html>
    </group>
  );
}

/* --- Hoja voxel --- */
function Leaf({ position, color }) {
  return (
    <mesh position={position} castShadow>
      <boxGeometry args={[0.3, 0.1, 0.3]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

/* --- Fruto voxelizado --- */
function TomatoVoxel({ position }) {
  const red = "#E53935";
  const darker = "#C62828";
  return (
    <group position={position}>
      {/* Centro */}
      <Cube pos={[0, 0, 0]} color={red} />
      {/* Capas alrededor */}
      <Cube pos={[0.2, 0, 0]} color={red} />
      <Cube pos={[-0.2, 0, 0]} color={red} />
      <Cube pos={[0, 0, 0.2]} color={red} />
      <Cube pos={[0, 0, -0.2]} color={red} />
      {/* Nivel superior e inferior */}
      <Cube pos={[0, 0.2, 0]} color={darker} />
      <Cube pos={[0, -0.2, 0]} color={darker} />
      {/* Bordes diagonales */}
      <Cube pos={[0.2, 0, 0.2]} color={red} />
      <Cube pos={[-0.2, 0, -0.2]} color={red} />
      <Cube pos={[0.2, 0, -0.2]} color={red} />
      <Cube pos={[-0.2, 0, 0.2]} color={red} />
    </group>
  );
}

/* --- Cubo base --- */
function Cube({ pos, color }) {
  return (
    <mesh position={pos}>
      <boxGeometry args={[0.2, 0.2, 0.2]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
