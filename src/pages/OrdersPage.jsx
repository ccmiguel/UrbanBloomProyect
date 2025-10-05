import { Search, MessageCircle, Heart, Share2, Image, Send, X, Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/common/Header";
import { useState, useRef, useEffect } from "react";

const ComunidadPage = () => {
  // Estado para las publicaciones
  const [publicaciones, setPublicaciones] = useState([
    {
      id: 1,
      usuario: "María Quispe",
      ubicacion: "Cochabamba",
      tiempo: "2 horas",
      cultivo: "Papa",
      pregunta: "¿Alguien ha visto estas manchas en las hojas de papa? Necesito ayuda para identificar si es una plaga.",
      imagen: null,
      likes: 12,
      liked: false,
      respuestas: 8,
      comentarios: [
        { id: 1, usuario: "Carlos López", texto: "Parece ser mildiu, te recomiendo aplicar fungicida orgánico", tiempo: "1 hora" },
        { id: 2, usuario: "Laura Martínez", texto: "Yo tuve el mismo problema, el azufre en polvo me funcionó", tiempo: "45 min" }
      ]
    },
    {
      id: 2,
      usuario: "Juan Pérez",
      ubicacion: "La Paz",
      tiempo: "4 horas",
      cultivo: "Maíz",
      pregunta: "¿Cuál es el mejor fertilizante orgánico para maíz en altura?",
      imagen: null,
      likes: 5,
      liked: false,
      respuestas: 3,
      comentarios: [
        { id: 1, usuario: "Roberto Silva", texto: "El compost de gallinaza funciona muy bien", tiempo: "2 horas" }
      ]
    }
  ]);

  // Estados para funcionalidades
  const [nuevaPublicacion, setNuevaPublicacion] = useState("");
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [publicacionActiva, setPublicacionActiva] = useState(null);
  const [imagenPreview, setImagenPreview] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const fileInputRef = useRef(null);
  const comentarioInputRefs = useRef({});

  // Funciones para publicaciones
  const handlePublicar = () => {
    if (nuevaPublicacion.trim() === "" && !imagenPreview) return;

    const nuevaPub = {
      id: Date.now(),
      usuario: "Tú", // En una app real sería el usuario autenticado
      ubicacion: "Tu ubicación",
      tiempo: "Ahora mismo",
      cultivo: "Cultivo",
      pregunta: nuevaPublicacion,
      imagen: imagenPreview,
      likes: 0,
      liked: false,
      respuestas: 0,
      comentarios: []
    };

    setPublicaciones([nuevaPub, ...publicaciones]);
    setNuevaPublicacion("");
    setImagenPreview(null);
  };

  const handleLike = (id) => {
    setPublicaciones(publicaciones.map(pub => 
      pub.id === id 
        ? { 
            ...pub, 
            likes: pub.liked ? pub.likes - 1 : pub.likes + 1,
            liked: !pub.liked
          }
        : pub
    ));
  };

  const handleComentar = (id) => {
    if (nuevoComentario.trim() === "") return;

    setPublicaciones(publicaciones.map(pub => 
      pub.id === id 
        ? { 
            ...pub, 
            respuestas: pub.respuestas + 1,
            comentarios: [
              ...pub.comentarios,
              {
                id: Date.now(),
                usuario: "Tú",
                texto: nuevoComentario,
                tiempo: "Ahora mismo"
              }
            ]
          }
        : pub
    ));

    setNuevoComentario("");
    setPublicacionActiva(null);
  };

  // Funciones para imágenes
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagenPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const eliminarImagen = () => {
    setImagenPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Búsqueda y filtrado
  const publicacionesFiltradas = publicaciones.filter(pub =>
    pub.pregunta.toLowerCase().includes(busqueda.toLowerCase()) ||
    pub.cultivo.toLowerCase().includes(busqueda.toLowerCase()) ||
    pub.usuario.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className='flex-1 relative z-10 overflow-auto'>
      <Header title={"Comunidad Agrícola"} />

      <main className='max-w-4xl mx-auto py-6 px-4 lg:px-8'>
        {/* Barra de búsqueda */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Buscar en la comunidad</h1>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar preguntas, cultivos, usuarios..."
              className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
          </div>
        </motion.div>

        {/* Crear nueva publicación */}
        <motion.div
          className="bg-white rounded-lg border border-gray-200 p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-semibold text-gray-800 mb-4">Crear publicación</h3>
          
          <textarea
            placeholder="¿Qué quieres compartir con la comunidad?"
            className=" text-black w-full border border-gray-300 rounded-lg p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            rows="3"
            value={nuevaPublicacion}
            onChange={(e) => setNuevaPublicacion(e.target.value)}
          />

          {/* Preview de imagen */}
          <AnimatePresence>
            {imagenPreview && (
              <motion.div
                className="relative mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <img
                  src={imagenPreview}
                  alt="Preview"
                  className="w-full max-w-md rounded-lg border border-gray-300"
                />
                <button
                  onClick={eliminarImagen}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                >
                  <X size={16} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={fileInputRef}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="flex items-center space-x-2 text-gray-600 hover:text-green-600 cursor-pointer transition-colors"
              >
                <Image size={20} />
                <span className="text-sm">Foto</span>
              </label>

              <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors">
                <Camera size={20} />
                <span className="text-sm">Cámara</span>
              </button>
            </div>

            <button
              onClick={handlePublicar}
              disabled={!nuevaPublicacion.trim() && !imagenPreview}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                nuevaPublicacion.trim() || imagenPreview
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <Send size={16} />
              <span>Publicar</span>
            </button>
          </div>
        </motion.div>

        {/* Filtros */}
        <motion.div
          className="flex flex-wrap gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Todas las ubicaciones</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Todos los cultivos</span>
          </div>
        </motion.div>

        {/* Línea divisoria */}
        <hr className="border-gray-300 mb-8" />

        {/* Lista de publicaciones */}
        <div className="space-y-6">
          {publicacionesFiltradas.map((publicacion, index) => (
            <motion.div
              key={publicacion.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              {/* Información del usuario */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {publicacion.usuario.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{publicacion.usuario}</h3>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">{publicacion.ubicacion}</span> • {publicacion.tiempo}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contenido de la publicación */}
              <div className="mb-4">
                <h4 className="font-bold text-lg text-gray-800 mb-2">{publicacion.cultivo}</h4>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {publicacion.pregunta}
                </p>

                {/* Imagen de la publicación */}
                {publicacion.imagen && (
                  <motion.img
                    src={publicacion.imagen}
                    alt="Publicación"
                    className="w-full max-w-md rounded-lg border border-gray-300 mb-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  />
                )}
              </div>

              {/* Comentarios */}
              <AnimatePresence>
                {publicacion.comentarios.length > 0 && (
                  <motion.div
                    className="mb-4 bg-gray-50 rounded-lg p-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <h5 className="font-semibold text-gray-800 mb-2">Comentarios:</h5>
                    {publicacion.comentarios.map((comentario, idx) => (
                      <motion.div
                        key={comentario.id}
                        className="mb-3 last:mb-0"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <div className="flex items-start space-x-2">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs font-bold">
                              {comentario.usuario.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">{comentario.usuario}</p>
                            <p className="text-sm text-gray-600">{comentario.texto}</p>
                            <p className="text-xs text-gray-500 mt-1">{comentario.tiempo}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Línea divisoria dentro de la publicación */}
              <hr className="border-gray-200 mb-4" />

              {/* Estadísticas de interacción */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button 
                    className={`flex items-center space-x-2 transition-colors ${
                      publicacion.liked ? "text-green-600" : "text-gray-600 hover:text-green-600"
                    }`}
                    onClick={() => handleLike(publicacion.id)}
                  >
                    <Heart size={18} fill={publicacion.liked ? "currentColor" : "none"} />
                    <span className="text-sm font-medium">{publicacion.likes}</span>
                  </button>
                  
                  <button 
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={() => setPublicacionActiva(publicacionActiva === publicacion.id ? null : publicacion.id)}
                  >
                    <MessageCircle size={18} />
                    <span className="text-sm font-medium">{publicacion.respuestas}</span>
                  </button>

                  <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors">
                    <Share2 size={18} />
                    <span className="text-sm font-medium">Compartir</span>
                  </button>
                </div>
              </div>

              {/* Campo de comentario */}
              <AnimatePresence>
                {publicacionActiva === publicacion.id && (
                  <motion.div
                    className="mt-4 flex items-center space-x-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <input
                      type="text"
                      placeholder="Escribe tu comentario..."
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={nuevoComentario}
                      onChange={(e) => setNuevoComentario(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleComentar(publicacion.id)}
                      ref={el => comentarioInputRefs.current[publicacion.id] = el}
                    />
                    <button
                      onClick={() => handleComentar(publicacion.id)}
                      disabled={!nuevoComentario.trim()}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        nuevoComentario.trim()
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <Send size={16} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Cargar más publicaciones */}
        {publicacionesFiltradas.length > 0 && (
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium">
              Cargar más publicaciones
            </button>
          </motion.div>
        )}

        {/* Mensaje cuando no hay resultados */}
        {publicacionesFiltradas.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-gray-500 text-lg">No se encontraron publicaciones</p>
            <p className="text-gray-400 mt-2">Intenta con otros términos de búsqueda</p>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default ComunidadPage;