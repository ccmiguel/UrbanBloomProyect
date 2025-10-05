import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Search, MessageCircle, Check, Clock, Droplets, Sun, Sprout } from "lucide-react";
import Header from "../components/common/Header";

const GuiaAgricolaPage = () => {
  const [plantaSeleccionada, setPlantaSeleccionada] = useState(null);
  const [consultaIA, setConsultaIA] = useState("");
  const [seccionActiva, setSeccionActiva] = useState("sembrado");

  // Tipos de plantas disponibles
  const tiposPlanta = [
    {
      id: 1,
      nombre: "Papa",
      icono: "🥔",
      temporada: "Seco",
      altitud: "Alta (3000-4000 msnm)",
      color: "bg-purple-100 border-purple-300",
      colorTexto: "text-purple-800"
    },
    {
      id: 2,
      nombre: "Quinua",
      icono: "🌾",
      temporada: "Seco",
      altitud: "Alta (3500-4000 msnm)",
      color: "bg-amber-100 border-amber-300",
      colorTexto: "text-amber-800"
    },
    {
      id: 3,
      nombre: "Maíz",
      icono: "🌽",
      temporada: "Lluvioso",
      altitud: "Media (2500-3500 msnm)",
      color: "bg-yellow-100 border-yellow-300",
      colorTexto: "text-yellow-800"
    },
    {
      id: 4,
      nombre: "Haba",
      icono: "🫘",
      temporada: "Seco",
      altitud: "Alta (3000-3800 msnm)",
      color: "bg-green-100 border-green-300",
      colorTexto: "text-green-800"
    },
    {
      id: 5,
      nombre: "Cebada",
      icono: "🌿",
      temporada: "Seco",
      altitud: "Alta (3500-4200 msnm)",
      color: "bg-emerald-100 border-emerald-300",
      colorTexto: "text-emerald-800"
    },
    {
      id: 6,
      nombre: "Oca",
      icono: "🍠",
      temporada: "Lluvioso",
      altitud: "Alta (3200-4000 msnm)",
      color: "bg-orange-100 border-orange-300",
      colorTexto: "text-orange-800"
    }
  ];

  // Guías de cuidado por planta
  const guiasCuidado = {
    papa: {
      titulo: "Consejos para Papa en Altiplano de La Paz - Temporada Seca",
      sembrado: [
        { id: 1, texto: "Preparar el suelo dos semanas antes", completado: true },
        { id: 2, texto: "Aplicar abono orgánico bien descompuesto", completado: true },
        { id: 3, texto: "Realizar surcos a 70 cm de distancia", completado: false },
        { id: 4, texto: "Plantar semillas a 10 cm de profundidad", completado: false },
        { id: 5, texto: "Usar semilla certificada libre de enfermedades", completado: false }
      ],
      riego: [
        { id: 1, texto: "Riego por goteo cada 3 días", completado: true },
        { id: 2, texto: "Evitar encharcamientos", completado: false },
        { id: 3, texto: "Regar en horas de la mañana", completado: true },
        { id: 4, texto: "Aumentar frecuencia en floración", completado: false }
      ],
      cuidados: [
        { id: 1, texto: "Controlar plagas con repelentes naturales", completado: false },
        { id: 2, texto: "Aporcar plantas a los 30 días", completado: false },
        { id: 3, texto: "Aplicar mulch para conservar humedad", completado: true },
        { id: 4, texto: "Deshierbar manualmente cada 15 días", completado: false }
      ],
      cosecha: [
        { id: 1, texto: "Cosechar a los 90-120 días", completado: false },
        { id: 2, texto: "Revisar madurez por color de follaje", completado: false },
        { id: 3, texto: "Cosechar en día seco y soleado", completado: false },
        { id: 4, texto: "Dejar secar al sol 2 horas antes de almacenar", completado: false }
      ]
    },
    quinua: {
      titulo: "Guía para Quinua en Altiplano - Temporada Seca",
      sembrado: [
        { id: 1, texto: "Preparar terreno con labranza mínima", completado: true },
        { id: 2, texto: "Sembrar en surcos a 50 cm", completado: false },
        { id: 3, texto: "Densidad: 8-10 kg semilla/ha", completado: false },
        { id: 4, texto: "Sembrar a 2-3 cm de profundidad", completado: false }
      ],
      riego: [
        { id: 1, texto: "Riego ligero cada 5 días", completado: true },
        { id: 2, texto: "Suspender riego 15 días antes de cosecha", completado: false },
        { id: 3, texto: "Mantener humedad en germinación", completado: true }
      ],
      cuidados: [
        { id: 1, texto: "Control manual de malezas", completado: false },
        { id: 2, texto: "Protección contra aves", completado: false },
        { id: 3, texto: "Aplicar ceniza para control de plagas", completado: false }
      ],
      cosecha: [
        { id: 1, texto: "Cosechar cuando panículas estén doradas", completado: false },
        { id: 2, texto: "Realizar trilla tradicional", completado: false },
        { id: 3, texto: "Secar al sol por 3 días", completado: false }
      ]
    },
    maíz: {
      titulo: "Guía para Maíz en Valles - Temporada Lluviosa",
      sembrado: [
        { id: 1, texto: "Preparar suelo con buen drenaje", completado: true },
        { id: 2, texto: "Sembrar al inicio de lluvias", completado: false },
        { id: 3, texto: "Distancia: 80 cm entre surcos", completado: false },
        { id: 4, texto: "Sembrar 2-3 semillas por golpe", completado: false }
      ],
      riego: [
        { id: 1, texto: "Aprovechar lluvias naturales", completado: true },
        { id: 2, texto: "Riego complementario en sequías", completado: false },
        { id: 3, texto: "Evitar exceso de humedad", completado: true }
      ],
      cuidados: [
        { id: 1, texto: "Ralear plantas débiles", completado: false },
        { id: 2, texto: "Aporcar cuando mida 30 cm", completado: false },
        { id: 3, texto: "Controlar gusano cogollero", completado: false }
      ],
      cosecha: [
        { id: 1, texto: "Cosechar cuando barbas estén secas", completado: false },
        { id: 2, texto: "Recolectar mazorcas maduras", completado: false },
        { id: 3, texto: "Secar mazorcas antes de almacenar", completado: false }
      ]
    },
    haba: {
      titulo: "Guía para Haba en Altiplano - Temporada Seca",
      sembrado: [
        { id: 1, texto: "Preparar suelo con pH neutro", completado: true },
        { id: 2, texto: "Sembrar en surcos a 60 cm", completado: false },
        { id: 3, texto: "Profundidad: 5-7 cm", completado: false },
        { id: 4, texto: "Inocular semillas con rizobio", completado: false }
      ],
      riego: [
        { id: 1, texto: "Riego moderado cada 4 días", completado: true },
        { id: 2, texto: "Mantener suelo húmedo en floración", completado: false },
        { id: 3, texto: "Reducir riego en formación de vainas", completado: false }
      ],
      cuidados: [
        { id: 1, texto: "Tutorar plantas si es necesario", completado: false },
        { id: 2, texto: "Controlar pulgones con jabón potásico", completado: false },
        { id: 3, texto: "Deshierbar cuidadosamente", completado: false }
      ],
      cosecha: [
        { id: 1, texto: "Cosechar vainas tiernas para consumo fresco", completado: false },
        { id: 2, texto: "Cosechar grano seco para almacenar", completado: false },
        { id: 3, texto: "Escalonar cosecha por madurez", completado: false }
      ]
    },
    cebada: {
      titulo: "Guía para Cebada en Altura - Temporada Seca",
      sembrado: [
        { id: 1, texto: "Preparar suelo bien mullido", completado: true },
        { id: 2, texto: "Siembra al voleo o en surcos", completado: false },
        { id: 3, texto: "Densidad: 100-120 kg/ha", completado: false },
        { id: 4, texto: "Sembrar a 3-4 cm de profundidad", completado: false }
      ],
      riego: [
        { id: 1, texto: "Riego ligero y frecuente", completado: true },
        { id: 2, texto: "Mantener humedad en emergencia", completado: false },
        { id: 3, texto: "Suspender riego en madurez", completado: false }
      ],
      cuidados: [
        { id: 1, texto: "Controlar roya con fungicidas naturales", completado: false },
        { id: 2, texto: "Fertilizar con fósforo y potasio", completado: false },
        { id: 3, texto: "Proteger de heladas tardías", completado: false }
      ],
      cosecha: [
        { id: 1, texto: "Cosechar cuando espigas estén doradas", completado: false },
        { id: 2, texto: "Realizar siega manual o mecánica", completado: false },
        { id: 3, texto: "Trillar y aventar grano", completado: false }
      ]
    },
    oca: {
      titulo: "Guía para Oca en Altiplano - Temporada Lluviosa",
      sembrado: [
        { id: 1, texto: "Preparar camas elevadas", completado: true },
        { id: 2, texto: "Sembrar al inicio de lluvias", completado: false },
        { id: 3, texto: "Distancia: 40 cm entre plantas", completado: false },
        { id: 4, texto: "Usar tubérculos semilla sanos", completado: false }
      ],
      riego: [
        { id: 1, texto: "Riego según precipitaciones", completado: true },
        { id: 2, texto: "Mantener humedad constante", completado: false },
        { id: 3, texto: "Evitar encharcamientos", completado: true }
      ],
      cuidados: [
        { id: 1, texto: "Aporcar cada 20 días", completado: false },
        { id: 2, texto: "Controlar gorgojo de los Andes", completado: false },
        { id: 3, texto: "Deshierbar manualmente", completado: false }
      ],
      cosecha: [
        { id: 1, texto: "Cosechar a los 6-8 meses", completado: false },
        { id: 2, texto: "Secar al sol para reducir acidez", completado: false },
        { id: 3, texto: "Almacenar en lugar fresco y seco", completado: false }
      ]
    }
  };

  const handleToggleTarea = (seccion, tareaId) => {
    if (!plantaSeleccionada) return;
    
    const guia = guiasCuidado[plantaSeleccionada.nombre.toLowerCase()];
    if (guia) {
      const tarea = guia[seccion].find(t => t.id === tareaId);
      if (tarea) {
        tarea.completado = !tarea.completado;
        setPlantaSeleccionada({ ...plantaSeleccionada }); // Forzar re-render
      }
    }
  };

  const handleConsultarIA = () => {
    if (consultaIA.trim() === "") return;
    
    // Simular respuesta de IA
    alert(`Consulta enviada a IA: "${consultaIA}"\n\nRespuesta simulada: Te recomiendo revisar la guía de ${plantaSeleccionada?.nombre || "la planta seleccionada"} en la sección de cuidados específicos.`);
    setConsultaIA("");
  };

  const guiaActual = plantaSeleccionada ? guiasCuidado[plantaSeleccionada.nombre.toLowerCase()] : null;

  // Obtener tareas de la sección activa
  const tareasSeccionActiva = guiaActual ? guiaActual[seccionActiva] : [];

  // Obtener todas las tareas pendientes
  const todasTareasPendientes = guiaActual ? 
    Object.values(guiaActual).flat().filter(tarea => !tarea.completado) : [];

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title='GUÍA AGRÍCOLA INTELIGENTE' />

      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        {/* Grid de Tipos de Planta */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Selecciona tu Cultivo</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {tiposPlanta.map((planta) => (
              <motion.button
                key={planta.id}
                className={`p-4 rounded-lg border-2 text-center transition-all duration-300 hover:scale-105 ${
                  plantaSeleccionada?.id === planta.id 
                    ? `${planta.color} border-2 border-green-500 shadow-lg` 
                    : `${planta.color} border-gray-200 hover:shadow-md`
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPlantaSeleccionada(planta)}
              >
                <div className="text-2xl mb-2">{planta.icono}</div>
                <h3 className={`font-semibold ${planta.colorTexto}`}>{planta.nombre}</h3>
                <p className="text-xs text-gray-600 mt-1">{planta.altitud}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence>
          {plantaSeleccionada && guiaActual && (
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Columna izquierda - Información principal */}
              <div className="lg:col-span-2 space-y-6">
                {/* Título y descripción */}
                <motion.div
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    {guiaActual.titulo}
                  </h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                    <span className="flex items-center space-x-1">
                      <Clock size={16} />
                      <span>Temporada: {plantaSeleccionada.temporada}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Sun size={16} />
                      <span>Altitud: {plantaSeleccionada.altitud}</span>
                    </span>
                  </div>
                </motion.div>

                {/* Consulta IA */}
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 className="text-lg font-semibold mb-2">Pregúntale a la IA</h2>
                  <p className="text-blue-100 mb-4">Consultas personalizadas instantáneas</p>
                  
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Escribe tu consulta..."
                      className="flex-1 bg-white bg-opacity-20 rounded-lg px-4 py-2 placeholder-blue-200 focus:outline-none focus:bg-white focus:text-gray-800 transition-colors"
                      value={consultaIA}
                      onChange={(e) => setConsultaIA(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleConsultarIA()}
                    />
                    <button
                      onClick={handleConsultarIA}
                      className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                    >
                      Enviar
                    </button>
                  </div>
                </motion.div>

                {/* Navegación de secciones */}
                <motion.div
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { key: "sembrado", label: "Sembrado", icon: Sprout, color: "green" },
                      { key: "riego", label: "Riego", icon: Droplets, color: "blue" },
                      { key: "cuidados", label: "Cuidados", icon: Sun, color: "yellow" },
                      { key: "cosecha", label: "Cosecha", icon: Check, color: "orange" }
                    ].map((seccion) => {
                      const IconComponent = seccion.icon;
                      return (
                        <button 
                          key={seccion.key}
                          className={`flex flex-col items-center p-4 rounded-lg border transition-colors ${
                            seccionActiva === seccion.key
                              ? `bg-${seccion.color}-100 border-${seccion.color}-500 shadow-md`
                              : `bg-${seccion.color}-50 border-${seccion.color}-200 hover:bg-${seccion.color}-100`
                          }`}
                          onClick={() => setSeccionActiva(seccion.key)}
                        >
                          <IconComponent 
                            size={24} 
                            className={`text-${seccion.color}-600 mb-2`} 
                          />
                          <span className={`font-semibold text-${seccion.color}-800`}>
                            {seccion.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Línea divisoria */}
                <hr className="border-gray-300" />

                {/* Lista de tareas de la sección activa */}
                <motion.div
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    {seccionActiva === "sembrado" && <Sprout className="mr-2 text-green-600" />}
                    {seccionActiva === "riego" && <Droplets className="mr-2 text-blue-600" />}
                    {seccionActiva === "cuidados" && <Sun className="mr-2 text-yellow-600" />}
                    {seccionActiva === "cosecha" && <Check className="mr-2 text-orange-600" />}
                    Consejos de {seccionActiva.charAt(0).toUpperCase() + seccionActiva.slice(1)}
                  </h3>
                  
                  <div className="space-y-3">
                    {tareasSeccionActiva.map((tarea) => (
                      <motion.div
                        key={tarea.id}
                        className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                          tarea.completado 
                            ? 'bg-green-50 border-green-200' 
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                        }`}
                        whileHover={{ scale: 1.02 }}
                      >
                        <button
                          onClick={() => handleToggleTarea(seccionActiva, tarea.id)}
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                            tarea.completado 
                              ? 'bg-green-500 border-green-500 text-white' 
                              : 'border-gray-400 hover:border-green-500'
                          }`}
                        >
                          {tarea.completado && <Check size={12} />}
                        </button>
                        <span className={`flex-1 ${tarea.completado ? 'text-green-700 line-through' : 'text-gray-700'}`}>
                          {tarea.texto}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Columna derecha - Tareas rápidas */}
              <div className="space-y-6">
                {/* Progreso rápido */}
                <motion.div
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Progreso General</h3>
                  
                  <div className="space-y-4">
                    {['sembrado', 'riego', 'cuidados', 'cosecha'].map((seccion) => {
                      const tareas = guiaActual[seccion] || [];
                      const completadas = tareas.filter(t => t.completado).length;
                      const total = tareas.length;
                      const porcentaje = total > 0 ? (completadas / total) * 100 : 0;
                      
                      return (
                        <div key={seccion} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium text-gray-700 capitalize">{seccion}</span>
                            <span className="text-gray-600">{completadas}/{total}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${porcentaje}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Próximas tareas */}
                <motion.div
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Próximas Tareas</h3>
                  
                  <div className="space-y-3">
                    {todasTareasPendientes.slice(0, 5).map((tarea) => (
                      <div key={tarea.id} className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock size={14} className="text-orange-500" />
                        <span>{tarea.texto}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Información adicional */}
                <motion.div
                  className="bg-blue-50 rounded-xl p-6 border border-blue-200"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">💡 Recomendación</h3>
                  <p className="text-sm text-blue-700">
                    Para mejores resultados en el altiplano, considera las variaciones climáticas y ajusta el riego según la humedad del suelo.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mensaje cuando no hay planta seleccionada */}
        <AnimatePresence>
          {!plantaSeleccionada && (
            <motion.div
              className="text-center py-12 bg-white rounded-xl shadow-lg border border-gray-200"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="text-6xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Selecciona un Cultivo</h3>
              <p className="text-gray-600">Elige una planta de la lista superior para ver su guía de cuidados personalizada</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default GuiaAgricolaPage;