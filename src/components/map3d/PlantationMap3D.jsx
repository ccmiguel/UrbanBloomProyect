import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import PlantInfoModal from './PlantInfoModal';
import { parsePlantData } from './utils/plantDataParser';

const PlantationMap3D = ({ plantData }) => {
  const [selectedPlant, setSelectedPlant] = useState(null);
  const parsedPlants = parsePlantData(plantData);

  const PlantModel = ({ plant, position }) => {
    const meshRef = useRef();
    
    useFrame((state) => {
      // Animación sutil de las plantas
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = 
        position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
    });

    const getPlantColor = (vcmax) => {
      if (vcmax > 60) return '#4CAF50'; // Alta eficiencia - Verde
      if (vcmax > 30) return '#8BC34A'; // Media eficiencia
      return '#CDDC39'; // Baja eficiencia
    };

    return (
      <group position={position}>
        <mesh 
          ref={meshRef}
          onClick={() => setSelectedPlant(plant)}
        >
          {/* Modelo 3D básico de planta */}
          <cylinderGeometry args={[0.2, 0.5, 1, 8]} />
          <meshStandardMaterial 
            color={getPlantColor(plant.Vcmax_25C)} 
            transparent 
            opacity={0.8}
          />
        </mesh>
        
        {/* Etiqueta flotante */}
        <Billboard position={[0, 1.5, 0]}>
          <Text fontSize={0.3} color="white" anchorX="center" anchorY="middle">
            {plant.Species}
          </Text>
        </Billboard>
      </group>
    );
  };

  return (
    <div style={{ width: '100%', height: '600px', position: 'relative' }}>
      <Canvas camera={{ position: [10, 10, 10], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} />
        
        {/* Suelo del huerto */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#7CFC00" />
        </mesh>

        {/* Renderizar plantas */}
        {parsedPlants.map((plant, index) => (
          <PlantModel
            key={index}
            plant={plant}
            position={[
              (index % 5) * 3 - 6, 
              0, 
              Math.floor(index / 5) * 3 - 6
            ]}
          />
        ))}
        
        <OrbitControls enableZoom={true} />
      </Canvas>

      {/* Modal de información de planta */}
      {selectedPlant && (
        <PlantInfoModal 
          plant={selectedPlant} 
          onClose={() => setSelectedPlant(null)} 
        />
      )}
    </div>
  );
};

export default PlantationMap3D;