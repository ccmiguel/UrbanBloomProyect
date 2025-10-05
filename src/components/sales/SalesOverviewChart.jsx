import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState, useEffect } from "react";
import axios from "axios";

const SalesOverviewChart = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState("This Year");

  useEffect(() => {
    // Realizamos una solicitud GET al backend para obtener los datos
    axios.get("http://localhost:3001/teleferico/promedios2") // Asegúrate de que el endpoint y la consulta coincidan
      .then((response) => {
        setMonthlyData(response.data); // Actualiza el estado con los datos obtenidos
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, []);

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >


      <div className="w-full h-80">
        <ResponsiveContainer>
          <AreaChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="mes" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            {/* Área para ingreso total */}
            <Area type="monotone" dataKey="ingreso_total_mes" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} />
            {/* Área para pasajeros estudiantes */}
            <Area type="monotone" dataKey="pasajeros_estudiantes_mes" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
            {/* Área para pasajeros adulto mayor */}
            <Area type="monotone" dataKey="pasajeros_adulto_mayor_mes" stroke="#FFD700" fill="#FFD700" fillOpacity={0.3} />
            {/* Área para pasajeros normales */}
            <Area type="monotone" dataKey="pasajeros_normales_mes" stroke="#1E90FF" fill="#1E90FF" fillOpacity={0.3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default SalesOverviewChart;
