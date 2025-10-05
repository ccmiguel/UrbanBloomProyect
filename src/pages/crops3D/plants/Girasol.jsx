import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

/**
 * 🌻 Girasol estilo voxel — con panel informativo
 * Bloques cúbicos tipo sandbox, animación de viento y datos científicos.
 */
export default function Girasol({ position = [0, 0, 0], scale = 1 }) {
  const ref = useRef();
  const [showInfo, setShowInfo] = useState(false);

  // Datos simulados del girasol
  const info = {
    name: "Girasol",
    taxonomy: "C",
    type: "E",
    Vcmax: 62.8,
    Jmax: 125.3,
    N: 2.5,
    P: 0.31,
    location: { lat: -16.516, lon: -68.118 },
    altitude: 3630,
  };

  // 🌬️ Movimiento suave tipo viento
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = Math.sin(t * 0.4) * 0.1;
      ref.current.position.y = Math.sin(t * 1) * 0.02;
    }
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      {/* --- Tallo --- */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[0.15, 1.0, 0.15]} />
        <meshStandardMaterial color="#388E3C" />
      </mesh>

      {/* --- Hojas laterales --- */}
      <Leaf position={[0.25, 0.3, 0]} color="#43A047" />
      <Leaf position={[-0.25, 0.3, 0]} color="#43A047" />

      {/* --- Cabeza del girasol --- */}
      <mesh position={[0, 1.1, 0]}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>

      {/* --- Pétalos --- */}
      <Petal position={[0.45, 1.1, 0]} />
      <Petal position={[-0.45, 1.1, 0]} />
      <Petal position={[0, 1.1, 0.45]} />
      <Petal position={[0, 1.1, -0.45]} />
      <Petal position={[0.32, 1.1, 0.32]} />
      <Petal position={[-0.32, 1.1, -0.32]} />
      <Petal position={[0.32, 1.1, -0.32]} />
      <Petal position={[-0.32, 1.1, 0.32]} />

      {/* --- Panel informativo interactivo --- */}
      <Html position={[0, 1.6, 0]} center>
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
              <b>🌻 {info.name}</b>
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
              <b>Vcmax:</b> {info.Vcmax} &nbsp;&nbsp; <b>Jmax:</b> {info.Jmax}
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

/* --- Pétalo voxel --- */
function Petal({ position }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[0.25, 0.25, 0.1]} />
      <meshStandardMaterial color="#FFEB3B" />
    </mesh>
  );
}
