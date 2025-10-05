export default function Lighting() {
  return (
    <>
      <hemisphereLight args={["#ffffff", "#887766", 0.7]} />
      <directionalLight
        position={[6, 10, 6]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    </>
  );
}
