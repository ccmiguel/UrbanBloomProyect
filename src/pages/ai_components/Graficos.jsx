import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, AreaChart, Area
} from 'recharts';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { Cloud, Droplets, Wind, Thermometer, Sprout, MapPin, TrendingUp } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

const coordenadasAmigables = {
  "-16.50,-68.15": "Centro",
  "-16.51,-68.14": "Sopocachi",
  "-16.52,-68.12": "Obrajes",
  "-16.48,-68.12": "Miraflores",
  "-16.49,-68.16": "Achumani"
};

const datosSimulados = [
  { fecha: '01/10', T2M: 12, PRECTOTCORR: 2.5, WS2M: 3.2, diasFavorables: 3, humedad: 65 },
  { fecha: '05/10', T2M: 14, PRECTOTCORR: 5.8, WS2M: 4.1, diasFavorables: 4, humedad: 72 },
  { fecha: '10/10', T2M: 13, PRECTOTCORR: 8.2, WS2M: 3.8, diasFavorables: 2, humedad: 78 },
  { fecha: '15/10', T2M: 15, PRECTOTCORR: 3.1, WS2M: 2.9, diasFavorables: 5, humedad: 68 },
  { fecha: '20/10', T2M: 16, PRECTOTCORR: 1.2, WS2M: 3.5, diasFavorables: 4, humedad: 62 },
  { fecha: '25/10', T2M: 14, PRECTOTCORR: 6.5, WS2M: 4.3, diasFavorables: 3, humedad: 75 },
  { fecha: '30/10', T2M: 13, PRECTOTCORR: 4.8, WS2M: 3.7, diasFavorables: 4, humedad: 70 }
];

const StatCard = ({ icon: Icon, title, value, unit, trend, color }) => (
  <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
    <div className="flex items-start justify-between mb-3">
      <div className={`p-3 rounded-xl bg-gradient-to-br ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      {trend && (
        <div className="flex items-center text-green-600 text-sm font-semibold">
          <TrendingUp className="w-4 h-4 mr-1" />
          {trend}
        </div>
      )}
    </div>
    <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
    <div className="flex items-baseline">
      <p className="text-3xl font-bold text-gray-800">{value}</p>
      <span className="ml-2 text-lg text-gray-500">{unit}</span>
    </div>
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-gray-200">
        <p className="font-semibold text-gray-800 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: <span className="font-bold">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Graficos() {
  const [datosMapa, setDatosMapa] = useState([]);
  const [loading, setLoading] = useState(true);
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/condiciones")
      .then(res => res.json())
      .then(data => {
        setDatosMapa(data);
        setLoading(false);
        setTimeout(() => setAnimateCards(true), 100);
      })
      .catch(err => {
        console.error("Error cargando datos:", err);
        setLoading(false);
        setAnimateCards(true);
      });
  }, []);

  const tempActual = datosSimulados[datosSimulados.length - 1].T2M;
  const precipActual = datosSimulados[datosSimulados.length - 1].PRECTOTCORR;
  const vientoActual = datosSimulados[datosSimulados.length - 1].WS2M;
  const diasFavTotal = datosSimulados.reduce((sum, d) => sum + d.diasFavorables, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <Cloud className="w-16 h-16 text-blue-500 mx-auto mb-4 animate-bounce" />
          <p className="text-xl font-semibold text-gray-700">Cargando datos climáticos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Dashboard Climático
        </h1>
        <div className="flex items-center justify-center text-gray-600">
          <MapPin className="w-5 h-5 mr-2" />
          <p className="text-lg">La Paz, Bolivia - Octubre 2025</p>
        </div>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 transition-all duration-700 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <StatCard
          icon={Thermometer}
          title="Temperatura Actual"
          value={tempActual}
          unit="°C"
          trend="+2°"
          color="from-orange-400 to-red-500"
        />
        <StatCard
          icon={Droplets}
          title="Precipitación"
          value={precipActual}
          unit="mm"
          color="from-blue-400 to-cyan-500"
        />
        <StatCard
          icon={Wind}
          title="Velocidad del Viento"
          value={vientoActual}
          unit="m/s"
          color="from-teal-400 to-emerald-500"
        />
        <StatCard
          icon={Sprout}
          title="Días Favorables"
          value={diasFavTotal}
          unit="días"
          trend="+5"
          color="from-green-400 to-lime-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mapa con datos reales */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-200 h-[450px] hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <MapPin className="w-6 h-6 text-purple-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-800">Mapa de Condiciones</h2>
          </div>
          <MapContainer center={[-16.5, -68.14]} zoom={13} className="w-full h-[360px] rounded-xl shadow-inner">
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {datosMapa.map((loc, idx) => {
              const key = `${loc.lat},${loc.lon}`;
              const nombre = coordenadasAmigables[key] || "Ubicación desconocida";
              const color = loc.floracion_simulada ? "#10b981" : "#f59e0b";
              return (
                <CircleMarker
                  key={idx}
                  center={[loc.lat, loc.lon]}
                  radius={12}
                  color={color}
                  fillColor={color}
                  fillOpacity={0.8}
                  weight={3}
                >
                  <Popup>
                    <div className="text-sm">
                      <div className="font-bold text-lg text-gray-800 mb-2">{nombre}</div>
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <Thermometer className="w-4 h-4 mr-2 text-red-500" />
                          <span>{loc.T2M} °C</span>
                        </div>
                        <div className="flex items-center">
                          <Droplets className="w-4 h-4 mr-2 text-blue-500" />
                          <span>{loc.PRECTOTCORR} mm</span>
                        </div>
                        <div className="flex items-center">
                          <Wind className="w-4 h-4 mr-2 text-teal-500" />
                          <span>{loc.WS2M} m/s</span>
                        </div>
                        <div className="mt-2 px-2 py-1 rounded bg-green-100 text-green-800 text-xs font-semibold">
                          {loc.condiciones}
                        </div>
                      </div>
                    </div>
                  </Popup>
                </CircleMarker>
              );
            })}
          </MapContainer>
        </div>

        {/* Gráfica Temperatura con área */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <Thermometer className="w-6 h-6 text-red-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-800">Temperatura Promedio</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={datosSimulados}>
              <defs>
                <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="fecha" tick={{ fontSize: 12, fill: '#6b7280' }} />
              <YAxis unit="°C" tick={{ fill: '#6b7280' }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="T2M" stroke="#ef4444" strokeWidth={3} fill="url(#colorTemp)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfica Precipitación */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <Droplets className="w-6 h-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-800">Precipitación Total</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={datosSimulados}>
              <defs>
                <linearGradient id="colorPrecip" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={1}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="fecha" tick={{ fontSize: 12, fill: '#6b7280' }} />
              <YAxis unit="mm" tick={{ fill: '#6b7280' }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="PRECTOTCORR" fill="url(#colorPrecip)" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfica Viento */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <Wind className="w-6 h-6 text-teal-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-800">Velocidad del Viento</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={datosSimulados}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="fecha" tick={{ fontSize: 12, fill: '#6b7280' }} />
              <YAxis unit="m/s" tick={{ fill: '#6b7280' }} />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="WS2M" 
                stroke="#14b8a6" 
                strokeWidth={3} 
                dot={{ fill: '#14b8a6', r: 6, strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Días favorables */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <Sprout className="w-6 h-6 text-green-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-800">Días Favorables para Sembrar</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={datosSimulados}>
              <defs>
                <linearGradient id="colorFav" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={1}/>
                  <stop offset="95%" stopColor="#84cc16" stopOpacity={1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="fecha" tick={{ fontSize: 12, fill: '#6b7280' }} />
              <YAxis tick={{ fill: '#6b7280' }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="diasFavorables" fill="url(#colorFav)" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Humedad */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <Cloud className="w-6 h-6 text-indigo-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-800">Humedad Relativa</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={datosSimulados}>
              <defs>
                <linearGradient id="colorHumedad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="fecha" tick={{ fontSize: 12, fill: '#6b7280' }} />
              <YAxis unit="%" tick={{ fill: '#6b7280' }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="humedad" stroke="#6366f1" strokeWidth={3} fill="url(#colorHumedad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}