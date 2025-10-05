import React from 'react';
import { motion } from 'framer-motion';

const PlantationControls = ({ filters, onFilterChange }) => {
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-4 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      <h3 className="text-md font-medium mb-3 text-gray-100">
        Filtros de Plantas
      </h3>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Eficiencia Mínima (Vcmax):
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={filters.minVcmax}
            onChange={(e) => onFilterChange('minVcmax', parseInt(e.target.value))}
            className="w-full"
          />
          <div className="text-xs text-gray-500 text-center">
            {filters.minVcmax}
          </div>
        </div>
        
        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Tipo de Planta:
          </label>
          <select 
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-sm"
            value={filters.plantType}
            onChange={(e) => onFilterChange('plantType', e.target.value)}
          >
            <option value="all">Todos los tipos</option>
            <option value="E">Eucalyptus</option>
            <option value="A">Árboles</option>
            <option value="C">Cultivos</option>
          </select>
        </div>
      </div>
    </motion.div>
  );
};

export default PlantationControls;