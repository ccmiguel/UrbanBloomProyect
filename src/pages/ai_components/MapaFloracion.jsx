import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';

const coordenadasAmigables = {
  "-16.50,-68.15": "Centro",
  "-16.51,-68.14": "Sopocachi",
  "-16.52,-68.12": "Obrajes",
  "-16.48,-68.12": "Miraflores",
  "-16.49,-68.16": "Achumani"
};

export default function MapaFloracion() {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/condiciones")
      .then(res => res.json())
      .then(data => {
        setDatos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error cargando datos:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-64 text-gray-600 text-lg font-semibold">
      Cargando datos...
    </div>
  );

  return (
    <div className="w-full h-[600px] mt-6 rounded-lg overflow-hidden shadow-lg border border-gray-200">
      <MapContainer center={[-16.5, -68.14]} zoom={13} className="w-full h-full">
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {datos.map((loc, idx) => {
          const key = `${loc.lat},${loc.lon}`;
          const nombre = coordenadasAmigables[key] || "Ubicación desconocida";
          const color = loc.floracion_simulada ? "green" : "gray";

          return (
            <CircleMarker
              key={idx}
              center={[loc.lat, loc.lon]}
              radius={12}
              color={color}
              fillColor={color}
              fillOpacity={0.8}
              className="transition-transform duration-300 hover:scale-125"
            >
              <Popup>
                <div className="text-sm text-gray-700 font-medium space-y-1">
                  <div className="text-blue-600 font-bold">{nombre}</div>
                  <div>Condición: <span className="font-semibold">{loc.condiciones}</span></div>
                  <div>T2M: <span className="font-semibold">{loc.T2M} °C</span></div>
                  <div>Precipitación: <span className="font-semibold">{loc.PRECTOTCORR} mm</span></div>
                  <div>Viento: <span className="font-semibold">{loc.WS2M} m/s</span></div>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
