import { motion } from "framer-motion";
import { useState, useEffect } from "react"; // Importar para manejar el estado y efectos
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";

import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import SalesTrendChart from "../components/products/SalesTrendChart";
import ProductsTable from "../components/products/ProductsTable";

const ProductsPage = () => {
	const [stats, setStats] = useState({
		macrodistritos: 0,
		cantidadRadiotaxis: 0,
		tipoOperador: 0,
		promedioRadiotaxis: 0,
	});

	// Función para obtener los datos del backend
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

			// Actualizamos el estado con los datos obtenidos
			setStats({
				macrodistritos: macrodistritos.cantidad_macrodistritos,
				cantidadRadiotaxis: cantidadRadiotaxis.cantidad_radiotaxis,
				tipoOperador: tipoOperador.length, // Contar tipos de operador
				promedioRadiotaxis: estadisticasMacrodistritos[0]?.promedio || 0, // Promedio asegurado
			});
		} catch (error) {
			console.error("Error al obtener los datos:", error);
		}
	};

	// Llamar a fetchData cuando el componente se monte
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Monitoreo y Analisis' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard
						name='Total Macrodistritos'
						icon={Package}
						value={stats.macrodistritos}
						color='#6366F1'
					/>
					<StatCard
						name='Cantidad de Radiotaxis'
						icon={TrendingUp}
						value={stats.cantidadRadiotaxis}
						color='#10B981'
					/>
					<StatCard
						name='Tipos de Operador'
						icon={AlertTriangle}
						value={stats.tipoOperador}
						color='#F59E0B'
					/>
					<StatCard
						name='Promedio Radiotaxis por Macrodistrito'
						icon={DollarSign}
						value={stats.promedioRadiotaxis}
						color='#EF4444'
					/>
				</motion.div>

				{/* PRODUCTS TABLE */}
				<ProductsTable />

				
			</main>
		</div>
	);
};

export default ProductsPage;
