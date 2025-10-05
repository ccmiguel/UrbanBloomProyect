import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const DemandaPorTipoVehiculoChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/minibuses/demanda-tipo-vehiculo') // Asegúrate de que esta ruta esté bien escrita y exista en tu backend
        // Ruta del backend
            .then((response) => response.json())
            .then((data) => {
                // Formatear los datos para el gráfico
                const formattedData = data.map((row) => ({
                    tipoVehiculo: row.tipo_vehiculo,
                    demandaTotal: parseFloat(row.demanda_total),
                    demandaPromedio: parseFloat(row.demanda_promedio),
                    demandaMinima: parseFloat(row.demanda_minima),
                    demandaMaxima: parseFloat(row.demanda_maxima),
                }));
                setData(formattedData);
            })
            .catch((error) => console.error('Error al obtener datos:', error));
    }, []);

    return (
        <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
        >
            <h2 className="text-xl font-semibold text-gray-100 mb-4">Demanda por Tipo de Vehículo</h2>
            <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis
                            dataKey="tipoVehiculo"
                            stroke="#9CA3AF"
                            tick={{ fill: "#E5E7EB" }}
                            tickFormatter={(str) => str}
                            angle={-45} // Etiquetas en ángulo vertical
                            textAnchor="end"
                            dy={70} // Ajusta la distancia entre los labels y el eje X
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
                        <Legend
                            wrapperStyle={{ color: '#E5E7EB' }}
                        />
                        <Bar dataKey="demandaTotal" fill="#8B5CF6" name="Demanda Total" />
                        <Bar dataKey="demandaPromedio" fill="#34D399" name="Demanda Promedio" />
                        <Bar dataKey="demandaMinima" fill="#F87171" name="Demanda Mínima" />
                        <Bar dataKey="demandaMaxima" fill="#FBBF24" name="Demanda Máxima" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default DemandaPorTipoVehiculoChart;
