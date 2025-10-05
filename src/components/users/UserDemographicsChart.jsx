import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from "chart.js";
import { motion } from "framer-motion";

// Registrar los componentes de Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const TiposVehiculosChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/minibuses/tipo-vehiculo"); // Ruta del backend
        const formattedData = response.data.map((entry) => ({
          name: entry.tipo_vehiculo, // Tipo de vehículo
          value: parseInt(entry.cantidad, 10), // Cantidad de vehículos
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Error obteniendo los datos:", error);
      }
    };
    fetchData();
  }, []);

  const chartData = {
    labels: data.map(entry => entry.name), // Nombres de los tipos de vehículos
    datasets: [
      {
        label: 'Cantidad de Vehículos',
        data: data.map(entry => entry.value), // Valores (cantidad de vehículos)
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#FF5733", "#C70039", "#900C3F", "#FFC300",
        ],
        borderColor: "#fff",
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
            family: "Arial, sans-serif",
          },
          color: "#fff",
        },
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.7)",
        titleFont: { size: 16, family: "Arial, sans-serif" },
        bodyFont: { size: 14, family: "Arial, sans-serif" },
      },
    },
  };

  return (
    <motion.div
      className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-lg shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <h2 className="text-xl font-semibold text-white mb-4 text-center">Tipos de Vehículos</h2>
      <div style={{ width: "100%", height: 350 }}>
        <Pie data={chartData} options={options} />
      </div>
    </motion.div>
  );
};

export default TiposVehiculosChart;
