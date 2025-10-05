import { BarChart2, ShoppingBag, Users, Zap, Sprout } from "lucide-react";
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
        {/* STATS PRINCIPALES */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Stats de Radiotaxis */}
          <StatCard
            name="Total Macrodistritos"
            icon={Zap}
            value={stats.macrodistritos}
            color="#6366F1"
          />
          <StatCard
            name="Cantidad de Radiotaxis"
            icon={Users}
            value={stats.cantidadRadiotaxis}
            color="#8B5CF6"
          />
          
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
          <h2 className="text-2xl font-bold text-gray-100 mb-6 flex items-center">
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

        {/* SECCIÓN RADIOTAXIS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-100 mb-6 flex items-center">
            <Users className="mr-3 text-blue-400" />
            🚗 Análisis de Radiotaxis
          </h2>
          
          <div className="grid grid-cols-1 gap-12">
            <div className="h-[500px]">
              <SalesOverviewChart />
            </div>
            <div className="h-[500px]">
              <CategoryDistributionChart />
            </div>
            <div className="h-[600px] w-full">
              <SalesChannelChart />
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
            name="Tipos de Operador"
            icon={Users}
            value={stats.tipoOperador}
            color="#F59E0B"
          />
          <StatCard
            name="Promedio Radiotaxis/Macrodistrito"
            icon={BarChart2}
            value={stats.promedioRadiotaxis}
            color="#10B981"
          />
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