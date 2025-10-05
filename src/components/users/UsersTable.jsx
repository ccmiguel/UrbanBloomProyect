import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import axios from "axios";
import ModalMinibus from "../ModalMinibus"; // Ajustar el modal para los datos de minibuses

const minibusesDataUrl = "http://localhost:3001/minibuses";

const MinibusesTable = () => {
  const [minibusesData, setMinibusesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [modalData, setModalData] = useState(null); // Datos del modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado del modal

  useEffect(() => {
    const fetchMinibusesData = async () => {
      try {
        const response = await axios.get(minibusesDataUrl);
        setMinibusesData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchMinibusesData();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = minibusesData.filter(
      (data) =>
        data.operador.toLowerCase().includes(term) ||
        data.ruta.toLowerCase().includes(term)
    );
    setFilteredData(filtered);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  const handleEdit = (data) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setModalData(null); // No hay datos, es para agregar
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${minibusesDataUrl}/${id}`);
      setMinibusesData(minibusesData.filter((data) => data.id !== id));
    } catch (error) {
      console.error("Error deleting data: ", error);
    }
  };

  const handleSave = async (data) => {
    try {
      if (data.id) {
        // Actualizar registro existente
        await axios.put(`${minibusesDataUrl}/${data.id}`, data);
        setMinibusesData(
          minibusesData.map((item) => (item.id === data.id ? data : item))
        );
      } else {
        // Añadir nuevo registro
        const response = await axios.post(minibusesDataUrl, data);
        setMinibusesData([...minibusesData, response.data]);
      }
      handleModalClose(); // Cerrar el modal después de guardar
    } catch (error) {
      console.error("Error saving data: ", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Minibuses Data</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search by operator or route..."
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Add New
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-300">
          <thead className="bg-gray-800 text-gray-200">
            <tr>
              <th className="px-6 py-4">Operador</th>
              <th className="px-6 py-4">Tipo Vehículo</th>
              <th className="px-6 py-4">Ruta</th>
              <th className="px-6 py-4">Demanda Estimada</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((data) => (
              <motion.tr
                key={data.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4">{data.operador}</td>
                <td className="px-6 py-4">{data.tipo_vehiculo}</td>
                <td className="px-6 py-4">{data.ruta}</td>
                <td className="px-6 py-4">{data.demanda_estimada}</td>
                <td className="px-6 py-4 text-sm">
                  <button
                    onClick={() => handleEdit(data)}
                    className="text-indigo-400 hover:text-indigo-300 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(data.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-white bg-gray-600 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={indexOfLastItem >= filteredData.length}
          className="px-4 py-2 text-white bg-gray-600 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      <ModalMinibus
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSave}
        modalData={modalData}
      />
    </motion.div>
  );
};

export default MinibusesTable;
