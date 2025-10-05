import { BarChart2, ShoppingBag, Users, Zap, Sprout, Sun, Snowflake } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import SalesOverviewChart from "../components/overview/SalesOverviewChart";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import SalesChannelChart from "../components/overview/SalesChannelChart";
import UrbanFarmMap3D from "../components/overview/UrbanFarmMap3D";
import PlantationControls from "../components/overview/PlantationControls";



const OverviewPage = () => {
  // Estado para datos de radiotaxis
  const [stats, setStats] = useState({
    macrodistritos: 0,
    cantidadRadiotaxis: 0,
    tipoOperador: 0,
    promedioRadiotaxis: 0,
  });

  // Estado para datos de huertos urbanos
  const [farmStats, setFarmStats] = useState({
    totalPlantas: 0,
    especiesUnicas: 0,
    eficienciaPromedio: 0,
    huertosActivos: 0
  });

  // Estado para filtros del mapa 3D
  const [filters, setFilters] = useState({
    minVcmax: 0,
    plantType: 'all'
  });

  // Datos de pronósticos
  const [pronosticos, setPronosticos] = useState([
    {
      id: 1,
      nombre: "Riesgo de Helada en 24h",
      tipo: "helada",
      nivel: "alto",
      color: "bg-red-500",
      icono: Snowflake,
      descripcion: "Temperatura mínima: -2°C"
    },
    {
      id: 2,
      nombre: "Soleado próximos 2 días",
      tipo: "soleado",
      nivel: "favorable",
      color: "bg-green-500",
      icono: Sun,
      descripcion: "Temperatura máxima: 28°C"
    },
    {
      id: 3,
      nombre: "Vientos moderados",
      tipo: "viento",
      nivel: "moderado",
      color: "bg-yellow-500",
      icono: Zap,
      descripcion: "Velocidad: 15-25 km/h"
    },
    {
      id: 4,
      nombre: "Lluvia leve en 48h",
      tipo: "lluvia",
      nivel: "bajo",
      color: "bg-blue-500",
      icono: Users,
      descripcion: "Precipitación: 5-10 mm"
    }
  ]);

  // Función para obtener datos de radiotaxis
  const fetchData = async () => {
    try {
      const responses = await Promise.all([
        fetch("http://localhost:3001/macrodistritos"),
        fetch("http://localhost:3001/radiotaxis-cantidad"),
        fetch("http://localhost:3001/tipo_operador"),
        fetch("http://localhost:3001/macrodistrito-estadisticas"),
      ]);

      const [
        macrodistritos,
        cantidadRadiotaxis,
        tipoOperador,
        estadisticasMacrodistritos,
      ] = await Promise.all(responses.map((response) => response.json()));

      setStats({
        macrodistritos: macrodistritos.cantidad_macrodistritos,
        cantidadRadiotaxis: cantidadRadiotaxis.cantidad_radiotaxis,
        tipoOperador: tipoOperador.length,
        promedioRadiotaxis: estadisticasMacrodistritos[0]?.promedio || 0,
      });
    } catch (error) {
      console.error("Error fetching radiotaxi data:", error);
    }
  };

  // Función para obtener datos de huertos urbanos (simulados por ahora)
  const fetchFarmData = async () => {
    try {
      // Datos simulados mientras configuras el backend
      const simulatedData = {
        totalPlantas: 12,
        especiesUnicas: 8,
        eficienciaPromedio: 45.2,
        huertosActivos: 3
      };
      
      setFarmStats(simulatedData);
    } catch (error) {
      console.error("Error cargando datos de huertos:", error);
    }
  };

  // Manejar cambios en los filtros
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  useEffect(() => {
    fetchData();
    fetchFarmData();
  }, []);

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="DASHBOARD INTEGRADO - RADIOTAXIS & HUERTOS URBANOS" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* BARRA DE PRONÓSTICOS DEL TIEMPO */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {pronosticos.map((pronostico) => (
            <motion.div
              key={pronostico.id}
              className={`${pronostico.color} rounded-lg p-4 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center justify-between mb-2">
                <pronostico.icono size={24} className="text-white" />
                <span className="text-sm font-semibold bg-black bg-opacity-20 px-2 py-1 rounded-full">
                  {pronostico.nivel.toUpperCase()}
                </span>
              </div>
              
              <h3 className="font-bold text-lg mb-1">{pronostico.nombre}</h3>
              <p className="text-sm opacity-90">{pronostico.descripcion}</p>
              
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">
                  {pronostico.tipo === "helada" ? "❄️" : 
                   pronostico.tipo === "soleado" ? "☀️" :
                   pronostico.tipo === "viento" ? "💨" : "🌧️"}
                </span>
                <div className={`w-3 h-3 rounded-full ${
                  pronostico.color.includes('red') ? 'bg-red-700' :
                  pronostico.color.includes('green') ? 'bg-green-700' :
                  pronostico.color.includes('yellow') ? 'bg-yellow-700' : 'bg-blue-700'
                }`} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* STATS PRINCIPALES */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          
          
          {/* Stats de Huertos Urbanos */}
          <StatCard
            name="Plantas Monitoreadas"
            icon={Sprout}
            value={farmStats.totalPlantas}
            color="#10B981"
          />
          <StatCard
            name="Especies Únicas"
            icon={BarChart2}
            value={farmStats.especiesUnicas}
            color="#EC4899"
          />
        </motion.div>

        {/* SECCIÓN HUERTOS URBANOS */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl text-black font-bold mb-6 flex items-center">
            <Sprout className="mr-3 text-green-400" />
            🌿 Sistema de Huertos Urbanos Inteligentes
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Mapa 3D - Ocupa 2 columnas */}
            <div className="lg:col-span-2">
              <UrbanFarmMap3D />
            </div>
            
            {/* Controles - Ocupa 1 columna */}
            <div className="lg:col-span-1">
              <PlantationControls 
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>
          </div>
        </motion.div>

        

        {/* STATS SECUNDARIOS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          
          <StatCard
            name="Eficiencia Promedio Vcmax"
            icon={Sprout}
            value={farmStats.eficienciaPromedio}
            color="#8B5CF6"
            suffix=" pts"
          />
          <StatCard
            name="Huertos Activos"
            icon={ShoppingBag}
            value={farmStats.huertosActivos}
            color="#EC4899"
          />
        </motion.div>

        

      </main>
    </div>
  );
};

export default OverviewPage;