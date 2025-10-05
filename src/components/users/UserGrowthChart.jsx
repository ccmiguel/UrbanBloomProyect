import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const DemandaPorFechaChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/minibuses/demanda-fecha') // Ruta del backend
            .then(response => response.json())
            .then(data => {
                // Formatear los datos para el gráfico
                const formattedData = data.map(row => ({
                    fecha: row.fecha_inicio_servicio, // Fecha en formato de texto
                    demanda: parseInt(row.demanda_estimada, 10), // Demanda como número
                }));
                setData(formattedData);
            })
            .catch(error => console.error('Error al obtener datos:', error));
    }, []);

    return (
        <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
        >
            <h2 className="text-xl font-semibold text-gray-100 mb-4">Demanda Estimada por Fecha</h2>
            <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis 
                            dataKey="fecha" 
                            stroke="#9CA3AF" 
                            tick={{ fill: "#E5E7EB" }} 
                            tickFormatter={(str) => {
                                const date = new Date(str);
                                return `${date.getDate()}/${date.getMonth() + 1}`;
                            }} 
                        />
                        <YAxis 
                            stroke="#9CA3AF" 
                            tick={{ fill: "#E5E7EB" }} 
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(31, 41, 55, 0.8)',
                                borderColor: '#4B5563',
                            }}
                            itemStyle={{ color: '#E5E7EB' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="demanda"
                            stroke="#8B5CF6"
                            strokeWidth={2}
                            dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 8 }}
                            name="Demanda Estimada"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default DemandaPorFechaChart;
