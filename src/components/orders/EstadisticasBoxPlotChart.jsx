import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import axios from "axios";

const EstadisticasBarrasApiladasChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar datos desde el backend
  useEffect(() => {
    axios
      .get("http://localhost:3001/estadisticas-linea-factores") // Ruta para obtener estadísticas de la línea
      .then((response) => {
        const formattedData = response.data.map((item) => ({
          idlinea: item.idlinea,
          tiempo_promedio: item.tiempo_promedio, // Tiempo promedio
          tiempo_minimo: item.tiempo_minimo, // Tiempo mínimo
          tiempo_maximo: item.tiempo_maximo, // Tiempo máximo
          desviacion_estandar: item.desviacion_estandar, // Desviación estándar
          factor_estacional: item.factor_estacional, // Factor estacional
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
        Estadísticas de Tiempos y Factores por Línea
      </h2>
      <div className="h-[600px]"> {/* Altura ajustada para el gráfico */}
        {loading ? (
          <p className="text-gray-400">Cargando datos...</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="idlinea" />
              <YAxis />
              <Tooltip />
              <Legend />
              
              {/* Barra apilada para cada variable */}
              <Bar dataKey="tiempo_minimo" stackId="a" fill="#FFBB28" />
              <Bar dataKey="desviacion_estandar" stackId="a" fill="#00C49F" />
              <Bar dataKey="tiempo_promedio" stackId="a" fill="#FF8042" />
              <Bar dataKey="tiempo_maximo" stackId="a" fill="#0088FE" />
              <Bar dataKey="factor_estacional" stackId="a" fill="#D0ED57" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
};

export default EstadisticasBarrasApiladasChart;
