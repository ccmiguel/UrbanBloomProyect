import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { VictoryPie, VictoryTooltip, VictoryContainer } from 'victory';

// Colores para las secciones del gráfico
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const TipoOperadorVictory = () => {
  const [data, setData] = useState([]);

  // Cargar los datos desde el backend
  useEffect(() => {
    fetch('http://localhost:3001/radiotaxis/tipo_operador')
      .then((response) => response.json())
      .then((data) => {
        // Preparar los datos para el gráfico
        const chartData = data.map((item) => ({
          x: item.tipo_operador, // Usamos 'x' para el nombre
          y: item.cantidad,      // Usamos 'y' para el valor
          label: `${item.tipo_operador} (${item.porcentaje}%)`, // Etiqueta con porcentaje
          color: COLORS[data.indexOf(item) % COLORS.length], // Asignación de color
        }));
        setData(chartData);
      })
      .catch((error) => console.error('Error:', error));
  }, []); // Se ejecuta una vez cuando el componente se monta

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 lg:col-span-2 border border-gray-700"
      initial={{ opacity: 0, y: 20 }} // Configura el efecto inicial (desaparece y sube)
      animate={{ opacity: 1, y: 0 }} // Animación cuando el componente aparece (aparece y se mueve hacia su posición original)
      transition={{ delay: 0.4 }} // Añade un retraso a la animación
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">Distribución por Tipo de Operador</h2>

      <motion.div
        className="h-80"
        key={data.length} // Esto garantiza que cada vez que los datos cambian, se dispara la animación
        initial={{ opacity: 0 }} // Comienza con opacidad 0
        animate={{ opacity: 1 }} // La opacidad cambia a 1 cuando se monta el gráfico
        transition={{ duration: 1 }} // Duración de la animación
      >
        {data.length > 0 ? (
          <VictoryPie
            data={data}
            x="x"
            y="y"
            colorScale={COLORS}
            labels={({ datum }) => datum.label} // Mostrar etiquetas con porcentaje
            labelComponent={<VictoryTooltip />}
            style={{
              data: {
                fill: ({ datum }) => datum.color, // Colores dinámicos para cada sector
              },
            }}
            animate={{
              duration: 2000,  // Duración más larga para una animación más fluida
              onLoad: {
                duration: 1000,
                easing: 'easeOut',  // Transición más suave al cargar
              },
              exit: {
                opacity: 0,  // Desvanecer los segmentos cuando se eliminan
                transition: { duration: 0.5 },
              },
              enter: {
                opacity: 1,  // Desvanecer de nuevo a opacidad total
                transition: { duration: 0.5 },
              },
            }}
            innerRadius={50} // Hacer el gráfico un donut
            labelRadius={80} // Colocar las etiquetas fuera del gráfico
            padAngle={2} // Espacio entre las secciones
            width={400} // Ancho del gráfico
            height={400} // Alto del gráfico
            containerComponent={<VictoryContainer responsive />}
          />
        ) : (
          <p className="text-gray-400">Cargando datos...</p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default TipoOperadorVictory;
