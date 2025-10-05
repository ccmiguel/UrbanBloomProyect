import React, { useState, useEffect } from 'react';

const ModalMinibus = ({ modalData, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    operador: '',
    tipo_vehiculo: '',
    ruta: '',
    fecha_inicio_servicio: '',
    hora_inicio: '',
    hora_fin: '',
    demanda_estimada: '',
    factor_estacional: '',
  });

  useEffect(() => {
    if (modalData) {
      setFormData({
        ...modalData,
      });
    } else {
      setFormData({
        operador: '',
        tipo_vehiculo: '',
        ruta: '',
        fecha_inicio_servicio: '',
        hora_inicio: '',
        hora_fin: '',
        demanda_estimada: '',
        factor_estacional: '',
      });
    }
  }, [modalData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Llama la función onSave para guardar el registro
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold text-gray-200 mb-4">
          {modalData ? 'Editar Registro' : 'Añadir Registro'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-200">Operador</label>
            <input
              type="text"
              name="operador"
              value={formData.operador}
              onChange={handleInputChange}
              className="w-full px-4 py-2 text-gray-900 rounded-lg focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-200">Tipo de Vehículo</label>
            <input
              type="text"
              name="tipo_vehiculo"
              value={formData.tipo_vehiculo}
              onChange={handleInputChange}
              className="w-full px-4 py-2 text-gray-900 rounded-lg focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-200">Ruta</label>
            <input
              type="text"
              name="ruta"
              value={formData.ruta}
              onChange={handleInputChange}
              className="w-full px-4 py-2 text-gray-900 rounded-lg focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-200">Fecha de Inicio del Servicio</label>
            <input
              type="date"
              name="fecha_inicio_servicio"
              value={formData.fecha_inicio_servicio}
              onChange={handleInputChange}
              className="w-full px-4 py-2 text-gray-900 rounded-lg focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-200">Hora de Inicio</label>
            <input
              type="time"
              name="hora_inicio"
              value={formData.hora_inicio}
              onChange={handleInputChange}
              className="w-full px-4 py-2 text-gray-900 rounded-lg focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-200">Hora de Fin</label>
            <input
              type="time"
              name="hora_fin"
              value={formData.hora_fin}
              onChange={handleInputChange}
              className="w-full px-4 py-2 text-gray-900 rounded-lg focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-200">Demanda Estimada</label>
            <input
              type="number"
              name="demanda_estimada"
              value={formData.demanda_estimada}
              onChange={handleInputChange}
              className="w-full px-4 py-2 text-gray-900 rounded-lg focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-200">Factor Estacional</label>
            <input
              type="number"
              step="0.01"
              name="factor_estacional"
              value={formData.factor_estacional}
              onChange={handleInputChange}
              className="w-full px-4 py-2 text-gray-900 rounded-lg focus:outline-none"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg mr-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              {modalData ? 'Actualizar' : 'Añadir'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalMinibus;
