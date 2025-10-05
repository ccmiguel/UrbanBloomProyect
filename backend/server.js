const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const pool = new Pool({
    user: 'postgres',        // Reemplaza con tu usuario de PostgreSQL
    host: 'localhost',       // Si es local
    database: 'Proyecto2_Radiotaxis', // Reemplaza con el nombre de tu base de datos
    password: '123456',      // Reemplaza con tu contraseña
    port: 5432,              // Puerto de PostgreSQL
});

app.use(cors());
app.use(express.json());

// Verificar conexión a la base de datos al inicio
pool.connect()
    .then(() => {
        console.log('Conexión exitosa a la base de datos');
    })
    .catch(err => {
        console.error('Error de conexión a la base de datos:', err);
    });

// Ruta para obtener datos de la tabla radio_taxis
app.get('/radio-taxis', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM radio_taxis');
        res.json(result.rows); // Enviamos los datos al frontend
    } catch (error) {
        console.error("Error obteniendo datos de radio_taxis:", error);
        res.status(500).send('Error al obtener datos');
    }
});

// Ruta para obtener la cantidad de radiotaxis por macrodistrito
app.get('/radiotaxis-macrodistrito', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                macrodistrito, 
                COUNT(*) AS cantidad,
                ROUND((COUNT(*) * 100.0) / SUM(COUNT(*)) OVER(), 2) AS porcentaje
            FROM radio_taxis
            GROUP BY macrodistrito
        `);
        res.json(result.rows); // Enviamos los datos al frontend
    } catch (error) {
        console.error("Error obteniendo datos de radiotaxis por macrodistrito:", error);
        res.status(500).send('Error al obtener datos');
    }
});
// Ruta para obtener la cantidad de macrodistritos
app.get('/macrodistritos', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT COUNT(DISTINCT macrodistrito) AS cantidad_macrodistritos
            FROM radio_taxis;
        `);
        res.json(result.rows[0]); // Enviamos solo una fila con el resultado
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener cantidad de macrodistritos');
    }
});
// Ruta para obtener la cantidad de radiotaxis
app.get('/radiotaxis-cantidad', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT COUNT(*) AS cantidad_radiotaxis
            FROM radio_taxis;
        `);
        res.json(result.rows[0]); // Enviamos solo una fila con el resultado
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener cantidad de radiotaxis');
    }
});
// Ruta para obtener la cantidad de radiotaxis por tipo de operador
app.get('/radiotaxis/tipo_operador', async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT 
          tipo_operador,
          COUNT(*) as cantidad,
          ROUND((COUNT(*) * 100.0) / SUM(COUNT(*)) OVER (), 2) as porcentaje
        FROM radio_taxis
        GROUP BY tipo_operador;`
      );
      res.json(result.rows); // Enviar los datos al frontend
    } catch (error) {
      console.error("Error ejecutando la consulta:", error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
// Ruta para obtener la cantidad de tipo_operador con porcentajes
app.get('/tipo_operador', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
              tipo_operador,
              COUNT(*) AS cantidad,
              ROUND((COUNT(*) * 100.0) / (SELECT COUNT(*) FROM radio_taxis), 2) AS porcentaje
            FROM radio_taxis
            GROUP BY tipo_operador;
        `);
        res.json(result.rows); // Enviar los datos al frontend
    } catch (error) {
        console.error("Error ejecutando la consulta de tipo_operador:", error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Ruta para obtener la cantidad de macrodistritos con estadísticas
app.get('/macrodistrito-estadisticas', async (req, res) => {
    try {
        const result = await pool.query(`
                SELECT macrodistrito, 
                    COUNT(*) AS cantidad,
                    ROUND(AVG(cantidad), 2) AS promedio,        -- Redondear promedio a 2 decimales
                    ROUND(STDDEV(cantidad), 2) AS desviacion_estandar  -- Redondear desviación estándar a 2 decimales
                FROM (
                    SELECT macrodistrito, COUNT(*) AS cantidad
                    FROM radio_taxis
                    GROUP BY macrodistrito
                ) AS subquery
                GROUP BY macrodistrito;

        `);
        res.json(result.rows); // Enviar los datos al frontend
    } catch (error) {
        console.error("Error ejecutando la consulta de macrodistrito:", error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
// Ruta para obtener promedio y desviación estándar de cantidad por macrodistrito
app.get('/api/macrodistrito', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT macrodistrito, 
                   AVG(cantidad) AS promedio, 
                   STDDEV(cantidad) AS desviacion_estandar
            FROM (
                SELECT macrodistrito, COUNT(*) AS cantidad
                FROM radio_taxis
                GROUP BY macrodistrito
            ) AS subquery
            GROUP BY macrodistrito;
        `);
        res.json(result.rows); // Devolver resultados en formato JSON
    } catch (error) {
        console.error("Error ejecutando la consulta de macrodistrito:", error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}); 
app.get("/pumakatari", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM PumaKatari");
        res.json(result.rows);  // Enviar los datos de la tabla como JSON
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        res.status(500).send("Error al obtener los datos");
    }
});
app.get('/pumakatari', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM PumaKatari');
        res.json(result.rows);  // Asegúrate de que 'result.rows' contiene los datos que necesitas
    } catch (error) {
        console.error('Error al obtener los registros:', error);
        res.status(500).send('Error al obtener los registros');
    }
});
// Crear un nuevo registro
app.post('/pumakatari', async (req, res) => {
    const { idlinea, fecha, hora, demanda_estimada, tiempo_entre_paradas, factor_estacional, factor_dia, factor_hora } = req.body;
    try {
      const result = await pool.query(
        `INSERT INTO PumaKatari (idlinea, fecha, hora, demanda_estimada, tiempo_entre_paradas, factor_estacional, factor_dia, factor_hora)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [idlinea, fecha, hora, demanda_estimada, tiempo_entre_paradas, factor_estacional, factor_dia, factor_hora]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error al crear registro:', error);
      res.status(500).send('Error al crear el registro');
    }
  });
  
  // Obtener todos los registros
  app.get('/pumakatari', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM PumaKatari');
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error al obtener registros:', error);
      res.status(500).send('Error al obtener los registros');
    }
  });
  
  // Obtener un registro por ID
  app.get('/pumakatari/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query('SELECT * FROM PumaKatari WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        return res.status(404).send('Registro no encontrado');
      }
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Error al obtener el registro:', error);
      res.status(500).send('Error al obtener el registro');
    }
  });
  
  // Actualizar un registro
  app.put('/pumakatari/:id', async (req, res) => {
    const { id } = req.params;
    const { idlinea, fecha, hora, demanda_estimada, tiempo_entre_paradas, factor_estacional, factor_dia, factor_hora } = req.body;
    try {
      const result = await pool.query(
        `UPDATE PumaKatari
         SET idlinea = $1, fecha = $2, hora = $3, demanda_estimada = $4, tiempo_entre_paradas = $5, factor_estacional = $6, factor_dia = $7, factor_hora = $8
         WHERE id = $9 RETURNING *`,
        [idlinea, fecha, hora, demanda_estimada, tiempo_entre_paradas, factor_estacional, factor_dia, factor_hora, id]
      );
      if (result.rows.length === 0) {
        return res.status(404).send('Registro no encontrado');
      }
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Error al actualizar el registro:', error);
      res.status(500).send('Error al actualizar el registro');
    }
  });
  
  // Eliminar un registro
  app.delete('/pumakatari/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query('DELETE FROM PumaKatari WHERE id = $1 RETURNING *', [id]);
      if (result.rows.length === 0) {
        return res.status(404).send('Registro no encontrado');
      }
      res.status(200).send('Registro eliminado');
    } catch (error) {
      console.error('Error al eliminar el registro:', error);
      res.status(500).send('Error al eliminar el registro');
    }
  });
  app.get('/demanda-promedio-dia', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                TO_CHAR(fecha, 'Day') AS dia_semana, 
                AVG(demanda_estimada) AS demanda_promedio
            FROM PumaKatari
            GROUP BY dia_semana
            ORDER BY dia_semana;
        `);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener datos');
    }
});

// Ruta para obtener la demanda promedio por hora del día
app.get('/demanda-promedio-hora', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                EXTRACT(HOUR FROM hora) AS hora_del_dia, 
                AVG(demanda_estimada) AS demanda_promedio
            FROM PumaKatari
            GROUP BY hora_del_dia
            ORDER BY hora_del_dia;
        `);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener datos');
    }
});

// Ruta para obtener el tiempo promedio entre paradas por línea, ordenado por el más alto
app.get('/tiempo-promedio-linea', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                idlinea, 
                AVG(tiempo_entre_paradas) AS tiempo_promedio
            FROM PumaKatari
            GROUP BY idlinea
            ORDER BY tiempo_promedio DESC;
        `);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener datos');
    }
});

// Ruta para obtener el promedio de la demanda y factores
app.get('/factores-promedio', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                AVG(demanda_estimada) AS demanda_promedio,
                AVG(factor_estacional) AS factor_estacional_promedio,
                AVG(factor_dia) AS factor_dia_promedio,
                AVG(factor_hora) AS factor_hora_promedio
            FROM PumaKatari
            GROUP BY factor_estacional, factor_dia, factor_hora
            ORDER BY factor_estacional, factor_dia, factor_hora;
        `);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener datos');
    }
});

// Ruta para obtener estadísticas detalladas de tiempos por línea y factores
app.get('/estadisticas-linea-factores', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                idlinea,
                factor_estacional, 
                factor_dia, 
                factor_hora,
                AVG(tiempo_entre_paradas) AS tiempo_promedio,
                STDDEV(tiempo_entre_paradas) AS desviacion_estandar,
                MIN(tiempo_entre_paradas) AS tiempo_minimo,
                MAX(tiempo_entre_paradas) AS tiempo_maximo,
                COUNT(DISTINCT fecha || ' ' || hora) AS num_paradas
            FROM PumaKatari
            GROUP BY idlinea, factor_estacional, factor_dia, factor_hora
            HAVING COUNT(DISTINCT fecha || ' ' || hora) > 1
            ORDER BY idlinea, factor_estacional, factor_dia, factor_hora;
        `);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener datos');
    }
});
app.get('/teleferico/promedios2', async (req, res) => {
    const { linea, startDate, endDate } = req.query; // Obtener los parámetros de la línea y las fechas desde la query string
    
    try {
      // Iniciar la consulta SQL base
      let query = `
        SELECT
          TO_CHAR(fecha, 'YYYY-MM-DD') AS dia,  -- Cambiado a día en vez de mes
          linea,
          SUM(ingreso_total) AS ingreso_total_dia,
          SUM(pasajeros_estudiantes) AS pasajeros_estudiantes_dia,
          SUM(pasajeros_adulto_mayor) AS pasajeros_adulto_mayor_dia,
          SUM(pasajeros_normal) AS pasajeros_normales_dia,
          AVG(demanda) AS demanda_promedio_dia,
          AVG(numero_cabinas) AS cabinas_promedio_dia
        FROM 
          teleferico
        WHERE 
          fecha BETWEEN $1 AND $2`;  // Usamos los parámetros startDate y endDate para filtrar entre días
  
      const queryParams = [startDate, endDate]; // Inicializamos con los dos parámetros de fecha
  
      if (linea) {
        query += ` AND linea = $3`; // Filtrar por línea si es que se pasa
        queryParams.push(linea);  // Añadir el parámetro de la línea si se proporciona
      }
  
      query += `
        GROUP BY 
          TO_CHAR(fecha, 'YYYY-MM-DD'), linea
        ORDER BY 
          dia ASC, linea;
      `;
  
      // Ejecutar la consulta con los parámetros dinámicos
      const result = await pool.query(query, queryParams);
  
      res.json(result.rows); // Enviar los datos como respuesta
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      res.status(500).send('Error al obtener los datos');
    }
  });
  // Ruta para obtener los datos complejos por mes y línea

  app.get('/teleferico/promedios', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                Linea,
                AVG(Ingreso_Total) AS ingreso_promedio,
                AVG(Pasajeros_Estudiantes) AS pasajeros_estudiantes_promedio,
                AVG(Pasajeros_Adulto_Mayor) AS pasajeros_adulto_mayor_promedio,
                AVG(Pasajeros_Normal) AS pasajeros_normales_promedio
            FROM 
                teleferico
            WHERE 
                Fecha BETWEEN '2024-01-01' AND '2024-12-31'
            GROUP BY 
                Linea
            ORDER BY 
                ingreso_promedio DESC;
        `);
        res.json(result.rows); // Enviar los datos al frontend
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener datos');
    }
});


// Gráfico de línea
app.get('/minibuses/demanda-fecha', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT fecha_inicio_servicio, demanda_estimada
             FROM minibuses
             ORDER BY fecha_inicio_servicio;`
        );
        res.json(result.rows); // Enviar los datos al frontend
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener datos');
    }
});

// Gráfico de pie
app.get('/minibuses/tipo-vehiculo', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT tipo_vehiculo, COUNT(*) AS cantidad
             FROM minibuses
             GROUP BY tipo_vehiculo;`
        );
        res.json(result.rows); // Enviar los datos al frontend
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener datos');
    }
});

// Gráfico de barras
app.get('/minibuses/demanda-promedio-ruta', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT ruta, AVG(demanda_estimada) AS demanda_promedio
             FROM minibuses
             GROUP BY ruta
             ORDER BY demanda_promedio DESC;`
        );
        res.json(result.rows); // Enviar los datos al frontend
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener datos');
    }
});

// Gráfico de dispersión
app.get('/minibuses/demanda-factor-estacional', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT factor_estacional, demanda_estimada
             FROM minibuses;`
        );
        res.json(result.rows); // Enviar los datos al frontend
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener datos');
    }
});

// Demanda por tipo de vehículo
app.get('/minibuses/demanda-tipo-vehiculo', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT tipo_vehiculo,
                    COUNT(*) AS total_registros,
                    SUM(demanda_estimada) AS demanda_total,
                    AVG(demanda_estimada) AS demanda_promedio,
                    MIN(demanda_estimada) AS demanda_minima,
                    MAX(demanda_estimada) AS demanda_maxima,
                    STDDEV(demanda_estimada) AS demanda_desviacion
             FROM minibuses
             GROUP BY tipo_vehiculo
             ORDER BY demanda_promedio DESC;`
        );
        res.json(result.rows); // Enviar los datos al frontend
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener datos');
    }
});

// Demanda promedio por operador y tipo de vehículo
app.get('/minibuses/demanda-operador-tipo-vehiculo', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT operador,
                    tipo_vehiculo,
                    AVG(demanda_estimada) AS demanda_promedio
             FROM minibuses
             GROUP BY operador, tipo_vehiculo
             ORDER BY demanda_promedio DESC;`
        );
        res.json(result.rows); // Devuelve los resultados en formato JSON
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener datos');
    }
});

// Resumen de datos por operador
app.get('/minibuses/demanda-operador', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT operador, 
                    COUNT(*) AS total_registros, 
                    AVG(demanda_estimada) AS demanda_promedio, 
                    MIN(demanda_estimada) AS demanda_minima, 
                    MAX(demanda_estimada) AS demanda_maxima, 
                    STDDEV(demanda_estimada) AS demanda_desviacion
             FROM minibuses
             GROUP BY operador
             ORDER BY demanda_promedio DESC;`
        );
        res.json(result.rows); // Enviar los datos al frontend
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener datos');
    }
});



// PLANTAS 

// En server.js de tu backend
app.get('/api/plants', (req, res) => {
  const samplePlants = [
    {
      id: 1,
      Species: "Eucalyptus globulus",
      Plant_taxonomy: "A",
      Plant_type: "E",
      Longitude: -68.1193,
      Latitude: -16.5000,
      Elevation: 3600,
      Vcmax_25C: 79.29,
      Jmax_25C: 160.87,
      Leaf_N: 1.67,
      Leaf_P: 0.19,
      SLA: 12.5,
      Measurement_year: "2024"
    },
    {
      id: 2,
      Species: "Quinua Real",
      Plant_taxonomy: "C",
      Plant_type: "C",
      Longitude: -68.1500,
      Latitude: -16.5200,
      Elevation: 3800,
      Vcmax_25C: 45.2,
      Jmax_25C: 95.3,
      Leaf_N: 2.1,
      Leaf_P: 0.25,
      SLA: 15.8,
      Measurement_year: "2024"
    }
    // Agrega más plantas según necesites
  ];
  res.json(samplePlants);
});
// CRUD MINIBUSES

// CREATE: Agregar un nuevo registro
app.post('/minibuses', async (req, res) => {
    const { operador, tipo_vehiculo, ruta, fecha_inicio_servicio, hora_inicio, hora_fin, demanda_estimada, factor_estacional } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO MINIBUSES (operador, tipo_vehiculo, ruta, fecha_inicio_servicio, hora_inicio, hora_fin, demanda_estimada, factor_estacional)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [operador, tipo_vehiculo, ruta, fecha_inicio_servicio, hora_inicio, hora_fin, demanda_estimada, factor_estacional]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al agregar el registro');
    }
});

// READ: Obtener todos los registros
app.get('/minibuses', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM MINIBUSES');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los registros');
    }
});

// READ: Obtener un registro por ID
app.get('/minibuses/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM MINIBUSES WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            res.status(404).send('Registro no encontrado');
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el registro');
    }
});

// UPDATE: Actualizar un registro por ID
app.put('/minibuses/:id', async (req, res) => {
    const { id } = req.params;
    const { operador, tipo_vehiculo, ruta, fecha_inicio_servicio, hora_inicio, hora_fin, demanda_estimada, factor_estacional } = req.body;
    try {
        const result = await pool.query(
            `UPDATE MINIBUSES SET
                operador = $1,
                tipo_vehiculo = $2,
                ruta = $3,
                fecha_inicio_servicio = $4,
                hora_inicio = $5,
                hora_fin = $6,
                demanda_estimada = $7,
                factor_estacional = $8
             WHERE id = $9 RETURNING *`,
            [operador, tipo_vehiculo, ruta, fecha_inicio_servicio, hora_inicio, hora_fin, demanda_estimada, factor_estacional, id]
        );
        if (result.rows.length === 0) {
            res.status(404).send('Registro no encontrado');
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el registro');
    }
});

// DELETE: Eliminar un registro por ID
app.delete('/minibuses/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM MINIBUSES WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            res.status(404).send('Registro no encontrado');
        } else {
            res.json({ message: 'Registro eliminado', registro: result.rows[0] });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar el registro');
    }
});
app.get('/factores-promedio', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT
                AVG(demanda_estimada) AS demanda_promedio,
                AVG(factor_estacional) AS factor_estacional_promedio,
                AVG(factor_dia) AS factor_dia_promedio,
                AVG(factor_hora) AS factor_hora_promedio
            FROM PumaKatari
            GROUP BY factor_estacional, factor_dia, factor_hora
            ORDER BY factor_estacional, factor_dia, factor_hora;`
        );
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener datos');
    }
});

const PORT = 3001;  // Puerto donde corre el backend
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
