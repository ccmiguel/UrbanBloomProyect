import React from 'react';
import { Modal, Box, Typography, Chip, Grid } from '@mui/material';

const PlantInfoModal = ({ plant, onClose }) => {
  const getEfficiencyLevel = (vcmax) => {
    if (vcmax > 60) return { label: 'Alta', color: 'success' };
    if (vcmax > 30) return { label: 'Media', color: 'warning' };
    return { label: 'Baja', color: 'error' };
  };

  const efficiency = getEfficiencyLevel(plant.Vcmax_25C);

  return (
    <Modal open={true} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2
      }}>
        <Typography variant="h5" gutterBottom>
          🌱 {plant.Species}
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body2"><strong>Taxonomía:</strong></Typography>
            <Chip label={plant.Plant_taxonomy} size="small" />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2"><strong>Eficiencia:</strong></Typography>
            <Chip 
              label={efficiency.label} 
              color={efficiency.color} 
              size="small" 
            />
          </Grid>
          
          <Grid item xs={6}>
            <Typography variant="body2">
              <strong>Vcmax:</strong> {plant.Vcmax_25C}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">
              <strong>Jmax:</strong> {plant.Jmax_25C}
            </Typography>
          </Grid>
          
          <Grid item xs={6}>
            <Typography variant="body2">
              <strong>Nitrogeno (N):</strong> {plant.Leaf_N}%
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">
              <strong>Fósforo (P):</strong> {plant.Leaf_P}%
            </Typography>
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="body2">
              <strong>Ubicación:</strong> {plant.Latitude}°, {plant.Longitude}°
            </Typography>
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="body2">
              <strong>Altitud:</strong> {plant.Elevation} m
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default PlantInfoModal;