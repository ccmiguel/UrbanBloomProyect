import { motion } from "framer-motion";
import { useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix para los iconos de leaflet
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapaCalor = () => {
  const [regionSeleccionada, setRegionSeleccionada] = useState(null);

  // Datos de las regiones con coordenadas reales
  const regiones = [
    { 
      id: 1, 
      nombre: "Rio Branco", 
      ciudades: ["Riboratto", "Ji-Parana"], 
      calidad: "excelente",
      color: "#10B981",
      coordenadas: [-9.9754, -67.8249],
      radio: 80000
    },
    { 
      id: 2, 
      nombre: "Cuzco", 
      ciudades: ["Arequipa"], 
      calidad: "buena",
      color: "#34D399",
      coordenadas: [-13.5319, -71.9675],
      radio: 60000
    },
    { 
      id: 3, 
      nombre: "La Paz", 
      ciudades: ["BOLIVIA"], 
      calidad: "mala",
      color: "#FBBF24",
      coordenadas: [-16.4897, -68.1193],
      radio: 50000
    },
    { 
      id: 4, 
      nombre: "Santa Cruz de la Sierra", 
      ciudades: ["Sucre"], 
      calidad: "poco_saludable",
      color: "#F59E0B",
      coordenadas: [-17.7833, -63.1821],
      radio: 70000
    },
    { 
      id: 5, 
      nombre: "Iquique", 
      ciudades: [], 
      calidad: "muy_poco_saludable",
      color: "#EF4444",
      coordenadas: [-20.2307, -70.1357],
      radio: 40000
    },
    { 
      id: 6, 
      nombre: "AccuWeather", 
      ciudades: [], 
      calidad: "peligrosa",
      color: "#DC2626",
      coordenadas: [-18.4783, -70.3126],
      radio: 30000
    }
  ];

  // Escala de colores para la leyenda
  const leyenda = [
    { nivel: "Excelente", color: "#10B981" },
    { nivel: "Buena", color: "#34D399" },
    { nivel: "Mala", color: "#FBBF24" },
    { nivel: "Poco saludable", color: "#F59E0B" },
    { nivel: "Muy poco saludable", color: "#EF4444" },
    { nivel: "Peligrosa", color: "#DC2626" }
  ];

  const handleRegionClick = (region) => {
    setRegionSeleccionada(region);
  };

  // Función para obtener el color del borde basado en la calidad
  const getBorderColor = (calidad) => {
    switch(calidad) {
      case "excelente": return "#059669";
      case "buena": return "#10B981";
      case "mala": return "#D97706";
      case "poco_saludable": return "#EA580C";
      case "muy_poco_saludable": return "#DC2626";
      case "peligrosa": return "#991B1B";
      default: return "#6B7280";
    }
  };

  return (
    <motion.div
      className="bg-white shadow-lg rounded-xl p-6 border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-xl font-bold text-gray-800 mb-6">Mapa de Calor - Calidad del Aire</h2>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mapa Leaflet */}
        <div className="flex-1">
          <motion.div
            className="h-96 rounded-lg overflow-hidden shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <MapContainer
              center={[-15, -65]}
              zoom={4}
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {regiones.map((region) => (
                <CircleMarker
                  key={region.id}
                  center={region.coordenadas}
                  radius={15}
                  pathOptions={{
                    fillColor: region.color,
                    fillOpacity: 0.7,
                    color: getBorderColor(region.calidad),
                    weight: 3,
                    opacity: 1,
                  }}
                  eventHandlers={{
                    click: () => handleRegionClick(region),
                    mouseover: (e) => {
                      e.target.openPopup();
                    },
                  }}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-bold text-gray-800 text-lg">{region.nombre}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Calidad: <span className="font-medium capitalize">
                          {region.calidad.replace('_', ' ')}
                        </span>
                      </p>
                      {region.ciudades.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-600 font-medium">Ciudades:</p>
                          {region.ciudades.map((ciudad, index) => (
                            <p key={index} className="text-sm text-gray-600">• {ciudad}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  </Popup>
                  
                  <Tooltip direction="top" offset={[0, -10]} opacity={0.9} permanent={false}>
                    <div className="font-semibold text-sm">{region.nombre}</div>
                  </Tooltip>
                </CircleMarker>
              ))}
            </MapContainer>
          </motion.div>

          {/* Información de la región seleccionada */}
          {regionSeleccionada && (
            <motion.div
              className="mt-4 bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="font-bold text-gray-800 text-lg mb-2">{regionSeleccionada.nombre}</h3>
              <div className="flex items-center space-x-2 mb-2">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: regionSeleccionada.color }}
                />
                <span className="text-sm text-gray-600 capitalize">
                  Calidad: {regionSeleccionada.calidad.replace('_', ' ')}
                </span>
              </div>
              {regionSeleccionada.ciudades.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 font-medium mb-1">Ciudades relacionadas:</p>
                  <div className="flex flex-wrap gap-2">
                    {regionSeleccionada.ciudades.map((ciudad, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {ciudad}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Leyenda */}
        <div className="lg:w-64">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Calidad del Aire</h3>
          <div className="space-y-2">
            {leyenda.map((item, index) => (
              <motion.div
                key={item.nivel}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-100"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ x: 5, backgroundColor: "#f9fafb" }}
              >
                <div 
                  className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm font-medium text-gray-700">{item.nivel}</span>
              </motion.div>
            ))}
          </div>

          {/* Información adicional */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 text-sm mb-2">Cómo usar el mapa:</h4>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Haz clic en los círculos para más información</li>
              <li>• Usa la rueda del mouse para hacer zoom</li>
              <li>• Arrastra para mover el mapa</li>
              <li>• Los colores indican la calidad del aire</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MapaCalor;