import { CheckCircle, Clock, DollarSign, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import DailyOrders from "../components/orders/DailyOrders";
import OrderDistribution from "../components/orders/OrderDistribution";
import DemandaPromedioDiaChart from "../components/orders/DemandaPromedioDiaChart";
import TiempoPromedioLineaChart from "../components/orders/TiempoPromedioLineaChart";
import EstadisticasBoxPlotChart from "../components/orders/EstadisticasBoxPlotChart";
import EstadisticasBarrasApiladasChart from "../components/orders/EstadisticasBoxPlotChart";
import PumaKatariTable from "../components/orders/OrdersTable";
import OrdersTable from "../components/orders/OrdersTable";

const orderStats = {
	totalOrders: "1,234",
	pendingOrders: "56",
	completedOrders: "1,178",
	totalRevenue: "$98,765",
};

const OrdersPage = () => {
	return (
		<div className='flex-1 relative z-10 overflow-auto'>
			<Header title={"PUMA KATARI"} />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
				</motion.div>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
					<DailyOrders />
					<DemandaPromedioDiaChart/>
					<TiempoPromedioLineaChart/>
					<EstadisticasBarrasApiladasChart/>
				</div>

				<OrdersTable/>
			</main>
		</div>
	);
};
export default OrdersPage;
