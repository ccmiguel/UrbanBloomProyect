export default function PlantModal({ plant, onClose }) {
  if (!plant) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#1E293B",
        color: "white",
        padding: "24px",
        borderRadius: "12px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
        width: "420px",
        zIndex: 10,
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px",
        }}
      >
        <h3 style={{ margin: 0, fontSize: "18px" }}>
          🌿 <b>{plant.Species}</b>
        </h3>
        <button
          onClick={onClose}
          style={{
            background: "transparent",
            border: "none",
            color: "#fff",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          ✖
        </button>
      </div>

      <div style={{ fontSize: "14px", lineHeight: "1.7em" }}>
        <p>
          <b>Taxonomía:</b> {plant.Plant_taxonomy} &nbsp;&nbsp;
          <b>Tipo:</b> {plant.Plant_type}
        </p>
        <p>
          <b>Vcmax:</b> {plant.Vcmax_25C} &nbsp;&nbsp;
          <b>Jmax:</b> {plant.Jmax_25C}
        </p>
        <p>
          <b>N:</b> {plant.Leaf_N}% &nbsp;&nbsp;
          <b>P:</b> {plant.Leaf_P}%
        </p>
        <p>
          <b>Ubicación:</b> {plant.Latitude.toFixed(3)}°,{" "}
          {plant.Longitude.toFixed(3)}°
        </p>
        <p>
          <b>Altitud:</b> {plant.Elevation} m
        </p>
      </div>
    </div>
  );
}
