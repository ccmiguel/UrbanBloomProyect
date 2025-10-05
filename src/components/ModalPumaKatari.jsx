import React, { useState, useEffect } from 'react';

const ModalPumaKatari = ({ modalData, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    idlinea: '',
    fecha: '',
    hora: '',
    demanda_estimada: '',
    tiempo_entre_paradas: '',
    factor_estacional: '',
    factor_dia: '',
    factor_hora: '',
  });

  useEffect(() => {
    if (modalData) {
      setFormData(modalData);
    }
  }, [modalData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
        <h2 className='text-xl font-semibold mb-4'>{modalData ? 'Editar' : 'Agregar'} Registro</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700'>ID Línea</label>
            <input
              type='text'
              name='idlinea'
              value={formData.idlinea}
              onChange={handleChange}
              className='mt-1 p-2 border border-gray-300 rounded w-full'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Fecha</label>
            <input
              type='date'
              name='fecha'
              value={formData.fecha}
              onChange={handleChange}
              className='mt-1 p-2 border border-gray-300 rounded w-full'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Hora</label>
            <input
              type='time'
              name='hora'
              value={formData.hora}
              onChange={handleChange}
              className='mt-1 p-2 border border-gray-300 rounded w-full'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Demanda Estimada</label>
            <input
              type='number'
              name='demanda_estimada'
              value={formData.demanda_estimada}
              onChange={handleChange}
              className='mt-1 p-2 border border-gray-300 rounded w-full'
            />
          </div>
          {/* Puedes agregar más campos según lo necesario */}
          <div className='flex justify-between'>
            <button type='button' onClick={onClose} className='text-gray-500 hover:text-gray-700'>
              Cancelar
            </button>
            <button type='submit' className='bg-indigo-600 text-white py-2 px-4 rounded'>
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalPumaKatari;
