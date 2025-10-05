export const parsePlantData = (rawData) => {
  return rawData.map(plant => ({
    Species: plant.Species || 'Desconocida',
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
};

export const filterPlantsByEfficiency = (plants, minVcmax = 0) => {
  return plants.filter(plant => plant.Vcmax_25C >= minVcmax);
};