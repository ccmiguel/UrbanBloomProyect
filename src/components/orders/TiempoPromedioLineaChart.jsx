import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";
import axios from "axios";

const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];

const TiempoPromedioLineaChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar datos desde el backend
  useEffect(() => {
    axios
      .get("http://localhost:3001/tiempo-promedio-linea") // Ruta del backend para tiempo promedio
      .then((response) => {
        const formattedData = response.data
          .map((item) => ({
            idlinea: item.idlinea, // ID de la línea
            tiempo_promedio: parseFloat(item.tiempo_promedio), // Tiempo promedio
            percentage: (
              (item.tiempo_promedio /
                response.data.reduce((acc, item) => acc + item.tiempo_promedio, 0)) *
              100
            ).toFixed(2), // Calculando el porcentaje
          }))
          .sort((a, b) => b.tiempo_promedio - a.tiempo_promedio); // Ordenar de mayor a menor por tiempo

        setData(formattedData);
        setLoading(false);
      })
      .catch((error) => console.error("Error al obtener los datos:", error));
  }, []);

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 lg:col-span-2 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">
        Tiempo Promedio por Línea
      </h2>
      <div className="h-[600px]"> {/* Altura ajustada para un mejor diseño */}
        {loading ? (
          <p className="text-gray-400">Cargando datos...</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
              {/* Eje Y (ID de la línea) */}
              <YAxis
                dataKey="idlinea"
                type="category"
                stroke="#9CA3AF"
                width={200} // Más espacio para nombres largos
                tick={{ fontSize: 14, fill: "#9CA3AF" }}
              />
              {/* Eje X (Escala de tiempo promedio) */}
              <XAxis
                type="number"
                stroke="#9CA3AF"
                domain={[0, "auto"]}
                tickCount={10}
                tickFormatter={(tick) => `${tick.toFixed(2)} mins`}
                interval={0}
                tick={{ fontSize: 12, fill: "#9CA3AF" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(31, 41, 55, 0.8)",
                  borderColor: "#4B5563",
                }}
                itemStyle={{ color: "#E5E7EB" }}
                formatter={(value, name, props) => [
                  `${value} mins (${props.payload.percentage}%)`,
                  name,
                ]}
              />
              <Legend />
              <Bar dataKey="tiempo_promedio" fill="#8884d8" animationDuration={1000}>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
};

export default TiempoPromedioLineaChart;
