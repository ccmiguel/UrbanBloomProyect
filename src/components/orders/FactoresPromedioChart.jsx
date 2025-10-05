import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import axios from "axios";

const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];

const FactoresPromedioChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar datos desde el backend
  useEffect(() => {
    axios
      .get("http://localhost:3001/factores-promedio") // Ruta del backend para factores promedio
      .then((response) => {
        const formattedData = response.data.map((item) => ({
          factor_estacional: parseFloat(item.factor_estacional_promedio), // Factor estacional promedio
          factor_dia: parseFloat(item.factor_dia_promedio), // Factor dia promedio
          demanda_promedio: parseFloat(item.demanda_promedio), // Demanda promedio
          factor_hora: parseFloat(item.factor_hora_promedio), // Factor hora promedio
        }));

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
        Factores Promedio y Demanda
      </h2>
      <div className="h-[800px]"> {/* Aumentamos la altura para evitar el corte */}
        {loading ? (
          <p className="text-gray-400">Cargando datos...</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
              <XAxis
                type="number"
                dataKey="factor_estacional"
                stroke="#9CA3AF"
                name="Factor Estacional"
                domain={['auto', 'auto']} // Dominio automático
                tickCount={10} // Ajusta la cantidad de ticks
                tickFormatter={(tick) => tick.toFixed(1)} // Ajuste de formato
                tick={{ fontSize: 12, fill: "#9CA3AF" }}
              />
              <YAxis
                type="number"
                dataKey="factor_dia"
                stroke="#9CA3AF"
                name="Factor Día"
                domain={['auto', 'auto']} // Dominio automático
                tickCount={10} // Ajusta la cantidad de ticks
                tickFormatter={(tick) => tick.toFixed(1)} // Ajuste de formato
                tick={{ fontSize: 12, fill: "#9CA3AF" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(31, 41, 55, 0.8)",
                  borderColor: "#4B5563",
                }}
                itemStyle={{ color: "#E5E7EB" }}
                formatter={(value, name, props) => [
                  `${value} (Demanda Promedio: ${props.payload.demanda_promedio})`,
                  name,
                ]}
              />
              <Legend />
              <Scatter
                name="Factores"
                data={data}
                fill="#8884d8"
                shape="circle"
                isAnimationActive={true}
                line
              >
                {data.map((entry, index) => (
                  <Scatter
                    key={`scatter-${index}`}
                    data={{ 
                      factor_estacional: entry.factor_estacional, 
                      factor_dia: entry.factor_dia, 
                      demanda_promedio: entry.demanda_promedio 
                    }}
                    fill={COLORS[index % COLORS.length]}
                    shape="circle"
                    stroke="#fff"
                    strokeWidth={2}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
};

export default FactoresPromedioChart;
