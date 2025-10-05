import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';

// Colores para diferentes tipos de plantas basados en eficiencia
const PLANT_COLORS = ['#00C49F', '#0088FE', '#FFBB28', '#FF8042', '#8884d8'];

// Datos de ejemplo para plantas
const SAMPLE_PLANTS = [
  {
    id: 1,
    Species: "Eucalyptus globulus",
    Plant_taxonomy: "A",
    Plant_type: "E",
    Longitude: -68.1193,
    Latitude: -16.5000,
    Elevation: 3600,
    Vcmax_25C: 79.29,
    Jmax_25C: 160.87,
    Leaf_N: 1.67,
    Leaf_P: 0.19,
    SLA: 12.5,
    Measurement_year: "2024"
  },
  {
    id: 2,
    Species: "Quinua Real",
    Plant_taxonomy: "C",
    Plant_type: "C",
    Longitude: -68.1500,
    Latitude: -16.5200,
    Elevation: 3800,
    Vcmax_25C: 45.2,
    Jmax_25C: 95.3,
    Leaf_N: 2.1,
    Leaf_P: 0.25,
    SLA: 15.8,
    Measurement_year: "2024"
  },
  {
    id: 3,
    Species: "Papa Andina",
    Plant_taxonomy: "C",
    Plant_type: "C",
    Longitude: -68.1300,
    Latitude: -16.5100,
    Elevation: 3700,
    Vcmax_25C: 32.1,
    Jmax_25C: 75.8,
    Leaf_N: 1.8,
    Leaf_P: 0.22,
    SLA: 18.2,
    Measurement_year: "2024"
  },
  {
    id: 4,
    Species: "Maíz Boliviano",
    Plant_taxonomy: "C",
    Plant_type: "C",
    Longitude: -68.1400,
    Latitude: -16.5300,
    Elevation: 3500,
    Vcmax_25C: 28.5,
    Jmax_25C: 68.9,
    Leaf_N: 1.9,
    Leaf_P: 0.21,
    SLA: 16.5,
    Measurement_year: "2024"
  },
  {
    id: 5,
    Species: "Tomate de Árbol",
    Plant_taxonomy: "A",
    Plant_type: "E",
    Longitude: -68.1250,
    Latitude: -16.5150,
    Elevation: 3650,
    Vcmax_25C: 55.7,
    Jmax_25C: 112.4,
    Leaf_N: 2.3,
    Leaf_P: 0.28,
    SLA: 14.1,
    Measurement_year: "2024"
  }
];

const PlantModel3D = ({ plant, position, onClick }) => {
  const meshRef = React.useRef();
  
  // Animación sutil de la planta
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = 
        position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
    }
  });

  const getPlantColor = (vcmax) => {
    if (vcmax > 60) return PLANT_COLORS[0]; // Alta eficiencia
    if (vcmax > 40) return PLANT_COLORS[1]; // Media-alta
    if (vcmax > 20) return PLANT_COLORS[2]; // Media
    return PLANT_COLORS[3]; // Baja eficiencia
  };

  return (
    <group position={position}>
      <mesh 
        ref={meshRef}
        onClick={onClick}
        castShadow
      >
        {/* Modelo 3D de planta - más detallado */}
        <coneGeometry args={[0.3, 1, 8]} />
        <meshStandardMaterial 
          color={getPlantColor(plant.Vcmax_25C)} 
          transparent 
          opacity={0.9}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
      
      {/* Etiqueta flotante con nombre de especie */}
      <Billboard position={[0, 1.2, 0]}>
        <Text 
          fontSize={0.2} 
          color="white" 
          anchorX="center" 
          anchorY="middle"
        >
          {plant.Species}
        </Text>
      </Billboard>
    </group>
  );
};

const UrbanFarmMap3D = () => {
  const [plantData, setPlantData] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [loading, setLoading] = useState(false); // Cambiado a false

  // Cargar datos de plantas - versión con datos de ejemplo
  useEffect(() => {
    setLoading(true);
    
    // Simular carga de datos
    setTimeout(() => {
      setPlantData(SAMPLE_PLANTS);
      setLoading(false);
    }, 1000);
    
    // Si quieres intentar cargar desde el backend, descomenta esto:
    /*
    fetch('http://localhost:3001/api/plants')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Endpoint no disponible');
        }
        return response.json();
      })
      .then((data) => {
        const formattedData = data.map((plant, index) => ({
          id: plant.id || index,
          Species: plant.Species || 'Especie Desconocida',
          Plant_taxonomy: plant.Plant_taxonomy || 'N/A',
          Plant_type: plant.Plant_type || 'N/A',
          Longitude: parseFloat(plant.Longitude) || 0,
          Latitude: parseFloat(plant.Latitude) || 0,
          Elevation: parseInt(plant.Elevation) || 0,
          Vcmax_25C: parseFloat(plant.Vcmax_25C) || 0,
          Jmax_25C: parseFloat(plant.Jmax_25C) || 0,
          Leaf_N: parseFloat(plant.Leaf_N) || 0,
          Leaf_P: parseFloat(plant.Leaf_P) || 0,
          SLA: parseFloat(plant.SLA) || 0,
          Measurement_year: plant.Measurement_year || 'No reportado'
        }));
        setPlantData(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error cargando datos de plantas, usando datos de ejemplo:', error);
        // En caso de error, usar datos de ejemplo
        setPlantData(SAMPLE_PLANTS);
        setLoading(false);
      });
    */
  }, []);

  // Posicionar plantas en el mapa 3D
  const getPlantPosition = (plant, index) => {
    const gridSize = Math.ceil(Math.sqrt(plantData.length));
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    
    return [
      (col - gridSize/2) * 2.5,  // X
      0,                         // Y (suelo)
      (row - gridSize/2) * 2.5   // Z
    ];
  };

  return (
    <motion.div
      className="bg-[#66A5AD] text-black backdrop-blur-md shadow-lg rounded-xl p-6 lg:col-span-2 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-black">
          🌿 Mapa 3D de Huertos Urbanos
        </h2>
        <div className="text-sm text-black">
          {plantData.length} plantas cargadas
        </div>
      </div>

      {loading ? (
        <div className="h-80 flex items-center justify-center">
          <p className="text-black">Cargando plantas...</p>
        </div>
      ) : (
        <div className="h-80 relative rounded-lg overflow-hidden">
          <Canvas 
            camera={{ 
              position: [15, 10, 15], 
              fov: 50 
            }}
            shadows
          >
            {/* Iluminación */}
            <ambientLight intensity={0.6} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            
            {/* Suelo del huerto */}
            <mesh 
              rotation={[-Math.PI / 2, 0, 0]} 
              position={[0, -1, 0]}
              receiveShadow
            >
              <planeGeometry args={[30, 30]} />
              <meshStandardMaterial 
                color="#AEBD38" 
                roughness={0.8}
                metalness={0.2}
              />
            </mesh>

            {/* Renderizar todas las plantas */}
            {plantData.map((plant, index) => (
              <PlantModel3D
                key={plant.id}
                plant={plant}
                position={getPlantPosition(plant, index)}
                onClick={() => setSelectedPlant(plant)}
              />
            ))}
            
            {/* Controles de cámara */}
            <OrbitControls 
              enableZoom={true}
              enablePan={true}
              minDistance={5}
              maxDistance={30}
            />
          </Canvas>

          {/* Leyenda de colores */}
          <div className="absolute bottom-4 left-4 bg-gray-900 p-3 rounded-lg">
            <div className="text-white text-sm font-medium mb-2">Eficiencia Vcmax:</div>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#00C49F] mr-2"></div>
                <span className="text-xs text-gray-300">Alta (&gt;60)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#0088FE] mr-2"></div>
                <span className="text-xs text-gray-300">Media-Alta (40-60)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#FFBB28] mr-2"></div>
                <span className="text-xs text-gray-300">Media (20-40)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de información de planta */}
      {selectedPlant && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
          <motion.div
            className="bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">
                🌱 {selectedPlant.Species}
              </h3>
              <button 
                onClick={() => setSelectedPlant(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="text-gray-300">
                <strong>Taxonomía:</strong> {selectedPlant.Plant_taxonomy}
              </div>
              <div className="text-gray-300">
                <strong>Tipo:</strong> {selectedPlant.Plant_type}
              </div>
              <div className="text-gray-300">
                <strong>Vcmax:</strong> {selectedPlant.Vcmax_25C}
              </div>
              <div className="text-gray-300">
                <strong>Jmax:</strong> {selectedPlant.Jmax_25C}
              </div>
              <div className="text-gray-300">
                <strong>N:</strong> {selectedPlant.Leaf_N}%
              </div>
              <div className="text-gray-300">
                <strong>P:</strong> {selectedPlant.Leaf_P}%
              </div>
              <div className="text-gray-300 col-span-2">
                <strong>Ubicación:</strong> {selectedPlant.Latitude}°, {selectedPlant.Longitude}°
              </div>
              <div className="text-gray-300 col-span-2">
                <strong>Altitud:</strong> {selectedPlant.Elevation} m
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default UrbanFarmMap3D;