import CropScene from "./crops3D/CropScene";

export default function App() {
  return (
    <div style={{ height: "100vh", width: "100vw", background: "#202020" }}>
      <h1 style={{ color: "white", textAlign: "center", padding: "1rem" }}>
        Mis cultivos
      </h1>
      <div style={{ height: "80vh" }}>
        <CropScene />
      </div>
    </div>
  );
}
