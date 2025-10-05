import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

/**
 * 🍊 Naranjo mini voxel — con maceta y panel informativo
 * Diseño coherente con los demás modelos voxel interactivos.
 */
export default function Naranjo({ position = [0, 0, 0], scale = 1 }) {
  const ref = useRef();
  const [showInfo, setShowInfo] = useState(false);

  // Datos de ejemplo del naranjo
  const info = {
    name: "Naranjo Mini",
    taxonomy: "C",
    type: "E",
    Vcmax: 75.3,
    Jmax: 145.8,
    N: 2.7,
    P: 0.29,
    location: { lat: -16.514, lon: -68.122 },
    altitude: 3650,
  };

  // 🌬️ Movimiento tipo viento
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = Math.sin(t * 0.3) * 0.08;
      ref.current.position.y = Math.sin(t * 0.8) * 0.02;
    }
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      {/* --- Maceta --- */}
      <Pot />

      {/* --- Tronco --- */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <boxGeometry args={[0.15, 0.5, 0.15]} />
        <meshStandardMaterial color="#6D4C41" />
      </mesh>

      {/* --- Copa verde --- */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <boxGeometry args={[0.8, 0.5, 0.8]} />
        <meshStandardMaterial color="#43A047" />
      </mesh>

      {/* --- Hojas adicionales --- */}
      <Cube pos={[0.3, 1.2, 0]} color="#388E3C" />
      <Cube pos={[-0.3, 1.2, 0]} color="#66BB6A" />
      <Cube pos={[0, 1.2, 0.3]} color="#81C784" />
      <Cube pos={[0, 1.2, -0.3]} color="#4CAF50" />

      {/* --- Frutas (naranjas) --- */}
      <Fruit pos={[0.2, 1.05, 0.2]} />
      <Fruit pos={[-0.25, 1.1, -0.15]} />
      <Fruit pos={[0.15, 1.15, -0.25]} />
      <Fruit pos={[-0.15, 1.05, 0.25]} />

      {/* --- Panel informativo interactivo --- */}
      <Html position={[0, 1.9, 0]} center>
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
              <b>🍊 {info.name}</b>
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

/* --- Maceta --- */
function Pot({ color = "#A0522D" }) {
  return (
    <group>
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[0.9, 0.3, 0.9]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[0.7, 0.2, 0.7]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>
    </group>
  );
}

/* --- Bloque hoja --- */
function Cube({ pos, color }) {
  return (
    <mesh position={pos}>
      <boxGeometry args={[0.25, 0.25, 0.25]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

/* --- Fruta --- */
function Fruit({ pos }) {
  return (
    <mesh position={pos}>
      <boxGeometry args={[0.12, 0.12, 0.12]} />
      <meshStandardMaterial color="#FB8C00" />
    </mesh>
  );
}
