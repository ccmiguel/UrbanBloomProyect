import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

/**
 * 🧅 Cebolla voxel — con maceta y panel informativo
 * Bloques cúbicos estilizados, animación de viento y datos clicables.
 */
export default function Cebolla({
  position = [0, 0, 0],
  scale = 1,
  color = "#AB47BC", // morada por defecto
}) {
  const ref = useRef();
  const [showInfo, setShowInfo] = useState(false);

  // Datos simulados de la cebolla
  const info = {
    name: "Cebolla",
    taxonomy: "C",
    type: "E",
    Vcmax: 52.4,
    Jmax: 110.2,
    N: 2.2,
    P: 0.24,
    location: { lat: -16.512, lon: -68.117 },
    altitude: 3625,
  };

  // 🌬️ Animación de viento
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = Math.sin(t * 0.4) * 0.08;
      ref.current.position.y = Math.sin(t * 0.8) * 0.02;
    }
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      {/* --- Maceta --- */}
      <Pot />

      {/* --- Bulbo principal --- */}
      <mesh position={[0, 0.55, 0]} castShadow>
        <boxGeometry args={[0.3, 0.25, 0.3]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* --- Capa superior del bulbo --- */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <boxGeometry args={[0.25, 0.2, 0.25]} />
        <meshStandardMaterial color="#CE93D8" />
      </mesh>

      {/* --- Raíces o base inferior --- */}
      <mesh position={[0, 0.43, 0]}>
        <boxGeometry args={[0.2, 0.05, 0.2]} />
        <meshStandardMaterial color="#E1BEE7" />
      </mesh>

      {/* --- Hojas verdes --- */}
      <Leaf position={[0, 0.9, 0]} color="#66BB6A" />
      <Leaf position={[0.1, 0.95, 0.05]} color="#81C784" />
      <Leaf position={[-0.1, 0.95, -0.05]} color="#43A047" />

      {/* --- Panel informativo interactivo --- */}
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
              <b>🧅 {info.name}</b>
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

/* --- Maceta voxel --- */
function Pot({ color = "#A0522D" }) {
  return (
    <group>
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[0.8, 0.3, 0.8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[0.6, 0.2, 0.6]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>
    </group>
  );
}

/* --- Hoja voxel delgada --- */
function Leaf({ position, color }) {
  return (
    <mesh position={position} castShadow>
      <boxGeometry args={[0.1, 0.4, 0.1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
