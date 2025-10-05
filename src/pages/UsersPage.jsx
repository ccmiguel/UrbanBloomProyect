import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import UsersTable from "../components/users/UsersTable";
import UserGrowthChart from "../components/users/UserGrowthChart";
import UserActivityHeatmap from "../components/users/UserActivityHeatmap";
import UserDemographicsChart from "../components/users/UserDemographicsChart";
import DemandaPorOperadorChart from "../components/users/DemandaPorOperadorChart";
import DemandaPorTipoVehiculoChart from "../components/users/DemandaTipoVehiculoChart";
import DemandaPorOperadorYTipoVehiculoChart from "../components/users/DemandaPorOperadorYTipoVehiculoChart";
import Prediccion from "./ai_components/Prediccion";
import MapaFloracion from "./ai_components/MapaFloracion";
import Graficos from "./ai_components/Graficos";



const userStats = {
	totalUsers: 152845,
	newUsersToday: 243,
	activeUsers: 98520,
	churnRate: "2.4%",
};

const UsersPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='PREDICCION AGRICOLA' />
			<Prediccion/>
			<MapaFloracion/>
			<Graficos/>


		</div>
	);
};
export default UsersPage;
