import React, { useState } from "react";
import { Leaf, Sun, Droplets, MapPin, Activity, Sparkles, ChevronDown, X } from "lucide-react";
import img from '../assets/p.jpg'
function Prediccion() {
  const [formData, setFormData] = useState({
    ciudad: "La Paz",
    horas_sol: "Moderadas (4-6 h)",
    color_hojas: "Verdes claras",
    frecuencia_riego: "Sí",
    SLA: 0.015,
  });

  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResultado(null);
    try {
      const res = await fetch("http://127.0.0.1:5000/predict_friendly", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setResultado(data);
    } catch (error) {
      console.error(error);
      setResultado({ error: "Error al conectar con el servidor." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-green-400 opacity-10 animate-pulse">
          <Leaf size={150} />
        </div>
        <div className="absolute bottom-20 right-10 text-emerald-400 opacity-10 animate-pulse" style={{animationDelay: '1s'}}>
          <Leaf size={180} />
        </div>
        <div className="absolute top-1/3 right-1/4 text-teal-400 opacity-10 animate-pulse" style={{animationDelay: '0.5s'}}>
          <Sun size={120} />
        </div>
        <div className="absolute bottom-1/3 left-1/4 text-green-300 opacity-10 animate-pulse" style={{animationDelay: '1.5s'}}>
          <Droplets size={100} />
        </div>
      </div>

      {!showForm ? (
        <div className="relative text-center space-y-8 animate-[fadeIn_0.8s_ease-out]">
          <div className="flex justify-center mb-8">
            <div className="relative">
  <div className="absolute inset-0 bg-white rounded-full blur-3xl opacity-40 animate-pulse"></div>
  <div className="relative bg-white p-8 rounded-full shadow-2xl">
    <img 
      src={img} 
      alt="muñequito" 
      className="w-38 h-38" 
    />
  </div>
</div>

          </div>

          <div className="space-y-4">
            <h1 className="text-6xl font-black text-white mb-4 drop-shadow-lg">
              Simulador
              <span className="block bg-gradient-to-r from-green-300 via-emerald-300 to-teal-300 bg-clip-text text-transparent">
                Fotosintético
              </span>
            </h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto leading-relaxed">
              Descubre el potencial de tus plantas con inteligencia artificial.
              Analiza la capacidad fotosintética basada en condiciones ambientales.
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="group relative mt-12 px-12 py-5 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 text-white text-lg font-bold rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-500 transform hover:scale-105 active:scale-95 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              Iniciar Análisis
              <ChevronDown className="animate-bounce" size={24} />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-300 via-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </button>

          <div className="flex justify-center gap-8 mt-12 text-green-200">
            <div className="flex flex-col items-center gap-2">
              <Sun size={32} className="text-yellow-300" />
              <span className="text-sm font-medium">Luz Solar</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Droplets size={32} className="text-blue-300" />
              <span className="text-sm font-medium">Riego</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Leaf size={32} className="text-green-300" />
              <span className="text-sm font-medium">Salud Foliar</span>
            </div>
          </div>
        </div>
      ) : (
        /* Vista del formulario */
        <div className="relative w-full max-w-2xl animate-[slideUp_0.5s_ease-out]">
          <div className="bg-white/95 backdrop-blur-xl shadow-2xl rounded-3xl p-10 border border-green-200/50">
            {/* Header con botón cerrar */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-full">
                    <Sparkles className="text-white" size={28} />
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                    Análisis Fotosintético
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">Completa los datos de tu planta</p>
                </div>
              </div>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X size={24} className="text-gray-400 hover:text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Ciudad */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                    <div className="p-1.5 bg-green-100 rounded-lg">
                      <MapPin size={16} className="text-green-600" />
                    </div>
                    Ciudad
                  </label>
                  <select
                    name="ciudad"
                    value={formData.ciudad}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-2xl p-4 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none bg-gradient-to-br from-white to-gray-50 hover:border-green-300 font-medium text-gray-700"
                  >
                    <option>La Paz</option>
                    <option>Santa Cruz</option>
                    <option>Cochabamba</option>
                  </select>
                </div>

                {/* Horas de sol */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                    <div className="p-1.5 bg-amber-100 rounded-lg">
                      <Sun size={16} className="text-amber-600" />
                    </div>
                    Horas de sol
                  </label>
                  <select
                    name="horas_sol"
                    value={formData.horas_sol}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-2xl p-4 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none bg-gradient-to-br from-white to-gray-50 hover:border-green-300 font-medium text-gray-700"
                  >
                    <option>Pocas (1-3 h)</option>
                    <option>Moderadas (4-6 h)</option>
                    <option>Muchas (7+ h)</option>
                  </select>
                </div>

                {/* Color de hojas */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                    <div className="p-1.5 bg-green-100 rounded-lg">
                      <Leaf size={16} className="text-green-600" />
                    </div>
                    Color de hojas
                  </label>
                  <select
                    name="color_hojas"
                    value={formData.color_hojas}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-2xl p-4 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none bg-gradient-to-br from-white to-gray-50 hover:border-green-300 font-medium text-gray-700"
                  >
                    <option>Verdes oscuras</option>
                    <option>Verdes claras</option>
                    <option>Amarillentas</option>
                  </select>
                </div>

                {/* Riego */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                    <div className="p-1.5 bg-blue-100 rounded-lg">
                      <Droplets size={16} className="text-blue-600" />
                    </div>
                    Frecuencia de riego
                  </label>
                  <select
                    name="frecuencia_riego"
                    value={formData.frecuencia_riego}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-2xl p-4 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none bg-gradient-to-br from-white to-gray-50 hover:border-green-300 font-medium text-gray-700"
                  >
                    <option>Sí</option>
                    <option>No</option>
                  </select>
                </div>
              </div>

              {/* SLA - Full width */}
              <div className="group">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                  <div className="p-1.5 bg-purple-100 rounded-lg">
                    <Activity size={16} className="text-purple-600" />
                  </div>
                  SLA (Área foliar específica)
                </label>
                <input
                  type="number"
                  step="0.001"
                  name="SLA"
                  value={formData.SLA}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 rounded-2xl p-4 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none bg-gradient-to-br from-white to-gray-50 hover:border-green-300 font-medium text-gray-700"
                />
              </div>

              {/* Botón submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 text-white font-bold py-5 rounded-2xl hover:from-green-600 hover:via-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 text-lg relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center gap-3">
                  {loading ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      Analizando...
                    </>
                  ) : (
                    <>
                      <Sparkles size={22} />
                      Predecir Capacidad Fotosintética
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* Resultados */}
            {resultado && (
              <div className="mt-8 p-8 rounded-3xl bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-2 border-green-300 shadow-lg animate-[fadeIn_0.5s_ease-in]">
                {resultado.error ? (
                  <div className="flex items-center gap-4">
                    <div className="bg-red-100 p-3 rounded-2xl">
                      <Leaf className="text-red-600" size={28} />
                    </div>
                    <p className="text-red-700 font-bold text-lg">{resultado.error}</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 pb-6 border-b-2 border-green-300">
                      <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-2xl shadow-lg">
                        <Activity className="text-white" size={32} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-bold uppercase tracking-wide">Vcmax a 25°C</p>
                        <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                          {resultado.Vcmax_25C?.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-sm border border-green-200">
                        <div className="bg-gradient-to-br from-emerald-400 to-green-500 p-3 rounded-xl">
                          <Leaf className="text-white" size={22} />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-bold uppercase tracking-wide mb-1">Estado de la Planta</p>
                          <p className="text-gray-800 font-bold text-lg">{resultado.estado}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-sm border border-blue-200">
                        <div className="bg-gradient-to-br from-blue-400 to-cyan-500 p-3 rounded-xl">
                          <Sparkles className="text-white" size={22} />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-bold uppercase tracking-wide mb-2">Recomendación</p>
                          <p className="text-gray-700 leading-relaxed font-medium">{resultado.consejo}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default Prediccion;