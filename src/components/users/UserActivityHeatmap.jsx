import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { motion } from "framer-motion";

const DemandaPromedioRutaChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Obtener datos desde el backend
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/minibuses/demanda-promedio-ruta'); // Ruta del backend
                const result = await response.json();
                // Formatear datos para el gráfico
                const formattedData = result.map(entry => ({
                    ruta: entry.ruta,
                    demandaPromedio: parseFloat(entry.demanda_promedio),
                }));
                setData(formattedData);
            } catch (error) {
                console.error('Error obteniendo los datos:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <motion.div
            className='bg-gradient-to-r from-teal-500 to-blue-600 p-6 rounded-lg shadow-lg'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
        >
            <h2 className='text-xl font-semibold text-white mb-4'>Demanda Promedio por Ruta</h2>
            <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray='3 3' stroke='#374151' />
                        <XAxis dataKey='ruta' stroke='#E5E7EB' />
                        <YAxis stroke='#E5E7EB' />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(31, 41, 55, 0.8)",
                                borderColor: "#4B5563",
                            }}
                            itemStyle={{ color: "#E5E7EB" }}
                        />
                        <Legend 
                            wrapperStyle={{ color: "#E5E7EB" }} 
                        />
                        <Bar dataKey='demandaPromedio' fill='#FFD700' />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default DemandaPromedioRutaChart;
