import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { Thermometer, Droplets } from "lucide-react";

const SaludCultivoChart = () => {
  // Datos para el gráfico circular de salud general
  const saludData = [
    { name: "Salud", value: 85 },
    { name: "Restante", value: 15 }
  ];

  const COLORS = ["#10B981", "#E5E7EB"];

  return (
    <div className="space-y-6">
      {/* Primera fila: Salud General, Temperatura y Humedad */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Salud General del Cultivo */}
        <motion.div
          className='bg-white shadow-lg rounded-xl p-6 border border-gray-200'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className='text-lg font-medium text-gray-800 mb-4'>Salud General del Cultivo</h2>
          
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="text-3xl font-bold text-gray-900 mb-2">85%</div>
              <div className="text-sm text-gray-600 mb-1">NOVI</div>
            </div>
            
            <div className="w-24 h-24">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={saludData}
                    cx="50%"
                    cy="50%"
                    innerRadius={25}
                    outerRadius={40}
                    paddingAngle={0}
                    dataKey="value"
                    startAngle={90}
                    endAngle={450}
                  >
                    {saludData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                        stroke="none"
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Temperatura */}
        <motion.div
          className='bg-white shadow-lg rounded-xl p-6 border border-gray-200'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className='text-lg font-medium text-gray-800'>TEMPERATURA</h2>
            <Thermometer className="text-gray-600" size={20} />
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-2">22°C</div>
            <div className="text-sm text-green-600 font-medium">Excelente</div>
          </div>
        </motion.div>

        {/* Humedad */}
        <motion.div
          className='bg-white shadow-lg rounded-xl p-6 border border-gray-200'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className='text-lg font-medium text-gray-800'>HUMEDAD</h2>
            <Droplets className="text-gray-600" size={20} />
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-2">65%</div>
            <div className="text-sm text-green-600 font-medium">Excelente</div>
          </div>
        </motion.div>
      </div>

      {/* Segunda fila: Charts */}
      <div className="grid grid-cols-1 gap-6">
        <div className="h-[200px]">
          <SalesOverviewChart />
        </div>
        <div className="h-[800px]">
          <CategoryDistributionChart />
        </div>
      </div>
    </div>
  );
};

export default SaludCultivoChart;