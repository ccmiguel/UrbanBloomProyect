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

const CategoryDistributionChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar datos del backend
  useEffect(() => {
    axios
      .get("http://localhost:3001/radiotaxis-macrodistrito")
      .then((response) => {
        const formattedData = response.data
          .map((item) => ({
            name: item.macrodistrito, // El nombre del macrodistrito
            value: item.cantidad, // La cantidad de radiotaxis en ese macrodistrito
            percentage:item.porcentaje// Calculando el porcentaje
          }))
          .sort((a, b) => b.value - a.value); // Ordenar de mayor a menor por 'value'

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
        Distribución de radiotaxis por Macrodistrito
      </h2>
      <div className="h-[1100px]"> {/* Altura ajustada para un mejor diseño */}
        {loading ? (
          <p className="text-gray-400">Cargando datos...</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
              {/* Eje Y (Nombres de los macrodistritos) */}
              <YAxis
                dataKey="name"
                type="category"
                stroke="#9CA3AF"
                width={200} // Más espacio para nombres largos
                tick={{ fontSize: 14, fill: "#9CA3AF" }}
              />
              {/* Eje X (Escala de intervalos de 100) */}
              <XAxis
                type="number"
                stroke="#9CA3AF"
                domain={[0, "auto"]}
                tickCount={10}
                tickFormatter={(tick) => `${tick}`}
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
                  `${value} (${props.payload.percentage}%)`,
                  name,
                ]}
              />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" animationDuration={1000}>
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

export default CategoryDistributionChart;
