import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

/**
 * 🍉 Sandía mini voxel — con maceta y panel informativo
 * Estructura:
 *  - Maceta cúbica con tierra
 *  - Fruto verde rayado
 *  - Hojas planas extendidas
 *  - Animación tipo “viento”
 */
export default function Sandia({ position = [0, 0, 0], scale = 1 }) {
  const ref = useRef();
  const [showInfo, setShowInfo] = useState(false);

  // Datos simulados
  const info = {
    name: "Sandía Mini",
    taxonomy: "C",
    type: "E",
    Vcmax: 52.1,
    Jmax: 110.9,
    N: 2.2,
    P: 0.24,
    location: { lat: -16.515, lon: -68.118 },
    altitude: 3630,
  };

  // 🌬️ Animación suave tipo respiración
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

      {/* --- Fruto principal --- */}
      <mesh position={[0, 0.65, 0]} castShadow>
        <boxGeometry args={[0.35, 0.35, 0.35]} />
        <meshStandardMaterial color="#2E7D32" />
      </mesh>

      {/* --- Rayas del fruto --- */}
      <Stripe pos={[0.18, 0.65, 0]} color="#1B5E20" />
      <Stripe pos={[-0.18, 0.65, 0]} color="#1B5E20" />
      <Stripe pos={[0, 0.65, 0.18]} color="#1B5E20" />
      <Stripe pos={[0, 0.65, -0.18]} color="#1B5E20" />

      {/* --- Tallo seco superior --- */}
      <mesh position={[0, 0.85, 0]} castShadow>
        <boxGeometry args={[0.06, 0.1, 0.06]} />
        <meshStandardMaterial color="#795548" />
      </mesh>

      {/* --- Hojas extendidas --- */}
      <Leaf position={[0.25, 0.5, 0]} rotation={[0, 0, 0.3]} color="#66BB6A" />
      <Leaf
        position={[-0.25, 0.5, 0]}
        rotation={[0, 0, -0.3]}
        color="#81C784"
      />
      <Leaf position={[0, 0.5, 0.25]} rotation={[0.3, 0, 0]} color="#43A047" />
      <Leaf
        position={[0, 0.5, -0.25]}
        rotation={[-0.3, 0, 0]}
        color="#388E3C"
      />

      {/* --- Panel informativo --- */}
      <Html position={[0, 1.5, 0]} center>
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
              <b>🍉 {info.name}</b>
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

/* --- Maceta --- */
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

/* --- Raya de la sandía --- */
function Stripe({ pos, color }) {
  return (
    <mesh position={pos}>
      <boxGeometry args={[0.08, 0.35, 0.08]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

/* --- Hoja plana voxel --- */
function Leaf({ position, rotation = [0, 0, 0], color }) {
  return (
    <mesh position={position} rotation={rotation} castShadow>
      <boxGeometry args={[0.25, 0.05, 0.25]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
