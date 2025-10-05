import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

/**
 * 🧄 Ajo voxel — con maceta y panel informativo
 * Al hacer clic en la etiqueta, se muestra/oculta la información de la planta.
 */
export default function Ajo({ position = [0, 0, 0], scale = 1 }) {
  const ref = useRef();
  const [showInfo, setShowInfo] = useState(false);

  // Simulación de datos científicos del Ajo
  const info = {
    name: "Ajo",
    taxonomy: "C",
    type: "E",
    Vcmax: 45.2,
    Jmax: 88.7,
    N: 2.1,
    P: 0.23,
    location: { lat: -16.51, lon: -68.12 },
    altitude: 3640,
  };

  // Movimiento suave tipo “viento”
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = Math.sin(t * 0.3) * 0.08;
      ref.current.position.y = Math.sin(t * 1) * 0.02;
    }
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      {/* --- Maceta --- */}
      <Pot />

      {/* --- Bulbo del ajo --- */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[0.3, 0.25, 0.3]} />
        <meshStandardMaterial color="#F5F5F5" />
      </mesh>
      <mesh position={[0, 0.63, 0]} castShadow>
        <boxGeometry args={[0.25, 0.15, 0.25]} />
        <meshStandardMaterial color="#E0E0E0" />
      </mesh>

      {/* --- Segmentos del bulbo --- */}
      <Clove pos={[0.12, 0.5, 0]} />
      <Clove pos={[-0.12, 0.5, 0]} />
      <Clove pos={[0, 0.5, 0.12]} />
      <Clove pos={[0, 0.5, -0.12]} />

      {/* --- Hojas verdes --- */}
      <Leaf position={[0, 0.75, 0]} color="#7CB342" />
      <Leaf position={[0.1, 0.8, 0.05]} color="#8BC34A" />
      <Leaf position={[-0.1, 0.8, -0.05]} color="#689F38" />

      {/* --- Panel HTML --- */}
      <Html position={[0, 1.3, 0]} center>
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
              <b>🧄 {info.name}</b>
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
              //color: "#ffffff",
              fontWeight: "600",
              //boxShadow: "0 2px 4px rgba(0, 0, 0, 0)",
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

/* --- Hoja --- */
function Leaf({ position, color }) {
  return (
    <mesh position={position} castShadow>
      <boxGeometry args={[0.1, 0.4, 0.1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

/* --- Diente del ajo --- */
function Clove({ pos }) {
  return (
    <mesh position={pos}>
      <boxGeometry args={[0.08, 0.1, 0.08]} />
      <meshStandardMaterial color="#E8E8E8" />
    </mesh>
  );
}
