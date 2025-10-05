import React, { useState, useEffect } from "react"; 
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";

const TelefericoPromedios = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    // Realizamos una solicitud GET al backend
    axios.get("http://localhost:3001/teleferico/promedios")
      .then(response => {
        setData(response.data); // Actualizamos el estado con los datos obtenidos
      })
      .catch(error => {
        console.error("Error al obtener los datos:", error);
      });
  }, []);

  // Modificar la estructura de data para agregar los valores de promedios junto con la línea
  const modifiedData = data.map(item => ({
    ...item,
    label: `${item.linea}`
  }));

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h2 className="text-xl font-semibold text-gray-100 mb-4">Promedios por Línea de Teleférico</h2>

      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer margin={{ top: 10, right: 30, left: 30, bottom: 5 }}>
          <BarChart data={modifiedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="label" // Usamos el nuevo campo 'label' para personalizar las etiquetas
              stroke="#9CA3AF" 
              angle={-45} // Rotación de las etiquetas en el eje X
              textAnchor="end" // Alinea el texto de las etiquetas
              height={60} // Ajusta la altura del eje X para acercarlo a las barras
            />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            {/* Barra para ingreso promedio */}
            <Bar dataKey="ingreso_promedio" fill="#10B981" />
            {/* Barra para pasajeros estudiantes promedio */}
            <Bar dataKey="pasajeros_estudiantes_promedio" fill="#FF6347" />
            {/* Barra para pasajeros adulto mayor promedio */}
            <Bar dataKey="pasajeros_adulto_mayor_promedio" fill="#FFD700" />
            {/* Barra para pasajeros normales promedio */}
            <Bar dataKey="pasajeros_normales_promedio" fill="#1E90FF" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default TelefericoPromedios;
