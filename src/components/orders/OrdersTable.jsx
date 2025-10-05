import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import ModalPumaKatari from "../ModalPumaKatari";
const OrdersTable = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 30; // Número de elementos por página

    // Obtener productos del backend
    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:3001/pumakatari");
            console.log("Datos recibidos:", response.data); // Verifica los datos en la consola
            setProducts(response.data);
            setFilteredProducts(response.data);
        } catch (error) {
            console.error("Error al obtener los productos:", error);
        }
    };

    // Ejecutar cuando el componente se monte
    useEffect(() => {
        fetchProducts();
    }, []);

    // Manejo de búsqueda
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = products.filter(
            (product) =>
                product.idlinea.toString().toLowerCase().includes(term) ||
                product.fecha.toLowerCase().includes(term) ||
                product.hora.toLowerCase().includes(term)
        );
        setFilteredProducts(filtered);
        setCurrentPage(1); // Reinicia a la primera página al buscar
    };

    // Calcular los elementos a mostrar según la página actual
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);

    // Total de páginas
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    // Eliminar producto
    const handleDelete = (id) => {
        // Aquí implementas la lógica para eliminar el producto en el backend
        console.log("Eliminar producto con id:", id);
    };

    return (
        <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-100">Lista de Puma Katari</h2>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Buscar por ID línea, fecha o hora..."
                        className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={handleSearch}
                        value={searchTerm}
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                ID Línea
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Fecha
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Hora
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Demanda Estimada
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-700">
                        {currentProducts.map((product) => (
                            <motion.tr
                                key={product.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                                    {product.idlinea}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    {product.fecha}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    {product.hora}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    {product.demanda_estimada}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    <button className="text-indigo-400 hover:text-indigo-300 mr-2">
                                        <Edit size={18} />
                                    </button>
                                    <button
                                        className="text-red-400 hover:text-red-300"
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Controles de paginación */}
            <div className="flex justify-between items-center mt-4">
                <button
                    disabled={currentPage === 1}
                    className={`px-4 py-2 bg-blue-600 text-white rounded-md ${
                        currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                    Anterior
                </button>
                <span className="text-white">
                    Página {currentPage} de {totalPages}
                </span>
                <button
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 bg-blue-600 text-white rounded-md ${
                        currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                    Siguiente
                </button>
            </div>
		  
        </motion.div>
    );
};

export default OrdersTable;
